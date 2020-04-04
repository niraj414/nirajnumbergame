function getAvailableGames(){
   return  {
        "game1" : {
            "name" : "Number Click",
            "desc" : "",
            "launcher" : constructNumberSelectGameBoard
        },
        "game2" : {
            "name" : "Memorize",
            "desc" : "",
            "launcher" : launchMemorizeGame
        }
    }
}

function showGameSelectionTiles() {
    $('#gameSelection').empty();
    var html = "";
    var games = getAvailableGames();
    for (const game in games) {
        $('#gameSelection').append(`<div class="col-6">
                                        <div class="tile purple" id="${game}">
                                        <h3 class="title">${games[game].name}</h3>
                                        <p>${games[game].desc}</p>
                                        </div>
                                    </div>`);

        $(`#${game}`).click(() => {
            $('#gameSelection').hide();
            $('#gameBoard').show();
            games[game].launcher();
        });
    }
}


function launchModal(modalProps) {
    var modalTitle = modalProps.title || "";
    $("#modalTitle").html(modalTitle);
    var modalBody = modalProps.body || "";
    $("#winMsg").html(modalBody);

    $(".modal-footer").empty();
    if (modalProps.buttons) {
        modalProps.buttons.forEach(button => {
            $(".modal-footer").append(`<button type="button" class="btn btn-secondary" data-dismiss="modal" id="${button.id}">${button.title}</button>`);
            $(`#${button.id}`).click(button.handler);
        });
    }
    $("#myModal").modal();
}