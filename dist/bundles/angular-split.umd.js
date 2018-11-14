(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-split', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (factory((global['angular-split'] = {}),global.ng.core,global.rxjs,global.rxjs.operators,global.ng.common));
}(this, (function (exports,core,rxjs,operators,common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

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
            this.dragStart = new core.EventEmitter(false);
            this.dragProgress = new core.EventEmitter(false);
            this.dragEnd = new core.EventEmitter(false);
            this.gutterClick = new core.EventEmitter(false);
            this.transitionEndInternal = new rxjs.Subject();
            this.transitionEnd = (( /** @type {?} */(this.transitionEndInternal.asObservable()))).pipe(operators.debounceTime(20));
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
             */ function () {
                return this._direction;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this._useTransition;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
                v = (typeof (v) === 'boolean') ? v : (v === 'false' ? false : true);
                this._useTransition = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SplitComponent.prototype, "disabled", {
            get: /**
             * @return {?}
             */ function () {
                return this._disabled;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this._useBackground;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this._width;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this._height;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this._gutterSize;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this._gutterColor;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this._gutterImageH;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this._gutterImageV;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this._dir;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
                v = (v === 'rtl') ? 'rtl' : 'ltr';
                this._dir = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SplitComponent.prototype, "cssFlexdirection", {
            get: /**
             * @return {?}
             */ function () {
                return (this.direction === 'horizontal') ? 'row' : 'column';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SplitComponent.prototype, "cssWidth", {
            get: /**
             * @return {?}
             */ function () {
                return this.width ? this.width + "px" : '100%';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SplitComponent.prototype, "cssHeight", {
            get: /**
             * @return {?}
             */ function () {
                return this.height ? this.height + "px" : '100%';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SplitComponent.prototype, "cssMinwidth", {
            get: /**
             * @return {?}
             */ function () {
                return (this.direction === 'horizontal') ? this.getNbGutters() * this.gutterSize + "px" : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SplitComponent.prototype, "cssMinheight", {
            get: /**
             * @return {?}
             */ function () {
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
                    var area = ( /** @type {?} */(this.displayedAreas.find(function (a) { return a.comp === comp; })));
                    this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
                    this.build(true, true);
                }
                else if (this.hidedAreas.some(function (a) { return a.comp === comp; })) {
                    /** @type {?} */
                    var area = ( /** @type {?} */(this.hidedAreas.find(function (a) { return a.comp === comp; })));
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
                        this.displayedAreas.sort(function (a, b) { return (( /** @type {?} */(a.comp.order))) - (( /** @type {?} */(b.comp.order))); });
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
                    var totalUserSize = ( /** @type {?} */(this.displayedAreas.reduce(function (total, s) { return s.comp.size ? total + s.comp.size : total; }, 0)));
                    // If user provided 'size' for each area and total == 1, use it.
                    if (this.displayedAreas.every(function (a) { return a.comp.size !== null; }) && totalUserSize > .999 && totalUserSize < 1.001) {
                        this.displayedAreas.forEach(function (area) {
                            area.size = ( /** @type {?} */(area.comp.size));
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
            { type: core.Component, args: [{
                        selector: 'as-split',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        template: "\n        <ng-content></ng-content>\n        <ng-template ngFor let-area [ngForOf]=\"displayedAreas\" let-index=\"index\" let-last=\"last\">\n            <as-split-gutter *ngIf=\"last === false\" \n                          [order]=\"index*2+1\"\n                          [direction]=\"direction\"\n                          [useTransition]=\"useTransition\"\n                          [size]=\"gutterSize\"\n                          [color]=\"gutterColor\"\n                          [useBackground]=\"useBackground\"\n                          [imageH]=\"gutterImageH\"\n                          [imageV]=\"gutterImageV\"\n                          [disabled]=\"disabled\"\n                          (mousedown)=\"startDragging($event, index*2+1, index+1)\"\n                          (touchstart)=\"startDragging($event, index*2+1, index+1)\"></as-split-gutter>\n        </ng-template>",
                        styles: [":host{display:flex;flex-wrap:nowrap;justify-content:flex-start;align-items:stretch;overflow:hidden;width:100%;height:100%}as-split-gutter{flex-grow:0;flex-shrink:0;background-position:center center;background-repeat:no-repeat}"]
                    }] }
        ];
        /** @nocollapse */
        SplitComponent.ctorParameters = function () {
            return [
                { type: core.NgZone },
                { type: core.ElementRef },
                { type: core.ChangeDetectorRef },
                { type: core.Renderer2 }
            ];
        };
        SplitComponent.propDecorators = {
            direction: [{ type: core.Input }],
            useTransition: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            useBackground: [{ type: core.Input }],
            width: [{ type: core.Input }],
            height: [{ type: core.Input }],
            gutterSize: [{ type: core.Input }],
            gutterColor: [{ type: core.Input }],
            gutterImageH: [{ type: core.Input }],
            gutterImageV: [{ type: core.Input }],
            dir: [{ type: core.Input }],
            dragStart: [{ type: core.Output }],
            dragProgress: [{ type: core.Output }],
            dragEnd: [{ type: core.Output }],
            gutterClick: [{ type: core.Output }],
            transitionEnd: [{ type: core.Output }],
            cssFlexdirection: [{ type: core.HostBinding, args: ['style.flex-direction',] }],
            cssWidth: [{ type: core.HostBinding, args: ['style.width',] }],
            cssHeight: [{ type: core.HostBinding, args: ['style.height',] }],
            cssMinwidth: [{ type: core.HostBinding, args: ['style.min-width',] }],
            cssMinheight: [{ type: core.HostBinding, args: ['style.min-height',] }]
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
             */ function () {
                return this._order;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this._size;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this._minSize;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this._visible;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
            { type: core.Directive, args: [{
                        selector: 'as-split-area'
                    },] }
        ];
        /** @nocollapse */
        SplitAreaDirective.ctorParameters = function () {
            return [
                { type: core.NgZone },
                { type: core.ElementRef },
                { type: core.Renderer2 },
                { type: SplitComponent }
            ];
        };
        SplitAreaDirective.propDecorators = {
            order: [{ type: core.Input }],
            size: [{ type: core.Input }],
            minSize: [{ type: core.Input }],
            visible: [{ type: core.Input }]
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
             */ function (v) {
                this.renderer.setStyle(this.elRef.nativeElement, 'order', v);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SplitGutterDirective.prototype, "direction", {
            get: /**
             * @return {?}
             */ function () {
                return this._direction;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function () {
                return this._size;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
                this._size = v;
                this.refreshStyle();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SplitGutterDirective.prototype, "color", {
            get: /**
             * @return {?}
             */ function () {
                return this._color;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
             */ function (v) {
                this._useBackground = v;
                this.refreshStyle();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SplitGutterDirective.prototype, "imageH", {
            get: /**
             * @return {?}
             */ function () {
                return this._imageH;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
                this._imageH = v;
                this.refreshStyle();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SplitGutterDirective.prototype, "imageV", {
            get: /**
             * @return {?}
             */ function () {
                return this._imageV;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
                this._imageV = v;
                this.refreshStyle();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SplitGutterDirective.prototype, "disabled", {
            get: /**
             * @return {?}
             */ function () {
                return this._disabled;
            },
            set: /**
             * @param {?} v
             * @return {?}
             */ function (v) {
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
            { type: core.Directive, args: [{
                        selector: 'as-split-gutter'
                    },] }
        ];
        /** @nocollapse */
        SplitGutterDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 }
            ];
        };
        SplitGutterDirective.propDecorators = {
            order: [{ type: core.Input }],
            direction: [{ type: core.Input }],
            useTransition: [{ type: core.Input }],
            size: [{ type: core.Input }],
            color: [{ type: core.Input }],
            useBackground: [{ type: core.Input }],
            imageH: [{ type: core.Input }],
            imageV: [{ type: core.Input }],
            disabled: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
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

    exports.AngularSplitModule = AngularSplitModule;
    exports.SplitComponent = SplitComponent;
    exports.SplitAreaDirective = SplitAreaDirective;
    exports.ɵa = SplitGutterDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zcGxpdC51bWQuanMubWFwIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwibmc6Ly9hbmd1bGFyLXNwbGl0L2xpYi9jb21wb25lbnQvc3BsaXQuY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLXNwbGl0L2xpYi9kaXJlY3RpdmUvc3BsaXRBcmVhLmRpcmVjdGl2ZS50cyIsIm5nOi8vYW5ndWxhci1zcGxpdC9saWIvZGlyZWN0aXZlL3NwbGl0R3V0dGVyLmRpcmVjdGl2ZS50cyIsIm5nOi8vYW5ndWxhci1zcGxpdC9saWIvbW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3RvclJlZiwgSW5wdXQsIE91dHB1dCwgSG9zdEJpbmRpbmcsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBcbiAgICBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyMiwgT25EZXN0cm95LCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgSUFyZWEgfSBmcm9tICcuLi9pbnRlcmZhY2UvSUFyZWEnO1xuaW1wb3J0IHsgSVBvaW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlL0lQb2ludCc7XG5pbXBvcnQgeyBTcGxpdEFyZWFEaXJlY3RpdmUgfSBmcm9tICcuLi9kaXJlY3RpdmUvc3BsaXRBcmVhLmRpcmVjdGl2ZSc7XG5cbi8qKlxuICogYW5ndWxhci1zcGxpdFxuICogXG4gKiBBcmVhcyBzaXplIGFyZSBzZXQgaW4gcGVyY2VudGFnZSBvZiB0aGUgc3BsaXQgY29udGFpbmVyLlxuICogR3V0dGVycyBzaXplIGFyZSBzZXQgaW4gcGl4ZWxzLlxuICogXG4gKiBTbyB3ZSBzZXQgY3NzICdmbGV4LWJhc2lzJyBwcm9wZXJ0eSBsaWtlIHRoaXMgKHdoZXJlIDAgPD0gYXJlYS5zaXplIDw9IDEpOiBcbiAqICBjYWxjKCB7IGFyZWEuc2l6ZSAqIDEwMCB9JSAtIHsgYXJlYS5zaXplICogbmJHdXR0ZXIgKiBndXR0ZXJTaXplIH1weCApO1xuICogXG4gKiBFeGFtcGxlcyB3aXRoIDMgdmlzaWJsZSBhcmVhcyBhbmQgMiBndXR0ZXJzOiBcbiAqIFxuICogfCAgICAgICAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tW10tLS0tLS0tLS0tLS0tLS0tLS0tLS1bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgIGNhbGMoMjAlIC0gNHB4KSAgICAgICAgICBjYWxjKDIwJSAtIDRweCkgICAgICAgICAgICAgIGNhbGMoNjAlIC0gMTJweCkgICAgICAgICAgfFxuICogXG4gKiBcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgIDEwcHggICAgICAgICAgICAgICAgICAgICAgICAxMHB4ICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tW10tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVtdLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8ICBjYWxjKDMzLjMzJSAtIDYuNjY3cHgpICAgICAgY2FsYygzMy4zMyUgLSA2LjY2N3B4KSAgICAgIGNhbGMoMzMuMzMlIC0gNi42NjdweCkgIHxcbiAqIFxuICogXG4gKiB8MTBweCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTBweCAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHxbXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfDAgICAgICAgICAgICAgICAgIGNhbGMoNjYuNjYlIC0gMTMuMzMzcHgpICAgICAgICAgICAgICAgICAgY2FsYygzMyUlIC0gNi42NjdweCkgICB8XG4gKiBcbiAqIFxuICogIDEwcHggMTBweCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8W11bXS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwwIDAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsYygxMDAlIC0gMjBweCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogXG4gKi9cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcy1zcGxpdCcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgc3R5bGVVcmxzOiBbYC4vc3BsaXQuY29tcG9uZW50LnNjc3NgXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtYXJlYSBbbmdGb3JPZl09XCJkaXNwbGF5ZWRBcmVhc1wiIGxldC1pbmRleD1cImluZGV4XCIgbGV0LWxhc3Q9XCJsYXN0XCI+XG4gICAgICAgICAgICA8YXMtc3BsaXQtZ3V0dGVyICpuZ0lmPVwibGFzdCA9PT0gZmFsc2VcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW29yZGVyXT1cImluZGV4KjIrMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXJlY3Rpb25dPVwiZGlyZWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW3VzZVRyYW5zaXRpb25dPVwidXNlVHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtzaXplXT1cImd1dHRlclNpemVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbY29sb3JdPVwiZ3V0dGVyQ29sb3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbdXNlQmFja2dyb3VuZF09XCJ1c2VCYWNrZ3JvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2ltYWdlSF09XCJndXR0ZXJJbWFnZUhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbaW1hZ2VWXT1cImd1dHRlckltYWdlVlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwic3RhcnREcmFnZ2luZygkZXZlbnQsIGluZGV4KjIrMSwgaW5kZXgrMSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAodG91Y2hzdGFydCk9XCJzdGFydERyYWdnaW5nKCRldmVudCwgaW5kZXgqMisxLCBpbmRleCsxKVwiPjwvYXMtc3BsaXQtZ3V0dGVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPmAsXG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIHByaXZhdGUgX2RpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcblxuICAgIEBJbnB1dCgpIHNldCBkaXJlY3Rpb24odjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJykge1xuICAgICAgICB2ID0gKHYgPT09ICd2ZXJ0aWNhbCcpID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gdjtcbiAgICAgICAgXG4gICAgICAgIFsuLi50aGlzLmRpc3BsYXllZEFyZWFzLCAuLi50aGlzLmhpZGVkQXJlYXNdLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICBhcmVhLmNvbXAuc2V0U3R5bGVWaXNpYmxlQW5kRGlyKGFyZWEuY29tcC52aXNpYmxlLCB0aGlzLmlzRHJhZ2dpbmcsIHRoaXMuZGlyZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJ1aWxkKGZhbHNlLCBmYWxzZSk7XG4gICAgfVxuICAgIFxuICAgIGdldCBkaXJlY3Rpb24oKTogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXJlY3Rpb247XG4gICAgfVxuICAgIFxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX3VzZVRyYW5zaXRpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNldCB1c2VUcmFuc2l0aW9uKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgdiA9ICh0eXBlb2YodikgPT09ICdib29sZWFuJykgPyB2IDogKHYgPT09ICdmYWxzZScgPyBmYWxzZSA6IHRydWUpO1xuICAgICAgICB0aGlzLl91c2VUcmFuc2l0aW9uID0gdjtcbiAgICB9XG4gICAgXG4gICAgZ2V0IHVzZVRyYW5zaXRpb24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VUcmFuc2l0aW9uO1xuICAgIH1cbiAgICBcbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIFxuICAgIEBJbnB1dCgpIHNldCBkaXNhYmxlZCh2OiBib29sZWFuKSB7XG4gICAgICAgIHYgPSAodHlwZW9mKHYpID09PSAnYm9vbGVhbicpID8gdiA6ICh2ID09PSAnZmFsc2UnID8gZmFsc2UgOiB0cnVlKTtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2O1xuXG4gICAgICAgIC8vIEZvcmNlIHJlcGFpbnQgaWYgbW9kaWZpZWQgZnJvbSBUUyBjbGFzcyAoaW5zdGVhZCBvZiB0aGUgdGVtcGxhdGUpXG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIFxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIC8vLy9cblxuXG4gICAgcHJpdmF0ZSBfdXNlQmFja2dyb3VuZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzZXQgdXNlQmFja2dyb3VuZCh2OiBib29sZWFuKSB7XG4gICAgICAgIHYgPSAodHlwZW9mKHYpID09PSAnYm9vbGVhbicpID8gdiA6ICh2ICE9PSAnZmFsc2UnKTtcbiAgICAgICAgdGhpcy5fdXNlQmFja2dyb3VuZCA9IHY7XG5cbiAgICAgICAgLy8gRm9yY2UgcmVwYWludCBpZiBtb2RpZmllZCBmcm9tIFRTIGNsYXNzIChpbnN0ZWFkIG9mIHRoZSB0ZW1wbGF0ZSlcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBnZXQgdXNlQmFja2dyb3VuZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZUJhY2tncm91bmQ7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfd2lkdGg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgQElucHV0KCkgc2V0IHdpZHRoKHY6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdiA9IE51bWJlcih2KTtcbiAgICAgICAgdGhpcy5fd2lkdGggPSAoIWlzTmFOKHYpICYmIHYgPiAwKSA/IHYgOiBudWxsO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5idWlsZChmYWxzZSwgZmFsc2UpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgd2lkdGgoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICB9XG4gICAgXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfaGVpZ2h0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIEBJbnB1dCgpIHNldCBoZWlnaHQodjogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB2ID0gTnVtYmVyKHYpO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSAoIWlzTmFOKHYpICYmIHYgPiAwKSA/IHYgOiBudWxsO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5idWlsZChmYWxzZSwgZmFsc2UpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgaGVpZ2h0KCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICAgIH1cbiAgICBcbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9ndXR0ZXJTaXplOiBudW1iZXIgPSAxMTtcblxuICAgIEBJbnB1dCgpIHNldCBndXR0ZXJTaXplKHY6IG51bWJlcikge1xuICAgICAgICB2ID0gTnVtYmVyKHYpO1xuICAgICAgICB0aGlzLl9ndXR0ZXJTaXplID0gKCFpc05hTih2KSAmJiB2ID4gMCkgPyB2IDogMTE7XG5cbiAgICAgICAgdGhpcy5idWlsZChmYWxzZSwgZmFsc2UpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgZ3V0dGVyU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3V0dGVyU2l6ZTtcbiAgICB9XG4gICAgXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfZ3V0dGVyQ29sb3I6IHN0cmluZyA9ICcnO1xuXG4gICAgQElucHV0KCkgc2V0IGd1dHRlckNvbG9yKHY6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9ndXR0ZXJDb2xvciA9ICh0eXBlb2YgdiA9PT0gJ3N0cmluZycgJiYgdiAhPT0gJycpID8gdiA6ICcnO1xuXG4gICAgICAgIC8vIEZvcmNlIHJlcGFpbnQgaWYgbW9kaWZpZWQgZnJvbSBUUyBjbGFzcyAoaW5zdGVhZCBvZiB0aGUgdGVtcGxhdGUpXG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIFxuICAgIGdldCBndXR0ZXJDb2xvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3V0dGVyQ29sb3I7XG4gICAgfVxuICAgIFxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2d1dHRlckltYWdlSDogc3RyaW5nID0gJyc7XG5cbiAgICBASW5wdXQoKSBzZXQgZ3V0dGVySW1hZ2VIKHY6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9ndXR0ZXJJbWFnZUggPSAodHlwZW9mIHYgPT09ICdzdHJpbmcnICYmIHYgIT09ICcnKSA/IHYgOiAnJztcbiAgICAgICAgXG4gICAgICAgIC8vIEZvcmNlIHJlcGFpbnQgaWYgbW9kaWZpZWQgZnJvbSBUUyBjbGFzcyAoaW5zdGVhZCBvZiB0aGUgdGVtcGxhdGUpXG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIFxuICAgIGdldCBndXR0ZXJJbWFnZUgoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2d1dHRlckltYWdlSDtcbiAgICB9XG4gICAgXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfZ3V0dGVySW1hZ2VWOiBzdHJpbmcgPSAnJztcblxuICAgIEBJbnB1dCgpIHNldCBndXR0ZXJJbWFnZVYodjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2d1dHRlckltYWdlViA9ICh0eXBlb2YgdiA9PT0gJ3N0cmluZycgJiYgdiAhPT0gJycpID8gdiA6ICcnO1xuXG4gICAgICAgIC8vIEZvcmNlIHJlcGFpbnQgaWYgbW9kaWZpZWQgZnJvbSBUUyBjbGFzcyAoaW5zdGVhZCBvZiB0aGUgdGVtcGxhdGUpXG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIFxuICAgIGdldCBndXR0ZXJJbWFnZVYoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2d1dHRlckltYWdlVjtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9kaXI6ICdsdHInIHwgJ3J0bCcgPSAnbHRyJztcbiAgICBcbiAgICBASW5wdXQoKSBzZXQgZGlyKHY6ICdsdHInIHwgJ3J0bCcpIHtcbiAgICAgICAgdiA9ICh2ID09PSAncnRsJykgPyAncnRsJyA6ICdsdHInO1xuICAgICAgICB0aGlzLl9kaXIgPSB2O1xuICAgIH1cbiAgICBcbiAgICBnZXQgZGlyKCk6ICdsdHInIHwgJ3J0bCcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlyO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIEBPdXRwdXQoKSBkcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPHtndXR0ZXJOdW06IG51bWJlciwgc2l6ZXM6IEFycmF5PG51bWJlcj59PihmYWxzZSk7XG4gICAgQE91dHB1dCgpIGRyYWdQcm9ncmVzcyA9IG5ldyBFdmVudEVtaXR0ZXI8e2d1dHRlck51bTogbnVtYmVyLCBzaXplczogQXJyYXk8bnVtYmVyPn0+KGZhbHNlKTtcbiAgICBAT3V0cHV0KCkgZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8e2d1dHRlck51bTogbnVtYmVyLCBzaXplczogQXJyYXk8bnVtYmVyPn0+KGZhbHNlKTtcbiAgICBAT3V0cHV0KCkgZ3V0dGVyQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPHtndXR0ZXJOdW06IG51bWJlciwgc2l6ZXM6IEFycmF5PG51bWJlcj59PihmYWxzZSk7XG5cbiAgICBwcml2YXRlIHRyYW5zaXRpb25FbmRJbnRlcm5hbCA9IG5ldyBTdWJqZWN0PEFycmF5PG51bWJlcj4+KCk7XG4gICAgQE91dHB1dCgpIHRyYW5zaXRpb25FbmQgPSAoPE9ic2VydmFibGU8QXJyYXk8bnVtYmVyPj4+IHRoaXMudHJhbnNpdGlvbkVuZEludGVybmFsLmFzT2JzZXJ2YWJsZSgpKS5waXBlKFxuICAgICAgICBkZWJvdW5jZVRpbWUoMjApXG4gICAgKTtcblxuICAgIEBIb3N0QmluZGluZygnc3R5bGUuZmxleC1kaXJlY3Rpb24nKSBnZXQgY3NzRmxleGRpcmVjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSA/ICdyb3cnIDogJ2NvbHVtbic7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpIGdldCBjc3NXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkdGggPyBgJHsgdGhpcy53aWR0aCB9cHhgIDogJzEwMCUnO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JykgZ2V0IGNzc0hlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0ID8gYCR7IHRoaXMuaGVpZ2h0IH1weGAgOiAnMTAwJSc7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS5taW4td2lkdGgnKSBnZXQgY3NzTWlud2lkdGgoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykgPyBgJHsgdGhpcy5nZXROYkd1dHRlcnMoKSAqIHRoaXMuZ3V0dGVyU2l6ZSB9cHhgIDogbnVsbDtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1pbi1oZWlnaHQnKSBnZXQgY3NzTWluaGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuZGlyZWN0aW9uID09PSAndmVydGljYWwnKSA/IGAkeyB0aGlzLmdldE5iR3V0dGVycygpICogdGhpcy5ndXR0ZXJTaXplIH1weGAgOiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1ZpZXdJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgaXNEcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgZHJhZ2dpbmdXaXRob3V0TW92ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgY3VycmVudEd1dHRlck51bTogbnVtYmVyID0gMDtcblxuICAgIHB1YmxpYyByZWFkb25seSBkaXNwbGF5ZWRBcmVhczogQXJyYXk8SUFyZWE+ID0gW107XG4gICAgcHJpdmF0ZSByZWFkb25seSBoaWRlZEFyZWFzOiBBcnJheTxJQXJlYT4gPSBbXTtcbiAgICBcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRyYWdMaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPiA9IFtdO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZHJhZ1N0YXJ0VmFsdWVzID0ge1xuICAgICAgICBzaXplUGl4ZWxDb250YWluZXI6IDAsXG4gICAgICAgIHNpemVQaXhlbEE6IDAsXG4gICAgICAgIHNpemVQaXhlbEI6IDAsXG4gICAgICAgIHNpemVQZXJjZW50QTogMCxcbiAgICAgICAgc2l6ZVBlcmNlbnRCOiAwLFxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5pc1ZpZXdJbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXROYkd1dHRlcnMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoIC0gMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQXJlYShjb21wOiBTcGxpdEFyZWFEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbmV3QXJlYTogSUFyZWEgPSB7XG4gICAgICAgICAgICBjb21wLCBcbiAgICAgICAgICAgIG9yZGVyOiAwLCBcbiAgICAgICAgICAgIHNpemU6IDAsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYoY29tcC52aXNpYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLnB1c2gobmV3QXJlYSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVkQXJlYXMucHVzaChuZXdBcmVhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXAuc2V0U3R5bGVWaXNpYmxlQW5kRGlyKGNvbXAudmlzaWJsZSwgdGhpcy5pc0RyYWdnaW5nLCB0aGlzLmRpcmVjdGlvbik7XG5cbiAgICAgICAgdGhpcy5idWlsZCh0cnVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlQXJlYShjb21wOiBTcGxpdEFyZWFEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICAgICAgaWYodGhpcy5kaXNwbGF5ZWRBcmVhcy5zb21lKGEgPT4gYS5jb21wID09PSBjb21wKSkge1xuICAgICAgICAgICAgY29uc3QgYXJlYSA9IDxJQXJlYT4gdGhpcy5kaXNwbGF5ZWRBcmVhcy5maW5kKGEgPT4gYS5jb21wID09PSBjb21wKVxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5zcGxpY2UodGhpcy5kaXNwbGF5ZWRBcmVhcy5pbmRleE9mKGFyZWEpLCAxKTtcblxuICAgICAgICAgICAgdGhpcy5idWlsZCh0cnVlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuaGlkZWRBcmVhcy5zb21lKGEgPT4gYS5jb21wID09PSBjb21wKSkge1xuICAgICAgICAgICAgY29uc3QgYXJlYSA9IDxJQXJlYT4gdGhpcy5oaWRlZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXAgPT09IGNvbXApXG4gICAgICAgICAgICB0aGlzLmhpZGVkQXJlYXMuc3BsaWNlKHRoaXMuaGlkZWRBcmVhcy5pbmRleE9mKGFyZWEpLCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVBcmVhKGNvbXA6IFNwbGl0QXJlYURpcmVjdGl2ZSwgcmVzZXRPcmRlcnM6IGJvb2xlYW4sIHJlc2V0U2l6ZXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgLy8gT25seSByZWZyZXNoIGlmIGFyZWEgaXMgZGlzcGxheWVkIChObyBuZWVkIHRvIGNoZWNrIGluc2lkZSAnaGlkZWRBcmVhcycpXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXAgPT09IGNvbXApO1xuXG4gICAgICAgIGlmKGl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuYnVpbGQocmVzZXRPcmRlcnMsIHJlc2V0U2l6ZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dBcmVhKGNvbXA6IFNwbGl0QXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhcmVhID0gdGhpcy5oaWRlZEFyZWFzLmZpbmQoYSA9PiBhLmNvbXAgPT09IGNvbXApO1xuXG4gICAgICAgIGlmKGFyZWEpIHtcbiAgICAgICAgICAgIGNvbXAuc2V0U3R5bGVWaXNpYmxlQW5kRGlyKGNvbXAudmlzaWJsZSwgdGhpcy5pc0RyYWdnaW5nLCB0aGlzLmRpcmVjdGlvbik7XG5cbiAgICAgICAgICAgIGNvbnN0IGFyZWFzID0gdGhpcy5oaWRlZEFyZWFzLnNwbGljZSh0aGlzLmhpZGVkQXJlYXMuaW5kZXhPZihhcmVhKSwgMSk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLnB1c2goLi4uYXJlYXMpO1xuXG4gICAgICAgICAgICB0aGlzLmJ1aWxkKHRydWUsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGhpZGVBcmVhKGNvbXA6IFNwbGl0QXJlYURpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhcmVhID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5maW5kKGEgPT4gYS5jb21wID09PSBjb21wKTtcblxuICAgICAgICBpZihhcmVhKSB7XG4gICAgICAgICAgICBjb21wLnNldFN0eWxlVmlzaWJsZUFuZERpcihjb21wLnZpc2libGUsIHRoaXMuaXNEcmFnZ2luZywgdGhpcy5kaXJlY3Rpb24pO1xuXG4gICAgICAgICAgICBjb25zdCBhcmVhcyA9IHRoaXMuZGlzcGxheWVkQXJlYXMuc3BsaWNlKHRoaXMuZGlzcGxheWVkQXJlYXMuaW5kZXhPZihhcmVhKSwgMSk7XG4gICAgICAgICAgICBhcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgICAgICAgICAgIGFyZWEub3JkZXIgPSAwO1xuICAgICAgICAgICAgICAgIGFyZWEuc2l6ZSA9IDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5oaWRlZEFyZWFzLnB1c2goLi4uYXJlYXMpO1xuXG4gICAgICAgICAgICB0aGlzLmJ1aWxkKHRydWUsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZChyZXNldE9yZGVyczogYm9vbGVhbiwgcmVzZXRTaXplczogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuXG4gICAgICAgIC8vIMOCwqQgQVJFQVMgT1JERVJcbiAgICAgICAgXG4gICAgICAgIGlmKHJlc2V0T3JkZXJzID09PSB0cnVlKSB7ICAgIFxuXG4gICAgICAgICAgICAvLyBJZiB1c2VyIHByb3ZpZGVkICdvcmRlcicgZm9yIGVhY2ggYXJlYSwgdXNlIGl0IHRvIHNvcnQgdGhlbS5cbiAgICAgICAgICAgIGlmKHRoaXMuZGlzcGxheWVkQXJlYXMuZXZlcnkoYSA9PiBhLmNvbXAub3JkZXIgIT09IG51bGwpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5zb3J0KChhLCBiKSA9PiAoPG51bWJlcj4gYS5jb21wLm9yZGVyKSAtICg8bnVtYmVyPiBiLmNvbXAub3JkZXIpKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIC8vIFRoZW4gc2V0IHJlYWwgb3JkZXIgd2l0aCBtdWx0aXBsZXMgb2YgMiwgbnVtYmVycyBiZXR3ZWVuIHdpbGwgYmUgdXNlZCBieSBndXR0ZXJzLlxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKChhcmVhLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgYXJlYS5vcmRlciA9IGkgKiAyO1xuICAgICAgICAgICAgICAgIGFyZWEuY29tcC5zZXRTdHlsZU9yZGVyKGFyZWEub3JkZXIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIMOCwqQgQVJFQVMgU0laRSBQRVJDRU5UXG4gICAgICAgIFxuICAgICAgICBpZihyZXNldFNpemVzID09PSB0cnVlKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHRvdGFsVXNlclNpemUgPSA8bnVtYmVyPiB0aGlzLmRpc3BsYXllZEFyZWFzLnJlZHVjZSgodG90YWw6IG51bWJlciwgczogSUFyZWEpID0+IHMuY29tcC5zaXplID8gdG90YWwgKyBzLmNvbXAuc2l6ZSA6IHRvdGFsLCAwKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSWYgdXNlciBwcm92aWRlZCAnc2l6ZScgZm9yIGVhY2ggYXJlYSBhbmQgdG90YWwgPT0gMSwgdXNlIGl0LlxuICAgICAgICAgICAgaWYodGhpcy5kaXNwbGF5ZWRBcmVhcy5ldmVyeShhID0+IGEuY29tcC5zaXplICE9PSBudWxsKSAmJiB0b3RhbFVzZXJTaXplID4gLjk5OSAmJiB0b3RhbFVzZXJTaXplIDwgMS4wMDEgKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFyZWEuc2l6ZSA9IDxudW1iZXI+IGFyZWEuY29tcC5zaXplO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRWxzZSBzZXQgZXF1YWwgc2l6ZXMgZm9yIGFsbCBhcmVhcy5cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpemUgPSAxIC8gdGhpcy5kaXNwbGF5ZWRBcmVhcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhcmVhLnNpemUgPSBzaXplO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyDDgsKkIFxuICAgICAgICAvLyBJZiBzb21lIHJlYWwgYXJlYSBzaXplcyBhcmUgbGVzcyB0aGFuIGd1dHRlclNpemUsIFxuICAgICAgICAvLyBzZXQgdGhlbSB0byB6ZXJvIGFuZCBkaXNwYXRjaCBzaXplIHRvIG90aGVycy5cblxuICAgICAgICBsZXQgcGVyY2VudFRvRGlzcGF0Y2ggPSAwO1xuICAgICAgICBcbiAgICAgICAgLy8gR2V0IGNvbnRhaW5lciBwaXhlbCBzaXplXG4gICAgICAgIGxldCBjb250YWluZXJTaXplUGl4ZWwgPSB0aGlzLmdldE5iR3V0dGVycygpICogdGhpcy5ndXR0ZXJTaXplO1xuICAgICAgICBpZih0aGlzLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICBjb250YWluZXJTaXplUGl4ZWwgPSB0aGlzLndpZHRoID8gdGhpcy53aWR0aCA6IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudFsnb2Zmc2V0V2lkdGgnXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lclNpemVQaXhlbCA9IHRoaXMuaGVpZ2h0ID8gdGhpcy5oZWlnaHQgOiB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnRbJ29mZnNldEhlaWdodCddO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRBcmVhcy5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgICAgICAgaWYoYXJlYS5zaXplICogY29udGFpbmVyU2l6ZVBpeGVsIDwgdGhpcy5ndXR0ZXJTaXplKSB7XG4gICAgICAgICAgICAgICAgcGVyY2VudFRvRGlzcGF0Y2ggKz0gYXJlYS5zaXplO1xuICAgICAgICAgICAgICAgIGFyZWEuc2l6ZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaWYocGVyY2VudFRvRGlzcGF0Y2ggPiAwICYmIHRoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgbmJBcmVhc05vdFplcm8gPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbHRlcihhID0+IGEuc2l6ZSAhPT0gMCkubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZihuYkFyZWFzTm90WmVybyA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwZXJjZW50VG9BZGQgPSBwZXJjZW50VG9EaXNwYXRjaCAvIG5iQXJlYXNOb3RaZXJvO1xuICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZmlsdGVyKGEgPT4gYS5zaXplICE9PSAwKS5mb3JFYWNoKGFyZWEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhcmVhLnNpemUgKz0gcGVyY2VudFRvQWRkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQWxsIGFyZWEgc2l6ZXMgKGNvbnRhaW5lciBwZXJjZW50YWdlKSBhcmUgbGVzcyB0aGFuIGd1dGVyU2l6ZSxcbiAgICAgICAgICAgIC8vIEl0IG1lYW5zIGNvbnRhaW5lclNpemUgPCBuZ0d1dHRlcnMgKiBndXR0ZXJTaXplXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzW3RoaXMuZGlzcGxheWVkQXJlYXMubGVuZ3RoIC0gMV0uc2l6ZSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMucmVmcmVzaFN0eWxlU2l6ZXMoKTtcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hTdHlsZVNpemVzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzdW1HdXR0ZXJTaXplID0gdGhpcy5nZXROYkd1dHRlcnMoKSAqIHRoaXMuZ3V0dGVyU2l6ZTtcblxuICAgICAgICB0aGlzLmRpc3BsYXllZEFyZWFzLmZvckVhY2goYXJlYSA9PiB7XG4gICAgICAgICAgICBhcmVhLmNvbXAuc2V0U3R5bGVGbGV4YmFzaXMoYGNhbGMoICR7IGFyZWEuc2l6ZSAqIDEwMCB9JSAtICR7IGFyZWEuc2l6ZSAqIHN1bUd1dHRlclNpemUgfXB4IClgLCB0aGlzLmlzRHJhZ2dpbmcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhcnREcmFnZ2luZyhzdGFydEV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCwgZ3V0dGVyT3JkZXI6IG51bWJlciwgZ3V0dGVyTnVtOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgc3RhcnRFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIFBsYWNlIGNvZGUgaGVyZSB0byBhbGxvdyAnKGd1dHRlckNsaWNrKScgZXZlbnQgZXZlbiBpZiAnW2Rpc2FibGVkXT1cInRydWVcIicuXG4gICAgICAgIHRoaXMuY3VycmVudEd1dHRlck51bSA9IGd1dHRlck51bTtcbiAgICAgICAgdGhpcy5kcmFnZ2luZ1dpdGhvdXRNb3ZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kcmFnTGlzdGVuZXJzLnB1c2goIHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdtb3VzZXVwJywgKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMuc3RvcERyYWdnaW5nKCkpICk7XG4gICAgICAgICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCggdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNoZW5kJywgKGU6IFRvdWNoRXZlbnQpID0+IHRoaXMuc3RvcERyYWdnaW5nKCkpICk7XG4gICAgICAgICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCggdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ3RvdWNoY2FuY2VsJywgKGU6IFRvdWNoRXZlbnQpID0+IHRoaXMuc3RvcERyYWdnaW5nKCkpICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFyZWFBID0gdGhpcy5kaXNwbGF5ZWRBcmVhcy5maW5kKGEgPT4gYS5vcmRlciA9PT0gZ3V0dGVyT3JkZXIgLSAxKTtcbiAgICAgICAgY29uc3QgYXJlYUIgPSB0aGlzLmRpc3BsYXllZEFyZWFzLmZpbmQoYSA9PiBhLm9yZGVyID09PSBndXR0ZXJPcmRlciArIDEpO1xuICAgICAgICBcbiAgICAgICAgaWYoIWFyZWFBIHx8ICFhcmVhQikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvcCA9ICh0aGlzLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSA/ICdvZmZzZXRXaWR0aCcgOiAnb2Zmc2V0SGVpZ2h0JztcbiAgICAgICAgdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQ29udGFpbmVyID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50W3Byb3BdO1xuICAgICAgICB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGl4ZWxBID0gYXJlYUEuY29tcC5nZXRTaXplUGl4ZWwocHJvcCk7XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEIgPSBhcmVhQi5jb21wLmdldFNpemVQaXhlbChwcm9wKTtcbiAgICAgICAgdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRBID0gYXJlYUEuc2l6ZTtcbiAgICAgICAgdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRCID0gYXJlYUIuc2l6ZTtcblxuICAgICAgICBjb25zdCBzdGFydDogSVBvaW50ID0gdGhpcy5nZXRQb2ludEZyb21FdmVudChzdGFydEV2ZW50KTtcbiAgICAgICAgaWYoIXN0YXJ0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRyYWdMaXN0ZW5lcnMucHVzaCggdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ21vdXNlbW92ZScsIChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLmRyYWdFdmVudChlLCBzdGFydCwgYXJlYUEsIGFyZWFCKSkgKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5wdXNoKCB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAndG91Y2htb3ZlJywgKGU6IFRvdWNoRXZlbnQpID0+IHRoaXMuZHJhZ0V2ZW50KGUsIHN0YXJ0LCBhcmVhQSwgYXJlYUIpKSApO1xuICAgICAgICB9KTtcblxuICAgICAgICBhcmVhQS5jb21wLmxvY2tFdmVudHMoKTtcbiAgICAgICAgYXJlYUIuY29tcC5sb2NrRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLm5vdGlmeSgnc3RhcnQnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYWdFdmVudChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQsIHN0YXJ0OiBJUG9pbnQsIGFyZWFBOiBJQXJlYSwgYXJlYUI6IElBcmVhKTogdm9pZCB7XG4gICAgICAgIGlmKCF0aGlzLmlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbmQ6IElQb2ludCA9IHRoaXMuZ2V0UG9pbnRGcm9tRXZlbnQoZXZlbnQpO1xuICAgICAgICBpZighZW5kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZHJhZ2dpbmdXaXRob3V0TW92ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRyYWcoc3RhcnQsIGVuZCwgYXJlYUEsIGFyZWFCKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBvaW50RnJvbUV2ZW50KGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IElQb2ludCB7XG4gICAgICAgIC8vIFRvdWNoRXZlbnRcbiAgICAgICAgaWYoZXZlbnQgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHg6IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVgsXG4gICAgICAgICAgICAgICAgeTogZXZlbnQudG91Y2hlc1swXS5wYWdlWSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gTW91c2VFdmVudFxuICAgICAgICBlbHNlIGlmKGV2ZW50LnBhZ2VYICE9PSB1bmRlZmluZWQgJiYgZXZlbnQucGFnZVkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4OiBldmVudC5wYWdlWCxcbiAgICAgICAgICAgICAgICB5OiBldmVudC5wYWdlWSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmFnKHN0YXJ0OiBJUG9pbnQsIGVuZDogSVBvaW50LCBhcmVhQTogSUFyZWEsIGFyZWFCOiBJQXJlYSk6IHZvaWQge1xuXG4gICAgICAgIC8vIMOCwqQgQVJFQVMgU0laRSBQSVhFTFxuXG4gICAgICAgIGNvbnN0IGRldmljZVBpeGVsUmF0aW8gPSAvKndpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8Ki8gMTtcbiAgICAgICAgbGV0IG9mZnNldFBpeGVsID0gKHRoaXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpID8gKHN0YXJ0LnggLSBlbmQueCkgOiAoc3RhcnQueSAtIGVuZC55KTtcbiAgICAgICAgb2Zmc2V0UGl4ZWwgPSBvZmZzZXRQaXhlbCAvIGRldmljZVBpeGVsUmF0aW87XG5cbiAgICAgICAgaWYodGhpcy5kaXIgPT09ICdydGwnKSB7XG4gICAgICAgICAgICBvZmZzZXRQaXhlbCA9IC1vZmZzZXRQaXhlbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuZXdTaXplUGl4ZWxBID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBpeGVsQSAtIG9mZnNldFBpeGVsO1xuICAgICAgICBsZXQgbmV3U2l6ZVBpeGVsQiA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEIgKyBvZmZzZXRQaXhlbDtcblxuICAgICAgICBpZihuZXdTaXplUGl4ZWxBIDwgdGhpcy5ndXR0ZXJTaXplIHx8IG5ld1NpemVQaXhlbEIgPCB0aGlzLmd1dHRlclNpemUpIHtcbiAgICAgICAgICAgIC8vIFdURi4uIGdldCBvdXQgb2YgaGVyZSFcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKG5ld1NpemVQaXhlbEEgPCB0aGlzLmd1dHRlclNpemUpIHtcbiAgICAgICAgICAgIG5ld1NpemVQaXhlbEIgKz0gbmV3U2l6ZVBpeGVsQTtcbiAgICAgICAgICAgIG5ld1NpemVQaXhlbEEgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYobmV3U2l6ZVBpeGVsQiA8IHRoaXMuZ3V0dGVyU2l6ZSkge1xuICAgICAgICAgICAgbmV3U2l6ZVBpeGVsQSArPSBuZXdTaXplUGl4ZWxCO1xuICAgICAgICAgICAgbmV3U2l6ZVBpeGVsQiA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDDgsKkIEFSRUFTIFNJWkUgUEVSQ0VOVFxuXG4gICAgICAgIGlmKG5ld1NpemVQaXhlbEEgPT09IDApIHtcbiAgICAgICAgICAgIGFyZWFCLnNpemUgKz0gYXJlYUEuc2l6ZTtcbiAgICAgICAgICAgIGFyZWFBLnNpemUgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYobmV3U2l6ZVBpeGVsQiA9PT0gMCkge1xuICAgICAgICAgICAgYXJlYUEuc2l6ZSArPSBhcmVhQi5zaXplO1xuICAgICAgICAgICAgYXJlYUIuc2l6ZSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBORVdfUEVSQ0VOVCA9IFNUQVJUX1BFUkNFTlQgLyBTVEFSVF9QSVhFTCAqIE5FV19QSVhFTDtcbiAgICAgICAgICAgIGlmKHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGFyZWFCLnNpemUgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEIgLyB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGl4ZWxCICogbmV3U2l6ZVBpeGVsQjtcbiAgICAgICAgICAgICAgICBhcmVhQS5zaXplID0gdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRCIC0gYXJlYUIuc2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRCID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYXJlYUEuc2l6ZSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSAvIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEEgKiBuZXdTaXplUGl4ZWxBO1xuICAgICAgICAgICAgICAgIGFyZWFCLnNpemUgPSB0aGlzLmRyYWdTdGFydFZhbHVlcy5zaXplUGVyY2VudEEgLSBhcmVhQS5zaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXJlYUEuc2l6ZSA9IHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQZXJjZW50QSAvIHRoaXMuZHJhZ1N0YXJ0VmFsdWVzLnNpemVQaXhlbEEgKiBuZXdTaXplUGl4ZWxBO1xuICAgICAgICAgICAgICAgIGFyZWFCLnNpemUgPSAodGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRBICsgdGhpcy5kcmFnU3RhcnRWYWx1ZXMuc2l6ZVBlcmNlbnRCKSAtIGFyZWFBLnNpemU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZVNpemVzKCk7XG4gICAgICAgIHRoaXMubm90aWZ5KCdwcm9ncmVzcycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RvcERyYWdnaW5nKCk6IHZvaWQge1xuICAgICAgICBpZih0aGlzLmlzRHJhZ2dpbmcgPT09IGZhbHNlICYmIHRoaXMuZHJhZ2dpbmdXaXRob3V0TW92ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzcGxheWVkQXJlYXMuZm9yRWFjaChhcmVhID0+IHtcbiAgICAgICAgICAgIGFyZWEuY29tcC51bmxvY2tFdmVudHMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2hpbGUodGhpcy5kcmFnTGlzdGVuZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGZjdCA9IHRoaXMuZHJhZ0xpc3RlbmVycy5wb3AoKTtcbiAgICAgICAgICAgIGlmKGZjdCkge1xuICAgICAgICAgICAgICAgIGZjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLmRyYWdnaW5nV2l0aG91dE1vdmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KCdjbGljaycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnkoJ2VuZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmdXaXRob3V0TW92ZSA9IGZhbHNlO1xuICAgIH1cblxuXG4gICAgcHVibGljIG5vdGlmeSh0eXBlOiAnc3RhcnQnIHwgJ3Byb2dyZXNzJyB8ICdlbmQnIHwgJ2NsaWNrJyB8ICd0cmFuc2l0aW9uRW5kJyk6IHZvaWQge1xuICAgICAgICBjb25zdCBhcmVhc1NpemU6IEFycmF5PG51bWJlcj4gPSB0aGlzLmRpc3BsYXllZEFyZWFzLm1hcChhID0+IGEuc2l6ZSAqIDEwMCk7XG5cbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kcmFnU3RhcnQuZW1pdCh7Z3V0dGVyTnVtOiB0aGlzLmN1cnJlbnRHdXR0ZXJOdW0sIHNpemVzOiBhcmVhc1NpemV9KTtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2dyZXNzJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHJhZ1Byb2dyZXNzLmVtaXQoe2d1dHRlck51bTogdGhpcy5jdXJyZW50R3V0dGVyTnVtLCBzaXplczogYXJlYXNTaXplfSk7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbmQnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kcmFnRW5kLmVtaXQoe2d1dHRlck51bTogdGhpcy5jdXJyZW50R3V0dGVyTnVtLCBzaXplczogYXJlYXNTaXplfSk7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjbGljayc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmd1dHRlckNsaWNrLmVtaXQoe2d1dHRlck51bTogdGhpcy5jdXJyZW50R3V0dGVyTnVtLCBzaXplczogYXJlYXNTaXplfSk7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd0cmFuc2l0aW9uRW5kJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNpdGlvbkVuZEludGVybmFsLm5leHQoYXJlYXNTaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiwgT25Jbml0LCBPbkRlc3Ryb3ksIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTcGxpdENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudC9zcGxpdC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ2FzLXNwbGl0LWFyZWEnXG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0QXJlYURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIHByaXZhdGUgX29yZGVyOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIEBJbnB1dCgpIHNldCBvcmRlcih2OiBudW1iZXIgfCBudWxsKSB7XG4gICAgICAgIHYgPSBOdW1iZXIodik7XG4gICAgICAgIHRoaXMuX29yZGVyID0gIWlzTmFOKHYpID8gdiA6IG51bGw7XG5cbiAgICAgICAgdGhpcy5zcGxpdC51cGRhdGVBcmVhKHRoaXMsIHRydWUsIGZhbHNlKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IG9yZGVyKCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3JkZXI7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfc2l6ZTogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoKSBzZXQgc2l6ZSh2OiBudW1iZXIgfCBudWxsKSB7XG4gICAgICAgIHYgPSBOdW1iZXIodik7XG4gICAgICAgIHRoaXMuX3NpemUgPSAoIWlzTmFOKHYpICYmIHYgPj0gMCAmJiB2IDw9IDEwMCkgPyAodi8xMDApIDogbnVsbDtcblxuICAgICAgICB0aGlzLnNwbGl0LnVwZGF0ZUFyZWEodGhpcywgZmFsc2UsIHRydWUpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgc2l6ZSgpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfbWluU2l6ZTogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIHNldCBtaW5TaXplKHY6IG51bWJlcikge1xuICAgICAgICB2ID0gTnVtYmVyKHYpO1xuICAgICAgICB0aGlzLl9taW5TaXplID0gKCFpc05hTih2KSAmJiB2ID4gMCAmJiB2IDwgMTAwKSA/IHYvMTAwIDogMDtcblxuICAgICAgICB0aGlzLnNwbGl0LnVwZGF0ZUFyZWEodGhpcywgZmFsc2UsIHRydWUpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgbWluU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluU2l6ZTtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF92aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNldCB2aXNpYmxlKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgdiA9ICh0eXBlb2YodikgPT09ICdib29sZWFuJykgPyB2IDogKHYgPT09ICdmYWxzZScgPyBmYWxzZSA6IHRydWUpO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gdjtcblxuICAgICAgICBpZih0aGlzLnZpc2libGUpIHsgXG4gICAgICAgICAgICB0aGlzLnNwbGl0LnNob3dBcmVhKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zcGxpdC5oaWRlQXJlYSh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB2aXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIHRyYW5zaXRpb25MaXN0ZW5lcjogRnVuY3Rpb247XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2NrTGlzdGVuZXJzOiBBcnJheTxGdW5jdGlvbj4gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBzcGxpdDogU3BsaXRDb21wb25lbnQpIHt9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3BsaXQuYWRkQXJlYSh0aGlzKTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2ZsZXgtZ3JvdycsICcwJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZmxleC1zaHJpbmsnLCAnMCcpO1xuXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbmVuZCcsIChlOiBUcmFuc2l0aW9uRXZlbnQpID0+IHRoaXMub25UcmFuc2l0aW9uRW5kKGUpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNpemVQaXhlbChwcm9wOiAnb2Zmc2V0V2lkdGgnIHwgJ29mZnNldEhlaWdodCcpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50W3Byb3BdO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTdHlsZVZpc2libGVBbmREaXIoaXNWaXNpYmxlOiBib29sZWFuLCBpc0RyYWdnaW5nOiBib29sZWFuLCBkaXJlY3Rpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcpOiB2b2lkIHtcbiAgICAgICAgaWYoaXNWaXNpYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZUZsZXhiYXNpcygnMCcsIGlzRHJhZ2dpbmcpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdvdmVyZmxvdy14JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihkaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ21heC13aWR0aCcsICcwJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93LXgnLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93LXknLCAnYXV0bycpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdtYXgtd2lkdGgnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsICcxMDAlJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0U3R5bGVPcmRlcih2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnb3JkZXInLCB2YWx1ZSk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBzZXRTdHlsZUZsZXhiYXNpcyh2YWx1ZTogc3RyaW5nLCBpc0RyYWdnaW5nOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIC8vIElmIGNvbXBvbmVudCBub3QgeWV0IGluaXRpYWxpemVkIG9yIGd1dHRlciBiZWluZyBkcmFnZ2VkLCBkaXNhYmxlIHRyYW5zaXRpb25cbiAgICAgICAgaWYodGhpcy5zcGxpdC5pc1ZpZXdJbml0aWFsaXplZCA9PT0gZmFsc2UgfHwgaXNEcmFnZ2luZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZVRyYW5zaXRpb24oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE9yIHVzZSAndXNlVHJhbnNpdGlvbicgdG8ga25vdyBpZiB0cmFuc2l0aW9uLlxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGVUcmFuc2l0aW9uKHRoaXMuc3BsaXQudXNlVHJhbnNpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2ZsZXgtYmFzaXMnLCB2YWx1ZSk7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgc2V0U3R5bGVUcmFuc2l0aW9uKHVzZVRyYW5zaXRpb246IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYodXNlVHJhbnNpdGlvbikge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uJywgYGZsZXgtYmFzaXMgMC4zc2ApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBvblRyYW5zaXRpb25FbmQoZXZlbnQ6IFRyYW5zaXRpb25FdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBMaW1pdCBvbmx5IGZsZXgtYmFzaXMgdHJhbnNpdGlvbiB0byB0cmlnZ2VyIHRoZSBldmVudFxuICAgICAgICBpZihldmVudC5wcm9wZXJ0eU5hbWUgPT09ICdmbGV4LWJhc2lzJykge1xuICAgICAgICAgICAgdGhpcy5zcGxpdC5ub3RpZnkoJ3RyYW5zaXRpb25FbmQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgbG9ja0V2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2NrTGlzdGVuZXJzLnB1c2goIHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ3NlbGVjdHN0YXJ0JywgKGU6IEV2ZW50KSA9PiBmYWxzZSkgKTtcbiAgICAgICAgICAgIHRoaXMubG9ja0xpc3RlbmVycy5wdXNoKCB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdkcmFnc3RhcnQnLCAoZTogRXZlbnQpID0+IGZhbHNlKSApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdW5sb2NrRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB3aGlsZSh0aGlzLmxvY2tMaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZmN0ID0gdGhpcy5sb2NrTGlzdGVuZXJzLnBvcCgpO1xuICAgICAgICAgICAgaWYoZmN0KSB7XG4gICAgICAgICAgICAgICAgZmN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMudW5sb2NrRXZlbnRzKCk7XG5cbiAgICAgICAgaWYodGhpcy50cmFuc2l0aW9uTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkxpc3RlbmVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNwbGl0LnJlbW92ZUFyZWEodGhpcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnYXMtc3BsaXQtZ3V0dGVyJ1xufSlcbmV4cG9ydCBjbGFzcyBTcGxpdEd1dHRlckRpcmVjdGl2ZSB7XG5cbiAgICBASW5wdXQoKSBzZXQgb3JkZXIodjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnb3JkZXInLCB2KTtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9kaXJlY3Rpb246ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCc7XG5cbiAgICBASW5wdXQoKSBzZXQgZGlyZWN0aW9uKHY6ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gdjtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3R5bGUoKTtcbiAgICB9XG5cbiAgICBnZXQgZGlyZWN0aW9uKCk6ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIEBJbnB1dCgpIHNldCB1c2VUcmFuc2l0aW9uKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbicsIGBmbGV4LWJhc2lzIDAuM3NgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfc2l6ZTogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgc2V0IHNpemUodjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3NpemUgPSB2O1xuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZSgpO1xuICAgIH1cblxuICAgIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2NvbG9yOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzZXQgY29sb3Iodjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2NvbG9yID0gdjtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3R5bGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91c2VCYWNrZ3JvdW5kOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNldCB1c2VCYWNrZ3JvdW5kKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdXNlQmFja2dyb3VuZCA9IHY7XG4gICAgICAgIHRoaXMucmVmcmVzaFN0eWxlKCk7XG4gICAgfVxuXG4gICAgZ2V0IGNvbG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9pbWFnZUg6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHNldCBpbWFnZUgodjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2ltYWdlSCA9IHY7XG4gICAgICAgIHRoaXMucmVmcmVzaFN0eWxlKCk7XG4gICAgfVxuXG4gICAgZ2V0IGltYWdlSCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faW1hZ2VIO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2ltYWdlVjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2V0IGltYWdlVih2OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faW1hZ2VWID0gdjtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3R5bGUoKTtcbiAgICB9XG5cbiAgICBnZXQgaW1hZ2VWKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZVY7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNldCBkaXNhYmxlZCh2OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdjtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3R5bGUoKTtcbiAgICB9XG5cbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoU3R5bGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZmxleC1iYXNpcycsIGAke3RoaXMuc2l6ZX1weGApO1xuXG4gICAgICAgIC8vIGZpeCBzYWZhcmkgYnVnIGFib3V0IGd1dHRlciBoZWlnaHQgd2hlbiBkaXJlY3Rpb24gaXMgaG9yaXpvbnRhbFxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsICh0aGlzLmRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJykgPyBgJHt0aGlzLnNpemV9cHhgIDogYDEwMCVgKTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2JhY2tncm91bmQtY29sb3InLCAodGhpcy5jb2xvciAhPT0gJycpID8gdGhpcy5jb2xvciA6IGAjZWVlZWVlYCk7XG5cbiAgICAgICAgY29uc3Qgc3RhdGU6ICdkaXNhYmxlZCcgfCAndmVydGljYWwnIHwgJ2hvcml6b250YWwnID0gKHRoaXMuZGlzYWJsZWQgPT09IHRydWUpID8gJ2Rpc2FibGVkJyA6IHRoaXMuZGlyZWN0aW9uO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2JhY2tncm91bmQtaW1hZ2UnLCB0aGlzLmdldEltYWdlKHN0YXRlKSk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgdGhpcy5nZXRDdXJzb3Ioc3RhdGUpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEN1cnNvcihzdGF0ZTogJ2Rpc2FibGVkJyB8ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCcpOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICdob3Jpem9udGFsJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2NvbC1yZXNpemUnO1xuXG4gICAgICAgICAgICBjYXNlICd2ZXJ0aWNhbCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyb3ctcmVzaXplJztcblxuICAgICAgICAgICAgY2FzZSAnZGlzYWJsZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZGVmYXVsdCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEltYWdlKHN0YXRlOiAnZGlzYWJsZWQnIHwgJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJyk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLl91c2VCYWNrZ3JvdW5kKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaG9yaXpvbnRhbCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5pbWFnZUggIT09ICcnKSA/IHRoaXMuaW1hZ2VIIDogZGVmYXVsdEltYWdlSDtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3ZlcnRpY2FsJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmltYWdlViAhPT0gJycpID8gdGhpcy5pbWFnZVYgOiBkZWZhdWx0SW1hZ2VWO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZGlzYWJsZWQnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxufVxuXG5cbmNvbnN0IGRlZmF1bHRJbWFnZUggPSAndXJsKFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBVUFBQUFlQ0FZQUFBRGtmdFM5QUFBQUlrbEVRVlFvVTJNNGMrYk1meEFHQWdZWW13R3JJSWlEanJFTGpwbzVhaVplTXdGK3lObk9zNUtTdmdBQUFBQkpSVTVFcmtKZ2dnPT1cIiknO1xuY29uc3QgZGVmYXVsdEltYWdlViA9ICd1cmwoXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUI0QUFBQUZDQU1BQUFCbC82eklBQUFBQmxCTVZFVUFBQURNek16SVQ4QXlBQUFBQVhSU1RsTUFRT2JZWmdBQUFCUkpSRUZVZUFGallHUmt3SU1KU2VNSGxCa09BQlA3QUVHelN1UEtBQUFBQUVsRlRrU3VRbUNDXCIpJztcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBTcGxpdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50L3NwbGl0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTcGxpdEFyZWFEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9zcGxpdEFyZWEuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNwbGl0R3V0dGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvc3BsaXRHdXR0ZXIuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFNwbGl0Q29tcG9uZW50LFxuICAgICAgICBTcGxpdEFyZWFEaXJlY3RpdmUsXG4gICAgICAgIFNwbGl0R3V0dGVyRGlyZWN0aXZlLFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBTcGxpdENvbXBvbmVudCxcbiAgICAgICAgU3BsaXRBcmVhRGlyZWN0aXZlLFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhclNwbGl0TW9kdWxlIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBBbmd1bGFyU3BsaXRNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBmb3JDaGlsZCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBBbmd1bGFyU3BsaXRNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtdXG4gICAgICAgIH07XG4gICAgfVxuXG59XG4iXSwibmFtZXMiOlsiRXZlbnRFbWl0dGVyIiwiU3ViamVjdCIsImRlYm91bmNlVGltZSIsInRzbGliXzEuX19zcHJlYWQiLCJDb21wb25lbnQiLCJDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSIsIk5nWm9uZSIsIkVsZW1lbnRSZWYiLCJDaGFuZ2VEZXRlY3RvclJlZiIsIlJlbmRlcmVyMiIsIklucHV0IiwiT3V0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