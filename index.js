var fs = require('fs');
var path = require('path');
var Canvas = require('canvas'),
  Image = Canvas.Image;


var img = new Image();
var start = new Date();
var text = "早安開心";

img.onload = function () {
  var width = img.width;
  var height = img.height;
  var canvas = new Canvas(width, height)
  var ctx = canvas.getContext('2d')
  var outputName = 'resize_' + start.getTime() + '.png';
  var out = 
  fs.createWriteStream(path.join(__dirname, outputName));
  
  ctx.imageSmoothingEnabled = true
  ctx.drawImage(img, 0, 0, width, height)

  ctx.font = 'bold 100px PMingLiU';
  ctx.strokeStyle = '#ff00ff';
  ctx.lineWidth = 12;
  ctx.strokeText(text, 150, height - 150);

  ctx.fillStyle = 'white';
  ctx.fillText(text, 150, height - 150);
  canvas.pngStream().pipe(out);

  out.on('finish', function () {
    console.log('Resized and saved:' + outputName);
  });

  out.on('data', function(chunk){
    out.write(chunk);
  });
   
  out.on('end', function(){
    console.log('saved png');
  });
}

text = process.argv[3];
img.src = (process.argv[2] || path.join(__dirname, 'demo.png'));

