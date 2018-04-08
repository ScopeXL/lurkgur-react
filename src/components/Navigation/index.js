import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './css/Navigation.css';

export class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
        }

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    /**
     * Handle Search Input Form Change
     */
    handleSearchChange(e) {
        this.setState({
            search: e.target.value,
        });
    }

    /**
     * Searching for a custom tag, on enter redirect to that page
     */
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            document.location.href = `/tag/${this.state.search}`;
        }
    }

    render() {
        return (
            <div className="nav-container">
                <ul className="navigation">
                    <li>
                        <Link to="/">all posts</Link>
                    </li>
                    <li>
                        <Link to="/tag/funny">funny</Link>
                    </li>
                    <li>
                        <Link to="/tag/awesome">awesome</Link>
                    </li>
                    <li>
                        <Link to="/tag/memes">memes</Link>
                    </li>
                    <li>
                        <Link to="/tag/dogs">dogs</Link>
                    </li>
                    <li>
                        <Link to="/tag/cats">cats</Link>
                    </li>
                    <li>
                        <Link to="/tag/cars">cars</Link>
                    </li>
                    <li>
                        <Link to="/tag/art">art</Link>
                    </li>
                    <li>
                        <Link to="/tag/gaming">gaming</Link>
                    </li>
                    <li>
                        <Link to="/tag/movies">movies</Link>
                    </li>
                </ul>

                <input type="text" className="search-input" placeholder="Search for..." value={this.state.search} onChange={this.handleSearchChange} onKeyPress={this.handleKeyPress} />
            </div>
        );
    }
}

export default Navigation;
