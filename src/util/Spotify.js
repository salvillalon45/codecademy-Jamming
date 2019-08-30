// The method will get a user’s access token so that they can make requests to the Spotify API.

let accessToken = "";
const clientID = "335bda4551534b258297e3026fddbbd3";
const redirectURI = "http://localhost:3000/";
// const redirectURI = "sv_jamming.surge.sh";

const Spotify = {

    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        // If the access token is not already set, check the URL to see if it has just been obtained.
        // The implicit grant flow returns a user’s access token in the URL.
        let url = window.location.href;
        const accessTokenMatch = url.match(/access_token=([^&]*)/);
        const expiresInMatch = url.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            // The access token and expiration time are in the URL
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            // This clears the parameters, allowing us to grab a new access token when it expires
            window.setTimeout(() => accessToken = "", expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        }

        // The access token variable is empty and is not in the URL.
        // This mean that we are going to have to authenticate the user so that they can get an access token
        // You will need the user’s access token to make requests to the Spotify API.
        else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },

    search(term) {
        let url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        const accessToken = Spotify.getAccessToken();

        return fetch(url, {
            headers : {
                Authorization : `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json()
            }).then(jsonResponse => {
                console.log(jsonResponse);
                if (!jsonResponse.tracks) {
                    return [];
                }
                return jsonResponse.tracks.items.map(track => ({
                    id : track.id,
                    name : track.name,
                    artist : track.artists[0].name,
                    album : track.album.name,
                    uri : track.uri
                }))
            }
        )
    },

    savePlaylist(playlistName, trackURIS) {
        if (!playlistName && !trackURIS.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization : `Bearer ${accessToken}`
            // mode : "cors",
            // 'Access-Control-Allow-Origin': '*'
        };
        let userID = "";

        let url = "https://api.spotify.com/v1/me";
        return fetch(url, {
            headers : headers
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            console.log("What is the error in savePlaylist() ::  " + jsonResponse);
            // Got userID, now lets use the userID to create a new playlist
            userID = jsonResponse.id;
            let createPlaylistURL = `https://api.spotify.com/v1/users/${userID}/playlists`;

            return fetch(createPlaylistURL, {
                    headers : headers,
                    method : "POST",
                    body: JSON.stringify({ name : playlistName })
                }).then(response => {
                return response.json();
            }).then(jsonResponse => {

                // Created a new playlist, now lets add tracks to the same playlist we just created
                let playlistID = jsonResponse.id;
                let addTrackToPlaylistURL =`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;

                return fetch(addTrackToPlaylistURL, {
                    headers : {
                        Authorization : `Bearer ${accessToken}`
                    },
                    method : "POST",
                    body : JSON.stringify({
                        uris : trackURIS
                    })
                }).then(response => {
                    return response.json();
                }).then(jsonResponse => {
                    playlistID = jsonResponse.id;
                })

            })
        })
    }
};


export default Spotify;