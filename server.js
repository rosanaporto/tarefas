const express = require('express');

const server = express();

server.use(express.json());

const tarefas = [
    {id: 1, disciplina: 'LP3', date: ('12-05-2020'), entregue: 'Sim'},
    {id: 2, disciplina: 'PO', date: ('15-05-2020'), entregue: 'Não'}
]

server.get('/tarefa', function(request, response) {
    response.json(tarefas);
})

server.post('/tarefa', function(request, response) {

    const {id, disciplina, date, entregue} = request.body;

    tarefas.push({id, disciplina, date, entregue})
    response.status(204).send();
})

server.put('/tarefa/:id', function(request, response){
    const id = request.params.id;
    const {disciplina, date, entregue} = request.body;

    for(let i = 0; i < tarefas.length; i++){
        if(tarefas[i].id == id) {
            tarefas[i].disciplina = disciplina;
            tarefas[i].date= date;
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