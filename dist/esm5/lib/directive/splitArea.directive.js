/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef, Renderer2, NgZone } from '@angular/core';
import { SplitComponent } from '../component/split.component';
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
export { SplitAreaDirective };
if (false) {
    /** @type {?} */
    SplitAreaDirective.prototype._order;
    /** @type {?} */
    SplitAreaDirective.prototype._size;
    /** @type {?} */
    SplitAreaDirective.prototype._minSize;
    /** @type {?} */
    SplitAreaDirective.prototype._visible;
    /** @type {?} */
    SplitAreaDirective.prototype.transitionListener;
    /** @type {?} */
    SplitAreaDirective.prototype.lockListeners;
    /** @type {?} */
    SplitAreaDirective.prototype.ngZone;
    /** @type {?} */
    SplitAreaDirective.prototype.elRef;
    /** @type {?} */
    SplitAreaDirective.prototype.renderer;
    /** @type {?} */
    SplitAreaDirective.prototype.split;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRBcmVhLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc3BsaXQvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlL3NwbGl0QXJlYS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFOUQ7SUF5RUksNEJBQW9CLE1BQWMsRUFDZCxLQUFpQixFQUNqQixRQUFtQixFQUNuQixLQUFxQjtRQUhyQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBdkVqQyxXQUFNLEdBQWtCLElBQUksQ0FBQzs7UUFlN0IsVUFBSyxHQUFrQixJQUFJLENBQUM7O1FBZTVCLGFBQVEsR0FBVyxDQUFDLENBQUM7O1FBZXJCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFxQmhCLGtCQUFhLEdBQW9CLEVBQUUsQ0FBQztJQUtULENBQUM7SUFyRTdDLHNCQUFhLHFDQUFLOzs7O1FBT2xCO1lBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7Ozs7O1FBVEQsVUFBbUIsQ0FBZ0I7WUFDL0IsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBRW5DLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0MsQ0FB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QUNJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixJQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUN4QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUM3QjtRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7O2dCQWhMSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGVBQWU7aUJBQzVCOzs7O2dCQU5vRSxNQUFNO2dCQUFoRCxVQUFVO2dCQUFFLFNBQVM7Z0JBRXZDLGNBQWM7Ozt3QkFTbEIsS0FBSzt1QkFlTCxLQUFLOzBCQWVMLEtBQUs7MEJBZUwsS0FBSzs7SUE2SFYseUJBQUM7Q0FBQSxBQWpMRCxJQWlMQztTQTlLWSxrQkFBa0I7OztJQUUzQixvQ0FBcUM7O0lBZXJDLG1DQUFvQzs7SUFlcEMsc0NBQTZCOztJQWU3QixzQ0FBaUM7O0lBb0JqQyxnREFBcUM7O0lBQ3JDLDJDQUFxRDs7SUFFekMsb0NBQXNCOztJQUN0QixtQ0FBeUI7O0lBQ3pCLHNDQUEyQjs7SUFDM0IsbUNBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBPbkluaXQsIE9uRGVzdHJveSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNwbGl0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50L3NwbGl0LmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnYXMtc3BsaXQtYXJlYSdcbn0pXG5leHBvcnQgY2xhc3MgU3BsaXRBcmVhRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgcHJpdmF0ZSBfb3JkZXI6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgQElucHV0KCkgc2V0IG9yZGVyKHY6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdiA9IE51bWJlcih2KTtcbiAgICAgICAgdGhpcy5fb3JkZXIgPSAhaXNOYU4odikgPyB2IDogbnVsbDtcblxuICAgICAgICB0aGlzLnNwbGl0LnVwZGF0ZUFyZWEodGhpcywgdHJ1ZSwgZmFsc2UpO1xuICAgIH1cbiAgICBcbiAgICBnZXQgb3JkZXIoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcmRlcjtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9zaXplOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIEBJbnB1dCgpIHNldCBzaXplKHY6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgdiA9IE51bWJlcih2KTtcbiAgICAgICAgdGhpcy5fc2l6ZSA9ICghaXNOYU4odikgJiYgdiA+PSAwICYmIHYgPD0gMTAwKSA/ICh2LzEwMCkgOiBudWxsO1xuXG4gICAgICAgIHRoaXMuc3BsaXQudXBkYXRlQXJlYSh0aGlzLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICAgIFxuICAgIGdldCBzaXplKCk6IG51bWJlciB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9taW5TaXplOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgc2V0IG1pblNpemUodjogbnVtYmVyKSB7XG4gICAgICAgIHYgPSBOdW1iZXIodik7XG4gICAgICAgIHRoaXMuX21pblNpemUgPSAoIWlzTmFOKHYpICYmIHYgPiAwICYmIHYgPCAxMDApID8gdi8xMDAgOiAwO1xuXG4gICAgICAgIHRoaXMuc3BsaXQudXBkYXRlQXJlYSh0aGlzLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICAgIFxuICAgIGdldCBtaW5TaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5TaXplO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX3Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2V0IHZpc2libGUodjogYm9vbGVhbikge1xuICAgICAgICB2ID0gKHR5cGVvZih2KSA9PT0gJ2Jvb2xlYW4nKSA/IHYgOiAodiA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogdHJ1ZSk7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2O1xuXG4gICAgICAgIGlmKHRoaXMudmlzaWJsZSkgeyBcbiAgICAgICAgICAgIHRoaXMuc3BsaXQuc2hvd0FyZWEodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNwbGl0LmhpZGVBcmVhKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgdHJhbnNpdGlvbkxpc3RlbmVyOiBGdW5jdGlvbjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvY2tMaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPiA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHNwbGl0OiBTcGxpdENvbXBvbmVudCkge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zcGxpdC5hZGRBcmVhKHRoaXMpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZmxleC1ncm93JywgJzAnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdmbGV4LXNocmluaycsICcwJyk7XG5cbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uZW5kJywgKGU6IFRyYW5zaXRpb25FdmVudCkgPT4gdGhpcy5vblRyYW5zaXRpb25FbmQoZSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2l6ZVBpeGVsKHByb3A6ICdvZmZzZXRXaWR0aCcgfCAnb2Zmc2V0SGVpZ2h0Jyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnRbcHJvcF07XG4gICAgfVxuXG4gICAgcHVibGljIHNldFN0eWxlVmlzaWJsZUFuZERpcihpc1Zpc2libGU6IGJvb2xlYW4sIGlzRHJhZ2dpbmc6IGJvb2xlYW4sIGRpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyk6IHZvaWQge1xuICAgICAgICBpZihpc1Zpc2libGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlRmxleGJhc2lzKCcwJywgaXNEcmFnZ2luZyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93LXgnLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnbWF4LXdpZHRoJywgJzAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnb3ZlcmZsb3cteCcsICdoaWRkZW4nKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnb3ZlcmZsb3cteScsICdhdXRvJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ21heC13aWR0aCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgJzEwMCUnKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCAnMTAwJScpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTdHlsZU9yZGVyKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdvcmRlcicsIHZhbHVlKTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHNldFN0eWxlRmxleGJhc2lzKHZhbHVlOiBzdHJpbmcsIGlzRHJhZ2dpbmc6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgLy8gSWYgY29tcG9uZW50IG5vdCB5ZXQgaW5pdGlhbGl6ZWQgb3IgZ3V0dGVyIGJlaW5nIGRyYWdnZWQsIGRpc2FibGUgdHJhbnNpdGlvblxuICAgICAgICBpZih0aGlzLnNwbGl0LmlzVmlld0luaXRpYWxpemVkID09PSBmYWxzZSB8fCBpc0RyYWdnaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlVHJhbnNpdGlvbihmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3IgdXNlICd1c2VUcmFuc2l0aW9uJyB0byBrbm93IGlmIHRyYW5zaXRpb24uXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZVRyYW5zaXRpb24odGhpcy5zcGxpdC51c2VUcmFuc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZmxleC1iYXNpcycsIHZhbHVlKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBzZXRTdHlsZVRyYW5zaXRpb24odXNlVHJhbnNpdGlvbjogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZih1c2VUcmFuc2l0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb24nLCBgZmxleC1iYXNpcyAwLjNzYCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb24nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIG9uVHJhbnNpdGlvbkVuZChldmVudDogVHJhbnNpdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIExpbWl0IG9ubHkgZmxleC1iYXNpcyB0cmFuc2l0aW9uIHRvIHRyaWdnZXIgdGhlIGV2ZW50XG4gICAgICAgIGlmKGV2ZW50LnByb3BlcnR5TmFtZSA9PT0gJ2ZsZXgtYmFzaXMnKSB7XG4gICAgICAgICAgICB0aGlzLnNwbGl0Lm5vdGlmeSgndHJhbnNpdGlvbkVuZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBsb2NrRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvY2tMaXN0ZW5lcnMucHVzaCggdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnc2VsZWN0c3RhcnQnLCAoZTogRXZlbnQpID0+IGZhbHNlKSApO1xuICAgICAgICAgICAgdGhpcy5sb2NrTGlzdGVuZXJzLnB1c2goIHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2RyYWdzdGFydCcsIChlOiBFdmVudCkgPT4gZmFsc2UpICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyB1bmxvY2tFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHdoaWxlKHRoaXMubG9ja0xpc3RlbmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBmY3QgPSB0aGlzLmxvY2tMaXN0ZW5lcnMucG9wKCk7XG4gICAgICAgICAgICBpZihmY3QpIHtcbiAgICAgICAgICAgICAgICBmY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51bmxvY2tFdmVudHMoKTtcblxuICAgICAgICBpZih0aGlzLnRyYW5zaXRpb25MaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3BsaXQucmVtb3ZlQXJlYSh0aGlzKTtcbiAgICB9XG59XG4iXX0=