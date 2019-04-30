import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxIndexedDB } from 'ngx-indexed-db';
import { CdkDragDrop, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { FieldConfig, editFieldConfig } from "./field.interface";
import { EditFormComponent } from "./components/edit-form/edit-form.component";

@Component({
    selector: 'my-app',
    templateUrl: './app.template.html',
    styleUrls: ['./app.style.scss']
})
export class AppComponent implements OnInit { 
  @ViewChild(EditFormComponent) form: EditFormComponent;
  
  public currentFormId:number;
  public ifEditElement:boolean = false;
  public formNumber:number = this.currentFormId;
  regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Username",
      inputType: "text",
      // name: "name",
      default_value: ""
    },
    {
      type: "radiobutton",
      label: "Gender",
      // name: "gender",
      options: ["Male", "Female"],
      default_value: "Male"
    },
    {
      type: "date",
      label: "DOB",
      // name: "dob",
    },
    {
      type: "select",
      label: "Country",
      // name: "country",
      default_value: "UK",
      options: ["India", "UAE", "UK", "US"]
    },
    {
      type: "checkbox",
      label: "Accept Terms",
      // name: "term",
      default_value: true
    },
    {
      type: "button",
      label: "Save"
    },
    {
      type: "group",
      label: "Group",
      elements: []
    }
  ];

  private db:NgxIndexedDB;

  public elements:FieldConfig[] = [];
  public elementsTmp:any[] = [];

  public currentElementConfig:editFieldConfig;

  public currentElementId:number;

  getLastKey() {
    var last:string;
    this.db.openCursor('form_fields', (evt) => {
        var cursor = (<any>evt.target).result;
        if(cursor) {
            this.currentFormId = cursor.key;
            cursor.continue();
        } else {
            console.log('Entries all displayed.');
        }
    }).then(
        () => {
          // this.currentFormId = last;
          // return last;
        }
    );
  }

  addFormToBase(element:FieldConfig[]) {
    this.db.add('form_fields', { element: element }).then(
        () => {
            console.log('success');
            this.getLastKey();
        },
        (error:any) => {
            console.log(error);
        }
    );
  }

  loadForm(index:number) {
      console.log(index);
      this.currentFormId = index;
      // this.db.getByKey('form_fields', index).then(
      //     fields => {
      //         console.log(fields);
      //         return person;
      //     },
      //     error => {
      //         console.log(error);
      //     }
      // );
      this.db.getAll('form_fields').then(
          (fields) => {
              this.elements =  fields[index].element;
              console.log(this.elements);
          }, (error) => {
              console.log(error);
          });

  }

  updateForm(element:FieldConfig[], index:number) {
    this.db.update('form_fields', { element: element, id: index }).then(
        () => {
            // Do something after update
        },
        error => {
            console.log(error);
        }
    );
  }

  deleteElementFromBase(index:number) {
      this.db.delete('form_fields', index).then(
          () => {
              // Do something after delete
          },
          error => {
              console.log(error);
          }
      );
  }

  deleteElement(index:number) {
      this.elements.splice(index, 1);
      this.updateForm(this.elements, this.currentFormId);
  }

  editElement(index:number) {
      this.ifEditElement = true;
      this.currentElementConfig = this.elements[index];
      this.currentElementId = index;
  }

  drop(event: CdkDragDrop<string[]>) {

    console.log(this.currentFormId);
    if (event.previousContainer != event.container) {
      // copyArrayItem(event.previousContainer.data, this.elementsTmp, event.previousIndex, event.currentIndex);
      let tmp = {};
      Object.assign(tmp, event.previousContainer.data[event.previousIndex], JSON.parse(JSON.stringify(event.previousContainer.data[event.previousIndex])));
      this.elements.splice(event.currentIndex, 0, tmp);
      console.log(this.elements);
      this.updateForm(this.elements, this.currentFormId);

    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      this.updateForm(this.elements, this.currentFormId);
    }
  }

  ngOnInit(){
    this.db = new NgxIndexedDB('myDb', 1);
    this.db.openDatabase(1, (evt:any) => {
        let objectStore = evt.currentTarget.result.createObjectStore(
            'form_fields', { keyPath: "id", autoIncrement: true });

        objectStore.createIndex("element", "element", { unique: false });

    }).then(
      () => {
        this.addFormToBase(this.elements);
      }
    );
  }

  submitElement(value: any) {
      this.ifEditElement = false;
      this.elements[this.currentElementId].label = value.label;
      this.updateForm(this.elements, this.currentElementId);
      console.log(this.elements, this.currentElementId, this.elements[this.currentElementId]);
  }

  cancelForm() {
      this.ifEditElement = false;
  }

}