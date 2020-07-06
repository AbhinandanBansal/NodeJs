var promise = new Promise(function(resolve,reject){
    const a = "Node.js";
    const b = "Node1.js";
    if (a == b)
    {
        resolve();
    }
    else
    {
        reject();
    }
})
.then(function(){
    console.log('Strings are same');
})
.catch(function(){
    console.log('Strings are not same');
})

var promise1 = new Promise(function(resolve,reject){
    reject('Failure')
}).then(function(value){
    console.log(value);
})
.catch(function(error){
    console.log("Error: " + error);
})

var promise2 = new Promise(function(resolve,reject){
    throw new Error('Got an error');
}).then(function(value){
    console.log(value);
})
.catch(function(error){
    console.log("Error: " + error);
})
