document.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const plantid = params.get("plantid");

    const options = {
        method: 'POST',
        body: JSON.stringify({action: 'find',  plantid: plantid}), // Enviar el dato como JSON
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch('backend.php', options)
            .then(response => response.json())
            .then(data => {
                document.getElementById("Plant_Scient_Name").textContent = data.Plant_Scient_Name;
                document.getElementById("Species_Name").textContent = data.Species_Name;
                document.getElementById("Categories_Name").textContent = data.Categories_Name;
                document.getElementById("Cons_Status_Name").textContent = data.Cons_Status_Name;
                document.getElementById("Genus_Name").textContent = data.Genus_Name;
                document.getElementById("Family_Name").textContent = data.Family_Name;
                document.getElementById("Order_Name").textContent = data.Order_Name;
                document.getElementById("Class_Name").textContent = data.Class_Name;
            })
            .catch(error => console.error('Error:', error));
})