/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, ChangeDetectorRef, Input, Output, HostBinding, ChangeDetectionStrategy, EventEmitter, Renderer2, ElementRef, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
/**
 * angular-split
 *
 * Areas size are set in percentage of the split container.
 * Gutters size are set in pixels.
 *
 * So we set css 'flex-basis' property like this (where 0 <= area.size <= 1):
 *  calc( { area.size * 100 }% - { area.size * nbGutter * gutterSize }px );
 *
 * Examples with 3 visible areas and 2 gutters:
 *
 * |                     10px                   10px                                  |
 * |---------------------[]---------------------[]------------------------------------|
 * |  calc(20% - 4px)          calc(20% - 4px)              calc(60% - 12px)          |
 *
 *
 * |                          10px                        10px                        |
 * |--------------------------[]--------------------------[]--------------------------|
 * |  calc(33.33% - 6.667px)      calc(33.33% - 6.667px)      calc(33.33% - 6.667px)  |
 *
 *
 * |10px                                                  10px                        |
 * |[]----------------------------------------------------[]--------------------------|
 * |0                 calc(66.66% - 13.333px)                  calc(33%% - 6.667px)   |
 *
 *
 *  10px 10px                                                                         |
 * |[][]------------------------------------------------------------------------------|
 * |0 0                               calc(100% - 20px)                               |
 *
 */
export class SplitComponent {
    /**
     * @param {?} ngZone
     * @param {?} elRef
     * @param {?} cdRef
     * @param {?} renderer
     */
    constructor(ngZone, elRef, cdRef, renderer) {
        this.ngZone = ngZone;
        this.elRef = elRef;
        this.cdRef = cdRef;
        this.renderer = renderer;
        this._direction = 'horizontal';
        ////
        this._useTransition = false;
        ////
        this._disabled = false;
        ////
        this._useBackground = true;
        ////
        this._width = null;
        ////
        this._height = null;
        ////
        this._gutterSize = 11;
        ////
        this._gutterColor = '';
        ////
        this._gutterImageH = '';
        ////
        this._gutterImageV = '';
        ////
        this._dir = 'ltr';
        ////
        this.dragStart = new EventEmitter(false);
        this.dragProgress = new EventEmitter(false);
        this.dragEnd = new EventEmitter(false);
        this.gutterClick = new EventEmitter(false);
        this.transitionEndInternal = new Subject();
        this.transitionEnd = ((/** @type {?} */ (this.transitionEndInternal.asObservable()))).pipe(debounceTime(20));
        this.isViewInitialized = false;
        this.isDragging = false;
        this.draggingWithoutMove = false;
        this.currentGutterNum = 0;
        this.displayedAreas = [];
        this.hidedAreas = [];
        this.dragListeners = [];
        this.dragStartValues = {
            sizePixelContainer: 0,
            sizePixelA: 0,
            sizePixelB: 0,
            sizePercentA: 0,
            sizePercentB: 0,
        };
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set direction(v) {
        v = (v === 'vertical') ? 'vertical' : 'horizontal';
        this._direction = v;
        [...this.displayedAreas, ...this.hidedAreas].forEach(area => {
            area.comp.setStyleVisibleAndDir(area.comp.visible, this.isDragging, this.direction);
        });
        this.build(false, false);
    }
    /**
     * @return {?}
     */
    get direction() {
        return this._direction;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set useTransition(v) {
        v = (typeof (v) === 'boolean') ? v : (v === 'false' ? false : true);
        this._useTransition = v;
    }
    /**
     * @return {?}
     */
    get useTransition() {
        return this._useTransition;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set disabled(v) {
        v = (typeof (v) === 'boolean') ? v : (v === 'false' ? false : true);
        this._disabled = v;
        // Force repaint if modified from TS class (instead of the template)
        this.cdRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set useBackground(v) {
        v = (typeof (v) === 'boolean') ? v : (v !== 'false');
        this._useBackground = v;
        // Force repaint if modified from TS class (instead of the template)
        this.cdRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get useBackground() {
        return this._useBackground;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set width(v) {
        v = Number(v);
        this._width = (!isNaN(v) && v > 0) ? v : null;
        this.build(false, false);
    }
    /**
     * @return {?}
     */
    get width() {
        return this._width;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set height(v) {
        v = Number(v);
        this._height = (!isNaN(v) && v > 0) ? v : null;
        this.build(false, false);
    }
    /**
     * @return {?}
     */
    get height() {
        return this._height;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set gutterSize(v) {
        v = Number(v);
        this._gutterSize = (!isNaN(v) && v > 0) ? v : 11;
        this.build(false, false);
    }
    /**
     * @return {?}
     */
    get gutterSize() {
        return this._gutterSize;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set gutterColor(v) {
        this._gutterColor = (typeof v === 'string' && v !== '') ? v : '';
        // Force repaint if modified from TS class (instead of the template)
        this.cdRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get gutterColor() {
        return this._gutterColor;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set gutterImageH(v) {
        this._gutterImageH = (typeof v === 'string' && v !== '') ? v : '';
        // Force repaint if modified from TS class (instead of the template)
        this.cdRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get gutterImageH() {
        return this._gutterImageH;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set gutterImageV(v) {
        this._gutterImageV = (typeof v === 'string' && v !== '') ? v : '';
        // Force repaint if modified from TS class (instead of the template)
        this.cdRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get gutterImageV() {
        return this._gutterImageV;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set dir(v) {
        v = (v === 'rtl') ? 'rtl' : 'ltr';
        this._dir = v;
    }
    /**
     * @return {?}
     */
    get dir() {
        return this._dir;
    }
    /**
     * @return {?}
     */
    get cssFlexdirection() {
        return (this.direction === 'horizontal') ? 'row' : 'column';
    }
    /**
     * @return {?}
     */
    get cssWidth() {
        return this.width ? `${this.width}px` : '100%';
    }
    /**
     * @return {?}
     */
    get cssHeight() {
        return this.height ? `${this.height}px` : '100%';
    }
    /**
     * @return {?}
     */
    get cssMinwidth() {
        return (this.direction === 'horizontal') ? `${this.getNbGutters() * this.gutterSize}px` : null;
    }
    /**
     * @return {?}
     */
    get cssMinheight() {
        return (this.direction === 'vertical') ? `${this.getNbGutters() * this.gutterSize}px` : null;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.isViewInitialized = true;
    }
    /**
     * @return {?}
     */
    getNbGutters() {
        return this.displayedAreas.length - 1;
    }
    /**
     * @param {?} comp
     * @return {?}
     */
    addArea(comp) {
        /** @type {?} */
        const newArea = {
            comp,
            order: 0,
            size: 0,
        };
        if (comp.visible === true) {
            this.displayedAreas.push(newArea);
        }
        else {
            this.hidedAreas.push(newArea);
        }
        comp.setStyleVisibleAndDir(comp.visible, this.isDragging, this.direction);
        this.build(true, true);
    }
    /**
     * @param {?} comp
     * @return {?}
     */
    removeArea(comp) {
        if (this.displayedAreas.some(a => a.comp === comp)) {
            /** @type {?} */
            const area = (/** @type {?} */ (this.displayedAreas.find(a => a.comp === comp)));
            this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
            this.build(true, true);
        }
        else if (this.hidedAreas.some(a => a.comp === comp)) {
            /** @type {?} */
            const area = (/** @type {?} */ (this.hidedAreas.find(a => a.comp === comp)));
            this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
        }
    }
    /**
     * @param {?} comp
     * @param {?} resetOrders
     * @param {?} resetSizes
     * @return {?}
     */
    updateArea(comp, resetOrders, resetSizes) {
        // Only refresh if area is displayed (No need to check inside 'hidedAreas')
        /** @type {?} */
        const item = this.displayedAreas.find(a => a.comp === comp);
        if (item) {
            this.build(resetOrders, resetSizes);
        }
    }
    /**
     * @param {?} comp
     * @return {?}
     */
    showArea(comp) {
        /** @type {?} */
        const area = this.hidedAreas.find(a => a.comp === comp);
        if (area) {
            comp.setStyleVisibleAndDir(comp.visible, this.isDragging, this.direction);
            /** @type {?} */
            const areas = this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
            this.displayedAreas.push(...areas);
            this.build(true, true);
        }
    }
    /**
     * @param {?} comp
     * @return {?}
     */
    hideArea(comp) {
        /** @type {?} */
        const area = this.displayedAreas.find(a => a.comp === comp);
        if (area) {
            comp.setStyleVisibleAndDir(comp.visible, this.isDragging, this.direction);
            /** @type {?} */
            const areas = this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
            areas.forEach(area => {
                area.order = 0;
                area.size = 0;
            });
            this.hidedAreas.push(...areas);
            this.build(true, true);
        }
    }
    /**
     * @param {?} resetOrders
     * @param {?} resetSizes
     * @return {?}
     */
    build(resetOrders, resetSizes) {
        this.stopDragging();
        // ¤ AREAS ORDER
        if (resetOrders === true) {
            // If user provided 'order' for each area, use it to sort them.
            if (this.displayedAreas.every(a => a.comp.order !== null)) {
                this.displayedAreas.sort((a, b) => ((/** @type {?} */ (a.comp.order))) - ((/** @type {?} */ (b.comp.order))));
            }
            // Then set real order with multiples of 2, numbers between will be used by gutters.
            this.displayedAreas.forEach((area, i) => {
                area.order = i * 2;
                area.comp.setStyleOrder(area.order);
            });
        }
        // ¤ AREAS SIZE PERCENT
        if (resetSizes === true) {
            /** @type {?} */
            const totalUserSize = (/** @type {?} */ (this.displayedAreas.reduce((total, s) => s.comp.size ? total + s.comp.size : total, 0)));
            // If user provided 'size' for each area and total == 1, use it.
            if (this.displayedAreas.every(a => a.comp.size !== null) && totalUserSize > .999 && totalUserSize < 1.001) {
                this.displayedAreas.forEach(area => {
                    area.size = (/** @type {?} */ (area.comp.size));
                });
            }
            // Else set equal sizes for all areas.
            else {
                /** @type {?} */
                const size = 1 / this.displayedAreas.length;
                this.displayedAreas.forEach(area => {
                    area.size = size;
                });
            }
        }
        // ¤ 
        // If some real area sizes are less than gutterSize, 
        // set them to zero and dispatch size to others.
        /** @type {?} */
        let percentToDispatch = 0;
        // Get container pixel size
        /** @type {?} */
        let containerSizePixel = this.getNbGutters() * this.gutterSize;
        if (this.direction === 'horizontal') {
            containerSizePixel = this.width ? this.width : this.elRef.nativeElement['offsetWidth'];
        }
        else {
            containerSizePixel = this.height ? this.height : this.elRef.nativeElement['offsetHeight'];
        }
        this.displayedAreas.forEach(area => {
            if (area.size * containerSizePixel < this.gutterSize) {
                percentToDispatch += area.size;
                area.size = 0;
            }
        });
        if (percentToDispatch > 0 && this.displayedAreas.length > 0) {
            /** @type {?} */
            const nbAreasNotZero = this.displayedAreas.filter(a => a.size !== 0).length;
            if (nbAreasNotZero > 0) {
                /** @type {?} */
                const percentToAdd = percentToDispatch / nbAreasNotZero;
                this.displayedAreas.filter(a => a.size !== 0).forEach(area => {
                    area.size += percentToAdd;
                });
            }
            // All area sizes (container percentage) are less than guterSize,
            // It means containerSize < ngGutters * gutterSize
            else {
                this.displayedAreas[this.displayedAreas.length - 1].size = 1;
            }
        }
        this.refreshStyleSizes();
        this.cdRef.markForCheck();
    }
    /**
     * @return {?}
     */
    refreshStyleSizes() {
        /** @type {?} */
        const sumGutterSize = this.getNbGutters() * this.gutterSize;
        this.displayedAreas.forEach(area => {
            area.comp.setStyleFlexbasis(`calc( ${area.size * 100}% - ${area.size * sumGutterSize}px )`, this.isDragging);
        });
    }
    /**
     * @param {?} startEvent
     * @param {?} gutterOrder
     * @param {?} gutterNum
     * @return {?}
     */
    startDragging(startEvent, gutterOrder, gutterNum) {
        startEvent.preventDefault();
        // Place code here to allow '(gutterClick)' event even if '[disabled]="true"'.
        this.currentGutterNum = gutterNum;
        this.draggingWithoutMove = true;
        this.ngZone.runOutsideAngular(() => {
            this.dragListeners.push(this.renderer.listen('document', 'mouseup', (e) => this.stopDragging()));
            this.dragListeners.push(this.renderer.listen('document', 'touchend', (e) => this.stopDragging()));
            this.dragListeners.push(this.renderer.listen('document', 'touchcancel', (e) => this.stopDragging()));
        });
        if (this.disabled) {
            return;
        }
        /** @type {?} */
        const areaA = this.displayedAreas.find(a => a.order === gutterOrder - 1);
        /** @type {?} */
        const areaB = this.displayedAreas.find(a => a.order === gutterOrder + 1);
        if (!areaA || !areaB) {
            return;
        }
        /** @type {?} */
        const prop = (this.direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight';
        this.dragStartValues.sizePixelContainer = this.elRef.nativeElement[prop];
        this.dragStartValues.sizePixelA = areaA.comp.getSizePixel(prop);
        this.dragStartValues.sizePixelB = areaB.comp.getSizePixel(prop);
        this.dragStartValues.sizePercentA = areaA.size;
        this.dragStartValues.sizePercentB = areaB.size;
        /** @type {?} */
        const start = this.getPointFromEvent(startEvent);
        if (!start) {
            return;
        }
        this.ngZone.runOutsideAngular(() => {
            this.dragListeners.push(this.renderer.listen('document', 'mousemove', (e) => this.dragEvent(e, start, areaA, areaB)));
            this.dragListeners.push(this.renderer.listen('document', 'touchmove', (e) => this.dragEvent(e, start, areaA, areaB)));
        });
        areaA.comp.lockEvents();
        areaB.comp.lockEvents();
        this.isDragging = true;
        this.notify('start');
    }
    /**
     * @param {?} event
     * @param {?} start
     * @param {?} areaA
     * @param {?} areaB
     * @return {?}
     */
    dragEvent(event, start, areaA, areaB) {
        if (!this.isDragging) {
            return;
        }
        /** @type {?} */
        const end = this.getPointFromEvent(event);
        if (!end) {
            return;
        }
        this.draggingWithoutMove = false;
        this.drag(start, end, areaA, areaB);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getPointFromEvent(event) {
        // TouchEvent
        if (event instanceof TouchEvent) {
            return {
                x: event.touches[0].pageX,
                y: event.touches[0].pageY,
            };
        }
        // MouseEvent
        else if (event.pageX !== undefined && event.pageY !== undefined) {
            return {
                x: event.pageX,
                y: event.pageY,
            };
        }
        return null;
    }
    /**
     * @param {?} start
     * @param {?} end
     * @param {?} areaA
     * @param {?} areaB
     * @return {?}
     */
    drag(start, end, areaA, areaB) {
        // ¤ AREAS SIZE PIXEL
        // ¤ AREAS SIZE PIXEL
        /** @type {?} */
        const devicePixelRatio = /*window.devicePixelRatio ||*/ 1;
        /** @type {?} */
        let offsetPixel = (this.direction === 'horizontal') ? (start.x - end.x) : (start.y - end.y);
        offsetPixel = offsetPixel / devicePixelRatio;
        if (this.dir === 'rtl') {
            offsetPixel = -offsetPixel;
        }
        /** @type {?} */
        let newSizePixelA = this.dragStartValues.sizePixelA - offsetPixel;
        /** @type {?} */
        let newSizePixelB = this.dragStartValues.sizePixelB + offsetPixel;
        if (newSizePixelA < this.gutterSize || newSizePixelB < this.gutterSize) {
            // WTF.. get out of here!
            return;
        }
        else if (newSizePixelA < this.gutterSize) {
            newSizePixelB += newSizePixelA;
            newSizePixelA = 0;
        }
        else if (newSizePixelB < this.gutterSize) {
            newSizePixelA += newSizePixelB;
            newSizePixelB = 0;
        }
        // ¤ AREAS SIZE PERCENT
        if (newSizePixelA === 0) {
            areaB.size += areaA.size;
            areaA.size = 0;
        }
        else if (newSizePixelB === 0) {
            areaA.size += areaB.size;
            areaB.size = 0;
        }
        else {
            // NEW_PERCENT = START_PERCENT / START_PIXEL * NEW_PIXEL;
            if (this.dragStartValues.sizePercentA === 0) {
                areaB.size = this.dragStartValues.sizePercentB / this.dragStartValues.sizePixelB * newSizePixelB;
                areaA.size = this.dragStartValues.sizePercentB - areaB.size;
            }
            else if (this.dragStartValues.sizePercentB === 0) {
                areaA.size = this.dragStartValues.sizePercentA / this.dragStartValues.sizePixelA * newSizePixelA;
                areaB.size = this.dragStartValues.sizePercentA - areaA.size;
            }
            else {
                areaA.size = this.dragStartValues.sizePercentA / this.dragStartValues.sizePixelA * newSizePixelA;
                areaB.size = (this.dragStartValues.sizePercentA + this.dragStartValues.sizePercentB) - areaA.size;
            }
        }
        this.refreshStyleSizes();
        this.notify('progress');
    }
    /**
     * @return {?}
     */
    stopDragging() {
        if (this.isDragging === false && this.draggingWithoutMove === false) {
            return;
        }
        this.displayedAreas.forEach(area => {
            area.comp.unlockEvents();
        });
        while (this.dragListeners.length > 0) {
            /** @type {?} */
            const fct = this.dragListeners.pop();
            if (fct) {
                fct();
            }
        }
        if (this.draggingWithoutMove === true) {
            this.notify('click');
        }
        else {
            this.notify('end');
        }
        this.isDragging = false;
        this.draggingWithoutMove = false;
    }
    /**
     * @param {?} type
     * @return {?}
     */
    notify(type) {
        /** @type {?} */
        const areasSize = this.displayedAreas.map(a => a.size * 100);
        this.ngZone.run(() => {
            switch (type) {
                case 'start':
                    return this.dragStart.emit({ gutterNum: this.currentGutterNum, sizes: areasSize });
                case 'progress':
                    return this.dragProgress.emit({ gutterNum: this.currentGutterNum, sizes: areasSize });
                case 'end':
                    return this.dragEnd.emit({ gutterNum: this.currentGutterNum, sizes: areasSize });
                case 'click':
                    return this.gutterClick.emit({ gutterNum: this.currentGutterNum, sizes: areasSize });
                case 'transitionEnd':
                    return this.transitionEndInternal.next(areasSize);
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stopDragging();
    }
}
SplitComponent.decorators = [
    { type: Component, args: [{
                selector: 'as-split',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
        <ng-content></ng-content>
        <ng-template ngFor let-area [ngForOf]="displayedAreas" let-index="index" let-last="last">
            <as-split-gutter *ngIf="last === false" 
                          [order]="index*2+1"
                          [direction]="direction"
                          [useTransition]="useTransition"
                          [size]="gutterSize"
                          [color]="gutterColor"
                          [useBackground]="useBackground"
                          [imageH]="gutterImageH"
                          [imageV]="gutterImageV"
                          [disabled]="disabled"
                          (mousedown)="startDragging($event, index*2+1, index+1)"
                          (touchstart)="startDragging($event, index*2+1, index+1)"></as-split-gutter>
        </ng-template>`,
                styles: [":host{display:flex;flex-wrap:nowrap;justify-content:flex-start;align-items:stretch;overflow:hidden;width:100%;height:100%}as-split-gutter{flex-grow:0;flex-shrink:0;background-position:center center;background-repeat:no-repeat}"]
            }] }
];
/** @nocollapse */
SplitComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
SplitComponent.propDecorators = {
    direction: [{ type: Input }],
    useTransition: [{ type: Input }],
    disabled: [{ type: Input }],
    useBackground: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    gutterSize: [{ type: Input }],
    gutterColor: [{ type: Input }],
    gutterImageH: [{ type: Input }],
    gutterImageV: [{ type: Input }],
    dir: [{ type: Input }],
    dragStart: [{ type: Output }],
    dragProgress: [{ type: Output }],
    dragEnd: [{ type: Output }],
    gutterClick: [{ type: Output }],
    transitionEnd: [{ type: Output }],
    cssFlexdirection: [{ type: HostBinding, args: ['style.flex-direction',] }],
    cssWidth: [{ type: HostBinding, args: ['style.width',] }],
    cssHeight: [{ type: HostBinding, args: ['style.height',] }],
    cssMinwidth: [{ type: HostBinding, args: ['style.min-width',] }],
    cssMinheight: [{ type: HostBinding, args: ['style.min-height',] }]
};
if (false) {
    /** @type {?} */
    SplitComponent.prototype._direction;
    /** @type {?} */
    SplitComponent.prototype._useTransition;
    /** @type {?} */
    SplitComponent.prototype._disabled;
    /** @type {?} */
    SplitComponent.prototype._useBackground;
    /** @type {?} */
    SplitComponent.prototype._width;
    /** @type {?} */
    SplitComponent.prototype._height;
    /** @type {?} */
    SplitComponent.prototype._gutterSize;
    /** @type {?} */
    SplitComponent.prototype._gutterColor;
    /** @type {?} */
    SplitComponent.prototype._gutterImageH;
    /** @type {?} */
    SplitComponent.prototype._gutterImageV;
    /** @type {?} */
    SplitComponent.prototype._dir;
    /** @type {?} */
    SplitComponent.prototype.dragStart;
    /** @type {?} */
    SplitComponent.prototype.dragProgress;
    /** @type {?} */
    SplitComponent.prototype.dragEnd;
    /** @type {?} */
    SplitComponent.prototype.gutterClick;
    /** @type {?} */
    SplitComponent.prototype.transitionEndInternal;
    /** @type {?} */
    SplitComponent.prototype.transitionEnd;
    /** @type {?} */
    SplitComponent.prototype.isViewInitialized;
    /** @type {?} */
    SplitComponent.prototype.isDragging;
    /** @type {?} */
    SplitComponent.prototype.draggingWithoutMove;
    /** @type {?} */
    SplitComponent.prototype.currentGutterNum;
    /** @type {?} */
    SplitComponent.prototype.displayedAreas;
    /** @type {?} */
    SplitComponent.prototype.hidedAreas;
    /** @type {?} */
    SplitComponent.prototype.dragListeners;
    /** @type {?} */
    SplitComponent.prototype.dragStartValues;
    /** @type {?} */
    SplitComponent.prototype.ngZone;
    /** @type {?} */
    SplitComponent.prototype.elRef;
    /** @type {?} */
    SplitComponent.prototype.cdRef;
    /** @type {?} */
    SplitComponent.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zcGxpdC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvc3BsaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLHVCQUF1QixFQUN0RixZQUFZLEVBQUUsU0FBUyxFQUFhLFVBQVUsRUFBaUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxPQUFPLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJEOUMsTUFBTSxPQUFPLGNBQWM7Ozs7Ozs7SUF5TnZCLFlBQW9CLE1BQWMsRUFDZCxLQUFpQixFQUNqQixLQUF3QixFQUN4QixRQUFtQjtRQUhuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBMU4vQixlQUFVLEdBQThCLFlBQVksQ0FBQzs7UUFtQnJELG1CQUFjLEdBQVksS0FBSyxDQUFDOztRQWFoQyxjQUFTLEdBQVksS0FBSyxDQUFDOztRQWlCM0IsbUJBQWMsR0FBWSxJQUFJLENBQUM7O1FBZ0IvQixXQUFNLEdBQWtCLElBQUksQ0FBQzs7UUFlN0IsWUFBTyxHQUFrQixJQUFJLENBQUM7O1FBZTlCLGdCQUFXLEdBQVcsRUFBRSxDQUFDOztRQWV6QixpQkFBWSxHQUFXLEVBQUUsQ0FBQzs7UUFlMUIsa0JBQWEsR0FBVyxFQUFFLENBQUM7O1FBZTNCLGtCQUFhLEdBQVcsRUFBRSxDQUFDOztRQWUzQixTQUFJLEdBQWtCLEtBQUssQ0FBQzs7UUFh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LCtDQUE2RDs7SUFDN0QsdUNBRUU7O0lBc0JGLDJDQUEwQzs7SUFDMUMsb0NBQW9DOztJQUNwQyw2Q0FBNkM7O0lBQzdDLDBDQUFxQzs7SUFFckMsd0NBQWtEOztJQUNsRCxvQ0FBK0M7O0lBRS9DLHVDQUFxRDs7SUFDckQseUNBTUU7O0lBRVUsZ0NBQXNCOztJQUN0QiwrQkFBeUI7O0lBQ3pCLCtCQUFnQzs7SUFDaEMsa0NBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3RvclJlZiwgSW5wdXQsIE91dHB1dCwgSG9zdEJpbmRpbmcsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBcbiAgICBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyMiwgT25EZXN0cm95LCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgSUFyZWEgfSBmcm9tICcuLi9pbnRlcmZhY2UvSUFyZWEnO1xuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlL0lQb2ludCc7XG5pbXBvcnQgeyBTcGxpdEFyZWFEaXJlY3RpdmUgfSBmcm9tICcuLi9kaXJlY3RpdmUvc3BsaXRBcmVhLmRpcmVjdGl2ZSc7XG5cbi8qKlxuICogYW5ndWxhci1zcGxpdFxuICogXG4gKiBBcmVhcyBzaXplIGFyZSBzZXQgaW4gcGVyY2VudGFnZSBvZiB0aGUgc3BsaXQgY29udGFpbmVyLlxuICogR3V0dGVycyBzaXplIGFyZSBzZXQgaW4gcGl4ZWxzLlxuICogXG4gKiBTbyB3ZSBzZXQgY3NzICdmbGV4LWJhc2lzJyBwcm9wZXJ0eSBsaWtlIHRoaXMgKHdoZXJlIDAgPD0gYXJlYS5zaXplIDw9IDEpOiBcbiAqICBjYWxjKCB7IGFyZWEuc2l6ZSAqIDEwMCB9JSAtIHsgYXJlYS5zaXplICogbmJHdXR0ZXIgKiBndXR0ZXJTaXplIH1weCApO1xuICogXG4gKiBFeGFtcGxlcyB3aXRoIDMgdmlzaWJsZSBhcmVhcyBhbmQgMiBndXR0ZXJzOiBcbiAqIFxuICogfCAgICAgICAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tW10tLS0tLS0tLS0tLS0tLS0tLS0tLS1bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgIGNhbGMoMjAlIC0gNHB4KSAgICAgICAgICBjYWxjKDIwJSAtIDRweCkgICAgICAgICAgICAgIGNhbGMoNjAlIC0gMTJweCkgICAgICAgICAgfFxuICogXG4gKiBcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tW10tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8ICBjYWxjKDMzLjMzJSAtIDYuNjY3cHgpICAgICAgY2FsYygzMy4zMyUgLSA2LjY2N3B4KSAgICAgIGNhbGMoMzMuMzMlIC0gNi42NjdweCkgIHxcbiAqIFxuICogXG4gKiB8MTBweCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHxbXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfDAgICAgICAgICAgICAgICAgIGNhbGMoNjYuNjYlIC0gMTMuMzMzcHgpICAgICAgICAgICAgICAgICAgY2FsYygzMyUlIC0gNi42NjdweCkgICB8XG4gKiBcbiAqIFxuICogIDEwcHggMTBweCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8W11bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwwIDAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsYygxMDAlIC0gMjBweCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogXG4gKi9cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcy1zcGxpdCcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgc3R5bGVVcmxzOiBbYC4vc3BsaXQuY29tcG9uZW50LnNjc3NgXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtYXJlYSBbbmdGb3JPZl09XCJkaXNwbGF5ZWRBcmVhc1wiIGxldC1pbmRleD1cImluZGV4XCIgbGV0LWxhc3Q9XCJsYXN0XCI+XG4gICAgICAgICAgICA8YXMtc3BsaXQtZ3V0dGVyICpuZ0lmPVwibGFzdCA9PT0gZmFsc2VcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW29yZGVyXT1cImluZGV4KjIrMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXJlY3Rpb25dPVwiZGlyZWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW3VzZVRyYW5zaXRpb25dPVwidXNlVHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtzaXplXT1cImd1dHRlclNpemVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbY29sb3JdPVwiZ3V0dGVyQ29sb3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbdXNlQmFja2dyb3VuZF09XCJ1c2VCYWNrZ3JvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2ltYWdlSF09XCJndXR0ZXJJbWFnZUhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbaW1hZ2VWXT1cImd1dHRlckltYWdlVlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwic3RhcnREcmFnZ2luZygkZXZlbnQsIGluZGV4KjIrMSwgaW5kZXgrMSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAodG91Y2hzdGFydCk9XCJzdGFydERyYWdnaW5nKCRldmVudCwgaW5kZXgqMisxLCBpbmRleCsxKVwiPjwvYXMtc3BsaXQtZ3V0dGVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPmAsXG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIHByaXZhdGUgX2RpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcblxuICAgIEBJbnB1dCgpIHNldCBkaXJlY3Rpb24odjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJykge1xuICAgICAgICB2ID0gKHYgPT09ICd2ZXJ0aWNhbCcpID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gdjtcbiAgICAgICAgXG4gICAgICAgIFsuLi50aGlzLmRpc3BsYXllZEFyZWFzLCAuLi50aGlzLmhpZGVkQXJlYXNdLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICBhcmVhLmNvbXAuc2V0U3R5bGVWaXNpYmxlQW5kRGlyKGFyZWEuY29tcC52aXNpYmxlLCB0aGlzLmlzRHJhZ2dpbmcsIHRoaXMuZGlyZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJ1aWxkKGZhbHNlLCBmYWxzZSk7XG4gICAgfVxuICAgIFxuICAgIGdldCBkaXJlY3Rpb24oKTogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXJlY3Rpb247XG4gICAgfVxuICAgIFxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX3VzZVRyYW5zaXRpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNldCB1c2VUcmFuc2l0aW9uKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgdiA9ICh0eXBlb2YodikgPT09ICdib29sZWFuJykgPyB2IDogKHYgPT09ICdmYWxzZScgPyBmYWxzZSA6IHRydWUpO1xuICAgICAgICB0aGlzLl91c2VUcmFuc2l0aW9uID0gdjtcbiAgICB9XG4gICAgXG4gICAgZ2V0IHVzZVRyYW5zaXRpb24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VUcmFuc2l0aW9uO1xuICAgIH1cbiAgICBcbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIFxuICAgIEBJbnB1dCgpIHNldCBkaXNhYmxlZCh2OiBib29sZWFuKSB7XG4gICAgICAgIHYgPSAodHlwZW9mKHYpID09PSAnYm9vbGVhbicpID8gdiA6ICh2ID09PSAnZmFsc2UnID8gZmFsc2UgOiB0cnVlKTtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2O1xuXG4gICAgICAgIC8vIEZvcmNlIHJlcGFpbnQgaWYgbW9kaWZpZWQgZnJvbSBUUyBjbGFzcyAoaW5zdGVhZCBvZiB0aGUgdGVtcGxhdGUpXG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIFxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIC8vLy9cblxuXG4gICAgcHJpdmF0ZSBfdXNlQmFja2dyb3VuZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzZXQgdXNlQmFja2dyb3VuZCh2OiBib29sZWFuKSB7XG4gICAgICAgIHYgPSAodHlwZW9mKHYpID09PSAnYm9vbGVhbicpID8gdiA6ICh2ICE9PSAnZmFsc2UnKTtcbiAgICAgICAgdGhpcy5fdXNlQmFja2dyb3VuZCA9IHY7XG5cbiAgICAgICAgLy8gRm9yY2UgcmVwYWludCBpZiBtb2RpZmllZCBmcm9tIFRTIGNsYXNzIChpbnN0ZWFkIG9mIHRoZSB0ZW1wbGF0ZSlcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBnZXQgdXNlQmFja2dyb3VuZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZUJhY2tncm91bmQ7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfd2lkdGg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgQElucHV0KCkgc2V0IHdpZHRoKHY6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdiA9IE51bWJlcih2KTtcbiAgICAgICAgdGhpcy5fd2lkdGggPSAoIWlzTmFOKHYpICYmIHYgPiAwKSA/IHYgOiBudWxsO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5idWlsZChmYWxzZSwgZmFsc2UpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgd2lkdGgoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICB9XG4gICAgXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfaGVpZ2h0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIEBJbnB1dCgpIHNldCBoZWlnaHQodjogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB2ID0gTnVtYmVyKHYpO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSAoIWlzTmFOKHYpICYmIHYgPiAwKSA/IHYgOiBudWxsO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5idWlsZChmYWxzZSwgZmFsc2UpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgaGVpZ2h0KCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICAgIH1cbiAgICBcbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9ndXR0ZXJTaXplOiBudW1iZXIgPSAxMTtcblxuICAgIEBJbnB1dCgpIHNldCBndXR0ZXJTaXplKHY6IG51bWJlcikge1xuICAgICAgICB2ID0gTnVtYmVyKHYpO1xuICAgICAgICB0aGlzLl9ndXR0ZXJTaXplID0gKCFpc05hTih2KSAmJiB2ID4gMCkgPyB2IDogMTE7XG5cbiAgICAgICAgdGhpcy5idWlsZChmYWxzZSwgZmFsc2UpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgZ3V0dGVyU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3V0dGVyU2l6ZTtcbiAgICB9XG4gICAgXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfZ3V0dGVyQ29sb3I6IHN0cmluZyA9ICcnO1xuXG4gICAgQElucHV0KCkgc2V0IGd1dHRlckNvbG9yKHY6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9ndXR0ZXJDb2xvciA9ICh0eXBlb2YgdiA9PT0gJ3N0cmluZycgJiYgdiAhPT0gJycpID8gdiA6ICcnO1xuXG4gICAgICAgIC8vIEZvcmNlIHJlcGFpbnQgaWYgbW9kaWZpZWQgZnJvbSBUUyBjbGFzcyAoaW5zdGVhZCBvZiB0aGUgdGVtcGxhdGUpXG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIFxuICAgIGdldCBndXR0ZXJDb2xvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3V0dGVyQ29sb3I7XG4gICAgfVxuICAgIFxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2d1dHRlckltYWdlSDogc3RyaW5nID0gJyc7XG5cbiAgICBASW5wdXQoKSBzZXQgZ3V0dGVySW1hZ2VIKHY6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9ndXR0ZXJJbWFnZUggPSAodHlwZW9mIHYgPT09ICdzdHJpbmcnICYmIHYgIT09ICcnKSA/IHYgOiAnJztcbiAgICAgICAgXG4gICAgICAgIC8vIEZvcmNlIHJlcGFpbnQgaWYgbW9kaWZpZWQgZnJvbSBUUyBjbGFzcyAoaW5zdGVhZCBvZiB0aGUgdGVtcGxhdGUpXG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIFxuICAgIGdldCBndXR0ZXJJbWFnZUgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2d1dHRlckltYWdlSDtcbiAgICB9XG4gICAgXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfZ3V0dGVySW1hZ2VWOiBzdHJpbmcgPSAnJztcblxuICAgIEBJbnB1dCgpIHNldCBndXR0ZXJJbWFnZVYodjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2d1dHRlckltYWdlViA9ICh0eXBlb2YgdiA9PT0gJ3N0cmluZycgJiYgdiAhPT0gJycpID8gdiA6ICcnO1xuXG4gICAgICAgIC8vIEZvcmNlIHJlcGFpbnQgaWYgbW9kaWZpZWQgZnJvbSBUUyBjbGFzcyAoaW5zdGVhZCBvZiB0aGUgdGVtcGxhdGUpXG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIFxuICAgIGdldCBndXR0ZXJJbWFnZVYoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2d1dHRlckltYWdlVjtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9kaXI6ICdsdHInIHwgJ3J0bCcgPSAnbHRyJztcbiAgICBcbiAgICBASW5wdXQoKSBzZXQgZGlyKHY6ICdsdHInIHwgJ3J0bCcpIHtcbiAgICAgICAgdiA9ICh2ID09PSAncnRsJykgPyAncnRsJyA6ICdsdHInO1xuICAgICAgICB0aGlzLl9kaXIgPSB2O1xuICAgIH1cbiAgICBcbiAgICBnZXQgZGlyKCk6ICdsdHInIHwgJ3J0bCcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlyO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIEBPdXRwdXQoKSBkcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPHtndXR0ZXJOdW06IG51bWJlciwgc2l6ZXM6IEFycmF5PG51bWJlcj59PihmYWxzZSk7XG4gICAgQE91dHB1dCgpIGRyYWdQcm9ncmVzcyA9IG5ldyBFdmVudEVtaXR0ZXI8e2d1dHRlck51bTogbnVtYmVyLCBzaXplczogQXJyYXk8bnVtYmVyPn0+KGZhbHNlKTtcbiAgICBAT3V0cHV0KCkgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8e2d1dHRlck51bTogbnVtYmVyLCBzaXplczogQXJyYXk8bnVtYmVyPn0+KGZhbHNlKTtcbiAgICBAT3V0cHV0KCkgZ3V0dGVyQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPHtndXR0ZXJOdW06IG51bWJlciwgc2l6ZXM6IEFycmF5PG51bWJlcj59PihmYWxzZSk7XG5cbiAgICBwcml2YXRlIHRyYW5zaXRpb25FbmRJbnRlcm5hbCA9IG5ldyBTdWJqZWN0PEFycmF5PG51bWJlcj4+KCk7XG4gICAgQE91dHB1dCgpIHRyYW5zaXRpb25FbmQgPSAoPE9ic2VydmFibGU8QXJyYXk8bnVtYmVyPj4+IHRoaXMudHJhbnNpdGlvbkVuZEludGVybmFsLmFzT2JzZXJ2YWJsZSgpKS5waXBlKFxuICAgICAgICBkZWJvdW5jZVRpbWUoMjApXG4gICAgKTtcblxuICAgIEBIb3N0QmluZGluZygnc3R5bGUuZmxleC1kaXJlY3Rpb24nKSBnZXQgY3NzRmxleGRpcmVjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSA/ICdyb3cnIDogJ2NvbHVtbic7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpIGdldCBjc3NXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkdGggPyBgJHsgdGhpcy53aWR0aCB9cHhgIDogJzEwMCUnO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JykgZ2V0IGNzc0hlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0ID8gYCR7IHRoaXMuaGVpZ2h0IH1weGAgOiAnMTAwJSc7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS5taW4td2lkdGgnKSBnZXQgY3NzTWlud2lkdGgoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykgPyBgJHsgdGhpcy5nZXROYkd1dHRlcnMoKSAqIHRoaXMuZ3V0dGVyU2l6ZSB9cHhgIDogbnVsbDtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1pbi1oZWlnaHQnKSBnZXQgY3NzTWluaGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuZGlyZWN0aW9uID09PSAndmVydGljYWwnKSA/IGAkeyB0aGlzLmdldE5iR3V0dGVycygpICogdGhpcy5ndXR0ZXJTaXplIH1weGAgOiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1ZpZXdJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgaXNEcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgZHJhZ2dpbmdXaXRob3V0TW92ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgY3VycmVudEd1dHRlck51bTogbnVtYmVyID0gMDtcblxuICAgIHB1YmxpYyByZWFkb25seSBkaXNwbGF5ZWRBcmVhczogQXJyYXk8SUFyZWE+ID0gW107XG4gICAgcHJpdmF0ZSByZWFkb25seSBoaWRlZEFyZWFzOiBBcnJheTxJQXJlYT4gPSBbXTtcbiAgICBcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRyYWdMaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPiA9IFtdO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZHJhZ1N0YXJ0VmFsdWVzID0ge1xuICAgICAgICBzaXplUGl4ZWxDb250YWluZXI6IDAsXG4gICAgICAgIHNpemVQaXhlbEE6IDAsXG4gICAgICAgIHNpemVQaXhlbEI6IDAsXG4gICAgICAgIHNpemVQZXJjZW50QTogMCxcbiAgICAgICAgc2l6ZVBlcmNlbnRCOiAwLFxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5pc1ZpZXdJbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXROYkd1dHRlcnMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoIC0gMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQXJlYShjb21wOiBTcGxpdEFyZWFEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbmV3QXJlYTogSUFyZWEgPSB7XG4gICAgICAgICAgICBjb21wLCBcbiAgICAgICAgICAgIG9yZGVyOiAwLCBcbiAgICAgICAgICAgIHNpemU6IDAsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYoY29tcC52aXNpYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLnB1c2gobmV3QXJlYSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVkQXJlYXMucHVzaChuZXdBcmVhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXAuc2V0U3R5bGVWaXNpYmxlQW5kRGlyKGNvbXAudmlzaWJsZSwgdGhpcy5pc0RyYWdnaW5nLCB0aGlzLmRpcmVjdGlvbik7XG5cbiAgICAgICAgdGhpcy5idWlsZCh0cnVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlQXJlYShjb21wOiBTcGxpdEFyZWFEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICAgICAgaWYodGhpcy5kaXNwbGF5ZWRBcmVhcy5zb21lKGEgPT4gYS5jb21wID09PSBjb21wKSkge1xuICAgICAgICAgICAgY29uc3QgYXJlYSA9IDxJQXJlYT4gdGhpcy5kaXNwbGF5ZWRBcmVhcy5maW5kKGEgPT4gYS5jb21wID09PSBjb21wKVxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5zcGxpY2UodGhpcy5kaXNwbGF5ZWRBcmVhcy5pbmRleE9mKGFyZWEpLCAxKTtcblxuICAgICAgICAgICAgdGhpcy5idWlsZCh0cnVlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuaGlkZWRBcmVhcy5zb21lKGEgPT4gYS5jb21wID09PSBjb21wKSkge1xuICAgICAgICAgICAgY29uc3QgYXJlYSA9IDxJQXJlYT4gdGhpcy5oaWRlZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXAgPT09IGNvbXApXG4gICAgICAgICAgICB0aGlzLmhpZGVkQXJlYXMuc3BsaWNlKHRoaXMuaGlkZWRBcmVhcy5pbmRleE9mKGFyZWEpLCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVBcmVhKGNvbXA6IFNwbGl0QXJlYURpcmVjdGl2ZSwgcmVzZXRPcmRlcnM6IGJvb2xlYW4sIHJlc2V0U2l6ZXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgLy8gT25seSByZWZyZXNoIGlmIGFyZWEgaXMgZGlzcGxheWVkIChObyBuZWVkIHRvIGNoZWNrIGluc2lkZSAnaGlkZWRBcmVhcycpXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXAgPT09IGNvbXApO1xuXG4gICAgICAgIGlmKGl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuYnVpbGQocmVzZXRPcmRlcnMsIHJlc2V0U2l6ZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dBcmVhKGNvbXA6IFNwbGl0QXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhcmVhID0gdGhpcy5oaWRlZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXAgPT09IGNvbXApO1xuXG4gICAgICAgIGlmKGFyZWEpIHtcbiAgICAgICAgICAgIGNvbXAuc2V0U3R5bGVWaXNpYmxlQW5kRGlyKGNvbXAudmlzaWJsZSwgdGhpcy5pc0RyYWdnaW5nLCB0aGlzLmRpcmVjdGlvbik7XG5cbiAgICAgICAgICAgIGNvbnN0IGFyZWFzID0gdGhpcy5oaWRlZEFyZWFzLnNwbGljZSh0aGlzLmhpZGVkQXJlYXMuaW5kZXhPZihhcmVhKSwgMSk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLnB1c2goLi4uYXJlYXMpO1xuXG4gICAgICAgICAgICB0aGlzLmJ1aWxkKHRydWUsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGhpZGVBcmVhKGNvbXA6IFNwbGl0QXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhcmVhID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5maW5kKGEgPT4gYS5jb21wID09PSBjb21wKTtcblxuICAgICAgICBpZihhcmVhKSB7XG4gICAgICAgICAgICBjb21wLnNldFN0eWxlVmlzaWJsZUFuZERpcihjb21wLnZpc2libGUsIHRoaXMuaXNEcmFnZ2luZywgdGhpcy5kaXJlY3Rpb24pO1xuXG4gICAgICAgICAgICBjb25zdCBhcmVhcyA9IHRoaXMuZGlzcGxheWVkQXJlYXMuc3BsaWNlKHRoaXMuZGlzcGxheWVkQXJlYXMuaW5kZXhPZihhcmVhKSwgMSk7XG4gICAgICAgICAgICBhcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgICAgICAgICAgIGFyZWEub3JkZXIgPSAwO1xuICAgICAgICAgICAgICAgIGFyZWEuc2l6ZSA9IDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5oaWRlZEFyZWFzLnB1c2goLi4uYXJlYXMpO1xuXG4gICAgICAgICAgICB0aGlzLmJ1aWxkKHRydWUsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZChyZXNldE9yZGVyczogYm9vbGVhbiwgcmVzZXRTaXplczogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuXG4gICAgICAgIC8vIMKkIEFSRUFTIE9SREVSXG4gICAgICAgIFxuICAgICAgICBpZihyZXNldE9yZGVycyA9PT0gdHJ1ZSkgeyAgICBcblxuICAgICAgICAgICAgLy8gSWYgdXNlciBwcm92aWRlZCAnb3JkZXInIGZvciBlYWNoIGFyZWEsIHVzZSBpdCB0byBzb3J0IHRoZW0uXG4gICAgICAgICAgICBpZih0aGlzLmRpc3BsYXllZEFyZWFzLmV2ZXJ5KGEgPT4gYS5jb21wLm9yZGVyICE9PSBudWxsKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuc29ydCgoYSwgYikgPT4gKDxudW1iZXI+IGEuY29tcC5vcmRlcikgLSAoPG51bWJlcj4gYi5jb21wLm9yZGVyKSk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAvLyBUaGVuIHNldCByZWFsIG9yZGVyIHdpdGggbXVsdGlwbGVzIG9mIDIsIG51bWJlcnMgYmV0d2VlbiB3aWxsIGJlIHVzZWQgYnkgZ3V0dGVycy5cbiAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaCgoYXJlYSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGFyZWEub3JkZXIgPSBpICogMjtcbiAgICAgICAgICAgICAgICBhcmVhLmNvbXAuc2V0U3R5bGVPcmRlcihhcmVhLm9yZGVyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLyDCpCBBUkVBUyBTSVpFIFBFUkNFTlRcbiAgICAgICAgXG4gICAgICAgIGlmKHJlc2V0U2l6ZXMgPT09IHRydWUpIHtcblxuICAgICAgICAgICAgY29uc3QgdG90YWxVc2VyU2l6ZSA9IDxudW1iZXI+IHRoaXMuZGlzcGxheWVkQXJlYXMucmVkdWNlKCh0b3RhbDogbnVtYmVyLCBzOiBJQXJlYSkgPT4gcy5jb21wLnNpemUgPyB0b3RhbCArIHMuY29tcC5zaXplIDogdG90YWwsIDApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBJZiB1c2VyIHByb3ZpZGVkICdzaXplJyBmb3IgZWFjaCBhcmVhIGFuZCB0b3RhbCA9PSAxLCB1c2UgaXQuXG4gICAgICAgICAgICBpZih0aGlzLmRpc3BsYXllZEFyZWFzLmV2ZXJ5KGEgPT4gYS5jb21wLnNpemUgIT09IG51bGwpICYmIHRvdGFsVXNlclNpemUgPiAuOTk5ICYmIHRvdGFsVXNlclNpemUgPCAxLjAwMSApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXJlYS5zaXplID0gPG51bWJlcj4gYXJlYS5jb21wLnNpemU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBFbHNlIHNldCBlcXVhbCBzaXplcyBmb3IgYWxsIGFyZWFzLlxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IDEgLyB0aGlzLmRpc3BsYXllZEFyZWFzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFyZWEuc2l6ZSA9IHNpemU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIMKkIFxuICAgICAgICAvLyBJZiBzb21lIHJlYWwgYXJlYSBzaXplcyBhcmUgbGVzcyB0aGFuIGd1dHRlclNpemUsIFxuICAgICAgICAvLyBzZXQgdGhlbSB0byB6ZXJvIGFuZCBkaXNwYXRjaCBzaXplIHRvIG90aGVycy5cblxuICAgICAgICBsZXQgcGVyY2VudFRvRGlzcGF0Y2ggPSAwO1xuICAgICAgICBcbiAgICAgICAgLy8gR2V0IGNvbnRhaW5lciBwaXhlbCBzaXplXG4gICAgICAgIGxldCBjb250YWluZXJTaXplUGl4ZWwgPSB0aGlzLmdldE5iR3V0dGVycygpICogdGhpcy5ndXR0ZXJTaXplO1xuICAgICAgICBpZih0aGlzLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICBjb250YWluZXJTaXplUGl4ZWwgPSB0aGlzLndpZHRoID8gdGhpcy53aWR0aCA6IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudFsnb2Zmc2V0V2lkdGgnXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lclNpemVQaXhlbCA9IHRoaXMuaGVpZ2h0ID8gdGhpcy5oZWlnaHQgOiB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnRbJ29mZnNldEhlaWdodCddO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgICAgICAgaWYoYXJlYS5zaXplICogY29udGFpbmVyU2l6ZVBpeGVsIDwgdGhpcy5ndXR0ZXJTaXplKSB7XG4gICAgICAgICAgICAgICAgcGVyY2VudFRvRGlzcGF0Y2ggKz0gYXJlYS5zaXplO1xuICAgICAgICAgICAgICAgIGFyZWEuc2l6ZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaWYocGVyY2VudFRvRGlzcGF0Y2ggPiAwICYmIHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgbmJBcmVhc05vdFplcm8gPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbHRlcihhID0+IGEuc2l6ZSAhPT0gMCkubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZihuYkFyZWFzTm90WmVybyA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwZXJjZW50VG9BZGQgPSBwZXJjZW50VG9EaXNwYXRjaCAvIG5iQXJlYXNOb3RaZXJvO1xuICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZmlsdGVyKGEgPT4gYS5zaXplICE9PSAwKS5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhcmVhLnNpemUgKz0gcGVyY2VudFRvQWRkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQWxsIGFyZWEgc2l6ZXMgKGNvbnRhaW5lciBwZXJjZW50YWdlKSBhcmUgbGVzcyB0aGFuIGd1dGVyU2l6ZSxcbiAgICAgICAgICAgIC8vIEl0IG1lYW5zIGNvbnRhaW5lclNpemUgPCBuZ0d1dHRlcnMgKiBndXR0ZXJTaXplXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzW3RoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoIC0gMV0uc2l6ZSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMucmVmcmVzaFN0eWxlU2l6ZXMoKTtcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hTdHlsZVNpemVzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzdW1HdXR0ZXJTaXplID0gdGhpcy5nZXROYkd1dHRlcnMoKSAqIHRoaXMuZ3V0dGVyU2l6ZTtcblxuICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICBhcmVhLmNvbXAuc2V0U3R5bGVGbGV4YmFzaXMoYGNhbGMoICR7IGFyZWEuc2l6ZSAqIDEwMCB9JSAtICR7IGFyZWEuc2l6ZSAqIHN1bUd1dHRlclNpemUgfXB4IClgLCB0aGlzLmlzRHJhZ2dpbmcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhcnREcmFnZ2luZyhzdGFydEV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCwgZ3V0dGVyT3JkZXI6IG51bWJlciwgZ3V0dGVyTnVtOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgc3RhcnRFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIFBsYWNlIGNvZGUgaGVyZSB0byBhbGxvdyAnKGd1dHRlckNsaWNrKScgZXZlbnQgZXZlbiBpZiAnW2Rpc2FibGVkXT1cInRydWVcIicuXG4gICAgICAgIHRoaXMuY3VycmVudEd1dHRlck51bSA9IGd1dHRlck51bTtcbiAgICAgICAgdGhpcy5kcmFnZ2luZ1dpdGhvdXRNb3ZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmFnTGlzdGVuZXJzLnB1c2goIHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdtb3VzZXVwJywgKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMuc3RvcERyYWdnaW5nKCkpICk7XG4gICAgICAgICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCggdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNoZW5kJywgKGU6IFRvdWNoRXZlbnQpID0+IHRoaXMuc3RvcERyYWdnaW5nKCkpICk7XG4gICAgICAgICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCggdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNoY2FuY2VsJywgKGU6IFRvdWNoRXZlbnQpID0+IHRoaXMuc3RvcERyYWdnaW5nKCkpICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFyZWFBID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5maW5kKGEgPT4gYS5vcmRlciA9PT0gZ3V0dGVyT3JkZXIgLSAxKTtcbiAgICAgICAgY29uc3QgYXJlYUIgPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLm9yZGVyID09PSBndXR0ZXJPcmRlciArIDEpO1xuICAgICAgICBcbiAgICAgICAgaWYoIWFyZWFBIHx8ICFhcmVhQikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvcCA9ICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSA/ICdvZmZzZXRXaWR0aCcgOiAnb2Zmc2V0SGVpZ2h0JztcbiAgICAgICAgdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQ29udGFpbmVyID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50W3Byb3BdO1xuICAgICAgICB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGl4ZWxBID0gYXJlYUEuY29tcC5nZXRTaXplUGl4ZWwocHJvcCk7XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEIgPSBhcmVhQi5jb21wLmdldFNpemVQaXhlbChwcm9wKTtcbiAgICAgICAgdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRBID0gYXJlYUEuc2l6ZTtcbiAgICAgICAgdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRCID0gYXJlYUIuc2l6ZTtcblxuICAgICAgICBjb25zdCBzdGFydDogSVBvaW50ID0gdGhpcy5nZXRQb2ludEZyb21FdmVudChzdGFydEV2ZW50KTtcbiAgICAgICAgaWYoIXN0YXJ0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCggdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ21vdXNlbW92ZScsIChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLmRyYWdFdmVudChlLCBzdGFydCwgYXJlYUEsIGFyZWFCKSkgKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKCB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAndG91Y2htb3ZlJywgKGU6IFRvdWNoRXZlbnQpID0+IHRoaXMuZHJhZ0V2ZW50KGUsIHN0YXJ0LCBhcmVhQSwgYXJlYUIpKSApO1xuICAgICAgICB9KTtcblxuICAgICAgICBhcmVhQS5jb21wLmxvY2tFdmVudHMoKTtcbiAgICAgICAgYXJlYUIuY29tcC5sb2NrRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLm5vdGlmeSgnc3RhcnQnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYWdFdmVudChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQsIHN0YXJ0OiBJUG9pbnQsIGFyZWFBOiBJQXJlYSwgYXJlYUI6IElBcmVhKTogdm9pZCB7XG4gICAgICAgIGlmKCF0aGlzLmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbmQ6IElQb2ludCA9IHRoaXMuZ2V0UG9pbnRGcm9tRXZlbnQoZXZlbnQpO1xuICAgICAgICBpZighZW5kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZHJhZ2dpbmdXaXRob3V0TW92ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRyYWcoc3RhcnQsIGVuZCwgYXJlYUEsIGFyZWFCKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBvaW50RnJvbUV2ZW50KGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IElQb2ludCB7XG4gICAgICAgIC8vIFRvdWNoRXZlbnRcbiAgICAgICAgaWYoZXZlbnQgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHg6IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsXG4gICAgICAgICAgICAgICAgeTogZXZlbnQudG91Y2hlc1swXS5wYWdlWSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gTW91c2VFdmVudFxuICAgICAgICBlbHNlIGlmKGV2ZW50LnBhZ2VYICE9PSB1bmRlZmluZWQgJiYgZXZlbnQucGFnZVkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4OiBldmVudC5wYWdlWCxcbiAgICAgICAgICAgICAgICB5OiBldmVudC5wYWdlWSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmFnKHN0YXJ0OiBJUG9pbnQsIGVuZDogSVBvaW50LCBhcmVhQTogSUFyZWEsIGFyZWFCOiBJQXJlYSk6IHZvaWQge1xuXG4gICAgICAgIC8vIMKkIEFSRUFTIFNJWkUgUElYRUxcblxuICAgICAgICBjb25zdCBkZXZpY2VQaXhlbFJhdGlvID0gLyp3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCovIDE7XG4gICAgICAgIGxldCBvZmZzZXRQaXhlbCA9ICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSA/IChzdGFydC54IC0gZW5kLngpIDogKHN0YXJ0LnkgLSBlbmQueSk7XG4gICAgICAgIG9mZnNldFBpeGVsID0gb2Zmc2V0UGl4ZWwgLyBkZXZpY2VQaXhlbFJhdGlvO1xuXG4gICAgICAgIGlmKHRoaXMuZGlyID09PSAncnRsJykge1xuICAgICAgICAgICAgb2Zmc2V0UGl4ZWwgPSAtb2Zmc2V0UGl4ZWw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmV3U2l6ZVBpeGVsQSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEEgLSBvZmZzZXRQaXhlbDtcbiAgICAgICAgbGV0IG5ld1NpemVQaXhlbEIgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGl4ZWxCICsgb2Zmc2V0UGl4ZWw7XG5cbiAgICAgICAgaWYobmV3U2l6ZVBpeGVsQSA8IHRoaXMuZ3V0dGVyU2l6ZSB8fCBuZXdTaXplUGl4ZWxCIDwgdGhpcy5ndXR0ZXJTaXplKSB7XG4gICAgICAgICAgICAvLyBXVEYuLiBnZXQgb3V0IG9mIGhlcmUhXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihuZXdTaXplUGl4ZWxBIDwgdGhpcy5ndXR0ZXJTaXplKSB7XG4gICAgICAgICAgICBuZXdTaXplUGl4ZWxCICs9IG5ld1NpemVQaXhlbEE7XG4gICAgICAgICAgICBuZXdTaXplUGl4ZWxBID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKG5ld1NpemVQaXhlbEIgPCB0aGlzLmd1dHRlclNpemUpIHtcbiAgICAgICAgICAgIG5ld1NpemVQaXhlbEEgKz0gbmV3U2l6ZVBpeGVsQjtcbiAgICAgICAgICAgIG5ld1NpemVQaXhlbEIgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gwqQgQVJFQVMgU0laRSBQRVJDRU5UXG5cbiAgICAgICAgaWYobmV3U2l6ZVBpeGVsQSA9PT0gMCkge1xuICAgICAgICAgICAgYXJlYUIuc2l6ZSArPSBhcmVhQS5zaXplO1xuICAgICAgICAgICAgYXJlYUEuc2l6ZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihuZXdTaXplUGl4ZWxCID09PSAwKSB7XG4gICAgICAgICAgICBhcmVhQS5zaXplICs9IGFyZWFCLnNpemU7XG4gICAgICAgICAgICBhcmVhQi5zaXplID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIE5FV19QRVJDRU5UID0gU1RBUlRfUEVSQ0VOVCAvIFNUQVJUX1BJWEVMICogTkVXX1BJWEVMO1xuICAgICAgICAgICAgaWYodGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRBID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYXJlYUIuc2l6ZSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QiAvIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEIgKiBuZXdTaXplUGl4ZWxCO1xuICAgICAgICAgICAgICAgIGFyZWFBLnNpemUgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIgLSBhcmVhQi5zaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIgPT09IDApIHtcbiAgICAgICAgICAgICAgICBhcmVhQS5zaXplID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRBIC8gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQSAqIG5ld1NpemVQaXhlbEE7XG4gICAgICAgICAgICAgICAgYXJlYUIuc2l6ZSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSAtIGFyZWFBLnNpemU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcmVhQS5zaXplID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRBIC8gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQSAqIG5ld1NpemVQaXhlbEE7XG4gICAgICAgICAgICAgICAgYXJlYUIuc2l6ZSA9ICh0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEEgKyB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIpIC0gYXJlYUEuc2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaFN0eWxlU2l6ZXMoKTtcbiAgICAgICAgdGhpcy5ub3RpZnkoJ3Byb2dyZXNzJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdG9wRHJhZ2dpbmcoKTogdm9pZCB7XG4gICAgICAgIGlmKHRoaXMuaXNEcmFnZ2luZyA9PT0gZmFsc2UgJiYgdGhpcy5kcmFnZ2luZ1dpdGhvdXRNb3ZlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgICAgICAgYXJlYS5jb21wLnVubG9ja0V2ZW50cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3aGlsZSh0aGlzLmRyYWdMaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZmN0ID0gdGhpcy5kcmFnTGlzdGVuZXJzLnBvcCgpO1xuICAgICAgICAgICAgaWYoZmN0KSB7XG4gICAgICAgICAgICAgICAgZmN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuZHJhZ2dpbmdXaXRob3V0TW92ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnkoJ2NsaWNrJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeSgnZW5kJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kcmFnZ2luZ1dpdGhvdXRNb3ZlID0gZmFsc2U7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgbm90aWZ5KHR5cGU6ICdzdGFydCcgfCAncHJvZ3Jlc3MnIHwgJ2VuZCcgfCAnY2xpY2snIHwgJ3RyYW5zaXRpb25FbmQnKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFyZWFzU2l6ZTogQXJyYXk8bnVtYmVyPiA9IHRoaXMuZGlzcGxheWVkQXJlYXMubWFwKGEgPT4gYS5zaXplICogMTAwKTtcblxuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyYWdTdGFydC5lbWl0KHtndXR0ZXJOdW06IHRoaXMuY3VycmVudEd1dHRlck51bSwgc2l6ZXM6IGFyZWFzU2l6ZX0pO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncHJvZ3Jlc3MnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kcmFnUHJvZ3Jlc3MuZW1pdCh7Z3V0dGVyTnVtOiB0aGlzLmN1cnJlbnRHdXR0ZXJOdW0sIHNpemVzOiBhcmVhc1NpemV9KTtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyYWdFbmQuZW1pdCh7Z3V0dGVyTnVtOiB0aGlzLmN1cnJlbnRHdXR0ZXJOdW0sIHNpemVzOiBhcmVhc1NpemV9KTtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ3V0dGVyQ2xpY2suZW1pdCh7Z3V0dGVyTnVtOiB0aGlzLmN1cnJlbnRHdXR0ZXJOdW0sIHNpemVzOiBhcmVhc1NpemV9KTtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3RyYW5zaXRpb25FbmQnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2l0aW9uRW5kSW50ZXJuYWwubmV4dChhcmVhc1NpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgfVxufVxuIl19