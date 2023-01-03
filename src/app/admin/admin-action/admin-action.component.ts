import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IActionResponse } from 'src/app/shared/interfaces/action/action.interface';
import { ActionService } from 'src/app/shared/services/action/action.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-action',
  templateUrl: './admin-action.component.html',
  styleUrls: ['./admin-action.component.scss']
})
export class AdminActionComponent implements OnInit {

  public addStatus = false;
  public adminActions: Array<IActionResponse> = [];
  public actionForm!: FormGroup;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  private currentActionIndex = 0;

  constructor(
    private fb: FormBuilder,
    private actionService: ActionService,
    private imageService: ImageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initActionForm();
    this.loadActions();
  }

  initActionForm(): void {
    this.actionForm = this.fb.group ({
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null]
    });
  }

  loadActions(): void {
    this.actionService.getAll().subscribe(data => {
      this.adminActions = data;
    });
  }

  addAction(): void {
    this.addStatus = !this.addStatus;
    this.actionForm.reset();
  }

  saveAction(): void {
    this.actionForm.value.date = Date.now();
    if (this.editStatus) {
      this.actionService.update(this.actionForm.value, this.currentActionIndex).subscribe (() => {
        this.loadActions();
        this.toastr.success('Action successfully updated');
      })
    } else {
      this.actionService.create(this.actionForm.value).subscribe(() => {
        this.loadActions();
        this.toastr.success('Action successfully added');
      })
    }
    this.addStatus = false;
    this.actionForm.reset();
    this.editStatus = false;
    this.uploadPercent = 0;
    this.isUploaded = false;
  }

  editAction(action: IActionResponse): void {
    this.addStatus = true;
    this.actionForm.patchValue({
      date: Date.now(),
      name: action.name,
      title: action.title,
      description: action.description,
      imagePath: action.imagePath
    })
    this.editStatus = true;
    this.currentActionIndex = action.id;
    this.isUploaded = true;
  }

  deleteAction (action: IActionResponse): void {
    this.actionService.delete(action.id).subscribe(() => {
      this.loadActions();
      this.toastr.success('Action successfully deleted');
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.actionForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.actionForm.patchValue({ imagePath: null })
      })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl (control: string): string {
    return this.actionForm.get(control)?.value;
  }
}