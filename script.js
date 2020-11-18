class Song {
  songs = [];
  

  constructor() {
    this.songs = [];
  }

  setItemLi(e) {
    let ul = document.getElementById("ulList");
    let li = document.createElement("li");
    li.classList.add(`far`);
    li.classList.add(`fa-play-circle`);
    li.innerHTML = `<div class='divSong'><a class="group-name" title="Ir al Grupo" href="${e.url}">${e.artist.name}</a>
                        <a class="song-title">${e.name}</a></div>
                        <div class="listeners">${e.listeners} listeners</div>`;
                        
    ul.appendChild(li);
  }

  addSongs(s) {
    this.songs.push(s);
  }
}

var song = new Song();
let imgs = document.getElementsByClassName("fotoLinks");
let h2 = document.getElementsByTagName("h2");


for(let i of imgs){
  i.addEventListener("click", function(){
    cambiarOpcion(i.getAttribute("value"),song);
    i.classList.toggle("mark");
    
  });
  
}


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
  });

  return so;
};

function cambiarOpcion(opcion, s) {
  ulList.innerHTML = "";

  switch (opcion) {
    case "rock":
    case "indie":
    case "hip-hop":
    case "reggae":
    case "jazz":
      for (let i = 0; i < s.songs.length; i++) {
        if (opcion == s.songs[i].genre) {
          s.setItemLi(s.songs[i]);
        }
      }
      h2[0].innerHTML = opcion;
      break;
    case "overview":
      default:
        for (let i = 0; i < s.songs.length; i++) {
          s.setItemLi(s.songs[i]);
        }
      h2[0].innerHTML = 'Overview';
      break;
    case "top10":
      let tp10 = [];
      tp10 = s.songs.sort((a, b) => b.listeners - a.listeners);
      for (let i = 0; i < 10; i++) {
        s.setItemLi(tp10[i]);
      }
      h2[0].innerHTML = 'Top 10 Listeners';
      break;
    case "biggest":
      let biggest = [];

      let names = [];
      for (let i = 0; i < s.songs.length; i++) {
        names[i] = {
          name: s.songs[i].artist.name,
          listeners: 0,
        };
      }

      //Quita los duplicados
      names = names.filter(
        (n, index, self) =>
          index ===
          self.findIndex((t) => t.name === n.name && t.name === n.name)
      );

      //Paso por el primero de los nombres y voy recorriendo la array original para ver las canciones con el mismo autor y ir sumando los listeners
      for (let i = 0; i < names.length; i++) {
        for (let j = 0; j < s.songs.length; j++) {
          if (names[i].name == s.songs[j].artist.name) {
            names[i].listeners += parseInt(s.songs[j].listeners);
          }
        }
      }
      names.sort((a, b) => b.listeners - a.listeners).slice(0, 1);

      for (let i = 0; i < s.songs.length; i++) {
        if (names[0].name == s.songs[i].artist.name) {
          s.setItemLi(s.songs[i]);
        }
      }
      h2[0].innerHTML = 'The Biggest';
      break;
  }
}

const init = async () => {
  await loadSongs(song);
  cambiarOpcion("def", song);
  h2[0].innerHTML= 'Overview';
  
};

window.onload = init;
