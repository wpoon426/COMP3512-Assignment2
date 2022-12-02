document.addEventListener("DOMContentLoaded", () => {
   // checks too see if the song data exists in localstorage and 
   //if it does not then it will get the songs from the url and put them into a JSON object
   if (!localStorage.getItem("songs")) {
       const api = "https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php";
       fetch(api)
           .then(res => res.json())
           .then(data => {
               loadSongs(data)
           })
   }


   function loadSongs(data) {
      console.log(data);
      localStorage.setItem("song", JSON.stringify(data));
  }


   let arr = [];
   if (!localStorage.getItem("arr")) {
      localStorage.setItem("arr", []);
   } else {
      arr = JSON.parse(localStorage.getItem("arr"));
      console.log('initial playlist', arr);
   }
 


   const samp = JSON.parse(localStorage.getItem("songs"));
   const art = JSON.parse(artists);
   const gen = JSON.parse(genres); 
   console.log("songs object", samp);
   console.log("sessionStorage", sessionStorage);
   let sort = "title";



  function listOutput(title, parent) {
      const opt = document.createElement("option");
      opt.value = title;
      opt.textContent = title;
      parent.appendChild(opt);
   }

   samp.forEach(song => {
      listOutput(song.title, document.getElementById("titleSearch"));

   })

   art.forEach((artist) => {
      listOutput(artist.name, document.getElementById("artistSearch"));

   });

   gen.forEach((genre) => {
      listOutput(genre.name, document.getElementById("genreSearch"));
   });

   

   let searchedSong;
   if (sessionStorage.getItem("title")) {
      let songTitle = sessionStorage.getItem("title");
      searchedSong = samp.filter((song) => {
         return String(song.title).includes(songTitle.toLowerCase());
      });
   }
   else if (sessionStorage.getItem("artist")) {
      let songArtist = sessionStorage.getItem("artist");
      searchedSong = samp.filter((song) => {
          return song.artist.name == songArtist;
      });
  }
   else if (sessionStorage.getItem("genre")) {
   let songGenre = sessionStorage.getItem("genre");
   searchedSong = samp.filter((song) => {
       return song.artist.name == songGenre;
   });
}

console.log(searchedSong);
loadTable();
   


/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/




   //loading tables
   function loadTable() {
   const table = document.querySelector('#table');

   let column = document.querySelector('#table');
   const titleSort = samp.sort((a, b) => a.title.localeCompare(b.title));
   sortCalc(titleSort);

   column.addEventListener('click', function(e){
         
      let titleSelect = document.querySelector('#Title');
      let artSelect = document.querySelector('#Artist');
      let yearSelect = document.querySelector('#Year');
      let genSelect = document.querySelector('#Genre');
      let popSelect = document.querySelector('#Popularity');


      if(e.target == titleSelect){
         samp.sort((a, b) => a.title.localeCompare(b.title));
      }else if (e.target == artSelect){
         samp.sort((a, b) => a.artist.name.localeCompare(b.artist.name));
      }else if (e.target == yearSelect){
         samp.sort((a,b) => a.year < b.year?-1:1);
      }else if (e.target == genSelect){
         samp.sort((a, b) => a.genre.name.localeCompare(b.genre.name));
      }else if (e.target == popSelect){
         samp.sort((a,b) => a.details.popularity > b.details.popularity?-1:1);
      }  
      sortCalc(samp);
      addPlaylist();
      

   });

}


   
   const added = [];

   function addPlaylist(){
      const button = document.querySelectorAll('.addBtn');
   
      for(let b of button){
         
            b.addEventListener('click',function(e){
               const found = samp.find(s => s.song_id ==b.getAttribute('id'));  
               added.push(b);
               console.log(added);
            });
         }

   }





function sortCalc(sortWay){
   table.innerHTML = "";
   let headers = ['Title', 'Artist', 'Year', 'Genre', 'Popularity', 'Playlist'];
   
   let headerRow = document.createElement('tr');

   headers.forEach(headerText => {
      let header = document.createElement('th');
      header.setAttribute('id',headerText);
      let textNode = document.createTextNode(headerText);
      header.appendChild(textNode);
      headerRow.appendChild(header);

   });

   table.appendChild(headerRow);
   
   for(let s of sortWay) {
      let tr = document.createElement('tr');
      let td = document.createElement('td');

      td.innerHTML = s.title;
      tr.appendChild(td);
   
      let td2 = document.createElement('td');

      td2.innerHTML = s.artist.name;
      tr.appendChild(td2);
         
      let td3 = document.createElement('td');

      td3.innerHTML = s.year;
      tr.appendChild(td3);
         
      let td4 = document.createElement('td');

      td4.innerHTML = s.genre.name;
      tr.appendChild(td4);
        
      let td5 = document.createElement('td');

      td5.innerHTML = s.details.popularity;
      tr.appendChild(td5);
         
      let btn = document.createElement('button');
   
      btn.setAttribute('id',s.song_id);
      btn.setAttribute('class','addBtn');
      btn.textContent = 'Add';
      tr.appendChild(btn);

      table.appendChild(tr);
   }

   
}


document.querySelector("#filter-type").addEventListener("change", filterSelect);



function filterSelect(event) { 
      const filter = event.target.value;
      console.log(event.target);
      const hide = document.querySelectorAll("#searchType .hide");
      hide.forEach(hidden => (hidden.classList.remove("hide")));
      const word = [];
      console.log(filter);
      if (filter == "filterTitle") {
         word.push(document.querySelector("#artistSearch").parentElement);
         word.push(document.querySelector("#genreSearch").parentElement);
      }
      else if (filter == "filterArtist") {
         word.push(document.querySelector("#titleSearch").parentElement);
         word.push(document.querySelector("#genreSearch").parentElement);
      }
      else if (filter == "filterGenre") {
         word.push(document.querySelector("#titleSearch").parentElement);
         word.push(document.querySelector("#artistSearch").parentElement);
      }
      word.forEach(elementType => (elementType.classList.add("hide")));
}


document.querySelector("#filterButton").addEventListener("click", () => { 
   sessionStorage.clear();
   const searchForm = document.getElementById("searchType").elements;
   let typeOfSearch;
   let search;


   if (searchForm.namedItem("Titles").value) {
      typeOfSearch = 'title';
      search = searchForm.namedItem("Titles").value;
   }
   else if (searchForm.namedItem("Artists").value) {
      typeOfSearch = 'artist';
      search = searchForm.namedItem("Artists").value;
   }
   else if (searchForm.namedItem("Gen").value) {
      typeOfSearch = 'genre';
      search = searchForm.namedItem("Gen").value;
   }

   sessionStorage.setItem(typeOfSearch, search);


});

document.querySelector("#clearButton").addEventListener("click", sessionStorage.clear());
});





//load single song view


for (let c of clickedSong) {
const div = document.createElement("div");

let infoTitle = document.createElement("h1");
infoTitle.id = "word";

infoTitle.textContent = clickedSong.title;




}






