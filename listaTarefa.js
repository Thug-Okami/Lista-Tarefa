const exibirLT = () => {
    const lista = document.getElementById('idLT');
    const tbody = document.querySelector('tbody');

    tbody.innerHTML =`
    <tr>
        <th>Data</th>
        <th>Nome</th>
        <th>Status</th>
        <th>Editar</th>
        <th>Excluir</th>
    </tr>
    `

    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefas.forEach((tarefa, index) => {
        const date = new Date(tarefa.dia);
        const formattedDate = date.toLocaleDateString();

        const row = tbody.insertRow();
        row.innerHTML = `
        <tr>
            <td>${formattedDate}</td>
            <td>${tarefa.nome}</td>
            <td>${tarefa.status}</td>
            <td><button id="btnEdit" onclick="editTarefa(${index})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
            <td><button id="btnRemove" onclick="delTarefa(${index})"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
        </tr>
        `
    });
}

const addTarefa = (event) => {
    event.preventDefault();
    let form = document.getElementById('tarefaForm');
    let tarefaN = document.getElementById('tarefaNome').value.trim();
    let tarefaStatus = document.getElementById('idStatus').value.trim();
    let tarefaDay = document.getElementById('day').value.trim();
    let camposVazios = [];

    if(tarefaN == ''){
        camposVazios.push(`Nome`)
    }
    if(tarefaStatus == ''){
        camposVazios.push("Status")
    }
    if(tarefaDay == ''){
        camposVazios.push('Data')
    }
        const tarefa = {
            dia: tarefaDay,
            nome: tarefaN,
            status: tarefaStatus
        }

        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

        tarefas.push(tarefa)
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        if (tarefaN == '' || tarefaStatus == '' || tarefaDay == '')
            alert('Faltou coisa irmão' + camposVazios);

        console.log(`Nova tarefa adicionada
        nome: ${tarefaN}
        status: ${tarefaStatus}
        dia: ${tarefaDay}`);

        form.reset();
        exibirLT();
    
}

const delTarefa = (index) => {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.splice(index, 1);

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    exibirLT();
}

const editTarefa = (index) => {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const tarefa = tarefas[index];

    document.getElementById('tarefaNome').value = tarefa.nome;
    document.getElementById('idStatus').value = tarefa.status;
    document.getElementById('day').value = tarefa.dia;

    const attTarefa = (event) => {
        event.preventDefault();

        tarefa.nome = document.getElementById('tarefaNome').value.trim();
        tarefa.status = document.getElementById('idStatus').value.trim();
        tarefa.dia = document.getElementById('day').value.trim();
    
        upTarefa = JSON.stringify(tarefas);
        localStorage.setItem('tarefas', upTarefa);

        exibirLT();
        document.getElementById('tarefaForm').reset()

        document.querySelector('#btnAdd').textContent = 'Adicionar';
        document.querySelector('#btnAdd').removeEventListener('click', attTarefa);
        document.querySelector('#btnAdd').addEventListener('click', addTarefa);
    }
    document.querySelector('#btnAdd').textContent = 'Atualizar';
    document.querySelector('#btnAdd').removeEventListener('click', addTarefa);
    document.querySelector('#btnAdd').addEventListener('click', attTarefa)
}

const init = () => {
    document.querySelector('#btnAdd').addEventListener('click', addTarefa);
    exibirLT();
}

init();