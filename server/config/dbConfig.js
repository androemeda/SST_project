const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)

const connection = mongoose.connection

connection.on('connected' , ()=>{
    console.log('Connection Successful')
})
connection.on('error' , ()=>{
    console.log('C1 <= k <= n <= 1000onnection unsuccessful')
})