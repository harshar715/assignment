const express = require('express');
const router = express.Router();
const person = require('../models/person-model')

router.get('/getPersonDetails', function (req, res, next) {
    person.find(req.query).lean().then(personDetails => {
        if (personDetails.length !== 0) {
            res.send({
                message: 'Persons Data fetched Successfully',
                data: personDetails,
                status: 201
            });
        } else {
            res.send({
                message: 'Person Data not Found',
                data: [],
                status: 201
            });
        }
    }).catch(next);
});

router.get('/getPersonDetailsByDate', function (req, res, next) {
    let query = {
        createdAt: {
            $gte: new Date(req.query.date.split('-')[0], req.query.date.split('-')[1] - 1, req.query.date.split('-')[2]),
            $lt: new Date(req.query.date.split('-')[0], req.query.date.split('-')[1] - 1, req.query.date.split('-')[2] + 1)
        }
    };
    person.find(query).lean().then(personDetails => {
        if (personDetails.length !== 0) {
            res.send({
                message: 'Persons Data fetched Successfully',
                data: personDetails,
                status: 201
            });
        } else {
            res.send({
                message: 'Person Data not Found',
                data: [],
                status: 201
            });
        }
    }).catch(next);
});

router.post('/postPerson', (req, res, next) => {
    person.create(req.body).then(newPerson => {
        if (newPerson) {
            res.send({
                message: 'Person Data Created Successfully',
                data: newPerson,
                status: 201
            });
        } else {
            res.send({
                message: 'Something went wrong!!!',
                data: [],
                status: 400
            });
        }
    }).catch(next);
});

router.put('/updatePersonStatus', (req, res, next) => {
    person.findOneAndUpdate({ _id: req.query._id }, { checkInStatus: req.query.checkInStatus }).then(modifiedPerson => {
        if (modifiedPerson) {
            res.send({
                message: 'Person Data Updated Successfully',
                data: modifiedPerson,
                status: 201
            });
        } else {
            res.send({
                message: 'Something went wrong!!!',
                data: [],
                status: 400
            });
        }
    }).catch(next);
});

router.delete('/deletePerson', (req, res, next) => {
    person.findOneAndDelete(req.query).then(deletePerson => {
        if (deletePerson) {
            res.send({
                message: 'Person Data Updated Successfully',
                data: deletePerson,
                status: 201
            });
        } else {
            res.send({
                message: 'Something went wrong!!!',
                data: [],
                status: 400
            });
        }
    }).catch(next);
});


module.exports = router;

