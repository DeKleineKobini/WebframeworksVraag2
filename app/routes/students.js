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

router.post('/add', function (req, res) {
    getCollection().find({
        naam: req.body.naam
    }).toArray((err, data) => {
        if (!req.body.naam) res.redirect('/');
        else if (err || data.length) {
            let reason;

            if (err) reason = err;
            else if (data.length) reason = "already exists";

            res.render('error', { error: reason });
        } else {
            getCollection().insertOne({
                naam: req.body.naam,
                geboortedatum: new Date(req.body.geboortedatum),
                studierichting: req.body.studierichting
            }, (err, response) => console.log(err, response));

            res.redirect('/');
        }

    });
});

module.exports = router;
