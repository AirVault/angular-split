import { ChangeDetectorRef, EventEmitter, Renderer2, OnDestroy, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { IArea } from '../interface/IArea';
import { SplitAreaDirective } from '../directive/splitArea.directive';
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
export declare class SplitComponent implements AfterViewInit, OnDestroy {
    private ngZone;
    private elRef;
    private cdRef;
    private renderer;
    private _direction;
    direction: 'horizontal' | 'vertical';
    private _useTransition;
    useTransition: boolean;
    private _disabled;
    disabled: boolean;
    private _useBackground;
    useBackground: boolean;
    private _width;
    width: number | null;
    private _height;
    height: number | null;
    private _gutterSize;
    gutterSize: number;
    private _gutterColor;
    gutterColor: string;
    private _gutterImageH;
    gutterImageH: string;
    private _gutterImageV;
    gutterImageV: string;
    private _dir;
    dir: 'ltr' | 'rtl';
    dragStart: EventEmitter<{
        gutterNum: number;
        sizes: number[];
    }>;
    dragProgress: EventEmitter<{
        gutterNum: number;
        sizes: number[];
    }>;
    dragEnd: EventEmitter<{
        gutterNum: number;
        sizes: number[];
    }>;
    gutterClick: EventEmitter<{
        gutterNum: number;
        sizes: number[];
    }>;
    private transitionEndInternal;
    transitionEnd: Observable<number[]>;
    readonly cssFlexdirection: "row" | "column";
    readonly cssWidth: string;
    readonly cssHeight: string;
    readonly cssMinwidth: string;
    readonly cssMinheight: string;
    isViewInitialized: boolean;
    private isDragging;
    private draggingWithoutMove;
    private currentGutterNum;
    readonly displayedAreas: Array<IArea>;
    private readonly hidedAreas;
    private readonly dragListeners;
    private readonly dragStartValues;
    constructor(ngZone: NgZone, elRef: ElementRef, cdRef: ChangeDetectorRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    private getNbGutters;
    addArea(comp: SplitAreaDirective): void;
    removeArea(comp: SplitAreaDirective): void;
    updateArea(comp: SplitAreaDirective, resetOrders: boolean, resetSizes: boolean): void;
    showArea(comp: SplitAreaDirective): void;
    hideArea(comp: SplitAreaDirective): void;
    private build;
    private refreshStyleSizes;
    startDragging(startEvent: MouseEvent | TouchEvent, gutterOrder: number, gutterNum: number): void;
    private dragEvent;
    private getPointFromEvent;
    private drag;
    private stopDragging;
    notify(type: 'start' | 'progress' | 'end' | 'click' | 'transitionEnd'): void;
    ngOnDestroy(): void;
}
