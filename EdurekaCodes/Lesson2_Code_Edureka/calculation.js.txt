var a = parseInt(process.argv[2]);
var b = process.argv[3];
var c = parseInt(process.argv[4]);

if (b == '+'){
   answer = a + c;
}else if(b == '-'){
   answer = a - c;
}else if(b == '/'){
    answer = a / c;
}else if(b == '*'){
    answer = a * c;
}

console.log('The answer is : '+answer);
      