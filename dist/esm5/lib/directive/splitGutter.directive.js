/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
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
export { SplitGutterDirective };
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
var defaultImageH = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==")';
/** @type {?} */
var defaultImageV = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC")';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRHdXR0ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zcGxpdC8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmUvc3BsaXRHdXR0ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhFO0lBeUdJLElBQUk7SUFFSiw4QkFBb0IsS0FBaUIsRUFDekIsUUFBbUI7UUFEWCxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFyRHZCLG1CQUFjLEdBQVksSUFBSSxDQUFDOztRQXVDL0IsY0FBUyxHQUFZLEtBQUssQ0FBQztJQWNBLENBQUM7SUF2R3BDLHNCQUFhLHVDQUFLOzs7OztRQUFsQixVQUFtQixDQUFTO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRSxDQUFDOzs7T0FBQTtJQU1ELHNCQUFhLDJDQUFTOzs7O1FBS3RCO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7Ozs7O1FBUEQsVUFBdUIsQ0FBNEI7WUFDL0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBUUQsc0JBQWEsK0NBQWE7UUFGMUIsSUFBSTs7Ozs7OztRQUVKLFVBQTJCLENBQVU7WUFDakMsSUFBSSxDQUFDLEVBQUU7Z0JBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixDQUFDLENBQUM7YUFDckY7aUJBQ0k7Z0JBQ0Qs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RCxJQXdKQztTQXJKWSxvQkFBb0I7OztJQVE3QiwwQ0FBOEM7O0lBd0I5QyxxQ0FBc0I7O0lBYXRCLHNDQUF1Qjs7SUFPdkIsOENBQXVDOztJQWF2Qyx1Q0FBd0I7O0lBYXhCLHVDQUF3Qjs7SUFheEIseUNBQW1DOztJQWF2QixxQ0FBeUI7O0lBQ2pDLHdDQUEyQjs7O0lBK0M3QixhQUFhLEdBQUcsMkpBQTJKOztJQUMzSyxhQUFhLEdBQUcsK0tBQStLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnYXMtc3BsaXQtZ3V0dGVyJ1xufSlcbmV4cG9ydCBjbGFzcyBTcGxpdEd1dHRlckRpcmVjdGl2ZSB7XG5cbiAgICBASW5wdXQoKSBzZXQgb3JkZXIodjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnb3JkZXInLCB2KTtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9kaXJlY3Rpb246ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCc7XG5cbiAgICBASW5wdXQoKSBzZXQgZGlyZWN0aW9uKHY6ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gdjtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3R5bGUoKTtcbiAgICB9XG5cbiAgICBnZXQgZGlyZWN0aW9uKCk6ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCcge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIEBJbnB1dCgpIHNldCB1c2VUcmFuc2l0aW9uKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbicsIGBmbGV4LWJhc2lzIDAuM3NgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAndHJhbnNpdGlvbicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfc2l6ZTogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgc2V0IHNpemUodjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3NpemUgPSB2O1xuICAgICAgICB0aGlzLnJlZnJlc2hTdHlsZSgpO1xuICAgIH1cblxuICAgIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2NvbG9yOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzZXQgY29sb3Iodjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2NvbG9yID0gdjtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3R5bGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91c2VCYWNrZ3JvdW5kOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNldCB1c2VCYWNrZ3JvdW5kKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdXNlQmFja2dyb3VuZCA9IHY7XG4gICAgICAgIHRoaXMucmVmcmVzaFN0eWxlKCk7XG4gICAgfVxuXG4gICAgZ2V0IGNvbG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBwcml2YXRlIF9pbWFnZUg6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHNldCBpbWFnZUgodjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2ltYWdlSCA9IHY7XG4gICAgICAgIHRoaXMucmVmcmVzaFN0eWxlKCk7XG4gICAgfVxuXG4gICAgZ2V0IGltYWdlSCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faW1hZ2VIO1xuICAgIH1cblxuICAgIC8vLy9cblxuICAgIHByaXZhdGUgX2ltYWdlVjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2V0IGltYWdlVih2OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faW1hZ2VWID0gdjtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3R5bGUoKTtcbiAgICB9XG5cbiAgICBnZXQgaW1hZ2VWKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZVY7XG4gICAgfVxuXG4gICAgLy8vL1xuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHNldCBkaXNhYmxlZCh2OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdjtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3R5bGUoKTtcbiAgICB9XG5cbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICAvLy8vXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoU3R5bGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZmxleC1iYXNpcycsIGAke3RoaXMuc2l6ZX1weGApO1xuXG4gICAgICAgIC8vIGZpeCBzYWZhcmkgYnVnIGFib3V0IGd1dHRlciBoZWlnaHQgd2hlbiBkaXJlY3Rpb24gaXMgaG9yaXpvbnRhbFxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsICh0aGlzLmRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJykgPyBgJHt0aGlzLnNpemV9cHhgIDogYDEwMCVgKTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2JhY2tncm91bmQtY29sb3InLCAodGhpcy5jb2xvciAhPT0gJycpID8gdGhpcy5jb2xvciA6IGAjZWVlZWVlYCk7XG5cbiAgICAgICAgY29uc3Qgc3RhdGU6ICdkaXNhYmxlZCcgfCAndmVydGljYWwnIHwgJ2hvcml6b250YWwnID0gKHRoaXMuZGlzYWJsZWQgPT09IHRydWUpID8gJ2Rpc2FibGVkJyA6IHRoaXMuZGlyZWN0aW9uO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2JhY2tncm91bmQtaW1hZ2UnLCB0aGlzLmdldEltYWdlKHN0YXRlKSk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgdGhpcy5nZXRDdXJzb3Ioc3RhdGUpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEN1cnNvcihzdGF0ZTogJ2Rpc2FibGVkJyB8ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCcpOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICdob3Jpem9udGFsJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2NvbC1yZXNpemUnO1xuXG4gICAgICAgICAgICBjYXNlICd2ZXJ0aWNhbCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdyb3ctcmVzaXplJztcblxuICAgICAgICAgICAgY2FzZSAnZGlzYWJsZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZGVmYXVsdCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEltYWdlKHN0YXRlOiAnZGlzYWJsZWQnIHwgJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJyk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLl91c2VCYWNrZ3JvdW5kKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaG9yaXpvbnRhbCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5pbWFnZUggIT09ICcnKSA/IHRoaXMuaW1hZ2VIIDogZGVmYXVsdEltYWdlSDtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3ZlcnRpY2FsJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmltYWdlViAhPT0gJycpID8gdGhpcy5pbWFnZVYgOiBkZWZhdWx0SW1hZ2VWO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZGlzYWJsZWQnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxufVxuXG5cbmNvbnN0IGRlZmF1bHRJbWFnZUggPSAndXJsKFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBVUFBQUFlQ0FZQUFBRGtmdFM5QUFBQUlrbEVRVlFvVTJNNGMrYk1meEFHQWdZWW13R3JJSWlEanJFTGpwbzVhaVplTXdGK3lObk9zNUtTdmdBQUFBQkpSVTVFcmtKZ2dnPT1cIiknO1xuY29uc3QgZGVmYXVsdEltYWdlViA9ICd1cmwoXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUI0QUFBQUZDQU1BQUFCbC82eklBQUFBQmxCTVZFVUFBQURNek16SVQ4QXlBQUFBQVhSU1RsTUFRT2JZWmdBQUFCUkpSRUZVZUFGallHUmt3SU1KU2VNSGxCa09BQlA3QUVHelN1UEtBQUFBQUVsRlRrU3VRbUNDXCIpJztcbiJdfQ==