import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './css/PostImage.css';

export class PostImage extends Component {
    constructor(props) {
        super(props);

        // Set default state
        this.state = {
            post: props.post,
            image: props.image,
        };
    }

    /**
     * Post was updated, reflect on the image
     * 
     * @param {Object} next_props 
     */
    componentWillReceiveProps(next_props) {
        this.setState({
            post: next_props.post,
            image: next_props.image,
        });
    }

    render() {
        let post = this.state.post;
        let image = this.state.image;
        // Image to show (whether a static image or mp4)
        let image_html;
        // Show post gallery count
        let image_count_html;
        // Censor image overlay
        let censor_image_overlay;
        // Show the thumbnail when not in detail view
        let image_src = this.props.details ? image.imgurImgLink : image.imgLink;

        if (image.animated) {
            // Show image as a looping mp4
            image_html = (
                <span>
                    <video className="img-fluid" style={{width: image.width}} poster={image_src} muted autoPlay loop playsInline preload="auto">
                        <source src={image.imgurImgLink} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </span>
            );
        } else {
            // Show static image
            image_html = (
                <span>
                    <img className="img-fluid" src={image_src} style={{width: image.width}} alt={post.title} />
                </span>
            );
        }

        if (post.images_count > 1 && !this.props.details) {
            image_count_html = (
                <div className="image-count desktop">{post.images_count}</div>
            );
        }

        if (post.censored) {
            // Censor the post image
            censor_image_overlay = (
                <div className="censor">
                    censored
                    <div className="censor-override">
                        <button className="btn btn-warning" onClick={this.props.toggleCensor}>reveal image</button>
                    </div>
                </div>
            );
        }

        return (
            <div className="post-details">
                <div className="img-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="img-block text-center {{size}}">
                                <div className="post-img">
                                    <Link to={'/a/' + image.imgur_id}>
                                        {image_html}
                                    </Link>
                                </div>

                                {censor_image_overlay}
                                {image_count_html}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostImage;
