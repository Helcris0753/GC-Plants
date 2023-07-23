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
                var i = 0;
                data.results.forEach(result => {
                    const row_search = document.getElementById(`result${i}`);
                    row_search.textContent = result.Plant_Scient_Name;
                    row_search.href = `./plant.html?plantid=${result.link}`;
                    i++;
                });
            })
            .catch(error => console.error('Error:', error));
});