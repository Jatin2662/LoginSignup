


const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGO_CONNECTION
).then(()=>{
    console.log("Connected to Database.")
}).catch((err)=>{
    console.log("Unable to Connect.", err)
})
