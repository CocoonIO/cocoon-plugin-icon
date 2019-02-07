var fs = require('fs');
var path = require('path');
var sizeOf = require('image-size');

module.exports = function(context) {
    if (context.opts.cordova.platforms.indexOf('ios') <= -1)
        return;

    // Get the ios project name
    var ios_path = fs.readdirSync(path.join(context.opts.projectRoot, "platforms", "ios"));
    var xcodeproj_path = ios_path.filter(function(item) { 
        return item.indexOf("xcodeproj") !== -1; 
    })[0];
    var project_name = xcodeproj_path.substring(0, xcodeproj_path.lastIndexOf("."));

    // Now we create the Launch Images from the user's splash screen
    var icons_path = path.join(context.opts.projectRoot, 'platforms', 'ios', project_name, 'Images.xcassets', 'AppIcon.appiconset');
    if (!fs.existsSync(icons_path)) {
        throw Error("Can't find icons directory: " + icons_path);
    }

    var shell = context.requireCordovaModule('shelljs');
    var icons = fs.readdirSync(icons_path);
    icons.forEach(function(icon) {
        try {
            // Get the original icon dimensions
            var dst_image_path = path.join(icons_path, icon);
            var dimensions = sizeOf(dst_image_path);

            var src_image_file = path.join(context.opts.projectRoot, '..', 'icons', 'ios.png');
            if (fs.existsSync(src_image_file)) {
                // Overwrite the destination icon
                var data = fs.readFileSync(src_image_file);
                fs.writeFileSync(dst_image_path, data);

                // Resize the copied icon with the original icon dimensions
	              var cmd = shell.exec('convert "' + src_image_file + '" -resize ' + dimensions.width + 'x' + dimensions.height + ' "' + dst_image_path + '"');
                if(cmd.code !== 0) {
                    console.log("Error resizing " + dst_image_path);
                }
            }
            
        } catch (e) {
            console.warn("Ignoring: " + icon);
        }
    });
}