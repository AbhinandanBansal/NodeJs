var getUserDetails = new Promise(function(resolve){
    setTimeout(()=>resolve(1),1000);
})

getUserDetails.then(function(result) {
    console.log(result);
    return (result * 2);
});

getUserDetails.then(function(result) {
    console.log(result);
    return (result * 2);
});

getUserDetails.then(function(result) {
    console.log(result);
    return (result * 2);
});