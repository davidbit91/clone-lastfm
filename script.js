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
        let ul = document.getElementById("ulList");

        let li = document.createElement("li");
        li.innerHTML = `<a class="group-name" title="Ir al Grupo" href="${this.url}">${this.artist.name}</a>
                        <a class="song-title">${this.name}</a>
                        <div class="listeners">${this.listeners}</div>`;
        ul.appendChild(li);
    }
    addSongs(s){
        songs.push(s);
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
var songs = [];


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
        songs.forEach(e => {
            let s = new Song(e.name,e.duration,e.listeners,e.mbid,e.url,e.artist,`${e.attr}`,e.genre);
            s.setItemLi();
            s.addSongs(e);            
        });
    });
        
        //loadOverview(artists);
}

const loadOverview = (artists) => {
    
    let ul = document.getElementById("ulList");

    let li = document.createElement("li");
    li.innerHTML = "";
    ul.appendChild(li);
    
    for(let i = 0; i<artists.length;i++){
        ul.innerHTML += i;
    }
    
    
}

const loadTenListened = () => {

}

const loadBiggest = (e) => {

}

const init = () => {
   loadSongs();
   console.log(songs);

}


window.onload = init;

