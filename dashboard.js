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

  transactions.push(transaction);

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
  balanceValue.textContent = `₹${balance.toFixed(2)}`;
  incomeValue.textContent = `₹${income.toFixed(2)}`;
  expenseValue.textContent = `₹${expense.toFixed(2)}`;
  transactionValue.textContent = transactions.length;
}

//Filter Section in transaction Table 
const filter = document.getElementById("transaction-filter");

filter.addEventListener("change", ()=>{
    updateTable();
});

//Update the Table

function updateTable() {
  transactionBody.innerHTML = "";

  const selectedFilter =filter.value;
  let filteredTransactions = transactions;
  
  if(selectedFilter === "Income"){
    filteredTransactions = transactions.filter( transaction => transaction.type === "Income");
  }
  
  if(selectedFilter === "Expense"){
    filteredTransactions = transactions.filter( transaction => transaction.type === "Expense");
  }

  transactions.forEach((transaction) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${transaction.date}</td>
        <td>${transaction.description}</td>
        <td>
    <span class="category-badge">
        ${transaction.category}
    </span>
</td>
        <td class="${transaction.type === "Income" ? "income" : "expense"}">
    ${transaction.type === "Income" ? "+" : "-"}₹${transaction.amount.toFixed(2)}
</td>
        <td> <div class="action-buttons">
    <button class="edit-btn">
        <i class="fa-solid fa-pen"></i>
    </button>
    <button class="delete-btn">
         <i class="fa-solid fa-trash"></i>
    </button>
</div> </td>
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

updateDashboard();
