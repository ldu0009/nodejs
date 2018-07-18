var exp = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = exp();
var port = 3000;

app.locals.pretty = true;

app.use(bodyParser.urlencoded({extended: false}));

app.set('views','./views');
app.set('view engine','Jade');

app.get('/',function(req,res){
  res.send('<h1>Main page</h1>');
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

app.post('/topic',function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title,description,function(err){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error'); //500 서버상에 오류가 있다는 의미
    }
    res.redirect('/topic/'+title);
  });
});

app.listen(port,function(){
  console.log(Date());
  console.log('Server Start!');
  console.log('PORT: '+port);
});
