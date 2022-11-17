


/* url of song api --- https versions hopefully a little later this semester */	
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

 

/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/


//list out artist names
const art = JSON.parse(artists);
for (let a of art) {
   console.log(a.name);
}
console.log('---------------------------------------------------------------');

//list out genres
const gen = JSON.parse(genres);
for (let g of gen) {
   console.log(g.name);
}
console.log('---------------------------------------------------------------');

//list out song list 
const samp = JSON.parse(sampSongs);

//sort by title
console.log(samp.sort((a, b) => a.title.localeCompare(b.title)));
console.log('....................');

//sort by artist name 
console.log(samp.sort((a, b) => a.artist.name.localeCompare(b.artist.name)));
console.log('....................');

//sort by year 
console.log(samp.sort((a, b) => a.year - b.year));
samp.sort(function(a,b){
   return a.year - b.year;
});
console.log(samp);
//console.log(samp.sort((a, b) =>  { return a.year-b.year;}));
console.log('....................');

//sort by genre
console.log(samp.sort((a, b) => a.genre.name.localeCompare(b.genre.name)));
console.log('....................');

//sort by popularity
console.log(samp.sort((a, b) => a.title.localeCompare(b.title)));
console.log('....................');


/*
for (let ss of samp) {
   console.log(ss.title);
   console.log(ss.artist.name);
   console.log(ss.year);
   console.log(ss.genre.name);
   console.log(ss.details.popularity);
   console.log('....................')
}
*/


