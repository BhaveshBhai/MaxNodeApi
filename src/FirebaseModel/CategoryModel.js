var exports = require('../dist/FirebaseClient');
var FirebaseClient = exports.default;

var keyFilename = "./src/captoore-firebase-adminsdk-qkvs2-309af7e476.json";
var client = new FirebaseClient('https://cate-c7924.firebaseio.com/',{ auth: '4B9YPJOrs20quLBHVWvvw0NeXeunRjERY7TEWqa2' });

var nock = require('nock')
var admin = require('firebase-admin');
var async = require('async');
var firebase = require('firebase');
var storage = require('@google-cloud/storage');



//Image
var storage = require('@google-cloud/storage');
var keyFilename = "./src/captoore-firebase-adminsdk-qkvs2-309af7e476.json";
var URL = '';
const projectId = "cate-c7924" //replace with your project id
const bucketName = `${projectId}.appspot.com`;
const gcs = require('@google-cloud/storage')({ projectId,keyFilename});
const bucket = gcs.bucket(bucketName);

//Get all Data
module.exports.GetTopicDataAll = function GetTopics() {
    var Result = client.get('diary')
        .then(res => res.json(res))
        .then(json => {
            return json;
        })
        .catch(function (error) {

            return error;
        });
    return Result;
}


//Get topic wise data
module.exports.GetTopicData = function GetTopicData(TopicName) {
    var Result = client.get('diary/' + TopicName)
        .then(res => res.json(res))
        .then(json => {

            return json;
        })
        .catch(function (error) {
            return error;
        });

    return Result;
}

//Dawnload image url
module.exports.GetImageData =async function GetImageData(TopicData) {
    var urlWithTopicData = [];
    async.forEachOf(TopicData, function (item, key, callback) {
        var topic = key;
        if (item.active == undefined) {
            var Active = "NO";
        } else {
            var Active = item.active;
        }
        async.forEach(item, function (subtopic, callback) {
            var fileName = subtopic.URL
            var newfile = subtopic.URL;
            if (newfile != undefined) {
                const file = bucket.file(newfile);
                var a = file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then(signedUrls => {
                    var ImageArray = {
                        Topic: topic,
                        URL: signedUrls[0],
                        Category: item.category,
                        Date: subtopic.Date,
                        File: subtopic.File,
                        Location: subtopic.Location,
                        Subtopic: subtopic.Subtopic,
                        Time: subtopic.Time,
                        categoryActive: Active
                    }
                    urlWithTopicData.push(ImageArray)
                });
            }
            else { }
            //
        })
    }, function (err) {
        if (err) { throw err; }
        console.log("processing all elements completed");
    });
    var result = await resolveAfter2Seconds();
    return urlWithTopicData
}

// 1 sec wait
function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 1000);
    });
}
