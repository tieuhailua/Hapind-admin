import { trigger, style, animate, transition } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'fury-censorship',
  templateUrl: './censorship.component.html',
  styleUrls: ['./censorship.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition('* => void', [
        animate('500ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class CensorshipComponent {
  currentIndex = 0;

  slides = [
    {'image': 'http://res.cloudinary.com/dmkw4f8iw/image/upload/v1705998934/user/ylvvwb8lzrw8qbkdwzfh.jpg'}, 
    {'image': 'https://res.cloudinary.com/dxlcsubez/image/upload/f_auto,q_auto/e44w6saipufr4qhbtesw'},
    {'image': 'http://res.cloudinary.com/dmkw4f8iw/image/upload/v1705998934/user/ylvvwb8lzrw8qbkdwzfh.jpg'}, 
    {'image': 'https://res.cloudinary.com/dxlcsubez/image/upload/f_auto,q_auto/e44w6saipufr4qhbtesw'}, 
    {'image': 'http://res.cloudinary.com/dmkw4f8iw/image/upload/v1705998934/user/ylvvwb8lzrw8qbkdwzfh.jpg'}
  ];
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  changeSlide(step: number) {
    this.currentIndex = (this.currentIndex + step + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
