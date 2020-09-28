let users = [
    {id: 1,
     name: 'Nicole',
    bio: 'Full Stack Web Developer'},
    
    {id: 2,
    name: 'Ian',
    bio: 'Animation, director of photography'},
    
    {id: 3,
    name: 'Candice',
    bio: 'Teacher'
    }
]

const express = require('express');

const server = express();

server.use(express.json());
// server.use(cors());

server.get('/', (req, res) => {
    res.status(200).json({hello: 'server working'})
})

server.get('/users', (req, res) => {
    res.status(200).json({data: users})
})

let nextId = 4;

server.post('/users', (req, res) => {
    const data = req.body;
    const {name, bio} = req.body;
    users.push({id: nextId++, ...data});
    if (!name || !bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user"});
    }
    res.status(201).json({data: users})
    res.status(500).json({errorMessage: "There was an error while saving the user to the database"});

})

server.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.filter( thisUser => thisUser.id === id)
    if(!user){
        Object.assign(user)
        res.status(200).json({data: user})            
        }else{
            res.status(400).json({
                errorMessage: 'The user with the specified ID does not exist'})
        }

});

server.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    users = users.filter( thisUser => thisUser.id !== id)
    res.status(200).json({data: users})
    res.status(404).json({errorMessage: "The user with the specified ID does not exist."})
    res.status(500).json({errorMessage: "The user could not be removed."})
})

server.put('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const changes = req.body;
    const {name, bio} = req.body;
    const thisUser = users.find(item => item.id === id);
    // if(thisUser){
        
        if(!name || !bio){
            res.status(400).json({errorMessage: "Please provide name and bio for the user"});
       // }
        
    }else {
        Object.assign(thisUser, changes);
        res.status(200).json({data: users});
        }
       
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })

    
   res.status(500).json({errorMessage: "The user information could not be modified."})
    
})

const port = 3000

server.listen(port, () => console.log('server running!'))