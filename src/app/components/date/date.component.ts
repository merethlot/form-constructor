import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-date",
  template: `
    <mat-form-field class="full-width">
    <input matInput [matDatepicker]="picker" [placeholder]="field.label">
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>
    <mat-hint></mat-hint>
    </mat-form-field>
    `,
    styles: [`
	.full-width,
    :host {
		width: 100%;
	}
  `]
})
export class DateComponent implements OnInit {
  field: FieldConfig;
  // group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
