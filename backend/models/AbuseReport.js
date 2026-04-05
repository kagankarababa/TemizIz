const mongoose = require('mongoose');

const abuseReportSchema = new mongoose.Schema({
  reporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetId: {
    type: String,
    required: [true, 'Şikayet edilen içerik ID zorunludur']
  },
  reason: {
    type: String,
    required: [true, 'Şikayet sebebi zorunludur'],
    trim: true
  },
  status: {
    type: String,
    enum: ['Bekliyor', 'İncelendi', 'Reddedildi'],
    default: 'Bekliyor'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AbuseReport', abuseReportSchema);
