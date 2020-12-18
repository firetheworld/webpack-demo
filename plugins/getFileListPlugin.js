class GetFileListPlugin {
    constructor(options) {
        console.log("constructor options", options);
    }

    apply(complier) {
        complier.plugin("emit", (compilation, callback) => {
            var filelist = 'In this build:\n\n';
            for (var filename in compilation.assets) {
                filelist += ("- " + filename + "\n");
            }

            compilation.assets['filelist.md'] = {
                source: () => filelist,
                size: () => filelist.length
            }

            callback();
        })
    }
}

module.exports = GetFileListPlugin;