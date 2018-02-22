// This file is required by karma.conf.js and loads recursively all the .spec and framework files

//import 'zone.js/dist/long-stack-trace-zone';
importScripts('diff2html.min.js');

self.addEventListener('message', function(e) {
  var pretty = Diff2Html.getPrettyHtml(e.data, {
    inputFormat: 'diff',
    showFiles: false,
    matching: 'words'
  });
  self.postMessage(pretty);
});
