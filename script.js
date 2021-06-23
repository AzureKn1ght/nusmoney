// (c) Anuflora Systems (test)
const balance = document.getElementById("balance"); //const since it does not change (HTML)
const money_plus = document.getElementById("deposit");
const money_minus = document.getElementById("loan");
const list = document.getElementById("list");
const form = document.getElementById("form");
const custname = document.getElementById("custname");
const reco = document.getElementById("reco");

//Hardcoded Data Received
const TransactionDataAll = [
  { id: 1, customername: "Flora", bank: "DBS", deposit: 3000, loan: 2000 },
  { id: 2, customername: "Flora", bank: "OCBC", deposit: 4000, loan: 2000 },
  { id: 3, customername: "Mikhil", bank: "DBS", deposit: 3000, loan: 2000 },
  { id: 4, customername: "Sashil", bank: "UOB", deposit: 6000, loan: 1000 },
  { id: 5, customername: "Jack", bank: "UOB", deposit: 6000, loan: 8000 },
];

var TransactionData = null; //temporary var to store

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  const deposit_item = document.createElement("li");

  deposit_item.classList.add("plus");
  deposit_item.innerHTML = `
  ${transaction.customername}-${transaction.bank}  <span> $ ${Math.abs(
    transaction.deposit
  )}</span> 
  `;

  list.appendChild(deposit_item);

  const loan_item = document.createElement("li");

  loan_item.classList.add("minus");
  loan_item.innerHTML = `
  ${transaction.customername}-${transaction.bank} <span> -$ ${Math.abs(
    //Just to make sure positive
    transaction.loan
  )}</span> 
  `;

  list.appendChild(loan_item);
}

// Update the balance, deposit and loan
function updateValues() {
  //transaction => transaction.deposit - if only 1 parameter no need backets
  //Arrow Functions ALWAYS returns a value, so no need say "return"
  const deposits = TransactionData.map((transaction) => transaction.deposit); //map returns an array of deposit
  const loans = TransactionData.map((transaction) => transaction.loan); //map instead of foreach to return array

  //The reduce() method reduces the array to a single value. Does not change original array.
  const total_deposit = deposits
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  //reduce has a callback that receives the total (accumulator), and the item itself
  //so in this case, the function just += the items for all the item
  //the second parameter after the function, "0" initializes acc to 0
  const total_loan = loans.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const bal = total_deposit - total_loan;
  balance.innerText = `$${bal}`;
  money_plus.innerText = `$${total_deposit}`;
  money_minus.innerText = `$${total_loan}`;

  //using ternary operator
  //a?b:c (if a is true return b else return c)
  reco.innerText =
    bal >= 0
      ? "You Have Sound Financial Health"
      : "Your Financial Health is Weak";
}

//THIS IS THE FIRST FUNCTION TO RUN
function init() {
  list.innerHTML = "";
  reco.innerHTML = "";
  TransactionData = [...TransactionDataAll]; //copy the const to var, uses ... to "copy"
  TransactionData.forEach(addTransactionDOM); //Process each item with the callback func
  updateValues(); //Updates the total values at the top of the page
}

//Same as init, but using filtered values
function filterTransaction(e) {
  e.preventDefault(); //to prevent form from submitting and refreshing the page
  list.innerHTML = "";
  reco.innerHTML = "";

  //filter function works on any array
  TransactionData = TransactionDataAll.filter(
    (tran) => tran.customername == custname.value //the backets are optional here
    //function returns true/false for each array item
    //basically, whether to include it or not (filter)
    //ignore case:
    //(tran) => tran.customername.toUpperCase() == custname.value.toUpperCase()
    //use === if comparing objects, simple values can use ==
  );
  TransactionData.forEach(addTransactionDOM);
  updateValues();
}

init();
form.addEventListener("submit", filterTransaction);
