/*

!----------------------------------------------------------------------------!
!                                                                            !
! YRexpert : (Your Yrelay) Système Expert sous Mumps GT.M et GNU/Linux       !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

   Ce module optionnel vous permet de définir l'environnement correct
   Pour votre système GT.M. Si vous avez déjà créé ce via
   Votre profil, vous pouvez ignorer ce module.

   Remplacez les paramètres par défaut en utilisant l'argument objet params.
   Vous pouvez définir vos propres valeurs pour tout ou partie des éléments suivants
   Variables d'environnement GT.M:

   gtmdir,
   gtmver,
   gtmdist,
   gtmgbldir,
   gtmroutines,
   GTMCI,
   GTM_REPLICATION

*/

var fs = require('fs');
var os = require('os');

module.exports = function(params) {

  params = params || {};

  var home = process.env.HOME;
  //var gtmdir = params.gtmdir || home + '/.fis-gtm';
  var gtmdir = params.gtmdir || home + '/partitions/yxp';
  var gtmver = params.gtmver || fs.readdirSync(gtmdir)[0];
  var gtmroot = gtmdir + '/' + gtmver;
  //var gtmver2 = fs.readdirSync('/usr/lib/fis-gtm')[0];
  //var gtmdist = params.gtmdist || '/usr/lib/fis-gtm/' + gtmver2;
  // Déterminer l'architecture du processeur - utilisé pour déterminer si nous pouvons utiliser GT.M
  var arch = os.arch()
  if (arch == "x64") {
      gtm_arch="x86_64";
  } else {
      gtm_arch="i386";
  } 
  var gtmver2 = fs.readdirSync('/usr/lib/' + gtm_arch + '-linux-gnu/fis-gtm')[0];
  //process.env['gtm_dist'] = '/home/yrelay/libraries/gtm';
  var gtmdist = '/usr/lib/' + gtm_arch + '-linux-gnu/fis-gtm/' + gtmver2;
  var gtmrep = params['GTM_REPLICATION'] || 'off';

  process.env['GTM_REPLICATION'] = gtmrep;
  process.env['gtmdir'] = gtmdir;
  process.env['gtmver'] = gtmver;
  process.env['gtm_dist'] = gtmdist;
  process.env['GTMCI'] = params.GTMCI || process.cwd() + '/node_modules/nodem/resources/nodem.ci';
  //process.env['gtmgbldir'] = params.gtmgbldir || gtmroot + '/g/gtm.gld';
  process.env['gtmgbldir'] = params.gtmgbldir || gtmdir + '/globals/YXP.gld';
  var gr = home + '/p/' + gtmver2 + '(' + home + '/p) ' + home + '/s/' + gtmver2 + '(' + home + '/s) ' + home + '/routines/' + gtmver2 + '(' + home + '/routines)';
  if (params.gtmroutines) {
    process.env['gtmroutines'] = params.gtmroutines;
  }
  else {
    //var gr = gtmroot + '/o(' + gtmroot + '/r ' + gtmdir + '/r)';
    gr = gr + ' ' + home + '/libraries/gtm';
    if (os.arch() !== 'ia32') gr = gr + ' ' + gtmdist + '/libgtmutil.so';
    process.env['gtmroutines'] = gr + ' ' + gtmdist + ' ' + process.cwd() + '/node_modules/nodem/src';
  }
  process.env['gtm_log'] = home + '/log';
  process.env['gtm_tmp'] = home + '/tmp';
  process.env['gtm_prompt'] = 'YXP>';
  process.env['gtm_zinterrupt'] = 'I $$JOBEXAM^ZU($ZPOSITION)';
  process.env['gtm_lvnullsubs'] = '2';
  process.env['PATH'] = process.env['PATH'] + ':' + gtmdist;
};





