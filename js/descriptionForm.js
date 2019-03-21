class DescriptionForm {
    constructor() {
        this.deletedDescriptions = [];
        var object = this;
        //App.textEditors();
        $('.editor1').summernote({
            height: 500
        });

        $('.note-insert').find('button[aria-label="Link (⌘+K)"]').remove();

        // action: add new tab
        $('#tab-add-new').on('click', function () {
            var number = 1;
            $('#description-tabs').children().map(function () {
                if (parseInt(number) < parseInt($(this).attr('number'))) {
                    number = $(this).attr('number');
                }
            });
            $('#tab_'+number+'_link').parent().after('<li class="nav-item"><a class="nav-link" id="tab_'+(parseInt(number)+1)+'_link" href="#tab_'+(parseInt(number)+1)+'" data-toggle="tab" role="tab">Tab</a></li>');
            $('#tab_'+number).after('<div class="tab-pane" id="tab_'+(parseInt(number)+1)+'" number="'+(parseInt(number)+1)+'" role="tabpanel"><div style="margin-bottom:20px;display:table;cursor:pointer" class="icon description-delete"><span style="font-size:18px;margin-right:3px" class="mdi mdi-delete"></span> Delete Tab</div><form class="description-form" new="1"><div class="form-group"><input class="form-control tab-name" name="name" placeholder="Tab Name"></div><textarea name="content" class="editor1"></textarea></form></div>');
            App.textEditors();
        });
        // action: delete tab
        $('body').on('click', 'div.description-delete', function () {
            var tabId = $(this).parent().attr('id');

            if ($(this).next('form').attr('description-id') !== undefined) {
                object.deletedDescriptions.push($(this).next('form').attr('description-id'));
            }

            $('#'+tabId+'_link').parent().prev().children().addClass('active');
            $('#'+tabId).prev().addClass('active');
            $('#'+tabId+'_link').parent().remove();
            $('#'+tabId).remove();
        });
        // action: change tab name
        $('body').on('keyup', 'input.tab-name', function () {
            var id = $(this).parent().parent().parent().attr('id');var val = $(this).val();
            $('#'+id+'_link').text(val);
            if (val == '') {
                $('#'+id+'_link').text('Tab');
            }
        });

        this.onChange();
    }

    onChange() {
        $('.description-form').find("input[name='name']").on('change', function () {
            $(this).parent().parent('.description-form').attr('changed', 1);
        });

        $('.description-form').find(".note-editor").find('.note-editable').on('DOMSubtreeModified', function () {
            $(this).parent().parent().parent('.description-form').attr('changed', 1);
        });
    }

    validate() {
        var hasErrors = false;
        var description = $('.description-form').find(".note-editor").find('.note-editable');

        if ((description.length > 1 && description.first().text() === '') || (description.length === 1 && description.text() === '')) {
            if (description.parent().find('.parsley-errors-list').length === 0) {
                description.parent().parent().after('<ul class="parsley-errors-list filled"><li class="parsley-required">This field is required.</li></ul>');
                description.on('DOMSubtreeModified', function () {
                    description.parent().parent().next('.parsley-errors-list').remove();
                });
            }
            hasErrors = true;
        }

        return !hasErrors;
    }

    save(tourId, next) {
        var descriptions = $('.description-form');

        this.deletedDescriptions.map(function (id) {
            $.get('/tour/delete/description/'+id);
        });

        descriptions.map(function () {
            var disabled = $(this).find(':input:disabled').removeAttr('disabled');
            var content = $(this).find('textarea[name="content"]');

            if (content.val() !== '') {
                var htmlData = $('<div>'+content.val().replace(/&amp;/g, '&').replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'")+'</div>');
                var links = htmlData.find('a');

                if (links.length !== 0) {
                    links.map(function () {
                        var text = $(this).text();
                        $(this).after(text);
                        $(this).remove();
                    });

                    content.val(htmlData.html());
                }

                if ($(this).attr('new') !== undefined) {
                    $.post('/tour/'+tourId+'/update/description', $(this).serialize(), function (response) {
                        if (response.errors.length !== 0) {
                            alert('Error on save descriptions');
                        }
                    });
                } else if ($(this).attr('changed') !== undefined && $(this).attr('description-id') !== undefined) {
                    $.post('/tour/'+tourId+'/update/description/'+$(this).attr('description-id'), $(this).serialize(), function (response) {
                        if (response.errors.length !== 0) {
                            alert('Error on save descriptions');
                        }
                    });
                }
            }

            disabled.attr('disabled', 'disabled');
        });

        next();
    }
}
