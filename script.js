let theorySpend = 0;
let theorySave = 0;
let actualSave = 0;
let actualSpend = 0;
let savedData = {};

// Calculate Theory and Actual Spend/Save
function calculateMoney() {
    let moneyEarned = parseFloat(document.getElementById("money-earned").value);
    let moneySpent = parseFloat(document.getElementById("money-spent").value);

    if (!moneyEarned || !moneySpent) {
        alert("Please enter valid amounts for both earned and spent money.");
        return;
    }

    // Calculate theory (60% spend, 40% save)
    theorySpend = moneyEarned * 0.6;
    theorySave = moneyEarned * 0.4;

    // Actual amounts
    actualSpend = moneySpent;
    actualSave = moneyEarned - moneySpent;

    // Progress
    let progressSpend = theorySpend - actualSpend;

    // Update output
    document.getElementById("theory-save").innerText = `$${theorySave.toFixed(2)}`;
    document.getElementById("theory-spend").innerText = `$${theorySpend.toFixed(2)}`;
    document.getElementById("actual-save").innerText = `$${actualSave.toFixed(2)}`;
    document.getElementById("actual-spend").innerText = `$${actualSpend.toFixed(2)}`;
    document.getElementById("progress-spend").innerText = `$${progressSpend.toFixed(2)}`;

    // Update chart
    updateSpendageChart(theorySpend, actualSpend, progressSpend);
}

// Create Spendage Progress Chart
function updateSpendageChart(theorySpend, actualSpend, progressSpend) {
    let ctx = document.getElementById('spend-progress-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Theory Spend', 'Actual Spend', 'Progress Spendage'],
            datasets: [{
                label: 'Spendage Progress',
                data: [theorySpend, actualSpend, progressSpend],
                backgroundColor: ['#4CAF50', '#FF6384', '#36A2EB'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Save data for future use
function saveData() {
    savedData = {
        theorySpend: theorySpend,
        theorySave: theorySave,
        actualSpend: actualSpend,
        actualSave: actualSave
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
            `Last Month's Data:\nTheory Spend: $${savedData.theorySpend.toFixed(2)}, Theory Save: $${savedData.theorySave.toFixed(2)}, 
            Actual Spend: $${savedData.actualSpend.toFixed(2)}, Actual Save: $${savedData.actualSave.toFixed(2)}`;
    } else {
        alert('No data found.');
    }
}