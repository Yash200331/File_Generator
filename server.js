const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Set view engine to use EJS
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    let arr=[];
    fs.readdir(`./files`, function(err, files){
        files.forEach(file => {
            const fn = path.parse(file).name;
            var data = fs.readFileSync(`./files/${file}`,'utf-8')
            arr.push({name:fn,filecontent:data})
        })
        res.render('index',{files:arr})
    })
})

app.get('/files/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`,'utf-8',function(err, filedata){
        console.log(filedata);
        
    })
})


app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.name.split(' ').join('')+'.txt'}`,req.body.details,function(err){
        res.redirect('/')
    })
})
// Start the server

app.listen(3000)
