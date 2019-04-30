import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-input",
  template: `
	<mat-form-field class="full-width" >
	<input matInput [placeholder]="field.label" [type]="field.inputType">
	</mat-form-field>
	`,
  styles: [`
	.full-width,
    :host {
		width: 100%;
	}
  `]
})
export class InputComponent implements OnInit {
  field: FieldConfig;
  // group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
