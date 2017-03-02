import { Directive, HostListener, ElementRef, NgZone, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropzone]'
})
export class DropzoneDirective implements OnInit {
  folders = 0;
  files = 0;

  constructor(private el: ElementRef, private ngZone: NgZone) {

  }

  traverse(entry, path?: string): void {
    path = path || '';
    if (entry.isFile) {
      // Get file
      entry.file((file) => {
        this.files++;
        console.log('File:', path + file.name);
      });
    } else if (entry.isDirectory) {
      // Get folder contents
      console.log('Directory:', path + entry.name);
      this.folders++;

      const dirReader = entry.createReader();
      dirReader.readEntries((entries) => {
        for (let i = 0; i < entries.length; i++) {
          this.traverse(entries[i], path + entry.name + '/');
        }
      });
    }
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.el.nativeElement.addEventListener('drop', (e) => {
        e.stopPropagation();
        e.preventDefault();

        this.files = 0;
        this.folders = 0;

        const items = e.dataTransfer.items;
        for (let i = 0; i < items.length; i++) {
          const entry = items[i].webkitGetAsEntry();
          if (entry) {
            this.traverse(entry);
          }
        }

        // @@TODO wait callbacks
        console.log('Folders ', this.folders, ' Files ', this.files);
      }, false);

      this.el.nativeElement.ondragover = (e) => {
        e.preventDefault();
      };
    });
  };
}
