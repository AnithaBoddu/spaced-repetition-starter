const mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    googleId: {type: String, required: true},
    accessToken: {type: String, required: true},
    questionHistory: [{
        question: String,
        answer: String,
        mValue: Number
    }],
    email: String,
    name: String,
    answerHistory: {
        questions: Number,
        correctAnswers: Number
    }
});


userSchema.methods.apiRepr = function () {
    return {
        id: this._id,      
        googleId: this.googleId,
        accessToken: this.accessToken,
        questionHistory: this.questionHistory,
        email: this.email,
        name: this.name,
        answerHistory: this.answerHistory       
    }
}

var questionSchema = mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true},
    mValue: {type: Number, default: 1}
});

questionSchema.methods.apiRepr = function () {
    return {
        question: this.question,
        answer: this.answer,
        mValue: this.mValue
    }
}



const Question = mongoose.model('Question', questionSchema)
const User = mongoose.model('User', userSchema);

module.exports = { User, Question }

