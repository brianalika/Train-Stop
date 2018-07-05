// Initialize Firebase
var config = {
    apiKey: "AIzaSyDx5691cL0WUrDTkgl0CQVs8UDvSr0inC8",
    authDomain: "train-schdeule-cc112.firebaseapp.com",
    databaseURL: "https://train-schdeule-cc112.firebaseio.com",
    projectId: "train-schdeule-cc112",
    storageBucket: "train-schedule-cc112.appspot.com",
    messagingSenderId: "321870667931"
  };
  firebase.initializeApp(config);


  // Create Global Variables
  var database = firebase.database();
  var trainName = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = 0;
  
  
  // Create functions and click events
  $("#addTrain").on("click", function() {
  
    trainName = $('#nameInput').val().trim();
    destination = $('#destinationInput').val().trim();
    firstTrainTime = $('#firstTrainInput').val().trim();
    frequency = $('#frequencyInput').val().trim();
  
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);
  
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
    });
  
      return false;
  });
  
  
    // Main process
    database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());
  
    
    // Update the values from input fields
    trainName = snapshot.val().trainName;
    destination = snapshot.val().destination;
    firstTrainTime = snapshot.val().firstTrainTime;
    frequency = snapshot.val().frequency;
  
  
    // Calculates the time remaining for next arrival
    var firstTrainMoment = moment(firstTrainTime, 'HH:mm');
    var nowMoment = moment();
  
    var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');
    var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
    var minutesAway = frequency - minutesSinceLastArrival;
  
    var nextArrival = nowMoment.add(minutesAway, 'minutes');
    var formatNextArrival = nextArrival.format("HH:mm");
  
  
    // Append to table
    var tr = $('<tr>');
    var a = $('<td>');
    var b = $('<td>');
    var c = $('<td>');
    var d = $('<td>');
    var e = $('<td>');
    a.append(trainName);
    b.append(destination);
    c.append(frequency);
    d.append(formatNextArrival);
    e.append(minutesAway);
    tr.append(a).append(b).append(c).append(d).append(e);
    $('#newTrains').append(tr);
  
  
    }, function (errorObject) {
  
    // Create function to record possible errors
      console.log("The read failed: " + errorObject.code);
  
  });
  