const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const secret = require('./secret');
const { User, Question } = require('./models');
const app = express();

mongoose.Promise = global.Promise;
const jsonParser = bodyParser.json();

const database = {
};

app.use(passport.initialize());

passport.use(
    new GoogleStrategy({
        clientID:  '444740250195-l1ffmpv38gb4jebtladcmnlu6ab78fcn.apps.googleusercontent.com',
        clientSecret: 'Y-5PC-vGSGKaDLonlO27NlPE',
        callbackURL: `/api/auth/google/callback`
        
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log(process.env.SECRET,  'SECRET key from heroku');
        
        let questionHistory = [];
       
        Question
            .find()
            .exec()
            .then(res => {
                questionHistory = res;
            })

        User
            .findOne({googleId: profile.id}) 
            .exec()
            .then(user => {
                if (!user) {
                    var newUser = {
                        googleId: profile.id,
                        accessToken: accessToken,
                        questionHistory: questionHistory,
                        name: profile.displayName,
                        answerHistory: {
                            questions: 0,
                            correctAnswers: 0
                        } 
                    }
                    console.log('NEW USER ', newUser)
                    return User
                        .create(newUser)
                }
                else {
                    console.log('Updating accessToken for the existing user');
                    return User
                        .findOneAndUpdate({"googleId" : profile.id}, {$set:{accessToken : accessToken}}, {new: true})
                }
            })             
            .then(user => {
                console.log('USER ',user)
                return cb(null, user)
            })
            .catch(err => {
                console.log(err);
            })
    }
));

passport.use(
    new BearerStrategy(
        
        (accessToken, cb) => {

        User.findOne({accessToken: accessToken}, function(err,user){
            if(err){
                console.log('ERROR WITH BEARER ');
                return cb(err);
            }
            if(!user){
                console.log('NO USER FOUND IN BEARER')
                return cb(null, false)
            }
            else {
                console.log('USER FOUND IN BEARER ')
                console.log(user);
                return cb(null, user, {scope: 'all'})
            }
        })
        }
    )
);

app.get('/api/auth/google',
    passport.authenticate('google', {scope: ['profile']}));

app.get('/api/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        res.cookie('accessToken', req.user.accessToken, {expires: 0});
        res.redirect('/');
    }
);

app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

app.put('/api/logout', jsonParser, (req, res) => {
    res.status(200)
    console.log('IS THIS WORKING???? ', req.body.answerHistory)

    User
        .findOneAndUpdate({"googleId": req.body.googleId}, {$set:{"questionHistory": req.body.questionHistory, "answerHistory": req.body.answerHistory}})
        .exec()
        .then(updatedStudent => res.status(201).json())
        .catch(err => res.status(500).json({message: 'Your update was unsuccessful'}));
});

app.get('/api/me',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json({
        googleId: req.user.googleId
    })
);

app.get('/api/questions',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json(req.user)
);

app.post('/questions', jsonParser, (req, res) => {
    console.log('endpoint reached', req.body);
    Question
        .create({
            question: req.body.question,
            answer: req.body.answer,
            mValue: req.body.mValue
        })
        .then(response => {
            console.log('RESPONSE OBJECT (QUESTIONS ADDED)', response)
            res.status(201).json(response.apiRepr())
        })
        .catch(err => {
            res.status(500).json({error: '500 error'})
        })
});

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));


app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb://latin:latin@ds139470.mlab.com:39470/spaced_repetition', function(err) {
            if(err) {
                return reject(err);
            }

            server = app.listen(port, () => {
                resolve();
            }).on('error', reject);
        })
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
