// https://openapi.programming-hero.com/api/phones?search=${}
// https://openapi.programming-hero.com/api/phone/${}


// search section
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
//load section
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
                <a href="#" onClick = 'showDetails(${JSON.stringify(info)})' class="btn btn-primary">Details</a>
            </div>
            `;//onClick = 'showDetails(${idName})' info.slug.toString()
            div.classList.add('info-container-class', 'col-lg-3', 'col-md-5', 'col-sm-10', 'mx-auto');
            phoneContainer.appendChild(div);
        }
    })
}


//show details
const showDetails = (info) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${info.slug}`)
        .then(response => response.json())
        .then(info => {
            const phnInfContainer = document.getElementById('phn-info');
            // release date error handling
            const returningDate = (r_date) => {
                if (r_date === '') {
                    return 'Relase Date Not Found';
                }
                else {
                    return r_date;
                }
            }
            phnInfContainer.innerHTML = `
            <h4>Release Date : ${returningDate(info.data.releaseDate)}</h4>
                    <p>
                    <h4><u>Features</u></h4>
                    <ul class="feature-list">
                        <li>Chipset : ${info.data.mainFeatures.chipSet}</li>
                        <li>Memory : ${info.data.mainFeatures.memory}</li>
                        <li>Storage : ${info.data.mainFeatures.storage}</li>
                        <li>Display : ${info.data.mainFeatures.displaySize}</li>
                    </ul>
                    </p>
            `;

        })
    document.getElementById('info-container').innerHTML = `
        <div class="row">    
            <div class="col-lg-6 rounded d-flex justify-content-center align-items-center custom-bg-light"><img
                        class="mx-auto w-75 img-fluid" style="border-radius: 20px;"
                        src='${info.image}'>
                </div>
                <div class="col-lg-6 custom-bg-dark rounded py-5">
                    <h2 class="card-title">${info.phone_name}</h2>
                    <h3 class="card-text">Brand : ${info.brand}</h3>
                    <div id='phn-info'>
                    
                    </div>
                    <!-- <a href="#" class="btn btn-primary">Details</a> -->
                </div>
        </div>
        `;

};