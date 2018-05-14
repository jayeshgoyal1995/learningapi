import express from 'express';
import api from './routes/index'

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', api);

app.use('/', express.static(__dirname+"/public"));



app.listen(5060, ()=> console.log("Backend server running on Port: 5060"));