
const express = require('express');
const Pool = require('pg').Pool;
const cors = require('cors'); 

const pool = new Pool({
    user:'lrnvydpyoedmbk',
    password:'4790e37632ed49bad9ab1ddcbe2d1dfd19ff85ee58b7e55791950e33cd44e1a4',
    host:'ec2-18-214-211-47.compute-1.amazonaws.com',
    database:'dd4i6bq329eolg',
    port: 5432,
    ssl: {rejectUnauthorized: false}
});
  
const server = express();

server.use(cors());

server.use(express.json());

//GET
server.get('/tarefa', async function(request, response) {
   result = await pool.query('SELECT * FROM tarefas');

   return response.json(result.rows);
})

server.get('/tarefa/search', async function(request, response) {
    const disciplina = request.query.disciplina;
    const sql = `SELECT * FROM tarefas WHERE disciplina ILIKE $1`;
    const result = await pool.query(sql, ["%" +  disciplina + "%"]);
    return response.json(result.rows);
})

server.get('/tarefa/:id', async function(request, response) {
    const id = request.params.id;
    const sql = `SELECT * FROM tarefas WHERE id = $1`
    const result = await pool.query(sql, [id]);
    return response.json(result.rows);
})


//POST
server.post('/tarefa', async function(request, response) {
    const disciplina = request.body.disciplina;
    const date = request.body.date;
   // const entregue = request.body.entregue;
    const sql= `INSERT INTO tarefas (disciplina, date, entrega) VALUES ($1, $2, $3)`;
    await pool.query(sql, [disciplina, date, false]);
    return response.status(204).send();
})


//DELETE
server.delete('/tarefa/:id', async function(request, response) {
    const id = request.params.id;
    const sql = `DELETE FROM tarefas WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})


//UPDATE
server.put('/tarefa/:id', async function(request, response) {
    const id = request.params.id;
    const { disciplina, date, entrega} = request.body;
    const sql = `UPDATE tarefas SET disciplina = $1, date = $2, entrega = $3 WHERE id = $4`;
    await pool.query(sql, [disciplina, date, entrega, id]);
    return response.status(204).send();
})


//UPDATE Do Entregue
server.patch('/tarefa/:id/entregue', async function(request, response) {
    const id = request.params.id;
    const sql = `UPDATE tarefas SET entrega = true WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})

server.patch('/tarefa/:id/naoentregue', async function(request, response) {
    const id = request.params.id;
    const sql = `UPDATE tarefas SET entrega = false WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
});






//CRUD EM MEMÓRIA

//const server = express();

//server.use(express.json());

//const tarefas = [
//  {id: 1, disciplina: 'LP3', date: ('12-05-2020'), entregue: 'true'},
//  {id: 2, disciplina: 'PO', date: ('15-05-2020'), entregue: 'false'}
// ]

//server.get('/tarefa', function(request, response) {
//    response.json(tarefas);
// })

//server.post('/tarefa', function(request, response) {

//    const {id, disciplina, date, entregue} = request.body;

//    tarefas.push({id, disciplina, date, entregue})
//    response.status(204).send();
// })

//server.put('/tarefa/:id', function(request, response){
//    const id = request.params.id;
//    const {disciplina, date, entregue} = request.body;

//    for(let i = 0; i < tarefas.length; i++){
//        if(tarefas[i].id == id) {
//            tarefas[i].disciplina = disciplina;
//            tarefas[i].date= date;
//            tarefas[i].entregue = entregue;
//            break;
//        }
//    }

//    return response.status(204).send();
// })

//server.delete('/tarefa/:id', function(request, response) {

//    const id = request.params.id;

//    for(let i = 0; i < tarefas.length; i++){
//        if(tarefas[i].id == id) {
//            tarefas.splice(i, 1)
//           break;
//        }
//    }

//    return response.status(204).send();
// })




server.listen(process.env.PORT || 3000); 