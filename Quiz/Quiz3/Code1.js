const firstUser = function() {
    console.log("UserOne");
}

const secondUser = function() {
    console.log("UserTwo");
}

const sampleFunction = () => {
    console.log("sampleFunction");
    setTimeout(firstUser,0);
    secondUser();
}

sampleFunction();