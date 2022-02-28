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
        document.getElementById('info-container').innerHTML = ``;
        phoneContainer.innerHTML = '';
        document.getElementById('error-msg').innerText = 'Please enter something to search';
    }

    document.getElementById('search-text').value = '';
});

const phoneContainer = document.getElementById('phn-container');

//load section
const loadData = (data) => {

    if (data.length === 0) {
        document.getElementById('error-msg').innerText = 'No Phone Found';
        document.getElementById('info-container').innerHTML = ``;
    } else {
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
            `;
                div.classList.add('info-container-class', 'col-lg-3', 'col-md-5', 'col-sm-10', 'mx-auto');
                phoneContainer.appendChild(div);
            }
        })
    }
}


//show details
const showDetails = (info) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${info.slug}`)
        .then(response => response.json())
        .then(info => {
            const phnInfoContainer = document.getElementById('phn-info');

            // release date error handling
            const returningDate = (r_date) => {
                if (r_date === '') {
                    return 'Relase Date Not Found';
                }
                else {
                    return r_date;
                }
            }
            phnInfoContainer.innerHTML = `
            <h4>Release Date : ${returningDate(info.data.releaseDate)}</h4>
                    <p>
                    <h4><u>Features</u></h4>
                    <ul id="feature-container" class="feature-list">
                        <li>Chipset : ${info.data.mainFeatures.chipSet}</li>
                        <li>Memory : ${info.data.mainFeatures.memory}</li>
                        <li>Storage : ${info.data.mainFeatures.storage}</li>
                        <li>Display : ${info.data.mainFeatures.displaySize}</li>
                    </ul>
                    </p>
            `;
            const fetureContainer = document.getElementById('feature-container');
            const featureList = info.data.mainFeatures.sensors;
            if (featureList.length !== 0) {
                // console.log('sen');
                const li = document.createElement('li');
                // li.innerHTML = ` Sensors : ${featureList.join(', ')}`;
                li.innerHTML = `
                    <div class="accordion accordion-flush my-3" id="accordionFlushExample">
                        <div class="accordion-item">
                            <h2 class="bg-dark" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    Sensors and Others
                                </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse" style="color:black" aria-labelledby="flush-headingOne"
                                data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    Sensors : ${featureList.join(', ')} <br>
                                    Bluetooth : ${info.data.others.Bluetooth} <br>
                                    GPS : ${info.data.others.GPS} <br>
                                    NFC : ${info.data.others.NFC} <br>
                                    Radio : ${info.data.others.Radio} <br>
                                    USB : ${info.data.others.USB} <br>
                                    WLAN : ${info.data.others.WLAN} <br>
                                </div>
                            </div>
                        </div>
                    </div>`;
                fetureContainer.appendChild(li);
            }
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