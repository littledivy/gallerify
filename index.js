var fs = require("fs");
var path = require('path');
var prepareHTML = require('./lib/render');
var logger = require('./lib/logger');
var go = new logger();

const imgFormats = ["png", "jpg", "gif"];

var Gallerify = (dir, outDir) => {
    fs.readdir(dir, (err, files) => {
        go.info(`Reading directory ${dir}`)
        var imageList = purify(parseFiles(files));
        go.success('Image array has been purified successfully')
        prepareHTML(imageList, outDir);
    })
};

var parseFiles = (filename) => {
     go.success(`Read image directory successfully`)
      return filename.map((file, index) => {
          if (imgFormats.includes(file.split('.')[1])) {
            go.info(`Found as ${file.split('.')[1]} file as ${file}`)
            return file;
        } 
    });
};

var purify = (list) => {
    go
        .success('Parsed file types successfully.')
        .info('Purifying the file arrays')
    var purified = [];
    for (var i = 0; i < list.length; i++) {
        if (list[i] !== undefined) {
            purified.push(path.join(process.cwd(), list[i]))
            go.info(`Entering ${list[i]}`)
        }
    }
    return purified;
}

module.exports = Gallerify;