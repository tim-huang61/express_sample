const express = require('express');
const mongoPage = require('./mongo_test');
const app = express();

app.get('/json', (req, resp) => {
    resp.json({
        name: 'Tim',
        address: '台中市',
        company: 'TW',
        telephone: '(06)2345678',
        mobile: '0912345678'
    });
});

app.get('/sample1', (req, resp) => {
    resp.sendfile('./views/sample1.html');
});

app.get('/sample2', (req, resp) => {
    resp.render('sample2', {
        title: 'sample2', users: [
            {name: 'user1'},
            {name: 'user2'},
            {name: 'user3'},
        ],
        footer:'I am footer.'
    });
});

app.get('/sample3', (req, resp) => {
    resp.render('sample3.jade', {
        title: 'sample3', users: [
            {name: 'user1'},
            {name: 'user2'},
            {name: 'user3'},
        ],
        footer:'I am footer.'
    });
});

app.use('/mongo', mongoPage);

app.listen(8085);
app.set('views', `${__dirname}\\views`);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.engine('jade', require('jade').__express);