var fs = require('fs');
var path = require('path');
var sizeOf = require('image-size');
var os = require('os');

module.exports = function(context) {
    if (context.opts.cordova.platforms.indexOf('android') <= -1)
        return;

    var src_image_file = path.join(context.opts.projectRoot, '..', 'icons', 'android.png');
    var res_path = path.join(context.opts.projectRoot, "platforms", "android", "app", "src", "main", "res");
    var icons = fs.readdirSync(res_path);

    icons.forEach(function(icon) {
        icon = path.join(icon, "icon.png");

        try {
            // Get the original icon dimensions
            var dst_image_path = path.join(res_path, icon);
            var dimensions = sizeOf(dst_image_path);
            
            var shell = context.requireCordovaModule('shelljs');
            var src_image_file = path.join(context.opts.projectRoot, '..', 'icons', 'android.png');
            if (fs.existsSync(src_image_file)) {                
                // Overwrite the destination icon
                var data = fs.readFileSync(src_image_file);
                fs.writeFileSync(dst_image_path, data); 

                // Resize the copied icon with the original icon dimensions
                if (os.platform() === "win32") {
                    var cmd = shell.exec(path.join(path.join("c:", "cygwin64", "bin", "convert.exe")) + ' "' + src_image_file + '" -resize ' + dimensions.width + 'x' + dimensions.height + ' ' + dst_image_path);
                    if(cmd.code !== 0) {
                        console.log("Error resizing " + dst_image_path);
                    }

                } else {
                    var cmd = shell.exec('convert "' + src_image_file + '" -resize ' + dimensions.width + 'x' + dimensions.height + ' "' + dst_image_path + '"');
                    if(cmd.code !== 0) {
                        console.log("Error resizing " + dst_image_path);
                    }
                }
            }
            
        } catch (e) {}

    });
}