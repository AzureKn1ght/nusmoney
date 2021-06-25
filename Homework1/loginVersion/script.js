// (c) Anuflora Systems
const balance = document.getElementById("balance");
const money_plus = document.getElementById("deposit");
const money_minus = document.getElementById("loan");
const list = document.getElementById("list");
const form = document.getElementById("form");
const custname = document.getElementById("custname");
const password = document.getElementById("password");
const details = document.getElementById("details");
const logoutBtn = document.getElementById("logoutBtn");
const loginForm = document.getElementById("login");
const titleName = document.getElementById("titleName");

const reco = document.getElementById("reco");
const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");

const TransactionDataAll = [
  { id: 1, customername: "Flora", bank: "DBS", deposit: 3000, loan: 2000 },
  { id: 2, customername: "Flora", bank: "OCBC", deposit: 4000, loan: 2000 },
  { id: 3, customername: "Mikhil", bank: "DBS", deposit: 3000, loan: 2000 },
  { id: 4, customername: "Sashil", bank: "UOB", deposit: 6000, loan: 1000 },
  { id: 5, customername: "Jack", bank: "UOB", deposit: 6000, loan: 8000 },
  { id: 6, customername: "Jill", bank: "UOB", deposit: 7000, loan: 4000 },
];

var total_deposit = 0;
var total_loan = 0;
var TransactionData = null;

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  const balance = Math.abs(transaction.deposit) - Math.abs(transaction.loan);
  const balance_item = document.createElement("li");
  const sign = balance > 0 ? "plus" : "minus";

  balance_item.classList.add(sign);
  balance_item.innerHTML = `
  ${transaction.customername}-${transaction.bank}
  <span> $ ${balance}</span>
  `;

  list.appendChild(balance_item);
}

// Update the balance, deposit and loan
function updateValues() {
  const deposits = TransactionData.map((transaction) => transaction.deposit);
  const loans = TransactionData.map((transaction) => transaction.loan);
  total_deposit = deposits.reduce((acc, item) => (acc += item), 0).toFixed(2);
  total_loan = loans.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const bal = total_deposit - total_loan;
  balance.innerText = `$${bal}`;
  money_plus.innerText = `$${total_deposit}`;
  money_minus.innerText = `$${total_loan}`;
  reco.innerText =
    bal >= 0
      ? "You Have Sound Financial Health"
      : "Your Financial Health is Weak";
  drawChart();
}

function init() {
  list.innerHTML = "";
  list.innerHTML = "";
  reco.innerHTML = "";
  TransactionData = [...TransactionDataAll];
  TransactionData.forEach(addTransactionDOM);
  updateValues();
}

function filterTransaction(e) {
  e.preventDefault(); //to prevent form from submitting and refreshing the page
  if (!custname.value || !password.value) return; //to prevent empty input from submitting

  list.innerHTML = "";
  reco.innerHTML = "";
  titleName.innerHTML = `Hello, ${custname.value}`;
  TransactionData = TransactionDataAll.filter(
    (tran) => tran.customername.toUpperCase() == custname.value.toUpperCase()
  );
  TransactionData.forEach(addTransactionDOM);
  updateValues();
  login();
}

//Login function to hide/show stuff
function login() {
  showHide(loginForm);
  showHide(details);
  showHide(logoutBtn);
}

function drawChart() {
  let data = [
    { label: "Deposit", amt: total_deposit },
    { label: "Loan", amt: total_loan },
  ];

  var svg = d3.select("svg"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = Math.min(width, height) / 2;

  //The <g> SVG element is a container used to group other SVG elements.
  var g = svg
    .append("g") //g is a general graphics element with no shape yet
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // set the color scale
  var color = d3.scaleOrdinal(["#00E676", "#FF1744"]);

  // Compute the position of each group on the pie:
  var pie = d3.pie().value(function (d) {
    //value of pie comes from data
    return d.amt;
  });
  //radius for the arc
  var path = d3
    .arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  //radius for the label
  var label = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(radius - 180);

  var arc = g
    .selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  arc
    .append("path")
    .attr("d", path)
    .attr("fill", function (d) {
      return color(d.data.label);
    });

  console.log(arc);

  arc
    .append("text")
    .attr("transform", function (d) {
      return "translate(" + label.centroid(d) + ")";
    })

    .text(function (d) {
      return d.data.label;
    });
}

function showHide(x) {
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

init();
b1.addEventListener("click", filterTransaction);
