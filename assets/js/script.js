$(document).ready(function () {

    // Config & Initialize `traintime` Firebase
    var config = {
        apiKey: "AIzaSyB-yelf2rmsbf6YICYZBNEO1bntvA5WjS4",
        authDomain: "traintime-eb285.firebaseapp.com",
        databaseURL: "https://traintime-eb285.firebaseio.com",
        projectId: "traintime-eb285",
        storageBucket: "",
        messagingSenderId: "298743406219"
    };
    firebase.initializeApp(config);

    //Variables
    var database = firebase.database();


    //Current Time
    var currentTime = moment();
    console.log("Local time: " + moment().format("HH:mm"));

    //Writes Current Time to Jumbotron
    $("#currentTime").text(currentTime);

    //Button click capture
    $("#submit").on("click", function () {

        //Assign values to the Id"s in the HTML
        var train = $("#enterTrain").val().trim();
        var dest = $("#enterDest").val().trim();
        var firstTrain = $("#enterTime").val().trim();
        var frequency = $("#enterFrequency").val().trim();

        //Parse frequency "string" into an integer
        var frequency = parseInt(frequency);

        //Push new train data to Firebase
        database.ref().push({

            train: train,
            dest: dest,
            firstTrain: firstTrain,
            frequency: frequency,
            timeAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });