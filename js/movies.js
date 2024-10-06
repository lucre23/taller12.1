document.addEventListener('DOMContentLoaded', () => {

    const url = 'https://japceibal.github.io/japflix_api/movies-data.json';
    const inputBuscar = document.getElementById('inputBuscar');
    const btnBuscar = document.getElementById('btnBuscar');
    const moviesList = document.getElementById('lista');

    let movies = []; 

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then(data => {
        movies = data; 
      
      })
      .catch(error => {
        console.error('Error:', error);
      });

      function showMovies(moviesListed) {
        moviesList.innerHTML = '';
        moviesList.classList.add('mx-5');
    
        moviesListed.forEach(movie => { 
            const releaseDate = new Date(movie.release_date);
    
            const offcanvasId = `offcanvasTop-${movie.id}`;
            const buttonId = `buttonOffcanvas-${movie.id}`;
    
            const li = document.createElement('li');
            li.innerHTML = `
    
                <button id="${buttonId}" class="list-group-item list-group-item-action bg-dark text-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#${offcanvasId}" aria-controls="${offcanvasId}">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1 fw-bold">${movie.title}</h5>
                        <small>${stars(movie.vote_average)}</small>
                    </div>
                    <p class="mb-1 fst-italic fw-lighter">${movie.tagline}</p>
                </button>
    
                <div class="offcanvas offcanvas-top" tabindex="-1" id="${offcanvasId}" aria-labelledby="offcanvasTopLabel-${movie.id}">
                    <div class="offcanvas-header">
                        <div class="col">
                            <h5 class="offcanvas-title fs-2" id="offcanvasTopLabel-${movie.id}" style="color: blue;">${movie.title}</h5>
                            <small class="text-muted">${movie.genres.map(genero => genero.name).join(' - ')}</small>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
    
                    <div class="offcanvas-body">
                        <p>${movie.overview}</p>
                        <div class="row">
                            <div class="col">
                                
                            </div>
                        </div>
                    </div>
                    <div class="text-center mb-3">
                        <div class="dropdown-center d-grid gap-2 col-6 mx-auto">
                            <button class="btn dropdown-toggle text-dark btn-outline-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                More
                            </button>
                            <ul class="dropdown-menu dropdown-menu-start p-3 col-6 mx-auto">
                                <li class="dropdown-item-text d-flex justify-content-between">
                                    <span>Year: </span><span>${releaseDate.getFullYear()}</span>
                                </li>
                                <li class="dropdown-item-text d-flex justify-content-between">
                                    <span>Runtime: </span><span>${movie.runtime} mins</span>
                                </li>
                                <li class="dropdown-item-text d-flex justify-content-between">
                                    <span>Budget: </span><span>$${movie.budget.toLocaleString()}</span>
                                </li>
                                <li class="dropdown-item-text d-flex justify-content-between">
                                    <span>Revenue: </span><span>$${movie.revenue.toLocaleString()}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>`;
    
            moviesList.appendChild(li);
        });
    }
    

    function stars(voteAverage) {
        const estrellas = Math.round(voteAverage / 2);
        let estrellasHTML = '';
        for (let i = 0; i < 5; i++) {
            if (i < estrellas) {
                estrellasHTML += '<i class="fa fa-star style="color: red;"></i>';
            } else {
                estrellasHTML += '<i class="fa fa-star-o style="color: red;"></i>';
            }
        }
        return estrellasHTML;
    }

    function filterMovies() {
        const search = inputBuscar.value.toLowerCase();

        return movies.filter(movie => 
            movie.title.toLowerCase().includes(search) || 
            movie.tagline.toLowerCase().includes(search) || 
            movie.genres.join(', ').toLowerCase().includes(search) || 
            movie.overview.toLowerCase().includes(search)
        );
    }

    btnBuscar.addEventListener('click', function() {
        if (inputBuscar.value) {
            const filteredMovies = filterMovies();
            showMovies(filteredMovies);
        } else {
            moviesList.innerHTML = '';
        }
    });

});
