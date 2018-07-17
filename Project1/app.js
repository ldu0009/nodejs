/*
This code is Main application.
*/
var exp = require('express'); //Web application을 만들기 위한 모듈
var bodyParser = require('body-parser');
var app = exp(); //application을 리턴한다.

app.locals.pretty = true; //jade로 렌더링 된 html코드를 보기 pretty하게 만들어 준다.

app.set('view engine','jade');
//'jade'라는 탬플릿 엔진을 사용한다.
app.set('views','./views') //두 번째 인자에 맞는 이름의 디렉토리가 생성되있어야 한다. 기본 값은 view이다.

app.use(exp.static('public')); //이 디렉토리에 html파일을 저장하면 html파일의 수정을 서버의 reboot없이 페이지에 적용 시킬 수 있다. 정적
app.use(bodyParser.urlencoded({extended: false})); //body-parser라는 모듈을 사용하면 이 application은 모든 요청을 bodyParser을 거친 후 라우터로 보낸다.
                                                   //그리고 POST 형태로 전송한 데이터의 req에 body라는 객체가 추가되어 사용자가 보낸 데이터를 활용할 수 있다.

//Homepage로 접속하였을때
app.get('/',function(req, res){
  res.send('Hello!');
});
app.get('/login',function(req, res){
  res.send('<h1>login Please<h1>');
});
app.get('/route',function(req, res){
  res.send('<h1>Hello Router!<h1> <img src="/test_image.gif">');
});
app.get('/template',function(req,res){
  res.render('temp',{time:Date(),_title:'Jade'}); //Tamplate engine을 사용하면 send가 아니라 render를 사용해야 한다.
                                                  //template라는 경로로 들어온 사용자에게는 temp라는 파일을 렌더링 해준다.
                                                  //temp파일은 위에서 설정한 /view라는 경로에 있어야 한다.
                                                  //위에서 설정한 Template engine인 jade의 문법에 맡게 respon한다.
                                                  //++두번째 인자로 객체를 전달해주면 jade는 그 변수들을 사용할 수 있어진다.
});
app.get('/dynamic',function(req, res){
  var lis = '';
  var time = Date()
  for(var i=0;i<5;i++){
    lis=lis+'<li>testing</li>';
  }
  var output = `<!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
        Hello Static! second screen!
        <ul>
        ${lis}
        <ul>
        ${time}
      </body>
    </html>
  `
  res.send(output);
}); //ㅣ이 방식의 코딩은 내용을 수정시 서버를 reboot해야한다. 동적
//query 방식의 URL은 req의 query라는 객체에 사용자가 입력한 정보를 알 수 있다.
//ex)localhost:3000/topic?id=1에서 id=1부분
//simentic 방식의 URL은 req의 params라는 객체에 사용자가 입력한 정보를 알 수 있다.
//ex)localhost:3000/topic/1에서 1부분 사용하기 위해선 라우터에게 topic/:id라고 명시해줘야 한다.
app.get('/topic/:id',function(req,res){
  var topics = [
    'Javascropt is ...',
    'Nodejs is ...',
    'Express is ...'
  ];
  /*
  //query 방식의 코드
  var output = `
    <a href="/topic?id=0">JavaScript</a><br>
    <a href="/topic?id=1">Nodefs</a><br>
    <a href="/topic?id=2">Express</a><br>
    ${topics[req.query.id]}
  `*/

  //simentic 방식의 코드
  var output = `
    <a href="/topic?id=0">JavaScript</a><br>
    <a href="/topic?id=1">Nodefs</a><br>
    <a href="/topic?id=2">Express</a><br>
    ${topics[req.params.id]}
  `
  res.send(output);
});
app.get('/topic/:id/:mode',function(req,res){
  res.send(req.params.id+','+req.params.mode);
});
app.get('/form',function(req, res){
  res.render('form');
});
//GET방식의 사용자 입력 정보 받아오기
app.get('/form_receiver',function(req,res){
  res.send('Hello, GET');
  /*
  var title = req.query.title;
  var description = req.query.description;

  res.send('title:'+title+' description:'+description);
  */
});
//POST방식의 사용자 입력 정보 받아오기
app.post('/form_receiver',function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  //res.send('Hello, POST');
  res.send(title+' '+description);
});

app.listen(3000,function(){
  console.log('Connected 3000 Port!');
});
