import React, { Component } from 'react';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEye, faShare } from '@fortawesome/fontawesome-free-solid';

import './css/PostToolbar.css';

export class PostToolbar extends Component {
    constructor(props) {
        super(props);

        // Format posted time
        props.post.posted_at = this.formatPostedTime(props.post.datetime);

        // Set default state
        this.state = {
            post: props.post,
        };
    }

    componentWillReceiveProps(next_props) {
        // Format the posted at time
        next_props.post.posted_at = this.formatPostedTime(next_props.post.datetime);

        this.setState({
            post: next_props.post,
        });
    }

    /**
     * Format the post datetime to a readable format
     * 
     * @param {String} datetime
     */
    formatPostedTime(datetime) {
        let dt = new moment();
        let posted_at = new moment(datetime * 1000);
        let diff = dt.format('X') - posted_at.format('X');

        if (diff >= 60) {
            return posted_at.fromNow();

        } else {
            return `${diff} seconds ago`;
            
        }
    }

    render() {
        let post = this.state.post;

        return (
            <div className="post-toolbar">
                <div className="toolbar-item">
                    <div className="top-row">
                        <a className="user" href={`//${post.account_url}.imgur.com`} target="_blank">
                            {post.account_url}
                        </a>
                    </div>

                    <div className="bottom-row">
                        <span className="posted-at">
                            {post.posted_at}
                        </span>
                    </div>
                </div>
                <div className="toolbar-right">
                    {/* Censor Image */}
                    <div className="toolbar-item icon" onClick={this.props.toggleCensor}>
                        <FontAwesomeIcon icon={faEye} />
                    </div>
                    {/* Open in imgur */}
                    <div className="toolbar-item icon" title="Open in imgur">
                        <a href={post.imgur_url} target="_blank">
                            <FontAwesomeIcon icon={faShare} />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostToolbar;
