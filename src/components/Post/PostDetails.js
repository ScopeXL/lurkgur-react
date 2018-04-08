import React, { Component } from 'react';
import { connect } from 'react-redux';

import './css/PostDetails.css';
import PostToolbar from './PostToolbar';
import PostImage from './PostImage';
import PostTitle from './PostTitle';
import PostDescription from './PostDescription';

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
        let post = this.state.post;
        let images = [];

        if (post) {
            if (post.images) {
                post.images.map((image, i) => {
                    return images.push(
                        <div key={i}>
                            <PostImage post={post} image={image} details={true} />
                            <PostTitle title={image.title} />
                            <PostDescription description={image.description} />
                        </div>
                    );
                });
            }
            return (
                <div className="row post-details-container max-height">
                    <div className="col-12 col-sm-12 col-md-10 offset-md-1">
                        <PostToolbar post={post} />
                        <PostTitle title={post.title} tags={post.post_tags} />
                        {images}
                    </div>
                </div>
            );
        } else {
            return 'Loading...';
        }
    }
}

function mapStateToProps(state) {
    return {
        socket: state.socket,
    };
}

export default connect(mapStateToProps)(PostDetails);
