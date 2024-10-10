const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['LIBRARIAN', 'MEMBER'], required: true },
  history: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      borrowedAt: { type: Date, default: Date.now },
      returnedAt: { type: Date }
    }
  ]
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
