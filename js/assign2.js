


/* url of song api --- https versions hopefully a little later this semester */	
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

 

/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/


//list out artist names
document.write("<h1>artists</h1>");
const art = JSON.parse(artists);
for (let a of art) {
   document.write(a.name+ "<br>");
}
console.log('---------------------------------------------------------------');

//list out genres
document.write("<h1>genres</h1>");
const gen = JSON.parse(genres);
for (let g of gen) {
   document.write(g.name + "<br>");
}
console.log('---------------------------------------------------------------');


//list out song list 
const samp = JSON.parse(sampSongs);

//sort by title
document.write("<h1>title sort</h1>");
const sortTitle = samp.sort((a, b) => a.title.localeCompare(b.title));
for (let s of sortTitle) {
   document.write(s.title + "<br>");
}


//sort by artist name 
document.write("<h1>artist sort</h1>");
const artistName = samp.sort((a, b) => a.artist.name.localeCompare(b.artist.name));
for (let s of artistName) {
   document.write(s.artist.name + "<br>");
}


//sort by year 
document.write("<h1>year sort</h1>");
let sortField = "year";
const sortedYear = samp.sort((a,b) => a.year < b.year?-1:1);
for (let s of sortedYear) {
   document.write(s.year + "<br>");
}

//sort by genre
document.write("<h1>genre</h1>");
const genre = samp.sort((a, b) => a.genre.name.localeCompare(b.genre.name));
for (let s of genre) {
   document.write(s.genre.name + "<br>");
}
console.log('....................');

//sort by popularity
document.write("<h1>popularity</h1>");
const popSort = samp.sort((a,b) => a.details.popularity > b.details.popularity?-1:1);
for (let s of popSort) {
   document.write(s.details.popularity + "<br>");
}
console.log(popSort);



