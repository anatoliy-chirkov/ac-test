class GeneralForm {
    constructor() {
        this.form = $('#form-general');
        this.deletedMapFile = null;
        this.deletedPresentationFile = null;
        var object = this;

        $(".select2-type").select2({templateResult: this.tourTypeState});
        $(".select2-company").select2();
        $(".select2-currency").select2();

        $(".js-range-slider").ionRangeSlider({
            skin: 'flat',
            grid: true,
            from: $('.js-range-slider').val(),
            values: [
                'Easy', 'Easy-moderate', 'Moderate', 'Moderate-challenging', 'Challenging'
            ]
        });

        $('.tour-file').on('mouseenter', function() {
            var previewHeight = $(this).find('.tour-file-preview').css('height');
            var previewWidth = $(this).find('.tour-file-preview').css('width');

            $(this).find('.tour-file-actions').css('height', previewHeight);
            $(this).find('.tour-file-actions').css('width', previewWidth);

            $(this).find('.tour-file-preview').css('display', 'none');
            $(this).find('.tour-file-actions').css('display', 'table');
        });
        $('.tour-file').on('mouseleave', function() {
            $(this).find('.tour-file-actions').css('display', 'none');
            $(this).find('.tour-file-preview').css('display', 'block');
        });

        $('.map-file-delete').on('click', function() {
            object.deletedMapFile = $(this).attr('media-id');
            $(this).parent().parent().parent().remove();
        });

        $('.presentation-file-delete').on('click', function() {
            object.deletedPresentationFile = $(this).attr('media-id');
            $(this).parent().parent().parent().remove();
        });
    }

    validate() {
        var hasErrors = false;
        var name = this.form.find("input[name='name']");
        var tourPage = this.form.find("input[name='tour_page']");

        if (name.val() === '') {
            if (name.parent().find('.parsley-errors-list').length === 0) {
                name.after('<ul class="parsley-errors-list filled"><li class="parsley-required">This value is required.</li></ul>');
                name.on('change', function () {
                    name.next().remove();
                });
            }
            hasErrors = true;
        }

        if (tourPage.val() === '') {
            if (tourPage.parent().find('.parsley-errors-list').length === 0) {
                tourPage.after('<ul class="parsley-errors-list filled"><li class="parsley-required">This value is required.</li></ul>');
                tourPage.on('change', function () {
                    tourPage.next().remove();
                });
            }
            hasErrors = true;
        }

        return !hasErrors;
    }

    sendForm(next) {
        $.post(this.form.attr('action'), this.form.serialize(), function(response) {
            if (response.errors.length !== 0) {
                alert('Error on save general form');
            } else {
                next(response);
            }
        });
    }

    savePresentationFile() {
        var object = this;
        var presentationFiles = $('input#presentation-file').prop('files');
        var mediaId = this.form.find('input[name="presentation_file_id"]').val();

        if (object.deletedPresentationFile !== null) {
            $.get('/media/delete/' + object.deletedPresentationFile);
            object.form.find('input[name="presentation_file_id"]').val(null);
        }

        if (presentationFiles.length !== 0 && (mediaId !== '' && mediaId !== null)) {
            $.get('/media/delete/' + mediaId);
        }

        if (presentationFiles.length !== 0) {
            var presentationFd = new FormData;
            presentationFd.append('logo', presentationFiles[0]);

            $.ajax({
                url: '/media/tourFilePresentation/save',
                data: presentationFd,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(response) {
                    object.form.find('input[name="presentation_file_id"]').val(JSON.parse(response).id);
                }
            });
        }
    }

    saveMapFile() {
        var object = this;
        var mapFiles = $('input#map-file').prop('files');
        var mediaId = this.form.find('input[name="map_file_id"]').val();

        if (object.deletedMapFile !== null) {
            $.get('/media/delete/' + object.deletedMapFile);
            object.form.find('input[name="map_file_id"]').val(null);
        }

        if (mapFiles.length !== 0 && (mediaId !== '' && mediaId !== null)) {
            $.get('/media/delete/' + mediaId);
        }

        if (mapFiles.length !== 0) {
            var mapFd = new FormData;
            mapFd.append('logo', mapFiles[0]);

            $.ajax({
                url: '/media/tourFileMap/save',
                data: mapFd,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(response) {
                    object.form.find('input[name="map_file_id"]').val(JSON.parse(response).id);
                }
            });
        }
    }

    save(next) {
        this.saveMapFile();
        this.savePresentationFile();

        var form = this.form;

        setTimeout(function (form) {
            $.post(form.attr('action'), form.serialize(), function(response) {
                if (response.errors.length !== 0) {
                    alert('Error on save general form');
                } else {
                    next(response);
                }
            });
        }, 1000, form);
    }

    tourTypeState(state) {
        if (!state.id) {return state.text;}
        var baseUrl = "https://adventurecompass.com";
        var link = $('#type'+state.id).attr('icon-src');
        var $state = $('<span><img width="22" height="22" style="margin-right: 7px" src="'+ baseUrl + link +'" /> ' + state.text + '</span>');

        return $state;
    }
}
