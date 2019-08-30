import React from "react";
import { Track } from "../Track/Track.js";

import "./Tracklist.css";

export class Tracklist extends React.Component {

    render() {
        return (
            <div className="TrackList">
                { console.log("Inside Tracklist component") }
                {/*{ console.log(this.props.tracks) }*/}
                {
                    this.props.tracks.map(track => {
                        return <Track
                                track={track}
                                key={track.id}
                                onAdd={this.props.onAdd}
                                onRemove={this.props.onRemove}
                                isRemoval={this.props.isRemoval} />;
                    })
                }
            </div>
        )
    }
}