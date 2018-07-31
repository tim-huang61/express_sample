const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require("express-jwt");
const bodyParser = require('body-parser');
const mongoPage = require('./mongo_test');
const app = express();
const key = 'timhuang';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all('*',(req, resp, next)=> {
    resp.header('Access-Control-Allow-Origin', '*');
    resp.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'); 
    resp.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    if(req.method === 'OPTIONS'){
        return resp.status(200).send();
    };
    
    next();
});
app.use(expressJwt({ secret: key }).unless({ path: ['/api/login']}));

app.use('/mongo', mongoPage);
app.get('/json', (req, resp) => {
    resp.json({
        name: 'Tim',
        address: '台中市',
        company: 'TW',
        telephone: '(06)2345678',
        mobile: '0912345678'
    });
});

app.get('/sample2', (req, resp) => {
    resp.render('sample2', {
        title: 'sample2', users: [
            { name: 'user1' },
            { name: 'user2' },
            { name: 'user3' },
        ],
        footer: 'I am footer.'
    });
});

app.get('/sample3', (req, resp) => {
    resp.render('sample3.jade', {
        title: 'sample3', users: [
            { name: 'user1' },
            { name: 'user2' },
            { name: 'user3' },
        ],
        footer: 'I am footer.'
    });
});

app.post('/api/login', (req, resp) => {
    // validate user
    const user = req.body;
    if (user && user.username === 'Tim' && user.password === '123456') {
        const token = jwt.sign(user, key, { expiresIn: 60 * 60 });
        return resp.json({token});
    }

    return resp.status(400).json({ error: 'login failed!!' });
});

app.get('/api/test', (req, resp) => resp.json('你不錯有權限'));

app.use((error, req, resp, next) => {
    if (error.status === 401) {
      return resp.status(401).json({ error: '你沒權限啦'});
    }
    
    if (error.stack) {
       return resp.status(500).json({ error: 'Server 噴噴'});
    }

    next();
});

// 監聽
app.listen(8085);
// 設定讀取的views路徑
app.set('views', `${__dirname}\\views`);
// 套用html模板
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.engine('jade', require('jade').__express);