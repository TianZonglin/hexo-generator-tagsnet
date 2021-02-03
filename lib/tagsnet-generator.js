'use strict';
var request = require('urllib-sync').request;
var ejs = require('ejs');
var xpath = require('xpath');
var path = require('path');
var Dom = require('xmldom').DOMParser;
var offline = false;
var log = require('hexo-log')({
    debug: false,
    silent: false
});
var Hexo = require('hexo');
var hexo = new Hexo(process.cwd(), {});
hexo.load().then(function(){});
var lenAYY = 0;
function resolv() {
    var posts = hexo.locals.get('posts');
    var tagsMap = new Map(); 
    for(var i = 0; i< posts.length; i++){
      var nameCS;
      posts.data[i].categories.forEach(function(k, v) {
        nameCS = k.name;
        return;
      })
      for(var j = 0; j< posts.data[i].tags.length; j++){
        var pname = posts.data[i].tags.data[j].name;
        var pval = tagsMap.get(pname);
        if(pval != null){  
          tagsMap.set(nameCS+">"+pname, parseInt(tagsMap.get(pname))+1);
        }else{
          // 
          tagsMap.set(nameCS+">"+pname, 1);  
        }
      }
    }
    let obj= [];
    let setss =  new Map();
    for (let[k,v] of tagsMap) {
        var st = k.split(">");
        var str = {};
        str.source = st[0];
        str.target = st[1];
        str.value  = v;
      obj.push(str);
      if(setss.get(st[0]) != null){  
        setss.set(st[0], parseInt(setss.get(st[0]))+100);
      }else{
        setss.set(st[0], 100);
      }
      if(setss.get(st[1].trim()) != null){  
        setss.set(st[1], parseInt(setss.get(st[1]))+1);
        setss.set(st[0], parseInt(setss.get(st[0]))+100);
      }else{
        setss.set(st[1], 1);
        setss.set(st[0], parseInt(setss.get(st[0]))+100);
      }
    }
    let obk= [];
    for (let [k,v] of setss) {	 
        var str = {};
        str.id = k.trim();
        str.group = v; 
        obk.push(str);
    }
    let d3str = {};
    d3str.nodes = obk;
    d3str.links = obj;
    lenAYY = d3str.nodes.length;
    return d3str;
}
module.exports = function (locals) {
    var config = this.config;
    if (!config.tagsnet || !config.tagsnet.svg) {
        return;
    }
    var root = config.root;
    if (root.endsWith('/')) {
        root = root.slice(0, root.length - 1);
    }
    var startTime = new Date().getTime();
    var jsons = resolv();
    var endTime = new Date().getTime();
    var offlinePrompt = offline ? ", because you are offline or your network is bad" : "";
    log.info('// tagsnet // '+lenAYY + ' nodes have been loaded in ' + (endTime - startTime) + " ms" + offlinePrompt);
    var contents = ejs.renderFile(path.join(__dirname, 'templates/tagsnet.ejs'), {
        'quote': config.tagsnet.quote,
        'svg_big_color': config.tagsnet.svg.svg_big_color,
        'svg_small_color': config.tagsnet.svg.svg_small_color,
        'svg_line_color': config.tagsnet.svg.svg_line_color,
        "svg_line_weight":config.tagsnet.svg.svg_line_weight,
        "svg_text_weight":config.tagsnet.svg.svg_text_weight,
        "svg_width":config.tagsnet.svg.svg_width,
        "svg_height":config.tagsnet.svg.svg_exheight, 
        "svg_bgcolor":config.tagsnet.svg.svg_bgcolor,
        "svg_force":config.tagsnet.svg.svg_force,
        "valineid":config.tagsnet.valine.app_id, 
        "valinekey":config.tagsnet.valine.app_key, 
        'jsons': jsons
    },
        function (err, result) {
            if (err) console.log(err);
            return result;
        });
    return {
        path: 'tagsnet/index.html',
        data: {
            title: config.tagsnet.title,
            content: contents,
            slug: 'tagsnet'
        },
        layout: ['post']
    };
};