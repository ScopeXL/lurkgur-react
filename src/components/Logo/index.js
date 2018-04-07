import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/fontawesome-free-solid';

import './css/Logo.css';

export class Logo extends Component {
    constructor(props) {
        super(props);

        // Setup default state
        this.state = {
            feed: props.feed,
        };

        this.toggleFeed = this.toggleFeed.bind(this);
    }

    componentWillReceiveProps(next_props) {
        this.setState({
            feed: next_props.feed,
        });
    }

    /**
     * Toggle the Feed to start/stop scrolling
     */
    toggleFeed() {
        let feed = this.state.feed;

        feed.enabled = !feed.enabled;

        this.setState({
            feed: feed,
        });
    }

    render() {
        let is_paused = this.state.feed.enabled ? false : true;
        let play_pause_icon;

        if (is_paused) {
            play_pause_icon = <FontAwesomeIcon icon={faPlay} />
        } else {
            play_pause_icon = <FontAwesomeIcon icon={faPause} />
        }

        return (
            <div className="logo">
                <div className="icon float-right" onClick={this.toggleFeed}>
                    {play_pause_icon}
                </div>

                <img src="/images/lurkgur.png" alt="lurkgur" />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        feed: state.feed
    };
}

export default connect(mapStateToProps)(Logo);
