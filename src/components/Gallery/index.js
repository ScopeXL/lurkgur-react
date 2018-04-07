import React, { Component } from 'react';
import { connect } from 'react-redux';

import './css/Gallery.css';
import Post from '../Post';

export class Gallery extends Component {
    constructor(props) {
        super(props);

        // Store socket in this context
        this.socket = props.socket;

        // Set default state
        this.state = {
            posts: [],
        };

        // Post queue to scroll
        this.queue = [];

        // Queue interval to dequeue (in milliseconds)
        this.queue_interval = 3000;

        // Use to prevent multiple dequeue jobs
        this.dequeue_scheduled = false;

        // Use as the timer to dequeue
        this.dequeue_tmr = null;

        // Fetch Posts
        this.fetchPosts = this.fetchPosts.bind(this);

        // When new posts are made to imgur
        this.postsNew = this.postsNew.bind(this);

        // Retrieve latest posts response from server
        this.postsLatest = this.postsLatest.bind(this);

        // Schedule a dequeue to happen for a post
        this.scheduleDequeue = this.scheduleDequeue.bind(this);

        // Dequeue a post
        this.dequeue = this.dequeue.bind(this);

        // Post event listeners
        this.socket.on('posts:new', this.postsNew);
        this.socket.on('posts:latest', this.postsLatest);
    }

    /**
     * Component is ready for UI events
     */
    componentDidMount() {
        // Fetch gallery posts
        this.fetchPosts();

        // Schedule the first dequeue
        this.scheduleDequeue();
    }

    /**
     * Clean up event listeners
     */
    componentWillUnmount() {
        // Remove socket listeners
        this.socket.removeListener('posts:new', this.postsNew);
        this.socket.removeListener('posts:latest', this.postsLatest);

        // Cancel any pending dequeue jobs
        clearTimeout(this.dequeue_tmr);
    }

    /**
     * Fetch posts from imgur to display
     */
    fetchPosts() {
        this.socket.emit('posts:latest:get');
    }

    /**
     * Latest posts from imgur user submitted gallery
     */
    postsLatest(data) {
        let posts = JSON.parse(data.data.posts);
        // Show the last 7 posts and queue the first 3
        let posts_active = posts.slice(3);
        let posts_queued = posts.slice(0, 3);

        posts_queued.map((post) => {
            // Queue post to achieve slide animation while waiting for new posts
            return this.queue.push(post);
        });

        // Update UI to show initial posts
        this.setState({
            posts: posts_active,
        });

        console.log('Latest Posts', posts);
        console.log('Active', posts_active);
        console.log('Queued', posts_queued);
    }

    /**
     * When new posts are made to imgur
     * 
     * @param {Object} data the post data from imgur
     */
    postsNew(data) {
        console.log('posts:new', data);

        if (data.posts) {
            data.posts.forEach((post) => {
                if (!post.nsfw) {
                    // Post is not marked mature, add to queue
                    this.queue.unshift(post);
                }
            });
        }

        // Recalculate the dequeue interval
        if (this.queue.length > 0) {
            // Prevent dividing by zero
            this.queue_interval = Math.floor((17 / this.queue.length) * 1000);
            this.scheduleDequeue();
        }
    }

    /**
     * Dequeue the next post in the queue
     */
    dequeue() {
        // Only dequeue if feed is enabled and there are items to dequeue
        if (this.queue.length && this.props.feed.enabled) {
            // Next post in the queue
            let post = this.queue[0];
            // Posts in the UI
            let posts = this.state.posts;

            // Add post to the UI
            posts.push(post);

            this.setState({
                posts: posts,
            });

            // Remove post from queue
            this.queue = this.queue.slice(1);

            // Schedule the next dequeue
            this.scheduleDequeue();

        } else {
            console.log('Queue is empty, or feed disabled');
        }
    }

    /**
     * Schedule the next dequeue job
     */
    scheduleDequeue() {
        if (this.dequeue_scheduled) {
            // A dequeue is already going to happen, don't trigger it twice
            return;
        }

        // Prevent multiple dequeue's from stacking
        this.dequeue_scheduled = true;

        this.dequeue_tmr = setTimeout(() => {
            this.dequeue_scheduled = false;
            this.dequeue();
        }, this.queue_interval);
    }

    render() {
        // The visible posts in the gallery
        var posts = [];

        if (this.state.posts.length) {
            // There are posts in the gallery
            this.state.posts
                .map((post, i) => {
                    if (i === (this.state.posts.length - 1)) {
                        // Hide first post to achieve animation
                        post.hidden = true;
                    } else {
                        // Un-hide post if previously hidden
                        if (post.hidden) {
                            post.hidden = false;
                        }
                    }

                    return posts.unshift(
                        <Post key={i} post={post} />
                    );
                });
        }

        return (
            <div className="row gallery-container max-height">
                <div className="col-12">
                    {posts}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        socket: state.socket,
        feed: state.feed,
    };
}

export default connect(mapStateToProps)(Gallery);
