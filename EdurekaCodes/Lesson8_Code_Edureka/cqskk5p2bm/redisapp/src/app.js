import express from 'express';
import redis from 'redis'
const app = express();
const port = 8088;

//Connecting redis
const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379
})

// default set zero
client.set('aprvisit', 0);

// Default route
app.get('/',(req,res) => {
    client.get('aprvisit', (err,aprvisit )=> {
        res.send('Number of visit is'+aprvisit);
        client.set('aprvisit', parseInt(aprvisit)+1)
    }) 
})

app.listen(port,() => {
    console.log('app is running on port'+ port)
})