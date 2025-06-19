const amountInput = document.getElementById("amount");
const fromSel = document.getElementById("fromCurrency");
const toSel = document.getElementById("toCurrency");
const rateText = document.getElementById("exchangeRate");
const convertBtn = document.getElementById("convertBtn");

// A list of all currency codes
const currencies = ["USD", "EUR", "GBP", "INR", "PKR", "JPY", "AUD", "CAD"]; // add more as needed

// Populate dropdowns
for (const curr of currencies) {
  const opt1 = new Option(curr, curr);
  const opt2 = new Option(curr, curr);
  fromSel.add(opt1);
  toSel.add(opt2);
}
fromSel.value = "USD";
toSel.value = "INR";

// Fetch and update rate
async function updateRate() {
  const from = fromSel.value;
  const to = toSel.value;
  const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
  const data = await res.json();
  const rate = data.rates[to];
  rateText.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
  return rate;
}

// Perform conversion on button click
convertBtn.addEventListener("click", async () => {
  const rate = await updateRate();
  const result = (amountInput.value * rate).toFixed(2);
  rateText.textContent += ` — ${amountInput.value} ${fromSel.value} = ${result} ${toSel.value}`;
});

// Also update rate when currencies change
fromSel.addEventListener("change", updateRate);
toSel.addEventListener("change", updateRate);

// Initial run
updateRate();
