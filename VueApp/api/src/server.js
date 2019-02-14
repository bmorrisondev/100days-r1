require('custom-env').env(true)
const app = require('./app')
const port = process.env.APP_PORT

app.listen(port)
console.log(`listening on http://localhost:${port}`)