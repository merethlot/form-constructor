import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { editFieldConfig } from "../../field.interface";

@Component({
  exportAs: "editForm",
  selector: "edit-form",
    template: `
      <form class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)">      
        <mat-form-field class="full-width" >
          <input matInput [placeholder]="label" [type]="text" formControlName="label">
        </mat-form-field>
        <button mat-raised-button color="assign" (click)="cancel()">Отмена</button>
        <button type="submit" mat-raised-button color="primary">Сохранить</button>
      </form>
    `,
    styles: [`
	.full-width,
    :host {
		width: 100%;
	}
  `]
})
export class EditFormComponent implements OnInit {
  @Input() fields: editFieldConfig;

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelForm: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get value() {
    return this.form.value;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createControl();

  }

  cancel() {
    this.cancelForm.emit();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(this.form.value);
    this.submit.emit(this.form.value);

    // if (this.form.valid) {
    //   this.submit.emit(this.form.value);
    // } else {
    //   this.validateAllFormFields(this.form);
    // }
  }

  createControl() {
    const group = this.fb.group({});
    const control = this.fb.control(
        this.fields.label
        // this.bindValidations(field.validations || [])
    );
    group.addControl('label', control);
    // this.fields.forEach(field => {
    //   // if (field.type === "button") return;
    //   const control = this.fb.control(
    //     field.default_value,
    //     // this.bindValidations(field.validations || [])
    //   );
    //   group.addControl(field.name, control);
    // });
    return group;
  }

  // bindValidations(validations: any) {
  //   if (validations.length > 0) {
  //     const validList = [];
  //     validations.forEach(valid => {
  //       validList.push(valid.validator);
  //     });
  //     return Validators.compose(validList);
  //   }
  //   return null;
  // }

  // validateAllFormFields(formGroup: FormGroup) {
  //   Object.keys(formGroup.controls).forEach(field => {
  //     const control = formGroup.get(field);
  //     control.markAsTouched({ onlySelf: true });
  //   });
  // }
}
