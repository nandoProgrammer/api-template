const express = require("express");
const server = express();

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const auth = require('./src/middlewares/auth')

const user = [
    {
        user:"user1",
        password: "12345"
    }
];

const books = [];

server.use(bodyParser.json());

server.post('/auth', (req, res) => {
    if(req.body.user === user[0].user && req.body.password === user[0].password){
       const token = jwt.sign({
            user: user[0].user,
            password: user[0].password
       },
       process.env.JWT_KEY,
       {
         expiresIn: '1h'
       })
       return res.status(200).json({
           status:'sucess',
           token: token
       })
    }else{
       return res.status(401).json({ error: 'Not Found'})
    }
})

server.get('/books', auth, (req, res, next) => {
    return res.status(200).json(books);
})




server.listen(3000)