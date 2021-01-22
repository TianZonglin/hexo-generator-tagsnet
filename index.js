/* global hexo */
'use strict';
var fs = require('hexo-fs');
var path = require('path');
var log = require('hexo-log')({
  debug: false,
  silent: false
});
hexo.extend.generator.register('tagsnet', function (locals) {
  if (!this.config.tagsnet || !this.config.tagsnet.builtin) {
    return;
  }
  return require('./lib/tagsnet-generator').call(this, locals);
});




var options = {
  options: [
    { name: '-t, --tagsnet', desc: 'Generate tagsnet only' } 
  ]
};
hexo.extend.console.register('net', 'Generate pages from net', options, function (args) {
  var names = [];

  if (names.length === 0) {
    names.push("tagsnet");
  }
  names.forEach(name => {
    hexo.extend.generator.register(name, require('./lib/' + name + '-generator'));
  })
  var self = this;
  var publicDir = self.public_dir;
  self.load().then(function () {
    if(!fs.existsSync(publicDir)){
      fs.mkdirSync(publicDir);
    }
    if(!fs.existsSync(path.join(publicDir,'assets'))){
      fs.mkdirSync(path.join(publicDir,'assets'));
    }
    names.forEach(name => {
      var id = name + "/index.html";
      self.route.get(id) && self.route.get(id)._data().then(function (contents) {
        fs.writeFile(path.join(publicDir, id), contents);
        log.info("Generated: %s", id);
      });
    });
  });
});


 