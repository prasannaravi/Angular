import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { CtrlsService } from 'ag-grid-community';
import { Subscription } from 'rxjs';

@Component({
  selector: 'formly-field-logoupload',
  template: `

  <style>.control-container {
    border: 1px solid #ddd;
    justify-content: center;

        height: 150px;
        width: 150px;
  }

  .title {
    width:150px;
    height: 150px;
  }

  .icon {
     text-align: center;
     vertical-align: middle;
     line-height: 150px;
  }

  mat-icon{

        width: 19px;
        font-size: 14px;
        padding: 11px 4px;
  }
  .image {
    object-fit: contain;
    cursor: pointer;
    position: relative;
  }

  .image .delete-icon {
      width: 20px;
      height: 20px;
      z-index: 100;
      color: white;
      border-radius: 50%;
      font-size: 20px;
      border: 1px solid red;
      background-color: red;
  }

  .delete {
    float:right;
    position:absolute;
    right: 0px;
    bottom: 0px;
  }

  .center{
    text-align-last: left !important;
    margin-left:18px
  }
  </style>


<div class="center"><span>{{field.props!['label']}}</span></div>

  <div *ngIf="title"class="primary" (click)="files.click()">
    <mat-icon>{{icon}}</mat-icon>
    <span><b>{{title}}</b></span>
</div>
<div class="control-container" [style.border-radius.%]="radius" >
<div class="image" (click)="files.click()" [style.height.px]="size" [style.width.px]="size">
    <span *ngIf="noImage" class="icon">
        <mat-icon>add_a_photo</mat-icon>
    </span>
    <div>
    <div *ngIf="!noImage">
        <img [src]="previewUrl" class="image" [style.border-radius.%]="radius"  width="500" height="600"[style.height.px]="size" [style.width.px]="size"/>
    </div>
    <div class="delete" *ngIf="!noImage" (click)="deleteImage();$event.stopPropagation()">
        <span class="delete-icon">
            <mat-icon style="width: 20px;font-size:14px">delete</mat-icon>
        </span>
    </div>
    <input style="display:none" #inputFile #files type="file"
    [formlyAttributes]="field" (change)="selectImage($event)">
</div>
</div>




  `,
})
export class FormlyFieldLogoUpload extends FieldType {
  noImage = true
  previewUrl: any
  imageData!: File
  showButton = false;
  reqSubscription: Subscription[] = []

  @Input() imageUrl: any = null;
  @Input() title: any;
  @Input() icon: any = null;
  @Input() folder: string = 'misc'
  @Input() autoUpload: boolean = false;
  @Input() radius: any = 0
  @Input() size: any = 150
  @Output() onImageSelect = new EventEmitter<any>();

  ngOnDestroy() {
    this.reqSubscription.forEach(sub => sub.unsubscribe())
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadImageFromInput()
  }

  loadImageFromInput() {
    if (this.imageUrl && this.imageUrl != null) {
      this.previewUrl = this.imageUrl
      this.noImage = false
    }
  }

  selectImage(fileInput: any) {
    debugger
    this.imageData = fileInput.target.files[0];
    // this.preview(this.imageData);
    this.noImage = false
    var mimeType = this.imageData?.type;
    if (mimeType?.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.imageData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
    //   ctrl.formControl.setValue(this.imageData)
    this.onImageSelect.emit(this.imageData)
  }



  deleteImage() {
    this.noImage = !this.noImage
    this.previewUrl = null
    // this.onImageSelect.emit(this.imageData)
  }

}
