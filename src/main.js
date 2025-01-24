import axios from "axios";
import "./styles/styles.css";
const apikey = import.meta.env.VITE_OMDB_API_KEY;
console.log(apikey);
$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    // console.log($("searchText").val());
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

async function getMovies(searchText) {
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${apikey}&s=${searchText}`
    );
    $("#loading").hide();
    const movies = response.data.Search;
    if (!movies) {
      $("#movies").html(
        "<p class='text-center'>No movies found. Try another search.</p>"
      );
      return;
    }
    let output = "";
    movies.forEach((movie) => {
      output += `<div class="col-md-3">

                   <div class="card text-center">
                    <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                     <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                    </div>
                   </div>`;
    });

    $("#movies").html(output);
  } catch (err) {
    $("#loading").hide();
    console.log(err);
  }
}

window.movieSelected = function (id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  console.log("Movie selected with ID:", id);
  return false;
};
// window.movieSelected = movieSelected;

window.getMovie = function () {
  const movieId = sessionStorage.getItem("movieId");
  if (!movieId) {
    alert("No movie selected. Redirecting to home.");
    window.location = "index.html";
    return;
  }
  axios
    .get(`https://www.omdbapi.com/?apikey=${apikey}&i=${movieId}`)
    .then((response) => {
      //   console.log(response);
      const movie = response.data;

      const output = `<div class="row">
      <div class="col-md-4">
      <img src="${movie.Poster}" class="thumbnail" alt="${movie.Title}">
      </div>
      <div class="col-md-8">
      <h2 class="card-h2">${movie.Title}</h2>
      <ul class="list-group">
      <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
      <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
      <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
      <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
      <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
      <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
      <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
      </ul>
      </div>
      </div>
      <div class="row">
      <div class="well">
      <h3 class="card-h3">Plot</h3>
       <p class="card-para">${movie.Plot}</p>
      <hr/>
      <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
      <a href="index.html" class="btn btn-default">Go Back To Search</a>
      </div>
      </div>`;
      $("#movie").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
};
// Ensure to hide the loading spinner initially
$("#loading").hide();
