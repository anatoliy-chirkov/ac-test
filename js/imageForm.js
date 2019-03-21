class ImageForm {
    constructor() {
        this.imagesIds = [];
        this.deletedImagesIds = [];
        var object = this;

        var myDropzone = new Dropzone(".custom-dropzone", { url: "/media/tour/save"});
        myDropzone.on("success", function(file, response) {
            myDropzone.removeFile(file);
            var responseDecode = JSON.parse(response);
            var previewContainer = $('.create-tour-media');
            object.imagesIds.push(responseDecode.id);
            previewContainer.css('display', 'block');
            previewContainer.html(previewContainer.html() + '<div class="create-tour-media-item" style="background-image: url('+responseDecode.preview+')" media-id="'+responseDecode.id+'"><div class="mdi mdi-delete"></div><div>');
        });
        $('.create-tour-media').on('mouseenter', '.create-tour-media-item', function() {
            $(this).find('.mdi').css('display', 'block');
        });
        $('.create-tour-media').on('mouseleave', '.create-tour-media-item', function() {
            $(this).find('.mdi').css('display', 'none');
        });
        $('.create-tour-media').on('click', '.create-tour-media-item', function() {
            var mediaId = $(this).attr('media-id');
            $(this).remove();

            for(var i = 0; i < object.imagesIds.length-1; i++){
                if (object.imagesIds[i] == mediaId) {
                    object.imagesIds.splice(i, 1);
                    $.get('/media/delete/' + mediaId);

                    return;
                }
            }

            object.deletedImagesIds.push(mediaId);
        });
    }

    validate() {
        var hasErrors = false;
        var hasImages = this.imagesIds.length !== 0;
        var hasOtherImages = $('.create-tour-media-item').length !== 0;

        if (!hasImages && !hasOtherImages) {
            var media = $('.create-tour-media');
            if (media.find('.parsley-errors-list').length === 0) {
                media.css('display', 'block');
                media.html('<ul class="parsley-errors-list filled"><li class="parsley-required">Images is required.</li></ul>');
                $('.dropzone-mobile-trigger').on('mouseup', function() {
                    media.html('');
                });
            }
            hasErrors = true;
        }

        return !hasErrors;
    }

    save(tourId, next) {
        this.deletedImagesIds.map(function (mediaId) {
            $.get('/tour/delete/image/'+ mediaId);
            $.get('/media/delete/' + mediaId);
        });

        this.imagesIds.map(function (id) {
            $.post('/tour/'+tourId+'/update/image', {'image_id': id}, function (response) {
                if (response.errors.length !== 0) {
                    alert('Error on save image');
                }
            });
        });

        next();
    }
}
