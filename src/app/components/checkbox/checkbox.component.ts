import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-checkbox",
  template: `
    <div class="full-width">
    <mat-checkbox >{{field.label}}</mat-checkbox>
    </div>
    `,
    styles: [`
	.full-width,
    :host {
		width: 100%;
	}
  `]
})
export class CheckboxComponent implements OnInit {
  field: FieldConfig;
  // group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
