import mongoose from 'mongoose'


const connectionString = "mongodb+srv://practice:practice123@cluster0-ci08i.mongodb.net/test?retryWrites=summit&w=majority"
// this should work "mongodb+srv://student:student123@cluster0-y7mvx.mongodb.net/test?retryWrites=summit&w=majority"
// "mongodb+srv://student:student123@cluster0-os1xb.mongodb.net/test?retryWrites=summit&w=majority"
//change to my mongodb account

let connection = mongoose.connection

mongoose.connect(connectionString)

connection.on('error', err => {
  console.error('[DATABASE ERROR]:', err)
})

connection.once("open", () => {
  console.log('Connected to the Database')
})