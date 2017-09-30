/*

!----------------------------------------------------------------------------!
!                                                                            !
! YRexpert : (Your Yrelay) Système Expert sous Mumps GT.M et GNU/Linux       !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

var express = require('express');
var bodyParser = require('body-parser');
var qoper8 = require('ewd-qoper8');
var app = express();
app.use(bodyParser.json());

var q = new qoper8.masterProcess();

app.post('/qoper8', function (req, res) {
  q.handleMessage(req.body, function(response) {
    res.send(response);
  });
});

q.on('started', function() {
  this.worker.module = 'yrexpert-gtm/examples/gtm-module1';
  app.listen(8082);
});

q.start();

