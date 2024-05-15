const express = require('express');
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const fs = require('fs')
var clientRouter = require('./client')

const PORT = process.env.PORT || 3009;

const app = express();

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//app.use('/client', clientRouter)

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/backend', (req, res) => {
    res.send('I am from the backend')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.get('/client', (req, res) => {
    //const filePath = path.resolve(__dirname, '..', 'client', 'build', 'clients.json');
    const filePath = path.join(__dirname, 'client/build/clients.json')
    res.sendFile(filePath)
    //res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.post('/client', (req, res) => {
    //const filePath = path.join(__dirname, 'client/build/clients.json')/
    const filePath = path.resolve(__dirname, '..', 'client', 'build', 'clients.json');
    console.log(filePath)
    fs.readFile(filePath, (err, data) => {
        if (data && !err) { 
            var parsedData = JSON.parse(data)
            parsedData.push(req.body)
            console.log(parsedData)
            fs.writeFile(filePath, JSON.stringify(parsedData, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({msg: "Unable to save"})
                }
                    return res.status(200).json({msg:"Saved successfully"})
                
            })
        }else{
            const filePath = path.resolve(__dirname, '..', 'client', 'build', 'clients.json');
            //const filePath = path.join(__dirname, 'client/build/clients.json')
            var parsedData = []
            parsedData.push(req.body)
            console.log(parsedData)
            fs.writeFile(filePath, JSON.stringify(parsedData, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({msg: "Unable to save"})
                }
                    return res.status(200).json({msg:"Saved successfully"})
                
            
        })
    }
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})

module.exports = app