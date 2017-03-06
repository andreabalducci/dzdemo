import { Directive, HostListener, ElementRef, NgZone, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropzone]'
})
export class DropzoneDirective implements OnInit {
  constructor(private el: ElementRef, private ngZone: NgZone) {

  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.el.nativeElement.addEventListener('drop', (e: DragEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const items = e.dataTransfer.items;

        const worker = new Worker('scanworker.js');
        worker.onmessage = (msg) => {
          console.log('message from worker', msg);
        };

        worker.postMessage('start', [items]);

      }, false);

      this.el.nativeElement.ondragover = (e) => {
        e.preventDefault();
      };
    });
  };
}
