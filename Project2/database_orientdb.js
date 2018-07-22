var OrientDB  = require('orientjs');


var server = OrientDB({
  host:'localhost',
  port:2424, //Basic port number of OrientDB
  username:'root',
  password:'4865Dla!'
});
var db = server.use('O2'); //server.user('Class name')

/*
db.record.get('#22:0')
.then(function(record){
  console.log('Loaded record:',record);
});
*/

// SELECT
/*
var sql = 'SELECT FROM topic'
db.query(sql).then(function(results){
  console.log(results);
});
*/

/*
var sql = 'SELECT FROM topic WHERE @rid=:rid';
var param = {
  params:{ //This name is promise. Don't rename
    rid:'#21:0'
  }
};
db.query(sql,param).then(function(results){
  console.log(results);
});
*/

//INSERT
/*
var sql = 'INSERT INTO topic (title, description) VALUES(:title, :desc)';
var param = {
  params:{
    title:'Express',
    desc:'Express is framwork for web'
  }
}
db.query(sql,param).then(function(results){
  console.log(results);
});
*/

//UPDATE
/*
var sql = 'UPDATE topic SET title=:title WHERE @rid=:rid';
db.query(sql,{params:{title:'Javascript',rid:'#21:0'}}).then(function(results){
  console.log(results);
});
*/

//DELETE
/*
var sql = 'DELETE FROM topic WHERE @rid=:rid';
db.query(sql,{params:{rid:'#23:0'}}).then(function(results){
  console.log(results);
});
*/
