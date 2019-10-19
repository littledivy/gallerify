var fs = require("fs");
var path = require('path');
var prepareHTML = require('./lib/render');

const imgFormats = ["png", "jpg", "gif" , "js", "md"];

var Gallerify = (dir, outDir) => {
    fs.readdir(dir, (err, files) => {
        var imageList = purify(parseFiles(files));
        prepareHTML(imageList, outDir);
    })
};

var parseFiles = (filename) => {
      return filename.map((file, index) => {
        if (imgFormats.includes(file.split('.')[1])) {
            return file;
        } 
    });
};

var purify = (list) => {
    var purified = [];
    for (var i = 0; i < list.length; i++) {
        if (list[i] !== undefined) {
            purified.push(path.join(__dirname, list[i]))
        }
    }
    return purified;
}

Gallerify(__dirname, 'test');

module.exports = Gallerify;