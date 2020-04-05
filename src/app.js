require("dotenv-safe").config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()

const novelos = [
    {
        id: '1',
        nome: 'Vermelho'
    },
    {
        id: '2',
        nome: 'Azul'
    },
    {
        id: '3',
        nome: 'Roxo'
    },
    {
        id: '4',
        nome: 'Amarelo'
    }
]

function verifyJWT(req, res, next){
    var token = req.headers['x-access-token']
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' })

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })

        req.userId = decoded.id
        next()
    });
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/api/v1/novelos', verifyJWT, function (req, res) {
    res.send(novelos)
})
//authentication
app.post('/login', (req, res, next) => {
  if(req.body.user === 'admin' && req.body.pwd === 'admin'){    
    const id = 1;
    var token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300 // expires in 5min
    });
    res.status(200).send({ auth: true, token: token });
  }
  
  res.status(500).send('Login inválido!');
})
app.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
})
app.listen(3000)