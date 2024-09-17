document.addEventListener('DOMContentLoaded', () => {
    let formTarefa = document.querySelector('#form-tarefa');
    let Tarefa = document.querySelector('#tarefa');
    let dataVencimento = document.querySelector('#data-vencimento');
    let tabelaTarefa = document.querySelector('#tabela-tarefa').getElementsByTagName('tbody')[0];
    let contadorTarefa = document.querySelector('#contador-tarefa');
    let popup = document.querySelector('#popup');
    let popupMsg = document.querySelector('#popup-msg');
    let popupFechar = document.querySelector('#popup-fechar');
    
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    function renderizarTarefas() {
        tabelaTarefa.innerHTML = '';
        tarefas.forEach((tarefa, index) => {
            let linha = tabelaTarefa.insertRow();
            linha.insertCell(0).textContent = tarefa.description;
            linha.insertCell(1).textContent = tarefa.dueDate;
            
            let botoes = linha.insertCell(2);
            botoes.innerHTML = `
                <button class="edit-btn" data-index="${index}">Editar</button>
                <button class="delete-btn" data-index="${index}">Excluir</button>
            `;
        });
        contadorTarefa.textContent = tarefas.length;
    }

    function salvarTarefas() {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    function mostrarPopup(message) {
        popupMsg.textContent = message;
        popup.style.display = 'flex';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 3000);
    }

    formTarefa.addEventListener('submit', (e) => {
        e.preventDefault();
        let descricaoTarefa = Tarefa.value;
        let dtvencimentoTarefa = dataVencimento.value;

        if (!descricaoTarefa || !dtvencimentoTarefa) {
            mostrarPopup('Preencha todos os campos!');
            return;
        }

        if (formTarefa.dataset.editIndex !== undefined) {
            tarefas[formTarefa.dataset.editIndex] = { description: descricaoTarefa, dueDate: dtvencimentoTarefa };
            delete formTarefa.dataset.editIndex;
            mostrarPopup('Tarefa editada com sucesso!');
        } else {
            tarefas.push({ description: descricaoTarefa, dueDate: dtvencimentoTarefa });
            mostrarPopup('Tarefa adicionada com sucesso!');
        }

        Tarefa.value = '';
        dataVencimento.value = '';
        salvarTarefas();
        renderizarTarefas();
    });

    tabelaTarefa.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            let index = e.target.dataset.index;
            let confirmarDeletar = confirm('Você realmente deseja excluir esta tarefa?');

            if (confirmarDeletar) {
                tarefas.splice(index, 1);
                salvarTarefas();
                renderizarTarefas();
            }
        } else if (e.target.classList.contains('edit-btn')) {
            let index = e.target.dataset.index;
            let tarefa = tarefas[index];
            Tarefa.value = tarefa.description;
            dataVencimento.value = tarefa.dueDate;
            formTarefa.dataset.editIndex = index;
        }
    });

    popupFechar.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    renderizarTarefas();
});