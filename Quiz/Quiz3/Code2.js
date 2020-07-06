const { resolve } = require("path");
const { concatSeries } = require("async");

const firstUser = function() {
    console.log("UserOne");
}

const secondUser = function() {
    console.log("UserTwo");
}

const sampleFunction = () => {
    console.log("sampleFunction");
    setTimeout(firstUser,0);
    new Promise(function(resolve) {  
        resolve('Resolved Data')
    }).then(value => console.log(value));
    secondUser();
}

sampleFunction();