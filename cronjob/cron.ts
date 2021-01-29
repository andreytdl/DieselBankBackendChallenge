import { schedule } from 'node-cron';
import express from 'express';
import axios from 'axios'

const app = express();

schedule("* * * * *", async () => {
    console.log("Cronjob running once a minute")
    const response = await axios.post('http://localhost:3333/cronjob')
    console.log(response.data)
})
    
app.listen(1313);