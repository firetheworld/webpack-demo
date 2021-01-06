const t = require('@babel/types');

module.exports = function () {
    console.log("loader plugin");
    return {
        visitor: {
            MemberExpression(path, state) {
                if(t.isIdentifier(path.node.object, {name: "JSON"}) && t.isIdentifier(path.node.property, {name: "parse"})) {
                    let hasTrycatch = false;
                    path.findParent((p) => {
                        hasTrycatch = t.isTryStatement(p);
                        console.log("find parent", hasTrycatch);
                        return hasTrycatch;
                    });
                    console.log("finish find parent", hasTrycatch);
                    if (!hasTrycatch) {
                        // throw path.buildCodeFrameError("JSON.parse NOT IN TRY CATCH");
                        let file = state.file.opts.filename;
                        let value = `${file} (${path.node.loc.start.line}:${path.node.loc.start.column})`
                        console.log("JSON.parse NOT IN TRY CATCH" , state.file.opts);
                        console.log("JSON.parse IN " , value);
                    }
                }
            }
        }
    }
}