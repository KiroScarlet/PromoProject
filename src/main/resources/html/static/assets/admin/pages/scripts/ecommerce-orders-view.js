var EcommerceOrdersView = function () {


    var handleInvoices = function () {

        var grid = new Datatable();
        grid.init({
            src: $("#datatable_invoices"),
            onSuccess: function(grid) {
                // execute some code after table records loaded
            },
            onError: function(grid) {
                // execute some code on network or other general error  
            },
            dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 
                "aLengthMenu": [
                    [20, 50, 100, 150, -1],
                    [20, 50, 100, 150, "All"] // change per page values here
                ],
                "iDisplayLength": 20,
                "bServerSide": true,
                "sAjaxSource": "demo/ecommerce_order_invoices.php",
                "aaSorting": [[ 1, "asc" ]] // set first column as a default sort by asc
            }
        });

        // handle filter submit button click
        grid.getTableWrapper().on('click', '.table-group-action-submit', function (e) {
            e.preventDefault();
            var action = $(".table-group-action-input", grid.getTableWrapper());
            if (action.val() != "" && grid.getSelectedRowsCount() > 0) {
                grid.addAjaxParam("sAction", "group_action");
                grid.addAjaxParam("sGroupActionName", action.val());
                var records = grid.getSelectedRows();
                for (var i in records) {
                    grid.addAjaxParam(records[i]["name"], records[i]["value"]);
                }
                grid.getDataTable().fnDraw();
                grid.clearAjaxParams();
            } else if (action.val() == "") {
                Metronic.alert({type: 'danger', icon: 'warning', message: 'Please select an action', container: grid.getTableWrapper(), place: 'prepend'});
            } else if (grid.getSelectedRowsCount() === 0) {
                Metronic.alert({type: 'danger', icon: 'warning', message: 'No record selected', container: grid.getTableWrapper(), place: 'prepend'});
            }
        });
    }

    var handleCreditMemos = function () {

        var grid = new Datatable();
        grid.init({
            src: $("#datatable_credit_memos"),
            onSuccess: function(grid) {
                // execute some code after table records loaded
            },
            onError: function(grid) {
                // execute some code on network or other general error  
            },
            dataTable: {
                "aLengthMenu": [
                    [10, 20, 50, 100, 150, -1],
                    [10, 20, 50, 100, 150, "All"] // change per page values here
                ],
                "iDisplayLength": 10,
                "bServerSide": true,
                "sAjaxSource": "demo/ecommerce_order_credit_memos.php",
                "aoColumnDefs" : [{  // define columns sorting options(by default all columns are sortable extept the first checkbox column)
                    'bSortable' : true
                }],
                "aaSorting": [[ 0, "asc" ]] // set first column as a default sort by asc
            }
        });

    }

    var handleShipment = function () {

        var grid = new Datatable();
        grid.init({
            src: $("#datatable_shipment"),
            onSuccess: function(grid) {
                // execute some code after table records loaded
            },
            onError: function(grid) {
                // execute some code on network or other general error  
            },
            dataTable: {
                "aLengthMenu": [
                    [10, 20, 50, 100, 150, -1],
                    [10, 20, 50, 100, 150, "All"] // change per page values here
                ],
                "iDisplayLength": 10,
                "bServerSide": true,
                "sAjaxSource": "demo/ecommerce_order_shipment.php",
                "aoColumnDefs" : [{  // define columns sorting options(by default all columns are sortable extept the first checkbox column)
                    'bSortable' : true
                }],
                "aaSorting": [[ 0, "asc" ]] // set first column as a default sort by asc
            }
        });
    }

    var handleHistory = function () {

        var grid = new Datatable();
        grid.init({
            src: $("#datatable_history"),
            onSuccess: function(grid) {
                // execute some code after table records loaded
            },
            onError: function(grid) {
                // execute some code on network or other general error  
            },
            dataTable: {
                "aLengthMenu": [
                    [20, 50, 100, 150, -1],
                    [20, 50, 100, 150, "All"] // change per page values here
                ],
                "iDisplayLength": 20,
                "bServerSide": true,
                "sAjaxSource": "demo/ecommerce_order_history.php",
                "aoColumnDefs" : [{  // define columns sorting options(by default all columns are sortable extept the first checkbox column)
                    'bSortable' : true
                }],
                "aaSorting": [[ 0, "asc" ]] // set first column as a default sort by asc
            }
        });

        // handle filter submit button click
        grid.getTableWrapper().on('click', '.table-group-action-submit', function (e) {
            e.preventDefault();
            var action = $(".table-group-action-input", grid.getTableWrapper());
            if (action.val() != "" && grid.getSelectedRowsCount() > 0) {
                grid.addAjaxParam("sAction", "group_action");
                grid.addAjaxParam("sGroupActionName", action.val());
                var records = grid.getSelectedRows();
                for (var i in records) {
                    grid.addAjaxParam(records[i]["name"], records[i]["value"]);
                }
                grid.getDataTable().fnDraw();
                grid.clearAjaxParams();
            } else if (action.val() == "") {
                Metronic.alert({type: 'danger', icon: 'warning', message: 'Please select an action', container: grid.getTableWrapper(), place: 'prepend'});
            } else if (grid.getSelectedRowsCount() === 0) {
                Metronic.alert({type: 'danger', icon: 'warning', message: 'No record selected', container: grid.getTableWrapper(), place: 'prepend'});
            }
        });
    } 

    var initPickers = function () {
        //init date pickers
        $('.date-picker').datepicker({
            rtl: Metronic.isRTL(),
            autoclose: true
        });

        $(".datetime-picker").datetimepicker({
            isRTL: Metronic.isRTL(),
            autoclose: true,
            todayBtn: true,
            pickerPosition: (Metronic.isRTL() ? "bottom-right" : "bottom-left"),
            minuteStep: 10
        });
    }

    return {

        //main function to initiate the module
        init: function () {
            initPickers();

            handleInvoices();
            handleCreditMemos();
            handleShipment();
            handleHistory();
        }

    };

}();