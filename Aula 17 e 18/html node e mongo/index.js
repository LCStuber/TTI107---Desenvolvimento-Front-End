// console.log('Hello, NodeJS')

const express = require ('express')
const app = express()
app.use(express.json())

//escutar uma requisição get na URL http://localhost:3000/oi
app.get("/oi", (req, res) => {res.send('Salve!')})

app.listen(3000, () => console.log("up and running"))