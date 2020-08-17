const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", function () {
  let search = document.getElementById("search-bar").value;
  search = search.replace(/ /g, "%20");
  while (document.getElementById("result-area").hasChildNodes()) {  
    document.getElementById("result-area").removeChild(document.getElementById("result-area").firstChild);
  }
  fetch(`https://api.lyrics.ovh/suggest/${search}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    for (let index = 0; index < 10 ; index++) {
      
      const resultDiv = document.createElement("div");
      resultDiv.innerHTML = `<div class="single-result row align-items-center my-3 p-3">
      <div class="col-md-9">
          <h3 class="lyrics-name">${data.data[index].title}</h3>
          <p class="author lead">Album by <span>${data.data[index].artist.name}</span></p>
          <a style="font-size: 18px; color: aliceblue; text-decoration: none;" href = ${data.data[index].link}>link here</a>
      </div>
      <div class="col-md-3 text-md-right text-center">
          <button id="${data.data[index].id}" class="btn btn-success lyrics-btn ">Get Lyrics</button>
      </div>
      </div>`;
      document.getElementById("result-area").appendChild(resultDiv);
    }
    const lyricsBtn = document.getElementsByClassName("lyrics-btn");
    
    for (let index = 0; index < lyricsBtn.length; index++) {
      const element = lyricsBtn[index];
      element.addEventListener("click", function () {
       
        for (let index = 0; index < data.data.length; index++) {
          if (element.id == data.data[index].id ) {
            const artist = data.data[index].artist.name;
            const title = data.data[index].title;
            fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
            .then(res => res.json())
            .then(data => {
              
              if (data.lyrics == null) {
                alert("lyrics not available");
                document.getElementById("artist-name").innerHTML = artist;
                document.getElementById("song-name").innerHTML = title;
                document.getElementById("lyrics").innerHTML = "lyrics not available";
              }
              else{
                document.getElementById("artist-name").innerHTML = artist;
                document.getElementById("song-name").innerHTML = title;
                document.getElementById("lyrics").innerHTML = data.lyrics;
              }
              
            })
          }
          
        }
      })
    }
  });
})