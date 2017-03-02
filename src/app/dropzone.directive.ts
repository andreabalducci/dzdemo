import { Directive, HostListener, ElementRef, NgZone, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropzone]'
})
export class DropzoneDirective implements OnInit {
  constructor(private el: ElementRef, private ngZone: NgZone) {

  }

  traverse(host: DropzoneDirective, entry, path?: string): void {
    path = path || '';
    if (entry.isFile) {
      // Get file
      entry.file(function (file) {
        console.log('File:', path + file.name);
      });
    } else if (entry.isDirectory) {
      // Get folder contents
        console.log('Directory:',path +  entry.name);

      const dirReader = entry.createReader();
      dirReader.readEntries(function (entries) {
        for (let i = 0; i < entries.length; i++) {
          console.log('this is ', this);
          host.traverse(host, entries[i], path + entry.name + '/');
        }
      });
    }
  }

  ngOnInit(): void {
    const host = this;
    this.ngZone.runOutsideAngular(() => {
      this.el.nativeElement.addEventListener('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
        let items = e.dataTransfer.items;
        for (let i = 0; i < items.length; i++) {
          const entry = items[i].webkitGetAsEntry();
          if (entry) {
            host.traverse(host, entry);
          }
        }
      }, false);

      this.el.nativeElement.ondragover = function (e) {
        e.preventDefault();
      };
    });
  };
}
