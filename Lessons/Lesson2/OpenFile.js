var fs=require('fs');


fs.open('mytext.txt','r+',function(err,filedata){
   if(err){
       console.log(err);
   }else{
       console.log('File Opened successfully');
   }
});

fs.open('mytext.txt','r+',function(error,fd){
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log('File Opened successfully');
    }
})