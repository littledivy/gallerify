var fs = require("fs");
var path = require("path");
var logger = require('./logger');
var go = new logger();

var imgSource = [];
var imgName;
var Render = (listOfImages, outDir) => {
    go.info('Starting to render the files').info('Checking for output directory')
    if (!fs.existsSync(path.join(process.cwd(), outDir))) {
        go.success('Created output directory')
        fs.mkdirSync(path.join(process.cwd(), outDir), {
            recursive: true
        });
    } else {
        go.warning(`Overriding ${outDir} as it already exists`);
    }
    fs.mkdirSync(path.join(process.cwd(), outDir, 'images'), {
         recursive: true
    })
    go
        .info('Creating images folder')
        .success('Created images folder')
    copyLgDir(outDir);
    for (var i = 0; i < listOfImages.length; i++) {
        imgName = listOfImages[i].split('/');
        imgName = listOfImages[i].split('/')[listOfImages[i].split('/').length - 1]
        imgSource.push(imgName);
        if (i === listOfImages.length - 1) {
                    go.success('Image source path set successfully')
                    startViewInit(outDir); 
        }
        go
            .info(`Copying ${imgName}`)
            .success(`Copied ${imgName} successfully`)
        
        fs.copyFile(
            listOfImages[i],
            path.join(process.cwd(), outDir, 'images',imgName),
            err => {
                if (err) throw err;
            }
        )
    }
    
};

var startViewInit = (outDir) => {
    go.info('Starting with webpage installation')
    var data = "";
    for (var x = 0; x < imgSource.length; x++) {
        data += ` <li class="col-xs-4 col-sm-1 col-md-3" data-responsive="images/${imgSource[x]}" data-src="images/${imgSource[x]}" data-sub-html="<h4>${imgSource[x]}</h4><p>Image index ${x}</p>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1"><img src="images/${imgSource[x]}" class="img-thumbnail" alt=""></li>`;
    }
    fs.readFile(path.join(__dirname, '../static/index.html'), 'utf-8', function (err, content) {
        go.info('Editing index.html').success('Rendered index.html')
        var finalHTML = content.replace("{{ output_here }}", data);
        fs.writeFile(path.join(outDir, 'index.html'), finalHTML, function (err) {
            go.success('Written index.html to disk')
        });
     });        
};

var copyLgDir = (outDir) => {
                go.info('Staring to copy assest into the assets folder');
                fs.mkdirSync(path.join(process.cwd(), outDir, 'assets'), {
                    recursive: true
                });
                go.success('Created assets folder');
                fs.copyFile(
                    path.join(__dirname, '../static/fp/lg/css/lightgallery.css'),
                    path.join(process.cwd(), outDir, 'assets/lightgallery.css'),
                    err => {
                        if (err) throw err;
                        go.info('Copying lightgallery.css')
                        fs.copyFile(
                            path.join(__dirname, '../static/fp/lg/js/lightgallery.js'),
                            path.join(process.cwd(), outDir, 'assets/lightgallery.js'),
                            err => {
                                if (err) throw err;
                                go.info('Copying lightgallery.js')
                                fs.copyFile(
                                    path.join(__dirname, '../static/fp/css/bootstrap.min.css'),
                                    path.join(process.cwd(), outDir, 'assets/bootstrap.css'),
                                    err => {
                                        if (err) throw err;
                                        go.info('Copying bootstrap.min.css')
                                        fs.copyFile(
                                            path.join(__dirname, '../static/fp/lg/fonts/lg.eot'),
                                            path.join(process.cwd(), outDir, 'assets/lg.eot'),
                                            err => {
                                                if (err) throw err;
                                                   go.info('Copying font lg.eot')
                                                    fs.copyFile(
                                                        path.join(__dirname, '../static/fp/lg/fonts/lg.ttf'),
                                                        path.join(process.cwd(), outDir, 'assets/lg.ttf'),
                                                        err => {
                                                            if (err) throw err;
                                                                go.info('Copying font lg.ttf')
                                                                fs.copyFile(
                                                                    path.join(__dirname, '../static/fp/lg/fonts/lg.woff'),
                                                                    path.join(process.cwd(), outDir, 'assets/lg.woff'),
                                                                    err => {
                                                                        if (err) throw err;
                                                                            go.info('Copying font lg.woff')
                                                                            fs.copyFile(
                                                                                path.join(__dirname, '../static/fp/lg/fonts/lg.svg'),
                                                                                path.join(process.cwd(), outDir, 'assets/lg.svg'),
                                                                                err => {
                                                                                    if (err) throw err;
                                                                                        go.info('Copying font lg.svg')
                                                                                        fs.copyFile(
                                                                                            path.join(__dirname, '../static/fp/lg/img/loading.gif'),
                                                                                            path.join(process.cwd(), outDir, 'assets/loading.gif'),
                                                                                            err => {
                                                                                                if (err) throw err;
                                                                                                go
                                                                                                    .info('Copying loading.gif')
                                                                                                    .success('Done copying all the assets')
                                                                                                    .end(path.join(process.cwd(), outDir, 'index.html'))
                                                                                            }
                                                                                        )
                                                                                }
                                                                            )
                                                                    }
                                                                )
                                                        }
                                                    )
                                            }
                                        )
                                    }
                                )
                            }
                        )
                     }
                )
}

module.exports = Render;