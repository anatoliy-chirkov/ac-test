class DestinationForm {
    constructor() {
        $(".select2-destinations").select2({
            minimumInputLength: 2,
            width: '100%',
            placeholder: "Enter Destination",
            ajax: {
                url: '/geographical-targeting/ajax',
                dataType: 'json',
                type: "GET",
                quietMillis: 50,
                data: function (term) {
                    return {
                        query: term
                    };
                },
                processResults: function (data) {
                    return {
                        results: $.map(data, function (item) {
                            return {
                                text: item.name,
                                id: item.id
                            }
                        })
                    };
                }
            }
        });
    }

    validate() {
        var hasErrors = false;
        var destination = $('.form-destination').find("select[name='destination[]']");

        if (destination.find('option').length === 0) {
            if (destination.parent().find('.parsley-errors-list').length === 0) {
                var select2 = destination.next();
                select2.after('<ul class="parsley-errors-list filled"><li class="parsley-required">This value is required.</li></ul>');
                select2.on('change', function () {
                    $(this).next().remove();
                });
            }
            hasErrors = true;
        }

        return !hasErrors;
    }

    save(tourId, next) {
        this.destination = $('.form-destination');

        $.post('/tour/'+tourId+'/update/destination', this.destination.serialize(), function (response) {
            if (response.errors.length !== 0) {
                alert('Error on save geographical targeting');
            } else {
                next();
            }
        });
    }
}
