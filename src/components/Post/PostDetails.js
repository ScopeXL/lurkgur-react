import React, { Component } from 'react';
import { connect } from 'react-redux';

export class PostDetails extends Component {
    constructor(props) {
        super(props);

        if (props.match.params.postId) {
            this.post_id = props.match.params.postId;
        } else {
            this.post_id = null;
        }

        // Store socket in this context
        this.socket = props.socket;

        // Set default state
        this.state = {
            post: null,
        };

        // Retrieve post details response from server
        this.postDetails = this.postDetails.bind(this);

        // Post event listeners
        this.socket.on('post:details', this.postDetails);
    }

    /**
     * Component is ready for UI events
     */
    componentDidMount() {
        if (this.post_id) {
            // Fetch post details
            this.fetchPostDetails();
        }
    }

    /**
     * Clean up event listeners
     */
    componentWillUnmount() {
        // Remove socket listeners
        this.socket.removeListener('post:details', this.postDetails);
    }

    /**
     * Fetch post details from imgur to display
     */
    fetchPostDetails() {
        this.socket.emit('post:details:get', this.post_id);
    }

    /**
     * The details of the specific post
     */
    postDetails(data) {
        let post = JSON.parse(data.data.post);

        // Update UI to show post
        this.setState({
            post: post,
        });

        console.log('Post', post);
    }

    render() {
        return (
            <div className="row max-height">
                <div className="col-12">
                    Post Details
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        socket: state.socket,
    };
}

export default connect(mapStateToProps)(PostDetails);
