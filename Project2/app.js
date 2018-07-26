var exp = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var OrientDB  = require('orientjs');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) { //저장될 파일의 이름을 설정할 수 있는 부분0
    var str = file.originalname;
    var buff = str.split('.');
    var tmp = buff[0];
    var files = fs.readdirSync('uploads/');
    var flag = 1;
    for(var i = 0; i<files.length; i++){
      console.log('('+i+')'+buff+'=='+files[i]);
      if(files[i]==(buff[0]+'.'+buff[1])){ //같은 이름의 파일이 있으면 순자를 붙여주는 기능을 추가
        buff[0] = tmp+'('+flag+')';
        i=-1; //for문이 끝나고 i++ 되기 때문에
        flag = flag + 1;
      }
    }
    cb(null, (buff[0]+'.'+buff[1]));
  }
});
var upload = multer({ storage: storage }); //multer라는 함수에 옵션을 주는 구문 (이 함수는 upload를 하는 미들웨어라고 선언.)
var fs = require('fs');
var app = exp();
var port = 3000;
var server = OrientDB({
  host:'localhost',
  port:2424, //Basic port number of OrientDB
  username:'root',
  password:'4865Dla!'
});
var db = server.use('O2'); //server.user('Class name')

app.locals.pretty = true;

app.use(bodyParser.urlencoded({extended: false}));

app.set('views','./views');
app.set('view engine','Jade');

app.get('/',function(req,res){
  res.render('main');
});
app.get(['/topic','/topic/:id','/topic/:id/edit'],function(req,res){
  var sql = 'SELECT FROM topic';
  db.query(sql).then(function(topics){
    var sql = 'SELECT FROM topic WHERE @rid=:rid';
    var id = req.params.id;
    console.log(req.url.split('/'));
    db.query(sql,{params:{rid:id}}).then(function(topic){
      if(id=='new'){
        res.render('new',{topics:topics,topic:topic[0]});
      } else if(id){
        if(req.url.split('/')[3]=='edit'){
          db.query(sql,{params:{rid:id}}).then(function(topic){
            res.render('edit',{topics:topics,topic:topic[0]});
          })
        } else{
          res.render('view',{topics:topics,topic:topic[0]});
        }
      } else{
        res.render('view',{topics:topics});
      }
    });
  });
});
app.get('/upload',function(req,res){
  res.render('upload_form');
})

app.post('/upload',upload.single('userfile'),function(req,res){
  console.log(req.file);
  res.send('Uploaded: '+req.file.filename);
})
app.post('/topic/new',function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'INSERT INTO topic (title,description,author) VALUES (:title,:description,:author)'
  db.query(sql,{params:{title:title,description:description,author:author}}).then(function(results){
    res.redirect('/topic/'+encodeURIComponent(results[0]['@rid']));
  });
});
app.post('/topic/:id/edit',function(req,res){
  var id = req.params.id;
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'UPDATE topic SET title=:title,description=:description,author=:author WHERE @rid=:rid'
  db.query(sql,{params:{title:title,description:description,author:author,rid:id}}).then(function(results){
    console.log(id);
    res.redirect('/topic/'+encodeURIComponent(id));
  });
});

app.listen(port,function(){
  console.log(Date());
  console.log('Server Start!');
  console.log('PORT: '+port);
});
