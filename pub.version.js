var fs = require('fs');
var path = require('path');
var cwd = process.cwd();
var file = path.join(cwd, './package.json');

var result = JSON.parse(fs.readFileSync(file));

var _version = result.version.split('.');
_version[2]++;
result.version = _version.join('.');


fs.writeFileSync(file, JSON.stringify(result));