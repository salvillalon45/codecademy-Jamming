import React from "react";
import { SearchBar } from "../SearchBar/SearchBar.js";
import { SearchResults } from "../SearchResults/SearchResults.js";
import { Playlist } from "../Playlist/Playlist.js";
import Spotify from "../../util/Spotify.js";

import "./App.css";


export class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // Tracks that appear when the user searches for a song
            searchResults : [],
            playlistName : "",
            // This are on the right side and represent the tracks the user has added to the playlist
            playlistTracks : []
        }

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    addTrack(track) {
        let tracks = this.state.playlistTracks;

        if (this.state.playlistTracks.indexOf(track.id) === -1) {
            tracks.push(track);
        }

        this.setState({
            playlistTracks : tracks
        })
    }

    removeTrack(track) {
        let tracks = this.state.playlistTracks;
        let result = [];

        for (let i = 0; i < tracks.length; i++) {
            if (track.id !== tracks[i].id) {
                result.push(tracks[i]);
            }
        }

        this.setState({
            playlistTracks : result
        })
    }

    updatePlaylistName(newName) {
        this.setState({
            playlistName : newName
        })
    }

    savePlaylist() {
        let trackUris = [];
        let tracks = this.state.playlistTracks;

        for (let i = 0; i < tracks.length; i++) {
            trackUris.push(tracks[i].uri);
        }
        Spotify.savePlaylist(this.state.playlistName, trackUris).then( () => {
            this.setState({
                playlistName : "New Playlist",
                playlistTracks : []
            })
        })
    }

    search(term) {

        Spotify.search(term).then(searchResults => {
            this.setState({
                searchResults: searchResults
            })
        });
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar
                        onSearch={this.search} />

                    <div className="App-playlist">
                        <SearchResults
                            searchResults={this.state.searchResults}
                            onAdd={this.addTrack}
                            isRemoval={false} />

                        <Playlist
                            playlistName={this.state.playlistName}
                            playlistTracks={this.state.playlistTracks}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.savePlaylist} />

                    </div>
                </div>
            </div>
        )
    }
}