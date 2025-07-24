import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  name: { type: String, require: true },
  id_user: { type: String, require: true }
})

export default mongoose.model('Task', taskSchema)
