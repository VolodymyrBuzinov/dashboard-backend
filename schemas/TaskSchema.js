const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const taskSchema = new Schema(
  {
    category: {
      type: String,
      required: [true, 'Set category for quest'],
    },
    difficulty: {
      type: String,
      required: [true, 'Set difficulty for quest'],
    },
    title: {
      type: String,
      required: [true, 'Set title for quest'],
    },
    challenge: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    },
    done: {
      type: Boolean,
      default: false,
    },
    time: {
      type: String,
      required: [true, 'Set time for quest'],
    },
  },
  { versionKey: false, timestamps: true },
);

taskSchema.plugin(mongoosePaginate);
const tasks = mongoose.model('task', taskSchema);

module.exports = tasks;
