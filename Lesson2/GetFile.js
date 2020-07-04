var fs=require('fs');


fs.stat('mytext.txt','r+',function(err,stats){
   if(err){
       console.log(err);
   }else{
       console.log(stats);
       console.log('File Opened successfully');
       console.log ("isFile ? " + stats.isFile());
       console.log ("isDirectory ? " + stats.isDirectory());
   }
});