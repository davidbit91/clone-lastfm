class Song {
  songs = [];

  constructor() {
    this.songs = [];
    console.log(this.songs);
  }

  setItemLi(e) {
    let ul = document.getElementById("ulList");

    let li = document.createElement("li");
    li.innerHTML = `<a class="group-name" title="Ir al Grupo" href="${e.url}">${e.artist.name}</a>
                        <a class="song-title">${e.name}</a>
                        <div class="listeners">${e.listeners}</div>`;
    ul.appendChild(li);
  }

  addSongs(s) {
    this.songs.push(s);
  }

}

var song = new Song();

const loadSongs = async (so) => {
  const cors = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    mode: "no-cors",
    cache: "default",
  };

  let connect = await fetch("./music.json");
  /*await connect
    .then((val) => val.json())
    .then((s) => {
      s.forEach((e) => {        
        so.addSongs(e);
        so.setItemLi(e);        
      });
    });*/
  let json = await connect.json();
  json.forEach((e) => {
    so.addSongs(e);
    so.setItemLi(e);
  });

  return so;
};

function cambiarOpcion(opcion, s) {
  ulList.innerHTML = "";

  switch (opcion) {
    case "rock":
    case "reggae":
    case "hip-hop":
    case "jazz":
      for (let i = 0; i < s.songs.length; i++) {
        if (opcion == s.songs[i].genre) {
          s.setItemLi(s.songs[i]);
        }
      }
      break;
    case "overview":
      for (let i = 0; i < s.songs.length; i++) {
          s.setItemLi(s.songs[i]);
      }
      break;
    case "top10":
      s.songs.sort((a, b) => b.listeners - a.listeners);
      for (let i = 0; i < 10; i++) {
        s.setItemLi(s.songs[i]);
    }
      break;
    case "biggest":
      break;
      default:
        for (let i = 0; i < s.songs.length; i++) {
          s.setItemLi(s.songs[i]);
      }
        break;

  }
  
}

function top10() {}

const init = async () => {
  await loadSongs(song);
  cambiarOpcion("top10", song);
};

window.onload = init;
