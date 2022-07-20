const express = require('express')
const db = require('./models')
var cors = require('cors')
const app = express()
const port = 3000
app.use(express.json());
app.use(cors())

db.sequelize.sync().then(() => {
    console.log("Synced")
}).catch(err => console.err(err))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

require('./routes/user.route')(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
