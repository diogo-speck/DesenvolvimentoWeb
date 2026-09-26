const loadNavbar = () => {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-mainpage').innerHTML = data;
        });
};

const loadCarousel = () => {
    fetch('carousel.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('carousel-mainpage').innerHTML = data;
        });
};

const loadMinicards = () => {
    fetch('minicards.html')
        .then(response => response.text())
        .then(data => {
            let allMinicards = '';

            for (let i = 0; i < 6; i++) {
                allMinicards += data;
            }

            document.getElementById('minicards-mainpage').innerHTML = allMinicards;
        });
};

const loadBigcards = () => {
    fetch('bigcards.html')
        .then(response => response.text())
        .then(data => {
            let allBigcards = '';

            for (let i = 0; i < 6; i++) {
                allBigcards += '<br>' + data;
            }

            document.getElementById('bigcards-mainpage').innerHTML = allBigcards;
        });
};

const loadFacil = () => {
    fetch('facil.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('facil-mainpage').innerHTML = data;
        });
};

const loadForm = () => {
    fetch('form.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('form-mainpage').innerHTML = data;
        });
};

document.addEventListener("DOMContentLoaded", () => {
    loadNavbar();
    loadCarousel();
    loadMinicards();
    loadBigcards();
    loadFacil();
    loadForm();
});