console.log("Hello World");
const os = require("os");
const path = require("path");
console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);

const { format } = require('date-fns');
const { v4: uuid } = require('uuid')

console.log(uuid())

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))
console.log(uuid())
