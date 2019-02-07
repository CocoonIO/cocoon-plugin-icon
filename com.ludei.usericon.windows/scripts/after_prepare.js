var fs = require('fs');
var path = require('path');
var sizeOf = require('image-size');
var os = require('os');

module.exports = function(context) {
    if (context.opts.cordova.platforms.indexOf('windows') <= -1)
        return;

    var src_image_file = path.join(context.opts.projectRoot, '..', 'icons', 'windows.png');
    // var dst_image_path = path.join(context.opts.projectRoot, "platforms", "ubuntu", "build", "default_icon.png");

    // try {
    //     // Get the original icon dimensions
    //     var dimensions = sizeOf(dst_image_path);
    //     var shell = context.requireCordovaModule('shelljs');
    //     if (fs.existsSync(src_image_file)) {                
    //         // Overwrite the destination icon
    //         var data = fs.readFileSync(src_image_file);
    //         fs.writeFileSync(dst_image_path, data); 

    //         // Resize the copied icon with the original icon dimensions
    //         if (os.platform() === "darwin") {          
    //             var cmd = shell.exec('sips -z ' + dimensions.width + ' ' + dimensions.height + ' "' + dst_image_path + '"');
    //             if(cmd.code !== 0) {
    //                 console.log("Error resizing " + dst_image_path);
    //             }       
                
    //         } else {
    //             var cmd = shell.exec('convert "' + src_image_file + '" -resize ' + dimensions.width + 'x' + dimensions.height + ' ' + dst_image_path);
    //             if(cmd.code !== 0) {
    //                 console.log("Error resizing " + dst_image_path);
    //             }
    //         }
    //     }
        
    // } catch (e) {
    //     console.warn("Ignoring: " + dst_image_path);
    // }
}