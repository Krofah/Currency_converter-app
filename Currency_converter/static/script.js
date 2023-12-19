const currencyEl = document.getElementById("currency");
const amountEl = document.getElementById("amount");
const otherCurrencyEl = document.getElementById("other_currency");
const worthEl = document.getElementById("worth");
const exchangeRateEl = document.getElementById("exchange_rate");

updateRate();

function updateRate() {
  fetch(`https://v6.exchangerate-api.com/v6/e0947f78e9fe06055d1b51a2/latest/${currencyEl.value}`)
    .then((res) => res.json())
    .then((data) => {
      const supportedCurrencies = ["USD", "CAD", "EUR", "GHS", "NGN", "ZAR"]; // Add African currencies here
      const filteredRates = Object.keys(data.conversion_rates)
        .filter((currency) => supportedCurrencies.includes(currency))
        .reduce((obj, key) => {
          obj[key] = data.conversion_rates[key];
          return obj;
        }, {});

      const rate = filteredRates[otherCurrencyEl.value];
      exchangeRateEl.innerText = `1 ${currencyEl.value} = ${rate + " " + otherCurrencyEl.value}`;
      worthEl.value = (amountEl.value * rate).toFixed(2);
    });
}

currencyEl.addEventListener("change", updateRate);
otherCurrencyEl.addEventListener("change", updateRate);
amountEl.addEventListener("input", updateRate);
