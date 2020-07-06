var promise = new Promise(function(resolve,reject){
    resolve(1);
})
.then(function(value){
    console.log("start delay");
    return 1;
})
.then(function(value){
    setTimeout(()=>{console.log("1 sec")}, value * 1000);
    return 2;
})
.then(function(value){
    setTimeout(()=>{console.log("3 sec")}, value * 1000);
    return 3;
})
.then(function(value){
    setTimeout(()=>{console.log("6 sec")}, value * 1000);
    return 4;
})
.catch(err=>{
    console.log(err);
})