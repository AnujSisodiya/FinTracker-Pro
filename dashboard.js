const ctx = document.getElementById("cashFlowChart");
 
new Chart(ctx, {
    type: "bar",

    data: {
        labels: [],

        datasets: [
            {
                label: "Income",
                data: [],
                borderColor: "#15803d",
                backgroundColor: "#15803d",
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0
            },
            {
                label: "Expenses",
                data: [],
                borderColor: "#b91c1c",
                backgroundColor: "#b91c1c",
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0
            }
        ]
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
                    boxWidth: 50
                }
            }

        },

        scales: {

            x: {

                title: {
                    display: true,
                    text: "Income vs Expenses"
                },

                grid:{
    color:"#eef2f7",
    drawBorder:false
}
            },

            y: {

                min: 0,
                max: 1,

                ticks: {
                    stepSize: 0.1
                }

            }

        }

    }

});