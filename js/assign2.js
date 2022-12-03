document.addEventListener("DOMContentLoaded", () => {
   // checks too see if the song data exists in localstorage and 
   //if it does not then it will get the songs from the url and put them into a JSON object
   
   //added is the playlist array
   const added = [];
   
   if (!localStorage.getItem("songs")) {
       const api = "https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php";
       fetch(api)
           .then(res => res.json())
           .then(data => {
               loadSongs(data)
           })
   }else{
      songs = JSON.parse(localStorage.getItem("songs"))
      loadSongs(songs)
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
 
   const samp = JSON.parse(localStorage.getItem("song"));
   const art = JSON.parse(artists);
   const gen = JSON.parse(genres); 
   console.log("songs object", samp);
   //console.log("sessionStorage", sessionStorage);

  function listOutput(title, parent) {
      const opt = document.createElement("option");
      opt.value = title;
      opt.textContent = title;
      parent.appendChild(opt);
   }

   samp.forEach(song => {
      listOutput(song.title, document.querySelector("#titleSearch"));

   })

   art.forEach((artist) => {
      listOutput(artist.name, document.querySelector("#artistSearch"));

   });

   gen.forEach((genre) => {
      listOutput(genre.name, document.querySelector("#genreSearch"));
   });

/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/

   //loading tables
  // function loadTable() {
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
         sortCalc(samp);
      }else if (e.target == artSelect){
         samp.sort((a, b) => a.artist.name.localeCompare(b.artist.name));
         sortCalc(samp);
      }else if (e.target == yearSelect){
         samp.sort((a,b) => a.year < b.year?-1:1);sortCalc(samp);
      }else if (e.target == genSelect){
         samp.sort((a, b) => a.genre.name.localeCompare(b.genre.name));
         sortCalc(samp);
      }else if (e.target == popSelect){
         samp.sort((a,b) => a.details.popularity > b.details.popularity?-1:1);
         sortCalc(samp);
      }  
      
   });
//}

   
   function addPlaylist(){
      const button = document.querySelectorAll('.addBtn');
   
      for(let b of button){
         
            b.addEventListener('click',function(e){
               const found = samp.find(s => s.song_id == b.getAttribute('id'));  
               if (!added.includes(found)){
                  added.push(found);
               }else{
                  console.log('duplicate');
               }
            });
         }
   }

   /** 
    * removes each song from playlist
    * 
   */
    function rmPlaylist(){
      let playTable = document.querySelector('#playlistView table');
      const button = document.querySelectorAll('.rmBtn'); 
      for(let b of button){
            b.addEventListener('click',function(e){
               const index = added.findIndex(song => {
                  return song.song_id == b.getAttribute('id');;
              });
              added.splice(index, 1);
              rmTable(added,playTable);
            });
         }
   }

//sorting based on params
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


      [td,td2,td3,td4,td5].forEach((td) => {
         td.addEventListener("click", function() {
            songInfo = document.querySelector("#songView");
            viewSearch = document.querySelector("#searchView");
            songInfo.classList.toggle('hidden');
            viewSearch.classList.toggle('hidden');
            
            let goBack = document.createElement("button");
            let viewPageTitle = document.createElement("h1");
            let songTitle = document.createElement("h3");
            let songArtist = document.createElement("h3");
            let songGenre = document.createElement("h3");
            let songYear = document.createElement("h3");
            let songDuration = document.createElement("h3");
            let bpm = document.createElement("li");
            let energy = document.createElement("li");
            let dance = document.createElement("li");
            let liveness = document.createElement("li");
            let valence = document.createElement("li");
            let acoustic = document.createElement("li");
            let speech = document.createElement("li");
            let popularity = document.createElement("li");
            let list = document.createElement("ul");
          
            viewPageTitle.textContent = "Song Information";
            songTitle.textContent = "Title:  " + s.title;
            songArtist.textContent = "Artist:  " + s.artist.name;
            songGenre.textContent = "Genre:  " + s.genre.name;
            songYear.textContent = "Year:  " + s.year;
            songDuration.textContent = "Duration:  " + timeDuration(s.details.duration);
            songInfo.appendChild(viewPageTitle);
            songInfo.appendChild(songTitle);
            songInfo.appendChild(songArtist);
            songInfo.appendChild(songGenre);
            songInfo.appendChild(songYear);
            songInfo.appendChild(songDuration);
          
            bpm.textContent =  "BPM:  " + s.details.bpm;
            energy.textContent = "Energy  " + s.analytics.energy;
            dance.textContent = "Danceability  " + s.analytics.danceability;
            liveness.textContent = "Liveness  " + s.analytics.liveness;
            valence.textContent = "Valence  " + s.analytics.valence;
            acoustic.textContent = "Acousticness  " + s.analytics.acousticness;
            speech.textContent = "Speechiness  " + s.analytics.speechiness;
            popularity.textContent = "Popularity  " + s.details.popularity;
          
            songInfo.appendChild(list);
            list.appendChild(bpm);
            list.appendChild(energy);
            list.appendChild(dance);
            list.appendChild(liveness);
            list.appendChild(valence);
            list.appendChild(acoustic);
            list.appendChild(speech);
            list.appendChild(popularity);



            let chart = anychart.radar();
            chart.title("YERRRRRRR");
            chart.yScale()
               .minimum(0)
               .maximum(100)
               .ticks({'interval':20});

            chart.line(sortWay);

            chart.container('chart');
            chart.draw();


            // const config = {
            //    type: 'radar',
            //    labels: ['Dance', 'Energy', 'Speech', 'Acoustic', 'Liveness', 'Valence'],
            //    data: [s.analytics.danceability, s.analytics.energy, s.analytics.speechiness, s.analytics.acousticness, s.analytics.liveness, s.analytics.valence],
            //    options: {
            //      elements: {
            //        line: {
            //          borderWidth: 3
            //        }
            //      }
            //    },
            //  };        
             
            //  songInfo.append(config);


            goBack.textContent = "Go Back to Search"; 
            songInfo.appendChild(goBack);
            goBack.addEventListener("click", function() { 

               songInfo.classList.toggle('hidden');
               viewSearch.classList.toggle('hidden');
               songInfo.innerHTML = "";
              
            }); 
          
            
          
           });



      });

   }
   addPlaylist();
}

function rmTable(songsPassed,table){
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
   
   for(let s of songsPassed) {
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
      btn.setAttribute('class','rmBtn');
      btn.textContent = 'Remove';
      tr.appendChild(btn);

      table.appendChild(tr);
   }
   rmPlaylist();
}

//Check for radio selection 
if (document.querySelector('input[name="selection"]')) {
   document.querySelectorAll('input[name="selection"]').forEach((elem) => {
     elem.addEventListener("change", function(event) {
       let item = event.target.value;
       console.log(item);
       filterSelect(event);
     });
   });
 }

//Hide filters based on Radio selection
function filterSelect(event) { 

      const filter = event.target.value;
      console.log(event.target);
      
      const hide = document.querySelectorAll("#searchType .hide");
      hide.forEach(hidden => (hidden.classList.remove("hide")));
      const word = [];
      console.log(filter);

      let form = document.querySelector("#searchType").elements;

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

//Search button works but does not work
document.querySelector("#filterButton").addEventListener("click", (e) => {
   e.preventDefault();
   //sessionStorage.clear();
   let form = document.querySelector("#searchType").elements;
   let searchType;
   let filter;
   
   if (document.querySelector('#titleSearch').value) {
       searchType = 'title';
       filter = document.querySelector('#titleSearch').value;

   } else if (document.querySelector('#artistSearch').value) {
       searchType = 'artist';
       filter = document.querySelector('#artistSearch').value;

   } else if (document.querySelector('#genreSearch').value) {
       searchType = 'genre';
       filter = document.querySelector('#genreSearch').value;

   }
   //sessionStorage.setItem(searchType, filter);

   let newArray = [];

   if (searchType == 'title'){

      newArray = samp.filter(s => s.title.toLowerCase().includes(filter.toLowerCase()));
      form.namedItem("titleSearch").value = '';

   }else if (searchType == 'artist'){

      newArray = samp.filter(s => s.artist.name == filter);
      form.namedItem("artistSearch").value = '';
   }else if (searchType == 'genre'){

      newArray = samp.filter(s => s.genre.name == filter);
      form.namedItem("genreSearch").value = '';
   }  
   sortCalc(newArray);

});

//clear for now
document.querySelector("#clearButton").addEventListener("click", function (e){
   e.preventDefault();
   //sessionStorage.clear();
   sortCalc(samp);

});

document.querySelector("#viewPlaylist").addEventListener("click", function(e){
   e.preventDefault();
  
   const playView = document.querySelector('#playlistView');
   const makeTable = document.createElement('table');
   
   playView.appendChild(makeTable);

   //selects the new table made in playlist view
   let playTable = document.querySelector('#playlistView table');

   //variables to access each view
   let playlistView = document.querySelector("#playlistView");
   let viewSearch = document.querySelector("#searchView");
   
   //unhides playlist view, hides view search 
   playlistView.classList.toggle('hidden');
   viewSearch.classList.toggle('hidden');

   rmTable(added, playTable);

}
);


document.querySelector("#clearPlaylist").addEventListener("click", function(e){
   while (added.length > 0) {
      added.pop();
  }
  let playTable = document.querySelector('#playlistView table');
  rmTable(added, playTable);
});


document.querySelector("#closePlayview").addEventListener("click", function(e){

   //variables to access each view
   let playlistView = document.querySelector("#playlistView");
   let viewSearch = document.querySelector("#searchView");

   //toggling proper views
   playlistView.classList.toggle('hidden');
   viewSearch.classList.toggle('hidden');

});




function makeSnack(notify, snackBar, timer) {
   let snack = document.querySelector(snackBar);
   if (snackBar == '#snack') {
       snack.textContent = notify;
   }
   snack.classList.add("show");
   setTimeout(() => { snack.classList.remove("show") }, timer);
}


function timeDuration(sec) {
   let min = Math.floor(sec / 60);
   newSec = sec % 60;

   min = min < 10 ? + min : min;
   newSec = newSec < 10 ? "0" + newSec : newSec;

   return min + ":" + newSec;

}



 });
