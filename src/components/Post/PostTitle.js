import React, { Component } from 'react';

import './css/PostTitle.css';

export class PostTitle extends Component {
    constructor(props) {
        super(props);

        // Set default state
        this.state = {
            title: props.title,
            tags: props.tags,
        };
    }

    componentWillReceiveProps(next_props) {
        this.setState({
            title: next_props.title,
            tags: next_props.tags,
        });
    }

    render() {
        let title = this.state.title;
        let tags = this.state.tags;
        // Show all the tags
        let tags_html = [];

        if (tags) {
            tags.map((tag, i) => {
                return tags_html.push(
                    <a key={i} className="tag" style={{background: '#' + tag.accent}}>
                        {tag.display_name}
                    </a>
                );
            });
        }

        return (
            <div>
                <div className="post-tags">
                    {tags_html}
                </div>

                <div className="post-title">
                    {title}
                </div>
            </div>
        );
    }
}

export default PostTitle;
