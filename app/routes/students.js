var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', (err, database) => {
    if (err) return console.log(err);

    db = database.db('exam');
})

function getCollection() {
    return db.collection("students");
}

router.get('/', function (req, res) {
    getCollection().find().toArray((err, data) => {
        if (err) console.log(error);

        data.sort((a, b) => a.naam.localeCompare(b.naam));

        res.render('index', { students: data });
    });
});

module.exports = router;
