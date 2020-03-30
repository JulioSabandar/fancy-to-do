const { Todo } = require('../models');
class TodoController{
    static showTodos (req, res){
        Todo.findAll()
            .then((todos)=>{
                res.status(200).json({todos});
            })
            .catch((err)=>{
                res.status(500).json(err);
            });
    }
    static addTodo (req, res){
        const {title, description, status, due_date} = req.body;
        Todo.create({title, description, status, due_date})
            .then(todo => {
                res.status(201).json({todo})
            })
            .catch(err => {
                if(err.name == 'SequelizeValidationError'){
                    res.status(400).json(err);
                }else{
                    res.status(500).json(err);
                }
            });
    }
    static showTodoById(req, res){
        let id = req.params.id;
        Todo.findByPk(id)
            .then( todo => {
                if(todo) {
                    res.status(200).json({todo})
                }else{
                    res.status(404).json({message : 'Todo not found'})
                }
            })
            .catch( err => {
                res.status(500).json(err);
            });
    }
    static editTodoById(req, res){
        let id = req.params.id;
        const {title, description, status, due_date} = req.body;
        let todo;
        Todo.findByPk(id)
            .then( todoX => {
                if(todoX){
                    todo = todoX;
                    return Todo.update({
                        title : title,
                        description : description,
                        status : status,
                        due_date : due_date
                    }, {where : {id : id}});
                }else{
                    res.status(404).json({message : 'Todo not found'});
                }
            })
            .then(()=> {
                res.status(200).json({todo});
            })
            .catch( err => {
                if(err.name == 'SequelizeValidationError'){
                    res.status(400).json(err);
                }else{
                    res.status(500).json(err);
                }
            });
    }
    static deleteTodoById (req, res){
        let id = req.params.id;
        let todo;
        Todo.findByPk(id)
            .then( todoX => {
                if(todoX){
                    todo = todoX;
                    return Todo.destroy({where:{id:id}});
                }else{
                    res.status(404).json({message : 'Todo not found'});
                }
            })
            .then(()=> {
                res.status(200).json({todo});
            })
            .catch(err => {
                res.status(500).json(err);
            })    
    }

}
module.exports = TodoController;