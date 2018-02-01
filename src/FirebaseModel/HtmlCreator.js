var admin = require('firebase-admin');
var async = require('async');
var firebase = require('firebase');
var fs = require('fs');
var _ = require('lodash');

module.exports.HtmlPageCreator = function HtmlPageCreator(HtmlpageData) {

    var count = 0;
    var data = HtmlpageData;
    for (var i = 0; i < data.length; i++) {
        if (count == 0 && data[i].File == "jpg") {
            var PageName = data[i].Topic
            var Categoty = data[i].Category
            var Time = data[i].Date
            var URL = data[i].URL
            count++;
        }
        else { }
    }
    resDiv = "<div class='container-fluid'><div class='row fh5co-post-entry single-entry'>"
    resDiv += "<article class='col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12 col-xs-offset-0'>"
    resDiv += '<figure class="fadeInUp animated"><img src=' + URL + ' alt="Image" class="img-responsive" /></figure>'
    resDiv += "<span class='fh5co-meta'><a href='single.html'>" + Categoty + "</a></span>"
    resDiv += ' <h2 class="fh5co-article-title "><a href="single.html">' + PageName + '</a></h2>'
    resDiv += '<span class="fh5co-meta fh5co-date ">' + Time + '  (WHEN THE PAGE WAS CREATED)</span>'
    resDiv += '<div  class="col-lg-12 col-lg-offset-0 col-md-12 col-md-offset-0 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-left content-article">'
    var uniqueLocation = _.uniqBy(data, 'Location');
    console.log('unique location', uniqueLocation)
    for (var j = 0; j < data.length; j++) {

        for (var t = 0; t < uniqueLocation.length; t++) {
            if (uniqueLocation[t].Location == data[j].Location) {
                resDiv += '<div class="row">' + data[j].Location + '</div>'
                uniqueLocation.splice(t, 1);
            }
        }

        if (data[j].File == 'jpg') {
            resDiv += '<div class="row rp-b"><div class="col-lg-6 col-md-12"><figure>'
            resDiv += "<img class='img-responsive' src=" + data[j].URL + ">"
            resDiv += '</div><figure>'
            resDiv += '<h3>' + data[j].Subtopic + '</h3><h4>' + data[j].Time + '</h4>'
            resDiv += '</div>'
        }
        else {
            resDiv += '<div class="col-lg-12 cp-r animate-box">'
            resDiv += '<h3>' + data[j].Subtopic + '</h3>'
            resDiv += '<h4>' + data[j].Time + '</h4>'
            resDiv += '<div class="modal-body mb-0 p-0"><div style="padding-bottom: 94px !important;" class="embed-responsive embed-responsive-16by9 z-depth-1-half"> <iframe class="embed-responsive-item" src=' + data[j].URL + ' allowfullscreen></iframe></div>    </div>'
            resDiv += '</div>'
        }
    }
    resDiv += "</div></article></div></div>"
    var content = "<html ><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'><script src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>"
    content += " <link rel='stylesheet'hjn href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>"
    content += "<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js' ></script></head><body class=''>";
    content += "" + resDiv + "</body> </html>"
   
    return content;
}