const express = require('express');
const cors = require('cors');
const path = require('path')
var port = process.env.PORT || '8000';
const app = express()

app.use(cors())
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, '/build/static')))

var db = require("./db");
var User = require('./user');
app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/build/index.html'));
  });
app.post('/api/users/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, user)=>{
        if(err) throw err;
        if(!user){
            res.status(401).json({
                message:"Incorrect login credentials"
            })
        }else{
            user.comparePassword(req.body.password,  (err, isMatch)=>{
                if(err) throw err;
                if(isMatch){
                    res.status(200).json({
                        username: user.username,
                        isAdmin: true,
                    })
                }else{
                    res.status(401).json({
                        message:"Incorrect login credentials"
                    })  
                }
            });
        }
       
    })
});
app.post('/api/users/signup', (req, res) => {
    //req.on('data',data=>console.log(decodeURIComponent(data)))
    const new_user = new User({
        ...req.body
    })
    new_user.save((err)=>{
        if(!err){
          res.status(201).json({message:'user created'})
        }else if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).json({message:"User already exist"})
        }
    });  
 });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
