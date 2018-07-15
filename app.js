/*
This code is Main application.
*/
var exp = require('express'); //Web application을 만들기 위한 모듈
var app = exp(); //application을 리턴한다.
app.use(exp.static('public')); //이 디렉토리에 html파일을 저장하면 서버의 reboot없이 페이지를 바꿀 수 있다. 정적
app.get('/',function(req, res){ //Homepage로 접속하였을때
  res.send('Hello!');
});
app.get('/dynamic',function(req, res){ //Homepage로 접속하였을때
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
}); //이렇게 하면 서버를 reboot하지 않는 이상 바뀌지 않는다. 동적
app.get('/route',function(req, res){ //Homepage로 접속하였을때
  res.send('<h1>Hello Router!<h1> <img src="/test_image.gif">');
});
app.get('/login',function(req, res){
  res.send('<h1>login Please<h1>');
});
app.listen(3000,function(){
  console.log('Connected 3000 Port!');
});
