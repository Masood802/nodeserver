const axios = require('axios').default;
const express = require('express');
const cors = require('cors');
app = express();
app.use(cors());
app.use(express.json());
const port = process.env.port || 5000;
const timeout = ms => new Promise(res => setTimeout(res, ms))
app.listen(port, () => {
    console.log(`server is running at:${port}`)
})
app.get('/all', async (req, res) => {
    let data = [];
    try {
        axios.get('http://themealdb.com/api/json/v1/1/categories.php').then(resp => {
            data = resp.data.categories;
            
        });
        await timeout(2000);
        console.log(data)
        res.send(data)
        
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
    
})
app.get("/", (req, res) => {
    res.send('Welcome to get Dishes Data');
})
app.post('/details',async (req,res)=>{
    const id = 52772;
    const item = {};
    try {
        axios.post(`http://themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(resp => {
        console.log('psot data',resp.data)
        item = resp.data
    })    
    } catch (err) {
        res.status(500).json({ message: 'data not found' });
    }
    
})
