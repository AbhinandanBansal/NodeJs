const request = require('request');

const url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

request(url, {json: true},function(err,res,body){
    console.log(body.url);
    console.log(body.explanation);
})

