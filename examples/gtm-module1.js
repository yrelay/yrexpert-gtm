/*

!----------------------------------------------------------------------------!
!                                                                            !
! YRexpert : (Your Yrelay) Système Expert sous Mumps GT.M et GNU/Linux       !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

module.exports = function() {

  this.on('dbOpened', function(status) {
    console.log('GT.M was opened by worker ' + process.pid + ': status = ' + JSON.stringify(status));
  });

  this.on('start', function(isFirst) {
    var connectGTMTo = require('yrexpert-gtm');
    connectGTMTo(this, true);

    if (isFirst) {
      var log = new this.documentStore.DocumentNode('ewdTestLog');
      log.delete();
    }
  });

  this.on('message', function(messageObj, send, finished) {
    
    var results = {
      youSent: messageObj,
      workerSent: 'hello from worker ' + process.pid,
      time: new Date().toString()
    };
    var log = new this.documentStore.DocumentNode('ewdTestLog');
    var ix = log.increment();
    log.$(ix).setDocument(results);
    finished(results);
  });

  this.on('stop', function() {
    console.log('Connection to GT.M closed');
  });
  
};
