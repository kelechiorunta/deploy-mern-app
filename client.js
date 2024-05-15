const express =  require('express')
const path =  require('path')
const fs =  require('fs')
const cookieParser = require('cookie-parser')

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

console.log(__dirname)

router.get('/', (req, res) => {
    const filePath = path.resolve(__dirname, '..', 'client', 'build', 'clients.json');
    res.sendFile(filePath);
})

router.post('/', (req, res) => {
    const filePath = path.resolve(__dirname, '..', 'client', 'build', 'clients.json');
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

module.exports = router