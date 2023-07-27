document.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const query = params.get('query');
    const page = params.get('page');
    const inputfill = document.getElementById('searchbox');
    inputfill.value = query;
    const button = document.getElementById('searchbt');

    button.addEventListener('click', function() {
        if (inputfill.value !== '') {
            const params = new URLSearchParams();
            params.append('query', inputfill.value);
            params.append('page', 0);
            const url = `search.html?${params.toString()}`;
            window.location.href = url;
        }
        
    });
    
    const options = {
        method: 'POST',
        body: JSON.stringify({action: 'search',  query: query, page: page}), // Enviar el dato como JSON
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch('backend.php', options)
            .then(response => response.json())
            .then(data => {
                if (data.pages != 0) {
                    var searchDiv = document.getElementById('searchDiv');
                    searchDiv.style.display = "block";
                    var i = 0;
                    data.results.forEach(result => {
                    const row_search = document.getElementById(`result${i}`);
                    row_search.textContent = result.Plant_Scient_Name;
                    row_search.href = `./plant.html?plantid=${result.link}`;
                    i++;
                });
                var indice = Math.trunc(data.pages / 10) + 1;
                let num = parseInt(page);
                document.getElementById("resultsnum").textContent = `${num+1} of ${indice}`;
                if (page <= 0) {
                    document.getElementById("rightnavi").href = `./search.html?query=${query}&page=${num+1}`;
                }
                else if (page >= indice -1) {
                    document.getElementById("leftnavi").href = `./search.html?query=${query}&page=${num -1}`;
                } else {
                    document.getElementById("rightnavi").href = `./search.html?query=${query}&page=${num + 1}`;
                    document.getElementById("leftnavi").href = `./search.html?query=${query}&page=${num - 1}`;
                }
                } 
                else{
                    var notfound = document.getElementById('notfound');
                    notfound.style.display = "block";
                    notfound.textContent = `${query} not found`;
                }
            })
            .catch(error => console.error('Error:', error));
});