
var tableDim;
var cellArray = [];
var digits = [];
var currIndex = 0;
var currLevel = 3;
var currNumber;

var levelTitleMap = {
    3:"Well Done!",
    4:"",
    5:"",
    6:"",
    7:"",
    8:"",
    9:""
}


function initializeGameBoard() {

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
}

function moveToNextLevel() {
    console.log("Moving to next level");
    currLevel++;
    resetTableContent();
    getNextNumber();
    presentDigitsToUser();
}

function completeCurrentLevel() {
    var completLevelModal = {};
    completLevelModal["title"] = levelTitleMap[currLevel];
    completLevelModal["body"] = "You've successfully completed this level. See if you can memorie more.";
    var buttons = [];
    buttons.push({
        "id" : "nextLevelButton",
        "title": "Next",
        "handler": moveToNextLevel
    });
    completLevelModal["buttons"] = buttons;
    launchModal(completLevelModal);
}

