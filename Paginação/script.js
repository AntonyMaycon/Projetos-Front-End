const tabela = document.querySelector('#tabela');
const botoesPaginacao = document.querySelectorAll('.btnPaginacao');
const formAddAluno = document.querySelector('#form-add-aluno');
const nomeInput = document.querySelector('#nome');
const emailInput = document.querySelector('#email');
const alunosPorPagina = 10;

let alunos = [];
let pagina = 1;

renderizarTabela();

botoesPaginacao.forEach((botao, index) => {
    botao.addEventListener('click', (e) => {
        e.preventDefault();
        pagina = index + 1;
        ativarBotaoPaginacao(botao);
        renderizarTabela();
    });
});

formAddAluno.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    
    if (nome && email) {
        await adicionarAluno({ nome, email });
        nomeInput.value = '';
        emailInput.value = '';
    }
});

async function fetchData() {
    try {
        const response = await fetch('dados.json');
        if (!response.ok) {
            throw new Error(`Status da resposta: ${response.status}`);
        }
        const json = await response.json();
        alunos = json.alunos;
    } catch (error) {
        console.error(error.message);
    }
}

async function adicionarAluno(aluno) {
    try {
        const response = await fetch('http://localhost:3000/alunos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(aluno),
        });
        if (response.ok) {
            console.log('Aluno adicionado com sucesso');
            renderizarTabela();
        } else {
            console.error('Erro ao adicionar o aluno');
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function excluirAluno(id) {
    try {
        const response = await fetch(`http://localhost:3000/alunos/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            console.log('Aluno excluído com sucesso');
            renderizarTabela();
        } else {
            console.error('Erro ao excluir o aluno');
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function renderizarTabela() {
    await fetchData();
    
    const inicio = (pagina - 1) * alunosPorPagina;
    const fim = inicio + alunosPorPagina;
    const alunosPagina = alunos.slice(inicio, fim);

    tabela.innerHTML =
    `<table>
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Email</th>
                <th scope="col">Ações</th> <!-- Nova coluna para a lixeira -->

            </tr>
        </thead>
        <tbody>
            ${alunosPagina.map((aluno) => `
                <tr>
                    <th scope="row">${aluno.id}</th>
                    <td>${aluno.nome}</td>
                    <td>${aluno.email}</td>
                    <td>
                        <button class="btnDelete" data-id="${aluno.id}">🗑️</button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    </table>`;
    adicionarEventosDeletar();
}

function ativarBotaoPaginacao(botaoAtivo) {
    botoesPaginacao.forEach(botao => botao.classList.remove('ativo'));
    botaoAtivo.classList.add('ativo');
}

function adicionarEventosDeletar() {
    const botoesDeletar = document.querySelectorAll('.btnDelete');
    botoesDeletar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            excluirAluno(id);
        });

    });
}
