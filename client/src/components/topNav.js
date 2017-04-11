import React from 'react';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import store from '../store';
//import {SERVER_ROOT} from '../config';

export class TopNav extends React.Component {
	constructor(props) {
    	super(props)
	    this.updateUserInDatabase = this.updateUserInDatabase.bind(this);
        this.startOver = this.startOver.bind(this);
    }

    updateUserInDatabase() {
        this.props.dispatch(actions.updateUserInDatabase(this.props)) 
    }

    startOver() {
        this.props.dispatch(actions.startOver());
    }


    render () {

        console.log('THIS.PROPS' ,this.props)

        let userName = this.props.name;

        let currentSessionQuestionCount = this.props.sessionHistory.questions;
        let currentSessionCorrectCount = this.props.sessionHistory.correctAnswers;

        let lifetimeQuestionCount = this.props.answerHistory.questions;
        let lifetimeCorrectCount = this.props.answerHistory.correctAnswers;


          
  return (
        <div> 
            <div className="topBar">
                <div className="top-left">
                    <h3>Welcome, {userName}</h3>
                </div>
                <div className="top-center">
                    <h1 className="lastingLatium">Lasting Latium</h1>
                </div>
                <div className="top-right">
                    <button className="start-over btn daisy"   ><a className="center"  onClick={this.startOver} >Start Over</a></button>
                    <button className="log-out btn daisy" ><a className="center"  onClick={this.updateUserInDatabase} href='/api/auth/logout'>Log Out</a></button>
                </div>          
            </div>           
            <div className="current-score">       
                <p >Your current score is {currentSessionCorrectCount} out of {currentSessionQuestionCount} </p>
                <p >Your lifetime score is {lifetimeCorrectCount} out of {lifetimeQuestionCount} </p>
            </div> 
        </div>   
  );
}}


const mapStateToProps = (state, props) => ({
    _id: state._id,
    googleId: state.googleId,
    accessToken: state.accessToken,
    questionHistory: state.questionHistory,
    email: state.email,
    name: state.name,
    answerHistory: state.answerHistory,
    sessionHistory: state.sessionHistory

});

export default connect(mapStateToProps)(TopNav);





// -Styling


