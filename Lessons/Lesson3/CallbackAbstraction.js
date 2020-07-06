/*sum = (a,b,callback)=>{
    callback(a+b);
}*/

function sum(a,b,callback){
    callback(a+b);
}

var print = function(result)
{
    console.log(result);
}

var print1 = (result)=>
{
    console.log(result);
}

sum (4,5, function(result){
    console.log(result);
});

sum (8,9, function(result){
    console.log(result);
});

sum (7,3,print1);