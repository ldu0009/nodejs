/*
This code is Main application.
*/
var exp = require('express'); //Web application을 만들기 위한 모듈
var app = exp(); //application을 리턴한다.
app.locals.pretty = true; //jade로 렌더링 된 html코드를 보기 pretty하게 만들어 준다.
app.set('view engine','jade'); //'jade'라는 탬플릿 엔진을 사용한다.
app.set('views','./views') //두 번째 인자에 맞는 이름의 디렉토리가 생성되있어야 한다. 기본 값은 view이다.
app.use(exp.static('public')); //이 디렉토리에 html파일을 저장하면 html파일의 수정을 서버의 reboot없이 페이지에 적용 시킬 수 있다. 정적
app.get('/topic',function(req,res){
  var topics = [
    'Javascropt is ...',
    'Nodejs is ...',
    'Express is ...'
  ];
  var output = `
<a href="/topic?id=0">JavaScript</a><br>
<a href="/topic?id=1">Nodefs</a><br>
<a href="/topic?id=2">Express</a><br>
${topics[req.query.id]}
  `
  res.send(output);
});
app.get('/template',function(req,res){
  res.render('temp',{time:Date(),_title:'Jade'}); //Tamplate engine을 사용하면 send가 아니라 render를 사용해야 한다.
                                                  //template라는 경로로 들어온 사용자에게는 temp라는 파일을 렌더링 해준다.
                                                  //temp파일은 위에서 설정한 /view라는 경로에 있어야 한다.
                                                  //위에서 설정한 Template engine인 jade의 문법에 맡게 respon한다.
                                                  //++두번째 인자로 객체를 전달해주면 jade는 그 변수들을 사용할 수 있어진다.
});
app.get('/',function(req, res){ //Homepage로 접속하였을때
  res.send('Hello!');
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
app.get('/route',function(req, res){ //Homepage로 접속하였을때
  res.send('<h1>Hello Router!<h1> <img src="/test_image.gif">');
});
app.get('/login',function(req, res){
  res.send('<h1>login Please<h1>');
});
app.listen(3000,function(){
  console.log('Connected 3000 Port!');
});
