/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
export class SplitGutterDirective {
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
if (false) {
    /** @type {?} */
    SplitGutterDirective.prototype._direction;
    /** @type {?} */
    SplitGutterDirective.prototype._size;
    /** @type {?} */
    SplitGutterDirective.prototype._color;
    /** @type {?} */
    SplitGutterDirective.prototype._useBackground;
    /** @type {?} */
    SplitGutterDirective.prototype._imageH;
    /** @type {?} */
    SplitGutterDirective.prototype._imageV;
    /** @type {?} */
    SplitGutterDirective.prototype._disabled;
    /** @type {?} */
    SplitGutterDirective.prototype.elRef;
    /** @type {?} */
    SplitGutterDirective.prototype.renderer;
}
/** @type {?} */
const defaultImageH = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==")';
/** @type {?} */
const defaultImageV = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC")';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRHdXR0ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zcGxpdC8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmUvc3BsaXRHdXR0ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS3hFLE1BQU0sT0FBTyxvQkFBb0I7Ozs7OztJQXdHN0IsWUFBb0IsS0FBaUIsRUFDekIsUUFBbUI7UUFEWCxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFyRHZCLG1CQUFjLEdBQVksSUFBSSxDQUFDOztRQXVDL0IsY0FBUyxHQUFZLEtBQUssQ0FBQztJQWNBLENBQUM7Ozs7O0lBdkdwQyxJQUFhLEtBQUssQ0FBQyxDQUFTO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDOzs7OztJQU1ELElBQWEsU0FBUyxDQUFDLENBQTRCO1FBQy9DLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7Ozs7OztJQUlELElBQWEsYUFBYSxDQUFDLENBQVU7UUFDakMsSUFBSSxDQUFDLEVBQUU7WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztTQUNyRjthQUNJO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFB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TUErQzdCLGFBQWEsR0FBRywySkFBMko7O01BQzNLLGFBQWEsR0FBRywrS0FBK0siLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdhcy1zcGxpdC1ndXR0ZXInXG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0R3V0dGVyRGlyZWN0aXZlIHtcblxuICAgIEBJbnB1dCgpIHNldCBvcmRlcih2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdvcmRlcicsIHYpO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2RpcmVjdGlvbjogJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJztcblxuICAgIEBJbnB1dCgpIHNldCBkaXJlY3Rpb24odjogJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJykge1xuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSB2O1xuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZSgpO1xuICAgIH1cblxuICAgIGdldCBkaXJlY3Rpb24oKTogJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXJlY3Rpb247XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgQElucHV0KCkgc2V0IHVzZVRyYW5zaXRpb24odjogYm9vbGVhbikge1xuICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uJywgYGZsZXgtYmFzaXMgMC4zc2ApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2l0aW9uJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9zaXplOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBzZXQgc2l6ZSh2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHY7XG4gICAgICAgIHRoaXMucmVmcmVzaFN0eWxlKCk7XG4gICAgfVxuXG4gICAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfY29sb3I6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHNldCBjb2xvcih2OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fY29sb3IgPSB2O1xuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VzZUJhY2tncm91bmQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2V0IHVzZUJhY2tncm91bmQodjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl91c2VCYWNrZ3JvdW5kID0gdjtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3R5bGUoKTtcbiAgICB9XG5cbiAgICBnZXQgY29sb3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2ltYWdlSDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2V0IGltYWdlSCh2OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faW1hZ2VIID0gdjtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3R5bGUoKTtcbiAgICB9XG5cbiAgICBnZXQgaW1hZ2VIKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZUg7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfaW1hZ2VWOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzZXQgaW1hZ2VWKHY6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pbWFnZVYgPSB2O1xuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZSgpO1xuICAgIH1cblxuICAgIGdldCBpbWFnZVYoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ltYWdlVjtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgc2V0IGRpc2FibGVkKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2O1xuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZSgpO1xuICAgIH1cblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hTdHlsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdmbGV4LWJhc2lzJywgYCR7dGhpcy5zaXplfXB4YCk7XG5cbiAgICAgICAgLy8gZml4IHNhZmFyaSBidWcgYWJvdXQgZ3V0dGVyIGhlaWdodCB3aGVuIGRpcmVjdGlvbiBpcyBob3Jpem9udGFsXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgKHRoaXMuZGlyZWN0aW9uID09PSAndmVydGljYWwnKSA/IGAke3RoaXMuc2l6ZX1weGAgOiBgMTAwJWApO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZC1jb2xvcicsICh0aGlzLmNvbG9yICE9PSAnJykgPyB0aGlzLmNvbG9yIDogYCNlZWVlZWVgKTtcblxuICAgICAgICBjb25zdCBzdGF0ZTogJ2Rpc2FibGVkJyB8ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCcgPSAodGhpcy5kaXNhYmxlZCA9PT0gdHJ1ZSkgPyAnZGlzYWJsZWQnIDogdGhpcy5kaXJlY3Rpb247XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZC1pbWFnZScsIHRoaXMuZ2V0SW1hZ2Uoc3RhdGUpKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdjdXJzb3InLCB0aGlzLmdldEN1cnNvcihzdGF0ZSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q3Vyc29yKHN0YXRlOiAnZGlzYWJsZWQnIHwgJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJyk6IHN0cmluZyB7XG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2hvcml6b250YWwnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnY29sLXJlc2l6ZSc7XG5cbiAgICAgICAgICAgIGNhc2UgJ3ZlcnRpY2FsJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3Jvdy1yZXNpemUnO1xuXG4gICAgICAgICAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdkZWZhdWx0JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SW1hZ2Uoc3RhdGU6ICdkaXNhYmxlZCcgfCAndmVydGljYWwnIHwgJ2hvcml6b250YWwnKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuX3VzZUJhY2tncm91bmQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdob3Jpem9udGFsJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmltYWdlSCAhPT0gJycpID8gdGhpcy5pbWFnZUggOiBkZWZhdWx0SW1hZ2VIO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAndmVydGljYWwnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuaW1hZ2VWICE9PSAnJykgPyB0aGlzLmltYWdlViA6IGRlZmF1bHRJbWFnZVY7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdkaXNhYmxlZCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG59XG5cblxuY29uc3QgZGVmYXVsdEltYWdlSCA9ICd1cmwoXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFVQUFBQWVDQVlBQUFEa2Z0UzlBQUFBSWtsRVFWUW9VMk00YytiTWZ4QUdBZ1lZbXdHcklJaURqckVManBvNWFpWmVNd0YreU5uT3M1S1N2Z0FBQUFCSlJVNUVya0pnZ2c9PVwiKSc7XG5jb25zdCBkZWZhdWx0SW1hZ2VWID0gJ3VybChcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQjRBQUFBRkNBTUFBQUJsLzZ6SUFBQUFCbEJNVkVVQUFBRE16TXpJVDhBeUFBQUFBWFJTVGxNQVFPYllaZ0FBQUJSSlJFRlVlQUZqWUdSa3dJTUpTZU1IbEJrT0FCUDdBRUd6U3VQS0FBQUFBRWxGVGtTdVFtQ0NcIiknO1xuIl19