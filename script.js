const symbols = ["IBM", "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];
const stocks = {};

symbols.forEach(sym => {
  stocks[sym] = {
    symbol: sym,
    price: randomBetween(50, 350),
    prevPrice: null,
    volume: Math.floor(Math.random() * 1000000)
  };
});

function randomBetween(a, b) {
  return +(a + Math.random() * (b - a)).toFixed(2);
}

setInterval(() => {
  symbols.forEach(sym => {
    const stock = stocks[sym];
    stock.prevPrice = stock.price;
    const changePct = (Math.random() - 0.5) * 0.02;
    stock.price = +(stock.price * (1 + changePct)).toFixed(2);
    stock.volume += Math.floor(Math.random() * 5000);
  });

  renderTicker();
  renderTable();
}, 1000);

function renderTicker() {
  const tickerBar = document.getElementById("tickerBar");
  tickerBar.innerHTML = "";

  symbols.forEach(sym => {
    const stock = stocks[sym];
    const change = stock.prevPrice ? stock.price - stock.prevPrice : 0;
    const changeClass = change > 0 ? "up" : change < 0 ? "down" : "";
    const changePct = stock.prevPrice ? ((change / stock.prevPrice) * 100).toFixed(2) : "0.00";

    const item = document.createElement("span");
    item.className = `ticker-item ${changeClass}`;
    item.innerHTML = `<strong>${sym}</strong> ${stock.price.toFixed(2)} <small>(${changePct}%)</small>`;
    tickerBar.appendChild(item);
  });
}

function renderTable() {
  const tbody = document.getElementById("tickerTableBody");
  tbody.innerHTML = "";

  const sorted = Object.values(stocks).sort((a,b) => b.volume - a.volume);
  sorted.forEach(stock => {
    const change = stock.prevPrice ? stock.price - stock.prevPrice : 0;
    const changePct = stock.prevPrice ? ((change / stock.prevPrice) * 100).toFixed(2) : "0.00";
    const changeClass = change > 0 ? "up" : change < 0 ? "down" : "";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${stock.symbol}</td>
      <td>${stock.price.toFixed(2)}</td>
      <td class="${changeClass}">${change >= 0 ? "+" : ""}${change.toFixed(2)} (${changePct}%)</td>
      <td>${stock.volume.toLocaleString()}</td>
    `;
    tbody.appendChild(tr);
  });
}

renderTicker();
renderTable();
