const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb+srv://adminUmbeo:adminpassword@cluster0.8gwk3.mongodb.net/userDB?retryWrites=true&w=majority'
const user = require('../models/user')
const router = new express.Router();
const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");
const nodemailer = require("nodemailer");
const multer = require('multer');

const register = express();

mongoose.connect(url , {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true , useFindAndModify:false})
const con = mongoose.connection;

con.on('open' , ()=>{
    console.log('Database connected')
})

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'techumbeo@gmail.com',
    pass: 'techumbeo123'
  }
});

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//       cb(null, 'images');
//   },
//   filename: function(req, file, cb) {   
//       cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//   if(allowedFileTypes.includes(file.mimetype)) {
//       cb(null, true);
//   } else {
//       cb(null, false);
//   }
// }

// let upload = multer({ storage, fileFilter });
// // upload.single('userImage')


router.post('/register' , async (req,res)=>{
    try{
        const token = await jwt.sign({email: req.body.email}, config.secret)
        // console.log(token)
        const registerUser = await new user({
            fname: req.body.fname,
            lname: req.body.lname,
            username: req.body.username,
            email: req.body.email,
            password:req.body.password,
            phoneNumber: req.body.phoneNumber,
            age: req.body.age,
            gender: req.body.gender,
            // userImage: req.file.filename,
            // defaultPortfolio: req.body.portfolio,
            confirmationCode: token
          });
        
        registerUser.save().then(()=>{
            // console.log(registerUser);
            res.send(registerUser);
            // const _id = registerUser._id;
            // console.log(_id);
            const confirmationCode = registerUser.confirmationCode;
            const email = registerUser.email;
            // console.log(confirmationCode)
            // const verificationLink = `http://localhost:3000/users/${_id}`
            const data = transporter.sendMail({
              from: "techumbeo@gmail.com",
              to: email,
              subject: "Umbeo Technologies",
              html: `Use this link to verify your email: <a href=https://jobhuntingapp.herokuapp.com/verifyuser/${confirmationCode}>Click here</a>`
          });
          transporter.sendMail(data, function(error, info){
            // console.log(info);
          });
      }).catch((e)=>{
          res.status(400).send(e);
      })
  }
  catch(error){
      res.status(400).send(error);
      // console.log(error)
  }
})

// router.get('/register' , (req,res)=>{
//     user.find({}).then((user)=>{
//         // console.log(user);
//         res.send(user);
//     })
// })

router.get('/register/:confirmationCode' , (req , res)=>{
  const User = user.findOne({
      confirmationCode: req.params.confirmationCode
    })
      .then((User) => {
        if (!User) {
          return res.status(404).send({ message: "User Not found/the link has been deactivated" });
        }
        // console.log(User);
        User.status = "Active";
        User.confirmationCode = null;
        
        res.send("Verified successfully");

        User.save((err) => {
          if (err) {
            console.log(err);
          }
          else{
            // console.log("status changed to active")
          }
        });
        
      })
      .catch((e) => console.log("error", e));
})

module.exports = router
