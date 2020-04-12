$(document).ready(function () {
    var table = $('#table_id').DataTable({
        data: [
            { username: "khoa", role: "admin", status: "đang hoạt động" }
        ],
        columns: [
            { data: 'username' },
            { data: 'role' },
            { data: 'status' },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return "ahihi"
                }
            }
        ]
    });

    table.on('search.dt', function () {
        $('#data').html('Currently applied global search: ' + table.search());
    });
});

$('#modeNewUser').on('show.bs.modal', event => {
    var button = $(event.relatedTarget);
    var modal = $(this);
    // Use above variables to manipulate the DOM
});

