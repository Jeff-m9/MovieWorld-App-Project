document.addEventListener("DOMContentLoaded", () => {
  getMovies();
});

function getMovies() {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  fetch("http://localhost:3000/movies", options)
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


