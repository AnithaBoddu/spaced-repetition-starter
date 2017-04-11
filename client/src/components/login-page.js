import React from 'react';

export default function LoginPage() {
    return (<div className="center">
            <h1 className="center spacedtop biggest">Lasting Latium</h1>
            <h3 className="center spaced big"><i>Learn latin using spaced repetition now!</i></h3>
            <button className="btn daisy spacedsmall ">
            <a className="center" href='/api/auth/google'>Sign Up/Log In</a>
            </button>
        </div>
    
    )
   
}
