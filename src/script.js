let supposedSave = 0;
let supposedSpend = 0;
let moneySaved = 0;
let progressSpent = 0;
let savedData = {};

// Calculate the finances based on inputs
function calculateFinances() {
    let incomeEarned = parseFloat(document.getElementById("income-earned").value);
    let moneySpent = parseFloat(document.getElementById("money-spent").value);
    let savingPercentage = parseFloat(document.getElementById("saving-percentage").value);

    if (incomeEarned && moneySpent && savingPercentage) {
        supposedSave = (savingPercentage / 100) * incomeEarned;
        supposedSpend = incomeEarned - supposedSave;
        moneySaved = incomeEarned - moneySpent;
        progressSpent = supposedSpend - moneySpent;

        document.getElementById("supposed-save").innerText = `$${supposedSave.toFixed(2)}`;
        document.getElementById("supposed-spend").innerText = `$${supposedSpend.toFixed(2)}`;
        document.getElementById("money-saved").innerText = `$${moneySaved.toFixed(2)}`;
        document.getElementById("progress-spent").innerText = `$${progressSpent.toFixed(2)}`;

        displayCharts();
    } else {
        alert("Please enter all the inputs.");
    }
}

// Display charts for spend progress and save progress
function displayCharts() {
    // Spend Progress Chart
    let spendChart = document.getElementById('spend-progress-chart').getContext('2d');
    new Chart(spendChart, {
        type: 'bar',
        data: {
            labels: ['Supposed Spend', 'Actual Spend', 'Progress Spent'],
            datasets: [{
                label: 'Spend Progress',
                data: [supposedSpend, moneySaved, progressSpent],
                backgroundColor: ['blue', 'green', 'red']
            }]
        }
    });

    // Savings Progress Chart
    let saveChart = document.getElementById('save-progress-chart').getContext('2d');
    new Chart(saveChart, {
        type: 'bar',
        data: {
            labels: ['Supposed Save', 'Actual Saved'],
            datasets: [{
                label: 'Savings Progress',
                data: [supposedSave, moneySaved],
                backgroundColor: ['blue', 'green']
            }]
        }
    });
}

// Save data for future use
function saveData() {
    savedData = {
        supposedSave: supposedSave,
        supposedSpend: supposedSpend,
        moneySaved: moneySaved,
        progressSpent: progressSpent
    };
    localStorage.setItem('savedData', JSON.stringify(savedData));
    alert('Data saved successfully!');
}

// Load data from last month
function loadData() {
    let data = localStorage.getItem('savedData');
    if (data) {
        savedData = JSON.parse(data);
        document.getElementById('saved-data').innerText = 
            `Last Month's Data:\nSupposed Save: $${savedData.supposedSave.toFixed(2)}, Supposed Spend: $${savedData.supposedSpend.toFixed(2)}, 
             Money Saved: $${savedData.moneySaved.toFixed(2)}, Progress Spent: $${savedData.progressSpent.toFixed(2)}`;
    } else {
        alert('No data found.');
    }
}