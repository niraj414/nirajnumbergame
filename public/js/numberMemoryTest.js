
var tableDim;
var cellArray = [];
var digits = [];
var currIndex = 0;
var currLevel = 3;
var currNumber;
var next;

var levelTitleMap = {
    3:"Well Done!",
    4:"Way to Go!",
    5:"You're killing it.",
    6:"Impressive indeed",
    7:"That was tough",
    8:"You're a pro",
    9:"That's it. You did it"
}


function initializeGameBoard() {

}

function launchMemorizeGame() {
    constructMemorizeGameBoard();
    getNextNumber();
    presentDigitsToUser();
}

function constructMemoryTestTable(dim) {
    tableDim = dim;
    $("#tableId tbody").empty();
    for (var i=0; i<dim; i++) {
        var row = "<tr>";
        for (var j=0; j<dim; j++) {
            row += `<td>
                        <div class="number-cell"></div>
                    </td>`
            
        }
        row += "/tr"; 
        $("#tableId tbody").append(row);
    }
    $(document).on('click', '.number-cell', function () { 
        var cell = $(this);
        handleCellClick(cell);
    });
}

function getNextNumber() {
    var randomNumber = Math.random();
    console.log(randomNumber);
    currNumber = Math.floor((randomNumber * Math.pow(10,currLevel))+1);
    digits = getDigitArray(currNumber);
    while(digits.length < currLevel) {
        randomNumber = Math.random();
        currNumber = Math.floor((randomNumber * Math.pow(10,currLevel))+1);
        digits = getDigitArray(currNumber);
    }
    $('#curr').html(currNumber)
    console.log(currNumber);
}

function getDigitArray(number) {
    currIndex = 0;
    var digits = [];
    while (number > 0) {
        digits.push(number%10);
        number = parseInt(number/10);
    }
    digits.reverse();
    return digits;
}

function placeNumberInTableCells() {
    var totalCells = tableDim * tableDim;
    digits.forEach(digit => {
        var randomNum = Math.floor(Math.random() * totalCells);
        while (cellArray.indexOf(randomNum) != -1) {
            randomNum = Math.floor(Math.random() * totalCells);
        }
        if (cellArray.indexOf(randomNum) == -1) {
            cellArray.push(randomNum);
            $('#tableId td').eq(randomNum).html(`<div class="number-cell" >${digit}</div>`);
        }
    });
}

function blankOutTable() {
    $(".number-cell").css("background-color", "#212529");

}

function unBlankTable() {
    $(".number-cell").css("background-color", "");
}

function presentDigitsToUser() {
    placeNumberInTableCells();
    setTimeout(blankOutTable, currLevel*1000);
}

function setCellColor(cell, color) {
    cell.css("background-color", color);
}

function handleCellClick(cell) {
    console.log("Cell clicked");
    //var cell = $(this);
    var digit = parseInt(cell.text());
    if (digit === digits[currIndex]) {
        setCellColor(cell, "");
        if (currIndex == digits.length - 1) {
            completeCurrentLevel();
        } else {
            currIndex++;
        }
    } 
}

function resetTableContent() {
    unBlankTable();
    $("#tableId tbody tr td div").empty(); 
    getNextNumber();
    presentDigitsToUser();
}

function moveToNextLevel() {
    console.log("Moving to next level");
    currLevel++;
    resetTableContent();
}

function completeCurrentLevel() {
    var completLevelModal = {};
    completLevelModal["title"] = levelTitleMap[currLevel];
    completLevelModal["body"] = "You've successfully completed this level. See if you can memorize more.";
    var buttons = [];
    buttons.push({
        "id" : "nextLevelButton",
        "title": "Next",
        "handler": moveToNextLevel
    });
    completLevelModal["buttons"] = buttons;
    launchModal(completLevelModal);
}

function constructMemorizeGameBoard() {
    // Construct Game Board Header
    $("#game-title").html("Memorize")

    // Constuct score area
    $("#score").empty();
    $("#score").append(`<p id="a">Time Elapsed : <span id="time">0.000</span></p>`);
    $("#score").append(`<p>Current Number : <span id="curr"></span></p>`);

    // Construct table
    constructMemoryTestTable(5);

    // Construct action area
    $("#actionArea").empty();
    $("#actionArea").append(`<button type="button" class="btn btn-primary btn-lg btn-block" id="resetMemorize">Reset</button>`);
    $("#actionArea").append(`<button type="button" class="btn btn-primary btn-lg btn-block" id="memorizePrefs">Preferences</button>`);

    $('#resetMemorize').click(function() {
        resetTableContent();
    });

    $('#memorizePrefs').click(function() {
        MemorizeGamePrefHandler();
    });
}

function resetMemorizeGame() {
    console.log("Resetting memorize game");
    getNextNumber();
    presentDigitsToUser();
}

function MemorizeGamePrefHandler() {
    console.log("Memorize game preference");
}