document.addEventListener("DOMContentLoaded", () => {
  getMovies();
});

function getMovies(searchValue = "") {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  fetch(
    `http://localhost:3000/movies${searchValue ? `?name=${searchValue}` : ""}`,
    options
  )
    .then((response) => response.json())
    .then(renderMovies)
    .catch((err) => console.error(err));
}

function renderMovies(movies) {
  const mainMoviesDiv = document.getElementById("main-div");

  mainMoviesDiv.innerHTML = "";

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");

    movieContainer.classList.add("card", "movie");

    const movieImage = document.createElement("img");
    movieImage.classList.add("card-img-top");
    movieImage.src = movie.image;
    movieImage.alt = movie.name;
    movieContainer.appendChild(movieImage);

    const movieContentDiv = document.createElement("div");
    movieContentDiv.classList.add("card-body");

    const movieName = document.createElement("h2");
    movieName.classList.add("card-title");
    movieName.textContent = movie.name;
    movieContentDiv.appendChild(movieName);

    const movieDescription = document.createElement("p");
    movieDescription.classList.add("card-text");
    movieDescription.textContent = movie.description;
    movieContentDiv.appendChild(movieDescription);

    movieContainer.appendChild(movieContentDiv);

    mainMoviesDiv.appendChild(movieContainer);
  });
}

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = document.getElementById("search-input").value.trim();

  fetch("http://localhost:3000/movies", { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
      const filteredData = data.filter((movie) =>
        movie.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      
      if (filteredData.length === 0) {
        const mainMoviesDiv = document.getElementById("main-div");
        mainMoviesDiv.innerHTML = `<p id = "error-message" >Sorry, we don't have that. Please try a different search!</p>`;
      } else {
        renderMovies(filteredData);
      }
    });

  searchForm.reset();
});

const selectGenreButtons = document.querySelectorAll(".dropdown-item");
selectGenreButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let genre = e.target.textContent;
    filterByGenre(genre)
  });
});

function filterByGenre(genre) {
  fetch("http://localhost:3000/movies", { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
      const filteredData = data.filter((movie) =>
        movie.genre.toLowerCase().includes(genre.toLowerCase())
      );
      renderMovies(filteredData);
    });
}
