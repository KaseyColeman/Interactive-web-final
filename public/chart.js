var ctx = document.getElementById("myChart").getContext('2d');
var boxy = document.getElementById("boxy").getContext('2d');
var quadrilateral = document.getElementById("quadrilateral").getContext("2d");
var test;
fetch('http://localhost:3001/api').then(res =>
    res.json()).then(data => {
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Yellow", "Red", "Blue", "Maroon"],
            datasets: [{
                label: "Favorite Color",
                backgroundColor: ['rgb(238, 250, 0)', 'rgb(255, 0, 55)', 'rgb(41, 49, 206)', 'rgb(220, 20, 60)'],
                borderColor: ['rgb(238, 243, 0)', 'rgb(255, 0, 6)', 'rgb(6, 0, 140)', 'rgb(178, 20, 60)'],
                data: [data["What is the best color?"]["yellow"], data["What is the best color?"]["red"], data["What is the best color?"]["blue"], data["What is the best color?"]["maroon"]]
            }]
        },
        options: {"scales": {"yAxes":[{"ticks":{"beginAtZero":true}}]}}
    });
    var chart = new Chart(boxy, {
        type: 'bar',
        data: {
            labels: ["Fall", "Winter", "Spring", "Summer"],
            datasets: [{
                label: "Favorite Season",
                backgroundColor: ['rgb(255, 158, 75)', 'rgb(0, 244, 255)', 'rgb(255, 208, 255)', 'rgb(255, 88, 141)'],
                borderColor: ['rgb(255, 133, 53)', 'rgb(0, 191, 255)', 'rgb(255, 20, 60)', 'rgb(255, 43, 141)'],
                data: [data["What is your favorite season?"]["fall"], data["What is your favorite season?"]["winter"], data["What is your favorite season?"]["spring"], data["What is your favorite season?"]["summer"]]
            }]
        },
        options: {"scales": {"yAxes":[{"ticks":{"beginAtZero":true}}]}}
    });
    var chart = new Chart(quadrilateral, {
        type: 'bar',
        data: {
            labels: ["Horror", "Romance", "Comedy", "Thriller"],
            datasets: [{
                label: "Favorite Movie Genres",
                backgroundColor: ['rgb(0, 0, 0)', 'rgb(255, 255, 69)', 'rgb(41, 49, 206)', 'rgb(255, 0, 0)'],
                borderColor: ['rgb(0, 0, 49)', 'rgb(255, 255, 150)', 'rgb(6, 0, 140)', 'rgb(255, 59, 0)'],
                data: [data["What is your favorite genre?"]["horror"], data["What is your favorite genre?"]["romance"], data["What is your favorite genre?"]["comedy"], data["What is your favorite genre?"]["thriller"]]
            }]
        },
        options: {"scales": {"yAxes":[{"ticks":{"beginAtZero":true}}]}}
    });
    // console.log(data["What is the best color?"]["yellow"]); 
});