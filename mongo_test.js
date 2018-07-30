const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoRouter = express.Router();

const url = 'mongodb://localhost:27017';
const dbName = 'sample';

mongoRouter.get('/', (req, resp) => {
    MongoClient.connect(url, function(error, client){
        const db = client.db('sample');
        db.collection('students').find({name:/Tim/}).toArray((error, docs) => resp.json(docs))
        client.close();
    });
});

module.exports = mongoRouter;