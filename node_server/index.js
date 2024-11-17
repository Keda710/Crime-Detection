const express = require('express');
const server = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() { 
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log('db connected')


}
const userSchema = new mongoose.Schema({
    username: String,
    
    email:String,
    password: String
});

const User = mongoose.model('User', userSchema);
server.use(cors());
server.use(bodyParser.json());

server.post('/demo',async (req,res)=>{
    const existingUser = await User.findOne({ email: req.body.email }); // Use req.body.email instead of email
    if (existingUser) {
        res.json("User already exists. Please login.");
        return;
    }
     
    let user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    const doc = await user.save();

    console.log(doc);
    res.json(doc);
})
server.post('/login', async (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Login Successful");
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record existed");
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json("Internal Server Error");
        });
});

server.listen(8080,()=>{
    console.log('server started')
})
