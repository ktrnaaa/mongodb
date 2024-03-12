import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  response: { type: String, enum: ['Так', 'Ні'], required: true }
});

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;
