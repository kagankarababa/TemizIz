const mongoose = require('mongoose');

const cleanReportSchema = new mongoose.Schema({
  pollutionReportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PollutionReport',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: [true, 'Temizlik fotoğrafı URL zorunludur']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CleanReport', cleanReportSchema);
