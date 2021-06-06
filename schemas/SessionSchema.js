const mongoose = require('mongoose');
const { Schema } = mongoose;

const sessionSchema = new Schema(
  {
    uid: {
      type: String,
      required: [true, 'Sid is required'],
    },
  },
  { versionKey: false, timestamps: true },
);

const session = mongoose.model('session', sessionSchema);

module.exports = session;
