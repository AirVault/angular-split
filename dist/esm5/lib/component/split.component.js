/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
            tslib_1.__spread(this.displayedAreas, this.hidedAreas).forEach(function (area) {
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
            (_a = this.displayedAreas).push.apply(_a, tslib_1.__spread(areas));
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
            (_a = this.hidedAreas).push.apply(_a, tslib_1.__spread(areas));
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
export { SplitComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zcGxpdC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvc3BsaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSx1QkFBdUIsRUFDdEYsWUFBWSxFQUFFLFNBQVMsRUFBYSxVQUFVLEVBQWlCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQzlDO0lBOE9JLHdCQUFvQixNQUFjLEVBQ2QsS0FBaUIsRUFDakIsS0FBd0IsRUFDeEIsUUFBbUI7UUFIbkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDakIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDeEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQTFOL0IsZUFBVSxHQUE4QixZQUFZLENBQUM7O1FBbUJyRCxtQkFBYyxHQUFZLEtBQUssQ0FBQzs7UUFhaEMsY0FBUyxHQUFZLEtBQUssQ0FBQzs7UUFpQjNCLG1CQUFjLEdBQVksSUFBSSxDQUFDOztRQWdCL0IsV0FBTSxHQUFrQixJQUFJLENBQUM7O1FBZTdCLFlBQU8sR0FBa0IsSUFBSSxDQUFDOztRQWU5QixnQkFBVyxHQUFXLEVBQUUsQ0FBQzs7UUFlekIsaUJBQVksR0FBVyxFQUFFLENBQUM7O1FBZTFCLGtCQUFhLEdBQVcsRUFBRSxDQUFDOztRQWUzQixrQkFBYSxHQUFXLEVBQUUsQ0FBQzs7UUFlM0IsU0FBSSxHQUFrQixLQUFLLENBQUM7O1FBYTFCLGNBQVMsR0FBRyxJQUFJLFlB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TCxLQUFLOytCQWVMLEtBQUs7K0JBZUwsS0FBSztzQkFlTCxLQUFLOzRCQVdMLE1BQU07K0JBQ04sTUFBTTswQkFDTixNQUFNOzhCQUNOLE1BQU07Z0NBR04sTUFBTTttQ0FJTixXQUFXLFNBQUMsc0JBQXNCOzJCQUlsQyxXQUFXLFNBQUMsYUFBYTs0QkFJekIsV0FBVyxTQUFDLGNBQWM7OEJBSTFCLFdBQVcsU0FBQyxpQkFBaUI7K0JBSTdCLFdBQVcsU0FBQyxrQkFBa0I7O0lBdVluQyxxQkFBQztDQUFBLEFBaG1CRCxJQWdtQkM7U0Eza0JZLGNBQWM7OztJQUV2QixvQ0FBNkQ7O0lBbUI3RCx3Q0FBd0M7O0lBYXhDLG1DQUFtQzs7SUFpQm5DLHdDQUF1Qzs7SUFnQnZDLGdDQUFxQzs7SUFlckMsaUNBQXNDOztJQWV0QyxxQ0FBaUM7O0lBZWpDLHNDQUFrQzs7SUFlbEMsdUNBQW1DOztJQWVuQyx1Q0FBbUM7O0lBZW5DLDhCQUFvQzs7SUFhcEMsbUNBQXlGOztJQUN6RixzQ0FBNEY7O0lBQzVGLGlDQUF1Rjs7SUFDdkYscUNBQTJGOztJQUUzRiwrQ0FBNkQ7O0lBQzdELHVDQUVFOztJQXNCRiwyQ0FBMEM7O0lBQzFDLG9DQUFvQzs7SUFDcEMsNkNBQTZDOztJQUM3QywwQ0FBcUM7O0lBRXJDLHdDQUFrRDs7SUFDbEQsb0NBQStDOztJQUUvQyx1Q0FBcUQ7O0lBQ3JELHlDQU1FOztJQUVVLGdDQUFzQjs7SUFDdEIsK0JBQXlCOztJQUN6QiwrQkFBZ0M7O0lBQ2hDLGtDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIElucHV0LCBPdXRwdXQsIEhvc3RCaW5kaW5nLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgXG4gICAgRXZlbnRFbWl0dGVyLCBSZW5kZXJlcjIsIE9uRGVzdHJveSwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IElBcmVhIH0gZnJvbSAnLi4vaW50ZXJmYWNlL0lBcmVhJztcbmltcG9ydCB7IElQb2ludCB9IGZyb20gJy4uL2ludGVyZmFjZS9JUG9pbnQnO1xuaW1wb3J0IHsgU3BsaXRBcmVhRGlyZWN0aXZlIH0gZnJvbSAnLi4vZGlyZWN0aXZlL3NwbGl0QXJlYS5kaXJlY3RpdmUnO1xuXG4vKipcbiAqIGFuZ3VsYXItc3BsaXRcbiAqIFxuICogQXJlYXMgc2l6ZSBhcmUgc2V0IGluIHBlcmNlbnRhZ2Ugb2YgdGhlIHNwbGl0IGNvbnRhaW5lci5cbiAqIEd1dHRlcnMgc2l6ZSBhcmUgc2V0IGluIHBpeGVscy5cbiAqIFxuICogU28gd2Ugc2V0IGNzcyAnZmxleC1iYXNpcycgcHJvcGVydHkgbGlrZSB0aGlzICh3aGVyZSAwIDw9IGFyZWEuc2l6ZSA8PSAxKTogXG4gKiAgY2FsYyggeyBhcmVhLnNpemUgKiAxMDAgfSUgLSB7IGFyZWEuc2l6ZSAqIG5iR3V0dGVyICogZ3V0dGVyU2l6ZSB9cHggKTtcbiAqIFxuICogRXhhbXBsZXMgd2l0aCAzIHZpc2libGUgYXJlYXMgYW5kIDIgZ3V0dGVyczogXG4gKiBcbiAqIHwgICAgICAgICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLVtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tW10tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8ICBjYWxjKDIwJSAtIDRweCkgICAgICAgICAgY2FsYygyMCUgLSA0cHgpICAgICAgICAgICAgICBjYWxjKDYwJSAtIDEycHgpICAgICAgICAgIHxcbiAqIFxuICogXG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAgY2FsYygzMy4zMyUgLSA2LjY2N3B4KSAgICAgIGNhbGMoMzMuMzMlIC0gNi42NjdweCkgICAgICBjYWxjKDMzLjMzJSAtIDYuNjY3cHgpICB8XG4gKiBcbiAqIFxuICogfDEwcHggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8W10tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tW10tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwwICAgICAgICAgICAgICAgICBjYWxjKDY2LjY2JSAtIDEzLjMzM3B4KSAgICAgICAgICAgICAgICAgIGNhbGMoMzMlJSAtIDYuNjY3cHgpICAgfFxuICogXG4gKiBcbiAqICAxMHB4IDEwcHggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfFtdW10tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8MCAwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGMoMTAwJSAtIDIwcHgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIFxuICovXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXMtc3BsaXQnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHN0eWxlVXJsczogW2AuL3NwbGl0LmNvbXBvbmVudC5zY3NzYF0sXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWFyZWEgW25nRm9yT2ZdPVwiZGlzcGxheWVkQXJlYXNcIiBsZXQtaW5kZXg9XCJpbmRleFwiIGxldC1sYXN0PVwibGFzdFwiPlxuICAgICAgICAgICAgPGFzLXNwbGl0LWd1dHRlciAqbmdJZj1cImxhc3QgPT09IGZhbHNlXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtvcmRlcl09XCJpbmRleCoyKzFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlyZWN0aW9uXT1cImRpcmVjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFt1c2VUcmFuc2l0aW9uXT1cInVzZVRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbc2l6ZV09XCJndXR0ZXJTaXplXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2NvbG9yXT1cImd1dHRlckNvbG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW3VzZUJhY2tncm91bmRdPVwidXNlQmFja2dyb3VuZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtpbWFnZUhdPVwiZ3V0dGVySW1hZ2VIXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2ltYWdlVl09XCJndXR0ZXJJbWFnZVZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cInN0YXJ0RHJhZ2dpbmcoJGV2ZW50LCBpbmRleCoyKzEsIGluZGV4KzEpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKHRvdWNoc3RhcnQpPVwic3RhcnREcmFnZ2luZygkZXZlbnQsIGluZGV4KjIrMSwgaW5kZXgrMSlcIj48L2FzLXNwbGl0LWd1dHRlcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5gLFxufSlcbmV4cG9ydCBjbGFzcyBTcGxpdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBwcml2YXRlIF9kaXJlY3Rpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XG5cbiAgICBASW5wdXQoKSBzZXQgZGlyZWN0aW9uKHY6ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgdiA9ICh2ID09PSAndmVydGljYWwnKSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCc7XG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IHY7XG4gICAgICAgIFxuICAgICAgICBbLi4udGhpcy5kaXNwbGF5ZWRBcmVhcywgLi4udGhpcy5oaWRlZEFyZWFzXS5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgICAgICAgYXJlYS5jb21wLnNldFN0eWxlVmlzaWJsZUFuZERpcihhcmVhLmNvbXAudmlzaWJsZSwgdGhpcy5pc0RyYWdnaW5nLCB0aGlzLmRpcmVjdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5idWlsZChmYWxzZSwgZmFsc2UpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgZGlyZWN0aW9uKCk6ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlyZWN0aW9uO1xuICAgIH1cbiAgICBcbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF91c2VUcmFuc2l0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBzZXQgdXNlVHJhbnNpdGlvbih2OiBib29sZWFuKSB7XG4gICAgICAgIHYgPSAodHlwZW9mKHYpID09PSAnYm9vbGVhbicpID8gdiA6ICh2ID09PSAnZmFsc2UnID8gZmFsc2UgOiB0cnVlKTtcbiAgICAgICAgdGhpcy5fdXNlVHJhbnNpdGlvbiA9IHY7XG4gICAgfVxuICAgIFxuICAgIGdldCB1c2VUcmFuc2l0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlVHJhbnNpdGlvbjtcbiAgICB9XG4gICAgXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBcbiAgICBASW5wdXQoKSBzZXQgZGlzYWJsZWQodjogYm9vbGVhbikge1xuICAgICAgICB2ID0gKHR5cGVvZih2KSA9PT0gJ2Jvb2xlYW4nKSA/IHYgOiAodiA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdjtcblxuICAgICAgICAvLyBGb3JjZSByZXBhaW50IGlmIG1vZGlmaWVkIGZyb20gVFMgY2xhc3MgKGluc3RlYWQgb2YgdGhlIHRlbXBsYXRlKVxuICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICAvLy8vXG5cblxuICAgIHByaXZhdGUgX3VzZUJhY2tncm91bmQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2V0IHVzZUJhY2tncm91bmQodjogYm9vbGVhbikge1xuICAgICAgICB2ID0gKHR5cGVvZih2KSA9PT0gJ2Jvb2xlYW4nKSA/IHYgOiAodiAhPT0gJ2ZhbHNlJyk7XG4gICAgICAgIHRoaXMuX3VzZUJhY2tncm91bmQgPSB2O1xuXG4gICAgICAgIC8vIEZvcmNlIHJlcGFpbnQgaWYgbW9kaWZpZWQgZnJvbSBUUyBjbGFzcyAoaW5zdGVhZCBvZiB0aGUgdGVtcGxhdGUpXG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0IHVzZUJhY2tncm91bmQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VCYWNrZ3JvdW5kO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX3dpZHRoOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIEBJbnB1dCgpIHNldCB3aWR0aCh2OiBudW1iZXIgfCBudWxsKSB7XG4gICAgICAgIHYgPSBOdW1iZXIodik7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gKCFpc05hTih2KSAmJiB2ID4gMCkgPyB2IDogbnVsbDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYnVpbGQoZmFsc2UsIGZhbHNlKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IHdpZHRoKCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gICAgfVxuICAgIFxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2hlaWdodDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoKSBzZXQgaGVpZ2h0KHY6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdiA9IE51bWJlcih2KTtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gKCFpc05hTih2KSAmJiB2ID4gMCkgPyB2IDogbnVsbDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYnVpbGQoZmFsc2UsIGZhbHNlKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGhlaWdodCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgICB9XG4gICAgXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfZ3V0dGVyU2l6ZTogbnVtYmVyID0gMTE7XG5cbiAgICBASW5wdXQoKSBzZXQgZ3V0dGVyU2l6ZSh2OiBudW1iZXIpIHtcbiAgICAgICAgdiA9IE51bWJlcih2KTtcbiAgICAgICAgdGhpcy5fZ3V0dGVyU2l6ZSA9ICghaXNOYU4odikgJiYgdiA+IDApID8gdiA6IDExO1xuXG4gICAgICAgIHRoaXMuYnVpbGQoZmFsc2UsIGZhbHNlKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGd1dHRlclNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2d1dHRlclNpemU7XG4gICAgfVxuICAgIFxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2d1dHRlckNvbG9yOiBzdHJpbmcgPSAnJztcblxuICAgIEBJbnB1dCgpIHNldCBndXR0ZXJDb2xvcih2OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZ3V0dGVyQ29sb3IgPSAodHlwZW9mIHYgPT09ICdzdHJpbmcnICYmIHYgIT09ICcnKSA/IHYgOiAnJztcblxuICAgICAgICAvLyBGb3JjZSByZXBhaW50IGlmIG1vZGlmaWVkIGZyb20gVFMgY2xhc3MgKGluc3RlYWQgb2YgdGhlIHRlbXBsYXRlKVxuICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgZ3V0dGVyQ29sb3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2d1dHRlckNvbG9yO1xuICAgIH1cbiAgICBcbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9ndXR0ZXJJbWFnZUg6IHN0cmluZyA9ICcnO1xuXG4gICAgQElucHV0KCkgc2V0IGd1dHRlckltYWdlSCh2OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZ3V0dGVySW1hZ2VIID0gKHR5cGVvZiB2ID09PSAnc3RyaW5nJyAmJiB2ICE9PSAnJykgPyB2IDogJyc7XG4gICAgICAgIFxuICAgICAgICAvLyBGb3JjZSByZXBhaW50IGlmIG1vZGlmaWVkIGZyb20gVFMgY2xhc3MgKGluc3RlYWQgb2YgdGhlIHRlbXBsYXRlKVxuICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgZ3V0dGVySW1hZ2VIKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ndXR0ZXJJbWFnZUg7XG4gICAgfVxuICAgIFxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2d1dHRlckltYWdlVjogc3RyaW5nID0gJyc7XG5cbiAgICBASW5wdXQoKSBzZXQgZ3V0dGVySW1hZ2VWKHY6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9ndXR0ZXJJbWFnZVYgPSAodHlwZW9mIHYgPT09ICdzdHJpbmcnICYmIHYgIT09ICcnKSA/IHYgOiAnJztcblxuICAgICAgICAvLyBGb3JjZSByZXBhaW50IGlmIG1vZGlmaWVkIGZyb20gVFMgY2xhc3MgKGluc3RlYWQgb2YgdGhlIHRlbXBsYXRlKVxuICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgZ3V0dGVySW1hZ2VWKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ndXR0ZXJJbWFnZVY7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfZGlyOiAnbHRyJyB8ICdydGwnID0gJ2x0cic7XG4gICAgXG4gICAgQElucHV0KCkgc2V0IGRpcih2OiAnbHRyJyB8ICdydGwnKSB7XG4gICAgICAgIHYgPSAodiA9PT0gJ3J0bCcpID8gJ3J0bCcgOiAnbHRyJztcbiAgICAgICAgdGhpcy5fZGlyID0gdjtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGRpcigpOiAnbHRyJyB8ICdydGwnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpcjtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBAT3V0cHV0KCkgZHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjx7Z3V0dGVyTnVtOiBudW1iZXIsIHNpemVzOiBBcnJheTxudW1iZXI+fT4oZmFsc2UpO1xuICAgIEBPdXRwdXQoKSBkcmFnUHJvZ3Jlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPHtndXR0ZXJOdW06IG51bWJlciwgc2l6ZXM6IEFycmF5PG51bWJlcj59PihmYWxzZSk7XG4gICAgQE91dHB1dCgpIGRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPHtndXR0ZXJOdW06IG51bWJlciwgc2l6ZXM6IEFycmF5PG51bWJlcj59PihmYWxzZSk7XG4gICAgQE91dHB1dCgpIGd1dHRlckNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjx7Z3V0dGVyTnVtOiBudW1iZXIsIHNpemVzOiBBcnJheTxudW1iZXI+fT4oZmFsc2UpO1xuXG4gICAgcHJpdmF0ZSB0cmFuc2l0aW9uRW5kSW50ZXJuYWwgPSBuZXcgU3ViamVjdDxBcnJheTxudW1iZXI+PigpO1xuICAgIEBPdXRwdXQoKSB0cmFuc2l0aW9uRW5kID0gKDxPYnNlcnZhYmxlPEFycmF5PG51bWJlcj4+PiB0aGlzLnRyYW5zaXRpb25FbmRJbnRlcm5hbC5hc09ic2VydmFibGUoKSkucGlwZShcbiAgICAgICAgZGVib3VuY2VUaW1lKDIwKVxuICAgICk7XG5cbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLmZsZXgtZGlyZWN0aW9uJykgZ2V0IGNzc0ZsZXhkaXJlY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykgPyAncm93JyA6ICdjb2x1bW4nO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKSBnZXQgY3NzV2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndpZHRoID8gYCR7IHRoaXMud2lkdGggfXB4YCA6ICcxMDAlJztcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodCcpIGdldCBjc3NIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlaWdodCA/IGAkeyB0aGlzLmhlaWdodCB9cHhgIDogJzEwMCUnO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZygnc3R5bGUubWluLXdpZHRoJykgZ2V0IGNzc01pbndpZHRoKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpID8gYCR7IHRoaXMuZ2V0TmJHdXR0ZXJzKCkgKiB0aGlzLmd1dHRlclNpemUgfXB4YCA6IG51bGw7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS5taW4taGVpZ2h0JykgZ2V0IGNzc01pbmhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJykgPyBgJHsgdGhpcy5nZXROYkd1dHRlcnMoKSAqIHRoaXMuZ3V0dGVyU2l6ZSB9cHhgIDogbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNWaWV3SW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGlzRHJhZ2dpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGRyYWdnaW5nV2l0aG91dE1vdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGN1cnJlbnRHdXR0ZXJOdW06IG51bWJlciA9IDA7XG5cbiAgICBwdWJsaWMgcmVhZG9ubHkgZGlzcGxheWVkQXJlYXM6IEFycmF5PElBcmVhPiA9IFtdO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgaGlkZWRBcmVhczogQXJyYXk8SUFyZWE+ID0gW107XG4gICAgXG4gICAgcHJpdmF0ZSByZWFkb25seSBkcmFnTGlzdGVuZXJzOiBBcnJheTxGdW5jdGlvbj4gPSBbXTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRyYWdTdGFydFZhbHVlcyA9IHtcbiAgICAgICAgc2l6ZVBpeGVsQ29udGFpbmVyOiAwLFxuICAgICAgICBzaXplUGl4ZWxBOiAwLFxuICAgICAgICBzaXplUGl4ZWxCOiAwLFxuICAgICAgICBzaXplUGVyY2VudEE6IDAsXG4gICAgICAgIHNpemVQZXJjZW50QjogMCxcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuaXNWaWV3SW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TmJHdXR0ZXJzKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXllZEFyZWFzLmxlbmd0aCAtIDE7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZEFyZWEoY29tcDogU3BsaXRBcmVhRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG5ld0FyZWE6IElBcmVhID0ge1xuICAgICAgICAgICAgY29tcCwgXG4gICAgICAgICAgICBvcmRlcjogMCwgXG4gICAgICAgICAgICBzaXplOiAwLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmKGNvbXAudmlzaWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5wdXNoKG5ld0FyZWEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWRlZEFyZWFzLnB1c2gobmV3QXJlYSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb21wLnNldFN0eWxlVmlzaWJsZUFuZERpcihjb21wLnZpc2libGUsIHRoaXMuaXNEcmFnZ2luZywgdGhpcy5kaXJlY3Rpb24pO1xuXG4gICAgICAgIHRoaXMuYnVpbGQodHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZUFyZWEoY29tcDogU3BsaXRBcmVhRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIGlmKHRoaXMuZGlzcGxheWVkQXJlYXMuc29tZShhID0+IGEuY29tcCA9PT0gY29tcCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyZWEgPSA8SUFyZWE+IHRoaXMuZGlzcGxheWVkQXJlYXMuZmluZChhID0+IGEuY29tcCA9PT0gY29tcClcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuc3BsaWNlKHRoaXMuZGlzcGxheWVkQXJlYXMuaW5kZXhPZihhcmVhKSwgMSk7XG5cbiAgICAgICAgICAgIHRoaXMuYnVpbGQodHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLmhpZGVkQXJlYXMuc29tZShhID0+IGEuY29tcCA9PT0gY29tcCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyZWEgPSA8SUFyZWE+IHRoaXMuaGlkZWRBcmVhcy5maW5kKGEgPT4gYS5jb21wID09PSBjb21wKVxuICAgICAgICAgICAgdGhpcy5oaWRlZEFyZWFzLnNwbGljZSh0aGlzLmhpZGVkQXJlYXMuaW5kZXhPZihhcmVhKSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQXJlYShjb21wOiBTcGxpdEFyZWFEaXJlY3RpdmUsIHJlc2V0T3JkZXJzOiBib29sZWFuLCByZXNldFNpemVzOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIC8vIE9ubHkgcmVmcmVzaCBpZiBhcmVhIGlzIGRpc3BsYXllZCAoTm8gbmVlZCB0byBjaGVjayBpbnNpZGUgJ2hpZGVkQXJlYXMnKVxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5maW5kKGEgPT4gYS5jb21wID09PSBjb21wKTtcblxuICAgICAgICBpZihpdGVtKSB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkKHJlc2V0T3JkZXJzLCByZXNldFNpemVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93QXJlYShjb21wOiBTcGxpdEFyZWFEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYXJlYSA9IHRoaXMuaGlkZWRBcmVhcy5maW5kKGEgPT4gYS5jb21wID09PSBjb21wKTtcblxuICAgICAgICBpZihhcmVhKSB7XG4gICAgICAgICAgICBjb21wLnNldFN0eWxlVmlzaWJsZUFuZERpcihjb21wLnZpc2libGUsIHRoaXMuaXNEcmFnZ2luZywgdGhpcy5kaXJlY3Rpb24pO1xuXG4gICAgICAgICAgICBjb25zdCBhcmVhcyA9IHRoaXMuaGlkZWRBcmVhcy5zcGxpY2UodGhpcy5oaWRlZEFyZWFzLmluZGV4T2YoYXJlYSksIDEpO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5wdXNoKC4uLmFyZWFzKTtcblxuICAgICAgICAgICAgdGhpcy5idWlsZCh0cnVlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBoaWRlQXJlYShjb21wOiBTcGxpdEFyZWFEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgYXJlYSA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmluZChhID0+IGEuY29tcCA9PT0gY29tcCk7XG5cbiAgICAgICAgaWYoYXJlYSkge1xuICAgICAgICAgICAgY29tcC5zZXRTdHlsZVZpc2libGVBbmREaXIoY29tcC52aXNpYmxlLCB0aGlzLmlzRHJhZ2dpbmcsIHRoaXMuZGlyZWN0aW9uKTtcblxuICAgICAgICAgICAgY29uc3QgYXJlYXMgPSB0aGlzLmRpc3BsYXllZEFyZWFzLnNwbGljZSh0aGlzLmRpc3BsYXllZEFyZWFzLmluZGV4T2YoYXJlYSksIDEpO1xuICAgICAgICAgICAgYXJlYXMuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgICAgICAgICAgICBhcmVhLm9yZGVyID0gMDtcbiAgICAgICAgICAgICAgICBhcmVhLnNpemUgPSAwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuaGlkZWRBcmVhcy5wdXNoKC4uLmFyZWFzKTtcblxuICAgICAgICAgICAgdGhpcy5idWlsZCh0cnVlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGQocmVzZXRPcmRlcnM6IGJvb2xlYW4sIHJlc2V0U2l6ZXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcblxuICAgICAgICAvLyDCpCBBUkVBUyBPUkRFUlxuICAgICAgICBcbiAgICAgICAgaWYocmVzZXRPcmRlcnMgPT09IHRydWUpIHsgICAgXG5cbiAgICAgICAgICAgIC8vIElmIHVzZXIgcHJvdmlkZWQgJ29yZGVyJyBmb3IgZWFjaCBhcmVhLCB1c2UgaXQgdG8gc29ydCB0aGVtLlxuICAgICAgICAgICAgaWYodGhpcy5kaXNwbGF5ZWRBcmVhcy5ldmVyeShhID0+IGEuY29tcC5vcmRlciAhPT0gbnVsbCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLnNvcnQoKGEsIGIpID0+ICg8bnVtYmVyPiBhLmNvbXAub3JkZXIpIC0gKDxudW1iZXI+IGIuY29tcC5vcmRlcikpO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgLy8gVGhlbiBzZXQgcmVhbCBvcmRlciB3aXRoIG11bHRpcGxlcyBvZiAyLCBudW1iZXJzIGJldHdlZW4gd2lsbCBiZSB1c2VkIGJ5IGd1dHRlcnMuXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goKGFyZWEsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBhcmVhLm9yZGVyID0gaSAqIDI7XG4gICAgICAgICAgICAgICAgYXJlYS5jb21wLnNldFN0eWxlT3JkZXIoYXJlYS5vcmRlcik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gwqQgQVJFQVMgU0laRSBQRVJDRU5UXG4gICAgICAgIFxuICAgICAgICBpZihyZXNldFNpemVzID09PSB0cnVlKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHRvdGFsVXNlclNpemUgPSA8bnVtYmVyPiB0aGlzLmRpc3BsYXllZEFyZWFzLnJlZHVjZSgodG90YWw6IG51bWJlciwgczogSUFyZWEpID0+IHMuY29tcC5zaXplID8gdG90YWwgKyBzLmNvbXAuc2l6ZSA6IHRvdGFsLCAwKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSWYgdXNlciBwcm92aWRlZCAnc2l6ZScgZm9yIGVhY2ggYXJlYSBhbmQgdG90YWwgPT0gMSwgdXNlIGl0LlxuICAgICAgICAgICAgaWYodGhpcy5kaXNwbGF5ZWRBcmVhcy5ldmVyeShhID0+IGEuY29tcC5zaXplICE9PSBudWxsKSAmJiB0b3RhbFVzZXJTaXplID4gLjk5OSAmJiB0b3RhbFVzZXJTaXplIDwgMS4wMDEgKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFyZWEuc2l6ZSA9IDxudW1iZXI+IGFyZWEuY29tcC5zaXplO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRWxzZSBzZXQgZXF1YWwgc2l6ZXMgZm9yIGFsbCBhcmVhcy5cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpemUgPSAxIC8gdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhcmVhLnNpemUgPSBzaXplO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyDCpCBcbiAgICAgICAgLy8gSWYgc29tZSByZWFsIGFyZWEgc2l6ZXMgYXJlIGxlc3MgdGhhbiBndXR0ZXJTaXplLCBcbiAgICAgICAgLy8gc2V0IHRoZW0gdG8gemVybyBhbmQgZGlzcGF0Y2ggc2l6ZSB0byBvdGhlcnMuXG5cbiAgICAgICAgbGV0IHBlcmNlbnRUb0Rpc3BhdGNoID0gMDtcbiAgICAgICAgXG4gICAgICAgIC8vIEdldCBjb250YWluZXIgcGl4ZWwgc2l6ZVxuICAgICAgICBsZXQgY29udGFpbmVyU2l6ZVBpeGVsID0gdGhpcy5nZXROYkd1dHRlcnMoKSAqIHRoaXMuZ3V0dGVyU2l6ZTtcbiAgICAgICAgaWYodGhpcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgY29udGFpbmVyU2l6ZVBpeGVsID0gdGhpcy53aWR0aCA/IHRoaXMud2lkdGggOiB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnRbJ29mZnNldFdpZHRoJ107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb250YWluZXJTaXplUGl4ZWwgPSB0aGlzLmhlaWdodCA/IHRoaXMuaGVpZ2h0IDogdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50WydvZmZzZXRIZWlnaHQnXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgICAgICAgIGlmKGFyZWEuc2l6ZSAqIGNvbnRhaW5lclNpemVQaXhlbCA8IHRoaXMuZ3V0dGVyU2l6ZSkge1xuICAgICAgICAgICAgICAgIHBlcmNlbnRUb0Rpc3BhdGNoICs9IGFyZWEuc2l6ZTtcbiAgICAgICAgICAgICAgICBhcmVhLnNpemUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGlmKHBlcmNlbnRUb0Rpc3BhdGNoID4gMCAmJiB0aGlzLmRpc3BsYXllZEFyZWFzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IG5iQXJlYXNOb3RaZXJvID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5maWx0ZXIoYSA9PiBhLnNpemUgIT09IDApLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYobmJBcmVhc05vdFplcm8gPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudFRvQWRkID0gcGVyY2VudFRvRGlzcGF0Y2ggLyBuYkFyZWFzTm90WmVybztcbiAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbHRlcihhID0+IGEuc2l6ZSAhPT0gMCkuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXJlYS5zaXplICs9IHBlcmNlbnRUb0FkZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFsbCBhcmVhIHNpemVzIChjb250YWluZXIgcGVyY2VudGFnZSkgYXJlIGxlc3MgdGhhbiBndXRlclNpemUsXG4gICAgICAgICAgICAvLyBJdCBtZWFucyBjb250YWluZXJTaXplIDwgbmdHdXR0ZXJzICogZ3V0dGVyU2l6ZVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhc1t0aGlzLmRpc3BsYXllZEFyZWFzLmxlbmd0aCAtIDFdLnNpemUgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZVNpemVzKCk7XG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoU3R5bGVTaXplcygpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc3VtR3V0dGVyU2l6ZSA9IHRoaXMuZ2V0TmJHdXR0ZXJzKCkgKiB0aGlzLmd1dHRlclNpemU7XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgICAgICAgYXJlYS5jb21wLnNldFN0eWxlRmxleGJhc2lzKGBjYWxjKCAkeyBhcmVhLnNpemUgKiAxMDAgfSUgLSAkeyBhcmVhLnNpemUgKiBzdW1HdXR0ZXJTaXplIH1weCApYCwgdGhpcy5pc0RyYWdnaW5nKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXJ0RHJhZ2dpbmcoc3RhcnRFdmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQsIGd1dHRlck9yZGVyOiBudW1iZXIsIGd1dHRlck51bTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHN0YXJ0RXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyBQbGFjZSBjb2RlIGhlcmUgdG8gYWxsb3cgJyhndXR0ZXJDbGljayknIGV2ZW50IGV2ZW4gaWYgJ1tkaXNhYmxlZF09XCJ0cnVlXCInLlxuICAgICAgICB0aGlzLmN1cnJlbnRHdXR0ZXJOdW0gPSBndXR0ZXJOdW07XG4gICAgICAgIHRoaXMuZHJhZ2dpbmdXaXRob3V0TW92ZSA9IHRydWU7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKCB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnbW91c2V1cCcsIChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLnN0b3BEcmFnZ2luZygpKSApO1xuICAgICAgICAgICAgdGhpcy5kcmFnTGlzdGVuZXJzLnB1c2goIHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICd0b3VjaGVuZCcsIChlOiBUb3VjaEV2ZW50KSA9PiB0aGlzLnN0b3BEcmFnZ2luZygpKSApO1xuICAgICAgICAgICAgdGhpcy5kcmFnTGlzdGVuZXJzLnB1c2goIHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICd0b3VjaGNhbmNlbCcsIChlOiBUb3VjaEV2ZW50KSA9PiB0aGlzLnN0b3BEcmFnZ2luZygpKSApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZih0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhcmVhQSA9IHRoaXMuZGlzcGxheWVkQXJlYXMuZmluZChhID0+IGEub3JkZXIgPT09IGd1dHRlck9yZGVyIC0gMSk7XG4gICAgICAgIGNvbnN0IGFyZWFCID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5maW5kKGEgPT4gYS5vcmRlciA9PT0gZ3V0dGVyT3JkZXIgKyAxKTtcbiAgICAgICAgXG4gICAgICAgIGlmKCFhcmVhQSB8fCAhYXJlYUIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb3AgPSAodGhpcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykgPyAnb2Zmc2V0V2lkdGgnIDogJ29mZnNldEhlaWdodCc7XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbENvbnRhaW5lciA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudFtwcm9wXTtcbiAgICAgICAgdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQSA9IGFyZWFBLmNvbXAuZ2V0U2l6ZVBpeGVsKHByb3ApO1xuICAgICAgICB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGl4ZWxCID0gYXJlYUIuY29tcC5nZXRTaXplUGl4ZWwocHJvcCk7XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSA9IGFyZWFBLnNpemU7XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QiA9IGFyZWFCLnNpemU7XG5cbiAgICAgICAgY29uc3Qgc3RhcnQ6IElQb2ludCA9IHRoaXMuZ2V0UG9pbnRGcm9tRXZlbnQoc3RhcnRFdmVudCk7XG4gICAgICAgIGlmKCFzdGFydCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmFnTGlzdGVuZXJzLnB1c2goIHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdtb3VzZW1vdmUnLCAoZTogTW91c2VFdmVudCkgPT4gdGhpcy5kcmFnRXZlbnQoZSwgc3RhcnQsIGFyZWFBLCBhcmVhQikpICk7XG4gICAgICAgICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCggdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNobW92ZScsIChlOiBUb3VjaEV2ZW50KSA9PiB0aGlzLmRyYWdFdmVudChlLCBzdGFydCwgYXJlYUEsIGFyZWFCKSkgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXJlYUEuY29tcC5sb2NrRXZlbnRzKCk7XG4gICAgICAgIGFyZWFCLmNvbXAubG9ja0V2ZW50cygpO1xuXG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5ub3RpZnkoJ3N0YXJ0Jyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmFnRXZlbnQoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50LCBzdGFydDogSVBvaW50LCBhcmVhQTogSUFyZWEsIGFyZWFCOiBJQXJlYSk6IHZvaWQge1xuICAgICAgICBpZighdGhpcy5pc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZW5kOiBJUG9pbnQgPSB0aGlzLmdldFBvaW50RnJvbUV2ZW50KGV2ZW50KTtcbiAgICAgICAgaWYoIWVuZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmRyYWdnaW5nV2l0aG91dE1vdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kcmFnKHN0YXJ0LCBlbmQsIGFyZWFBLCBhcmVhQik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQb2ludEZyb21FdmVudChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiBJUG9pbnQge1xuICAgICAgICAvLyBUb3VjaEV2ZW50XG4gICAgICAgIGlmKGV2ZW50IGluc3RhbmNlb2YgVG91Y2hFdmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4OiBldmVudC50b3VjaGVzWzBdLnBhZ2VYLFxuICAgICAgICAgICAgICAgIHk6IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIE1vdXNlRXZlbnRcbiAgICAgICAgZWxzZSBpZihldmVudC5wYWdlWCAhPT0gdW5kZWZpbmVkICYmIGV2ZW50LnBhZ2VZICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogZXZlbnQucGFnZVgsXG4gICAgICAgICAgICAgICAgeTogZXZlbnQucGFnZVksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhZyhzdGFydDogSVBvaW50LCBlbmQ6IElQb2ludCwgYXJlYUE6IElBcmVhLCBhcmVhQjogSUFyZWEpOiB2b2lkIHtcblxuICAgICAgICAvLyDCpCBBUkVBUyBTSVpFIFBJWEVMXG5cbiAgICAgICAgY29uc3QgZGV2aWNlUGl4ZWxSYXRpbyA9IC8qd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwqLyAxO1xuICAgICAgICBsZXQgb2Zmc2V0UGl4ZWwgPSAodGhpcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykgPyAoc3RhcnQueCAtIGVuZC54KSA6IChzdGFydC55IC0gZW5kLnkpO1xuICAgICAgICBvZmZzZXRQaXhlbCA9IG9mZnNldFBpeGVsIC8gZGV2aWNlUGl4ZWxSYXRpbztcblxuICAgICAgICBpZih0aGlzLmRpciA9PT0gJ3J0bCcpIHtcbiAgICAgICAgICAgIG9mZnNldFBpeGVsID0gLW9mZnNldFBpeGVsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5ld1NpemVQaXhlbEEgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGl4ZWxBIC0gb2Zmc2V0UGl4ZWw7XG4gICAgICAgIGxldCBuZXdTaXplUGl4ZWxCID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQiArIG9mZnNldFBpeGVsO1xuXG4gICAgICAgIGlmKG5ld1NpemVQaXhlbEEgPCB0aGlzLmd1dHRlclNpemUgfHwgbmV3U2l6ZVBpeGVsQiA8IHRoaXMuZ3V0dGVyU2l6ZSkge1xuICAgICAgICAgICAgLy8gV1RGLi4gZ2V0IG91dCBvZiBoZXJlIVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYobmV3U2l6ZVBpeGVsQSA8IHRoaXMuZ3V0dGVyU2l6ZSkge1xuICAgICAgICAgICAgbmV3U2l6ZVBpeGVsQiArPSBuZXdTaXplUGl4ZWxBO1xuICAgICAgICAgICAgbmV3U2l6ZVBpeGVsQSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihuZXdTaXplUGl4ZWxCIDwgdGhpcy5ndXR0ZXJTaXplKSB7XG4gICAgICAgICAgICBuZXdTaXplUGl4ZWxBICs9IG5ld1NpemVQaXhlbEI7XG4gICAgICAgICAgICBuZXdTaXplUGl4ZWxCID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIMKkIEFSRUFTIFNJWkUgUEVSQ0VOVFxuXG4gICAgICAgIGlmKG5ld1NpemVQaXhlbEEgPT09IDApIHtcbiAgICAgICAgICAgIGFyZWFCLnNpemUgKz0gYXJlYUEuc2l6ZTtcbiAgICAgICAgICAgIGFyZWFBLnNpemUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYobmV3U2l6ZVBpeGVsQiA9PT0gMCkge1xuICAgICAgICAgICAgYXJlYUEuc2l6ZSArPSBhcmVhQi5zaXplO1xuICAgICAgICAgICAgYXJlYUIuc2l6ZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBORVdfUEVSQ0VOVCA9IFNUQVJUX1BFUkNFTlQgLyBTVEFSVF9QSVhFTCAqIE5FV19QSVhFTDtcbiAgICAgICAgICAgIGlmKHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGFyZWFCLnNpemUgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIgLyB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGl4ZWxCICogbmV3U2l6ZVBpeGVsQjtcbiAgICAgICAgICAgICAgICBhcmVhQS5zaXplID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRCIC0gYXJlYUIuc2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRCID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYXJlYUEuc2l6ZSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSAvIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEEgKiBuZXdTaXplUGl4ZWxBO1xuICAgICAgICAgICAgICAgIGFyZWFCLnNpemUgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEEgLSBhcmVhQS5zaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXJlYUEuc2l6ZSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSAvIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEEgKiBuZXdTaXplUGl4ZWxBO1xuICAgICAgICAgICAgICAgIGFyZWFCLnNpemUgPSAodGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRBICsgdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRCKSAtIGFyZWFBLnNpemU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZVNpemVzKCk7XG4gICAgICAgIHRoaXMubm90aWZ5KCdwcm9ncmVzcycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RvcERyYWdnaW5nKCk6IHZvaWQge1xuICAgICAgICBpZih0aGlzLmlzRHJhZ2dpbmcgPT09IGZhbHNlICYmIHRoaXMuZHJhZ2dpbmdXaXRob3V0TW92ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgICAgICAgIGFyZWEuY29tcC51bmxvY2tFdmVudHMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2hpbGUodGhpcy5kcmFnTGlzdGVuZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGZjdCA9IHRoaXMuZHJhZ0xpc3RlbmVycy5wb3AoKTtcbiAgICAgICAgICAgIGlmKGZjdCkge1xuICAgICAgICAgICAgICAgIGZjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLmRyYWdnaW5nV2l0aG91dE1vdmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KCdjbGljaycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnkoJ2VuZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmdXaXRob3V0TW92ZSA9IGZhbHNlO1xuICAgIH1cblxuXG4gICAgcHVibGljIG5vdGlmeSh0eXBlOiAnc3RhcnQnIHwgJ3Byb2dyZXNzJyB8ICdlbmQnIHwgJ2NsaWNrJyB8ICd0cmFuc2l0aW9uRW5kJyk6IHZvaWQge1xuICAgICAgICBjb25zdCBhcmVhc1NpemU6IEFycmF5PG51bWJlcj4gPSB0aGlzLmRpc3BsYXllZEFyZWFzLm1hcChhID0+IGEuc2l6ZSAqIDEwMCk7XG5cbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kcmFnU3RhcnQuZW1pdCh7Z3V0dGVyTnVtOiB0aGlzLmN1cnJlbnRHdXR0ZXJOdW0sIHNpemVzOiBhcmVhc1NpemV9KTtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2dyZXNzJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHJhZ1Byb2dyZXNzLmVtaXQoe2d1dHRlck51bTogdGhpcy5jdXJyZW50R3V0dGVyTnVtLCBzaXplczogYXJlYXNTaXplfSk7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbmQnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kcmFnRW5kLmVtaXQoe2d1dHRlck51bTogdGhpcy5jdXJyZW50R3V0dGVyTnVtLCBzaXplczogYXJlYXNTaXplfSk7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjbGljayc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmd1dHRlckNsaWNrLmVtaXQoe2d1dHRlck51bTogdGhpcy5jdXJyZW50R3V0dGVyTnVtLCBzaXplczogYXJlYXNTaXplfSk7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd0cmFuc2l0aW9uRW5kJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNpdGlvbkVuZEludGVybmFsLm5leHQoYXJlYXNTaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgIH1cbn1cbiJdfQ==