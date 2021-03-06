const express = require('express')  
var bodyParser = require('body-parser');

const app = express()  
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const port = 8000

var keyValueStore = {}

app.get('/:key/', (req, res) => {  
	var key = req.params.key

	if (key in keyValueStore) {
		res.send(keyValueStore[key])
	} else {
		res.status(404).send("Key not found")
	}
})

app.post('/:key/', function(req, res) {
	var key = req.params.key
	var value = req.body.value

	console.log(key + "=" + value)

	keyValueStore[key] = value
	res.send('')
})

app.listen(port, (err) => {  
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})
