import { Directive, HostListener, ElementRef, NgZone, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropzone]'
})
export class DropzoneDirective implements OnInit {
  worker: Worker;

  constructor(private el: ElementRef, private ngZone: NgZone) {

  }

  initWorker() {
    this.worker = new Worker('/workers/scanworker.js');
    this.worker.onerror = (err) => {
      alert('worker error');
    }
    this.worker.onmessage = (msg) => {
      console.log('message from worker', msg);
    };
  }

  ngOnInit(): void {
    this.initWorker();

    this.ngZone.runOutsideAngular(() => {
      this.el.nativeElement.addEventListener('drop', (e: DragEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const items = e.dataTransfer.items;
        this.worker.postMessage('start', [items]);

      }, false);

      this.el.nativeElement.ondragover = (e) => {
        e.preventDefault();
      };
    });
  };
}
