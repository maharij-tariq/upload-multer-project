import express from 'express'
import multer from 'multer'
import path from 'path';
const app = express()
const PORT = 5002;

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/')
    },
    filename: function(req,file,cb){
        const uniquename = Date.now() + path.extname(file.originalname) 
        cb(null,uniquename)
    }
})
import fs from 'fs'
if(!fs.existsSync('uploads/')){
    fs.mkdirSync('uploads/')
}

const uploads = multer({storage: storage})

app.get('/',(req,res)=>{
    res.send(`<h1>upload images in folder</h1>
        <form action="/uploads" method="post" enctype= "multipart/form-data">
        <input type="file" name="myfile" required>
        <button type="submit">uploads file</button>
        </form>
        `)
})
app.post('/uploads',uploads.single('myfile'),(req,res)=>{
    console.log(req.file)
    if(!req.file){
        res.status(404).send('please select a file ')
    }
res.send('upload file successfully' + req.file.filename)
})

app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`)
})