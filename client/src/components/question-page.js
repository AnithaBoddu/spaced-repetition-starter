import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
//import Store from '../store';

class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        fetch('/api/questions', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(userData =>
           this.props.dispatch(actions.mapUserToStore(userData))
        )
    }

    render() {
    
        let question = this.props.questionHistory[0].question;
        //let answer = this.props.questionHistory[0].answer;

        return (
            
            <div className="center">  
            <div className="question-list card center">
                <div className="question">
                    <h3 className="latin">What do you call '{question}' in English ? </h3>
                </div>
            </div>
            </div>
            
        );
    }
}


const mapStateToProps = (state, props) => ({
    _id: state._id,
    googleId: state.googleId,
    accessToken: state.accessToken,
    questionHistory: state.questionHistory,
    email: state.email,
    name: state.name,
    answerHistory: state.answerHistory
});

export default connect(mapStateToProps)(QuestionPage);