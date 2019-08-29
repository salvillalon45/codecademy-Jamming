import React from "react";
import { Tracklist } from "../Tracklist/Tracklist.js";

import "./Playlist.css";

export class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (

            <div className="Playlist">
                {console.log("Inside Playlist Component")}
                <input
                    defaultValue={"New Playlist"}
                    onChange={this.handleNameChange} />

                <Tracklist
                    tracks={this.props.playlistTracks}
                    onRemove={this.props.onRemove}
                    isRemoval={true}
                    onChange={this.props.onNameChange}/>

                <button className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</button>
            </div>
        )
    }
}