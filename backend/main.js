


const express = require('express');
const app = express();
require('dotenv').config();
require('./utils/db')
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
const ProductRouter = require('./routes/ProductRouter');
const AdminRouter = require('./routes/AdminRouter');
const GuestRouter = require('./routes/GuestRouter');

const PORT = process.env.PORT || 8080;


app.get('/', (req, res)=>{
    res.json({ message : "Hii" })
})


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }))

app.use('/auth', AuthRouter);
app.use('/product', ProductRouter);
app.use('/admin', AdminRouter);
app.use('/post', GuestRouter)


app.listen(PORT, ()=>{
    console.log(`Running on Port ${PORT}`)
})