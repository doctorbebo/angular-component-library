import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { DrawerService } from '../service/drawer.service';
import { StateListener } from '../state-listener.component';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { Subscription } from 'rxjs';

export type DrawerLayoutVariantType = 'permanent' | 'persistent' | 'temporary';

@Component({
    selector: 'pxb-drawer-layout',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./drawer-layout.component.scss'],
    template: `
        <mat-sidenav-container class="pxb-drawer-layout" (backdropClick)="closeDrawer()">
            <mat-sidenav
                class="pxb-drawer-layout-sidenav"
                [fixedInViewport]="true"
                [class.smooth]="variant !== 'temporary' && transition"
                [style.width.px]="isCollapsed() ? 56 : width"
                [mode]="getMode()"
                [opened]="isOpen()"
            >
                <ng-content select="[pxb-drawer]"></ng-content>
            </mat-sidenav>
            <mat-sidenav-content
                class="pxb-drawer-layout-nav-content"
                [class.smooth]="variant !== 'temporary' && transition"
                [style.marginRight.px]="isRtl ? getContentMargin() : 0"
                [style.marginLeft.px]="isRtl ? 0 : getContentMargin()"
            >
                <ng-content select="[pxb-content]"></ng-content>
            </mat-sidenav-content>
        </mat-sidenav-container>
    `,
})
export class DrawerLayoutComponent extends StateListener {
    @Input() variant: DrawerLayoutVariantType;
    @Input() width = 350;
    @Output() backdropClick: EventEmitter<void> = new EventEmitter();

    transition = true;
    isRtl = false;
    dirChangeSubscription = Subscription.EMPTY;

    constructor(drawerService: DrawerService, changeDetectorRef: ChangeDetectorRef, dir: Directionality) {
        super(drawerService, changeDetectorRef);
        this.isRtl = dir.value === 'rtl';
        this.dirChangeSubscription = dir.change.subscribe((direction: Direction) => {
            this.isRtl = direction === 'rtl';
            changeDetectorRef.detectChanges();
        });
    }

    ngOnChanges(): void {
        this.transition = false;
        setTimeout(() => {
            this.transition = true;
        }, 400);
        this.drawerService.setDrawerVariant(this.variant);
        if (this.variant === 'permanent') {
            this.drawerService.setDrawerOpen(true);
        }
        this.changeDetector.detectChanges();
    }

    ngOnDestroy(): void {
        this.unsubscribeListeners();
        this.dirChangeSubscription.unsubscribe();
    }

    getMode(): string {
        return this.variant === 'temporary' ? 'over' : 'side';
    }

    closeDrawer(): void {
        this.drawerService.setDrawerOpen(false);
        this.backdropClick.emit();
    }

    // Is the drawer seen on the screen and expanded.
    isOpen(): boolean {
        if (this.variant === 'temporary') return this.drawerOpen;
        return true;
    }

    getContentMargin(): number {
        if (this.variant === 'temporary') {
            return 0;
        }
        return this.isCollapsed() ? 56 : this.width;
    }

    // Is the drawer condensed.
    isCollapsed(): boolean {
        if (this.variant === 'persistent') return !this.drawerOpen;
        return false;
    }
}
