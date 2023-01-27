const express = require("express");
const router = express.Router();

const users=[
    {id:0,name:'John'},
    {id:1,name:'Jane'}
];

function insertPerson(u) {
    u.id = users.length;
    users.push(u);
    return u;
}

function removePerson(id) {
    users = users.filter(u => u.id !== +id);
}

router
    .delete('/person/:id',
    (req, res) => {
        removePerson(req.params.id);
        res
            .status(204)
            .end();
    })

router
    .post('/api/user/signup',
    (req, res) => {
        const u = insertPerson(req.body);
        res.status(201)
            .set('Location', '/persons/' + u.id)
            .json(users);
    })

router
    .get("/api/users",(req,res)=>{
        res.json(users);
    })



module.exports = router;