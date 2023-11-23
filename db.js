const {MongoClient} = require('mongodb');

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://localhost:27017/TODO_List')
            .then((client) => {
                dbConnection = client.db();
                return cb()
            })
            .catch(err => {
                console.log(err);
                return cb(err)
            })
    },
    getDB: () => dbConnection
}