import { Component, ChangeDetectorRef, Input, Output, HostBinding, ChangeDetectionStrategy, EventEmitter, Renderer2, ElementRef, NgZone, Directive, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
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
class SplitComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class SplitAreaDirective {
    /**
     * @param {?} ngZone
     * @param {?} elRef
     * @param {?} renderer
     * @param {?} split
     */
    constructor(ngZone, elRef, renderer, split) {
        this.ngZone = ngZone;
        this.elRef = elRef;
        this.renderer = renderer;
        this.split = split;
        this._order = null;
        ////
        this._size = null;
        ////
        this._minSize = 0;
        ////
        this._visible = true;
        this.lockListeners = [];
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set order(v) {
        v = Number(v);
        this._order = !isNaN(v) ? v : null;
        this.split.updateArea(this, true, false);
    }
    /**
     * @return {?}
     */
    get order() {
        return this._order;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set size(v) {
        v = Number(v);
        this._size = (!isNaN(v) && v >= 0 && v <= 100) ? (v / 100) : null;
        this.split.updateArea(this, false, true);
    }
    /**
     * @return {?}
     */
    get size() {
        return this._size;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set minSize(v) {
        v = Number(v);
        this._minSize = (!isNaN(v) && v > 0 && v < 100) ? v / 100 : 0;
        this.split.updateArea(this, false, true);
    }
    /**
     * @return {?}
     */
    get minSize() {
        return this._minSize;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set visible(v) {
        v = (typeof (v) === 'boolean') ? v : (v === 'false' ? false : true);
        this._visible = v;
        if (this.visible) {
            this.split.showArea(this);
        }
        else {
            this.split.hideArea(this);
        }
    }
    /**
     * @return {?}
     */
    get visible() {
        return this._visible;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.split.addArea(this);
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-grow', '0');
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-shrink', '0');
        this.ngZone.runOutsideAngular(() => {
            this.transitionListener = this.renderer.listen(this.elRef.nativeElement, 'transitionend', (e) => this.onTransitionEnd(e));
        });
    }
    /**
     * @param {?} prop
     * @return {?}
     */
    getSizePixel(prop) {
        return this.elRef.nativeElement[prop];
    }
    /**
     * @param {?} isVisible
     * @param {?} isDragging
     * @param {?} direction
     * @return {?}
     */
    setStyleVisibleAndDir(isVisible, isDragging, direction) {
        if (isVisible === false) {
            this.setStyleFlexbasis('0', isDragging);
            this.renderer.setStyle(this.elRef.nativeElement, 'overflow-x', 'hidden');
            this.renderer.setStyle(this.elRef.nativeElement, 'overflow-y', 'hidden');
            if (direction === 'vertical') {
                this.renderer.setStyle(this.elRef.nativeElement, 'max-width', '0');
            }
        }
        else {
            this.renderer.setStyle(this.elRef.nativeElement, 'overflow-x', 'hidden');
            this.renderer.setStyle(this.elRef.nativeElement, 'overflow-y', 'auto');
            this.renderer.removeStyle(this.elRef.nativeElement, 'max-width');
        }
        if (direction === 'horizontal') {
            this.renderer.setStyle(this.elRef.nativeElement, 'height', '100%');
            this.renderer.removeStyle(this.elRef.nativeElement, 'width');
        }
        else {
            this.renderer.setStyle(this.elRef.nativeElement, 'width', '100%');
            this.renderer.removeStyle(this.elRef.nativeElement, 'height');
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setStyleOrder(value) {
        this.renderer.setStyle(this.elRef.nativeElement, 'order', value);
    }
    /**
     * @param {?} value
     * @param {?} isDragging
     * @return {?}
     */
    setStyleFlexbasis(value, isDragging) {
        // If component not yet initialized or gutter being dragged, disable transition
        if (this.split.isViewInitialized === false || isDragging === true) {
            this.setStyleTransition(false);
        }
        // Or use 'useTransition' to know if transition.
        else {
            this.setStyleTransition(this.split.useTransition);
        }
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', value);
    }
    /**
     * @param {?} useTransition
     * @return {?}
     */
    setStyleTransition(useTransition) {
        if (useTransition) {
            this.renderer.setStyle(this.elRef.nativeElement, 'transition', `flex-basis 0.3s`);
        }
        else {
            this.renderer.removeStyle(this.elRef.nativeElement, 'transition');
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTransitionEnd(event) {
        // Limit only flex-basis transition to trigger the event
        if (event.propertyName === 'flex-basis') {
            this.split.notify('transitionEnd');
        }
    }
    /**
     * @return {?}
     */
    lockEvents() {
        this.ngZone.runOutsideAngular(() => {
            this.lockListeners.push(this.renderer.listen(this.elRef.nativeElement, 'selectstart', (e) => false));
            this.lockListeners.push(this.renderer.listen(this.elRef.nativeElement, 'dragstart', (e) => false));
        });
    }
    /**
     * @return {?}
     */
    unlockEvents() {
        while (this.lockListeners.length > 0) {
            /** @type {?} */
            const fct = this.lockListeners.pop();
            if (fct) {
                fct();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unlockEvents();
        if (this.transitionListener) {
            this.transitionListener();
        }
        this.split.removeArea(this);
    }
}
SplitAreaDirective.decorators = [
    { type: Directive, args: [{
                selector: 'as-split-area'
            },] }
];
/** @nocollapse */
SplitAreaDirective.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: Renderer2 },
    { type: SplitComponent }
];
SplitAreaDirective.propDecorators = {
    order: [{ type: Input }],
    size: [{ type: Input }],
    minSize: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class SplitGutterDirective {
    ////
    /**
     * @param {?} elRef
     * @param {?} renderer
     */
    constructor(elRef, renderer) {
        this.elRef = elRef;
        this.renderer = renderer;
        this._useBackground = true;
        ////
        this._disabled = false;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set order(v) {
        this.renderer.setStyle(this.elRef.nativeElement, 'order', v);
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set direction(v) {
        this._direction = v;
        this.refreshStyle();
    }
    /**
     * @return {?}
     */
    get direction() {
        return this._direction;
    }
    ////
    /**
     * @param {?} v
     * @return {?}
     */
    set useTransition(v) {
        if (v) {
            this.renderer.setStyle(this.elRef.nativeElement, 'transition', `flex-basis 0.3s`);
        }
        else {
            this.renderer.removeStyle(this.elRef.nativeElement, 'transition');
        }
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set size(v) {
        this._size = v;
        this.refreshStyle();
    }
    /**
     * @return {?}
     */
    get size() {
        return this._size;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set color(v) {
        this._color = v;
        this.refreshStyle();
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set useBackground(v) {
        this._useBackground = v;
        this.refreshStyle();
    }
    /**
     * @return {?}
     */
    get color() {
        return this._color;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set imageH(v) {
        this._imageH = v;
        this.refreshStyle();
    }
    /**
     * @return {?}
     */
    get imageH() {
        return this._imageH;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set imageV(v) {
        this._imageV = v;
        this.refreshStyle();
    }
    /**
     * @return {?}
     */
    get imageV() {
        return this._imageV;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set disabled(v) {
        this._disabled = v;
        this.refreshStyle();
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @return {?}
     */
    refreshStyle() {
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', `${this.size}px`);
        // fix safari bug about gutter height when direction is horizontal
        this.renderer.setStyle(this.elRef.nativeElement, 'height', (this.direction === 'vertical') ? `${this.size}px` : `100%`);
        this.renderer.setStyle(this.elRef.nativeElement, 'background-color', (this.color !== '') ? this.color : `#eeeeee`);
        /** @type {?} */
        const state = (this.disabled === true) ? 'disabled' : this.direction;
        this.renderer.setStyle(this.elRef.nativeElement, 'background-image', this.getImage(state));
        this.renderer.setStyle(this.elRef.nativeElement, 'cursor', this.getCursor(state));
    }
    /**
     * @param {?} state
     * @return {?}
     */
    getCursor(state) {
        switch (state) {
            case 'horizontal':
                return 'col-resize';
            case 'vertical':
                return 'row-resize';
            case 'disabled':
                return 'default';
        }
    }
    /**
     * @param {?} state
     * @return {?}
     */
    getImage(state) {
        if (this._useBackground) {
            switch (state) {
                case 'horizontal':
                    return (this.imageH !== '') ? this.imageH : defaultImageH;
                case 'vertical':
                    return (this.imageV !== '') ? this.imageV : defaultImageV;
                case 'disabled':
                    return '';
            }
        }
        return '';
    }
}
SplitGutterDirective.decorators = [
    { type: Directive, args: [{
                selector: 'as-split-gutter'
            },] }
];
/** @nocollapse */
SplitGutterDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
SplitGutterDirective.propDecorators = {
    order: [{ type: Input }],
    direction: [{ type: Input }],
    useTransition: [{ type: Input }],
    size: [{ type: Input }],
    color: [{ type: Input }],
    useBackground: [{ type: Input }],
    imageH: [{ type: Input }],
    imageV: [{ type: Input }],
    disabled: [{ type: Input }]
};
/** @type {?} */
const defaultImageH = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==")';
/** @type {?} */
const defaultImageV = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC")';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class AngularSplitModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: AngularSplitModule,
            providers: []
        };
    }
    /**
     * @return {?}
     */
    static forChild() {
        return {
            ngModule: AngularSplitModule,
            providers: []
        };
    }
}
AngularSplitModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    SplitComponent,
                    SplitAreaDirective,
                    SplitGutterDirective,
                ],
                exports: [
                    SplitComponent,
                    SplitAreaDirective,
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { AngularSplitModule, SplitComponent, SplitAreaDirective, SplitGutterDirective as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zcGxpdC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhci1zcGxpdC9saWIvY29tcG9uZW50L3NwbGl0LmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci1zcGxpdC9saWIvZGlyZWN0aXZlL3NwbGl0QXJlYS5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXItc3BsaXQvbGliL2RpcmVjdGl2ZS9zcGxpdEd1dHRlci5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXItc3BsaXQvbGliL21vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdG9yUmVmLCBJbnB1dCwgT3V0cHV0LCBIb3N0QmluZGluZywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFxuICAgIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIyLCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBJQXJlYSB9IGZyb20gJy4uL2ludGVyZmFjZS9JQXJlYSc7XG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi9pbnRlcmZhY2UvSVBvaW50JztcbmltcG9ydCB7IFNwbGl0QXJlYURpcmVjdGl2ZSB9IGZyb20gJy4uL2RpcmVjdGl2ZS9zcGxpdEFyZWEuZGlyZWN0aXZlJztcblxuLyoqXG4gKiBhbmd1bGFyLXNwbGl0XG4gKiBcbiAqIEFyZWFzIHNpemUgYXJlIHNldCBpbiBwZXJjZW50YWdlIG9mIHRoZSBzcGxpdCBjb250YWluZXIuXG4gKiBHdXR0ZXJzIHNpemUgYXJlIHNldCBpbiBwaXhlbHMuXG4gKiBcbiAqIFNvIHdlIHNldCBjc3MgJ2ZsZXgtYmFzaXMnIHByb3BlcnR5IGxpa2UgdGhpcyAod2hlcmUgMCA8PSBhcmVhLnNpemUgPD0gMSk6IFxuICogIGNhbGMoIHsgYXJlYS5zaXplICogMTAwIH0lIC0geyBhcmVhLnNpemUgKiBuYkd1dHRlciAqIGd1dHRlclNpemUgfXB4ICk7XG4gKiBcbiAqIEV4YW1wbGVzIHdpdGggMyB2aXNpYmxlIGFyZWFzIGFuZCAyIGd1dHRlcnM6IFxuICogXG4gKiB8ICAgICAgICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS1bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLVtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAgY2FsYygyMCUgLSA0cHgpICAgICAgICAgIGNhbGMoMjAlIC0gNHB4KSAgICAgICAgICAgICAgY2FsYyg2MCUgLSAxMnB4KSAgICAgICAgICB8XG4gKiBcbiAqIFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tW10tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgIGNhbGMoMzMuMzMlIC0gNi42NjdweCkgICAgICBjYWxjKDMzLjMzJSAtIDYuNjY3cHgpICAgICAgY2FsYygzMy4zMyUgLSA2LjY2N3B4KSAgfFxuICogXG4gKiBcbiAqIHwxMHB4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfFtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8MCAgICAgICAgICAgICAgICAgY2FsYyg2Ni42NiUgLSAxMy4zMzNweCkgICAgICAgICAgICAgICAgICBjYWxjKDMzJSUgLSA2LjY2N3B4KSAgIHxcbiAqIFxuICogXG4gKiAgMTBweCAxMHB4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHxbXVtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfDAgMCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjKDEwMCUgLSAyMHB4KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiBcbiAqL1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FzLXNwbGl0JyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBzdHlsZVVybHM6IFtgLi9zcGxpdC5jb21wb25lbnQuc2Nzc2BdLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1hcmVhIFtuZ0Zvck9mXT1cImRpc3BsYXllZEFyZWFzXCIgbGV0LWluZGV4PVwiaW5kZXhcIiBsZXQtbGFzdD1cImxhc3RcIj5cbiAgICAgICAgICAgIDxhcy1zcGxpdC1ndXR0ZXIgKm5nSWY9XCJsYXN0ID09PSBmYWxzZVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbb3JkZXJdPVwiaW5kZXgqMisxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2RpcmVjdGlvbl09XCJkaXJlY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbdXNlVHJhbnNpdGlvbl09XCJ1c2VUcmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW3NpemVdPVwiZ3V0dGVyU2l6ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtjb2xvcl09XCJndXR0ZXJDb2xvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFt1c2VCYWNrZ3JvdW5kXT1cInVzZUJhY2tncm91bmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbaW1hZ2VIXT1cImd1dHRlckltYWdlSFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtpbWFnZVZdPVwiZ3V0dGVySW1hZ2VWXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJzdGFydERyYWdnaW5nKCRldmVudCwgaW5kZXgqMisxLCBpbmRleCsxKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICh0b3VjaHN0YXJ0KT1cInN0YXJ0RHJhZ2dpbmcoJGV2ZW50LCBpbmRleCoyKzEsIGluZGV4KzEpXCI+PC9hcy1zcGxpdC1ndXR0ZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+YCxcbn0pXG5leHBvcnQgY2xhc3MgU3BsaXRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgcHJpdmF0ZSBfZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuXG4gICAgQElucHV0KCkgc2V0IGRpcmVjdGlvbih2OiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnKSB7XG4gICAgICAgIHYgPSAodiA9PT0gJ3ZlcnRpY2FsJykgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnO1xuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSB2O1xuICAgICAgICBcbiAgICAgICAgWy4uLnRoaXMuZGlzcGxheWVkQXJlYXMsIC4uLnRoaXMuaGlkZWRBcmVhc10uZm9yRWFjaChhcmVhID0+IHtcbiAgICAgICAgICAgIGFyZWEuY29tcC5zZXRTdHlsZVZpc2libGVBbmREaXIoYXJlYS5jb21wLnZpc2libGUsIHRoaXMuaXNEcmFnZ2luZywgdGhpcy5kaXJlY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYnVpbGQoZmFsc2UsIGZhbHNlKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGRpcmVjdGlvbigpOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpcmVjdGlvbjtcbiAgICB9XG4gICAgXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfdXNlVHJhbnNpdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgc2V0IHVzZVRyYW5zaXRpb24odjogYm9vbGVhbikge1xuICAgICAgICB2ID0gKHR5cGVvZih2KSA9PT0gJ2Jvb2xlYW4nKSA/IHYgOiAodiA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogdHJ1ZSk7XG4gICAgICAgIHRoaXMuX3VzZVRyYW5zaXRpb24gPSB2O1xuICAgIH1cbiAgICBcbiAgICBnZXQgdXNlVHJhbnNpdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZVRyYW5zaXRpb247XG4gICAgfVxuICAgIFxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgXG4gICAgQElucHV0KCkgc2V0IGRpc2FibGVkKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgdiA9ICh0eXBlb2YodikgPT09ICdib29sZWFuJykgPyB2IDogKHYgPT09ICdmYWxzZScgPyBmYWxzZSA6IHRydWUpO1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IHY7XG5cbiAgICAgICAgLy8gRm9yY2UgcmVwYWludCBpZiBtb2RpZmllZCBmcm9tIFRTIGNsYXNzIChpbnN0ZWFkIG9mIHRoZSB0ZW1wbGF0ZSlcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgLy8vL1xuXG5cbiAgICBwcml2YXRlIF91c2VCYWNrZ3JvdW5kOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNldCB1c2VCYWNrZ3JvdW5kKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgdiA9ICh0eXBlb2YodikgPT09ICdib29sZWFuJykgPyB2IDogKHYgIT09ICdmYWxzZScpO1xuICAgICAgICB0aGlzLl91c2VCYWNrZ3JvdW5kID0gdjtcblxuICAgICAgICAvLyBGb3JjZSByZXBhaW50IGlmIG1vZGlmaWVkIGZyb20gVFMgY2xhc3MgKGluc3RlYWQgb2YgdGhlIHRlbXBsYXRlKVxuICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGdldCB1c2VCYWNrZ3JvdW5kKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlQmFja2dyb3VuZDtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF93aWR0aDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoKSBzZXQgd2lkdGgodjogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB2ID0gTnVtYmVyKHYpO1xuICAgICAgICB0aGlzLl93aWR0aCA9ICghaXNOYU4odikgJiYgdiA+IDApID8gdiA6IG51bGw7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJ1aWxkKGZhbHNlLCBmYWxzZSk7XG4gICAgfVxuICAgIFxuICAgIGdldCB3aWR0aCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICAgIH1cbiAgICBcbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9oZWlnaHQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgQElucHV0KCkgc2V0IGhlaWdodCh2OiBudW1iZXIgfCBudWxsKSB7XG4gICAgICAgIHYgPSBOdW1iZXIodik7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9ICghaXNOYU4odikgJiYgdiA+IDApID8gdiA6IG51bGw7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJ1aWxkKGZhbHNlLCBmYWxzZSk7XG4gICAgfVxuICAgIFxuICAgIGdldCBoZWlnaHQoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XG4gICAgfVxuICAgIFxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2d1dHRlclNpemU6IG51bWJlciA9IDExO1xuXG4gICAgQElucHV0KCkgc2V0IGd1dHRlclNpemUodjogbnVtYmVyKSB7XG4gICAgICAgIHYgPSBOdW1iZXIodik7XG4gICAgICAgIHRoaXMuX2d1dHRlclNpemUgPSAoIWlzTmFOKHYpICYmIHYgPiAwKSA/IHYgOiAxMTtcblxuICAgICAgICB0aGlzLmJ1aWxkKGZhbHNlLCBmYWxzZSk7XG4gICAgfVxuICAgIFxuICAgIGdldCBndXR0ZXJTaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ndXR0ZXJTaXplO1xuICAgIH1cbiAgICBcbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9ndXR0ZXJDb2xvcjogc3RyaW5nID0gJyc7XG5cbiAgICBASW5wdXQoKSBzZXQgZ3V0dGVyQ29sb3Iodjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2d1dHRlckNvbG9yID0gKHR5cGVvZiB2ID09PSAnc3RyaW5nJyAmJiB2ICE9PSAnJykgPyB2IDogJyc7XG5cbiAgICAgICAgLy8gRm9yY2UgcmVwYWludCBpZiBtb2RpZmllZCBmcm9tIFRTIGNsYXNzIChpbnN0ZWFkIG9mIHRoZSB0ZW1wbGF0ZSlcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGd1dHRlckNvbG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ndXR0ZXJDb2xvcjtcbiAgICB9XG4gICAgXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfZ3V0dGVySW1hZ2VIOiBzdHJpbmcgPSAnJztcblxuICAgIEBJbnB1dCgpIHNldCBndXR0ZXJJbWFnZUgodjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2d1dHRlckltYWdlSCA9ICh0eXBlb2YgdiA9PT0gJ3N0cmluZycgJiYgdiAhPT0gJycpID8gdiA6ICcnO1xuICAgICAgICBcbiAgICAgICAgLy8gRm9yY2UgcmVwYWludCBpZiBtb2RpZmllZCBmcm9tIFRTIGNsYXNzIChpbnN0ZWFkIG9mIHRoZSB0ZW1wbGF0ZSlcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGd1dHRlckltYWdlSCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3V0dGVySW1hZ2VIO1xuICAgIH1cbiAgICBcbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9ndXR0ZXJJbWFnZVY6IHN0cmluZyA9ICcnO1xuXG4gICAgQElucHV0KCkgc2V0IGd1dHRlckltYWdlVih2OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZ3V0dGVySW1hZ2VWID0gKHR5cGVvZiB2ID09PSAnc3RyaW5nJyAmJiB2ICE9PSAnJykgPyB2IDogJyc7XG5cbiAgICAgICAgLy8gRm9yY2UgcmVwYWludCBpZiBtb2RpZmllZCBmcm9tIFRTIGNsYXNzIChpbnN0ZWFkIG9mIHRoZSB0ZW1wbGF0ZSlcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGd1dHRlckltYWdlVigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3V0dGVySW1hZ2VWO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2RpcjogJ2x0cicgfCAncnRsJyA9ICdsdHInO1xuICAgIFxuICAgIEBJbnB1dCgpIHNldCBkaXIodjogJ2x0cicgfCAncnRsJykge1xuICAgICAgICB2ID0gKHYgPT09ICdydGwnKSA/ICdydGwnIDogJ2x0cic7XG4gICAgICAgIHRoaXMuX2RpciA9IHY7XG4gICAgfVxuICAgIFxuICAgIGdldCBkaXIoKTogJ2x0cicgfCAncnRsJyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXI7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgQE91dHB1dCgpIGRyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8e2d1dHRlck51bTogbnVtYmVyLCBzaXplczogQXJyYXk8bnVtYmVyPn0+KGZhbHNlKTtcbiAgICBAT3V0cHV0KCkgZHJhZ1Byb2dyZXNzID0gbmV3IEV2ZW50RW1pdHRlcjx7Z3V0dGVyTnVtOiBudW1iZXIsIHNpemVzOiBBcnJheTxudW1iZXI+fT4oZmFsc2UpO1xuICAgIEBPdXRwdXQoKSBkcmFnRW5kID0gbmV3IEV2ZW50RW1pdHRlcjx7Z3V0dGVyTnVtOiBudW1iZXIsIHNpemVzOiBBcnJheTxudW1iZXI+fT4oZmFsc2UpO1xuICAgIEBPdXRwdXQoKSBndXR0ZXJDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8e2d1dHRlck51bTogbnVtYmVyLCBzaXplczogQXJyYXk8bnVtYmVyPn0+KGZhbHNlKTtcblxuICAgIHByaXZhdGUgdHJhbnNpdGlvbkVuZEludGVybmFsID0gbmV3IFN1YmplY3Q8QXJyYXk8bnVtYmVyPj4oKTtcbiAgICBAT3V0cHV0KCkgdHJhbnNpdGlvbkVuZCA9ICg8T2JzZXJ2YWJsZTxBcnJheTxudW1iZXI+Pj4gdGhpcy50cmFuc2l0aW9uRW5kSW50ZXJuYWwuYXNPYnNlcnZhYmxlKCkpLnBpcGUoXG4gICAgICAgIGRlYm91bmNlVGltZSgyMClcbiAgICApO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS5mbGV4LWRpcmVjdGlvbicpIGdldCBjc3NGbGV4ZGlyZWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpID8gJ3JvdycgOiAnY29sdW1uJztcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJykgZ2V0IGNzc1dpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aWR0aCA/IGAkeyB0aGlzLndpZHRoIH1weGAgOiAnMTAwJSc7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQnKSBnZXQgY3NzSGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQgPyBgJHsgdGhpcy5oZWlnaHQgfXB4YCA6ICcxMDAlJztcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1pbi13aWR0aCcpIGdldCBjc3NNaW53aWR0aCgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSA/IGAkeyB0aGlzLmdldE5iR3V0dGVycygpICogdGhpcy5ndXR0ZXJTaXplIH1weGAgOiBudWxsO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZygnc3R5bGUubWluLWhlaWdodCcpIGdldCBjc3NNaW5oZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5kaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpID8gYCR7IHRoaXMuZ2V0TmJHdXR0ZXJzKCkgKiB0aGlzLmd1dHRlclNpemUgfXB4YCA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGlzVmlld0luaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBpc0RyYWdnaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBkcmFnZ2luZ1dpdGhvdXRNb3ZlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBjdXJyZW50R3V0dGVyTnVtOiBudW1iZXIgPSAwO1xuXG4gICAgcHVibGljIHJlYWRvbmx5IGRpc3BsYXllZEFyZWFzOiBBcnJheTxJQXJlYT4gPSBbXTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGhpZGVkQXJlYXM6IEFycmF5PElBcmVhPiA9IFtdO1xuICAgIFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHJhZ0xpc3RlbmVyczogQXJyYXk8RnVuY3Rpb24+ID0gW107XG4gICAgcHJpdmF0ZSByZWFkb25seSBkcmFnU3RhcnRWYWx1ZXMgPSB7XG4gICAgICAgIHNpemVQaXhlbENvbnRhaW5lcjogMCxcbiAgICAgICAgc2l6ZVBpeGVsQTogMCxcbiAgICAgICAgc2l6ZVBpeGVsQjogMCxcbiAgICAgICAgc2l6ZVBlcmNlbnRBOiAwLFxuICAgICAgICBzaXplUGVyY2VudEI6IDAsXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmlzVmlld0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE5iR3V0dGVycygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggLSAxO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRBcmVhKGNvbXA6IFNwbGl0QXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBuZXdBcmVhOiBJQXJlYSA9IHtcbiAgICAgICAgICAgIGNvbXAsIFxuICAgICAgICAgICAgb3JkZXI6IDAsIFxuICAgICAgICAgICAgc2l6ZTogMCxcbiAgICAgICAgfTtcblxuICAgICAgICBpZihjb21wLnZpc2libGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMucHVzaChuZXdBcmVhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZWRBcmVhcy5wdXNoKG5ld0FyZWEpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29tcC5zZXRTdHlsZVZpc2libGVBbmREaXIoY29tcC52aXNpYmxlLCB0aGlzLmlzRHJhZ2dpbmcsIHRoaXMuZGlyZWN0aW9uKTtcblxuICAgICAgICB0aGlzLmJ1aWxkKHRydWUsIHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVBcmVhKGNvbXA6IFNwbGl0QXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBpZih0aGlzLmRpc3BsYXllZEFyZWFzLnNvbWUoYSA9PiBhLmNvbXAgPT09IGNvbXApKSB7XG4gICAgICAgICAgICBjb25zdCBhcmVhID0gPElBcmVhPiB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXAgPT09IGNvbXApXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLnNwbGljZSh0aGlzLmRpc3BsYXllZEFyZWFzLmluZGV4T2YoYXJlYSksIDEpO1xuXG4gICAgICAgICAgICB0aGlzLmJ1aWxkKHRydWUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5oaWRlZEFyZWFzLnNvbWUoYSA9PiBhLmNvbXAgPT09IGNvbXApKSB7XG4gICAgICAgICAgICBjb25zdCBhcmVhID0gPElBcmVhPiB0aGlzLmhpZGVkQXJlYXMuZmluZChhID0+IGEuY29tcCA9PT0gY29tcClcbiAgICAgICAgICAgIHRoaXMuaGlkZWRBcmVhcy5zcGxpY2UodGhpcy5oaWRlZEFyZWFzLmluZGV4T2YoYXJlYSksIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUFyZWEoY29tcDogU3BsaXRBcmVhRGlyZWN0aXZlLCByZXNldE9yZGVyczogYm9vbGVhbiwgcmVzZXRTaXplczogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICAvLyBPbmx5IHJlZnJlc2ggaWYgYXJlYSBpcyBkaXNwbGF5ZWQgKE5vIG5lZWQgdG8gY2hlY2sgaW5zaWRlICdoaWRlZEFyZWFzJylcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmluZChhID0+IGEuY29tcCA9PT0gY29tcCk7XG5cbiAgICAgICAgaWYoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5idWlsZChyZXNldE9yZGVycywgcmVzZXRTaXplcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0FyZWEoY29tcDogU3BsaXRBcmVhRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFyZWEgPSB0aGlzLmhpZGVkQXJlYXMuZmluZChhID0+IGEuY29tcCA9PT0gY29tcCk7XG5cbiAgICAgICAgaWYoYXJlYSkge1xuICAgICAgICAgICAgY29tcC5zZXRTdHlsZVZpc2libGVBbmREaXIoY29tcC52aXNpYmxlLCB0aGlzLmlzRHJhZ2dpbmcsIHRoaXMuZGlyZWN0aW9uKTtcblxuICAgICAgICAgICAgY29uc3QgYXJlYXMgPSB0aGlzLmhpZGVkQXJlYXMuc3BsaWNlKHRoaXMuaGlkZWRBcmVhcy5pbmRleE9mKGFyZWEpLCAxKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMucHVzaCguLi5hcmVhcyk7XG5cbiAgICAgICAgICAgIHRoaXMuYnVpbGQodHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZUFyZWEoY29tcDogU3BsaXRBcmVhRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFyZWEgPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXAgPT09IGNvbXApO1xuXG4gICAgICAgIGlmKGFyZWEpIHtcbiAgICAgICAgICAgIGNvbXAuc2V0U3R5bGVWaXNpYmxlQW5kRGlyKGNvbXAudmlzaWJsZSwgdGhpcy5pc0RyYWdnaW5nLCB0aGlzLmRpcmVjdGlvbik7XG5cbiAgICAgICAgICAgIGNvbnN0IGFyZWFzID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5zcGxpY2UodGhpcy5kaXNwbGF5ZWRBcmVhcy5pbmRleE9mKGFyZWEpLCAxKTtcbiAgICAgICAgICAgIGFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICAgICAgYXJlYS5vcmRlciA9IDA7XG4gICAgICAgICAgICAgICAgYXJlYS5zaXplID0gMDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLmhpZGVkQXJlYXMucHVzaCguLi5hcmVhcyk7XG5cbiAgICAgICAgICAgIHRoaXMuYnVpbGQodHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1aWxkKHJlc2V0T3JkZXJzOiBib29sZWFuLCByZXNldFNpemVzOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG5cbiAgICAgICAgLy8gw4LCpCBBUkVBUyBPUkRFUlxuICAgICAgICBcbiAgICAgICAgaWYocmVzZXRPcmRlcnMgPT09IHRydWUpIHsgICAgXG5cbiAgICAgICAgICAgIC8vIElmIHVzZXIgcHJvdmlkZWQgJ29yZGVyJyBmb3IgZWFjaCBhcmVhLCB1c2UgaXQgdG8gc29ydCB0aGVtLlxuICAgICAgICAgICAgaWYodGhpcy5kaXNwbGF5ZWRBcmVhcy5ldmVyeShhID0+IGEuY29tcC5vcmRlciAhPT0gbnVsbCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLnNvcnQoKGEsIGIpID0+ICg8bnVtYmVyPiBhLmNvbXAub3JkZXIpIC0gKDxudW1iZXI+IGIuY29tcC5vcmRlcikpO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgLy8gVGhlbiBzZXQgcmVhbCBvcmRlciB3aXRoIG11bHRpcGxlcyBvZiAyLCBudW1iZXJzIGJldHdlZW4gd2lsbCBiZSB1c2VkIGJ5IGd1dHRlcnMuXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goKGFyZWEsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBhcmVhLm9yZGVyID0gaSAqIDI7XG4gICAgICAgICAgICAgICAgYXJlYS5jb21wLnNldFN0eWxlT3JkZXIoYXJlYS5vcmRlcik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gw4LCpCBBUkVBUyBTSVpFIFBFUkNFTlRcbiAgICAgICAgXG4gICAgICAgIGlmKHJlc2V0U2l6ZXMgPT09IHRydWUpIHtcblxuICAgICAgICAgICAgY29uc3QgdG90YWxVc2VyU2l6ZSA9IDxudW1iZXI+IHRoaXMuZGlzcGxheWVkQXJlYXMucmVkdWNlKCh0b3RhbDogbnVtYmVyLCBzOiBJQXJlYSkgPT4gcy5jb21wLnNpemUgPyB0b3RhbCArIHMuY29tcC5zaXplIDogdG90YWwsIDApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBJZiB1c2VyIHByb3ZpZGVkICdzaXplJyBmb3IgZWFjaCBhcmVhIGFuZCB0b3RhbCA9PSAxLCB1c2UgaXQuXG4gICAgICAgICAgICBpZih0aGlzLmRpc3BsYXllZEFyZWFzLmV2ZXJ5KGEgPT4gYS5jb21wLnNpemUgIT09IG51bGwpICYmIHRvdGFsVXNlclNpemUgPiAuOTk5ICYmIHRvdGFsVXNlclNpemUgPCAxLjAwMSApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXJlYS5zaXplID0gPG51bWJlcj4gYXJlYS5jb21wLnNpemU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBFbHNlIHNldCBlcXVhbCBzaXplcyBmb3IgYWxsIGFyZWFzLlxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IDEgLyB0aGlzLmRpc3BsYXllZEFyZWFzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFyZWEuc2l6ZSA9IHNpemU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIMOCwqQgXG4gICAgICAgIC8vIElmIHNvbWUgcmVhbCBhcmVhIHNpemVzIGFyZSBsZXNzIHRoYW4gZ3V0dGVyU2l6ZSwgXG4gICAgICAgIC8vIHNldCB0aGVtIHRvIHplcm8gYW5kIGRpc3BhdGNoIHNpemUgdG8gb3RoZXJzLlxuXG4gICAgICAgIGxldCBwZXJjZW50VG9EaXNwYXRjaCA9IDA7XG4gICAgICAgIFxuICAgICAgICAvLyBHZXQgY29udGFpbmVyIHBpeGVsIHNpemVcbiAgICAgICAgbGV0IGNvbnRhaW5lclNpemVQaXhlbCA9IHRoaXMuZ2V0TmJHdXR0ZXJzKCkgKiB0aGlzLmd1dHRlclNpemU7XG4gICAgICAgIGlmKHRoaXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lclNpemVQaXhlbCA9IHRoaXMud2lkdGggPyB0aGlzLndpZHRoIDogdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50WydvZmZzZXRXaWR0aCddO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyU2l6ZVBpeGVsID0gdGhpcy5oZWlnaHQgPyB0aGlzLmhlaWdodCA6IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudFsnb2Zmc2V0SGVpZ2h0J107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICBpZihhcmVhLnNpemUgKiBjb250YWluZXJTaXplUGl4ZWwgPCB0aGlzLmd1dHRlclNpemUpIHtcbiAgICAgICAgICAgICAgICBwZXJjZW50VG9EaXNwYXRjaCArPSBhcmVhLnNpemU7XG4gICAgICAgICAgICAgICAgYXJlYS5zaXplID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBpZihwZXJjZW50VG9EaXNwYXRjaCA+IDAgJiYgdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBuYkFyZWFzTm90WmVybyA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmlsdGVyKGEgPT4gYS5zaXplICE9PSAwKS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmKG5iQXJlYXNOb3RaZXJvID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRUb0FkZCA9IHBlcmNlbnRUb0Rpc3BhdGNoIC8gbmJBcmVhc05vdFplcm87XG4gICAgXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5maWx0ZXIoYSA9PiBhLnNpemUgIT09IDApLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFyZWEuc2l6ZSArPSBwZXJjZW50VG9BZGQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBbGwgYXJlYSBzaXplcyAoY29udGFpbmVyIHBlcmNlbnRhZ2UpIGFyZSBsZXNzIHRoYW4gZ3V0ZXJTaXplLFxuICAgICAgICAgICAgLy8gSXQgbWVhbnMgY29udGFpbmVyU2l6ZSA8IG5nR3V0dGVycyAqIGd1dHRlclNpemVcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXNbdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggLSAxXS5zaXplID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5yZWZyZXNoU3R5bGVTaXplcygpO1xuICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaFN0eWxlU2l6ZXMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHN1bUd1dHRlclNpemUgPSB0aGlzLmdldE5iR3V0dGVycygpICogdGhpcy5ndXR0ZXJTaXplO1xuXG4gICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgICAgICAgIGFyZWEuY29tcC5zZXRTdHlsZUZsZXhiYXNpcyhgY2FsYyggJHsgYXJlYS5zaXplICogMTAwIH0lIC0gJHsgYXJlYS5zaXplICogc3VtR3V0dGVyU2l6ZSB9cHggKWAsIHRoaXMuaXNEcmFnZ2luZyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGFydERyYWdnaW5nKHN0YXJ0RXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50LCBndXR0ZXJPcmRlcjogbnVtYmVyLCBndXR0ZXJOdW06IG51bWJlcik6IHZvaWQge1xuICAgICAgICBzdGFydEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gUGxhY2UgY29kZSBoZXJlIHRvIGFsbG93ICcoZ3V0dGVyQ2xpY2spJyBldmVudCBldmVuIGlmICdbZGlzYWJsZWRdPVwidHJ1ZVwiJy5cbiAgICAgICAgdGhpcy5jdXJyZW50R3V0dGVyTnVtID0gZ3V0dGVyTnVtO1xuICAgICAgICB0aGlzLmRyYWdnaW5nV2l0aG91dE1vdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCggdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ21vdXNldXAnLCAoZTogTW91c2VFdmVudCkgPT4gdGhpcy5zdG9wRHJhZ2dpbmcoKSkgKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKCB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAndG91Y2hlbmQnLCAoZTogVG91Y2hFdmVudCkgPT4gdGhpcy5zdG9wRHJhZ2dpbmcoKSkgKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKCB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAndG91Y2hjYW5jZWwnLCAoZTogVG91Y2hFdmVudCkgPT4gdGhpcy5zdG9wRHJhZ2dpbmcoKSkgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXJlYUEgPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLm9yZGVyID09PSBndXR0ZXJPcmRlciAtIDEpO1xuICAgICAgICBjb25zdCBhcmVhQiA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmluZChhID0+IGEub3JkZXIgPT09IGd1dHRlck9yZGVyICsgMSk7XG4gICAgICAgIFxuICAgICAgICBpZighYXJlYUEgfHwgIWFyZWFCKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wID0gKHRoaXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpID8gJ29mZnNldFdpZHRoJyA6ICdvZmZzZXRIZWlnaHQnO1xuICAgICAgICB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGl4ZWxDb250YWluZXIgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnRbcHJvcF07XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEEgPSBhcmVhQS5jb21wLmdldFNpemVQaXhlbChwcm9wKTtcbiAgICAgICAgdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQiA9IGFyZWFCLmNvbXAuZ2V0U2l6ZVBpeGVsKHByb3ApO1xuICAgICAgICB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEEgPSBhcmVhQS5zaXplO1xuICAgICAgICB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIgPSBhcmVhQi5zaXplO1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0OiBJUG9pbnQgPSB0aGlzLmdldFBvaW50RnJvbUV2ZW50KHN0YXJ0RXZlbnQpO1xuICAgICAgICBpZighc3RhcnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKCB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnbW91c2Vtb3ZlJywgKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMuZHJhZ0V2ZW50KGUsIHN0YXJ0LCBhcmVhQSwgYXJlYUIpKSApO1xuICAgICAgICAgICAgdGhpcy5kcmFnTGlzdGVuZXJzLnB1c2goIHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICd0b3VjaG1vdmUnLCAoZTogVG91Y2hFdmVudCkgPT4gdGhpcy5kcmFnRXZlbnQoZSwgc3RhcnQsIGFyZWFBLCBhcmVhQikpICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFyZWFBLmNvbXAubG9ja0V2ZW50cygpO1xuICAgICAgICBhcmVhQi5jb21wLmxvY2tFdmVudHMoKTtcblxuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMubm90aWZ5KCdzdGFydCcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhZ0V2ZW50KGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCwgc3RhcnQ6IElQb2ludCwgYXJlYUE6IElBcmVhLCBhcmVhQjogSUFyZWEpOiB2b2lkIHtcbiAgICAgICAgaWYoIXRoaXMuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVuZDogSVBvaW50ID0gdGhpcy5nZXRQb2ludEZyb21FdmVudChldmVudCk7XG4gICAgICAgIGlmKCFlbmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5kcmFnZ2luZ1dpdGhvdXRNb3ZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhZyhzdGFydCwgZW5kLCBhcmVhQSwgYXJlYUIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UG9pbnRGcm9tRXZlbnQoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KTogSVBvaW50IHtcbiAgICAgICAgLy8gVG91Y2hFdmVudFxuICAgICAgICBpZihldmVudCBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogZXZlbnQudG91Y2hlc1swXS5wYWdlWCxcbiAgICAgICAgICAgICAgICB5OiBldmVudC50b3VjaGVzWzBdLnBhZ2VZLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBNb3VzZUV2ZW50XG4gICAgICAgIGVsc2UgaWYoZXZlbnQucGFnZVggIT09IHVuZGVmaW5lZCAmJiBldmVudC5wYWdlWSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHg6IGV2ZW50LnBhZ2VYLFxuICAgICAgICAgICAgICAgIHk6IGV2ZW50LnBhZ2VZLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYWcoc3RhcnQ6IElQb2ludCwgZW5kOiBJUG9pbnQsIGFyZWFBOiBJQXJlYSwgYXJlYUI6IElBcmVhKTogdm9pZCB7XG5cbiAgICAgICAgLy8gw4LCpCBBUkVBUyBTSVpFIFBJWEVMXG5cbiAgICAgICAgY29uc3QgZGV2aWNlUGl4ZWxSYXRpbyA9IC8qd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwqLyAxO1xuICAgICAgICBsZXQgb2Zmc2V0UGl4ZWwgPSAodGhpcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykgPyAoc3RhcnQueCAtIGVuZC54KSA6IChzdGFydC55IC0gZW5kLnkpO1xuICAgICAgICBvZmZzZXRQaXhlbCA9IG9mZnNldFBpeGVsIC8gZGV2aWNlUGl4ZWxSYXRpbztcblxuICAgICAgICBpZih0aGlzLmRpciA9PT0gJ3J0bCcpIHtcbiAgICAgICAgICAgIG9mZnNldFBpeGVsID0gLW9mZnNldFBpeGVsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5ld1NpemVQaXhlbEEgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGl4ZWxBIC0gb2Zmc2V0UGl4ZWw7XG4gICAgICAgIGxldCBuZXdTaXplUGl4ZWxCID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQiArIG9mZnNldFBpeGVsO1xuXG4gICAgICAgIGlmKG5ld1NpemVQaXhlbEEgPCB0aGlzLmd1dHRlclNpemUgfHwgbmV3U2l6ZVBpeGVsQiA8IHRoaXMuZ3V0dGVyU2l6ZSkge1xuICAgICAgICAgICAgLy8gV1RGLi4gZ2V0IG91dCBvZiBoZXJlIVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYobmV3U2l6ZVBpeGVsQSA8IHRoaXMuZ3V0dGVyU2l6ZSkge1xuICAgICAgICAgICAgbmV3U2l6ZVBpeGVsQiArPSBuZXdTaXplUGl4ZWxBO1xuICAgICAgICAgICAgbmV3U2l6ZVBpeGVsQSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihuZXdTaXplUGl4ZWxCIDwgdGhpcy5ndXR0ZXJTaXplKSB7XG4gICAgICAgICAgICBuZXdTaXplUGl4ZWxBICs9IG5ld1NpemVQaXhlbEI7XG4gICAgICAgICAgICBuZXdTaXplUGl4ZWxCID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIMOCwqQgQVJFQVMgU0laRSBQRVJDRU5UXG5cbiAgICAgICAgaWYobmV3U2l6ZVBpeGVsQSA9PT0gMCkge1xuICAgICAgICAgICAgYXJlYUIuc2l6ZSArPSBhcmVhQS5zaXplO1xuICAgICAgICAgICAgYXJlYUEuc2l6ZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihuZXdTaXplUGl4ZWxCID09PSAwKSB7XG4gICAgICAgICAgICBhcmVhQS5zaXplICs9IGFyZWFCLnNpemU7XG4gICAgICAgICAgICBhcmVhQi5zaXplID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIE5FV19QRVJDRU5UID0gU1RBUlRfUEVSQ0VOVCAvIFNUQVJUX1BJWEVMICogTkVXX1BJWEVMO1xuICAgICAgICAgICAgaWYodGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRBID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYXJlYUIuc2l6ZSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QiAvIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEIgKiBuZXdTaXplUGl4ZWxCO1xuICAgICAgICAgICAgICAgIGFyZWFBLnNpemUgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIgLSBhcmVhQi5zaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIgPT09IDApIHtcbiAgICAgICAgICAgICAgICBhcmVhQS5zaXplID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRBIC8gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQSAqIG5ld1NpemVQaXhlbEE7XG4gICAgICAgICAgICAgICAgYXJlYUIuc2l6ZSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSAtIGFyZWFBLnNpemU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcmVhQS5zaXplID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRBIC8gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQSAqIG5ld1NpemVQaXhlbEE7XG4gICAgICAgICAgICAgICAgYXJlYUIuc2l6ZSA9ICh0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEEgKyB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIpIC0gYXJlYUEuc2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaFN0eWxlU2l6ZXMoKTtcbiAgICAgICAgdGhpcy5ub3RpZnkoJ3Byb2dyZXNzJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdG9wRHJhZ2dpbmcoKTogdm9pZCB7XG4gICAgICAgIGlmKHRoaXMuaXNEcmFnZ2luZyA9PT0gZmFsc2UgJiYgdGhpcy5kcmFnZ2luZ1dpdGhvdXRNb3ZlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgICAgICAgYXJlYS5jb21wLnVubG9ja0V2ZW50cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3aGlsZSh0aGlzLmRyYWdMaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZmN0ID0gdGhpcy5kcmFnTGlzdGVuZXJzLnBvcCgpO1xuICAgICAgICAgICAgaWYoZmN0KSB7XG4gICAgICAgICAgICAgICAgZmN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuZHJhZ2dpbmdXaXRob3V0TW92ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnkoJ2NsaWNrJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeSgnZW5kJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kcmFnZ2luZ1dpdGhvdXRNb3ZlID0gZmFsc2U7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgbm90aWZ5KHR5cGU6ICdzdGFydCcgfCAncHJvZ3Jlc3MnIHwgJ2VuZCcgfCAnY2xpY2snIHwgJ3RyYW5zaXRpb25FbmQnKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFyZWFzU2l6ZTogQXJyYXk8bnVtYmVyPiA9IHRoaXMuZGlzcGxheWVkQXJlYXMubWFwKGEgPT4gYS5zaXplICogMTAwKTtcblxuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyYWdTdGFydC5lbWl0KHtndXR0ZXJOdW06IHRoaXMuY3VycmVudEd1dHRlck51bSwgc2l6ZXM6IGFyZWFzU2l6ZX0pO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncHJvZ3Jlc3MnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kcmFnUHJvZ3Jlc3MuZW1pdCh7Z3V0dGVyTnVtOiB0aGlzLmN1cnJlbnRHdXR0ZXJOdW0sIHNpemVzOiBhcmVhc1NpemV9KTtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyYWdFbmQuZW1pdCh7Z3V0dGVyTnVtOiB0aGlzLmN1cnJlbnRHdXR0ZXJOdW0sIHNpemVzOiBhcmVhc1NpemV9KTtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ3V0dGVyQ2xpY2suZW1pdCh7Z3V0dGVyTnVtOiB0aGlzLmN1cnJlbnRHdXR0ZXJOdW0sIHNpemVzOiBhcmVhc1NpemV9KTtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3RyYW5zaXRpb25FbmQnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2l0aW9uRW5kSW50ZXJuYWwubmV4dChhcmVhc1NpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBPbkluaXQsIE9uRGVzdHJveSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNwbGl0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50L3NwbGl0LmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnYXMtc3BsaXQtYXJlYSdcbn0pXG5leHBvcnQgY2xhc3MgU3BsaXRBcmVhRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgcHJpdmF0ZSBfb3JkZXI6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgQElucHV0KCkgc2V0IG9yZGVyKHY6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdiA9IE51bWJlcih2KTtcbiAgICAgICAgdGhpcy5fb3JkZXIgPSAhaXNOYU4odikgPyB2IDogbnVsbDtcblxuICAgICAgICB0aGlzLnNwbGl0LnVwZGF0ZUFyZWEodGhpcywgdHJ1ZSwgZmFsc2UpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgb3JkZXIoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcmRlcjtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9zaXplOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIEBJbnB1dCgpIHNldCBzaXplKHY6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdiA9IE51bWJlcih2KTtcbiAgICAgICAgdGhpcy5fc2l6ZSA9ICghaXNOYU4odikgJiYgdiA+PSAwICYmIHYgPD0gMTAwKSA/ICh2LzEwMCkgOiBudWxsO1xuXG4gICAgICAgIHRoaXMuc3BsaXQudXBkYXRlQXJlYSh0aGlzLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICAgIFxuICAgIGdldCBzaXplKCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9taW5TaXplOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgc2V0IG1pblNpemUodjogbnVtYmVyKSB7XG4gICAgICAgIHYgPSBOdW1iZXIodik7XG4gICAgICAgIHRoaXMuX21pblNpemUgPSAoIWlzTmFOKHYpICYmIHYgPiAwICYmIHYgPCAxMDApID8gdi8xMDAgOiAwO1xuXG4gICAgICAgIHRoaXMuc3BsaXQudXBkYXRlQXJlYSh0aGlzLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICAgIFxuICAgIGdldCBtaW5TaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5TaXplO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX3Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2V0IHZpc2libGUodjogYm9vbGVhbikge1xuICAgICAgICB2ID0gKHR5cGVvZih2KSA9PT0gJ2Jvb2xlYW4nKSA/IHYgOiAodiA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogdHJ1ZSk7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2O1xuXG4gICAgICAgIGlmKHRoaXMudmlzaWJsZSkgeyBcbiAgICAgICAgICAgIHRoaXMuc3BsaXQuc2hvd0FyZWEodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNwbGl0LmhpZGVBcmVhKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgdHJhbnNpdGlvbkxpc3RlbmVyOiBGdW5jdGlvbjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvY2tMaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPiA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHNwbGl0OiBTcGxpdENvbXBvbmVudCkge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zcGxpdC5hZGRBcmVhKHRoaXMpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZmxleC1ncm93JywgJzAnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdmbGV4LXNocmluaycsICcwJyk7XG5cbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uZW5kJywgKGU6IFRyYW5zaXRpb25FdmVudCkgPT4gdGhpcy5vblRyYW5zaXRpb25FbmQoZSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2l6ZVBpeGVsKHByb3A6ICdvZmZzZXRXaWR0aCcgfCAnb2Zmc2V0SGVpZ2h0Jyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnRbcHJvcF07XG4gICAgfVxuXG4gICAgcHVibGljIHNldFN0eWxlVmlzaWJsZUFuZERpcihpc1Zpc2libGU6IGJvb2xlYW4sIGlzRHJhZ2dpbmc6IGJvb2xlYW4sIGRpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyk6IHZvaWQge1xuICAgICAgICBpZihpc1Zpc2libGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlRmxleGJhc2lzKCcwJywgaXNEcmFnZ2luZyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93LXgnLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnbWF4LXdpZHRoJywgJzAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnb3ZlcmZsb3cteCcsICdoaWRkZW4nKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnb3ZlcmZsb3cteScsICdhdXRvJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ21heC13aWR0aCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgJzEwMCUnKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAnMTAwJScpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTdHlsZU9yZGVyKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdvcmRlcicsIHZhbHVlKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHNldFN0eWxlRmxleGJhc2lzKHZhbHVlOiBzdHJpbmcsIGlzRHJhZ2dpbmc6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgLy8gSWYgY29tcG9uZW50IG5vdCB5ZXQgaW5pdGlhbGl6ZWQgb3IgZ3V0dGVyIGJlaW5nIGRyYWdnZWQsIGRpc2FibGUgdHJhbnNpdGlvblxuICAgICAgICBpZih0aGlzLnNwbGl0LmlzVmlld0luaXRpYWxpemVkID09PSBmYWxzZSB8fCBpc0RyYWdnaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlVHJhbnNpdGlvbihmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3IgdXNlICd1c2VUcmFuc2l0aW9uJyB0byBrbm93IGlmIHRyYW5zaXRpb24uXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZVRyYW5zaXRpb24odGhpcy5zcGxpdC51c2VUcmFuc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZmxleC1iYXNpcycsIHZhbHVlKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBzZXRTdHlsZVRyYW5zaXRpb24odXNlVHJhbnNpdGlvbjogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZih1c2VUcmFuc2l0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb24nLCBgZmxleC1iYXNpcyAwLjNzYCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb24nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIG9uVHJhbnNpdGlvbkVuZChldmVudDogVHJhbnNpdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIExpbWl0IG9ubHkgZmxleC1iYXNpcyB0cmFuc2l0aW9uIHRvIHRyaWdnZXIgdGhlIGV2ZW50XG4gICAgICAgIGlmKGV2ZW50LnByb3BlcnR5TmFtZSA9PT0gJ2ZsZXgtYmFzaXMnKSB7XG4gICAgICAgICAgICB0aGlzLnNwbGl0Lm5vdGlmeSgndHJhbnNpdGlvbkVuZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBsb2NrRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvY2tMaXN0ZW5lcnMucHVzaCggdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnc2VsZWN0c3RhcnQnLCAoZTogRXZlbnQpID0+IGZhbHNlKSApO1xuICAgICAgICAgICAgdGhpcy5sb2NrTGlzdGVuZXJzLnB1c2goIHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2RyYWdzdGFydCcsIChlOiBFdmVudCkgPT4gZmFsc2UpICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyB1bmxvY2tFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHdoaWxlKHRoaXMubG9ja0xpc3RlbmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBmY3QgPSB0aGlzLmxvY2tMaXN0ZW5lcnMucG9wKCk7XG4gICAgICAgICAgICBpZihmY3QpIHtcbiAgICAgICAgICAgICAgICBmY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51bmxvY2tFdmVudHMoKTtcblxuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb25MaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3BsaXQucmVtb3ZlQXJlYSh0aGlzKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdhcy1zcGxpdC1ndXR0ZXInXG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0R3V0dGVyRGlyZWN0aXZlIHtcblxuICAgIEBJbnB1dCgpIHNldCBvcmRlcih2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdvcmRlcicsIHYpO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2RpcmVjdGlvbjogJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJztcblxuICAgIEBJbnB1dCgpIHNldCBkaXJlY3Rpb24odjogJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJykge1xuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSB2O1xuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZSgpO1xuICAgIH1cblxuICAgIGdldCBkaXJlY3Rpb24oKTogJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXJlY3Rpb247XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgQElucHV0KCkgc2V0IHVzZVRyYW5zaXRpb24odjogYm9vbGVhbikge1xuICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uJywgYGZsZXgtYmFzaXMgMC4zc2ApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9zaXplOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBzZXQgc2l6ZSh2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHY7XG4gICAgICAgIHRoaXMucmVmcmVzaFN0eWxlKCk7XG4gICAgfVxuXG4gICAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfY29sb3I6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHNldCBjb2xvcih2OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fY29sb3IgPSB2O1xuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VzZUJhY2tncm91bmQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2V0IHVzZUJhY2tncm91bmQodjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl91c2VCYWNrZ3JvdW5kID0gdjtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3R5bGUoKTtcbiAgICB9XG5cbiAgICBnZXQgY29sb3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2ltYWdlSDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2V0IGltYWdlSCh2OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faW1hZ2VIID0gdjtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3R5bGUoKTtcbiAgICB9XG5cbiAgICBnZXQgaW1hZ2VIKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZUg7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfaW1hZ2VWOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzZXQgaW1hZ2VWKHY6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pbWFnZVYgPSB2O1xuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZSgpO1xuICAgIH1cblxuICAgIGdldCBpbWFnZVYoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ltYWdlVjtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgc2V0IGRpc2FibGVkKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2O1xuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZSgpO1xuICAgIH1cblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hTdHlsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdmbGV4LWJhc2lzJywgYCR7dGhpcy5zaXplfXB4YCk7XG5cbiAgICAgICAgLy8gZml4IHNhZmFyaSBidWcgYWJvdXQgZ3V0dGVyIGhlaWdodCB3aGVuIGRpcmVjdGlvbiBpcyBob3Jpem9udGFsXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgKHRoaXMuZGlyZWN0aW9uID09PSAndmVydGljYWwnKSA/IGAke3RoaXMuc2l6ZX1weGAgOiBgMTAwJWApO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZC1jb2xvcicsICh0aGlzLmNvbG9yICE9PSAnJykgPyB0aGlzLmNvbG9yIDogYCNlZWVlZWVgKTtcblxuICAgICAgICBjb25zdCBzdGF0ZTogJ2Rpc2FibGVkJyB8ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCcgPSAodGhpcy5kaXNhYmxlZCA9PT0gdHJ1ZSkgPyAnZGlzYWJsZWQnIDogdGhpcy5kaXJlY3Rpb247XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZC1pbWFnZScsIHRoaXMuZ2V0SW1hZ2Uoc3RhdGUpKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdjdXJzb3InLCB0aGlzLmdldEN1cnNvcihzdGF0ZSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q3Vyc29yKHN0YXRlOiAnZGlzYWJsZWQnIHwgJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJyk6IHN0cmluZyB7XG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2hvcml6b250YWwnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnY29sLXJlc2l6ZSc7XG5cbiAgICAgICAgICAgIGNhc2UgJ3ZlcnRpY2FsJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3Jvdy1yZXNpemUnO1xuXG4gICAgICAgICAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdkZWZhdWx0JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SW1hZ2Uoc3RhdGU6ICdkaXNhYmxlZCcgfCAndmVydGljYWwnIHwgJ2hvcml6b250YWwnKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzZUJhY2tncm91bmQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdob3Jpem9udGFsJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmltYWdlSCAhPT0gJycpID8gdGhpcy5pbWFnZUggOiBkZWZhdWx0SW1hZ2VIO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAndmVydGljYWwnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuaW1hZ2VWICE9PSAnJykgPyB0aGlzLmltYWdlViA6IGRlZmF1bHRJbWFnZVY7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG59XG5cblxuY29uc3QgZGVmYXVsdEltYWdlSCA9ICd1cmwoXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFVQUFBQWVDQVlBQUFEa2Z0UzlBQUFBSWtsRVFWUW9VMk00YytiTWZ4QUdBZ1lZbXdHcklJaURqckVManBvNWFpWmVNd0YreU5uT3M1S1N2Z0FBQUFCSlJVNUVya0pnZ2c9PVwiKSc7XG5jb25zdCBkZWZhdWx0SW1hZ2VWID0gJ3VybChcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQjRBQUFBRkNBTUFBQUJsLzZ6SUFBQUFCbEJNVkVVQUFBRE16TXpJVDhBeUFBQUFBWFJTVGxNQVFPYllaZ0FBQUJSSlJFRlVlQUZqWUdSa3dJTUpTZU1IbEJrT0FCUDdBRUd6U3VQS0FBQUFBRWxGVGtTdVFtQ0NcIiknO1xuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFNwbGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvc3BsaXQuY29tcG9uZW50JztcbmltcG9ydCB7IFNwbGl0QXJlYURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL3NwbGl0QXJlYS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU3BsaXRHdXR0ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9zcGxpdEd1dHRlci5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgU3BsaXRDb21wb25lbnQsXG4gICAgICAgIFNwbGl0QXJlYURpcmVjdGl2ZSxcbiAgICAgICAgU3BsaXRHdXR0ZXJEaXJlY3RpdmUsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFNwbGl0Q29tcG9uZW50LFxuICAgICAgICBTcGxpdEFyZWFEaXJlY3RpdmUsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyU3BsaXRNb2R1bGUge1xuXG4gICAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEFuZ3VsYXJTcGxpdE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW11cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGZvckNoaWxkKCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEFuZ3VsYXJTcGxpdE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW11cbiAgICAgICAgfTtcbiAgICB9XG5cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThEQSxNQUFhLGNBQWM7Ozs7Ozs7SUF5TnZCLFlBQW9CLE1BQWMsRUFDZCxLQUFpQixFQUNqQixLQUF3QixFQUN4QixRQUFtQjtRQUhuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBMU4vQixlQUFVLEdBQThCLFlBQVksQ0FBQzs7UUFtQnJELG1CQUFjLEdBQVksS0FBSyxDQUFDOztRQWFoQyxjQUFTLEdBQVksS0FBSyxDQUFDOztRQWlCM0IsbUJBQWMsR0FBWSxJQUFJLENBQUM7O1FBZ0IvQixXQUFNLEdBQWtCLElBQUksQ0FBQzs7UUFlN0IsWUFBTyxHQUFrQixJQUFJLENBQUM7O1FBZTlCLGdCQUFXLEdBQVcsRUFBRSxDQUFDOztRQWV6QixpQkFBWSxHQUFXLEVBQUUsQ0FBQzs7UUFlMUIsa0JBQWEsR0FBVyxFQUFFLENBQUM7O1FBZTNCLGtCQUFhLEdBQVcsRUFBRSxDQUFDOztRQWUzQixTQUFJLEdBQWtCLEtBQUssQ0FBQzs7UUFhMUIsY0FBUyxHQUFHLElBQUksWUFBWSxDQUE0QyxLQUFLLENBQUMsQ0FBQztRQUMvRSxpQkFBWSxHQUFHLElBQUksWUFBWSxDQUE0QyxLQUFLLENBQUMsQ0FBQztRQUNsRixZQUFPLEdBQUcsSUFBSSxZQUFZLENBQTRDLEtBQUssQ0FBQyxDQUFD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