class GuideForm {
    constructor() {
        $(".select2-lang").select2();
    }

    save(tourId, next) {
        this.languages = $('.form-languages');

        $.post('/tour/'+tourId+'/update/language', this.languages.serialize(), function(response) {
            if (response.errors.length !== 0) {
                alert('Error on save guide data');
            } else {
                next();
            }
        });
    }
}
