const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoRouter = express.Router();

const url = 'mongodb://localhost:27017';
const dbName = 'sample';

// Query
mongoRouter.get('/query', (req, resp) => {
    MongoClient.connect(url, function (error, client) {
        const db = client.db(dbName);
        db.collection('students').find({
            name: /Tim/
        }).toArray((error, docs) => resp.json(docs));
        client.close();
    });
});

//Insert 
mongoRouter.get('/insert', (req, resp) => {
    MongoClient.connect(url, function (error, client) {
        const db = client.db(dbName);
        db.collection('students').insert({
            name: 'Wendy',
            telephone: '(06)22222222'
        }, (error, result) => resp.json('Ok'));
        client.close();
    });
});

//Update 
mongoRouter.get('/update', (req, resp) => {
    MongoClient.connect(url, function (error, client) {
        const db = client.db(dbName);
        db.collection('students').update({
            name: 'Tim'
        }, {
            telephone: '(06)22222222'
        }, (error, result) => resp.json('Ok'));
        client.close();
    });
});

module.exports = mongoRouter;