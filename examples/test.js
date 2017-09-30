var gtm = require('nodem');
var db = new gtm.Gtm();
console.log('db = ' + JSON.stringify(db));
var ok = db.open();
console.log('ok = ' + JSON.stringify(ok));

console.log(db.version());

var node = {
  global: 'irelay',
  subscripts: ['a'],
  data: 'hello world'
};

db.set(node);

console.log(JSON.stringify(db.get(node)));


db.close();
