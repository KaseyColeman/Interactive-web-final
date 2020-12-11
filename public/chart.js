var ctx = document.getElementById("myChart").getContext('2d');
var boxy = document.getElementById("boxy").getContext('2d');
var quadrilateral = document.getElementById("quadrilateral").getContext("2d");
var test;
fetch('http://localhost:3001/api').then(res =>
    res.json()).then(data => {
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["YELLOW", "RED", "BLUE", "MAROON"],
            datasets: [{
                label: "Favorite color",
                backgroundColor: ['rgb(255, 230, 87)', 'rgb(251,100,100)', 'rgb(100, 145, 251)', 'rgb(143, 60, 60)'],
                // borderColor: ['rgb(238, 243, 0)', 'rgb(0, 0, 6)', 'rgb(6, 0, 140)', 'rgb(178, 20, 60)'],
                data: [data["What is the best color?"]["yellow"], data["What is the best color?"]["red"], data["What is the best color?"]["blue"], data["What is the best color?"]["maroon"]]
            }]
        },
        options: {"scales": {"yAxes":[{"ticks":{"beginAtZero":true}}]}}
    });
    var chart = new Chart(boxy, {
        type: 'bar',
        data: {
            labels: ["FALL", "WINTER", "SPRING", "SUMMER"],
            datasets: [{
                label: "Favorite Season",
                backgroundColor: ['rgb(255, 178, 100)', 'rgb(141, 243, 255)', 'rgb(178, 255, 100)', 'rgb(255, 230, 87)'],
                // borderColor: ['rgb(255, 133, 53)', 'rgb(0, 191, 255)', 'rgb(255, 20, 60)', 'rgb(255, 43, 141)'],
                data: [data["What is your favorite season?"]["fall"], data["What is your favorite season?"]["winter"], data["What is your favorite season?"]["spring"], data["What is your favorite season?"]["summer"]]
            }]
        },
        options: {"scales": {"yAxes":[{"ticks":{"beginAtZero":true}}]}}
    });
    var chart = new Chart(quadrilateral, {
        type: 'bar',
        data: {
            labels: ["HORROR", "ROMANCE", "COMEDY", "THRILLER"],
            datasets: [{
                label: "Favorite Movie Genres",
                backgroundColor: ['rgb(88, 88, 88)', 'rgb(255, 152, 249)', 'rgb(255, 230, 87)', 'rgb(109, 157, 106)'],
                borderColor: ['rgb(0, 0, 49)', 'rgb(255, 255, 150)', 'rgb(6, 0, 140)', 'rgb(255, 59, 0)'],
                data: [data["What is your favorite genre?"]["horror"], data["What is your favorite genre?"]["romance"], data["What is your favorite genre?"]["comedy"], data["What is your favorite genre?"]["thriller"]]
            }]
        },
        options: {"scales": {"yAxes":[{"ticks":{"beginAtZero":true}}]}}
    });
    // console.log(data["What is the best color?"]["yellow"]); 
});