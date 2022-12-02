loadSightings();

// function to load sightings
function loadSightings() {
  var contentRows = $("#contentRows");

  $.ajax({
    type: "GET",
    url: "http://localhost:9090/api/sighting",
    success: function (sightingArray) {
      $.each(sightingArray, function (index, sighting) {
        var name = sighting.superhero.name;
        var location = sighting.location.name;
        var date = sighting.date;
        var sightingId = sighting.id;

        var row = "<tr>";
        row +=
          '<td><a href="sighting.html?id=' +
          sightingId +
          '">' +
          sightingId +
          "</a></td>";
        row += "<td>" + name + "</td>";
        row += "<td>" + location + "</td>";
        row += "<td>" + date + "</td>";
        row += "</tr>";

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
