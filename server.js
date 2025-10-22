import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import bolgRouts from './routs/bolgRouts.js';
import { setEngine } from 'crypto';

// express setup
const app = express();
const PORT = 3001;

// middleware setup
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');

// file folder setup
if(!fs.existsSync('posts.json')) fs.writeFileSync('posts.json','[]');
if(!fs.existsSync('uploads')) fs.mkdirSync('uploads');

// multer setup
const storage = multer.diskStorage({
    destination: 'uploads/', 
    filename: (_,file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

// rout handling 
app.use('/', (bolgRouts (upload)));

app.listen(PORT, ()=>{
    console.log("server is running")
})

