class Song {
  songs = [];

  constructor() {
    this.songs = [];
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
      let biggest = [];

      let names = [];
      for (let i = 0; i < s.songs.length; i++) {
        names[i] = {
          name: s.songs[i].artist.name,
          listeners: 0
        };
      }
      
      //Quita los duplicados
      names = names.filter(
        (n, index, self) =>
          index ===
          self.findIndex(
            (t) => t.name === n.name && t.name === n.name
          )
      );

      //Paso por el primero de los nombres y voy recorriendo la array original para ver las canciones con el mismo autor y ir sumando los listeners
      for (let i = 0; i < names.length; i++) {
        for (let j = 0; j < s.songs.length; j++) {
          if(names[i].name == s.songs[j].artist.name){
            names[i].listeners += parseInt(s.songs[j].listeners);
          }
        }
      }
      names.sort((a, b) => b.listeners - a.listeners).slice(0,1);

      for(let i=0; i<s.songs.length;i++){
        if(names[0].name == s.songs[i].artist.name){
          s.setItemLi(s.songs[i]);
        }
      }
      break;
    default:
      for (let i = 0; i < s.songs.length; i++) {
        s.setItemLi(s.songs[i]);
      }
      break;
  }
}

const filtro = (value, index, self) => {
  return self.indexOf(value) === index;
};

function top10() {}

const init = async () => {
  await loadSongs(song);
  cambiarOpcion("biggest", song);
};

window.onload = init;
