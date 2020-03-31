const { Todo } = require('../models');
function authorization (req, res, next){
    Todo.findByPk(req.params.id)
        .then( todo => {
            if(!todo){
                res.status(404).json({message: 'Todo not found'})
            }else{
                if(todo.UserId == req.userId){
                    next()
                }else{
                    res.status(400).json({message: 'Access Forbidden'})
                }
            }
        })
        .catch( err => {
            res.status(500).json({message: err.message});
        });
}
module.exports = authorization;