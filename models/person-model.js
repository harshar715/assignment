const mongoose = require('mongoose');
const schema = mongoose.Schema;

const personSchema = new schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    mobile: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    checkInStatus: {
        type: String,
        required: true,
        default: 'Entering'
    }
});
const person = mongoose.model('person', personSchema);

module.exports = person;