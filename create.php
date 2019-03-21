<div class="main-content container-fluid">
    <div class="row">
    <div class="col-lg-6">
        <div class="card">
            <div class="card-header">General Data<span class="card-subtitle"></span></div>
            <div class="card-body">
                <form action="/tours/create" id="form-general">
                    <div class="form-group">
                        <div>
                            <label>Enabled</label>
                        </div>
                        <div class="switch-button">
                            <input name="enabled" type="checkbox" id="swt1">
                            <span>
                                <label for="swt1"></label>
                            </span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Name*</label>
                        <input name="name" class="form-control" placeholder="Tour name" required>
                    </div>
                    <div class="form-group">
                        <label>Short Description</label>
                        <textarea name="short_description" class="form-control"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Page*</label>
                        <input name="tour_page" class="form-control" placeholder="Tour page URL" required>
                    </div>

                    {%if showCompanies%}
                        <div class="form-group">
                            <label>Company*</label>
                            <select name="travel_company_id" class="form-control select2-company" required>
                                {% for company in companies %}
                                <option value="{{company.id}}">{{company.name}}</option>
                                {% endfor %}
                            </select>
                        </div>
                    {%else%}
                        <input name="travel_company_id" value="{{companyId}}" hidden>
                    {%endif%}

                    <div class="form-group">
                        <label>Type*</label>
                        <select name="tour_type_id" class="select2-type form-control">
                            {% for type in tourTypes %}
                            <option icon-src="{{type.iconReference}}" id="type{{type.id}}" value="{{type.id}}">{{type.name}}</option>
                            {% endfor %}
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Duration</label>
                        <input name="duration" class="form-control" type="number" placeholder="Number of days">
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-6">
                                <label>Period Start</label>
                                <div class="input-group date datetimepicker" data-min-view="2" data-date-format="yyyy-mm-dd">
                                    <input name="period_start" class="form-control" size="16" placeholder="Start at">
                                    <div class="input-group-append">
                                        <button class="btn btn-primary"><i class="icon-th mdi mdi-calendar"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <label>Period End</label>
                                <div class="input-group date datetimepicker" data-min-view="2" data-date-format="yyyy-mm-dd">
                                    <input name="period_end" class="form-control" size="16" placeholder="End at">
                                    <div class="input-group-append">
                                        <button class="btn btn-primary"><i class="icon-th mdi mdi-calendar"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Group size</label>
                        <div class="row">
                            <div class="col-6">
                                <input name="group_size_min" class="form-control" placeholder="Min">
                            </div>
                            <div class="col-6">
                                <input name="group_size_max" class="form-control" placeholder="Max">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="row">
                            <div class="col-4">
                                <label>Price Min</label>
                                <input name="min_price" class="form-control" placeholder="Min">
                            </div>
                            <div class="col-4">
                                <label>Price Max</label>
                                <input name="max_price" class="form-control" placeholder="Max">
                            </div>
                            <div class="col-4">
                                <label>Currency*</label>
                                <select name="currency" class="form-control select2-currency" style="width:100%">
                                    {% for currency in currencies %}
                                    <option value="{{currency.alphabeticCode}}"
                                            {%if currency.alphabeticCode === 'USD'%}selected{%endif%}>
                                        {{currency.name}}
                                    </option>
                                    {% endfor %}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Route Complexity</label>
                        <select name="route_complexity" class="form-control">
                            <option value="1">Easy</option>
                            <option value="2">Easy-moderate</option>
                            <option value="3">Moderate</option>
                            <option value="4">Moderate-challenging</option>
                            <option value="5">Challenging</option>
                        </select>
                    </div>

                    <input name="map_file_id" hidden>
                    <input name="presentation_file_id" hidden>
                </form>
            </div>

            <div class="card-header">Geographical Targeting<span class="card-subtitle"></span></div>
            <div class="card-body">
                <form class="form-destination">
                    <div class="form-group">
                        <label>Destinations*</label>
                        <select name="destination[]" class="select2-destinations form-control" multiple=""></select>
                    </div>
                    <div class="form-group">
                        <label>Geo Tags</label>
                        <select name="tag[]" class="select2-destinations form-control" multiple=""></select>
                    </div>
                </form>
            </div>

            <div class="card-header">Guide Data<span class="card-subtitle"></span></div>
            <div class="card-body">
                <form class="form-languages">
                    <div class="form-group">
                        <label>Languages</label>
                        <select name="languages[]" multiple class="select2-lang form-control">
                            {% for lang in languages %}
                            <option value="{{lang.alphabeticCode}}">{{lang.name}}</option>
                            {% endfor %}
                        </select>
                    </div>
                </form>
            </div>

            <div class="card-header">Additional Files<span class="card-subtitle"></span></div>
            <div class="card-body">
                <div class="form-group">
                    <label style="margin-bottom: 0">Map File</label><br>
                    <label style="color: #707070;font-size: 1rem;font-weight: 300">Map image with route points</label>
                    <br>
                    <input type="file" name="map_file" class="inputfile" id="map-file" data-multiple-caption="{count} files selected">
                    <label class="btn-primary" for="map-file"> <i class="mdi mdi-upload"></i><span>Browse files...</span></label>
                </div>
                <div class="form-group">
                    <label style="margin-bottom: 0">Presentation File</label><br>
                    <label style="color: #707070;font-size: 1rem;font-weight: 300">File with presentation content for your tour</label>
                    <br>
                    <input type="file" name="presentation_file" class="inputfile" id="presentation-file" data-multiple-caption="{count} files selected">
                    <label class="btn-primary" for="presentation-file"> <i class="mdi mdi-upload"></i><span>Browse files...</span></label>
                </div>
            </div>

            <div class="card-header">Videos <span class="card-subtitle">Links to Youtube videos are used</span></div>
            <div class="card-body">
                <div class="tour-video"></div>
                <div class="tour-add-video btn btn-primary">Add video</div>
            </div>

        </div>
    </div>
    <div class="col-lg-6">
        <div class="card-header">Images*</div>
        <div class="dropzone-previews">
            <div class="create-tour-media card-body"></div>
        </div>
        <div class="card-body">
            <form class="custom-dropzone" id="my-awesome-dropzone" action="/assets/lib/dropzone/upload.php">
                <div class="dz-message">
                    <div class="icon"><span class="mdi mdi-cloud-upload"></span></div>
                    <h2>Drag and Drop files here</h2><span class="note">Actual formats for images: .jpg, .jpeg, .png, .jp2</span>
                    <div class="dropzone-mobile-trigger needsclick"></div>
                </div>
            </form>
        </div>

        <!--<div class="card-header">Meta Tags<span class="card-subtitle">How tours will be shown in Google</span></div>-->
        <!--<div class="card-body">-->
            <!--<form class="form-meta">-->
                <!--<div class="form-group">-->
                    <!--<label>Title</label>-->
                    <!--<input name="title" class="form-control">-->
                <!--</div>-->
                <!--<div class="form-group">-->
                    <!--<label>Description</label>-->
                    <!--<input name="description" class="form-control">-->
                <!--</div>-->
            <!--</form>-->
        <!--</div>-->

        <div class="card-header">Descriptions*<span class="card-subtitle">Please do not insert links</span></div>
        <div class="card-body">
            <div class="tab-container">
                <ul class="nav nav-tabs nav-tabs-dark nav-tabs-classic" role="tablist">
                    <li class="nav-item"><a class="nav-link active" id="tab_1_link" href="#tab_1" data-toggle="tab" role="tab">Overview</a></li>
                    <li class="nav-item"><a class="nav-link" id="tab_2_link" href="#tab_2" data-toggle="tab" role="tab">Itinerary</a></li>
                    <li class="nav-item"><a class="nav-link" id="tab_3_link" href="#tab_3" data-toggle="tab" role="tab">Included / Not Included</a></li>
                    <li class="nav-item"><a class="nav-link" id="tab-add-new">Add New</a></li>
                </ul>
                <div class="tab-content" id="description-tabs">
                    <div class="tab-pane active" id="tab_1" number="1" role="tabpanel">
                        <form class="description-form" new="1">
                            <div class="form-group">
                                <input class="form-control tab-name" name="name" placeholder="Tab Name" value="Overview" disabled>
                            </div>
                            <textarea name="content" class="editor1"></textarea>
                        </form>
                    </div>

                    <div class="tab-pane" id="tab_2" number="2" role="tabpanel">
                        <form class="description-form" new="1">
                            <div class="form-group">
                                <input class="form-control tab-name" name="name" placeholder="Tab Name" value="Itinerary" disabled>
                            </div>
                            <textarea name="content" class="editor1"></textarea>
                        </form>
                    </div>

                    <div class="tab-pane" id="tab_3" number="3" role="tabpanel">
                        <form class="description-form" new="1">
                            <div class="form-group">
                                <input class="form-control tab-name" name="name" placeholder="Tab Name" value="Included / Not Included" disabled>
                            </div>
                            <textarea name="content" class="editor1"></textarea>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 tour-mobile-save">
        <div class="card-body">
            <button class="tour-save btn btn-space btn-success btn-lg"><i class="icon icon-left mdi mdi-cloud-upload"></i>Save this tour</button>
        </div>
    </div>
    </div>
</div>
<!-- <script src="/assets/lib/jquery/jquery.min.js" type="text/javascript"></script>
<script src="/assets/lib/perfect-scrollbar/js/perfect-scrollbar.min.js" type="text/javascript"></script>
<script src="/assets/lib/bootstrap/dist/js/bootstrap.bundle.min.js" type="text/javascript"></script>
<script src="/assets/js/app.js" type="text/javascript"></script>
<script src="/assets/lib/fuelux/js/wizard.js" type="text/javascript"></script>
<script src="/assets/lib/select2/js/select2.min.js" type="text/javascript"></script>
<script src="/assets/lib/select2/js/select2.full.min.js" type="text/javascript"></script>
<script src="/assets/lib/bootstrap-slider/bootstrap-slider.min.js" type="text/javascript"></script>
<script src="/assets/lib/datetimepicker/js/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="/assets/lib/moment.js/min/moment.min.js" type="text/javascript"></script>
<script src="/assets/js/app-form-wizard.js" type="text/javascript"></script>
<script src="/assets/js/app-form-elements.js" type="text/javascript"></script>
<script src="/assets/lib/summernote/summernote-bs4.min.js" type="text/javascript"></script>
<script src="/assets/lib/summernote/summernote-ext-beagle.js" type="text/javascript"></script>
<script src="/assets/js/app-form-wysiwyg.js" type="text/javascript"></script>
<script src="/assets/lib/dropzone/dropzone.js" type="text/javascript"></script>
<script src="/assets/lib/ion-rangeslider/js/ion.rangeSlider.js" type="text/javascript"></script>

<script src="/assets/lib/parsley/parsley.min.js" type="text/javascript"></script>

<script src="/assets/lib/mprogress/js/mprogress.min.js" type="text/javascript"></script>
<script src="/assets/lib/prettify/prettify.js" type="text/javascript"></script>
<script src="/assets/js/app-ajax-loader.js" type="text/javascript"></script> -->

<script src="/js/generalForm.js" type="text/javascript"></script>
<script src="/js/descriptionForm.js" type="text/javascript"></script>
<script src="/js/imageForm.js" type="text/javascript"></script>
<script src="/js/guideForm.js" type="text/javascript"></script>
<script src="/js/destinationForm.js" type="text/javascript"></script>
<script src="/js/videoForm.js" type="text/javascript"></script>

<script type="text/javascript">
    $(document).ready(function(){
        App.init();
        App.formElements();

        var generalForm = new GeneralForm;
        var imageForm = new ImageForm;
        var descriptionForm = new DescriptionForm;
        var guideForm = new GuideForm;
        var destinationForm = new DestinationForm;
        var videoForm = new VideoForm;

        function validate() {
            var isOk = true;

            var generalValid = generalForm.validate();
            var imageValid = imageForm.validate();
            var descriptionValid = descriptionForm.validate();
            var destinationValid = destinationForm.validate();

            if (!generalValid || !imageValid || !descriptionValid || !destinationValid) {
                isOk = false;
            }

            return isOk;
        }

        function save() {
            var mprogress = new Mprogress();
            mprogress.start();

            generalForm.save(function(response) {
                var tourId = response.id;

                imageForm.save(tourId, function() {
                    descriptionForm.save(tourId, function() {
                        destinationForm.save(tourId, function() {
                            guideForm.save(tourId, function() {
                                videoForm.save(tourId, function() {
                                    setTimeout(function (mprogress) {
                                        mprogress.end();
                                        window.location.href = "/tours";
                                    }, 500, mprogress);
                                });
                            });
                        });
                    });
                });
            });
        }

        $('.tour-save').on('click', function () {
            if (!validate()) {
                return;
            }

            save();
        });

    });
</script>
