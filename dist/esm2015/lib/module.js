/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitComponent } from './component/split.component';
import { SplitAreaDirective } from './directive/splitArea.directive';
import { SplitGutterDirective } from './directive/splitGutter.directive';
export class AngularSplitModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zcGxpdC8iLCJzb3VyY2VzIjpbImxpYi9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFnQnpFLE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFFcEIsTUFBTSxDQUFDLE9BQU87UUFDakIsT0FBTztZQUNILFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsU0FBUyxFQUFFLEVBQUU7U0FDaEIsQ0FBQztJQUNOLENBQUM7Ozs7SUFFTSxNQUFNLENBQUMsUUFBUTtRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUUsRUFBRTtTQUNoQixDQUFDO0lBQ04sQ0FBQzs7O1lBNUJKLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsY0FBYztvQkFDZCxrQkFBa0I7b0JBQ2xCLG9CQUFvQjtpQkFDdkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGNBQWM7b0JBQ2Qsa0JBQWtCO2lCQUNyQjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFNwbGl0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQvc3BsaXQuY29tcG9uZW50JztcbmltcG9ydCB7IFNwbGl0QXJlYURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL3NwbGl0QXJlYS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU3BsaXRHdXR0ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9zcGxpdEd1dHRlci5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgU3BsaXRDb21wb25lbnQsXG4gICAgICAgIFNwbGl0QXJlYURpcmVjdGl2ZSxcbiAgICAgICAgU3BsaXRHdXR0ZXJEaXJlY3RpdmUsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFNwbGl0Q29tcG9uZW50LFxuICAgICAgICBTcGxpdEFyZWFEaXJlY3RpdmUsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyU3BsaXRNb2R1bGUge1xuXG4gICAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEFuZ3VsYXJTcGxpdE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW11cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGZvckNoaWxkKCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEFuZ3VsYXJTcGxpdE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW11cbiAgICAgICAgfTtcbiAgICB9XG5cbn1cbiJdfQ==