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
 


  const samp = JSON.parse(localStorage.getItem("song")); //|| JSON.parse(sampSongs);
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

//makeTable(sampSongs);

/*
function makeTable(songs) {
   const big = document.getElementById("song-table"); 
   const tr = document.createElement("tr");
   tr.setAttribute("songID", songs.song_id);
   const tdTitle = document.createElement("td");
   tdTitle.classList.add("songTitle");
   tdTitle.textContent = songs.title;
   tr.appendChild(tdTitle);
}
*/









  








  







 

/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/


// //list out artist names
// document.write("<h1>artists</h1>");
// const art = JSON.parse(artists);
// for (let a of art) {
//    document.write(a.name+ "<br>");
// }
// console.log('---------------------------------------------------------------');

// //list out genres
// document.write("<h1>genres</h1>");
// const gen = JSON.parse(genres);
// for (let g of gen) {
//    document.write(g.name + "<br>");
// }
// console.log('---------------------------------------------------------------');


//list out song list 
//const samp = JSON.parse(sampSongs);

// //sort by title
// document.write("<h1>title sort</h1>");

// for (let s of sortTitle) {
//    document.write(s.title + "<br>");
// }


// //sort by artist name 
// document.write("<h1>artist sort</h1>");
// for (let s of artistName) {
//    document.write(s.artist.name + "<br>");
// }

// //sort by year 
// document.write("<h1>year sort</h1>");
// let sortField = "year";

// for (let s of sortedYear) {
//    document.write(s.year + "<br>");
// }

// //sort by genre
// document.write("<h1>genre</h1>");

// for (let s of genre) {
//    document.write(s.genre.name + "<br>");
// }
// console.log('....................');

// //sort by popularity
// document.write("<h1>popularity</h1>");

// for (let s of popSort) {
//    document.write(s.details.popularity + "<br>");
// }
// console.log(popSort);


//loading titles
   const table = document.querySelector('#table');

   //const resultTitle = samp.sort((a, b) => a.title.localeCompare(b.title));

  

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
         titleSelect.addEventListener('click', updateButton); 
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


   });





const symbolSort = '*';

function updateButton() { 
      const icon = symbolSort; 
      titleSelect.textContent = icon; 
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
         
      table.appendChild(tr);
   }

   
}

});

