import { loadMovies, loadUsers, saveUsers } from "./storage.js";

const movieSelect = document.getElementById("movie-select");
const movieRating = document.getElementById("movie-rating");
const rateButton = document.getElementById("rate-button");

const recommendationList = document.getElementById("recommendation-list");
const browseInput = document.getElementById("browse-input");
const movieList = document.getElementById("movie-list");

let movies; // Declare movies globally to access after loading
let users = loadUsers();
let activeUser = "user1";

async function initialize() {
  movies = await loadMovies(); // Load movies asynchronously

  populateMovieSelect();
  updateRecommendations();
  browseMovies(""); // Show all movies initially

  // Event listener for browsing movies
  browseInput.addEventListener("input", (e) => {
    browseMovies(e.target.value);
  });
}

function populateMovieSelect() {
  movieSelect.innerHTML = '<option value="">Select a movie</option>';
  movies.forEach((movie) => {
    const option = document.createElement("option");
    option.value = movie.id;
    option.textContent = `${movie.title} (${movie.genre}, ${movie.year})`;
    movieSelect.appendChild(option);
  });
}

// Update Recommendations based on user ratings
function updateRecommendations() {
  recommendationList.innerHTML = ""; // Clear recommendations

  const userRatings = users[activeUser] || {};
  const unratedMovies = movies.filter((movie) => !userRatings[movie.id]);

  if (unratedMovies.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No recommendations available.";
    recommendationList.appendChild(li);
    return;
  }

  unratedMovies.slice(0, 5).forEach((movie) => {
    const li = document.createElement("li");
    li.textContent = `${movie.title} (${movie.genre}, ${movie.year})`;
    recommendationList.appendChild(li);
  });
}

// Browse Movies based on filter input
function browseMovies(query) {
  movieList.innerHTML = ""; // Clear movie list

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.toLowerCase().includes(query.toLowerCase())
  );

  if (filteredMovies.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No movies found.";
    movieList.appendChild(li);
    return;
  }

  filteredMovies.forEach((movie) => {
    const li = document.createElement("li");
    li.textContent = `${movie.title} (${movie.genre}, ${movie.year})`;
    movieList.appendChild(li);
  });
}

// Rate a Movie
rateButton.addEventListener("click", () => {
  const movieId = movieSelect.value;
  const rating = parseInt(movieRating.value);

  if (!movieId || isNaN(rating) || rating < 1 || rating > 5) {
    alert("Please select a movie and provide a valid rating (1-5).");
    return;
  }

  if (!users[activeUser]) {
    users[activeUser] = {};
  }

  users[activeUser][movieId] = rating;
  saveUsers(users);

  alert("Rating saved!");
  movieRating.value = ""; // Clear rating input
  updateRecommendations(); // Refresh recommendations
});

initialize();