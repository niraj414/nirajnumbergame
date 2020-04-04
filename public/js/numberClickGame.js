var imageMap = {
    Ashish: "",
    Niraj: "",
    Durgesh: "",
    Ravi: "",
    Bubu: "",
    Aditya: "",
    Roshan: "",
    Rohit: ""
};
var arr= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
var currNum = 1;
var interval = 2000;
var tableShuffle, timer;
var score;

function constructNumberSelectGameBoard() {
    // Construct Game Board Header
    $("#game-title").html("Number Select")

    // Constuct score area
    $("#score").empty();
    $("#score").append(`<p id="a">Time Elapsed : <span id="time">0.000</span></p>`);
    $("#score").append(`<p>Current Number : <span id="curr">1</span></p>`);

    // Construct table
    constructTable();

    // Construct action area
    $("#actionArea").empty();
    $("#actionArea").append(`<button type="button" class="btn btn-primary btn-lg btn-block" id="reset">Reset</button>`);
    $("#actionArea").append(`<button type="button" class="btn btn-primary btn-lg btn-block" id="changePrefs">Preferences</button>`);

    $('#reset').click(function() {
        reset();
    });

    $('#changePrefs').click(function() {
        changePreferences();
    });
}

function constructTable() {
    $("#table1 tbody").empty();
    //var keys = Object.keys(imageMap);
    shuffleArray(arr);
    //console.log(keys);
    for (var i=0; i<5; i++) {
        var row = "<tr>";
        for (var j=0; j<5; j++) {
            row += `<td>
                        <div class="cellImage">${arr[(i*5 + j)%arr.length]}</div>
                    </td>`
            
        }
        row += "/tr"; 
        $("#table1 tbody").append(row);
    }

}

function printSuccessMessage() {
  var title = `Well done ${$('#playerName').val()}`;
  $("#modalTitle").html(title);
  //var message = `Bhai total time laga ${$("#time").text()}. Share karo fatafat group par.`;
  var timeTaken = parseFloat($("#time").text());
  var sliderVal = document.getElementById("ShuffleSpeed").value;
  score = (1/(timeTaken)) * ((sliderVal+1)/2) * 10e5;
  var message = `Your total score is ${Math.floor(score)}. Publish this score or play a new game.`;
  $("#winMsg").html(message);
  $("#myModal").modal();
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function reset() {
    clearInterval(tableShuffle);
    //tableShuffle = setInterval(constructTable, interval);
    currNum = 1;
    $('#curr').html(currNum);
    clearInterval(timer);
    $('#time').html("0.000");
    constructTable();
    //(S=new Date,timer=setInterval("time.innerHTML=(new Date-S)/1e3"));
}

function changePreferences() {
  $('#preferences').empty()
  $('#gameBoard').hide();

  $('#preferences').html(`<form id="gamePrefs">
                            <div class="form-group">
                                <label for="playerName">Nick Name</label>
                                <input required class="form-control" id="playerName" aria-describedby="emailHelp" placeholder="Enter nick name">
                            </div>
                            <div class="form-group">
                                <label for="ShuffleSpeed">Shuffle Speed</label>
                                <input type="range" class="custom-range" min="0" max="6" step="1" id="ShuffleSpeed">
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>`);
    $('#preferences').show();

    const form = document.getElementById('gamePrefs');
    form.addEventListener('submit', startGame);
}

function startGame() {
  reset();
  
  var slider = document.getElementById("ShuffleSpeed");
  interval = 2000 -(slider.value * 250);
  $('#preferences').hide()
  $('#gameBoard').show();
  constructTable();
  
  event.preventDefault();
}