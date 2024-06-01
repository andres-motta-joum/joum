import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {
  @Input() url!: string;
  @Input() titulo!: string;
  videoPlay: boolean = false;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  ngAfterViewInit() {
    setTimeout(()=>{
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Define el umbral de visibilidad del elemento (50%)
      };
      const video: HTMLVideoElement = this.videoPlayer.nativeElement;
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            if (!video.paused) {
              video.pause();
              this.videoPlay = false;
            }
          } 
        });
      }, options);
    
      observer.observe(this.videoPlayer.nativeElement);
    },4000)
  }

  togglePlayPause() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    if (video.paused) {
      video.play();
      this.videoPlay = true;
    } else {
      video.pause();
      this.videoPlay = false;
    }
  }
}