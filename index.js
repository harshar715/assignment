const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const personRoutes = require('./routes/person-route');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const httpServer = app.listen(PORT, function () { console.log('listening to PORT'); });

mongoose.connect(`mongodb+srv://meghanalokesh97:87654321meg@cluster0.uucdw.mongodb.net/Assignment?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.Promise = global.Promise;

app.use('/api', personRoutes);

