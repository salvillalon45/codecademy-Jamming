import React from "react";
import { SearchBar } from "../../SearchBar/SearchBar.js";
import { SearchResults } from "../../SearchResults/SearchResults.js";
import { PlayList } from "../../Playlist/Playlist.js";

import "./App.css";


class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <!-- Add a SearchBar component -->
                    <div className="App-playlist">
                        <!-- Add a SearchResults component -->
                        <!-- Add a Playlist component -->
                    </div>
                </div>
            </div>
        )
    }
}