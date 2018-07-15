/*
This code is Synchronism testing
*/

var fs = require('fs');
console.log('Sync test');
var data1 = fs.readFileSync('test_text.txt',{encoding:'utf8'}); //readFile(파일명,옵션)
console.log(data1);

console.log('AnSync test');
var data2 = fs.readFile('test_text.txt',{encoding:'utf8'},function(err,data){console.log(data);}); //readFile(파일명,옵션)
console.log(data2);
