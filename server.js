//import
const express = require('express');
const exphb = require('express-handlebars');
const path = require('path');
const fs = require('fs');

// init
const app = express();
const APP_PORT = process.env.PORT;

// Setup handlebar
app.engine('hbs', exphb());
app.set('view engine', 'hbs');

// initialize static content
app.use(express.static(path.join(__dirname, 'public')));
finalImageDir = path.join(__dirname, 'views', 'images');

app.use(express.static(finalImageDir));
// img tag
const randomImagesArr = [];
// physical path
const randomImagesArrwithPath = [];

// read all the the files upfront before the end point is being access
// cache it to the defined array above
fs.readdir(finalImageDir, function(err, filenames) {
    if (err) {
      return;
    }
    filenames.forEach(function(filename) {
        randomImagesArr.push(filename);
        randomImagesArrwithPath.push(path.join(finalImageDir, filename))
    });
});

// helper random function
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// endpoint which return html structure
app.get('/image', (req,res,next)=>{
    res.status(200);
    res.type('text/html');
    let randomNumber = getRandomInt(randomImagesArr.length);
    res.send(`<img src="${randomImagesArr[randomNumber]}"></img>`);
});

// endpoint uses hbs instead of returning html structure
app.get('/image2', (req,res,next)=>{
    let randomNumber = getRandomInt(randomImagesArr.length);
    res.render('randomimage',{randomImageURL: randomImagesArr[randomNumber]});
});

// randomize from the file system.
app.get('/random-image', (req,res,next)=>{
    let randomNumber = getRandomInt(randomImagesArrwithPath.length);
    res.sendFile(randomImagesArrwithPath[randomNumber]);
})

app.use((req, res, next)=>{
    res.send("<b>ERROR !</b>")
})

app.listen(APP_PORT, ()=>{
    console.log(`App Server started on ${APP_PORT}`)
})
