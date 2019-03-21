class VideoForm {
    constructor() {
        var object = this;
        this.deletedVideosIds = [];
        $('.tour-add-video').on('click', function() {
            var block = $('.tour-video');
            block.append('<form class="form-video" new="1"><div class="input-group mb-3"><input class="form-control" name="src" placeholder="Link to Youtube video" type="text"><div class="input-group-append"><span class="input-group-text icon tour-video-delete"><icon class="mdi mdi-delete" style="font-size:16px;margin-right:5px"></icon> Delete</span></div></div></form>');
        });
        $('.tour-video').on('click', '.tour-video-delete', function() {
            var form = $(this).parent().parent().parent();

            if (form.attr('video-id') !== undefined) {
                object.deletedVideosIds.push(form.attr('video-id'));
            }

            form.remove();
        });
    }

    save(tourId, next) {
        var form = $('.form-video');

        this.deletedVideosIds.map(function(mediaId) {
            $.get('/tour/delete/video/'+ mediaId);
            $.get('/media/delete/' + mediaId);
        });

        if (form.length !== 0) {
            if (form.attr('new') !== undefined) {
                form.map(function() {
                    $.post('/video/save', $(this).serialize(), function(response) {
                        $.post('/tour/'+tourId+'/update/video', {'video_id': JSON.parse(response).id})
                    });
                });
            } else if (form.attr('changed') !== undefined) {
                $.get('/tour/delete/video/'+ form.attr('video-id'));
                $.get('/media/delete/' + form.attr('video-id'));

                form.map(function() {
                    $.post('/video/save', $(this).serialize(), function(response) {
                        $.post('/tour/'+tourId+'/update/video', {'video_id': JSON.parse(response).id})
                    });
                });
            }

            next();
        } else {
            next();
        }
    }
}
