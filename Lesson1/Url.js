var url=require('url');
var adr='http://localhost:8080/default.html?year=2019&month=february';
var q=url.parse(adr,true);                //parse the url and return the url object as a property
console.log(q.host);
console.log(q.pathname);
console.log(q.search);