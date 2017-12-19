$(document).ready(function(){
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB-yelf2rmsbf6YICYZBNEO1bntvA5WjS4",
    authDomain: "traintime-eb285.firebaseapp.com",
    databaseURL: "https://traintime-eb285.firebaseio.com",
    projectId: "traintime-eb285",
    storageBucket: "",
    messagingSenderId: "298743406219"
  };
  firebase.initializeApp(config);

  //Variable/s
  var database = firebase.database();