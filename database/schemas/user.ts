import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  pwd: { type: String, required: true }
})

export default mongoose.model('User', UserSchema)
