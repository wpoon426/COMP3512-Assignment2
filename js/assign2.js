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
 


  const samp = JSON.parse(localStorage.getItem("songs")) || JSON.parse(sampSongs);
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
// const sortTitle = samp.sort((a, b) => a.title.localeCompare(b.title));
// for (let s of sortTitle) {
//    document.write(s.title + "<br>");
// }


// //sort by artist name 
// document.write("<h1>artist sort</h1>");
// const artistName = samp.sort((a, b) => a.artist.name.localeCompare(b.artist.name));
// for (let s of artistName) {
//    document.write(s.artist.name + "<br>");
// }


// //sort by year 
// document.write("<h1>year sort</h1>");
// let sortField = "year";
// const sortedYear = samp.sort((a,b) => a.year < b.year?-1:1);
// for (let s of sortedYear) {
//    document.write(s.year + "<br>");
// }

// //sort by genre
// document.write("<h1>genre</h1>");
// const genre = samp.sort((a, b) => a.genre.name.localeCompare(b.genre.name));
// for (let s of genre) {
//    document.write(s.genre.name + "<br>");
// }
// console.log('....................');

// //sort by popularity
// document.write("<h1>popularity</h1>");
// const popSort = samp.sort((a,b) => a.details.popularity > b.details.popularity?-1:1);
// for (let s of popSort) {
//    document.write(s.details.popularity + "<br>");
// }
// console.log(popSort);















document.addEventListener("DOMContentLoaded", function() {





//loading titles
   // const title = document.querySelector('.info');

   // const resultTitle = samp.sort((a, b) => a.title.localeCompare(b.title));

   
   // for (let s of resultTitle) {
   //    let tr = document.createElement('tr');
   //    let td = document.createElement('td');

   //    td.innerHTML = s.title;
   //    tr.appendChild(td);
   //    title.appendChild(tr);
   
   //    tr.setAttribute('value',s.title);
   // }

   //artists
   // const art = document.querySelector('.artists');
   // const artistSort = samp.sort((a, b) => a.artist.name.localeCompare(b.artist.name));
   // for (let s of artistSort) {
   //    //let value = document.querySelector('#s.title');


   //    let tr = document.createElement('tr');
   //    let td = document.createElement('td');

   //    td.innerHTML = s.artist.name;
   //    tr.appendChild(td);
   //    title.appendChild(tr);
   
   //    //tr.setAttribute('value',s.title);

   // }
















   const title = document.querySelector('.info');
   

   const sorted = samp.sort((a, b) => a.title.localeCompare(b.title));
   const artistSort = samp.sort((a, b) => a.artist.name.localeCompare(b.artist.name));

   
   for (let s of sorted) {
      //makes tr, td
      let tr = document.createElement('tr');
      let td = document.createElement('td');

      //set text for td
      td.innerHTML = s.title;
      
      //put td into tr
      tr.appendChild(td);
      
      //put tr to the main tr
   title.appendChild(tr);

   // //making another td
   //    let tdArt = document.createElement('td');

   //    //set info for td
   //    tdArt.innerHTML = s.artist.name;
      
   //    //put td in tr
   //    title.appendChild(tdArt);

      
   }





   
   //const sorted = samp.sort((a, b) => a.title.localeCompare(b.title));
   /*const arr = document.querySelector('.artists');
   
   for (let s of artistSort) {
      //makes tr, td
      let tr = document.createElement('tr');
      let td = document.createElement('td');

      //set text for td
      td.innerHTML = s.artist.name;
      
      
      //put td into tr
      tr.appendChild(td);
      
      //put tr to the main tr
      arr.appendChild(td);
      

   }
*/
   
/*Doing shit from the video*/

let btnGet = document.querySelector('button');
let myTable = document.querySelector('#table');

let headers = ['Title', 'Artist', 'Year', 'Genre', 'Popularity', 'Playlist'];

btnGet.addEventListener('click', () => {
   let table = document.createElement('table');
   let headerRow = document.createElement('tr');

   headers.forEach(headerText => {
      let header = document.createElement('th');
      let textNode = document.createTextNode(headerText);
      header.appendChild(textNode);
      headerRow.appendChild(header);

   });

   table.appendChild(headerRow);

   samp.forEach(s => {
      let row = document.createElement('tr');

      Object.values(s).forEach(text => {
         let cell = document.createElement('td');
         cell.innerHTML = s.title;
         //let textNode = document.createTextNode(text);
         //cell.appendChild(textNode);
         row.appendChild(cell);
      })

      table.appendChild(row);
   })

   myTable.appendChild(table);
});
   






















});


});

