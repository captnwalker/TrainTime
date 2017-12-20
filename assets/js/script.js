
$(document).ready(function () {

    //Set Variable & Initialize `traintime` Firebase
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

    //Pulls current time from Moment.js
    var currentTime = moment();
    console.log("Local time: " + moment().format('HH:mm'));

    //Writes Current Time to Jumbotron
    $('#currentTime').text(currentTime);

    //Button click capture
    $("#submit").on("click", function () {

        //Assign values to the Id"s in the HTML
        var train = $('#enterTrain').val().trim();
        var dest = $('#enterDest').val().trim();
        var firstTrain = $('#enterTime').val().trim();
        var frequency = $('#enterFrequency').val().trim();

        // Push new train data to Firebase
        database.ref().push({

            train: train,
            dest: dest,
            firstTrain: firstTrain,
            frequency: frequency,
            timeAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });

    //On click (new train/child added) take a snapshot
    database.ref().on("child_added", function (childSnapshot) {

        var train = childSnapshot.val().train;
        var dest = childSnapshot.val().dest;
        var firstTrain = childSnapshot.val().firstTrain;
        var frequency = childSnapshot.val().frequency;

        // Log the snapshot values
        console.log("Train: " + train);
        console.log("Destination: " + dest);
        console.log("Next Train: " + firstTrain);
        console.log("Frequency: " + frequency);


        //Parse frequency "string" into an integer | Obtain current time & log
        var frequency = parseInt(frequency);
        var currentTime = moment();
        console.log("Current Time: " + moment().format('HH:mm'));