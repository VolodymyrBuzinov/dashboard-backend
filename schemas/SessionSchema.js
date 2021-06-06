const mongoose = require('mongoose');
const { Schema } = mongoose;

const sessionSchema = new Schema(
  {
    uid: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Uid is required'],
    },
  },
  { versionKey: false, timestamps: true },
);

const session = mongoose.model('session', sessionSchema);

module.exports = session;
