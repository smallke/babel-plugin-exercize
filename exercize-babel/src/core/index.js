const parser = require('../parser');
const traverse = require('../traverse');
const generate = require('../generator');
const template = require('../template');

function transformSync(code, options) {
    const ast = parser.parse(code, options.parserOpts);

    const pluginApi = {
        template
    }
    const visitors = {};
    options.plugins.forEach(([plugin, options]) => {
        const res = plugin(pluginApi, options);
        Object.assign(visitors, res.visitor);
    })

    traverse(ast, visitors);
    return generate(ast);
}

module.exports = {
    transformSync
}