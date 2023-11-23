const express = require('express');
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')

//init app and middleware
const app = express();
app.use(express.json())

//db connection

let db = ''

connectToDb((err) => {
    if(!err) {
        app.listen(3000, () => {
            console.log('app listening to port 3000')
        })
        db = getDb()
    }
})

//routes

//fetch
app.get('/todos', async (req, res) => {
    const todos = await db.collection('todos').find().toArray();
    res.json(todos);
});

//post
app.post('/todos', async(req, res) => {
    const newTodo = req.body.todo;
    await db.collection('todos').instertOne({todo : newTodo})
    res.json({message: 'Todo added', todo: newTodo})
});

//delete
app.delete('/todos/:id', async (req, res) => {
    const todoId = req.params.id;
    await db.collection('todos').deleteOne({ _id: ObjectId(todoId)});
    res.json({message: 'Todo deleted'});
});