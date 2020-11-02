class Song {
    constructor(name, duration, listeners, mbid, url, artist, attr, genre) {
        this.name = name;
        this.duration = duration;
        this.listeners = listeners;
        this.mbid = mbid;
        this.url = url;
        this.artist = artist;
        this.attr = attr;
        this.genre = genre;
    }

    setItemLi() {
    }
    setItemGroupName(group, url) {
    }
    setItemSongTitle(title) {
    }
    setListeners(listeners) {
    }
    getNewElement(group, url, title, listeners) {
    }

}

const loadSongs = () => {
    const cors = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        mode: 'no-cors',
        cache: 'default'
    };

    let songsJSON = "https://raw.githubusercontent.com/davidbit91/clone-lastfm/master/music.json";


    let connect = fetch(songsJSON);

    connect.then(val =>
        val.json()
    ).then(songs => {
        console.log(songs);
    });

    
}

const loadOverview = () => {
}

const loadTenListened = () => {

}

const loadBiggest = (e) => {

}

const init = () => {
    loadSongs();
}


window.onload = init;

