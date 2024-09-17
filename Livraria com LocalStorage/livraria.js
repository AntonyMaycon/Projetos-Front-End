let inputTitulo = document.querySelector('#titulo')
let inputAutor = document.querySelector('#autor')
let inputAno = document.querySelector('#ano')
let btnAddLivro = document.querySelector('#btnAddLivro')
let conteudoTabela = document.querySelector('#conteudoTabela')
let mensagem = document.querySelector('#mensagem')

let livros = []
getLivros()
renderizarTabela()

function getLivros() {
    livros = JSON.parse(localStorage.getItem("livros")) || []
}

function setLivros() {
    localStorage.setItem("livros", JSON.stringify(livros))
}


function addLivro(titulo, autor, ano) {
    let livro = {
        titulo: titulo,
        autor: autor,
        ano: ano
    }
    livros.push(livro)
    setLivros()
    mostrarMensagem("Livro adicionado!")
}

function delLivro(titulo, autor, ano) {
    livros.splice(localStorage, 1)
    setLivros()
    renderizarTabela()
    mostrarMensagem("Livro removido!")
}

btnAddLivro.addEventListener('click', function(e) {
    e.preventDefault()
    addLivro(inputTitulo.value, inputAutor.value, inputAno.value)
    console.table(livros)
    limparFormulario()
    renderizarTabela()
})

function limparFormulario() {
    inputTitulo.value = ""
    inputAutor.value = ""
    inputAno.value = ""
    inputTitulo.focus()
}

function renderizarTabela() {
    conteudoTabela.innerHTML = `
        <table>
            <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Ano</th>
            </tr>
        ${livros.map(livro =>
            `<tr>
                <td>${livro.titulo}</td>
                <td>${livro.autor}</td>
                <td>${livro.ano}</td>
            </tr>`
        ).join('')}
     </table>
    `
}

function mostrarMensagem(texto) {
    mensagem.style.display = 'block'
    mensagem.innerHTML = texto

    setTimeout(function() {
        mensagem.style.display = 'none'
        mensagem.innerHTML = ''
    }, 3000)
}