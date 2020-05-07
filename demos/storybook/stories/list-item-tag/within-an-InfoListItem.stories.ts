import * as Colors from '@pxblue/colors';

export const withinAnInfoListItem = (): any => ({
    template: `
        <pxb-info-list-item>
            <div title>Info List Item </div>
            <div subtitle>with a ListItemTag component to the right</div>
            <mat-icon [style.color]="colors.blue[500]" icon>battery_charging_full</mat-icon>
            <div rightContent style="width: 180px; display: flex; justify-content: space-between;">
                <pxb-list-item-tag label="Build Passing" [backgroundColor]="colors.green[500]" [fontColor]="colors.white[50]"></pxb-list-item-tag>
                <pxb-list-item-tag label="5 Bugs" [backgroundColor]="colors.yellow[500]" [fontColor]="colors.white[50]"></pxb-list-item-tag>
            </div>
        </pxb-info-list-item>
    `,
    props: {
        colors: Colors
    },
});