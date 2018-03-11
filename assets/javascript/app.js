var database = firebase.database();

$("#run-search").on("click", function(event) {
    event.preventDefault();

    var name = $("#data-name").val().trim();
    var destination = $("#data-destination").val().trim();
    var arrival = $("#data-arrival").val().trim();
    var frequency = $("#data-frequency").val().trim();

    console.log(name);
    console.log(destination);
    console.log(arrival);
    console.log(frequency);

    $("#data-name").text(name);
    $("#data-destination").text(frequency);
    $("#data-arrival").text(arrival);
    $("#data-frequency").text(frequency);

  });
//   function calculateTime(){
//     var a = moment(now);
//     var b = moment(arrivalTime);
    
//     console.log(a.diff(b, 'minutes'));
    
//   }