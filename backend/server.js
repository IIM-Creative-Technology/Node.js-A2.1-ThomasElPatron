const express = require('express')
const app = express()
//const cors = require("cors")
const port = 3000

app.use(express.json())
//app.use(cors())

app.get('/', (req, res) => {
    console.log(req.query.year)
    res.json('{msg:Hello World!}')
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port }`)
})