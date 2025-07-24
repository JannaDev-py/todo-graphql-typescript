import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  id_user: { type: String, required: true }
})

taskSchema.index({ id_user: 1, title: 1 }, { unique: true })

export default mongoose.model('Task', taskSchema)
