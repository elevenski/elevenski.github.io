const config = require("platformsh-config").config();
const express = require('express')
const app = express()
app.get('/*', (req, res) => {
    res.status(404).send('Sorry, that page cannot be found.')
})
app.listen(config.port, () => {
    console.log(`[INFO]: ExpressJS listening on ${config.port}.`)
})
