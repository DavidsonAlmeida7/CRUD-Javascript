var list = [
    {'desc':'rice', 'quantidade':'1','valor':'5.40'},
    {'desc':'beer', 'quantidade':'12','valor':'1.99'},
    {'desc':'meat', 'quantidade':'1','valor':'15.00'}
];

//Calcula o total de todos os valores...
function getTotal(list) {
    
    var total = 0;

    for (const key in list) {
        total += list[key].valor * list[key].quantidade;
    }

    document.getElementById('totalValue').innerHTML = formatValor(total);
    //return total;
}

//Lista os dados na pagina HTML...
function setList(list) {
    
    var table = `<thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Quantidade</th>
                      <th>Valor</th>
                      <th>Ação</th>
                    </tr>
                </thead>`;

    for (const key in list) {
        table += `<tbody>
                    <tr>
                        <td>${ formatDesc(list[key].desc) }</td>
                        <td>${ formatQuantidade(list[key].quantidade) }</td>
                        <td>${ formatValor(list[key].valor) }</td>
                        <td><button class="btn btn-primary"  onclick="setUpdate(${key});">Edit</button> <button class="btn btn-danger" onclick="deleteData(${key});">Delete</button></td>
                    </tr>
                </tbody>`;
    }

    document.getElementById('listTable').innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}

//Formata a descrição em maiuscula
function formatDesc(desc) {
    var str = desc.toLowerCase(); //transforma em minuscula
    str = str.charAt(0).toUpperCase() + str.slice(1); //pega o primeiro caracter da string e transforma em maiuscula
    return str;
}

//Formata a quantidade em formato de inteiro
function formatQuantidade(quantidade) {
    return parseInt(quantidade);
}

//Formata o valor em formato de dinheiro
function formatValor(valor) {
    var str = parseFloat(valor).toFixed(2) + '';
    str = str.replace('.', ',');
    str = 'R$ ' + str;
    return str;
}

//função para o metodo onclick de adicionar dados da pagina
function addData() {
    if (!validation()) {
        return;
    }

    var desc = document.getElementById('desc').value;
    var quantidade = document.getElementById('quantidade').value;
    var valor = document.getElementById('valor').value;

    list.unshift({'desc': desc, 'quantidade': quantidade, 'valor': valor});
    setList(list);
}

//Atualiza o campo referente na tabela
function setUpdate(id) {
    var obj = list[id];
    document.getElementById('desc').value = obj.desc;
    document.getElementById('quantidade').value = obj.quantidade;
    document.getElementById('valor').value = obj.valor;

    document.getElementById('btnUpdate').style.display = 'inline-block';
    document.getElementById('btnAdd').style.display = 'none';
    document.getElementById('inputIDUpdate').innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}

//limpa o formulario 
function resetForm() {
    document.getElementById('desc').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('valor').value = '';

    document.getElementById('btnUpdate').style.display = 'none';
    document.getElementById('btnAdd').style.display = 'inline-block';
    document.getElementById('inputIDUpdate').innerHTML = '';
    document.getElementById('errors').style.display = 'none';
}

//Atualiza dados
function updateData() {
    if (!validation()) {
        return;
    }

    var id = document.getElementById('idUpdate').value;
    var desc = document.getElementById('desc').value;
    var quantidade = document.getElementById('quantidade').value;
    var valor = document.getElementById('valor').value;

    list[id] = {'desc': desc, 'quantidade': quantidade, 'valor': valor};
    resetForm();
    setList(list);
}

//deleta dados
function deleteData(id) {
    if (confirm("Delete this item?")) {
        if (id === list.length - 1) {
            list.pop();
        } else if (id === 0) {
            list.shift();
        } else {
            var arrAuxIni = list.slice(0, id);
            var arrAuxEnd = list.slice(id + 1);
            list = arrAuxIni.concat(arrAuxEnd);
        }
        setList(list);
    }
}

//valida os campos
function validation() {
    var desc = document.getElementById('desc').value;
    var quantidade = document.getElementById('quantidade').value;
    var valor = document.getElementById('valor').value;
    var errors = '';
    document.getElementById('errors').style.display = 'none';

    if (desc === '') {
        errors += '<p>Campo descrição vazio!</p>';
    }

    if (quantidade === '') {
        errors += '<p>Campo quantidade vazio!</p>';
    } else if (quantidade != parseInt(quantidade)) {
        errors += '<p>Invalido registro no campo quantidade!</p>';
    }

    if (valor === '') {
        errors += '<p>Campo valor vazio!</p>';
    } else if (valor != parseFloat(valor)) {
        errors += '<p>Invalido registro no campo valor!</p>';
    }

    if (errors != '') {
        document.getElementById('errors').style.display = 'block';
        document.getElementById("errors").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "13px";

        document.getElementById('errors').innerHTML = '<h3>Error:</h3>' + errors;
        return 0;
    } else {
        return 1;
    }
}

//Deleta todos os dados da lista
function deleteList() {
    if (confirm('Deletar todos os itens na lista?')) {
        list = [];
        setList(list);
    }
}

//salva os dados da lista no LocalStorage
function saveListStorage(list) {
    var jsonStr = JSON.stringify(list);
    localStorage.setItem('list', jsonStr);
}

//função de inicialização da lista salva no localStorage
function initListStorage() {
    var testList = localStorage.getItem('list');

    if (testList) {
        list = JSON.parse(testList); //converte de json para array
    }
    setList(list);
}

//setList(list);
initListStorage();