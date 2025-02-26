document.addEventListener('DOMContentLoaded', function () {
    const inquiryButtons = document.querySelectorAll('.card-footer button');
    inquiryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const adTitle = button.closest('.card').querySelector('h3').innerText;
            const email = prompt("Add meg az e-mailedet!");
            if (!email) {
                alert("Kérlek add meg az e-mail címed!");
                return;
            }
            const mailtoLink = `mailto:@hengersor.hu?subject=Érdeklődés: ${adTitle}&body=Érdeklődő: ${email}`;
            window.location.href = mailtoLink;  
        });
    });
}); /* ez jó */ 

document.addEventListener("DOMContentLoaded", () => {
    fetchFilters();
    fetchCars();
});

function fetchFilters() {
    fetch("get_filters.php")
        .then(response => response.json())
        .then(data => {
            populateSelect("brand", data.brands);
            populateSelect("model", data.model);
            populateSelect("fuel", data.fuels);
            populateSelect("color", data.colors);
            populateSelect("seats", data.seats);
        });
}

function populateSelect(id, options) {
    const select = document.getElementById(id);
    select.innerHTML = '<option value="">Összes</option>'; 
    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
    });
}

function fetchCars() {
    const filters = {
        category: document.getElementById("category").value,
        brand: document.getElementById("brand").value,
        model: document.getElementById("model").value,
        fuel: document.getElementById("fuel").value,
        color: document.getElementById("color").value,
        seats: document.getElementById("seats").value
    };

    fetch("get_cars.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters)
    })
    .then(response => response.json())
    .then(data => {
        const carsContainer = document.getElementById("cars");
        carsContainer.innerHTML = ""; 
        if (data.length === 0) {
            carsContainer.innerHTML = "<p>Nincs találat.</p>";
        } else {
            data.forEach(car => {
                const div = document.createElement("div");
                div.classList.add("car");
                div.innerHTML = `<strong>${car.brand} ${car.model}</strong><br>
                                 Kategória: ${car.category}<br>
                                 Üzemanyag: ${car.fuel}<br>
                                 Szín: ${car.color}<br>
                                 Típus: ${car.type}<br>
                                 Ülések: ${car.seats}`;
                carsContainer.appendChild(div);
            });
        }
    });
}
