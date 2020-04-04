function launchModal(modalProps) {
    var modalTitle = modalProps.title || "";
    $("#modalTitle").html(modalTitle);
    var modalBody = modalProps.body || "";
    $("#winMsg").html(modalBody);

    $(".modal-footer").empty();
    modalProps.buttons.forEach(button => {
        $(".modal-footer").append(`<button type="button" class="btn btn-secondary" data-dismiss="modal" id="${button.id}">${button.title}</button>`);
        $(`#${button.id}`).click(button.handler);
    });
    $("#myModal").modal();
}