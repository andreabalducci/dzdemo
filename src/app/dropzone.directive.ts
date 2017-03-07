import { Directive, HostListener, ElementRef, NgZone, OnInit } from '@angular/core';
import { scan } from '..//workers//scanworker';

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

  processDrop(list: DataTransferItemList) {
    if (this.worker) {
      this.worker.postMessage('start', [list]);
      return;
    }

    scan(list);
  }

  ngOnInit(): void {
    //    this.initWorker();

    this.ngZone.runOutsideAngular(() => {
      this.el.nativeElement.addEventListener('drop', (e: DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const items = e.dataTransfer.items;

        this.processDrop(items);

      }, false);

      this.el.nativeElement.ondragover = (e: DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
      };
    });
  };
}
