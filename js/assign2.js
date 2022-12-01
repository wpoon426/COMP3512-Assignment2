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



/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/




   //loading tables
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

   // const playlistCol = document.querySelectorAll('#Playlist');

   // for(let p of playlistCol){


   // }

   // const added = [];

   // const button = document.querySelectorAll('.addBtn');

   // for(let b of button){
      
   //       b.addEventListener('click',function(e){

   //          const found = samp.find(s => s.song_id ==b.getAttribute('id'));


   //          console.log(found);

   //       });
   //    }

      

   // for (const addButton of button) {
   //    addButton.addEventListener("click", () => {
   //      let product = samp.find(p => p.Id == addButton.dataset.product);
   //      added.push(product);
   //      //amountLabel.innerText = added.length + "items";
   //      console.log(added);
   //    });
   // };  

   // }

   // for(let i = 0; i < button.length; i++){
      
   //    button[i].addEventListener('click',function(e){

   //       //let x = button[i].getAttribute('id');
   //       if (e.target == button[i]){

   //          let a = button[i].getAttribute('id');
   //          alert(a);
   //          added.push(button);
   
   //          console.log(added);
   //       }
            
   
   //       });
   //    }




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














});

