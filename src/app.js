const express = require('express')
var cors = require('cors');
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

app.use(cors())
app.get('/api/v1/novelos', function (req, res) {
    res.send(novelos)
})
app.listen(3000)