import React, { Component } from 'react';
import { connect } from 'react-redux';

import './css/Search.css';
import Post from '../Post';

export class Search extends Component {
    constructor(props) {
        super(props);

        // Store socket in this context
        this.socket = props.socket;

        if (props.match.params.tags) {
            this.tags = [props.match.params.tags];
        } else {
            this.tags = null;
        }

        // Set default state
        this.state = {
            posts: [],
        };

        // Tagged posts returned from the server
        this.postsTagged = this.postsTagged.bind(this);

        // Post event listeners
        this.socket.on('posts:tags', this.postsTagged);
    }

    /**
     * Component is ready for UI events
     */
    componentDidMount() {
        // Fetch gallery posts
        this.fetchPosts();
    }

    /**
     * Component changed, perhaps another search occurred
     */
    componentWillReceiveProps(next_props) {
        if (next_props.match.params.tags) {
            this.tags = [next_props.match.params.tags];

            // Fetch gallery posts
        this.fetchPosts();
        }
    }

    /**
     * Clean up event listeners
     */
    componentWillUnmount() {
        // Remove socket listeners
        this.socket.removeListener('posts:tags', this.postsTagged);
    }

    /**
     * Fetch posts from imgur to display
     */
    fetchPosts() {
        if (this.tags) {
            // Add 'tag' as first array value to tell server we are wanting only tagged posts
            this.tags.unshift('tag');
            this.socket.emit('posts:tags:get', this.tags);
        } else {
            console.error('No tags provided');
        }
    }

    /**
     * Posts matching a tag
     */
    postsTagged(data) {
        console.log(data);
        let posts = data.data.posts;

        // Update UI to show initial posts
        this.setState({
            posts: posts,
        });

        // Scroll to top of page
        this.scrollToTop();
        console.log('Tagged Posts', posts);
    }

    /**
     * Scroll to top of page
     */
    scrollToTop() {
        this.toTop.scrollIntoView({
            behavior: 'smooth',
        });
    }

    render() {
        // The visible posts in the gallery
        var posts = [];

        if (this.state.posts.length) {
            // There are posts in the gallery
            this.state.posts
                .map((post, i) => {
                    return posts.unshift(
                        <Post key={i} post={post} />
                    );
                });
        }

        return (
            <div className="row gallery-container max-height">
                <div className="col-12">
                    <div style={{ float:"left", clear: "both" }} ref={(el) => { this.toTop = el; }}></div>
                    {posts}
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

export default connect(mapStateToProps)(Search);
