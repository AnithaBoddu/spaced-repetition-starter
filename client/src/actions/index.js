//import store from '../store'
import fetch from 'isomorphic-fetch';


export const MAP_USER_TO_STORE = 'MAP_USER_TO_STORE';
export const mapUserToStore = (userData) => ({
	type: MAP_USER_TO_STORE,
	userData: userData
})

export const SUBMIT_USER_ANSWER_TO_ALGO = 'SUBMIT_USER_ANSWER_TO_ALGO';
export const submitUserAnswerToAlgo = (questionHistory, userAnswer) => ({
	type: SUBMIT_USER_ANSWER_TO_ALGO,
    questionHistory: questionHistory,
    userAnswer: userAnswer
})

export const INCREMENT_QUESTION_COUNT = 'INCREMENT_QUESTION_COUNT';
export const incrementQuestionCount = () => ({
	type: INCREMENT_QUESTION_COUNT
})

export const INCREMENT_CORRECT_COUNT = 'INCREMENT_CORRECT_COUNT';
export const incrementCorrectCount = () => ({
	type: INCREMENT_CORRECT_COUNT
})

export const START_OVER = 'START_OVER';
export const startOver = () => ({
	type: START_OVER
})

export const PREVIOUS_ANSWER = 'PREVIOUS_ANSWER';
export const previousAnswer = (previousAnswer) => ({
	type: PREVIOUS_ANSWER,
	previousAnswer: previousAnswer
})

export const FEEDBACK = 'FEEDBACK';
export const feedback = (feedback) => ({
	type: FEEDBACK,
	feedback: feedback
})

export const updateUserInDatabase = (userData) => dispatch => {
	console.log('JSON STRINGIFY' , JSON.stringify(userData));
	return fetch('http://localhost:8080/api/logout', {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userData)
	})
	.then(res => {
		if (!res.ok) {
				throw new Error(res.statusText);
		}
		console.log('THIS IS BEING SENT TO LOG OUT ENDPOINT ', res);
		return res.json();
	})
	.catch(error => {
		return error;
	})
}
