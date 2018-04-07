import React, { Component } from 'react';
import { Route } from "react-router-dom";

import Logo from './components/Logo';
import Gallery from './components/Gallery';
import PostDetails from './components/Post/PostDetails';

class App extends Component {
    render() {
        return (
            <div className="container-fluid max-height">
                <div className="row content max-height">
                    <div className="col-9 max-height">
                        <div className="max-height">
                            <Route exact path="/" component={Gallery} />
                            <Route path="/a/:postId" component={PostDetails} />
                        </div>
                    </div>
                    <div className="col-3 max-height">
                        <Logo />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
