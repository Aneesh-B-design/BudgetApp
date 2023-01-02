//SELECT ELEMENTS
const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const outcomeTotalEl = document.querySelector(".outcome-total");

const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const allEl = document.querySelector("#all");

const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

let incomeBtn = document.querySelector(".tab2");
let expenseBtn = document.querySelector(".tab1");
let allBtn = document.querySelector(".tab3");

let addIncome = document.querySelector(".add-income");
let incomeTitle = document.getElementById("income-title-input");
let incomeAmount = document.getElementById("income-amount-input");


let addExpense = document.querySelector(".add-expense");
let expenseTitle = document.getElementById("expense-title-input");
let expenseAmount = document.getElementById("expense-amount-input");

//VARIABLES
let entry_list = [];
let balance = 0, income = 0, outcome = 0;

const DELETE = "delete", EDIT = "edit";

//TOGGLING
incomeBtn.addEventListener('click', function opacity(){
    incomeBtn.classList .add("active");
    expenseBtn.classList .remove("active");
    allBtn.classList .remove("active");

    incomeEl.classList .remove("hide")
    expenseEl.classList .add("hide")
    allEl.classList .add("hide")
});

expenseBtn.addEventListener('click', function opacity(){
    expenseBtn.classList .add("active");
    incomeBtn.classList .remove("active");
    allBtn.classList .remove("active");

    expenseEl.classList .remove("hide");
    incomeEl.classList .add("hide");
    allEl.classList .add("hide");
});

allBtn.addEventListener('click', function opacity(){
    allBtn.classList .add("active");
    expenseBtn.classList .remove("active");
    incomeBtn.classList .remove("active");

    allEl.classList .add("hide");
    incomeEl.classList .add("hide");
    expenseEl.classList .add("hide");
});

//ADD ENTRY
// incomeTitle.value;
// incomeAmount.value;
// function clearInput(inputsArray){
//     inputsArray.forEach(input => {
//         input.value = "";
//     });
// };
addIncome.addEventListener('click', function(){
    if(!incomeTitle.value || !incomeAmount.value){
       return;
    } 
    let income = {
        type: "income",
        title: incomeTitle.value,
        amount: parseInt( incomeAmount.value),
        
    }
    entry_list.push(income);
    updateUI()
    clearInput([incomeTitle, incomeAmount])
    
});
function updateUI(){
  income = calculateTotal("income", entry_list);
  outcome = calculateTotal("expense", entry_list);
  balance = Math.abs(calculateBalance(income, outcome));

  // SIGN OF THE BALANCE 
let sign = (income >= outcome) ? "$" : "-$";

balanceEl.innerHTML = `<small>${sign}</small>${balance}`;
outcomeTotalEl.innerHTML = `<small>$</small>${outcome}`;
incomeTotalEl.innerHTML = `<small>$</small>${income}`;

entry_list.forEach( (entry, index) => {
    if( entry.type == "expense" ){
        showEntry(expenseList, entry.type, entry.title, entry.amount, index)
    }else if( entry.type == "income" ){
        showEntry(incomeList, entry.type, entry.title, entry.amount, index)
    }
    showEntry(allList, entry.type, entry.title, entry.amount, index)
});

}

function clearInput(inputs){
    inputs.forEach(input => {
      input.value = "";
    })

    }


addExpense.addEventListener('click', function(){
   if(!expenseTitle.value || !expenseAmount.value){               //IF EITHER ONE OR BOTH OF THE ENTRIES ARE ABSENT, THEN RETURN.
    return;
   }
    let expense = {                                                      //SAVE THE ENTRIES TO THE DASHBOARD.
        type: "expense",
        title: expenseTitle.value,
        amount: parseInt( expenseAmount.value)
    }
    entry_list.push(expense);
    updateUI()
    clearInput([expenseTitle, expenseAmount])
});
//CALCULATE BALANCE, INCOME AND OUTCOME
function calculateTotal(type, list){
    let sum = 0;
    list.forEach(entry => {
        if(entry.type == type){
            sum += entry.amount;
        }
    })
    return sum;
}


function calculateBalance(income, outcome){
    return income-outcome;
}

//SHOW ENTRY IN DASHBOARD
clearElement([incomeList, expenseList, allList]);


function showEntry(list, type, title, amount, id){

    const entry = ` <li id = "${id}" class="${type}">
                        <div class="entry">${title}: $${amount}</div>
                        <div id="edit"></div>
                        <div id="delete"></div>
                    </li>`;

    const position = "afterbegin";

    list.insertAdjacentHTML(position, entry);
}

function clearElement(elements){
    elements.forEach(element => {
        element.innerHTML = ""
    })
}
