import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'pxb-score-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <mat-card class="pxb-score-card">
            <div class="pxb-score-card-header">
                <div class="pxb-score-card-header-background"></div>
                <div class="pxb-score-card-header-wrapper">
                    <div class="pxb-score-card-header-text">
                        <mat-card-title class="pxb-score-card-title">{{ headerTitle }}</mat-card-title>
                        <mat-card-subtitle class="pxb-score-card-subtitle">{{ headerSubtitle }}</mat-card-subtitle>
                        <mat-card-subtitle class="pxb-score-card-info">{{ headerInfo }}</mat-card-subtitle>
                    </div>
                    <div class="pxb-score-card-action-items-wrapper">
                        <ng-content select="[action-items]"></ng-content>
                    </div>
                </div>
            </div>
            <mat-card-content>
                <div class="pxb-score-card-body">
                    <ng-content select="[body]"></ng-content>
                    <div class="pxb-score-card-badge-wrapper" [style.marginTop.px]="badgeOffset || 'inherit'">
                        <ng-content select="[badge]"></ng-content>
                    </div>
                </div>
                <mat-divider *ngIf="actionRow.childNodes.length !== 0"></mat-divider>
                <div class="pxb-score-card-action-row-wrapper" #actionRow>
                    <ng-content select="[action-row]"></ng-content>
                </div>
            </mat-card-content>
        </mat-card>
    `,
    styleUrls: ['./score-card.component.scss'],
})
export class ScoreCardComponent {
    @Input() headerTitle: string;
    @Input() headerSubtitle: string;
    @Input() headerInfo: string;
    @Input() badgeOffset = 0;
}