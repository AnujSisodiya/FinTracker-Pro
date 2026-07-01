// Dashboard and Setting Dispaly Switch

const navMenus = document.querySelectorAll(".nav-menu");
const pages = document.querySelectorAll(".page-content");

navMenus.forEach((menu) => {
  menu.addEventListener("click", () => {
    navMenus.forEach((item) => {
      item.classList.remove("active");
    });

    menu.classList.add("active");
    pages.forEach((page) => {
      page.classList.remove("active");
    });

    const target = menu.dataset.target;
    document.getElementById(target).classList.add("active");
  });
});

// Transaction Button //

const addTransactionBtn = document.querySelector(".bottom-sidebar");
const transactionModal = document.getElementById("transactionModal");

addTransactionBtn.addEventListener("click", () => {
  transactionModal.style.display = "flex";
});

const closeBtn = document.querySelector(".btn-close");

closeBtn.addEventListener("click", () => {
  transactionModal.style.display = "none";
});

transactionModal.addEventListener("click", (e) => {
  if (e.target === transactionModal) {
    transactionModal.style.display = "none";
  }
});

// Update the values form the Add Transaction Modal..

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let editId = null;
const saveBtn = document.querySelector(".savetranscationbtn");
const transactionBody = document.getElementById("transactionBody");

const balanceValue = document.querySelector(".balance-value");
const incomeValue = document.querySelector(".income-value");
const expenseValue = document.querySelector(".expense-value");
const transactionValue = document.querySelector(".transaction-value");


saveBtn.addEventListener("click", () => {
  const type = document.getElementById("t-type").value;
  const description = document.getElementById("t-description").value;
  const amount = Number(document.getElementById("amount").value);
  const date = document.getElementById("t-date").value;
  const category = document.getElementById("t-Category").value;

  if (description === "" || amount <= 0 || date === "") {
    alert("Please fill all fields");
    return;
  }

  const transaction = {
    id: Date.now(),
    type,
    description,
    amount,
    date,
    category,
  };

  if (editId === null) {

    transactions.push(transaction);

} else {

    const index = transactions.findIndex(
        transaction => transaction.id === editId
    );

    transactions[index] = {
        id: editId,
        type,
        description,
        amount,
        date,
        category
    };

    editId = null;

}

  localStorage.setItem("transactions", JSON.stringify(transactions));

  transactionModal.style.display = "none";

  document.getElementById("t-description").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("t-date").value = "";
  document.getElementById("t-type").selectedIndex = 0;
  document.getElementById("t-Category").selectedIndex = 0;

  updateDashboard();
});

function updateDashboard() {
  updateCards();
  updateTable();
  updateChart();
}
//Update the username in the Nav

const user = JSON.parse(localStorage.getItem("user"));

if(user){
  document.getElementById("navbar-username").textContent =user.username;
}

//Update the Cards

function updateCards() {
  let income = 0;
  let expense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "Income") {
      income += transaction.amount;
    } else {
      expense += transaction.amount;
    }
  });

  const balance = income - expense;
const symbol = getCurrencySymbol();

balanceValue.textContent = `${symbol}${balance.toFixed(2)}`;
incomeValue.textContent = `${symbol}${income.toFixed(2)}`;
expenseValue.textContent = `${symbol}${expense.toFixed(2)}`;
  transactionValue.textContent = transactions.length;
}

//Filter Section in transaction Table 
const filter = document.getElementById("transaction-filter");

filter.addEventListener("change", ()=>{
    updateTable();
});
//Search transactions
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
    updateTable();
});


//Update the Table

function updateTable() {

    transactionBody.innerHTML = "";

    const selectedFilter = filter.value;
    const searchText = searchInput.value.toLowerCase();
    const symbol = getCurrencySymbol();
    let filteredTransactions = transactions;

    if (selectedFilter !== "All Transaction") {
        filteredTransactions = filteredTransactions.filter(transaction =>
            transaction.type === selectedFilter
        );
    }

   
    filteredTransactions = filteredTransactions.filter(transaction =>
        transaction.description.toLowerCase().includes(searchText) ||
        transaction.category.toLowerCase().includes(searchText) ||
        transaction.type.toLowerCase().includes(searchText) ||
        transaction.date.includes(searchText)
    );

    filteredTransactions.forEach((transaction) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.date}</td>

            <td>${transaction.description}</td>

            <td>
                <span class="category-badge">
                    ${transaction.category}
                </span>
            </td>

            <td>
                <span class="${transaction.type === "Income" ? "income" : "expense"}">
                    ${transaction.type === "Income" ? "+" : "-"}${symbol}${transaction.amount.toFixed(2)}
                </span>
            </td>

            <td>
                <div class="action-buttons">
                    <button class="edit-btn" onclick="editTransaction(${transaction.id})">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;

        transactionBody.appendChild(row);

    });

}

const resetbtn = document.querySelector(".reset");

resetbtn.addEventListener("click", () => {
  const confirmReset = confirm(
    "Are you sure you want to delete all transactions?",
  );

  if (!confirmReset) {
    return;
  }
  transactions = [];
  localStorage.removeItem("transactions");
  updateDashboard();
});

//Delete the transcation

function deleteTransaction(id){
    const confirmDelete = confirm("Delete this transaction?");

    if(!confirmDelete) return;

    transactions =transactions.filter(transaction => transaction.id !==id);
   
    localStorage.setItem(
        "transactions",JSON.stringify(transactions)
    );
 updateDashboard();

}

//Edit the transaction 

function editTransaction(id) {
    editId = id;
    const transaction = transactions.find(
        transaction => transaction.id === id
    );

    if (!transaction) return;

    document.getElementById("t-type").value = transaction.type;
    document.getElementById("t-description").value = transaction.description;
    document.getElementById("amount").value = transaction.amount;
    document.getElementById("t-date").value = transaction.date;
    document.getElementById("t-Category").value = transaction.category;

    transactionModal.style.display = "flex";

}
//-----Chart----

const ctx = document.getElementById("cashFlowChart");

const cashFlowChart = new Chart(ctx, {
  type: "bar",

  data: {
    labels: [],

    datasets: [
      {
        label: "Income",
        data: [],
        borderColor: "#15803d",
        backgroundColor: "#15803d",
        barThickness: 70,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
      {
        label: "Expenses",
        data: [],
        borderColor: "#b91c1c",
        backgroundColor: "#b91c1c",
        barThickness: 70,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: false,
          boxWidth: 50,
        },
      },
    },

    scales: {
      x: {
        title: {
          display: true,
          text: "Income vs Expenses",
        },

        grid: {
          color: "#eef2f7",
          drawBorder: false,
        },
      },

      y: {
        min: 0,
        max: 1,

        ticks: {
          stepSize: 0.1,
        },
      },
    },
  },
});

function updateChart() {
  const labels = [];
  const incomeData = [];
  const expenseData = [];

  transactions.forEach((transaction) => {
    labels.push(transaction.date);

    if (transaction.type === "Income") {
      incomeData.push(transaction.amount);
      expenseData.push(0);
    } else {
      incomeData.push(0);
      expenseData.push(transaction.amount);
    }
  });

  cashFlowChart.data.labels = labels;
  cashFlowChart.data.datasets[0].data = incomeData;
  cashFlowChart.data.datasets[1].data = expenseData;

  cashFlowChart.update();
}


//Dark Mode

const darkToggle = document.getElementById("dashboard-dark-toggle");

darkToggle.addEventListener("change", () => {

    if (darkToggle.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    }

});

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    darkToggle.checked = true;
}

//Logout Button

const logoutBtn = document.querySelector(".logout-btn");

logoutBtn.addEventListener("click", () => {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";

});

// Username change and Currency
const profileName = document.getElementById("profile-username");
const currencySelect = document.getElementById("p-currency");
const saveProfileBtn = document.querySelector(".savebtn");

saveProfileBtn.addEventListener("click", ()=>{
  const profile ={
    name: profileName.value.trim(),
    currency:currencySelect.value
  };

  localStorage.setItem("profile", JSON.stringify(profile));

  loadProfile();

  alert("Profile updated Successfuly!");
});

function loadProfile() {

    const profile = JSON.parse(localStorage.getItem("profile"));

    if (!profile) return;

    profileName.value = profile.name;
    currencySelect.value = profile.currency;

    document.getElementById("navbar-username").textContent = profile.name;

    updateDashboard();

}

function getCurrencySymbol(){
  const profile =JSON.parse(localStorage.getItem("profile"));

  if(!profile) return  "₹";

     switch(profile.currency){

        case "USD":
            return "$";

        case "EUR":
            return "€";

        case "GBP":
            return "£";

        case "JPY":
            return "¥";

        default:
            return "₹";
    }
}
loadProfile();
updateDashboard();
