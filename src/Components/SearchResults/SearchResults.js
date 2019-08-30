import React from "react";
import { Tracklist } from "../Tracklist/Tracklist.js";
import "./SearchResults.css";

export class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                { console.log("Inside SearchResults Component") }
                <Tracklist
                    tracks={this.props.searchResults}
                    onAdd={this.props.onAdd}
                    isRemoval={false} />
            </div>
        )
    }
}