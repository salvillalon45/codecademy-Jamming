import React from "react";
import "./CurrentPlaylists.css";
import {Tracklist} from "../Tracklist/Tracklist";

class CurrentPlaylists extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className="CurrentPlaylists">
                {console.log("Inside CurrentPlaylists Component")}

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