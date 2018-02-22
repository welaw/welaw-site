// This file is required by karma.conf.js and loads recursively all the .spec and framework files

//import 'zone.js/dist/long-stack-trace-zone';
importScripts('marked.min.js');

self.addEventListener('message', function(e) {
  var markdown = marked(e.data);
  self.postMessage(markdown);
});
