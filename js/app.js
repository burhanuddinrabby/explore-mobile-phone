// https://openapi.programming-hero.com/api/phones?search=${}
// https://openapi.programming-hero.com/api/phone/${}

// window.onload = () => {
//     document.getElementById('body').classList.add('default-view');
// }
// document.querySelector('#search-btn').addEventListener('click', () => {
//     const searchValue = document.getElementById('search-text').value.toLowerCase();
//     document.getElementById('body').classList.remove('default-view');
//     fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
//         .then(response => response.json())
//         .then(data => console.log(data.data))
//     document.getElementById('search-text').value = '';
// });