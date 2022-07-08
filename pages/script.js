
async function getOther(query) { }
async function getShows(query) {
  if (query) {
    var url =
      "https://api.themoviedb.org/3/search/tv?api_key=1433788c55071f8f355821c4ee1fbfe7&language=en-US&page=1&query=" +
      query;
    //make a request to url then return data arrays
    var data = await fetch(url);
    var json = await data.json();
    var shows = json.results;
    return shows;
  } else {
    var url =
      "https://api.themoviedb.org/3/tv/popular?api_key=1433788c55071f8f355821c4ee1fbfe7&language=en-US&page=1";
    var data = await fetch(url);
    var json = await data.json();
    var shows = json.results;
    return shows;
  }
}
async function getMovies(query) {
  var movies = [];
  if (query) {
    var url =
      "https://api.themoviedb.org/3/search/movie?api_key=1433788c55071f8f355821c4ee1fbfe7&language=en-US&page=1&query=" +
      query;
    //make a request to url then return data arrays
    var data = await fetch(url);
    var json = await data.json();
    var movies = json.results;
    return movies;
  } else {
    var url =
      "https://api.themoviedb.org/3/movie/popular?api_key=1433788c55071f8f355821c4ee1fbfe7&language=en-US&page=1";
    var data = await fetch(url);
    var json = await data.json();
    var movies = json.results;
    return movies;
  }
}
function displayImage(img) {
  if (!img) {
    return "https://images.pexels.com/photos/5841807/pexels-photo-5841807.jpeg";
  } else {
    return "https://image.tmdb.org/t/p/original/" + img;
  }
}
function category(data) {
  //check if data is a anime or show
  if (data.original_language == "ja") {
    return "Anime";
  }
  else {
    return "TV Show";
  }
}
function getStatus(id) {
  //get status from our api but since we don't have one yet we'll just return Available
  return "Available";
}
function getStatusClass(id) {
  //get status from our api but since we don't have one yet we'll just return Available
  return "active";
}

function downloads(text) {
  //returns a random number between 1 and 10000
  var random = Math.floor(Math.random() * 10000) + 1;
  return random;
}
async function loadData() {
  document.getElementById("query").innerHTML = "";
  var movies = await getMovies();
  var shows = await getShows();
  //check if there are any results
  if (movies.length == 0 && shows.length == 0) {
    document.getElementById("loader").style.display = "none";
    document.getElementById("query").innerHTML =
      "No results found for: " + query;
    return;
  }
  //for each movie make a card
  for (var i = 0; i < movies.length; i++) {
    var html = `
    <button class="cell-more-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
    </button>
      <div class="product-cell image">
        <img onclick="fullsize(this)" src="${displayImage(movies[i].backdrop_path)}">
        <span>${movies[i].title}</span>
      </div>
    <div class="product-cell category"><span class="cell-label">Category:</span><p>Movie</p></div>
    <div class="product-cell status-cell">
      <span class="cell-label">Status:</span>
      <span class="status ${getStatusClass(movies[i].id)}" id="itemStatus">${getStatus(movies[i].id)}</span>
    </div>
    <div class="product-cell sales"><span class="cell-label">Downloads:</span>${downloads(movies[i].id)}</div>
    <div class="product-cell stock"><span class="cell-label">Release year:</span>${movies[i].release_date}</div>
    <div class="product-cell price"><span class="cell-label">Rating:</span>${movies[i].vote_average}</div>
    `;
    var movie = document.createElement('div');
    movie.className = "products-row";
    movie.setAttribute("data-type", "movie");
    movie.innerHTML = html;
    document.getElementById("baba").appendChild(movie);
  }
  //for each show make a card
  for (var i = 0; i < shows.length; i++) {
    var html = `
    <button class="cell-more-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
    </button>
      <div class="product-cell image">
        <img onclick="fullsize(this)" src="${displayImage(shows[i].backdrop_path)}">
        <span>${shows[i].name}</span>
      </div>
    <div class="product-cell category"><span class="cell-label">Category:</span><p>${category(shows[i])}</p></div>
    <div class="product-cell status-cell">
      <span class="cell-label">Status:</span>
      <span class="status ${getStatusClass(movies[i].id)}" id="itemStatus">${getStatus(movies[i].id)}</span>
    </div>
    <div class="product-cell sales"><span class="cell-label">Downloads:</span>${downloads(shows[i].id)}</div>
    <div class="product-cell stock"><span class="cell-label">Release year:</span>${shows[i].first_air_date}</div>
    <div class="product-cell price"><span class="cell-label">Rating:</span>${shows[i].vote_average}</div>
    `;
    var show = document.createElement('div');
    show.className = "products-row";
    show.setAttribute("data-type", category(shows[i]));
    show.innerHTML = html;
    document.getElementById("baba").appendChild(show);
  }
}
async function load() {
  document.getElementsByClassName("loader")[0].style.display = "block";
  document.querySelector(".jsFilter").addEventListener("click", function () {
    document.querySelector(".filter-menu").classList.toggle("active");
  });

  document.querySelector(".grid").addEventListener("click", function () {
    document.querySelector(".list").classList.remove("active");
    document.querySelector(".grid").classList.add("active");
    document.querySelector(".products-area-wrapper").classList.add("gridView");
    document
      .querySelector(".products-area-wrapper")
      .classList.remove("tableView");
  });

  document.querySelector(".list").addEventListener("click", function () {
    document.querySelector(".list").classList.add("active");
    document.querySelector(".grid").classList.remove("active");
    document
      .querySelector(".products-area-wrapper")
      .classList.remove("gridView");
    document.querySelector(".products-area-wrapper").classList.add("tableView");
  });

  var modeSwitch = document.querySelector(".mode-switch");
  modeSwitch.addEventListener("click", function () {
    document.documentElement.classList.toggle("light");
    modeSwitch.classList.toggle("active");
  });
  await loadData();
  setTimeout(function () {
    document.getElementById("loader").style.display = "none";
  }, 1000);
}
window.onload = load();
function fullsize(image) {
  let clickedsrc = image.src;
  let modal = document.getElementById("modal-img");
  if (modal.style.display == "block") {
    modal.style.display = "none";
  } else {
    modal.src = clickedsrc;
    modal.style.display = "block";
  }
  /*
    if(image.style.transform == "scale(10)"){
        image.style.position = "relative";
        image.style.top = "0%";
        image.style.left = "0%";        
        image.style.transform = "scale(1)";
    }else{
        image.style.position = "relative";
        image.style.top = "100%";
        image.style.left = "100%";  
        image.style.transform = "scale(10)";
    }
    console.log(image)*/
}
function showfunctions() {
  let elem = document.getElementById("account-info-signin");
  if (elem.style.display == "flex") {
    elem.style.display = "none";
  } else {
    elem.style.display = "flex";
  }
}
function displaygridorTable(product) {
  //check if products-area-wrapper has gridView class
  if (document.querySelector(".products-area-wrapper").classList.contains("gridView")) {
    //if it has gridView class, remove it and add tableView class
    document
      .querySelector(".products-area-wrapper")
      .classList.remove("gridView");
    document
      .querySelector(".products-area-wrapper")
      .classList.add("tableView");
  }
  else if (document.querySelector(".products-area-wrapper").classList.contains("tableView")) {
    //if it has tableView class, remove it and add gridView class
    document
      .querySelector(".products-area-wrapper")
      .classList.remove("tableView");
    document
      .querySelector(".products-area-wrapper")
      .classList.add("gridView");
  }
  else {
    return;
  }
}
async function search(query) {
  document.getElementById("query").innerHTML = "";
  document.getElementById("loader").style.display = "block";
  //delete all the products
  var products = document.querySelectorAll(".products-row");
  for (var i = 0; i < products.length; i++) {
    products[i].remove();
  }
  var movies = await getMovies(query);
  var shows = await getShows(query);
  //check if there are any results
  if (movies.length == 0 && shows.length == 0) {
    document.getElementById("loader").style.display = "none";
    document.getElementById("query").innerHTML =
      "No results found for: " + query;
    return;
  }
  var items = document.getElementById("baba");
  //for each movie make a card
  for (var i = 0; i < movies.length; i++) {
    var html = `
    <button class="cell-more-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
    </button>
      <div class="product-cell image">
        <img onclick="fullsize(this)" src="${displayImage(movies[i].backdrop_path)}">
        <span>${movies[i].title}</span>
      </div>
    <div class="product-cell category"><span class="cell-label">Category:</span><p>Movie</p></div>
    <div class="product-cell status-cell">
      <span class="cell-label">Status:</span>
      <span class="status ${getStatusClass(movies[i].id)}" id="itemStatus">${getStatus(movies[i].id)}</span>
    </div>
    <div class="product-cell sales"><span class="cell-label">Downloads:</span>${downloads(movies[i].id)}</div>
    <div class="product-cell stock"><span class="cell-label">Release year:</span>${movies[i].release_date}</div>
    <div class="product-cell price"><span class="cell-label">Rating:</span>${movies[i].vote_average}</div>
    `;
    var movie = document.createElement('div');
    movie.className = "products-row";
    movie.setAttribute("data-type", "movie");
    movie.innerHTML = html;
    items.appendChild(movie);
  }
  //for each show make a card
  for (var i = 0; i < shows.length; i++) {
    var html = `
    <button class="cell-more-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
    </button>
      <div class="product-cell image">
        <img onclick="fullsize(this)" src="${displayImage(shows[i].backdrop_path)}">
        <span>${shows[i].title}</span>
      </div>
    <div class="product-cell category"><span class="cell-label">Category:</span><p>${category(shows[i])}</p></div>
    <div class="product-cell status-cell">
      <span class="cell-label">Status:</span>
      <span class="status ${getStatusClass(shows[i].id)}" id="itemStatus">${getStatus(shows[i].id)}</span>
    </div>
    <div class="product-cell sales"><span class="cell-label">Downloads:</span>${downloads(shows[i].id)}</div>
    <div class="product-cell stock"><span class="cell-label">Release year:</span>${shows[i].first_air_date}</div>
    <div class="product-cell price"><span class="cell-label">Rating:</span>${shows[i].vote_average}</div>
    `;
    var show = document.createElement('div');
    show.className = "products-row";
    show.setAttribute("data-type", "show");
    show.innerHTML = html;
    items.appendChild(show);
  }
  document.getElementById("loader").style.display = "none";
}
var timeout = null;
document.getElementsByClassName("search-bar")[0].addEventListener("keyup", function (event) {
  var bka = document.getElementsByClassName("search-bar")[0];
  clearTimeout(timeout);
  if (
    bka.value == "" ||
    bka.value.length == 0 ||
    bka.value == undefined ||
    bka.value == null ||
    bka.value == " "
  ) {
    var products = document.querySelectorAll(".products-row");
    for (var i = 0; i < products.length; i++) {
      products[i].remove();
    }
    loadData();
  } else {
    // Make a new timeout set to go off in 1000ms (1 second)
    timeout = setTimeout(function () {
      search(bka.value);
    }, 1000);
  }
});
//if search bar is empty, show the default search
document.getElementsByClassName("search-bar")[0].addEventListener("focus", function (event) {
  if (document.getElementsByClassName("search-bar")[0].value == "") {
    //remove all the products
    var products = document.querySelectorAll(".products-row");
    for (var i = 0; i < products.length; i++) {
      products[i].remove();
    }
    loadData();
  }
});
document.getElementsByClassName("filter-button apply")[0].addEventListener("click", function (event) {
  var cate = document.getElementById("cate").value;
  var stat = document.getElementById("stat").value;
  var products = document.querySelectorAll(".products-row");
  var gridOrTableNone = "none";
  for (var i = 0; i < products.length; i++) {
    var categoryi = document.querySelectorAll(".product-cell.category > p")[i].innerHTML;
    var statusi = document.getElementsByClassName("status")[i].innerHTML;
    //if all Status and Category are selected
    if (cate == "All" && stat == "All") {
      search(document.getElementsByClassName("search-bar")[0].value);
    }
    //if only Movie are selected
    if (cate == "Movie" && stat == "All") {
      if (categoryi == "Movie") {
        displaygridorTable(products[i]);
      } else {
        //delete the product
        products[i].remove();
      }
    }
    //if only TV Show are selected
    if (cate == "TV Show" && stat == "All") {
      if (categoryi == "TV Show") {
        displaygridorTable(products[i]);
      } else {
        products[i].remove();
      }
    }
    //if only anime are selected
    if (cate == "Anime" && stat == "All") {
      if (categoryi == "Anime") {
        displaygridorTable(products[i]);
      } else {
        products[i].remove();
      }
    }
    //if Movie and available are selected
    if (cate == "Movie" && stat == "Available") {
      if (categoryi == "Movie" && statusi == "Available") {
        displaygridorTable(products[i]);
      } else {
        products[i].remove();
      }
    }
    //if TV Show and available are selected
    if (cate == "TV Show" && stat == "Available") {
      if (categoryi == "TV Show" && statusi == "Available") {
        displaygridorTable(products[i]);
      } else {
        products[i].remove();
      }
    }
    //if anime and available are selected
    if (cate == "Anime" && stat == "Available") {
      if (categoryi == "Anime" && statusi == "Available") {
        displaygridorTable(products[i]);
      } else {
        products[i].remove();
      }
    }
    //if Movie and unavailable are selected
    if (cate == "Movie" && stat == "Unavailable") {
      if (categoryi == "Movie" && statusi == "Unavailable") {
        displaygridorTable(products[i]);
      } else {
        products[i].remove();
      }
    }
    //if TV Show and unavailable are selected
    if (cate == "TV Show" && stat == "Unavailable") {
      if (categoryi == "TV Show" && statusi == "Unavailable") {
        displaygridorTable(products[i]);
      } else {
        products[i].remove();
      }
    }
    //if anime and unavailable are selected
    if (cate == "Anime" && stat == "Unavailable") {
      if (categoryi == "Anime" && statusi == "Unavailable") {
        displaygridorTable(products[i]);
      } else {
        products[i].remove();
      }
    }
  }
}, false);
document.getElementsByClassName("filter-button reset")[0].addEventListener("click", function (event) {
  //delete all the products
  var products = document.getElementsByClassName(".products-row");
  for (var i = 0; i < products.length; i++) {
    products[i].remove();
  }
  loadData();
});
console.log('test');
function fullsize(img) {
  var src = img.src;
  var img = document.createElement("img");
  img.src = src;
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.position = "fixed";
  img.style.top = "0";
  img.style.left = "0";
  img.style.zIndex = "9999";
  img.style.backgroundColor = "black";
  img.style.cursor = "pointer";
  document.body.appendChild(img); ss
  img.addEventListener("click", function () {
    document.body.removeChild(img);
  });
}
