import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CollapsibleAppbarComponent} from "./collapsible-appbar.component";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
    declarations: [CollapsibleAppbarComponent],
    imports: [CommonModule, MatIconModule, MatToolbarModule],
    exports: [CollapsibleAppbarComponent],
})
export class CollapsibleAppbarModule {}
