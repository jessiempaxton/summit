import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
let Schema = mongoose.Schema

//bcrypt uses hashing and salt to obfiscate your password 
const SALT = 10


let _schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  icon: { type: String },
  points: { type: Number, required: true, default: 0 },
  level: { type: Number, required: true, default: 0 },
  summits: [{ type: Number, required: true, default: 0 }],
  mostRecentSunday: { type: Number, required: true, }
}, { timestamps: true })

//schema.methods are used to add a method to a Model instance
_schema.methods.validatePassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.hash, function (err, isMatch) {
      if (err || !isMatch) {
        return reject(err)
      }
      return resolve(isMatch)
    })
  })
}

export default class UserService {
  get repository() {
    return mongoose.model('User', _schema)
  }
  generateHash(password) {
    return bcrypt.hashSync(password, SALT)
  }
}


