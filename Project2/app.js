var exp = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
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

app.locals.pretty = true;

app.use(bodyParser.urlencoded({extended: false}));

app.set('views','./views');
app.set('view engine','Jade');

app.get('/',function(req,res){
  res.render('main');
});
app.get(['/topic','/topic/:id'],function(req,res){
  var id = req.params.id;
  fs.readdir('data',function(err,files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error'); //500 서버상에 오류가 있다는 의미
    }

    if(id=='new'){
      res.render('new',{topics:files});
    } else if(id){
      fs.readFile('data/'+id,'utf8',function(err,data){ //encoding을 하지 않으면 Download가 된다.
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error'); //500 서버상에 오류가 있다는 의미
        }
        res.render('view',{topics:files,title: id, description: data});
      });
    } else{
      res.render('view',{topics:files,title: 'Welcome', description: 'Hello, Javascript for server.'});
    }
  });
});
app.get('/upload',function(req,res){
  res.render('upload_form');
})

app.post('/upload',upload.single('userfile'),function(req,res){
  console.log(req.file);
  res.send('Uploaded: '+req.file.filename);
})
app.post('/topic',function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title,description,function(err){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error'); //500 서버상에 오류가 있다는 의미
    }
    res.redirect('topic');
  });
});

app.listen(port,function(){
  console.log(Date());
  console.log('Server Start!');
  console.log('PORT: '+port);
});
