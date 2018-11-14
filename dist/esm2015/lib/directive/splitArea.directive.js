/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef, Renderer2, NgZone } from '@angular/core';
import { SplitComponent } from '../component/split.component';
export class SplitAreaDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRBcmVhLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc3BsaXQvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlL3NwbGl0QXJlYS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFLOUQsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7OztJQXNFM0IsWUFBb0IsTUFBYyxFQUNkLEtBQWlCLEVBQ2pCLFFBQW1CLEVBQ25CLEtBQXFCO1FBSHJCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUF2RWpDLFdBQU0sR0FBa0IsSUFBSSxDQUFDOztRQWU3QixVQUFLLEdBQWtCLElBQUksQ0FBQzs7UUFlNUIsYUFBUSxHQUFXLENBQUMsQ0FBQzs7UUFlckIsYUFBUSxHQUFZLElBQUksQ0FBQztRQXFCaEIsa0JBQWEsR0FBb0IsRUFBRSxDQUFDO0lBS1QsQ0FBQzs7Ozs7SUFyRTdDLElBQWEsS0FBSyxDQUFDLENBQWdCO1FBQy9CLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVuQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7SUFFRCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUks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LFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7WUFoTEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxlQUFlO2FBQzVCOzs7O1lBTm9FLE1BQU07WUFBaEQsVUFBVTtZQUFFLFNBQVM7WUFFdkMsY0FBYzs7O29CQVNsQixLQUFLO21CQWVMLEtBQUs7c0JBZUwsS0FBSztzQkFlTCxLQUFLOzs7O0lBL0NOLG9DQUFxQzs7SUFlckMsbUNBQW9DOztJQWVwQyxzQ0FBNkI7O0lBZTdCLHNDQUFpQzs7SUFvQmpDLGdEQUFxQzs7SUFDckMsMkNBQXFEOztJQUV6QyxvQ0FBc0I7O0lBQ3RCLG1DQUF5Qjs7SUFDekIsc0NBQTJCOztJQUMzQixtQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIE9uSW5pdCwgT25EZXN0cm95LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU3BsaXRDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnQvc3BsaXQuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdhcy1zcGxpdC1hcmVhJ1xufSlcbmV4cG9ydCBjbGFzcyBTcGxpdEFyZWFEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBwcml2YXRlIF9vcmRlcjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBASW5wdXQoKSBzZXQgb3JkZXIodjogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB2ID0gTnVtYmVyKHYpO1xuICAgICAgICB0aGlzLl9vcmRlciA9ICFpc05hTih2KSA/IHYgOiBudWxsO1xuXG4gICAgICAgIHRoaXMuc3BsaXQudXBkYXRlQXJlYSh0aGlzLCB0cnVlLCBmYWxzZSk7XG4gICAgfVxuICAgIFxuICAgIGdldCBvcmRlcigpOiBudW1iZXIgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yZGVyO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX3NpemU6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgQElucHV0KCkgc2V0IHNpemUodjogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICB2ID0gTnVtYmVyKHYpO1xuICAgICAgICB0aGlzLl9zaXplID0gKCFpc05hTih2KSAmJiB2ID49IDAgJiYgdiA8PSAxMDApID8gKHYvMTAwKSA6IG51bGw7XG5cbiAgICAgICAgdGhpcy5zcGxpdC51cGRhdGVBcmVhKHRoaXMsIGZhbHNlLCB0cnVlKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IHNpemUoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX21pblNpemU6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBzZXQgbWluU2l6ZSh2OiBudW1iZXIpIHtcbiAgICAgICAgdiA9IE51bWJlcih2KTtcbiAgICAgICAgdGhpcy5fbWluU2l6ZSA9ICghaXNOYU4odikgJiYgdiA+IDAgJiYgdiA8IDEwMCkgPyB2LzEwMCA6IDA7XG5cbiAgICAgICAgdGhpcy5zcGxpdC51cGRhdGVBcmVhKHRoaXMsIGZhbHNlLCB0cnVlKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IG1pblNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pblNpemU7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfdmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzZXQgdmlzaWJsZSh2OiBib29sZWFuKSB7XG4gICAgICAgIHYgPSAodHlwZW9mKHYpID09PSAnYm9vbGVhbicpID8gdiA6ICh2ID09PSAnZmFsc2UnID8gZmFsc2UgOiB0cnVlKTtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHY7XG5cbiAgICAgICAgaWYodGhpcy52aXNpYmxlKSB7IFxuICAgICAgICAgICAgdGhpcy5zcGxpdC5zaG93QXJlYSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3BsaXQuaGlkZUFyZWEodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSB0cmFuc2l0aW9uTGlzdGVuZXI6IEZ1bmN0aW9uO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9ja0xpc3RlbmVyczogQXJyYXk8RnVuY3Rpb24+ID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgc3BsaXQ6IFNwbGl0Q29tcG9uZW50KSB7fVxuXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNwbGl0LmFkZEFyZWEodGhpcyk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdmbGV4LWdyb3cnLCAnMCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2ZsZXgtc2hyaW5rJywgJzAnKTtcblxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25MaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnLCAoZTogVHJhbnNpdGlvbkV2ZW50KSA9PiB0aGlzLm9uVHJhbnNpdGlvbkVuZChlKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTaXplUGl4ZWwocHJvcDogJ29mZnNldFdpZHRoJyB8ICdvZmZzZXRIZWlnaHQnKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudFtwcm9wXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0U3R5bGVWaXNpYmxlQW5kRGlyKGlzVmlzaWJsZTogYm9vbGVhbiwgaXNEcmFnZ2luZzogYm9vbGVhbiwgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnKTogdm9pZCB7XG4gICAgICAgIGlmKGlzVmlzaWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGVGbGV4YmFzaXMoJzAnLCBpc0RyYWdnaW5nKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnb3ZlcmZsb3cteCcsICdoaWRkZW4nKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoZGlyZWN0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdtYXgtd2lkdGgnLCAnMCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdvdmVyZmxvdy14JywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdvdmVyZmxvdy15JywgJ2F1dG8nKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnbWF4LXdpZHRoJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCAnMTAwJScpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsICcxMDAlJyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldFN0eWxlT3JkZXIodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ29yZGVyJywgdmFsdWUpO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgc2V0U3R5bGVGbGV4YmFzaXModmFsdWU6IHN0cmluZywgaXNEcmFnZ2luZzogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICAvLyBJZiBjb21wb25lbnQgbm90IHlldCBpbml0aWFsaXplZCBvciBndXR0ZXIgYmVpbmcgZHJhZ2dlZCwgZGlzYWJsZSB0cmFuc2l0aW9uXG4gICAgICAgIGlmKHRoaXMuc3BsaXQuaXNWaWV3SW5pdGlhbGl6ZWQgPT09IGZhbHNlIHx8IGlzRHJhZ2dpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGVUcmFuc2l0aW9uKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBPciB1c2UgJ3VzZVRyYW5zaXRpb24nIHRvIGtub3cgaWYgdHJhbnNpdGlvbi5cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlVHJhbnNpdGlvbih0aGlzLnNwbGl0LnVzZVRyYW5zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdmbGV4LWJhc2lzJywgdmFsdWUpO1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIHNldFN0eWxlVHJhbnNpdGlvbih1c2VUcmFuc2l0aW9uOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmKHVzZVRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbicsIGBmbGV4LWJhc2lzIDAuM3NgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgb25UcmFuc2l0aW9uRW5kKGV2ZW50OiBUcmFuc2l0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gTGltaXQgb25seSBmbGV4LWJhc2lzIHRyYW5zaXRpb24gdG8gdHJpZ2dlciB0aGUgZXZlbnRcbiAgICAgICAgaWYoZXZlbnQucHJvcGVydHlOYW1lID09PSAnZmxleC1iYXNpcycpIHtcbiAgICAgICAgICAgIHRoaXMuc3BsaXQubm90aWZ5KCd0cmFuc2l0aW9uRW5kJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcHVibGljIGxvY2tFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9ja0xpc3RlbmVycy5wdXNoKCB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdzZWxlY3RzdGFydCcsIChlOiBFdmVudCkgPT4gZmFsc2UpICk7XG4gICAgICAgICAgICB0aGlzLmxvY2tMaXN0ZW5lcnMucHVzaCggdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZHJhZ3N0YXJ0JywgKGU6IEV2ZW50KSA9PiBmYWxzZSkgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHVubG9ja0V2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgd2hpbGUodGhpcy5sb2NrTGlzdGVuZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGZjdCA9IHRoaXMubG9ja0xpc3RlbmVycy5wb3AoKTtcbiAgICAgICAgICAgIGlmKGZjdCkge1xuICAgICAgICAgICAgICAgIGZjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVubG9ja0V2ZW50cygpO1xuXG4gICAgICAgIGlmKHRoaXMudHJhbnNpdGlvbkxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zaXRpb25MaXN0ZW5lcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zcGxpdC5yZW1vdmVBcmVhKHRoaXMpO1xuICAgIH1cbn1cbiJdfQ==