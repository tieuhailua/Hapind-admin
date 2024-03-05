// import { Component, OnInit, Output, ViewEncapsulation, EventEmitter, Input  } from '@angular/core';
// import { fadeInUpAnimation } from '../../../@fury/animations/fade-in-up.animation';
// import { fadeInRightAnimation } from '../../../@fury/animations/fade-in-right.animation';
// import { scaleInAnimation } from '../../../@fury/animations/scale-in.animation';
// import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
// import { EditorService } from './editor.service';
// import { Blog } from 'src/app/model/blog';
// import { jwtDecode } from 'jwt-decode';

// @Component({
//   selector: 'fury-editor',
//   templateUrl: './editor.component.html',
//   styleUrls: ['./editor.component.scss'],
//   animations: [fadeInUpAnimation, fadeInRightAnimation, scaleInAnimation],
//   encapsulation: ViewEncapsulation.None
// })
// export class EditorComponent implements OnInit {
//   form: FormGroup;
//   @Input() content: string = '';
//   @Output() contentChanged = new EventEmitter();

//   constructor(
//     private editorService: EditorService,
//     private fb: FormBuilder
//   ) {
//     this.form = this.fb.group({
//       content: ['<p><br></p>', Validators.required], 
//     });
//   }
//   addContent(): void {
//     // Implement logic to add content as needed
//   }
//   ngOnInit() {
//   }
//   onContentChanged(event: any): void {
//     this.content = event.html;
//     this.contentChanged.emit(this.content);
//   }
//   saveBlog() {
//     const currentDate = new Date();
//     const token = localStorage.getItem('token');
//     const tokenPayload = jwtDecode(token);
//     const username = tokenPayload.sub;
//     const blogData: Blog = {
//       id:0,
//       title: 'Your Blog Title',
//       brief: 'Your Blog Brief',
//       content: this.form.get('content').value, 
//       publishDate: currentDate.toISOString(),
//       status: 'Your Blog Brief',
//       //blogImages: ,
//     };

//     this.editorService.create(blogData,username).subscribe(
//       (response) => {
//         console.log('Blog saved successfully', response);
//         // Handle success, e.g., redirect to the blog page
//       },
//       (error) => {
//         console.error('Error saving blog', error);
//         // Handle error, show error message, etc.
//       }
//     );
//   }

// }
import { Component, OnInit, Output, ViewEncapsulation, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { fadeInUpAnimation } from '../../../@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from '../../../@fury/animations/scale-in.animation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorService } from './editor.service';
import { Blog } from 'src/app/model/blog';
import { jwtDecode } from 'jwt-decode';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'fury-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation, scaleInAnimation],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements OnInit {
  form: FormGroup;
  @Input() content: string = '';
  @Output() contentChanged = new EventEmitter();
  @ViewChild('quillEditor') quillEditorRef: QuillEditorComponent;

  constructor(
    private editorService: EditorService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      content: ['<p><br></p>', Validators.required],
    });
  }

  addContent(): void {
    // Implement logic to add content as needed
  }

  ngOnInit() {}

  onContentChanged(event: any): void {
    this.content = event.html;
    this.contentChanged.emit(this.content);
  }

  saveBlog() {
    const currentDate = new Date();
    const token = localStorage.getItem('token');
    const tokenPayload = jwtDecode(token);
    const username = tokenPayload.sub;

    const quillEditor = this.quillEditorRef.quillEditor;
    const blogData: Blog = {
      id: 0,
      title: 'Your Blog Title',
      brief: 'Your Blog Brief',
      content: quillEditor.root.innerHTML, // Use Quill Editor API to get content
      publishDate: currentDate.toISOString(),
      status: 'Your Blog Brief',
    };

    this.editorService.create(blogData, username).subscribe(
      (response) => {
        console.log('Blog saved successfully', response);
        // Handle success, e.g., redirect to the blog page
      },
      (error) => {
        console.error('Error saving blog', error);
        // Handle error, show error message, etc.
      }
    );
  }
}
