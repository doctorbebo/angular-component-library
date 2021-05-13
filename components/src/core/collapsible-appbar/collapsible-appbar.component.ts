import {Component, ElementRef, Input, NgZone, OnInit, Renderer2} from '@angular/core';


@Component({
    selector: 'pxb-collapsible-appbar',
    template: `
        <mat-toolbar>
            <div fxLayout="row" fxLayoutAlign="start" height="100%" width="100%">
                <ion-button size="small" fill="clear">
                    <mat-icon class="menu-icon">menu</mat-icon>
                </ion-button>
                <div class="title-wrapper">
                    <h4 class="mat-title" #mainTitle style="font-weight: 600;">President</h4>
                    <div class="mat-subheading-1" #hiddenTitle style="font-weight: 400;">Commander in Chief</div>
                    <div class="mat-subheading-2" style="font-weight: 300;">Leader of the Free World</div>
                </div>
            </div>
            
        </mat-toolbar>
        
        
        <expandable-header [scrollArea]="mycontent" headerHeight="200" [mainTitle]="mainTitle" [hiddenTitle]="hiddenTitle"
                           [backgroundImage]="backgroundImage" class="primary expandable-header">
            <div class='image-background' #backgroundImage></div>
            <div class="header-content">
                <div fxLayout="row" fxLayoutAlign="start" height="100%" width="100%">
                    <ion-button size="small" fill="clear">
                        <mat-icon class="menu-icon">menu</mat-icon>
                    </ion-button>
                    <div class="title-wrapper">
                        <h4 class="mat-title" #mainTitle style="font-weight: 600;">President</h4>
                        <div class="mat-subheading-1" #hiddenTitle style="font-weight: 400;">Commander in Chief</div>
                        <div class="mat-subheading-2" style="font-weight: 300;">Leader of the Free World</div>
                    </div>
                </div>
            </div>
        </expandable-header>
    `,
    styleUrls: ['collapsible-appbar.component.scss']
})
export class CollapsibleAppbarComponent implements OnInit {


    @Input() scrollArea: any;
    @Input() headerHeight: number;
    @Input() mainTitle: ElementRef;
    @Input() hiddenTitle: ElementRef;
    @Input() backgroundImage: ElementRef;

    HEADER_MAX_HEIGHT = 200;
    HEADER_MIN_HEIGHT = 56;

    newHeaderHeight: any;

    constructor(public element: ElementRef, public renderer: Renderer2) {}


    ngOnInit(): void {
        this.renderer.setStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');
        this.scrollArea.ionScroll.subscribe((ev: any) => {
            this.resizeHeader(ev);
        });

    }

    resizeHeader(ev: any): void {
        if (ev) {
            this.domCtrl.write(() => {
                this.newHeaderHeight = Math.min(this.HEADER_MAX_HEIGHT, Math.max(this.HEADER_MIN_HEIGHT, this.headerHeight - ev.detail.scrollTop));
                this.renderer.setStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');
                //mainTitle Font
                const fontSize = 20 + this.scaleFactor() * 10;
                this.renderer.setStyle(this.mainTitle, 'font-size', fontSize + 'px');
                this.renderer.setStyle(this.mainTitle, 'line-height', fontSize + 'px');

                //hiddenTitle Font
                const hiddenTitlefontSize = 0 + this.scaleFactor() * 20;
                const hiddenTitleopacity = 0 + this.scaleFactor() * 1;
                this.renderer.setStyle(this.hiddenTitle, 'font-size', hiddenTitlefontSize + 'px');
                this.renderer.setStyle(this.hiddenTitle, 'line-height', hiddenTitlefontSize + 'px');
                this.renderer.setStyle(this.hiddenTitle, 'opacity', hiddenTitleopacity.toString());

                //backgroundImage Font
                const opacity = 0 + this.scaleFactor() * 0.3;
                this.renderer.setStyle(this.backgroundImage, 'opacity', opacity.toString());
            });
        }
    }

    scaleFactor(): number {
        return ((this.newHeaderHeight - this.HEADER_MIN_HEIGHT) / (this.HEADER_MAX_HEIGHT - this.HEADER_MIN_HEIGHT));
    }
}