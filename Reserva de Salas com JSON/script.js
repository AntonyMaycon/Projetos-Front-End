const url = "http://localhost:3000"
const atividade = document.querySelector("#atividade")
const sala = document.querySelector("#sala")
const dataInicial = document.querySelector("#data_inicial")
const dataFinal = document.querySelector("#data_final")
const btnReservar = document.querySelector("#btnReservar")
const tabela = document.querySelector("#tabela")

let reservas = []

async function listarReservas() {
    await fetch(`${url}/reservas`)
    .then(response => {return response.json() })
    .then(response => reservas = response)
    .catch(error => console.log(error))
}

async function addReserva() {

    const reserva = {
        atividade: atividade.value,
        sala: sala.value,
        dataInicial: new Date(dataInicial.value),
        dataFinal: new Date(dataFinal.value)
    }

    await fetch(`${url}/reservas`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(reserva)})
        .then(response => console.log(response))
        .catch(error => console.log(error))
}

async function run(){
    await listarReservas()
}


function renderizarTabela() {
    tabela.innerHTML = `
        <table class="tabela">
            <tr>
                <th>ID</th>
                <th>Sala</th>
            </tr>
        ${reservas.map(reserva =>
            `<tr>
                <td>${reserva.id}</td>
                <td>${reserva.id}</td>
            </tr>`
        ).join('')}
     </table>
    `
}


listarReservas()