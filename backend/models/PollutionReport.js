const mongoose = require('mongoose');

const pollutionReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: [true, 'Fotoğraf zorunludur']
  },
  description: {
    type: String,
    default: ''
  },
  locationName: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Bekliyor', 'Temizlendi'],
    default: 'Bekliyor'
  },
  likeCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PollutionReport', pollutionReportSchema);
