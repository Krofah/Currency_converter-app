const currencyEl = document.getElementById("currency");
const amountEl = document.getElementById("amount");
const otherCurrencyEl = document.getElementById("other_currency");
const worthEl = document.getElementById("worth");
const exchangeRateEl = document.getElementById("exchange_rate");

updateRate()

function updateRate() {
  fetch(
    `https://v6.exchangerate-api.com/v6/e0947f78e9fe06055d1b51a2/latest/${currencyEl.value}`
  )
    .then((res) => res.json())
    .then((data) => {const rate = data.conversion_rates[otherCurrencyEl.value];
        exchangeRateEl.innerText = `1 ${currencyEl.value} = ${rate + " " + otherCurrencyEl.value}`;
        worthEl.value = (amountEl.value * rate).toFixed(2)
    });
}

currencyEl.addEventListener("change", updateRate);

otherCurrencyEl.addEventListener("change", updateRate);

amountEl.addEventListener("input", updateRate);
