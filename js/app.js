// https://openapi.programming-hero.com/api/phones?search=${}
// https://openapi.programming-hero.com/api/phone/${}

// window.onload = () => {
//     document.getElementById('body').classList.add('default-view');
// }
document.querySelector('#search-btn').addEventListener('click', () => {
    const searchValue = document.getElementById('search-text').value.toLowerCase();
    if (searchValue !== '') {
        document.getElementById('body').classList.remove('default-view');
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
            .then(response => response.json())
            .then(info => loadData(info.data));
        phoneContainer.innerHTML = '';
        document.getElementById('error-msg').innerText = '';
    } else {
        document.getElementById('body').classList.add('default-view');
        phoneContainer.innerHTML = '';
        document.getElementById('error-msg').innerText = 'Please enter something to search';
    }
    document.getElementById('search-text').value = '';
});

const phoneContainer = document.getElementById('phn-container');

const loadData = (data) => {
    data.forEach(info => {
        // will display only 20 results
        if (data.indexOf(info) < 20) {
            const div = document.createElement('div');
            div.innerHTML = `
            <img class="mt-3" style="width:100%; border-radius: 20px;" src='${info.image}'>
            <div class="my-3">
                <h5 class="card-title">${info.phone_name}</h5>
                <p class="card-text">Brand : ${info.brand}</p>
                <a href="#" onClick = 'showDetails(${JSON.stringify(info.slug)})' class="btn btn-primary">Details</a>
            </div>
            `;//onClick = 'showDetails(${idName})' info.slug.toString()
            div.classList.add('info-container', 'col-lg-3', 'col-md-5', 'col-sm-10', 'mx-auto');
            phoneContainer.appendChild(div);
        }
    })
}

//show details
const showDetails = (idName) => {
    console.log(idName);//slugname
};