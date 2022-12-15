document.addEventListener("DOMContentLoaded", () => {
   // checks too see if the song data exists in localstorage and 
   //if it does not then it will get the songs from the url and put them into a JSON object
   
   //added is the playlist array
   const added = [];
   
   if (!localStorage.getItem("song")) {
       const api = "https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php";
       fetch(api)
           .then(res => res.json())
           .then(data => {
               loadSongs(data)
           })
      
   }else{
      songs = JSON.parse(localStorage.getItem("song"));
      loadSongs(songs);
   }

   /**
    * function to load songs data
    * @param {*} data 
    */
   function loadSongs(data) {
      console.log(data);
      localStorage.setItem("song", JSON.stringify(data));

  }

   let arr = [];
   //checks to see if the local storage aready has it or not
   if (!localStorage.getItem("arr")) {
      localStorage.setItem("arr", []);
   } else {
      arr = JSON.parse(localStorage.getItem("arr"));
      console.log('initial playlist', arr);
   }
 
   //parses the data
   const samp = JSON.parse(localStorage.getItem("song"));
   const art = JSON.parse(artists);
   const gen = JSON.parse(genres); 
   console.log("songs object", samp);


   /**
    * function to create the different filter options
    * @param {*} title 
    * @param {*} parent 
    */
   function listOutput(title, parent) {
      const opt = document.createElement("option");
      opt.value = title;
      opt.textContent = title;
      parent.appendChild(opt);
   }

   //outputs based on title search
   samp.forEach(song => {
      listOutput(song.title, document.querySelector("#titleSearch"));

   })

   //outputs based on artist search
   art.forEach((artist) => {
      listOutput(artist.name, document.querySelector("#artistSearch"));

   });

   //outputs based on genre search
   gen.forEach((genre) => {
      listOutput(genre.name, document.querySelector("#genreSearch"));
   });

   //loading tables
   const table = document.querySelector('#table');

   let column = document.querySelector('#table');

   //initially it will be sorted by title
   const titleSort = samp.sort((a, b) => a.title.localeCompare(b.title));
   genTable(titleSort);

   //event listener that acts on the user's sorting choice in the table
   column.addEventListener('click', function(e){
         
      let titleSelect = document.querySelector('#Title');
      let artSelect = document.querySelector('#Artist');
      let yearSelect = document.querySelector('#Year');
      let genSelect = document.querySelector('#Genre');
      let popSelect = document.querySelector('#Popularity');

      if(e.target == titleSelect){
         samp.sort((a, b) => a.title.localeCompare(b.title));
         genTable(samp);
      }else if (e.target == artSelect){
         samp.sort((a, b) => a.artist.name.localeCompare(b.artist.name));
         genTable(samp);
      }else if (e.target == yearSelect){
         samp.sort((a,b) => a.year < b.year?-1:1);genTable(samp);
      }else if (e.target == genSelect){
         samp.sort((a, b) => a.genre.name.localeCompare(b.genre.name));
         genTable(samp);
      }else if (e.target == popSelect){
         samp.sort((a,b) => a.details.popularity > b.details.popularity?-1:1);
         genTable(samp);
      }  
   });
   /**
    * Function to create add button to add songs to playlist
    */
   function addPlaylist(){
      const button = document.querySelectorAll('.addBtn');
   
      for(let b of button){
            //event listener that finds match based on song id then pushes match to add
            b.addEventListener('click',function(){
               const found = samp.find(s => s.song_id == b.getAttribute('id'));  
               if (!added.includes(found)){
                  added.push(found);
                  makeSnack('Song Has Been Added', "#snack", 3000);
               }else{
                  makeSnack('Song Has Already Been Added', "#snack", 3000);
                  console.log('duplicate');
               }
            });
         }
   }
   /**
    * Removes each song from playlist
    */
    function rmPlaylist(){
      let playTable = document.querySelector('#playlistView table');
      const button = document.querySelectorAll('.rmBtn'); 
      for(let b of button){
            //event listener that finds match based on song id then pushes match to remove
            b.addEventListener('click',function(){
               const index = added.findIndex(song => {
                  return song.song_id == b.getAttribute('id');;
              });
              added.splice(index, 1);
              rmTable(added,playTable);
              makeSnack('Song Has Been Removed', "#snack", 3000);
            });
         }
   }
   /**
    * function to sort the main view table and create it
    * @param {*} songArray is the array of songs passed in
    */
   function genTable(songArray){
      table.innerHTML = "";
      let headers = ['Title', 'Artist', 'Year', 'Genre', 'Popularity', 'Playlist'];
      
      let headerRow = document.createElement('tr');

      //creates headers for each row
      headers.forEach(headerText => {
         let header = document.createElement('th');
         header.setAttribute('id',headerText);
         let textNode = document.createTextNode(headerText);
         header.appendChild(textNode);
         headerRow.appendChild(header);
      });

      table.appendChild(headerRow);
      
      //loops array data to output table
      for(let s of songArray) {
         let tr = document.createElement('tr');
         let title = document.createElement('td');

         title.innerHTML = s.title;
         tr.appendChild(title);
      
         let artist = document.createElement('td');

         artist.innerHTML = s.artist.name;
         tr.appendChild(artist);
            
         let year = document.createElement('td');

         year.innerHTML = s.year;
         tr.appendChild(year);
            
         let genre = document.createElement('td');

         genre.innerHTML = s.genre.name;
         tr.appendChild(genre);
         
         let popularity = document.createElement('td');

         popularity.innerHTML = s.details.popularity;
         tr.appendChild(popularity);
            
         let btn = document.createElement('button');
         
         btn.setAttribute('id',s.song_id);
         btn.setAttribute('class','addBtn');
         btn.textContent = '+';
         tr.appendChild(btn);
         
         table.appendChild(tr);
      
         //creates single songles information
         [title,artist,year,genre,popularity].forEach((title) => {
            title.addEventListener("click", function() {
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
               let infoDiv = document.createElement("div");
               infoDiv.setAttribute("class", "songInfo");
               let songDetails = document.createElement("div");
               songDetails.setAttribute("class", "songDetails");
               
               goBack.textContent = "Go Back to Search"; 
               goBack.setAttribute("class", "infoBackButton");
               songInfo.appendChild(goBack);
               goBack.addEventListener("click", function() { 
         
                  songInfo.classList.toggle('hidden');
                  viewSearch.classList.toggle('hidden');
                  songInfo.innerHTML = "";
               
               }); 

               viewPageTitle.textContent = "Song Information";
               songTitle.textContent = "Title:  " + s.title;
               songArtist.textContent = "Artist:  " + s.artist.name;
               songGenre.textContent = "Genre:  " + s.genre.name;
               songYear.textContent = "Year:  " + s.year;
               songDuration.textContent = "Duration:  " + timeDuration(s.details.duration);
               infoDiv.appendChild(viewPageTitle);
               infoDiv.appendChild(songTitle);
               infoDiv.appendChild(songArtist);
               infoDiv.appendChild(songGenre);
               infoDiv.appendChild(songYear);
               infoDiv.appendChild(songDuration);
               songInfo.appendChild(infoDiv);
               infoDiv.appendChild(songDetails);
            
               bpm.textContent =  "BPM:  " + s.details.bpm;
               energy.textContent = "Energy:  " + s.analytics.energy;
               dance.textContent = "Danceability:  " + s.analytics.danceability;
               liveness.textContent = "Liveness:  " + s.analytics.liveness;
               valence.textContent = "Valence:  " + s.analytics.valence;
               acoustic.textContent = "Acousticness:  " + s.analytics.acousticness;
               speech.textContent = "Speechiness:  " + s.analytics.speechiness;
               popularity.textContent = "Popularity:  " + s.details.popularity;
               
               songDetails.appendChild(bpm);
               songDetails.appendChild(energy);
               songDetails.appendChild(dance);
               songDetails.appendChild(liveness);
               songDetails.appendChild(valence);
               songDetails.appendChild(acoustic);
               songDetails.appendChild(speech);
               songDetails.appendChild(popularity);

               //appends the radar chart to the page
               songInfo.appendChild(makeData(s));

            });
         });
      }
      addPlaylist();
   }

   /**
    * function to create the radar chart 
    * @param {*} song 
    * @returns 
    */
   function makeData(song) {
      const div = document.createElement("div");
      let radarDiv = document.createElement("div");
      radarDiv.setAttribute('id', 'radarContainer');
      let canvas = document.createElement("canvas");
      canvas.setAttribute('id', 'radarChart');
      
      radarDiv.appendChild(canvas);

      radarDiv.style.width = 500 + "px";
      radarDiv.style.height = '500px';

      drawChart(canvas, song);
      div.appendChild(radarDiv);
      return div;
   }

   /**
    * function to create a radar which shows all the analytics 
    * of the clicked song courtesy of (https://www.chartjs.org/)
    * @param {*} canvas the div needed to add
    * @param {*} song the songs passed in
    */
   function drawChart(canvas, song) {
      console.log(song)
      new Chart(canvas, {
         type: 'radar',
         data: {
            //labels needed
            labels: ['Dance', 'Energy', 'Speech', 'Acoustic', 'Liveness', 'Valence'],
            datasets: [{
                  label: 'Song Analytics',
                  data: [song.analytics.danceability, song.analytics.energy, song.analytics.speechiness, song.analytics.acousticness, song.analytics.liveness, song.analytics.valence],
                  fill: true,
                  backgroundColor: 'rgba(30, 215, 96, 0.5)',
                  borderColor: '#1DB954',
                  pointBackgroundColor: '#1DB954',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
         },
         //styling for the radar
         options: {
            plugins: {
               legend:{
                  display: true,
                  labels: {color: "white"},
               },
               title: {
                  display: true,
                  text: `${song.title}`,
                  align: 'center',
                  color: 'white',
                  font:{
                        family: 'serif',
                        color: 'white',
                        size: 20,
                        weight: 400
                  }
               }
            },
            scales: {
               r: {
                  ticks: {
                        color: "white",
                        backdropColor: "transparent",
                        textStrokeWidth: 5,
                        font:{
                           family: 'serif',
                           size: 13
                        }
                  },
                  pointLabels: {
                        color: 'white',
                        font:{
                           family: 'serif',
                           size: 14,
                           weight: 'bold'
                        }
                  },
                  grid: {
                        circular: true,
                        color: "white"
                  },
                  suggestedMin: 0,
               }
            },
            responsive: true,
            elements: {
               line: {
                  borderWidth: 2
               }
            }
      }
      });
   }

   /**
    * Function to generate table for the playlistview 
    * 
    * @param {*} songsPassed 
    * @param {*} table 
    */
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
         let title = document.createElement('td');

         title.innerHTML = s.title;
         tr.appendChild(title);
      
         let artist = document.createElement('td');

         artist.innerHTML = s.artist.name;
         tr.appendChild(artist);
            
         let year = document.createElement('td');

         year.innerHTML = s.year;
         tr.appendChild(year);
            
         let genre = document.createElement('td');

         genre.innerHTML = s.genre.name;
         tr.appendChild(genre);
         
         let popularity = document.createElement('td');

         popularity.innerHTML = s.details.popularity;
         tr.appendChild(popularity);
            
         let btn = document.createElement('button');
      
         btn.setAttribute('id',s.song_id);
         btn.setAttribute('class','rmBtn');
         btn.textContent = 'Remove';
         tr.appendChild(btn);

         table.appendChild(tr);

         [title,artist,year,genre,popularity].forEach((title) => {
            title.addEventListener("click", function() {
               songInfo = document.querySelector("#songView");
               preview = document.querySelector("#playlistView");
               songInfo.classList.toggle('hidden');
               preview.classList.toggle('hidden');
               
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
               let infoDiv = document.createElement("div");
               infoDiv.setAttribute("class", "songInfo");
               let songDetails = document.createElement("div");
               songDetails.setAttribute("class", "songDetails");
               
               //Go back to playlist button
               goBack.textContent = "Go Back to Playlist"; 
               goBack.setAttribute("class", "infoBackButton");
               songInfo.appendChild(goBack);
               goBack.addEventListener("click", function() { 

                  songInfo.classList.toggle('hidden');
                  preview.classList.toggle('hidden');
                  songInfo.innerHTML = "";
               
               }); 

               viewPageTitle.textContent = "Song Information";
               songTitle.textContent = "Title:  " + s.title;
               songArtist.textContent = "Artist:  " + s.artist.name;
               songGenre.textContent = "Genre:  " + s.genre.name;
               songYear.textContent = "Year:  " + s.year;
               songDuration.textContent = "Duration:  " + timeDuration(s.details.duration);
               infoDiv.appendChild(viewPageTitle);
               infoDiv.appendChild(songTitle);
               infoDiv.appendChild(songArtist);
               infoDiv.appendChild(songGenre);
               infoDiv.appendChild(songYear);
               infoDiv.appendChild(songDuration);
               songInfo.appendChild(infoDiv);
               infoDiv.appendChild(songDetails);
            
               bpm.textContent =  "BPM:  " + s.details.bpm;
               energy.textContent = "Energy:  " + s.analytics.energy;
               dance.textContent = "Danceability:  " + s.analytics.danceability;
               liveness.textContent = "Liveness:  " + s.analytics.liveness;
               valence.textContent = "Valence:  " + s.analytics.valence;
               acoustic.textContent = "Acousticness:  " + s.analytics.acousticness;
               speech.textContent = "Speechiness:  " + s.analytics.speechiness;
               popularity.textContent = "Popularity:  " + s.details.popularity;
               
               songDetails.appendChild(bpm);
               songDetails.appendChild(energy);
               songDetails.appendChild(dance);
               songDetails.appendChild(liveness);
               songDetails.appendChild(valence);
               songDetails.appendChild(acoustic);
               songDetails.appendChild(speech);
               songDetails.appendChild(popularity);

               songInfo.appendChild(makeData(s));

            });
         });
      }
      rmPlaylist();
      
      //Shows how many songs are in the playlist currently
      let playAvgInfo = document.querySelector('#playlistInfo');
      
      playAvgInfo.innerHTML = `Songs in Playlist : ${added.length}`;
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

   /**
    * function that determines which filter is selected and based on that,
    * allows user to search through and updates the table based on the 
    * search
    * @param {*} event is which one the user clicked
    */
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

   //Filter button to apply current filters and search
   document.querySelector("#filterButton").addEventListener("click", (e) => {
      e.preventDefault();
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

      //creates new array to generate table
      let newArray = [];

      if (searchType == 'title'){
         newArray = samp.filter(s => s.title.toLowerCase().includes(filter.toLowerCase()));
         document.querySelector('#titleSearch').value = '';

      }else if (searchType == 'artist'){

         newArray = samp.filter(s => s.artist.name == filter);
         document.querySelector('#artistSearch').value = '';
      }else if (searchType == 'genre'){

         newArray = samp.filter(s => s.genre.name == filter);
         document.querySelector('#genreSearch').value = '';
      }  
      genTable(newArray);
   });

   //clear button to clear filters on mainview
   document.querySelector("#clearButton").addEventListener("click", function (e){
      e.preventDefault();
      genTable(samp);

   });
   //view playlist button to go to the playlist view
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

   //clear playlist button to clear songs in playlist
   document.querySelector("#clearPlaylist").addEventListener("click", function(){
      //looks at length of added songs array and removes each song
      while (added.length > 0) {
         added.pop();
   }
   let playTable = document.querySelector('#playlistView table');
   rmTable(added, playTable);
   });

   //button to close the playlist view and go back to main view
   document.querySelector("#closePlayview").addEventListener("click", function(){

      //variables to access each view
      let playlistView = document.querySelector("#playlistView");
      let viewSearch = document.querySelector("#searchView");

      //toggling proper views
      playlistView.classList.toggle('hidden');
      viewSearch.classList.toggle('hidden');

   });

   //credits button 
   document.querySelector('#credits-btn').addEventListener('mouseover', () => {
      makeSnack('', "#credits-snack", 5000);
   })
   /**
    * Function to make snackbar
    * @param {*} notify 
    * @param {*} snackBar 
    * @param {*} timer How long it will display for
    */
   function makeSnack(notify, snackBar, timer) {
      let snack = document.querySelector(snackBar);
      if (snackBar == '#snack') {
         snack.textContent = notify;
      }
      snack.classList.add("show");
      setTimeout(() => { snack.classList.remove("show") }, timer);
   }

   /**
    * function to convert the song length in minutes and seconds
    * @param {*} sec intial seconds
    * @returns 
    */
   function timeDuration(sec) {
      let min = Math.floor(sec / 60);
      newSec = sec % 60;
      min = min < 10 ? + min : min;
      newSec = newSec < 10 ? "0" + newSec : newSec;
      return min + ":" + newSec;
   }
});
