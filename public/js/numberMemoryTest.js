var tableDim;
var cellArray = [];
var digits = [];
var currIndex = 0;
var currLevel = 3;
var currNumber;

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
            completeCurrentLevel()
        } else {
            currIndex++;
        }
    } 
}



