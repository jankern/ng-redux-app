/*
 * NodeJS Dev/FE Web Server
 */

// Required Libs and Modules
var url = require('url');
var fs = require('fs');
var path = require('path');
var util = require('util');
var express = require('express');
var request = require('request');
var jf = require('jsonfile');
var bodyParser = require('body-parser');
var morgan = require('morgan');


// Initiate express credentials
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', process.env.PORT || 3001);
app.set('env', process.env.NODE_ENV || 'dev');
app.set('root', '../');
//app.use(morgan('combined'));

//app.use(express.static(path.join(__dirname, 'app')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({
    type: 'application/*+json'
}));

app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded()); // to support URL-encoded bodies

/**
 * Get command line parameters for
 * --port
 * --env
 * --root
 */

if (process.argv.length >= 2) {
    for(var i in process.argv){
        if(process.argv[i].indexOf("--port=") > -1){   
            app.set('port', process.argv[i].substr(process.argv[i].indexOf("--port=")+7));
        }
        if(process.argv[i].indexOf("--env=") > -1){
            app.set('env', process.argv[i].substr(process.argv[i].indexOf("--env=")+6));
        }
        if(process.argv[i].indexOf("--root=") > -1){
            app.set('root', process.argv[i].substr(process.argv[i].indexOf("--root=")+7));
        }
    }
}

// Routing for index.html and static css/js resources
app.use(express.static(app.get('root')));
// Specific routing / path masking from node_modules folder of FE app
app.use('/lib', express.static('../node_modules'));
// Specific routing for font sources on path /register
app.use('/register', express.static(app.get('root')));
app.use('/register/*', express.static(app.get('root')));

// Socket.io integration
io.on('connection', function(socket){
    console.info('-------------------- a user connected');
    socket.on('add-customer', function(customer) {
        console.log(customer.name+' is asking for permission .... we wait 5 seconds');
        setTimeout(function(){ 
            console.log('Ok, allow him to enter');
            io.emit('notification', {
            message: 'you can enter!',
            customer: customer
            });
        }, 5000);
      });
    
    // disconnected
    socket.on('disconnect', function(){
        console.log('-------------------- a user disconnected');
    });
});

/**
 * Endpoint for registration/add
 * Method: POST
 */

app.post('/oxseedint/register/services/rs.gui/add', function(req, res) {
    var reqObj = req.body;
    //console.info(reqObj);
    
    var errorType = ["userExistInCS", "userExistInMongoDB"];
    var randomString = errorType[Math.floor(Math.random() * 2)];
    
    setTimeout(function(){ 
        
            res.setHeader('Content-Type', 'application/json');
    
            res.status(200).send( JSON.stringify(
                {
                    "emailId": "<emailId>",
                    "tenantId": "<tenantId>",
                    "token": "initial-token",
                    "status": 1
                }
            ));

//            res.status(422).send( JSON.stringify(
//                {
//                    "success": false,
//                    "error": randomString,
//                    "emailId": "test@tester.de",
//                    "reqid": "<reqid>",
//                    "errorDetail": [
//                        {
//                            "param": "<param>",
//                            "error": "<error>"
//                        }
//                    ]
//                }
//            ));
    
    }, 2000);
    
});

/**
 * Endpoint for registration/confirm
 * Method: POST
 */

app.post('/oxseedint/register/services/rs.gui/confirm/', function(req, res) {
    var reqObj = req.body;
    console.info(reqObj);
    
    var errorType = ["codeInvalid", "tokenExpired", "mailIdInvalid", "tokenInvalid", "statusAlreadyConfirmed", "createTenantFailedInCS"];
    var randomString = errorType[Math.floor(Math.random() * 6)];

    setTimeout(function(){ 
        res.setHeader('Content-Type', 'application/json');
//        res.status(200).send(JSON.stringify(
//        {
//            "success": "true",
//            "emailId": "<emailId>",
//            "tenantId": "<tenantId>",
//            "code": "<code>", 
//            "token": "<token>"
//        }
//        ));
        res.status(422).send( JSON.stringify(
            {
                "success": false,
                "error": randomString,
                "reqid": "<reqid>",
                "errorDetail": [
                    {
                        "param": "<param>",
                        "error": "<error>"
                    }
                ]
            }
        ));
        
    }, 3000);
});

/**
 * Endpoint for registration/reconfirm
 * Method: POST
 */

app.post('/oxseedint/register/services/rs.gui/reconfirm/', function(req, res) {
    var reqObj = req.body;
    console.log(reqObj);

    var errorType = ["tokenExpired", "mailIdInvalid", "tokenInvalid", "alterUserExistInCS", "alterUserExistInMongoDB"];
    var randomString = errorType[Math.floor(Math.random() * 5)];
    
    var mailid = '';
    if(reqObj.options !== undefined){
        mailid = reqObj.options.mailId;
    }else{
        mailid = reqObj.id;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(
        {
            "success": "true",
            "emailId": mailid,
            "tenantId": "<tenantId>", 
            "token": "new-token"
        }
    ));
//    res.status(422).send( JSON.stringify(
//        {
//            "success": false,
//            "error": "tokenInValid",//randomString,
//            "reqid": "<reqid>",
//            "errorDetail": [
//                {
//                    "param": "<param>",
//                    "error": "<error>"
//                }
//            ]
//        }
//    ));
});

    
/**
 * Endpoint for registration/confirm
 * Method: POST
 */

app.get('/oxseedint/register/services/rs.gui/checkavailability/', function(req, res) {
    var reqObj = req.body;
    console.log('IN GET');
    console.info(reqObj);

    res.setHeader('Content-Type', 'application/json');
//    res.status(422).send( JSON.stringify(
//        {
//            "emailId": "test.user1@test.in",
//            "message": "userExistInMongoDB",
//            "success": false,
//            "status": "idOccupied"
//        }
//    ));
    res.status(200).send( JSON.stringify(
        {
            "emailId": "non.available@test.in",
            "success": true,
            "status": "idAvailable"
        }
    ));
});


/**
 * Default routes
 */

app.get([/\/kontakt|\/impressum|\/links-and-friends|\/karriere|\/test|\/test2|\/index.+$/], function(req, res) {

    var urlParamaterStr;
    var urlParamaterStr = req.url.split('/');
    console.log('IN GET');
    console.log(req.hostname);
    
    res.sendStatus(200);

});



/**
 *
 *
 */

//var loadFile = function(file) {
//
//    try {
//        var jsonString = jf.readFileSync(templateFile);
//        var menu = generateMenu(file);
//        jsonString['menu'] = menu;
//        // console.log(jsonString);
//        return jsonString;
//    } catch (err) {
//        // TODO wenn subpath existiert, zum nächstmöglichen file springen
//        jsonString = loadFile('fallback');
//    }
//};


http.listen(app.get('port'), '127.0.0.1', function() {
    console.log('IN GET');
    console.info('Server is running on port: ' + app.get('port') + ' *** Please browse to http://localhost:' + app.get('port') + ' for local use!');
});