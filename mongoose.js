const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const mongoose = require('mongoose');

const db = mongoose.connect(`mongodb+srv://devanshudutta22:JStKhABKgWh6LL8N@cluster0.kbjf6mj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => {

console.log("connected");

}).catch((err) => {

    console.log("error");

});

const userSchema = new mongoose.Schema({

    name: String,
    id:String

});

const User = mongoose.model('users', userSchema);



console.log(User);

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());



app.post('/users', async(req, res) => {

    const {name, id} = req.body;

    const user = new User({

        name: name,
        id: id

    });

    await user.save();

});

app.get('/users',async (req,res) => {

    const users = await User.find();

    res.json(users);

})


app.listen(3000, () => {

    console.log("server is running at in  dont kow");

})