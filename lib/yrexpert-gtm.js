/*

!----------------------------------------------------------------------------!
!                                                                            !
! YRexpert : (Your Yrelay) Système Expert sous Mumps GT.M et GNU/Linux       !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/

module.exports = function(worker, environment) {

  // Établir la connexion à la base de données GT.M

  if (environment) {
    var setEnvironment = require('./setEnvironment');
    if (environment === true) {
      setEnvironment();
    }
    else {
      setEnvironment(environment);
    }
  }
  var DocumentStore = require('ewd-document-store');
  var interface = require('nodem');
  worker.db = new interface.Gtm();

  var status = worker.db.open();

  worker.on('stop', function() {
    this.db.close();
    worker.emit('dbClosed');
  });

  worker.on('unexpectedError', function() {
    if (worker.db) {
      try {
        worker.db.close();
      }
      catch(err) {
        // Ignore - le processus s'arrêtera de toute façon
      }
    }
  });

  worker.emit('dbOpened', status);
  worker.documentStore = new DocumentStore(worker.db);
  worker.emit('DocumentStoreStarted');
};

