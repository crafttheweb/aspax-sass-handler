var findImports, fs, path, regex, sass,
indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

fs = require('fs');

path = require('path');

sass = require('node-sass');

regex = /@import\s+['"]([^'"]+)/gi;

exports.findImports = findImports = function(imports, file, callback) {
  var i, item, len, match, newImports;
  await(fs.readFile(file, 'utf8', defer(err, contents)));
  if (err) {
    return callback(err);
  }
  newImports = [];
  while (match = regex.exec(contents)) {
    item = match[1];
    if (path.extname(item) === '') {
      item += '.scss';
    }
    item = path.resolve(path.dirname(file), item);
    if (indexOf.call(imports, item) < 0) {
      newImports.push(item);
      imports.push(item);
    }
  }
  for (i = 0, len = newImports.length; i < len; i++) {
    item = newImports[i];
    await(findImports(imports, item, defer(err)));
    if (err) {
      return callback(err);
    }
  }
  return callback();
};

exports.compile = function(file, flags, callback) {
  await(fs.readFile(file, 'utf8', defer(err, contents)));

  if (err) {
    return callback(err);
  }
  
  await(sass.render({
    file: file
    }, function(error, result) { // node-style callback from v3.0.0 onwards 
      if (error) {
        console.log(error.status); // used to be "code" in v2x and below 
        console.log(error.column);
        console.log(error.message);
        console.log(error.line);
      }
      else {
        console.log(result.css.toString());

        console.log(result.stats);

        console.log(result.map.toString());
        // or better 
        console.log(JSON.stringify(result.map)); // note, JSON.stringify accepts Buffer too 
      }
    });
  return callback(null, output.css);
};
