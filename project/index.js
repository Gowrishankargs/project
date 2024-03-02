let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppend(results) {

    let {
        title,
        link,
        description
    } = results;

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.textContent = title;
    titleEl.target = "_blank";
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let titleBreak = document.createElement("br");
    resultItemEl.appendChild(titleBreak);

    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    urlEl.classList.add("result-url");
    resultItemEl.appendChild(urlEl);

    let urlBreak = document.createElement("br");
    resultItemEl.appendChild(urlBreak);

    let desEl = document.createElement("p");
    desEl.textContent = description;
    desEl.classList.add("link-description");
    resultItemEl.appendChild(desEl);

    searchResultsEl.appendChild(resultItemEl);
}


function displayResults(search_Results) {
    spinnerEl.classList.add("d-none");

    for (let results of search_Results) {
        createAndAppend(results);
    }
}

function search(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";
        let searchValue = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(reponse) {
                return reponse.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);

            });
    }
}

searchInputEl.addEventListener("keydown", search);