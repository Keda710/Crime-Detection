const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { spawn } = require('child_process');

const server = express();
server.use(cors());
server.use(bodyParser.json());

// Set storage engine
const upload = multer({ dest: 'uploads/' });

server.post('/upload', upload.single('video'), (req, res) => {
    const videoPath = req.file.path; 
    const pythonProcess = spawn('python', ["C:\\Users\\tosha\\OneDrive\\Desktop\\crime\\model\\Pred.py", videoPath]);
    let prediction = '';
  
    // pythonProcess.stdout.on('data', (data) => {
    //   prediction += data.toString();
    // });
    // Assuming 'pythonProcess' is defined elsewhere in your code
    pythonProcess.stdout.on('data', (data) => {
      prediction += data.toString();
    });

    // Assuming 'pythonProcess' is defined elsewhere in your code
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        // Send the prediction as a response to the client
        res.json({ prediction: prediction.trim() });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error from Python script: ${data}`);
      // Handle error if needed
    });
  
    
});

async function main() { 
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log('db connected')

  // use await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test'); if your database has auth enabled
}
const userSchema = new mongoose.Schema({
    username: String,
    
    email:String,
    password: String
});

const User = mongoose.model('User', userSchema);

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
server.post('/prediction', (req, res) => {
  // Assuming 'prediction' is the variable containing the result in your Express.js server
  res.json({ prediction });
});


const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

