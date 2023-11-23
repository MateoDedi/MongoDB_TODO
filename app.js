const express = require('express');
const { ObjectId } = require('mongodb')
const { connectToDB, getDb } = require('./db')

//init app and middleware
const app = express();
app.use(express.json())

//db connection

let db = '';

connectToDb((err) => {
    if(!err) {
        app.listen(3000, () => {
            console.log('app listening to port 3000')
        })
        db = getDB()
    }
})

//routes
app.get