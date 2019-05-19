var ComponentsNoUiSliders = function () {

    return {
        //main function to initiate the module
        init: function () {

            // slider 

            $('#slider_0').noUiSlider({
                direction: (Metronic.isRTL() ? "rtl" : "ltr"),
                start: 40,
                connect: "lower",
                range: {
                    'min': 0,
                    'max': 100
                }
            });

            // slider 1
            $("#slider_1").noUiSlider({
                direction: (Metronic.isRTL() ? "rtl" : "ltr"),
                start: [20, 80],
                range: {
                    min: 0,
                    max: 100
                },
                connect: true,
                handles: 2
            });

            // slider 2
            $('#slider_2').noUiSlider({
                direction: (Metronic.isRTL() ? "rtl" : "ltr"),
                range: {
                    min: -20,
                    max: 40
                },
                start: [10, 30],
                handles: 2,
                connect: true,
                step: 1,
                serialization: {
                    lower: [
                        $.Link({
                            target: $("#slider_2_input_start"),
                            method: "val"
                        })
                    ],
                    upper: [
                        $.Link({
                            target: $("#slider_2_input_end"),
                            method: "val"
                        })
                    ]
                }

            });

            // slider 3
            $("#slider_3").noUiSlider({
                direction: (Metronic.isRTL() ? "rtl" : "ltr"),
                start: [20, 80],
                range: {
                    min: 0,
                    max: 100
                },
                connect: true,
                handles: 2
            });

            $("#slider_3_checkbox").change(function () {
                // If the checkbox is checked
                if ($(this).is(":checked")) {
                    // Disable the slider
                    $("#slider_3").attr("disabled", "disabled");
                } else {
                    // Enabled the slider
                    $("#slider_3").removeAttr("disabled");
                }
            });

            // slider 4
            $("#slider_4").noUiSlider({
                direction: (Metronic.isRTL() ? "rtl" : "ltr"),
                start: [20, 80],
                range: {
                    min: 0,
                    max: 100
                },
                connect: true,
                handles: 2
            });

            $("#slider_4_btn").click(function () {
                alert($("#slider_4").val());
            });
        }

    };

}();