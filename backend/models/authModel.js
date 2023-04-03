//import mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "your uri";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

const collection = client.db("db name").collection("collection name");
//register a new user in the mongo database
const register = async (data) => {
    console.log("registering");
    const user = await collection.insertOne(data);
    return user;
}

//check if user already exists in mongo database
const checkExistingUser = async (email) => {
    console.log("checking existing user");
    const user = await collection.find({email : email}, {projection : {name : 1, email : 1, password : 1}}).toArray();
    console.log("query executed");
    return user;
}

//login a user
const login = async (email) => {
    // only send the users details that are required
    const user = await collection.find({email : email}, {projection : {name : 1, email : 1, password : 1}}).toArray();
    return user;
}

const insertTime = async (data) => {
    const time = await collection.updateOne({email : data.email}, {$push : {time : data.time}});
    return time;
}



module.exports = {
    register,
    checkExistingUser,
    login,
    insertTime
}
