import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = "drop file here";
}

/*
var dropzone = document.getElementById("dropzone");

dropzone.addEventListener("drop", function(e) {
  e.stopPropagation();
  e.preventDefault();
  var items = event.dataTransfer.items;
  for (var i = 0; i < items.length; i++) {
    var entry = items[i].webkitGetAsEntry();
    if (entry) {
      traverse(entry);
    }
  }
}, false);

dropzone.ondragover = function (e) {
  e.preventDefault()
}

function traverse(entry, path) {
  path = path || "";
  if (entry.isFile) {
    // Get file
    entry.file(function(file) {
      console.log("File:", path + file.name);
    });
  } else if (entry.isDirectory) {
    // Get folder contents
    var dirReader = entry.createReader();
    dirReader.readEntries(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        traverse(entries[i], path + entry.name + "/");
      }
    });
  }
}*/