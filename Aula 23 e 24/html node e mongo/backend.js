// console.log('Hello, NodeJS')

const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const uniqueValidator = require('mongoose-unique-validator')
app.use(express.json())
app.use(cors())

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: { type: String },
    sinopse: { type: String }
}))

const usuarioSchema = mongoose.Schema(
    {
        login: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    }
)
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuário", usuarioSchema)

// Não é mais necessário já que estamos utilizando o banco de dados mongo
// let filmes = [
//     {
//     titulo: "Forrest Gump - O Contador de Histórias",
//     sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções."
//     },
//     {
//     titulo: "Um Sonho de Liberdade",
//     sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela"
//     }
//     ]

//escutar uma requisição get na URL http://localhost:3000/oi
app.get("/oi", (req, res) => { res.send('Salve!') })

//Essas duas linhas foram criadas por mim (Não relacionado a aula)
app.get("/", (req, res) => { res.sendFile('/front/index.html', { root: __dirname }) })
app.get("/js/frontend.js", (req, res) => { res.sendFile('/front/js/frontend.js', { root: __dirname }) })

//endpoint para obter a lista de filmes
app.get("/filmes", async (req, res) => {
    const filmes = await Filme.find();
    res.json(filmes)
})

async function conectarMongo() {
    await mongoose.connect("mongodb+srv://<username>>:<password>>@lcstuber.bvgn6ah.mongodb.net/?retryWrites=true&w=majority")
}

//Essas quatro linhas foram criadas por mim (Não relacionado a aula)
app.get('*', function (req, res) {
    res.type('text/html');
    res.status(404).send("<img src='https://http.cat/404.png' style='height: 95vh; display: block; margin-left: auto; margin-right: auto;'>");
});

app.post("/filmes", async (req, res) => {
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    const filme = new Filme({ titulo: titulo, sinopse: sinopse })
    await filme.save()
    const filmes = await Filme.find()
    res.json(filmes)
})

app.post("/signup", async (req, res) => {
    try {
        const login = req.body.login
        const password = req.body.password
        const criptografada = await bcrypt.hash(password, 10)
        const usuario = new Usuario({ login: login, password: criptografada })
        const respMongo = await usuario.save()
        console.log(respMongo)
        res.status(201).end()
    }
    catch (e) {
        console.log(e)
        res.status(409).end()
    }
})

app.post("/login", async (req, res) => {
})

app.listen(3000, () => {
    try {
        conectarMongo()
        console.log("up and running")
    }
    catch (e) {
        console.log("Erro: ", e)
    }
})