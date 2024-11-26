import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
  movie: { type: String, required: true },
  language: { type: String, required: true },
  format: { type: String, required: true },
  showTimes: [String],
  multiplex: { type: String, required: true },
  screen: { type: Number, required: true },
  seats: [Number],
  availableSeats: [Number]
});


showSchema.index({ movie: 1 });
showSchema.index({ language: 1 });
showSchema.index({ multiplex: 1 });
showSchema.index({ movie: 1, language: 1, multiplex: 1 });

const Show = mongoose.model('Show', showSchema);

export default Show;
