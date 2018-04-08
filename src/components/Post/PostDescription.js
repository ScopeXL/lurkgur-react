import React, { Component } from 'react';

import './css/PostDescription.css';

export class PostDescription extends Component {
    constructor(props) {
        super(props);

        // Set default state
        this.state = {
            description: props.description,
        };
    }

    componentWillReceiveProps(next_props) {
        this.setState({
            description: next_props.description,
        });
    }

    render() {
        let description = this.state.description;

        return (
            <div className="post-description">
                {description}
            </div>
        );
    }
}

export default PostDescription;
