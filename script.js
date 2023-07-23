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
    
    fetch(`backend.php?query=${encodeURIComponent(query)}`)
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
});