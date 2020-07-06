function delay(seconds,callback){
    setTimeout(callback,seconds*1000);
}

console.log("start delaying")

delay(2,function(error){
    if(error)
        {
            callback(error);
        }
    else 
        console.log("two seconds");
        /*delay(1,(error)=>{
            if(error)
                {
                    callback(error);
                }
            else 
                console.log("three seconds")
                delay(1,(error)=>{
                    if(error)
                    {
                        callback(error);
                    }
                    else 
                        console.log("four seconds")
                })
        })*/
})