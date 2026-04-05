const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Ad ve soyad zorunludur'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'E-posta zorunludur'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Şifre zorunludur'],
    minlength: 6
  },
  profilePhoto: {
    type: String,
    default: ''
  },
  totalLikes: {
    type: Number,
    default: 0
  },
  points: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
