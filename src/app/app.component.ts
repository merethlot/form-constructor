import { Component, OnInit, ViewChild, ViewEncapsulation  } from '@angular/core';
import { NgxIndexedDB } from 'ngx-indexed-db';
import { CdkDragDrop, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { FieldConfig, editFieldConfig } from "./field.interface";
import { EditFormComponent } from "./components/edit-form/edit-form.component";

@Component({
    selector: 'my-app',
    templateUrl: './app.template.html',
    styleUrls: ['app.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit { 
  @ViewChild(EditFormComponent) form: EditFormComponent;
  
  public currentFormId:number;
  public ifEditElement:boolean = false;
  public formNumber:number = this.currentFormId;


  private db:NgxIndexedDB;

  public elements_form:FieldConfig[]       = [];
  public elements_group:FieldConfig = {
      type: "group",
      label: "Group",
      elements: []
  }

  public currentElementConfig:editFieldConfig;

  public currentElementId:number;

  public currentForm:string;

  public regConfig: FieldConfig[] = [
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
    // {
    //   type: "group",
    //   label: "Group",
    //   elements: []
    // }
  ];

  constructor() {}

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
      // this.db.getByIndex('form_fields', 'id', index).then(
      //     fields => {
      //         console.log(fields);
      //     },
      //     error => {
      //         console.log(error);
      //     }
      // );
      this.db.getAll('form_fields').then(
          (fields) => {
              this.elements_form =  fields[index].element;
              // console.log(this.elements_form);
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

  deleteElement(index:number, arr:FieldConfig[]) {
      arr.splice(index, 1);
      this.updateForm(this.elements_form, this.currentFormId);
  }

  editElement(index:number, arr:FieldConfig[], arr_name:string) {
      this.currentForm   = arr_name;
      this.ifEditElement = true;
      this.currentElementConfig = arr[index];
      this.currentElementId = index;
  }

  drop(event: CdkDragDrop<string[]>) {

    console.log(this.currentFormId);
    if (event.previousContainer != event.container) {
      if (event.previousContainer.id == "elements_group_handle" && event.container.id == "elements_form") {
          let tmp = {};
          Object.assign(tmp, this.elements_group, 
                        JSON.parse(JSON.stringify(
                          this.elements_group
                        ))
          );
          this.elements_form.splice(event.currentIndex, 0 , tmp);
          this.elements_group.elements = [];
          this.updateForm(this.elements_form, this.currentFormId);
      } else {

        let tmp = {};
        Object.assign(tmp, event.previousContainer.data[event.previousIndex], 
                      JSON.parse(JSON.stringify(
                        event.previousContainer.data[event.previousIndex]
                      ))
        );
        console.log(event.container);
        eval(`this.${event.container.id}`).splice(event.currentIndex, 0, tmp);
        console.log(this.elements_form);
        if (event.previousContainer.id != "elements_from") {
          event.previousContainer.data.splice(event.previousIndex, 1);
        }

        this.updateForm(this.elements_form, this.currentFormId);
        
      }
        


    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      this.updateForm(this.elements_form, this.currentFormId);
    }
  }

  ngOnInit(){
    this.db = new NgxIndexedDB('myDb', 1);
    this.db.openDatabase(1, (evt:any) => {
        let objectStore = evt.currentTarget.result.createObjectStore(
            'form_fields', { keyPath: "id", autoIncrement: true });

        objectStore.createIndex("element", "element", { unique: false });
        // objectStore.createIndex("id", "id", { unique: true });

    }).then(
      () => {
        this.addFormToBase(this.elements_form);
      }
    );
  }

  submitElement(value: any) {
      this.ifEditElement = false;
      eval(`this.${this.currentForm}`)[this.currentElementId].label = value.label;
      this.updateForm(this.elements_form, this.currentElementId);
  }

  cancelForm() {
      this.ifEditElement = false;
  }

}