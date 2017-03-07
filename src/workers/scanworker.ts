export function scan(list: DataTransferItemList) {
    console.log('starting scan from ', list);
    const scan = new ScanWorker();
    scan.start(list);
}

class ScanWorker {
    folders = 0;
    files = 0;

    start(items: DataTransferItemList) {
        this.files = 0;
        this.folders = 0;

        for (let i = 0; i < items.length; i++) {
            const entry = (<any>items[i]).webkitGetAsEntry();
            if (entry) {
                this.traverse(entry);
            }
        }

        // @@TODO wait callbacks
        console.log('Folders ', this.folders, ' Files ', this.files);
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

        if ((this.files + this.folders) % 500 === 0) {
            console.log(`Files ${this.files} Folders ${this.folders}`);
        }
    }
}

if (window.document === undefined) {
    onmessage = (e: MessageEvent) => {
        scan(e.data[0]);
    };
}
