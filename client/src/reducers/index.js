import update from 'immutability-helper';
import * as actions from '../actions/index';
import store from '../store';
import { spacedAlgo } from '../algorithm.js';
//import { insertionSort } from '../algorithm.js';


const initialState = {
    _id: '',
    googleId: '',
    accessToken: '',
    questionHistory: 'hello',
    email: '',
    name: '',
    sessionHistory: {
        questions: 0,
        correctAnswers: 0
    },
    answerHistory: {
        questions: 0,
        correctAnswers: 0
    },
    feedback: "",
    previousAnswer: "" 
}

export const mainReducer = (state= initialState, action) => {
    if (action.type === actions.MAP_USER_TO_STORE) {
        setTimeout(()=> { console.log(store.getState(), "THIS IS THE MAP_USER_TO_STORE GETSTATE()")}, 3000);
     
        return update(state, {
            _id: {$set: action.userData._id},
            googleId: {$set: action.userData.googleId},
            accessToken: {$set: action.userData.accessToken},
            questionHistory: {$set: action.userData.questionHistory},
            email: {$set: action.userData.email},
            name: {$set: action.userData.name},
            answerHistory: {$set: action.userData.answerHistory}
        })
    }

    if (action.type === actions.SUBMIT_USER_ANSWER_TO_ALGO) {
        setTimeout(()=> { console.log(store.getState(), "THIS IS THE SUBMIT_USER_ANSWER_TO_ALGO GETSTATE()")}, 3000);
        console.log('THIS IS THE ACTION.QUESTHISTORY ', action.questionHistory)
        console.log('THIS IS THE ACTION.USER ANSWER ', action.userAnswer)
        
        let sortedquestionHistory = spacedAlgo(action.questionHistory, action.userAnswer)
        console.log('THIS SHOULD BE A SORTED ARRAY ', sortedquestionHistory)
       
        return update(state, {
            questionHistory: {$set: sortedquestionHistory}
        })
    }

    
    if (action.type === actions.INCREMENT_QUESTION_COUNT) {
        setTimeout(()=> { console.log(store.getState(), "THIS IS THE INCREMENT_QUESTION_COUNT GETSTATE()")}, 3000);
        return update(state, {
            answerHistory: {
                questions: {$apply: function(x) {return x + 1}}},
            sessionHistory: {
                questions: {$apply: function(x) {return x + 1}}}
        })
    }

    if (action.type === actions.INCREMENT_CORRECT_COUNT) {
        setTimeout(()=> { console.log(store.getState(), "THIS IS THE INCREMENT_CORRECT_COUNT GETSTATE()")}, 3000);
        return update(state, {
            answerHistory: {
                correctAnswers: {$apply: function(x) {return x + 1}}},
            sessionHistory: {
                correctAnswers: {$apply: function(x) {return x + 1}}}
        })
    }

    if (action.type === actions.START_OVER) {
    setTimeout(()=> { console.log(store.getState(), "THIS IS THE START_OVER GETSTATE()")}, 3000);      
    return update(state, {
            answerHistory: {
                correctAnswers: {$set: 0},
                questions: {$set: 0}
            },
            sessionHistory: {
                correctAnswers: {$set: 0},
                questions: {$set: 0}
            },
            previousAnswer: {$set: ""},
            feedback: {$set: ""}
        })
    }


    if (action.type === actions.PREVIOUS_ANSWER) {
    setTimeout(()=> { console.log(store.getState(), "THIS IS THE PREVIOUS_ANSWER GETSTATE()")}, 3000);     
    return update(state, {  
            previousAnswer: {$set: action.previousAnswer}
        })
    }
    
    
    if (action.type === actions.FEEDBACK) {   
    setTimeout(()=> { console.log(store.getState(), "THIS IS THE FEEDBACK GETSTATE()")}, 3000);     
    return update(state, {
            feedback: {$set: action.feedback}
        })
    }

	return state;
}











