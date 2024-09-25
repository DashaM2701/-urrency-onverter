const rates = {};

const elemUSD = document.querySelector('[data-value = "USD"]');
const elemEUR = document.querySelector('[data-value = "EUR"]');

const input = document.querySelector("#input");
const result = document.querySelector("#result");
const select = document.querySelector("#select");

getCurrencies();
async function getCurrencies() {
  const response = await fetch("http://localhost:3000/Values");

  const data = await response.json();
  const result = await data;

  rates.USD = result.find((currency) => currency.currency === "usd");
  rates.EUR = result.find((currency) => currency.currency === "eur");
  console.log(rates);

  elemUSD.textContent = parseFloat(rates.USD.ask).toFixed(2);
  elemEUR.textContent = parseFloat(rates.EUR.ask).toFixed(2);
}

input.oninput = convertValue;

select.oninput = convertValue;

function convertValue() {
  if (!isNaN(parseFloat(input.value)) && !isNaN(rates[select.value].bid)) {
    result.value = (parseFloat(input.value) / rates[select.value].bid).toFixed(
      2
    );
  }
}
result.oninput = function () {
  if (!isNaN(parseFloat(result.value)) && !isNaN(rates[select.value].bid)) {
    input.value = (parseFloat(result.value) * rates[select.value].bid).toFixed(
      2
    );
  }
};
