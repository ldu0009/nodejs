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
app.get('/topic',function(req,res){
  res.render('view');
})
app.get('/topic/new',function(req,res){
  res.render('new');
});

app.post('/topic',function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title,description,function(err){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.send('Success!');
  });
});

app.listen(port,function(){
  console.log(Date());
  console.log('Server Start!');
  console.log('PORT: '+port);
});
