var fs = require("fs");
var path = require("path");
var imgSource = [];
var imgName;
var Render = (listOfImages, outDir) => {
    if (!fs.existsSync(path.join(process.cwd(), outDir))) {
        fs.mkdirSync(path.join(process.cwd(), outDir), {
            recursive: true
        });
    }
    fs.mkdirSync(path.join(process.cwd(), outDir, 'images'), {
         recursive: true
    })
    for (var i = 0; i < listOfImages.length; i++) {
        imgName = listOfImages[i].split('/');
        imgName = listOfImages[i].split('/')[listOfImages[i].split('/').length - 1]
        imgSource.push(imgName);
          if (i === listOfImages.length - 1) {
                    startViewInit(outDir); 
        }
        fs.copyFile(
            listOfImages[i],
            path.join(process.cwd(), outDir, 'images',imgName),
            err => {
                if (err) throw err;
                fs.mkdirSync(path.join(process.cwd(), outDir, 'lg'), {
                    recursive: true
                });
                fs.copyFile(
                    path.join(__dirname, '../static/fp/lg/css/lightgallery.min.css'),
                    path.join(process.cwd(), outDir, 'lg/lightgallery.css'),
                    err => {
                        if (err) throw err;
                        fs.copyFile(
                            path.join(__dirname, '../static/fp/lg/js/lightgallery.min.js'),
                            path.join(process.cwd(), outDir, 'lg/lightgallery.js'),
                            err => {
                                if (err) throw err;
                                console.log('Done')
                            }
                        )
                     }
                )
            }
        )
    }
    
};

var startViewInit = (outDir) => {
    var data = "";
    for (var x = 0; x < imgSource.length; x++) {
        data += ` <li class="col-xs-4 col-sm-1 col-md-3" data-responsive="images/${imgSource[x]}" data-src="images/${imgSource[x]}" data-sub-html="<h4>${imgSource[x]}</h4><p>Image index ${x}</p>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1"><img src="images/${imgSource[x]}" class="img-thumbnail" alt=""></li>`;
    }
    fs.readFile(path.join('static/index.html'), 'utf-8', function (err, content) {
        var finalHTML = content.replace("{{ output_here }}", data);
        fs.writeFile(path.join(outDir, 'index.html'), finalHTML, function (err) {
            console.log('Done')
        });
     });        
};

var copyLgDir = (outDir) => {
    fs.readdir(path.join(__dirname, ))
}

module.exports = Render;