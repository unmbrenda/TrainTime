var config = {
  apiKey: "AIzaSyB0-4sR-rRPCS_7sngnM5hddrn7TEoHOsM",
  authDomain: "train-times-53ed0.firebaseapp.com",
  databaseURL: "https://train-times-53ed0.firebaseio.com",
  projectId: "train-times-53ed0",
  storageBucket: "",
  messagingSenderId: "740757890430"
};
firebase.initializeApp(config);

var database = firebase.database();
var train = "";
var destination = "";
var arrival = "";
var frequency = "";

document.getElementById("run-search").addEventListener("click", function (event){

  event.preventDefault();

    var train = $("#search-train").val().trim();
    var destination = $("#search-destination").val().trim();
    var arrival = $("#start-time").val().trim();
    var frequency = $("#frequency").val().trim();
    database.ref().push({
    
      train: train,
      destination: destination,
      arrival: arrival,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });
    

  database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val().arrival);

    var frequency = parseInt(childSnapshot.val().frequency);
    var currentTime = moment("1900-01-01 " + moment().format("HH:mm:00"));
    var startTime = moment("1900-01-01 " + childSnapshot.val().arrival);
    var minutes = currentTime.diff(startTime, "minutes");
    console.log(minutes);
    var minutesRemaining =frequency -( minutes % frequency);
    var nextArrivalTime = moment().add(minutesRemaining, "minutes");
    

    var tr = $("<tr>");
    $(tr).append($("<td>").html(childSnapshot.val().train));
    $(tr).append($("<td>").html(childSnapshot.val().destination));
    $(tr).append($("<td>").html(nextArrivalTime.format("HH:mm")));
    $(tr).append($("<td>").html(childSnapshot.val().frequency));
    $(tr).append($("<td>").html(minutesRemaining));
    $("#trainTable").append(tr);
    
    $("#search-train").val("");
    $("#search-destination").val("");
    $("#start-time").val("");
    $("#frequency").val("");

  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  