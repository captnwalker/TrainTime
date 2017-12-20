
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

        //Parse the frequency "string" into an integer | Obtain current time & log
        var frequency = parseInt(frequency);
        var currentTime = moment();
        console.log("Current Time: " + moment().format('HH:mm'));

        //Converting time of new train (firstTrain) and retrieving current time and converting it to miltary format (HH:mm) and logging the results
        var dateConvert = moment(childSnapshot.val().firstTrain, 'HH:mm').subtract(1, 'years');
        console.log("Date converted: " + dateConvert);
        var trainTime = moment(dateConvert).format('HH:mm');
        console.log("Train Time : " + trainTime);

        //Calculating difference between the two times
        var timeConvert = moment(trainTime, 'HH:mm').subtract(1, 'years');
        var timeDiff = moment().diff(moment(timeConvert), 'minutes');
        console.log("Difference in Times: " + timeDiff);

        //Using Modulus % to calculate the remainder
        var timeRemain = timeDiff % frequency;
        console.log("First Train arrives: " + timeRemain);

        //Frequency minus timeRemain (modulus) yeilds minutes until arrival
        var minutesAway = frequency - timeRemain;
        console.log("Minutes until next Train: " + minutesAway);

        //Adding minutes away to the current time to project the trains arrival time and console logs the result in military format
        var firstTrain = moment().add(minutesAway, 'minutes');
        console.log("Arrival time: " + moment(firstTrain).format('HH:mm'));

        //Appending new dataset to the HTML table
        $('#currentTime').text(currentTime);
        $('#trainTable').append(
            "<tr><td id='trainDisplay'>" + childSnapshot.val().train +
            "</td><td id='destDisplay'>" + childSnapshot.val().dest +
            "</td><td id='frequencyDisplay'>" + childSnapshot.val().frequency +
            "</td><td id='nextDisplay'>" + moment(firstTrain).format("HH:mm") +
            "</td><td id='awayDisplay'>" + minutesAway + ' minutes until arrival' + "</td></tr>");
    },

        function (errorObject) {
            console.log("Read failed: " + errorObject.code)
        });
});