
const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

//search by song or artist
async function searchSongs(term){
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();
    showData(data);    
} 

//show song and artist in DOM
function showData(data){
        let output = '';

    
    data.data.map((song,index) => {
        
        if(index <= 9)
        {
        output += `
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">
                <strong>${song.title}</strong>
                </h3>
                <p class ="author-name">Album by
                 <span>${song.artist.name}</span>
                </p>
            </div>
            <div class="col-md-3 text-md-right text-center">    
                <button class="btn btn-success" data-artist="${song.artist.name}" data-songTitle="${song.title}">Get Lyrics</button>
            </div>
        </div>    
        `;
       }        
       
    });

    result.innerHTML = `
        <div class="songs">
            ${output}
        </div>
    `;
}    



//get lyrics for song
async function getLyrics(artist, songTitle){
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,'<br>');

    result.innerHTML = `<div class="col-md-8 mx-auto py-4">
                            <div class="row align-items-center my-3 p-3">
                            <h2>
                            <strong>${artist}</strong>
                            - ${songTitle}</h2>
                            <br>
                            <h5>${lyrics}</h5>
                            </div>
                        </div>    
                        `;
}

//Event listeners
form.addEventListener('submit', e=>{
    e.preventDefault();

    const searchTerm = search.value.trim();

    if(!searchTerm){
        alert('please type in a search term');
    }
    else{
        searchSongs(searchTerm);
    }

});

//get lyrics button click
    result.addEventListener('click', e =>{
        const clickedEl = e.target;

        if(clickedEl.tagName === 'BUTTON'){
            const artist = clickedEl.getAttribute('data-artist');
            const songTitle = clickedEl.getAttribute('data-songTitle');

        getLyrics(artist, songTitle);    
        }
    }); 