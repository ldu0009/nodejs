/*
This code is testing the using underscore package
*/
var _ = require('underscore'); //모듈을 사용할 수 있는 객체를 return & underscore는  변수를 _로 하는 재미있는 관심이 있다.
var arr = [3,6,9,1,12];
console.log(arr[0]);
console.log(_.first(arr)); //입력 값의 배열 첫번째 원소
console.log(_.last(arr)); //입력 값 배열의 마지막 원소
