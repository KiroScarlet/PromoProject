/***
Wrapper/Helper Class for datagrid based on jQuery Datatable Plugin
***/

var Datatable = function () {

    var tableOptions;  // main options
    var dataTable; // datatable object
    var table;    // actual table jquery object
    var tableContainer;    // actual table container object
    var tableWrapper; // actual table wrapper jquery object
    var tableInitialized = false;
    var ajaxParams = []; // set filter mode
    
    var countSelectedRecords = function() {
        var selected = $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table).size();
        var text = tableOptions.dataTable.oLanguage.sGroupActions;
        if (selected > 0) {
            $('.table-group-actions > span', tableWrapper).text(text.replace("_TOTAL_", selected));
        } else {
            $('.table-group-actions > span', tableWrapper).text("");
        }
    }

    return {

        //main function to initiate the module
        init: function (options) {
            
            if (!$().dataTable) {
                return;
            }

            var the = this;

            // default settings
            options = $.extend(true, {
                src: "",  // actual table 
                filterApplyAction: "filter",
                filterCancelAction: "filter_cancel",
                resetGroupActionInputOnSuccess: true,
                dataTable: {
                    "sDom" : "<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'<'table-group-actions pull-right'>>r><'table-scrollable't><'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'>r>>", // datatable layout
                    
                    "aLengthMenu": [ // set available records per page
                        [10, 25, 50, 100, -1],
                        [10, 25, 50, 100, "All"]
                    ],
                    "iDisplayLength": 10, // default records per page
                    "oLanguage": {  // language settings
                        "sProcessing": '<img src="' + Metronic.getGlobalImgPath() + 'loading-spinner-grey.gif"/><span>&nbsp;&nbsp;Loading...</span>',
                        "sLengthMenu": "<span class='seperator'>|</span>View _MENU_ records",
                        "sInfo": "<span class='seperator'>|</span>Found total _TOTAL_ records",
                        "sInfoEmpty": "No records found to show",
                        "sGroupActions": "_TOTAL_ records selected:  ",
                        "sAjaxRequestGeneralError": "Could not complete request. Please check your internet connection",
                        "sEmptyTable":  "No data available in table",
                        "sZeroRecords": "No matching records found",
                        "oPaginate": {
                            "sPrevious": "Prev",
                            "sNext": "Next",
                            "sPage": "Page",
                            "sPageOf": "of"
                        }
                    },

                    "aoColumnDefs" : [{  // define columns sorting options(by default all columns are sortable extept the first checkbox column)
                        'bSortable' : false,
                        'aTargets' : [ 0 ]
                    }],

                    "bAutoWidth": false,   // disable fixed width and enable fluid table
                    "bSortCellsTop": true, // make sortable only the first row in thead
                    "sPaginationType": "bootstrap_extended", // pagination type(bootstrap, bootstrap_full_number or bootstrap_extended)
                    "bProcessing": true, // enable/disable display message box on record load
                    "bServerSide": true, // enable/disable server side ajax loading
                    "sAjaxSource": "", // define ajax source URL 
                    "sServerMethod": "POST",

                    // handle ajax request
                    "fnServerData": function ( sSource, aoData, fnCallback, oSettings ) {
                      oSettings.jqXHR = $.ajax( {
                        "dataType": 'json',
                        "type": "POST",
                        "url": sSource,
                        "data": aoData,
                        "success": function(res, textStatus, jqXHR) {
                            if (res.sMessage) {
                                Metronic.alert({type: (res.sStatus == 'OK' ? 'success' : 'danger'), icon: (res.sStatus == 'OK' ? 'check' : 'warning'), message: res.sMessage, container: tableWrapper, place: 'prepend'});
                            } 
                            if (res.sStatus) {
                                if (tableOptions.resetGroupActionInputOnSuccess) {
                                    $('.table-group-action-input', tableWrapper).val("");
                                }
                            }
                            if ($('.group-checkable', table).size() === 1) {
                                $('.group-checkable', table).attr("checked", false);
                                $.uniform.update($('.group-checkable', table));
                            }
                            if (tableOptions.onSuccess) {
                                tableOptions.onSuccess.call(undefined, the);
                            }
                            fnCallback(res, textStatus, jqXHR);
                        },
                        "error": function() {
                            if (tableOptions.onError) {
                                tableOptions.onError.call(undefined, the);
                            }
                            Metronic.alert({type: 'danger', icon: 'warning', message: tableOptions.dataTable.oLanguage.sAjaxRequestGeneralError, container: tableWrapper, place: 'prepend'});
                            $('.dataTables_processing', tableWrapper).remove();
                        }
                      } );
                    },

                    // pass additional parameter
                    "fnServerParams": function ( aoData ) {
                        //here can be added an external ajax request parameters.
                        for(var i in ajaxParams) {
                            var param = ajaxParams[i];
                            aoData.push({"name" : param.name, "value": param.value});
                        }
                    },
                   
                    "fnDrawCallback": function( oSettings ) { // run some code on table redraw
                        if (tableInitialized === false) { // check if table has been initialized
                            tableInitialized = true; // set table initialized
                            table.show(); // display table
                        }
                        Metronic.initUniform($('input[type="checkbox"]', table));  // reinitialize uniform checkboxes on each table reload
                        countSelectedRecords(); // reset selected records indicator
                    }
                }
            }, options);

            tableOptions = options;
                       
            // create table's jquery object
            table = $(options.src);
            tableContainer = table.parents(".table-container");

            // apply the special class that used to restyle the default datatable
            $.fn.dataTableExt.oStdClasses.sWrapper = $.fn.dataTableExt.oStdClasses.sWrapper + " dataTables_extended_wrapper";

            // initialize a datatable
            dataTable = table.dataTable(options.dataTable);
    
            tableWrapper = table.parents('.dataTables_wrapper');

            // modify table per page dropdown input by appliying some classes
            $('.dataTables_length select', tableWrapper).addClass("form-control input-xsmall input-sm");

            // build table group actions panel
            if ($('.table-actions-wrapper', tableContainer).size() === 1) {
                $('.table-group-actions', tableWrapper).html($('.table-actions-wrapper', tableContainer).html()); // place the panel inside the wrapper
                $('.table-actions-wrapper', tableContainer).remove(); // remove the template container
            }
            // handle group checkboxes check/uncheck
            $('.group-checkable', table).change(function () {
                var set = $('tbody > tr > td:nth-child(1) input[type="checkbox"]', table);
                var checked = $(this).is(":checked");
                $(set).each(function () {
                    $(this).attr("checked", checked);
                });
                $.uniform.update(set);
                countSelectedRecords();
            });

            // handle row's checkbox click
            table.on('change', 'tbody > tr > td:nth-child(1) input[type="checkbox"]', function(){
                countSelectedRecords();
            });

            // handle filter submit button click
            table.on('click', '.filter-submit', function(e){
                e.preventDefault();

                the.addAjaxParam("sAction", tableOptions.filterApplyAction);

                // get all typeable inputs
                $('textarea.form-filter, select.form-filter, input.form-filter:not([type="radio"],[type="checkbox"])', table).each(function(){
                    the.addAjaxParam($(this).attr("name"), $(this).val());
                });

                // get all checkable inputs
                $('input.form-filter[type="checkbox"]:checked, input.form-filter[type="radio"]:checked', table).each(function(){
                    the.addAjaxParam($(this).attr("name"), $(this).val());
                });
                
                dataTable.fnDraw();
            });

            // handle filter cancel button click
            table.on('click', '.filter-cancel', function(e){
                e.preventDefault();
                $('textarea.form-filter, select.form-filter, input.form-filter', table).each(function(){
                    $(this).val("");
                });
                $('input.form-filter[type="checkbox"]', table).each(function(){
                    $(this).attr("checked", false);
                });                 
                the.clearAjaxParams();              
                the.addAjaxParam("sAction", tableOptions.filterCancelAction);
                dataTable.fnDraw();
            });
        },

        getSelectedRowsCount: function() {
            return $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table).size();
        },

        getSelectedRows: function() {
            var rows = [];
            $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table).each(function(){
                rows.push({name: $(this).attr("name"), value: $(this).val()});
            });

            return rows;
        },

        addAjaxParam: function(name, value) {
           ajaxParams.push({"name": name, "value": value});
        },

        clearAjaxParams: function(name, value) {
           ajaxParams = [];
        },

        getDataTable: function() {
            return dataTable;
        },

        getTableWrapper: function() {
            return tableWrapper;
        }, 

        gettableContainer: function() {
            return tableContainer;
        }, 

        getTable: function() {
            return table;
        }        

    };

};