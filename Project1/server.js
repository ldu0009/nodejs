/*
This code is testing server. don't have function.
*/

var http = require('http'); //웹서버를 제작하기 위한 모듈인 http를 사용한다.

var hostname = '127.0.0.1';
var port = 1337;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/*
This code is the same code as the above function, but it is a bit long code written.

======================================================================================
var server =  http.createServer(function(req,res){
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('Hello World\d');
}); //server를 만들고 그것을 제어할 수 있는 객체를 리턴
server.listen(port, hostname,function(){
  console.log(`Server running at http://${hostname}:${port}/`);
}); //server가 어떤 방식으로 들어온 사용자를 받아낼지 바라보게 한다. listen은 비동기 메소드이다.
======================================================================================
*/
