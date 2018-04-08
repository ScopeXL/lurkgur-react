import React, { Component } from 'react';
import $ from 'jquery';

import './css/Post.css';
import PostImage from './PostImage';
import PostToolbar from './PostToolbar';
import PostTitle from './PostTitle';
import PostDescription from './PostDescription';

export class Post extends Component {
    constructor(props) {
        super(props);

        // Set default state
        this.state = {
            post: props.post,
        };

        if (props.post.cover_image) {
            let post_img = new Image();

            post_img.onload = function() {
                // Only slide down once image is loaded
                $('.post-hidden').slideDown(500, function() {
                    $(this).removeClass('post-hidden');
                });
            };

            post_img.onerror = post_img.onabort = function(e) {
                // Image failed to load, oh well. Onto the next!
                console.error('Image failed to load, dequeue', props.post);
            };

            post_img.src = props.post.cover_image.imgLink;
        }

        // Censor images when user clicks the eye icon
        this.toggleCensor = this.toggleCensor.bind(this);
    }

    componentWillReceiveProps(next_props) {
        this.setState({
            post: next_props.post,
        });
    }

    /**
     * Toggle the post image(s) to be hidden due to content they
     * may not want to see
     */
    toggleCensor() {
        let post = this.state.post;

        post.censored = !post.censored;

        this.setState({
            post: post,
        });

        console.log('Censor Toggle', post.censored);
    }

    render() {
        let post = this.state.post;
        let post_class = 'post' + (post.hidden ? ' post-hidden' : '');

        if (post.cover_image) {
            // Show the post if it has a cover image
            return (
                <div className={post_class}>
                    <div className="row">
                        <div className="col-5">
                            <PostImage post={post} image={post.cover_image} details={false} toggleCensor={this.toggleCensor} />
                        </div>
                        <div className="col-7">
                            <PostToolbar post={post} toggleCensor={this.toggleCensor} />
                            <PostTitle title={post.title} tags={post.post_tags} />
                            <PostDescription description={post.description} />
                        </div>
                    </div>
                </div>
            );
        } else {
            // Ignore this post
            return '';
        }
    }
}

export default Post;
