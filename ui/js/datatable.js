//= require jquery.dataTables.js

// Add any data table occurences here
$(function() {
    $('table#references').DataTable(
        {
            "dom": '<"top"i>rlfpt<"bottom"><"clear">'
        }
    );
    $('table#footnotes').DataTable(
        {
            "dom": '<"top"i>rlfpt<"bottom"><"clear">'
        }
    );
});
