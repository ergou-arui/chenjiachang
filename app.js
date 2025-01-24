const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// 保存 JSON 对象的接口
app.post('/api/save', (req, res) => {
    const jsonObject = req.body;
    fs.writeFile('data.json', JSON.stringify(jsonObject, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Error saving data');
        }
        res.send('Data saved successfully');
    });
});

// 获取数据的接口
app.get('/api/getdata', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }
        res.send(JSON.parse(data));
    });
});

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}/`);
});