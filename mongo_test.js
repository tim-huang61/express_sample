const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoRouter = express.Router();

const url = 'mongodb://localhost:27017';
const dbName = 'sample';

// Query
mongoRouter.get('/query', (req, resp) => {
    MongoClient.connect(url, function (error, client) {
        const db = client.db(dbName);
        req.query.name = new RegExp(req.query.name);
        db.collection('students').find(req.query).toArray((error, docs) => resp.json(docs));
        client.close();
    });

    //MongoDbHelper.query(req.query, (error, docs) => resp.json(docs));
});

//Insert 
mongoRouter.post('/insert', (req, resp) => {
    MongoClient.connect(url, function (error, client) {
        const db = client.db(dbName);
        db.collection('students').insert(req.body,
            (error, result) => resp.json('finished to insert.'));
        client.close();
    });

    // MongoDbHelper.insert(req.body, (error, docs) => resp.json('finished to insert.'));
});

// Update 
mongoRouter.put('/update', (req, resp) => {
    MongoClient.connect(url, function (error, client) {
        const db = client.db(dbName);
        db.collection('students').findOneAndUpdate({
            name: req.body.name
        }, {
            $set: req.body
        }, {
            upsert: true
        }, (error, result) => resp.json('finished to update.'));
        client.close();
    });

    // MongoDbHelper.update({ name: 'Tim' }, { telephone: '(06)22222222' }, (error, docs) => resp.json('finished to update.'));
});

// Delete
mongoRouter.delete('/delete', (req, resp) => {
    MongoClient.connect(url, function (error, client) {
        const db = client.db(dbName);
        db.collection('students').deleteOne(req.query, (error, result) => resp.json('it finishes to delete.'));
        client.close();
    });

    // MongoDbHelper.delete(req.query, (error, docs) => resp.json('finished to delete.'));
});

module.exports = mongoRouter;

//refactor
class MongoDbHelper {

    static query(filter, callback) {
        this.dbExecute(collection => collection.find(filter).toArray(callback))
    }

    static insert(obj, callback) {
        this.dbExecute(collection => collection.insert(obj, callback));
    }

    static update(filter, obj, callback) {
        this.dbExecute(collection => collection.update(filter, obj, {
            upsert: true
        }, callback));
    }

    static delete(filter, callback) {
        this.dbExecute(collection => collection.deleteOne(filter, callback));
    }

    static dbExecute(callback) {
        MongoClient.connect('mongodb://localhost:27017', function (error, client) {
            const db = client.db('sample');
            callback(db.collection('students'));
            client.close();
        });
    }
}