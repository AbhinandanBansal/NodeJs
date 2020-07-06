var getUserDetails = new Promise(function(resolve,reject){
    console.log("User Details Retrieved");
    resolve();
}).then(()=>{
    throw new Error("Something Failed");
    console.log("Do this");
}).catch(()=>{
    console.log("Do that");
}).then(()=>{
    console.log("Do this, no matter what happend before");
})