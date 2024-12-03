const mongoose = require('mongoose')
const shortId = require('shortid')

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
}, {timestamps: true, 
  toJSON: {virtuals: true}, 
  toObject: {virtuals: true}
 });

shortUrlSchema.virtual('https').get(function() {
  return this.full.startsWith('https') ? 'YES' : 'NO';
});


module.exports = mongoose.model('ShortUrl', shortUrlSchema)