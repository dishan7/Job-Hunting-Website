const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const user = require('./user')

const jobSchema = new mongoose.Schema({
    
    companyName:{
        type:String,
        unique:false,
        required:true
    },
    profile:{
        type:String,
        unique:true,
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:false
    },
    jobDetails:{
        type: String,
        unique: false,
    },
    jobLocation: {
        type: String, 
        required:false
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    }
})

const job = new mongoose.model('job' , jobSchema);
module.exports = job;
