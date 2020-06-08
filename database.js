//yarn add pg

const Pool = require('pg').Pool;

//1- Abrir a conexão
//2- Executar o comando SQL (query, insert)
//3- Fechar a Conexão

const pool = new Pool({
    user:'lrnvydpyoedmbk',
    password:'4790e37632ed49bad9ab1ddcbe2d1dfd19ff85ee58b7e55791950e33cd44e1a4',
    host:'ec2-18-214-211-47.compute-1.amazonaws.com',
    database:'dd4i6bq329eolg',
    port: 5432,
    ssl: {rejectUnauthorized: false}
})

// const sql = `
// CREATE TABLE IF NOT EXISTS tarefas
//     (
//          id serial primary key,
//          disciplina varchar(100) not null,
//          date varchar (20) not null,
//          entrega boolean not null
//     )

// `;
//  pool.query(sql, function(error, result) {
//   if(error)
//     throw error

//      console.log('Tabela criada com sucesso!');

//  })    

//  INSERT
//  const sql_insert = `
//         INSERT INTO tarefas (disciplina, date, entrega)
//          VALUES
//              ('linguagem de Programação 3', '02/06/2020', false)
            

//   `;

//   pool.query(sql_insert, function(error, result){
//      if(error)
//       throw error;

//       console.log(result.rowCount);

//   })

//   SELECT

//  const sql_select = `SELECT * FROM tarefas`;

//  pool.query (sql_select, function(error, result){
//      if(error)
//      throw error;

//      console.log(result.rows);

//  })

 