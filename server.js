const express = require('express');

const server = express();

server.use(express.json());

const tarefas = [
    {id: 1, disciplina: 'LP3', data: '12', entregue: 'Sim'},
    {id: 2, disciplina: 'PO', data: '15', entregue: 'Não'}
]

server.get('/tarefa', function(request, response) {
    response.json(tarefas);
})

server.post('/tarefa', function(request, response) {

    const {id, disciplina, data, entregue} = request.body;

    tarefas.push({id, disciplina, data, entregue})
    response.status(204).send();
})

server.put('/tarefa/:id', function(request, response){
    const id = request.params.id;
    const {disciplina, data, entregue} = request.body;

    for(let i = 0; i < tarefas.length; i++){
        if(tarefas[i].id == id) {
            tarefas[i].disciplina = disciplina;
            tarefas[i].data= data;
            tarefas[i].entregue = entregue;
            break;
        }
    }

    return response.status(204).send();
})

server.delete('/tarefa/:id', function(request, response) {

    const id = request.params.id;

    for(let i = 0; i < tarefas.length; i++){
        if(tarefas[i].id == id) {
            tarefas.splice(i, 1)
            break;
        }
    }

    return response.status(204).send();
})




server.listen(process.env.PORT || 3000);