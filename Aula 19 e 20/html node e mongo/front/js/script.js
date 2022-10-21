const protocolo = "http://"
const baseURL = "localhost:3000"
const filmesEndPoint = "/filmes"

async function obterFilmes() {
    //console.log("teste")
    const URLcompleta = `${protocolo}${baseURL}${filmesEndPoint}`
    const filmes = (await axios.get(URLcompleta)).data
    //console.log(filmes)
    let tabela = document.querySelector(`.filmes`)
    let corpoTabela = tabela.getElementsByTagName(`tbody`)[0]
    for (let filme of filmes){
        let linha = corpoTabela.insertRow(0)
        let colunaTitulo = linha.insertCell(0)
        let colunaSinopse = linha.insertCell(1)
        colunaTitulo.innerHTML = filme.titulo
        colunaSinopse.innerHTML = filme.sinopse
    }
}