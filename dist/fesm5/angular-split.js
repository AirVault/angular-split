import { __spread } from 'tslib';
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
var SplitComponent = /** @class */ (function () {
    function SplitComponent(ngZone, elRef, cdRef, renderer) {
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
    Object.defineProperty(SplitComponent.prototype, "direction", {
        get: /**
         * @return {?}
         */
        function () {
            return this._direction;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var _this = this;
            v = (v === 'vertical') ? 'vertical' : 'horizontal';
            this._direction = v;
            __spread(this.displayedAreas, this.hidedAreas).forEach(function (area) {
                area.comp.setStyleVisibleAndDir(area.comp.visible, _this.isDragging, _this.direction);
            });
            this.build(false, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "useTransition", {
        get: /**
         * @return {?}
         */
        function () {
            return this._useTransition;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            v = (typeof (v) === 'boolean') ? v : (v === 'false' ? false : true);
            this._useTransition = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            v = (typeof (v) === 'boolean') ? v : (v === 'false' ? false : true);
            this._disabled = v;
            // Force repaint if modified from TS class (instead of the template)
            this.cdRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "useBackground", {
        get: /**
         * @return {?}
         */
        function () {
            return this._useBackground;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            v = (typeof (v) === 'boolean') ? v : (v !== 'false');
            this._useBackground = v;
            // Force repaint if modified from TS class (instead of the template)
            this.cdRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "width", {
        get: /**
         * @return {?}
         */
        function () {
            return this._width;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            v = Number(v);
            this._width = (!isNaN(v) && v > 0) ? v : null;
            this.build(false, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "height", {
        get: /**
         * @return {?}
         */
        function () {
            return this._height;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            v = Number(v);
            this._height = (!isNaN(v) && v > 0) ? v : null;
            this.build(false, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "gutterSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this._gutterSize;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            v = Number(v);
            this._gutterSize = (!isNaN(v) && v > 0) ? v : 11;
            this.build(false, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "gutterColor", {
        get: /**
         * @return {?}
         */
        function () {
            return this._gutterColor;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._gutterColor = (typeof v === 'string' && v !== '') ? v : '';
            // Force repaint if modified from TS class (instead of the template)
            this.cdRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "gutterImageH", {
        get: /**
         * @return {?}
         */
        function () {
            return this._gutterImageH;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._gutterImageH = (typeof v === 'string' && v !== '') ? v : '';
            // Force repaint if modified from TS class (instead of the template)
            this.cdRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "gutterImageV", {
        get: /**
         * @return {?}
         */
        function () {
            return this._gutterImageV;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._gutterImageV = (typeof v === 'string' && v !== '') ? v : '';
            // Force repaint if modified from TS class (instead of the template)
            this.cdRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "dir", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dir;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            v = (v === 'rtl') ? 'rtl' : 'ltr';
            this._dir = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "cssFlexdirection", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.direction === 'horizontal') ? 'row' : 'column';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "cssWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this.width ? this.width + "px" : '100%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "cssHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return this.height ? this.height + "px" : '100%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "cssMinwidth", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.direction === 'horizontal') ? this.getNbGutters() * this.gutterSize + "px" : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "cssMinheight", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.direction === 'vertical') ? this.getNbGutters() * this.gutterSize + "px" : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SplitComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.isViewInitialized = true;
    };
    /**
     * @return {?}
     */
    SplitComponent.prototype.getNbGutters = /**
     * @return {?}
     */
    function () {
        return this.displayedAreas.length - 1;
    };
    /**
     * @param {?} comp
     * @return {?}
     */
    SplitComponent.prototype.addArea = /**
     * @param {?} comp
     * @return {?}
     */
    function (comp) {
        /** @type {?} */
        var newArea = {
            comp: comp,
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
    };
    /**
     * @param {?} comp
     * @return {?}
     */
    SplitComponent.prototype.removeArea = /**
     * @param {?} comp
     * @return {?}
     */
    function (comp) {
        if (this.displayedAreas.some(function (a) { return a.comp === comp; })) {
            /** @type {?} */
            var area = (/** @type {?} */ (this.displayedAreas.find(function (a) { return a.comp === comp; })));
            this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
            this.build(true, true);
        }
        else if (this.hidedAreas.some(function (a) { return a.comp === comp; })) {
            /** @type {?} */
            var area = (/** @type {?} */ (this.hidedAreas.find(function (a) { return a.comp === comp; })));
            this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
        }
    };
    /**
     * @param {?} comp
     * @param {?} resetOrders
     * @param {?} resetSizes
     * @return {?}
     */
    SplitComponent.prototype.updateArea = /**
     * @param {?} comp
     * @param {?} resetOrders
     * @param {?} resetSizes
     * @return {?}
     */
    function (comp, resetOrders, resetSizes) {
        // Only refresh if area is displayed (No need to check inside 'hidedAreas')
        /** @type {?} */
        var item = this.displayedAreas.find(function (a) { return a.comp === comp; });
        if (item) {
            this.build(resetOrders, resetSizes);
        }
    };
    /**
     * @param {?} comp
     * @return {?}
     */
    SplitComponent.prototype.showArea = /**
     * @param {?} comp
     * @return {?}
     */
    function (comp) {
        var _a;
        /** @type {?} */
        var area = this.hidedAreas.find(function (a) { return a.comp === comp; });
        if (area) {
            comp.setStyleVisibleAndDir(comp.visible, this.isDragging, this.direction);
            /** @type {?} */
            var areas = this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
            (_a = this.displayedAreas).push.apply(_a, __spread(areas));
            this.build(true, true);
        }
    };
    /**
     * @param {?} comp
     * @return {?}
     */
    SplitComponent.prototype.hideArea = /**
     * @param {?} comp
     * @return {?}
     */
    function (comp) {
        var _a;
        /** @type {?} */
        var area = this.displayedAreas.find(function (a) { return a.comp === comp; });
        if (area) {
            comp.setStyleVisibleAndDir(comp.visible, this.isDragging, this.direction);
            /** @type {?} */
            var areas = this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
            areas.forEach(function (area) {
                area.order = 0;
                area.size = 0;
            });
            (_a = this.hidedAreas).push.apply(_a, __spread(areas));
            this.build(true, true);
        }
    };
    /**
     * @param {?} resetOrders
     * @param {?} resetSizes
     * @return {?}
     */
    SplitComponent.prototype.build = /**
     * @param {?} resetOrders
     * @param {?} resetSizes
     * @return {?}
     */
    function (resetOrders, resetSizes) {
        var _this = this;
        this.stopDragging();
        // ¤ AREAS ORDER
        if (resetOrders === true) {
            // If user provided 'order' for each area, use it to sort them.
            if (this.displayedAreas.every(function (a) { return a.comp.order !== null; })) {
                this.displayedAreas.sort(function (a, b) { return ((/** @type {?} */ (a.comp.order))) - ((/** @type {?} */ (b.comp.order))); });
            }
            // Then set real order with multiples of 2, numbers between will be used by gutters.
            this.displayedAreas.forEach(function (area, i) {
                area.order = i * 2;
                area.comp.setStyleOrder(area.order);
            });
        }
        // ¤ AREAS SIZE PERCENT
        if (resetSizes === true) {
            /** @type {?} */
            var totalUserSize = (/** @type {?} */ (this.displayedAreas.reduce(function (total, s) { return s.comp.size ? total + s.comp.size : total; }, 0)));
            // If user provided 'size' for each area and total == 1, use it.
            if (this.displayedAreas.every(function (a) { return a.comp.size !== null; }) && totalUserSize > .999 && totalUserSize < 1.001) {
                this.displayedAreas.forEach(function (area) {
                    area.size = (/** @type {?} */ (area.comp.size));
                });
            }
            // Else set equal sizes for all areas.
            else {
                /** @type {?} */
                var size_1 = 1 / this.displayedAreas.length;
                this.displayedAreas.forEach(function (area) {
                    area.size = size_1;
                });
            }
        }
        // ¤ 
        // If some real area sizes are less than gutterSize, 
        // set them to zero and dispatch size to others.
        /** @type {?} */
        var percentToDispatch = 0;
        // Get container pixel size
        /** @type {?} */
        var containerSizePixel = this.getNbGutters() * this.gutterSize;
        if (this.direction === 'horizontal') {
            containerSizePixel = this.width ? this.width : this.elRef.nativeElement['offsetWidth'];
        }
        else {
            containerSizePixel = this.height ? this.height : this.elRef.nativeElement['offsetHeight'];
        }
        this.displayedAreas.forEach(function (area) {
            if (area.size * containerSizePixel < _this.gutterSize) {
                percentToDispatch += area.size;
                area.size = 0;
            }
        });
        if (percentToDispatch > 0 && this.displayedAreas.length > 0) {
            /** @type {?} */
            var nbAreasNotZero = this.displayedAreas.filter(function (a) { return a.size !== 0; }).length;
            if (nbAreasNotZero > 0) {
                /** @type {?} */
                var percentToAdd_1 = percentToDispatch / nbAreasNotZero;
                this.displayedAreas.filter(function (a) { return a.size !== 0; }).forEach(function (area) {
                    area.size += percentToAdd_1;
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
    };
    /**
     * @return {?}
     */
    SplitComponent.prototype.refreshStyleSizes = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var sumGutterSize = this.getNbGutters() * this.gutterSize;
        this.displayedAreas.forEach(function (area) {
            area.comp.setStyleFlexbasis("calc( " + area.size * 100 + "% - " + area.size * sumGutterSize + "px )", _this.isDragging);
        });
    };
    /**
     * @param {?} startEvent
     * @param {?} gutterOrder
     * @param {?} gutterNum
     * @return {?}
     */
    SplitComponent.prototype.startDragging = /**
     * @param {?} startEvent
     * @param {?} gutterOrder
     * @param {?} gutterNum
     * @return {?}
     */
    function (startEvent, gutterOrder, gutterNum) {
        var _this = this;
        startEvent.preventDefault();
        // Place code here to allow '(gutterClick)' event even if '[disabled]="true"'.
        this.currentGutterNum = gutterNum;
        this.draggingWithoutMove = true;
        this.ngZone.runOutsideAngular(function () {
            _this.dragListeners.push(_this.renderer.listen('document', 'mouseup', function (e) { return _this.stopDragging(); }));
            _this.dragListeners.push(_this.renderer.listen('document', 'touchend', function (e) { return _this.stopDragging(); }));
            _this.dragListeners.push(_this.renderer.listen('document', 'touchcancel', function (e) { return _this.stopDragging(); }));
        });
        if (this.disabled) {
            return;
        }
        /** @type {?} */
        var areaA = this.displayedAreas.find(function (a) { return a.order === gutterOrder - 1; });
        /** @type {?} */
        var areaB = this.displayedAreas.find(function (a) { return a.order === gutterOrder + 1; });
        if (!areaA || !areaB) {
            return;
        }
        /** @type {?} */
        var prop = (this.direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight';
        this.dragStartValues.sizePixelContainer = this.elRef.nativeElement[prop];
        this.dragStartValues.sizePixelA = areaA.comp.getSizePixel(prop);
        this.dragStartValues.sizePixelB = areaB.comp.getSizePixel(prop);
        this.dragStartValues.sizePercentA = areaA.size;
        this.dragStartValues.sizePercentB = areaB.size;
        /** @type {?} */
        var start = this.getPointFromEvent(startEvent);
        if (!start) {
            return;
        }
        this.ngZone.runOutsideAngular(function () {
            _this.dragListeners.push(_this.renderer.listen('document', 'mousemove', function (e) { return _this.dragEvent(e, start, areaA, areaB); }));
            _this.dragListeners.push(_this.renderer.listen('document', 'touchmove', function (e) { return _this.dragEvent(e, start, areaA, areaB); }));
        });
        areaA.comp.lockEvents();
        areaB.comp.lockEvents();
        this.isDragging = true;
        this.notify('start');
    };
    /**
     * @param {?} event
     * @param {?} start
     * @param {?} areaA
     * @param {?} areaB
     * @return {?}
     */
    SplitComponent.prototype.dragEvent = /**
     * @param {?} event
     * @param {?} start
     * @param {?} areaA
     * @param {?} areaB
     * @return {?}
     */
    function (event, start, areaA, areaB) {
        if (!this.isDragging) {
            return;
        }
        /** @type {?} */
        var end = this.getPointFromEvent(event);
        if (!end) {
            return;
        }
        this.draggingWithoutMove = false;
        this.drag(start, end, areaA, areaB);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SplitComponent.prototype.getPointFromEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * @param {?} start
     * @param {?} end
     * @param {?} areaA
     * @param {?} areaB
     * @return {?}
     */
    SplitComponent.prototype.drag = /**
     * @param {?} start
     * @param {?} end
     * @param {?} areaA
     * @param {?} areaB
     * @return {?}
     */
    function (start, end, areaA, areaB) {
        // ¤ AREAS SIZE PIXEL
        // ¤ AREAS SIZE PIXEL
        /** @type {?} */
        var devicePixelRatio = /*window.devicePixelRatio ||*/ 1;
        /** @type {?} */
        var offsetPixel = (this.direction === 'horizontal') ? (start.x - end.x) : (start.y - end.y);
        offsetPixel = offsetPixel / devicePixelRatio;
        if (this.dir === 'rtl') {
            offsetPixel = -offsetPixel;
        }
        /** @type {?} */
        var newSizePixelA = this.dragStartValues.sizePixelA - offsetPixel;
        /** @type {?} */
        var newSizePixelB = this.dragStartValues.sizePixelB + offsetPixel;
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
    };
    /**
     * @return {?}
     */
    SplitComponent.prototype.stopDragging = /**
     * @return {?}
     */
    function () {
        if (this.isDragging === false && this.draggingWithoutMove === false) {
            return;
        }
        this.displayedAreas.forEach(function (area) {
            area.comp.unlockEvents();
        });
        while (this.dragListeners.length > 0) {
            /** @type {?} */
            var fct = this.dragListeners.pop();
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
    };
    /**
     * @param {?} type
     * @return {?}
     */
    SplitComponent.prototype.notify = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        var _this = this;
        /** @type {?} */
        var areasSize = this.displayedAreas.map(function (a) { return a.size * 100; });
        this.ngZone.run(function () {
            switch (type) {
                case 'start':
                    return _this.dragStart.emit({ gutterNum: _this.currentGutterNum, sizes: areasSize });
                case 'progress':
                    return _this.dragProgress.emit({ gutterNum: _this.currentGutterNum, sizes: areasSize });
                case 'end':
                    return _this.dragEnd.emit({ gutterNum: _this.currentGutterNum, sizes: areasSize });
                case 'click':
                    return _this.gutterClick.emit({ gutterNum: _this.currentGutterNum, sizes: areasSize });
                case 'transitionEnd':
                    return _this.transitionEndInternal.next(areasSize);
            }
        });
    };
    /**
     * @return {?}
     */
    SplitComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stopDragging();
    };
    SplitComponent.decorators = [
        { type: Component, args: [{
                    selector: 'as-split',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n        <ng-content></ng-content>\n        <ng-template ngFor let-area [ngForOf]=\"displayedAreas\" let-index=\"index\" let-last=\"last\">\n            <as-split-gutter *ngIf=\"last === false\" \n                          [order]=\"index*2+1\"\n                          [direction]=\"direction\"\n                          [useTransition]=\"useTransition\"\n                          [size]=\"gutterSize\"\n                          [color]=\"gutterColor\"\n                          [useBackground]=\"useBackground\"\n                          [imageH]=\"gutterImageH\"\n                          [imageV]=\"gutterImageV\"\n                          [disabled]=\"disabled\"\n                          (mousedown)=\"startDragging($event, index*2+1, index+1)\"\n                          (touchstart)=\"startDragging($event, index*2+1, index+1)\"></as-split-gutter>\n        </ng-template>",
                    styles: [":host{display:flex;flex-wrap:nowrap;justify-content:flex-start;align-items:stretch;overflow:hidden;width:100%;height:100%}as-split-gutter{flex-grow:0;flex-shrink:0;background-position:center center;background-repeat:no-repeat}"]
                }] }
    ];
    /** @nocollapse */
    SplitComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
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
    return SplitComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var SplitAreaDirective = /** @class */ (function () {
    function SplitAreaDirective(ngZone, elRef, renderer, split) {
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
    Object.defineProperty(SplitAreaDirective.prototype, "order", {
        get: /**
         * @return {?}
         */
        function () {
            return this._order;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            v = Number(v);
            this._order = !isNaN(v) ? v : null;
            this.split.updateArea(this, true, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this._size;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            v = Number(v);
            this._size = (!isNaN(v) && v >= 0 && v <= 100) ? (v / 100) : null;
            this.split.updateArea(this, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "minSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this._minSize;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            v = Number(v);
            this._minSize = (!isNaN(v) && v > 0 && v < 100) ? v / 100 : 0;
            this.split.updateArea(this, false, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._visible;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            v = (typeof (v) === 'boolean') ? v : (v === 'false' ? false : true);
            this._visible = v;
            if (this.visible) {
                this.split.showArea(this);
            }
            else {
                this.split.hideArea(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SplitAreaDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.split.addArea(this);
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-grow', '0');
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-shrink', '0');
        this.ngZone.runOutsideAngular(function () {
            _this.transitionListener = _this.renderer.listen(_this.elRef.nativeElement, 'transitionend', function (e) { return _this.onTransitionEnd(e); });
        });
    };
    /**
     * @param {?} prop
     * @return {?}
     */
    SplitAreaDirective.prototype.getSizePixel = /**
     * @param {?} prop
     * @return {?}
     */
    function (prop) {
        return this.elRef.nativeElement[prop];
    };
    /**
     * @param {?} isVisible
     * @param {?} isDragging
     * @param {?} direction
     * @return {?}
     */
    SplitAreaDirective.prototype.setStyleVisibleAndDir = /**
     * @param {?} isVisible
     * @param {?} isDragging
     * @param {?} direction
     * @return {?}
     */
    function (isVisible, isDragging, direction) {
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
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SplitAreaDirective.prototype.setStyleOrder = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.renderer.setStyle(this.elRef.nativeElement, 'order', value);
    };
    /**
     * @param {?} value
     * @param {?} isDragging
     * @return {?}
     */
    SplitAreaDirective.prototype.setStyleFlexbasis = /**
     * @param {?} value
     * @param {?} isDragging
     * @return {?}
     */
    function (value, isDragging) {
        // If component not yet initialized or gutter being dragged, disable transition
        if (this.split.isViewInitialized === false || isDragging === true) {
            this.setStyleTransition(false);
        }
        // Or use 'useTransition' to know if transition.
        else {
            this.setStyleTransition(this.split.useTransition);
        }
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', value);
    };
    /**
     * @param {?} useTransition
     * @return {?}
     */
    SplitAreaDirective.prototype.setStyleTransition = /**
     * @param {?} useTransition
     * @return {?}
     */
    function (useTransition) {
        if (useTransition) {
            this.renderer.setStyle(this.elRef.nativeElement, 'transition', "flex-basis 0.3s");
        }
        else {
            this.renderer.removeStyle(this.elRef.nativeElement, 'transition');
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SplitAreaDirective.prototype.onTransitionEnd = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Limit only flex-basis transition to trigger the event
        if (event.propertyName === 'flex-basis') {
            this.split.notify('transitionEnd');
        }
    };
    /**
     * @return {?}
     */
    SplitAreaDirective.prototype.lockEvents = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.lockListeners.push(_this.renderer.listen(_this.elRef.nativeElement, 'selectstart', function (e) { return false; }));
            _this.lockListeners.push(_this.renderer.listen(_this.elRef.nativeElement, 'dragstart', function (e) { return false; }));
        });
    };
    /**
     * @return {?}
     */
    SplitAreaDirective.prototype.unlockEvents = /**
     * @return {?}
     */
    function () {
        while (this.lockListeners.length > 0) {
            /** @type {?} */
            var fct = this.lockListeners.pop();
            if (fct) {
                fct();
            }
        }
    };
    /**
     * @return {?}
     */
    SplitAreaDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unlockEvents();
        if (this.transitionListener) {
            this.transitionListener();
        }
        this.split.removeArea(this);
    };
    SplitAreaDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'as-split-area'
                },] }
    ];
    /** @nocollapse */
    SplitAreaDirective.ctorParameters = function () { return [
        { type: NgZone },
        { type: ElementRef },
        { type: Renderer2 },
        { type: SplitComponent }
    ]; };
    SplitAreaDirective.propDecorators = {
        order: [{ type: Input }],
        size: [{ type: Input }],
        minSize: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return SplitAreaDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var SplitGutterDirective = /** @class */ (function () {
    ////
    function SplitGutterDirective(elRef, renderer) {
        this.elRef = elRef;
        this.renderer = renderer;
        this._useBackground = true;
        ////
        this._disabled = false;
    }
    Object.defineProperty(SplitGutterDirective.prototype, "order", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this.renderer.setStyle(this.elRef.nativeElement, 'order', v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "direction", {
        get: /**
         * @return {?}
         */
        function () {
            return this._direction;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._direction = v;
            this.refreshStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "useTransition", {
        ////
        set: 
        ////
        /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v) {
                this.renderer.setStyle(this.elRef.nativeElement, 'transition', "flex-basis 0.3s");
            }
            else {
                this.renderer.removeStyle(this.elRef.nativeElement, 'transition');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this._size;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._size = v;
            this.refreshStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "color", {
        get: /**
         * @return {?}
         */
        function () {
            return this._color;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._color = v;
            this.refreshStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "useBackground", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._useBackground = v;
            this.refreshStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "imageH", {
        get: /**
         * @return {?}
         */
        function () {
            return this._imageH;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._imageH = v;
            this.refreshStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "imageV", {
        get: /**
         * @return {?}
         */
        function () {
            return this._imageV;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._imageV = v;
            this.refreshStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._disabled = v;
            this.refreshStyle();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SplitGutterDirective.prototype.refreshStyle = /**
     * @return {?}
     */
    function () {
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', this.size + "px");
        // fix safari bug about gutter height when direction is horizontal
        this.renderer.setStyle(this.elRef.nativeElement, 'height', (this.direction === 'vertical') ? this.size + "px" : "100%");
        this.renderer.setStyle(this.elRef.nativeElement, 'background-color', (this.color !== '') ? this.color : "#eeeeee");
        /** @type {?} */
        var state = (this.disabled === true) ? 'disabled' : this.direction;
        this.renderer.setStyle(this.elRef.nativeElement, 'background-image', this.getImage(state));
        this.renderer.setStyle(this.elRef.nativeElement, 'cursor', this.getCursor(state));
    };
    /**
     * @param {?} state
     * @return {?}
     */
    SplitGutterDirective.prototype.getCursor = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        switch (state) {
            case 'horizontal':
                return 'col-resize';
            case 'vertical':
                return 'row-resize';
            case 'disabled':
                return 'default';
        }
    };
    /**
     * @param {?} state
     * @return {?}
     */
    SplitGutterDirective.prototype.getImage = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
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
    };
    SplitGutterDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'as-split-gutter'
                },] }
    ];
    /** @nocollapse */
    SplitGutterDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
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
    return SplitGutterDirective;
}());
/** @type {?} */
var defaultImageH = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==")';
/** @type {?} */
var defaultImageV = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC")';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var AngularSplitModule = /** @class */ (function () {
    function AngularSplitModule() {
    }
    /**
     * @return {?}
     */
    AngularSplitModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: AngularSplitModule,
            providers: []
        };
    };
    /**
     * @return {?}
     */
    AngularSplitModule.forChild = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: AngularSplitModule,
            providers: []
        };
    };
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
    return AngularSplitModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { AngularSplitModule, SplitComponent, SplitAreaDirective, SplitGutterDirective as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zcGxpdC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhci1zcGxpdC9saWIvY29tcG9uZW50L3NwbGl0LmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci1zcGxpdC9saWIvZGlyZWN0aXZlL3NwbGl0QXJlYS5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXItc3BsaXQvbGliL2RpcmVjdGl2ZS9zcGxpdEd1dHRlci5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXItc3BsaXQvbGliL21vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdG9yUmVmLCBJbnB1dCwgT3V0cHV0LCBIb3N0QmluZGluZywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFxuICAgIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIyLCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBJQXJlYSB9IGZyb20gJy4uL2ludGVyZmFjZS9JQXJlYSc7XG5pbXBvcnQgeyBJUG9pbnQgfSBmcm9tICcuLi9pbnRlcmZhY2UvSVBvaW50JztcbmltcG9ydCB7IFNwbGl0QXJlYURpcmVjdGl2ZSB9IGZyb20gJy4uL2RpcmVjdGl2ZS9zcGxpdEFyZWEuZGlyZWN0aXZlJztcblxuLyoqXG4gKiBhbmd1bGFyLXNwbGl0XG4gKiBcbiAqIEFyZWFzIHNpemUgYXJlIHNldCBpbiBwZXJjZW50YWdlIG9mIHRoZSBzcGxpdCBjb250YWluZXIuXG4gKiBHdXR0ZXJzIHNpemUgYXJlIHNldCBpbiBwaXhlbHMuXG4gKiBcbiAqIFNvIHdlIHNldCBjc3MgJ2ZsZXgtYmFzaXMnIHByb3BlcnR5IGxpa2UgdGhpcyAod2hlcmUgMCA8PSBhcmVhLnNpemUgPD0gMSk6IFxuICogIGNhbGMoIHsgYXJlYS5zaXplICogMTAwIH0lIC0geyBhcmVhLnNpemUgKiBuYkd1dHRlciAqIGd1dHRlclNpemUgfXB4ICk7XG4gKiBcbiAqIEV4YW1wbGVzIHdpdGggMyB2aXNpYmxlIGFyZWFzIGFuZCAyIGd1dHRlcnM6IFxuICogXG4gKiB8ICAgICAgICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS1bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLVtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAgY2FsYygyMCUgLSA0cHgpICAgICAgICAgIGNhbGMoMjAlIC0gNHB4KSAgICAgICAgICAgICAgY2FsYyg2MCUgLSAxMnB4KSAgICAgICAgICB8XG4gKiBcbiAqIFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tW10tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgIGNhbGMoMzMuMzMlIC0gNi42NjdweCkgICAgICBjYWxjKDMzLjMzJSAtIDYuNjY3cHgpICAgICAgY2FsYygzMy4zMyUgLSA2LjY2N3B4KSAgfFxuICogXG4gKiBcbiAqIHwxMHB4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfFtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8MCAgICAgICAgICAgICAgICAgY2FsYyg2Ni42NiUgLSAxMy4zMzNweCkgICAgICAgICAgICAgICAgICBjYWxjKDMzJSUgLSA2LjY2N3B4KSAgIHxcbiAqIFxuICogXG4gKiAgMTBweCAxMHB4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHxbXVtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfDAgMCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjKDEwMCUgLSAyMHB4KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiBcbiAqL1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FzLXNwbGl0JyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBzdHlsZVVybHM6IFtgLi9zcGxpdC5jb21wb25lbnQuc2Nzc2BdLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1hcmVhIFtuZ0Zvck9mXT1cImRpc3BsYXllZEFyZWFzXCIgbGV0LWluZGV4PVwiaW5kZXhcIiBsZXQtbGFzdD1cImxhc3RcIj5cbiAgICAgICAgICAgIDxhcy1zcGxpdC1ndXR0ZXIgKm5nSWY9XCJsYXN0ID09PSBmYWxzZVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbb3JkZXJdPVwiaW5kZXgqMisxXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2RpcmVjdGlvbl09XCJkaXJlY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbdXNlVHJhbnNpdGlvbl09XCJ1c2VUcmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW3NpemVdPVwiZ3V0dGVyU2l6ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtjb2xvcl09XCJndXR0ZXJDb2xvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFt1c2VCYWNrZ3JvdW5kXT1cInVzZUJhY2tncm91bmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbaW1hZ2VIXT1cImd1dHRlckltYWdlSFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtpbWFnZVZdPVwiZ3V0dGVySW1hZ2VWXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJzdGFydERyYWdnaW5nKCRldmVudCwgaW5kZXgqMisxLCBpbmRleCsxKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICh0b3VjaHN0YXJ0KT1cInN0YXJ0RHJhZ2dpbmcoJGV2ZW50LCBpbmRleCoyKzEsIGluZGV4KzEpXCI+PC9hcy1zcGxpdC1ndXR0ZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+YCxcbn0pXG5leHBvcnQgY2xhc3MgU3BsaXRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgcHJpdmF0ZSBfZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuXG4gICAgQElucHV0KCkgc2V0IGRpcmVjdGlvbih2OiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnKSB7XG4gICAgICAgIHYgPSAodiA9PT0gJ3ZlcnRpY2FsJykgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnO1xuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSB2O1xuICAgICAgICBcbiAgICAgICAgWy4uLnRoaXMuZGlzcGxheWVkQXJlYXMsIC4uLnRoaXMuaGlkZWRBcmVhc10uZm9yRWFjaChhcmVhID0+IHtcbiAgICAgICAgICAgIGFyZWEuY29tcC5zZXRTdHlsZVZpc2libGVBbmREaXIoYXJlYS5jb21wLnZpc2libGUsIHRoaXMuaXNEcmFnZ2luZywgdGhpcy5kaXJlY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYnVpbGQoZmFsc2UsIGZhbHNlKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGRpcmVjdGlvbigpOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpcmVjdGlvbjtcbiAgICB9XG4gICAgXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfdXNlVHJhbnNpdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgc2V0IHVzZVRyYW5zaXRpb24odjogYm9vbGVhbikge1xuICAgICAgICB2ID0gKHR5cGVvZih2KSA9PT0gJ2Jvb2xlYW4nKSA/IHYgOiAodiA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogdHJ1ZSk7XG4gICAgICAgIHRoaXMuX3VzZVRyYW5zaXRpb24gPSB2O1xuICAgIH1cbiAgICBcbiAgICBnZXQgdXNlVHJhbnNpdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZVRyYW5zaXRpb247XG4gICAgfVxuICAgIFxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgXG4gICAgQElucHV0KCkgc2V0IGRpc2FibGVkKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgdiA9ICh0eXBlb2YodikgPT09ICdib29sZWFuJykgPyB2IDogKHYgPT09ICdmYWxzZScgPyBmYWxzZSA6IHRydWUpO1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IHY7XG5cbiAgICAgICAgLy8gRm9yY2UgcmVwYWludCBpZiBtb2RpZmllZCBmcm9tIFRTIGNsYXNzIChpbnN0ZWFkIG9mIHRoZSB0ZW1wbGF0ZSlcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgLy8vL1xuXG5cbiAgICBwcml2YXRlIF91c2VCYWNrZ3JvdW5kOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNldCB1c2VCYWNrZ3JvdW5kKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgdiA9ICh0eXBlb2YodikgPT09ICdib29sZWFuJykgPyB2IDogKHYgIT09ICdmYWxzZScpO1xuICAgICAgICB0aGlzLl91c2VCYWNrZ3JvdW5kID0gdjtcblxuICAgICAgICAvLyBGb3JjZSByZXBhaW50IGlmIG1vZGlmaWVkIGZyb20gVFMgY2xhc3MgKGluc3RlYWQgb2YgdGhlIHRlbXBsYXRlKVxuICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGdldCB1c2VCYWNrZ3JvdW5kKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlQmFja2dyb3VuZDtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF93aWR0aDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoKSBzZXQgd2lkdGgodjogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB2ID0gTnVtYmVyKHYpO1xuICAgICAgICB0aGlzLl93aWR0aCA9ICghaXNOYU4odikgJiYgdiA+IDApID8gdiA6IG51bGw7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJ1aWxkKGZhbHNlLCBmYWxzZSk7XG4gICAgfVxuICAgIFxuICAgIGdldCB3aWR0aCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICAgIH1cbiAgICBcbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9oZWlnaHQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgQElucHV0KCkgc2V0IGhlaWdodCh2OiBudW1iZXIgfCBudWxsKSB7XG4gICAgICAgIHYgPSBOdW1iZXIodik7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9ICghaXNOYU4odikgJiYgdiA+IDApID8gdiA6IG51bGw7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJ1aWxkKGZhbHNlLCBmYWxzZSk7XG4gICAgfVxuICAgIFxuICAgIGdldCBoZWlnaHQoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XG4gICAgfVxuICAgIFxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2d1dHRlclNpemU6IG51bWJlciA9IDExO1xuXG4gICAgQElucHV0KCkgc2V0IGd1dHRlclNpemUodjogbnVtYmVyKSB7XG4gICAgICAgIHYgPSBOdW1iZXIodik7XG4gICAgICAgIHRoaXMuX2d1dHRlclNpemUgPSAoIWlzTmFOKHYpICYmIHYgPiAwKSA/IHYgOiAxMTtcblxuICAgICAgICB0aGlzLmJ1aWxkKGZhbHNlLCBmYWxzZSk7XG4gICAgfVxuICAgIFxuICAgIGdldCBndXR0ZXJTaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ndXR0ZXJTaXplO1xuICAgIH1cbiAgICBcbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9ndXR0ZXJDb2xvcjogc3RyaW5nID0gJyc7XG5cbiAgICBASW5wdXQoKSBzZXQgZ3V0dGVyQ29sb3Iodjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2d1dHRlckNvbG9yID0gKHR5cGVvZiB2ID09PSAnc3RyaW5nJyAmJiB2ICE9PSAnJykgPyB2IDogJyc7XG5cbiAgICAgICAgLy8gRm9yY2UgcmVwYWludCBpZiBtb2RpZmllZCBmcm9tIFRTIGNsYXNzIChpbnN0ZWFkIG9mIHRoZSB0ZW1wbGF0ZSlcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGd1dHRlckNvbG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ndXR0ZXJDb2xvcjtcbiAgICB9XG4gICAgXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfZ3V0dGVySW1hZ2VIOiBzdHJpbmcgPSAnJztcblxuICAgIEBJbnB1dCgpIHNldCBndXR0ZXJJbWFnZUgodjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2d1dHRlckltYWdlSCA9ICh0eXBlb2YgdiA9PT0gJ3N0cmluZycgJiYgdiAhPT0gJycpID8gdiA6ICcnO1xuICAgICAgICBcbiAgICAgICAgLy8gRm9yY2UgcmVwYWludCBpZiBtb2RpZmllZCBmcm9tIFRTIGNsYXNzIChpbnN0ZWFkIG9mIHRoZSB0ZW1wbGF0ZSlcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGd1dHRlckltYWdlSCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3V0dGVySW1hZ2VIO1xuICAgIH1cbiAgICBcbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9ndXR0ZXJJbWFnZVY6IHN0cmluZyA9ICcnO1xuXG4gICAgQElucHV0KCkgc2V0IGd1dHRlckltYWdlVih2OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZ3V0dGVySW1hZ2VWID0gKHR5cGVvZiB2ID09PSAnc3RyaW5nJyAmJiB2ICE9PSAnJykgPyB2IDogJyc7XG5cbiAgICAgICAgLy8gRm9yY2UgcmVwYWludCBpZiBtb2RpZmllZCBmcm9tIFRTIGNsYXNzIChpbnN0ZWFkIG9mIHRoZSB0ZW1wbGF0ZSlcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGd1dHRlckltYWdlVigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3V0dGVySW1hZ2VWO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2RpcjogJ2x0cicgfCAncnRsJyA9ICdsdHInO1xuICAgIFxuICAgIEBJbnB1dCgpIHNldCBkaXIodjogJ2x0cicgfCAncnRsJykge1xuICAgICAgICB2ID0gKHYgPT09ICdydGwnKSA/ICdydGwnIDogJ2x0cic7XG4gICAgICAgIHRoaXMuX2RpciA9IHY7XG4gICAgfVxuICAgIFxuICAgIGdldCBkaXIoKTogJ2x0cicgfCAncnRsJyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXI7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgQE91dHB1dCgpIGRyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8e2d1dHRlck51bTogbnVtYmVyLCBzaXplczogQXJyYXk8bnVtYmVyPn0+KGZhbHNlKTtcbiAgICBAT3V0cHV0KCkgZHJhZ1Byb2dyZXNzID0gbmV3IEV2ZW50RW1pdHRlcjx7Z3V0dGVyTnVtOiBudW1iZXIsIHNpemVzOiBBcnJheTxudW1iZXI+fT4oZmFsc2UpO1xuICAgIEBPdXRwdXQoKSBkcmFnRW5kID0gbmV3IEV2ZW50RW1pdHRlcjx7Z3V0dGVyTnVtOiBudW1iZXIsIHNpemVzOiBBcnJheTxudW1iZXI+fT4oZmFsc2UpO1xuICAgIEBPdXRwdXQoKSBndXR0ZXJDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8e2d1dHRlck51bTogbnVtYmVyLCBzaXplczogQXJyYXk8bnVtYmVyPn0+KGZhbHNlKTtcblxuICAgIHByaXZhdGUgdHJhbnNpdGlvbkVuZEludGVybmFsID0gbmV3IFN1YmplY3Q8QXJyYXk8bnVtYmVyPj4oKTtcbiAgICBAT3V0cHV0KCkgdHJhbnNpdGlvbkVuZCA9ICg8T2JzZXJ2YWJsZTxBcnJheTxudW1iZXI+Pj4gdGhpcy50cmFuc2l0aW9uRW5kSW50ZXJuYWwuYXNPYnNlcnZhYmxlKCkpLnBpcGUoXG4gICAgICAgIGRlYm91bmNlVGltZSgyMClcbiAgICApO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS5mbGV4LWRpcmVjdGlvbicpIGdldCBjc3NGbGV4ZGlyZWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpID8gJ3JvdycgOiAnY29sdW1uJztcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJykgZ2V0IGNzc1dpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aWR0aCA/IGAkeyB0aGlzLndpZHRoIH1weGAgOiAnMTAwJSc7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQnKSBnZXQgY3NzSGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQgPyBgJHsgdGhpcy5oZWlnaHQgfXB4YCA6ICcxMDAlJztcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1pbi13aWR0aCcpIGdldCBjc3NNaW53aWR0aCgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSA/IGAkeyB0aGlzLmdldE5iR3V0dGVycygpICogdGhpcy5ndXR0ZXJTaXplIH1weGAgOiBudWxsO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZygnc3R5bGUubWluLWhlaWdodCcpIGdldCBjc3NNaW5oZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5kaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpID8gYCR7IHRoaXMuZ2V0TmJHdXR0ZXJzKCkgKiB0aGlzLmd1dHRlclNpemUgfXB4YCA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGlzVmlld0luaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBpc0RyYWdnaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBkcmFnZ2luZ1dpdGhvdXRNb3ZlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBjdXJyZW50R3V0dGVyTnVtOiBudW1iZXIgPSAwO1xuXG4gICAgcHVibGljIHJlYWRvbmx5IGRpc3BsYXllZEFyZWFzOiBBcnJheTxJQXJlYT4gPSBbXTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGhpZGVkQXJlYXM6IEFycmF5PElBcmVhPiA9IFtdO1xuICAgIFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZHJhZ0xpc3RlbmVyczogQXJyYXk8RnVuY3Rpb24+ID0gW107XG4gICAgcHJpdmF0ZSByZWFkb25seSBkcmFnU3RhcnRWYWx1ZXMgPSB7XG4gICAgICAgIHNpemVQaXhlbENvbnRhaW5lcjogMCxcbiAgICAgICAgc2l6ZVBpeGVsQTogMCxcbiAgICAgICAgc2l6ZVBpeGVsQjogMCxcbiAgICAgICAgc2l6ZVBlcmNlbnRBOiAwLFxuICAgICAgICBzaXplUGVyY2VudEI6IDAsXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmlzVmlld0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE5iR3V0dGVycygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggLSAxO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRBcmVhKGNvbXA6IFNwbGl0QXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBuZXdBcmVhOiBJQXJlYSA9IHtcbiAgICAgICAgICAgIGNvbXAsIFxuICAgICAgICAgICAgb3JkZXI6IDAsIFxuICAgICAgICAgICAgc2l6ZTogMCxcbiAgICAgICAgfTtcblxuICAgICAgICBpZihjb21wLnZpc2libGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMucHVzaChuZXdBcmVhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZWRBcmVhcy5wdXNoKG5ld0FyZWEpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29tcC5zZXRTdHlsZVZpc2libGVBbmREaXIoY29tcC52aXNpYmxlLCB0aGlzLmlzRHJhZ2dpbmcsIHRoaXMuZGlyZWN0aW9uKTtcblxuICAgICAgICB0aGlzLmJ1aWxkKHRydWUsIHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVBcmVhKGNvbXA6IFNwbGl0QXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBpZih0aGlzLmRpc3BsYXllZEFyZWFzLnNvbWUoYSA9PiBhLmNvbXAgPT09IGNvbXApKSB7XG4gICAgICAgICAgICBjb25zdCBhcmVhID0gPElBcmVhPiB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXAgPT09IGNvbXApXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLnNwbGljZSh0aGlzLmRpc3BsYXllZEFyZWFzLmluZGV4T2YoYXJlYSksIDEpO1xuXG4gICAgICAgICAgICB0aGlzLmJ1aWxkKHRydWUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5oaWRlZEFyZWFzLnNvbWUoYSA9PiBhLmNvbXAgPT09IGNvbXApKSB7XG4gICAgICAgICAgICBjb25zdCBhcmVhID0gPElBcmVhPiB0aGlzLmhpZGVkQXJlYXMuZmluZChhID0+IGEuY29tcCA9PT0gY29tcClcbiAgICAgICAgICAgIHRoaXMuaGlkZWRBcmVhcy5zcGxpY2UodGhpcy5oaWRlZEFyZWFzLmluZGV4T2YoYXJlYSksIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUFyZWEoY29tcDogU3BsaXRBcmVhRGlyZWN0aXZlLCByZXNldE9yZGVyczogYm9vbGVhbiwgcmVzZXRTaXplczogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICAvLyBPbmx5IHJlZnJlc2ggaWYgYXJlYSBpcyBkaXNwbGF5ZWQgKE5vIG5lZWQgdG8gY2hlY2sgaW5zaWRlICdoaWRlZEFyZWFzJylcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmluZChhID0+IGEuY29tcCA9PT0gY29tcCk7XG5cbiAgICAgICAgaWYoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5idWlsZChyZXNldE9yZGVycywgcmVzZXRTaXplcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0FyZWEoY29tcDogU3BsaXRBcmVhRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFyZWEgPSB0aGlzLmhpZGVkQXJlYXMuZmluZChhID0+IGEuY29tcCA9PT0gY29tcCk7XG5cbiAgICAgICAgaWYoYXJlYSkge1xuICAgICAgICAgICAgY29tcC5zZXRTdHlsZVZpc2libGVBbmREaXIoY29tcC52aXNpYmxlLCB0aGlzLmlzRHJhZ2dpbmcsIHRoaXMuZGlyZWN0aW9uKTtcblxuICAgICAgICAgICAgY29uc3QgYXJlYXMgPSB0aGlzLmhpZGVkQXJlYXMuc3BsaWNlKHRoaXMuaGlkZWRBcmVhcy5pbmRleE9mKGFyZWEpLCAxKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMucHVzaCguLi5hcmVhcyk7XG5cbiAgICAgICAgICAgIHRoaXMuYnVpbGQodHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZUFyZWEoY29tcDogU3BsaXRBcmVhRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFyZWEgPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXAgPT09IGNvbXApO1xuXG4gICAgICAgIGlmKGFyZWEpIHtcbiAgICAgICAgICAgIGNvbXAuc2V0U3R5bGVWaXNpYmxlQW5kRGlyKGNvbXAudmlzaWJsZSwgdGhpcy5pc0RyYWdnaW5nLCB0aGlzLmRpcmVjdGlvbik7XG5cbiAgICAgICAgICAgIGNvbnN0IGFyZWFzID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5zcGxpY2UodGhpcy5kaXNwbGF5ZWRBcmVhcy5pbmRleE9mKGFyZWEpLCAxKTtcbiAgICAgICAgICAgIGFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICAgICAgYXJlYS5vcmRlciA9IDA7XG4gICAgICAgICAgICAgICAgYXJlYS5zaXplID0gMDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLmhpZGVkQXJlYXMucHVzaCguLi5hcmVhcyk7XG5cbiAgICAgICAgICAgIHRoaXMuYnVpbGQodHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1aWxkKHJlc2V0T3JkZXJzOiBib29sZWFuLCByZXNldFNpemVzOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG5cbiAgICAgICAgLy8gw4LCpCBBUkVBUyBPUkRFUlxuICAgICAgICBcbiAgICAgICAgaWYocmVzZXRPcmRlcnMgPT09IHRydWUpIHsgICAgXG5cbiAgICAgICAgICAgIC8vIElmIHVzZXIgcHJvdmlkZWQgJ29yZGVyJyBmb3IgZWFjaCBhcmVhLCB1c2UgaXQgdG8gc29ydCB0aGVtLlxuICAgICAgICAgICAgaWYodGhpcy5kaXNwbGF5ZWRBcmVhcy5ldmVyeShhID0+IGEuY29tcC5vcmRlciAhPT0gbnVsbCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLnNvcnQoKGEsIGIpID0+ICg8bnVtYmVyPiBhLmNvbXAub3JkZXIpIC0gKDxudW1iZXI+IGIuY29tcC5vcmRlcikpO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgLy8gVGhlbiBzZXQgcmVhbCBvcmRlciB3aXRoIG11bHRpcGxlcyBvZiAyLCBudW1iZXJzIGJldHdlZW4gd2lsbCBiZSB1c2VkIGJ5IGd1dHRlcnMuXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goKGFyZWEsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBhcmVhLm9yZGVyID0gaSAqIDI7XG4gICAgICAgICAgICAgICAgYXJlYS5jb21wLnNldFN0eWxlT3JkZXIoYXJlYS5vcmRlcik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gw4LCpCBBUkVBUyBTSVpFIFBFUkNFTlRcbiAgICAgICAgXG4gICAgICAgIGlmKHJlc2V0U2l6ZXMgPT09IHRydWUpIHtcblxuICAgICAgICAgICAgY29uc3QgdG90YWxVc2VyU2l6ZSA9IDxudW1iZXI+IHRoaXMuZGlzcGxheWVkQXJlYXMucmVkdWNlKCh0b3RhbDogbnVtYmVyLCBzOiBJQXJlYSkgPT4gcy5jb21wLnNpemUgPyB0b3RhbCArIHMuY29tcC5zaXplIDogdG90YWwsIDApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBJZiB1c2VyIHByb3ZpZGVkICdzaXplJyBmb3IgZWFjaCBhcmVhIGFuZCB0b3RhbCA9PSAxLCB1c2UgaXQuXG4gICAgICAgICAgICBpZih0aGlzLmRpc3BsYXllZEFyZWFzLmV2ZXJ5KGEgPT4gYS5jb21wLnNpemUgIT09IG51bGwpICYmIHRvdGFsVXNlclNpemUgPiAuOTk5ICYmIHRvdGFsVXNlclNpemUgPCAxLjAwMSApIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXJlYS5zaXplID0gPG51bWJlcj4gYXJlYS5jb21wLnNpemU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBFbHNlIHNldCBlcXVhbCBzaXplcyBmb3IgYWxsIGFyZWFzLlxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IDEgLyB0aGlzLmRpc3BsYXllZEFyZWFzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFyZWEuc2l6ZSA9IHNpemU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIMOCwqQgXG4gICAgICAgIC8vIElmIHNvbWUgcmVhbCBhcmVhIHNpemVzIGFyZSBsZXNzIHRoYW4gZ3V0dGVyU2l6ZSwgXG4gICAgICAgIC8vIHNldCB0aGVtIHRvIHplcm8gYW5kIGRpc3BhdGNoIHNpemUgdG8gb3RoZXJzLlxuXG4gICAgICAgIGxldCBwZXJjZW50VG9EaXNwYXRjaCA9IDA7XG4gICAgICAgIFxuICAgICAgICAvLyBHZXQgY29udGFpbmVyIHBpeGVsIHNpemVcbiAgICAgICAgbGV0IGNvbnRhaW5lclNpemVQaXhlbCA9IHRoaXMuZ2V0TmJHdXR0ZXJzKCkgKiB0aGlzLmd1dHRlclNpemU7XG4gICAgICAgIGlmKHRoaXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lclNpemVQaXhlbCA9IHRoaXMud2lkdGggPyB0aGlzLndpZHRoIDogdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50WydvZmZzZXRXaWR0aCddO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyU2l6ZVBpeGVsID0gdGhpcy5oZWlnaHQgPyB0aGlzLmhlaWdodCA6IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudFsnb2Zmc2V0SGVpZ2h0J107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICBpZihhcmVhLnNpemUgKiBjb250YWluZXJTaXplUGl4ZWwgPCB0aGlzLmd1dHRlclNpemUpIHtcbiAgICAgICAgICAgICAgICBwZXJjZW50VG9EaXNwYXRjaCArPSBhcmVhLnNpemU7XG4gICAgICAgICAgICAgICAgYXJlYS5zaXplID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBpZihwZXJjZW50VG9EaXNwYXRjaCA+IDAgJiYgdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBuYkFyZWFzTm90WmVybyA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmlsdGVyKGEgPT4gYS5zaXplICE9PSAwKS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmKG5iQXJlYXNOb3RaZXJvID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRUb0FkZCA9IHBlcmNlbnRUb0Rpc3BhdGNoIC8gbmJBcmVhc05vdFplcm87XG4gICAgXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5maWx0ZXIoYSA9PiBhLnNpemUgIT09IDApLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFyZWEuc2l6ZSArPSBwZXJjZW50VG9BZGQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBbGwgYXJlYSBzaXplcyAoY29udGFpbmVyIHBlcmNlbnRhZ2UpIGFyZSBsZXNzIHRoYW4gZ3V0ZXJTaXplLFxuICAgICAgICAgICAgLy8gSXQgbWVhbnMgY29udGFpbmVyU2l6ZSA8IG5nR3V0dGVycyAqIGd1dHRlclNpemVcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXNbdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGggLSAxXS5zaXplID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5yZWZyZXNoU3R5bGVTaXplcygpO1xuICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaFN0eWxlU2l6ZXMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHN1bUd1dHRlclNpemUgPSB0aGlzLmdldE5iR3V0dGVycygpICogdGhpcy5ndXR0ZXJTaXplO1xuXG4gICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgICAgICAgIGFyZWEuY29tcC5zZXRTdHlsZUZsZXhiYXNpcyhgY2FsYyggJHsgYXJlYS5zaXplICogMTAwIH0lIC0gJHsgYXJlYS5zaXplICogc3VtR3V0dGVyU2l6ZSB9cHggKWAsIHRoaXMuaXNEcmFnZ2luZyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGFydERyYWdnaW5nKHN0YXJ0RXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50LCBndXR0ZXJPcmRlcjogbnVtYmVyLCBndXR0ZXJOdW06IG51bWJlcik6IHZvaWQge1xuICAgICAgICBzdGFydEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gUGxhY2UgY29kZSBoZXJlIHRvIGFsbG93ICcoZ3V0dGVyQ2xpY2spJyBldmVudCBldmVuIGlmICdbZGlzYWJsZWRdPVwidHJ1ZVwiJy5cbiAgICAgICAgdGhpcy5jdXJyZW50R3V0dGVyTnVtID0gZ3V0dGVyTnVtO1xuICAgICAgICB0aGlzLmRyYWdnaW5nV2l0aG91dE1vdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCggdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ21vdXNldXAnLCAoZTogTW91c2VFdmVudCkgPT4gdGhpcy5zdG9wRHJhZ2dpbmcoKSkgKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKCB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAndG91Y2hlbmQnLCAoZTogVG91Y2hFdmVudCkgPT4gdGhpcy5zdG9wRHJhZ2dpbmcoKSkgKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKCB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAndG91Y2hjYW5jZWwnLCAoZTogVG91Y2hFdmVudCkgPT4gdGhpcy5zdG9wRHJhZ2dpbmcoKSkgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYXJlYUEgPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLm9yZGVyID09PSBndXR0ZXJPcmRlciAtIDEpO1xuICAgICAgICBjb25zdCBhcmVhQiA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmluZChhID0+IGEub3JkZXIgPT09IGd1dHRlck9yZGVyICsgMSk7XG4gICAgICAgIFxuICAgICAgICBpZighYXJlYUEgfHwgIWFyZWFCKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wID0gKHRoaXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpID8gJ29mZnNldFdpZHRoJyA6ICdvZmZzZXRIZWlnaHQnO1xuICAgICAgICB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGl4ZWxDb250YWluZXIgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnRbcHJvcF07XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEEgPSBhcmVhQS5jb21wLmdldFNpemVQaXhlbChwcm9wKTtcbiAgICAgICAgdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQiA9IGFyZWFCLmNvbXAuZ2V0U2l6ZVBpeGVsKHByb3ApO1xuICAgICAgICB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEEgPSBhcmVhQS5zaXplO1xuICAgICAgICB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIgPSBhcmVhQi5zaXplO1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0OiBJUG9pbnQgPSB0aGlzLmdldFBvaW50RnJvbUV2ZW50KHN0YXJ0RXZlbnQpO1xuICAgICAgICBpZighc3RhcnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKCB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnbW91c2Vtb3ZlJywgKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMuZHJhZ0V2ZW50KGUsIHN0YXJ0LCBhcmVhQSwgYXJlYUIpKSApO1xuICAgICAgICAgICAgdGhpcy5kcmFnTGlzdGVuZXJzLnB1c2goIHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICd0b3VjaG1vdmUnLCAoZTogVG91Y2hFdmVudCkgPT4gdGhpcy5kcmFnRXZlbnQoZSwgc3RhcnQsIGFyZWFBLCBhcmVhQikpICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFyZWFBLmNvbXAubG9ja0V2ZW50cygpO1xuICAgICAgICBhcmVhQi5jb21wLmxvY2tFdmVudHMoKTtcblxuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMubm90aWZ5KCdzdGFydCcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhZ0V2ZW50KGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCwgc3RhcnQ6IElQb2ludCwgYXJlYUE6IElBcmVhLCBhcmVhQjogSUFyZWEpOiB2b2lkIHtcbiAgICAgICAgaWYoIXRoaXMuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVuZDogSVBvaW50ID0gdGhpcy5nZXRQb2ludEZyb21FdmVudChldmVudCk7XG4gICAgICAgIGlmKCFlbmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5kcmFnZ2luZ1dpdGhvdXRNb3ZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhZyhzdGFydCwgZW5kLCBhcmVhQSwgYXJlYUIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UG9pbnRGcm9tRXZlbnQoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KTogSVBvaW50IHtcbiAgICAgICAgLy8gVG91Y2hFdmVudFxuICAgICAgICBpZihldmVudCBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogZXZlbnQudG91Y2hlc1swXS5wYWdlWCxcbiAgICAgICAgICAgICAgICB5OiBldmVudC50b3VjaGVzWzBdLnBhZ2VZLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBNb3VzZUV2ZW50XG4gICAgICAgIGVsc2UgaWYoZXZlbnQucGFnZVggIT09IHVuZGVmaW5lZCAmJiBldmVudC5wYWdlWSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHg6IGV2ZW50LnBhZ2VYLFxuICAgICAgICAgICAgICAgIHk6IGV2ZW50LnBhZ2VZLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYWcoc3RhcnQ6IElQb2ludCwgZW5kOiBJUG9pbnQsIGFyZWFBOiBJQXJlYSwgYXJlYUI6IElBcmVhKTogdm9pZCB7XG5cbiAgICAgICAgLy8gw4LCpCBBUkVBUyBTSVpFIFBJWEVMXG5cbiAgICAgICAgY29uc3QgZGV2aWNlUGl4ZWxSYXRpbyA9IC8qd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwqLyAxO1xuICAgICAgICBsZXQgb2Zmc2V0UGl4ZWwgPSAodGhpcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykgPyAoc3RhcnQueCAtIGVuZC54KSA6IChzdGFydC55IC0gZW5kLnkpO1xuICAgICAgICBvZmZzZXRQaXhlbCA9IG9mZnNldFBpeGVsIC8gZGV2aWNlUGl4ZWxSYXRpbztcblxuICAgICAgICBpZih0aGlzLmRpciA9PT0gJ3J0bCcpIHtcbiAgICAgICAgICAgIG9mZnNldFBpeGVsID0gLW9mZnNldFBpeGVsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5ld1NpemVQaXhlbEEgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGl4ZWxBIC0gb2Zmc2V0UGl4ZWw7XG4gICAgICAgIGxldCBuZXdTaXplUGl4ZWxCID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQiArIG9mZnNldFBpeGVsO1xuXG4gICAgICAgIGlmKG5ld1NpemVQaXhlbEEgPCB0aGlzLmd1dHRlclNpemUgfHwgbmV3U2l6ZVBpeGVsQiA8IHRoaXMuZ3V0dGVyU2l6ZSkge1xuICAgICAgICAgICAgLy8gV1RGLi4gZ2V0IG91dCBvZiBoZXJlIVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYobmV3U2l6ZVBpeGVsQSA8IHRoaXMuZ3V0dGVyU2l6ZSkge1xuICAgICAgICAgICAgbmV3U2l6ZVBpeGVsQiArPSBuZXdTaXplUGl4ZWxBO1xuICAgICAgICAgICAgbmV3U2l6ZVBpeGVsQSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihuZXdTaXplUGl4ZWxCIDwgdGhpcy5ndXR0ZXJTaXplKSB7XG4gICAgICAgICAgICBuZXdTaXplUGl4ZWxBICs9IG5ld1NpemVQaXhlbEI7XG4gICAgICAgICAgICBuZXdTaXplUGl4ZWxCID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIMOCwqQgQVJFQVMgU0laRSBQRVJDRU5UXG5cbiAgICAgICAgaWYobmV3U2l6ZVBpeGVsQSA9PT0gMCkge1xuICAgICAgICAgICAgYXJlYUIuc2l6ZSArPSBhcmVhQS5zaXplO1xuICAgICAgICAgICAgYXJlYUEuc2l6ZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihuZXdTaXplUGl4ZWxCID09PSAwKSB7XG4gICAgICAgICAgICBhcmVhQS5zaXplICs9IGFyZWFCLnNpemU7XG4gICAgICAgICAgICBhcmVhQi5zaXplID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIE5FV19QRVJDRU5UID0gU1RBUlRfUEVSQ0VOVCAvIFNUQVJUX1BJWEVMICogTkVXX1BJWEVMO1xuICAgICAgICAgICAgaWYodGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRBID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYXJlYUIuc2l6ZSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QiAvIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEIgKiBuZXdTaXplUGl4ZWxCO1xuICAgICAgICAgICAgICAgIGFyZWFBLnNpemUgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIgLSBhcmVhQi5zaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIgPT09IDApIHtcbiAgICAgICAgICAgICAgICBhcmVhQS5zaXplID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRBIC8gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQSAqIG5ld1NpemVQaXhlbEE7XG4gICAgICAgICAgICAgICAgYXJlYUIuc2l6ZSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSAtIGFyZWFBLnNpemU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcmVhQS5zaXplID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRBIC8gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQSAqIG5ld1NpemVQaXhlbEE7XG4gICAgICAgICAgICAgICAgYXJlYUIuc2l6ZSA9ICh0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEEgKyB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIpIC0gYXJlYUEuc2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaFN0eWxlU2l6ZXMoKTtcbiAgICAgICAgdGhpcy5ub3RpZnkoJ3Byb2dyZXNzJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdG9wRHJhZ2dpbmcoKTogdm9pZCB7XG4gICAgICAgIGlmKHRoaXMuaXNEcmFnZ2luZyA9PT0gZmFsc2UgJiYgdGhpcy5kcmFnZ2luZ1dpdGhvdXRNb3ZlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgICAgICAgYXJlYS5jb21wLnVubG9ja0V2ZW50cygpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3aGlsZSh0aGlzLmRyYWdMaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZmN0ID0gdGhpcy5kcmFnTGlzdGVuZXJzLnBvcCgpO1xuICAgICAgICAgICAgaWYoZmN0KSB7XG4gICAgICAgICAgICAgICAgZmN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuZHJhZ2dpbmdXaXRob3V0TW92ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnkoJ2NsaWNrJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeSgnZW5kJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kcmFnZ2luZ1dpdGhvdXRNb3ZlID0gZmFsc2U7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgbm90aWZ5KHR5cGU6ICdzdGFydCcgfCAncHJvZ3Jlc3MnIHwgJ2VuZCcgfCAnY2xpY2snIHwgJ3RyYW5zaXRpb25FbmQnKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFyZWFzU2l6ZTogQXJyYXk8bnVtYmVyPiA9IHRoaXMuZGlzcGxheWVkQXJlYXMubWFwKGEgPT4gYS5zaXplICogMTAwKTtcblxuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyYWdTdGFydC5lbWl0KHtndXR0ZXJOdW06IHRoaXMuY3VycmVudEd1dHRlck51bSwgc2l6ZXM6IGFyZWFzU2l6ZX0pO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncHJvZ3Jlc3MnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kcmFnUHJvZ3Jlc3MuZW1pdCh7Z3V0dGVyTnVtOiB0aGlzLmN1cnJlbnRHdXR0ZXJOdW0sIHNpemVzOiBhcmVhc1NpemV9KTtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyYWdFbmQuZW1pdCh7Z3V0dGVyTnVtOiB0aGlzLmN1cnJlbnRHdXR0ZXJOdW0sIHNpemVzOiBhcmVhc1NpemV9KTtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ3V0dGVyQ2xpY2suZW1pdCh7Z3V0dGVyTnVtOiB0aGlzLmN1cnJlbnRHdXR0ZXJOdW0sIHNpemVzOiBhcmVhc1NpemV9KTtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3RyYW5zaXRpb25FbmQnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2l0aW9uRW5kSW50ZXJuYWwubmV4dChhcmVhc1NpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBPbkluaXQsIE9uRGVzdHJveSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNwbGl0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50L3NwbGl0LmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnYXMtc3BsaXQtYXJlYSdcbn0pXG5leHBvcnQgY2xhc3MgU3BsaXRBcmVhRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgcHJpdmF0ZSBfb3JkZXI6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgQElucHV0KCkgc2V0IG9yZGVyKHY6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdiA9IE51bWJlcih2KTtcbiAgICAgICAgdGhpcy5fb3JkZXIgPSAhaXNOYU4odikgPyB2IDogbnVsbDtcblxuICAgICAgICB0aGlzLnNwbGl0LnVwZGF0ZUFyZWEodGhpcywgdHJ1ZSwgZmFsc2UpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgb3JkZXIoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcmRlcjtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9zaXplOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIEBJbnB1dCgpIHNldCBzaXplKHY6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdiA9IE51bWJlcih2KTtcbiAgICAgICAgdGhpcy5fc2l6ZSA9ICghaXNOYU4odikgJiYgdiA+PSAwICYmIHYgPD0gMTAwKSA/ICh2LzEwMCkgOiBudWxsO1xuXG4gICAgICAgIHRoaXMuc3BsaXQudXBkYXRlQXJlYSh0aGlzLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICAgIFxuICAgIGdldCBzaXplKCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9taW5TaXplOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgc2V0IG1pblNpemUodjogbnVtYmVyKSB7XG4gICAgICAgIHYgPSBOdW1iZXIodik7XG4gICAgICAgIHRoaXMuX21pblNpemUgPSAoIWlzTmFOKHYpICYmIHYgPiAwICYmIHYgPCAxMDApID8gdi8xMDAgOiAwO1xuXG4gICAgICAgIHRoaXMuc3BsaXQudXBkYXRlQXJlYSh0aGlzLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICAgIFxuICAgIGdldCBtaW5TaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5TaXplO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX3Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2V0IHZpc2libGUodjogYm9vbGVhbikge1xuICAgICAgICB2ID0gKHR5cGVvZih2KSA9PT0gJ2Jvb2xlYW4nKSA/IHYgOiAodiA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogdHJ1ZSk7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2O1xuXG4gICAgICAgIGlmKHRoaXMudmlzaWJsZSkgeyBcbiAgICAgICAgICAgIHRoaXMuc3BsaXQuc2hvd0FyZWEodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNwbGl0LmhpZGVBcmVhKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgdHJhbnNpdGlvbkxpc3RlbmVyOiBGdW5jdGlvbjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvY2tMaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPiA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHNwbGl0OiBTcGxpdENvbXBvbmVudCkge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zcGxpdC5hZGRBcmVhKHRoaXMpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZmxleC1ncm93JywgJzAnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdmbGV4LXNocmluaycsICcwJyk7XG5cbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uZW5kJywgKGU6IFRyYW5zaXRpb25FdmVudCkgPT4gdGhpcy5vblRyYW5zaXRpb25FbmQoZSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2l6ZVBpeGVsKHByb3A6ICdvZmZzZXRXaWR0aCcgfCAnb2Zmc2V0SGVpZ2h0Jyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnRbcHJvcF07XG4gICAgfVxuXG4gICAgcHVibGljIHNldFN0eWxlVmlzaWJsZUFuZERpcihpc1Zpc2libGU6IGJvb2xlYW4sIGlzRHJhZ2dpbmc6IGJvb2xlYW4sIGRpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyk6IHZvaWQge1xuICAgICAgICBpZihpc1Zpc2libGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlRmxleGJhc2lzKCcwJywgaXNEcmFnZ2luZyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93LXgnLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnbWF4LXdpZHRoJywgJzAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnb3ZlcmZsb3cteCcsICdoaWRkZW4nKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnb3ZlcmZsb3cteScsICdhdXRvJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ21heC13aWR0aCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgJzEwMCUnKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAnMTAwJScpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTdHlsZU9yZGVyKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdvcmRlcicsIHZhbHVlKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHNldFN0eWxlRmxleGJhc2lzKHZhbHVlOiBzdHJpbmcsIGlzRHJhZ2dpbmc6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgLy8gSWYgY29tcG9uZW50IG5vdCB5ZXQgaW5pdGlhbGl6ZWQgb3IgZ3V0dGVyIGJlaW5nIGRyYWdnZWQsIGRpc2FibGUgdHJhbnNpdGlvblxuICAgICAgICBpZih0aGlzLnNwbGl0LmlzVmlld0luaXRpYWxpemVkID09PSBmYWxzZSB8fCBpc0RyYWdnaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlVHJhbnNpdGlvbihmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3IgdXNlICd1c2VUcmFuc2l0aW9uJyB0byBrbm93IGlmIHRyYW5zaXRpb24uXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZVRyYW5zaXRpb24odGhpcy5zcGxpdC51c2VUcmFuc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZmxleC1iYXNpcycsIHZhbHVlKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBzZXRTdHlsZVRyYW5zaXRpb24odXNlVHJhbnNpdGlvbjogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZih1c2VUcmFuc2l0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb24nLCBgZmxleC1iYXNpcyAwLjNzYCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb24nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIG9uVHJhbnNpdGlvbkVuZChldmVudDogVHJhbnNpdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIExpbWl0IG9ubHkgZmxleC1iYXNpcyB0cmFuc2l0aW9uIHRvIHRyaWdnZXIgdGhlIGV2ZW50XG4gICAgICAgIGlmKGV2ZW50LnByb3BlcnR5TmFtZSA9PT0gJ2ZsZXgtYmFzaXMnKSB7XG4gICAgICAgICAgICB0aGlzLnNwbGl0Lm5vdGlmeSgndHJhbnNpdGlvbkVuZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBsb2NrRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvY2tMaXN0ZW5lcnMucHVzaCggdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnc2VsZWN0c3RhcnQnLCAoZTogRXZlbnQpID0+IGZhbHNlKSApO1xuICAgICAgICAgICAgdGhpcy5sb2NrTGlzdGVuZXJzLnB1c2goIHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2RyYWdzdGFydCcsIChlOiBFdmVudCkgPT4gZmFsc2UpICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyB1bmxvY2tFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHdoaWxlKHRoaXMubG9ja0xpc3RlbmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBmY3QgPSB0aGlzLmxvY2tMaXN0ZW5lcnMucG9wKCk7XG4gICAgICAgICAgICBpZihmY3QpIHtcbiAgICAgICAgICAgICAgICBmY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51bmxvY2tFdmVudHMoKTtcblxuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb25MaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3BsaXQucmVtb3ZlQXJlYSh0aGlzKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdhcy1zcGxpdC1ndXR0ZXInXG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0R3V0dGVyRGlyZWN0aXZlIHtcblxuICAgIEBJbnB1dCgpIHNldCBvcmRlcih2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdvcmRlcicsIHYpO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2RpcmVjdGlvbjogJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJztcblxuICAgIEBJbnB1dCgpIHNldCBkaXJlY3Rpb24odjogJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJykge1xuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSB2O1xuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZSgpO1xuICAgIH1cblxuICAgIGdldCBkaXJlY3Rpb24oKTogJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXJlY3Rpb247XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgQElucHV0KCkgc2V0IHVzZVRyYW5zaXRpb24odjogYm9vbGVhbikge1xuICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uJywgYGZsZXgtYmFzaXMgMC4zc2ApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9zaXplOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBzZXQgc2l6ZSh2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHY7XG4gICAgICAgIHRoaXMucmVmcmVzaFN0eWxlKCk7XG4gICAgfVxuXG4gICAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfY29sb3I6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHNldCBjb2xvcih2OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fY29sb3IgPSB2O1xuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VzZUJhY2tncm91bmQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2V0IHVzZUJhY2tncm91bmQodjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl91c2VCYWNrZ3JvdW5kID0gdjtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3R5bGUoKTtcbiAgICB9XG5cbiAgICBnZXQgY29sb3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2ltYWdlSDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2V0IGltYWdlSCh2OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faW1hZ2VIID0gdjtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3R5bGUoKTtcbiAgICB9XG5cbiAgICBnZXQgaW1hZ2VIKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZUg7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfaW1hZ2VWOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzZXQgaW1hZ2VWKHY6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pbWFnZVYgPSB2O1xuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZSgpO1xuICAgIH1cblxuICAgIGdldCBpbWFnZVYoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ltYWdlVjtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgc2V0IGRpc2FibGVkKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2O1xuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZSgpO1xuICAgIH1cblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hTdHlsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdmbGV4LWJhc2lzJywgYCR7dGhpcy5zaXplfXB4YCk7XG5cbiAgICAgICAgLy8gZml4IHNhZmFyaSBidWcgYWJvdXQgZ3V0dGVyIGhlaWdodCB3aGVuIGRpcmVjdGlvbiBpcyBob3Jpem9udGFsXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgKHRoaXMuZGlyZWN0aW9uID09PSAndmVydGljYWwnKSA/IGAke3RoaXMuc2l6ZX1weGAgOiBgMTAwJWApO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZC1jb2xvcicsICh0aGlzLmNvbG9yICE9PSAnJykgPyB0aGlzLmNvbG9yIDogYCNlZWVlZWVgKTtcblxuICAgICAgICBjb25zdCBzdGF0ZTogJ2Rpc2FibGVkJyB8ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCcgPSAodGhpcy5kaXNhYmxlZCA9PT0gdHJ1ZSkgPyAnZGlzYWJsZWQnIDogdGhpcy5kaXJlY3Rpb247XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZC1pbWFnZScsIHRoaXMuZ2V0SW1hZ2Uoc3RhdGUpKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdjdXJzb3InLCB0aGlzLmdldEN1cnNvcihzdGF0ZSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q3Vyc29yKHN0YXRlOiAnZGlzYWJsZWQnIHwgJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJyk6IHN0cmluZyB7XG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2hvcml6b250YWwnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnY29sLXJlc2l6ZSc7XG5cbiAgICAgICAgICAgIGNhc2UgJ3ZlcnRpY2FsJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3Jvdy1yZXNpemUnO1xuXG4gICAgICAgICAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdkZWZhdWx0JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SW1hZ2Uoc3RhdGU6ICdkaXNhYmxlZCcgfCAndmVydGljYWwnIHwgJ2hvcml6b250YWwnKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzZUJhY2tncm91bmQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdob3Jpem9udGFsJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmltYWdlSCAhPT0gJycpID8gdGhpcy5pbWFnZUggOiBkZWZhdWx0SW1hZ2VIO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAndmVydGljYWwnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuaW1hZ2VWICE9PSAnJykgPyB0aGlzLmltYWdlViA6IGRlZmF1bHRJbWFnZVY7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG59XG5cblxuY29uc3QgZGVmYXVsdEltYWdlSCA9ICd1cmwoXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFVQUFBQWVDQVlBQUFEa2Z0UzlBQUFBSWtsRVFWUW9VMk00YytiTWZ4QUdBZ1lZbXdHcklJaURqckVManBvNWFpWmVNd0YreU5uT3M1S1N2Z0FBQUFCSlJVNUVya0pnZ2c9PVwiKSc7XG5jb25zdCBkZWZhdWx0SW1hZ2VWID0gJ3VybChcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQjRBQUFBRkNBTUFBQUJsLzZ6SUFBQUFCbEJNVkVVQUFBRE16TXpJVDhBeUFBQUFBWFJTVGxNQVFPYllaZ0FBQUJSSlJFRlVlQUZqWUdSa3dJTUpTZU1IbEJrT0FCUDdBRUd6U3VQS0FBQUFBRWxGVGtTdVFtQ0NcIiknO1xuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFNwbGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvc3BsaXQuY29tcG9uZW50JztcbmltcG9ydCB7IFNwbGl0QXJlYURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL3NwbGl0QXJlYS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU3BsaXRHdXR0ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9zcGxpdEd1dHRlci5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgU3BsaXRDb21wb25lbnQsXG4gICAgICAgIFNwbGl0QXJlYURpcmVjdGl2ZSxcbiAgICAgICAgU3BsaXRHdXR0ZXJEaXJlY3RpdmUsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFNwbGl0Q29tcG9uZW50LFxuICAgICAgICBTcGxpdEFyZWFEaXJlY3RpdmUsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyU3BsaXRNb2R1bGUge1xuXG4gICAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEFuZ3VsYXJTcGxpdE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW11cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGZvckNoaWxkKCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEFuZ3VsYXJTcGxpdE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW11cbiAgICAgICAgfTtcbiAgICB9XG5cbn1cbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fc3ByZWFkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlDQTtJQThPSSx3QkFBb0IsTUFBYyxFQUNkLEtBQWlCLEVBQ2pCLEtBQXdCLEVBQ3hCLFFBQW1CO1FBSG5CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLGFBQVEsR0FBUixRQUFRLENBQVc7UUExTi9CLGVBQVUsR0FBOEIsWUFBWSxDQUFDOztRQW1CckQsbUJBQWMsR0FBWSxLQUFLLENBQUM7O1FBYWhDLGNBQVMsR0FBWSxLQUFLLENBQUM7O1FBaUIzQixtQkFBYyxHQUFZLElBQUksQ0FBQzs7UUFnQi9CLFdBQU0sR0FBa0IsSUFBSSxDQUFDOztRQWU3QixZQUFPLEdBQWtCLElBQUksQ0FBQzs7UUFlOUIsZ0JBQVcsR0FBVyxFQUFFLENBQUM7O1FBZXpCLGlCQUFZLEdBQVcsRUFBRSxDQUFDOztRQWUxQixrQkFBYSxHQUFXLEVBQUUsQ0FBQzs7UUFlM0Isa0JBQWEsR0FBVyxFQUFFLENBQUM7O1FBZTNCLFNBQUksR0FBa0IsS0FBSyxDQUFDOztRQWExQixjQUFTLEdBQUcsSUFBSSxZQUFZLENBQTRDLEtBQUssQ0FBQyxDQUFDO1FBQy9FLGlCQUFZLEdBQUcsSUFBSSxZQUFZLENBQTRDLEtBQUssQ0FBQyxDQUFDO1FBQ2xGLFlBQU8sR0FBRyxJQUFJLFlBQVksQ0FBNEMsS0FBSyxDQUFDLENBQUM7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