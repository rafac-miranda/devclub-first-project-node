// UTILIZAR DEPENDÊNCIAS \\

const express = require('express')
const uuid = require('uuid')

// VARIÁVEIS DE CONFIGURAÇÃO DO SERVIDOR E SISTEMA \\

const port = 3000
const app = express()
app.use(express.json())

/*

- Query params => meusite.com/user/?nome=rafael&age=26  //FILTROS
- Route params => /users/2  // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
- Request Body => {"name":"Rafael", "age":}

- GET => Buscar informação no back-end
- POST => Criar informação no back-end
- PUT / PATCH => Alterar/Atualizar informação no back-end
- DELETE => Deletar informação no back-end

- Middleware => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição

*/

// ARRAY DE USUÁRIOS \\

const users = []

const checkUserId = (request, response, next) =>{
    const {id} = request.params
    
    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({error: "User not found!"});
    }

    request.userIndex = index
    request.userId = id

    next()

}

// BUSCAR USUÁRIO \\
app.get('/users', (request, response) =>{
    //const {name, age} = request.query // Destructuring assigment
    return response.json(users) // A chave e o valor tem o mesmo nome, pode usar sem o ":" (name: name)
})

// ADICIONAR/CRIAR USUÁRIO \\
app.post('/users', (request, response) =>{
    const {name, age} = request.body
    
    const user = {id:uuid.v4(), name, age}

    users.push(user)
    
    return response.status(201).json(user)
})

// ATUALIZAR/ALTERAR USUÁRIO \\
app.put('/users/:id', checkUserId, (request, response) =>{
    const {name, age} = request.body
    const index = request.userIndex
    const id = request.userId

    const updatedUser = {id, name, age}
    
    users[index] = updatedUser
    
    return response.json(updatedUser)
})

// DELETAR USUÁRIO \\
app.delete('/users/:id', checkUserId, (request, response) =>{
    const index = request.userIndex
    
    users.splice(index,1)
    
    return response.status(204).json()
})














// ROTA DE INICIALIZAÇÃO DO SERVIDOR COM A PORTA UTILIZADA NO SISTEMA \\

app.listen(port, ()=>{
    console.log(`🚀 Server started on port ${port}`)
})