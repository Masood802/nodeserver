const axios = require('axios').default;
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const port = process.env.port || 5000;
app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
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
    const id = req.body.id;
    let item = {};
    try {
        axios.post(`http://themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(resp => {
        console.log('post data',resp.data)
        item = resp.data
        })
        await timeout(2000);
        if (item != null) {
            res.send(item);    
        }
        else {
            res.send('Id does not axist');
         }  
    } catch (err) {
        res.status(500).json({ message: 'data not found' });
    }
    
})
app.post('/categorywise-list', async(req, res) => {
    const category = req.body.category;
    let list = [];
    try {
        axios.post(`http://themealdb.com/api/json/v1/1/filter.php?c=${category}`).then(resp => {
        console.log(resp.data)
        list = resp.data;
        })
        await timeout(2000);
        res.send(list);
    } catch (err) {
        res.status(500).json({ message: 'data not found' });
    }
    })
