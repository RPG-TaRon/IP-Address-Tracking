const form = document.querySelector('#ip-form');
const input = document.querySelector('#ip-input');
const ipAddressText = document.querySelector('#ip-address');
const locationText = document.querySelector('#location');
const timezoneText = document.querySelector('#timezone');
const ispText = document.querySelector('#isp');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const ipValue = input.value.trim();
    console.log(ipValue);
});