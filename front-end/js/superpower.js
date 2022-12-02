$(document).ready(function () {
  loadSuperpowers();
  addSuperpower();
  updateSuperpower();
});

function loadSuperpowers() {
  clearPowersTable();
  var contentRows = $("#contentRows");

  $.ajax({
    type: "GET",
    url: "http://localhost:9090/api/superpower/" + superpowerId,
    success: function (superpowerArray) {
      console.log(superpowerArray);
      $.each(superpowerArray, function (index, superpower) {
        var name = location.name;
        var row = "<tr>";
        row += "<td>" + name + "</td>";
        row +=
          '<td><button type="button" class="btn btn-primary" onclick="showEditForm(' +
          superpowerId +
          ')">Edit</button></td>';
        row +=
          '<td><button type="button" class="btn btn-danger" onclick="deleteSuperpower(' +
          superpowerId +
          ')">Delete</button></td>';

        contentRows.append(row);
      });
    },

    error: function () {
      $("#errorMessages").append(
        $("<li>")
          .attr({ class: "list-group-item list-group-item-danger" })
          .text("Error calling web service. Please try again later.")
      );
    },
  });
}

function clearPowersTable() {
  $("#contentRows").empty();
}

function addPower() {
  $("#add-power").click(function (event) {
    $.ajax({
      type: "POST",
      url: "http://localhost:9090/api/location",
      data: JSON.stringify({
        name: $("addName").val(),
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      dataType: "json",
      success: function () {
        $("#errorMessages").empty();
        $("#addName").val(""), loadSuperpowers(); // check variable addName
      },
      error: function () {
        $("#errorMessages").append(
          $("<li>")
            .attr({ class: "list-group-item list-group-item-danger" })
            .text("Error calling web service. Please try again later.")
        );
      },
    });
  });
}

function showEditForm(superpowerId) {
  $("#errorMessages").empty();

  $.ajax({
    type: "GET",
    url: "http//localhost:9090/api/superpower/" + superpowerId,
    success: function (data, status) {
      $("#edit-power").val(data.name);
    },

    error: function () {
      $("#errorMessages").append(
        $("<li>")
          .attr({ class: "list-group-item list-group-item-danger" })
          .text("Error calling web service. Please try again later.")
      );
    },
  });

  $("#add-form-div").hide();
  $("#edit-form-div").show();
}

function hideEditForm() {
  $("#errorMessages").empty();
  $("#edit-power").val("");

  $("#add-form-div").show();
  $("#edit-form-div").hide();
}

function hideAddForm() {
  $("#errorMessages").empty();
  $("#add-power").val("");

  $("#superpower-table-div").show(); // dont know where this comes from
  $("#edit-form-div").show();
}

function updateSuperpower() {
  $("#update-btn").click(function (event) {
    $.ajax({
      type: "PUT",
      url: "http://localhost:9090/api/superpower/",
      data: JSON.stringify({
        name: $("#edit-power").val(),
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      dataType: "json",
      success: function () {
        $("#errorMessage").empty();
        clearPowersTable();
        loadSuperpowers();
        hideEditForm();
      },
      error: function () {
        $("#errorMessages").append(
          $("<li>")
            .attr({ class: "list-group-item list-group-item-danger" })
            .text("Error calling web service. Please try again later.")
        );
      },
    });
  });
}

function deleteSuperpower(superpowerId) {
  $.ajax({
    type: "DELETE",
    url: "http://localhost:9090/api/superpower/" + superpowerId,
    success: function () {
      loadSuperpowers();
    },
  });
}
