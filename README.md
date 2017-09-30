# Intégrer des modules workers avec la base de données GT.M
 
Cette arborescence fournit un module vous permettant d'intégrer des modules workers avec la base de données GT.M. Elle est maintenue par Yrelay et diffusée sous licence libre. Cette version comprend des contributions communautaires libres acceptées par Yrelay.

Disclaimer : yrexpert est encore en développement et son interface peut changer dans les futures versions. Utilisez cette production à vos propres risques.

Ce dépot est fortement inspiré de l'application [EWD 3](http://www.mgateway.com/) de Rob Tweed (Merci).


## 1. yrexpert-gtm

Ce module peut être utilisé pour simplifier l'intégration de la base de données Open Source GT.M avec les modules de processus workers ewd-qoper8.
Il charge en outre le module ewd-document-store pour fournir une interface JavaScript très puissante et naturelle au moteur de base de données Global Storage sous-jacent au sein de GT.M.

## 2. Installer

       npm install yrexpert-gtm

Vous devez également installer le module d'interface de connexion Node.js pour GT.M :

       npm install nodem
	   
## 3. Utiliser yrexpert-gtm

Ce module doit être utilisé avec le gestionnaire d'événements de début de votre module de travail ewd-qoper8, par exemple:

      this.on('start', function(isFirst) {
        var connectGTMTo = require('yrexpert-gtm');
        connectGTMTo(this);
      });

This will open an in-process connection to a local GT.M database.

### 3.1. Définition de l'environnement correct pour GT.M

Vous devez vous assurer que les variables d'environnement correctes ont été créées pour GT.M. Généralement, cela se fait automatiquement via le fichier .profile ou similaire. Si tel est le cas, il suffit d'établir la connexion à GT.M, comme suit:

      connectGTMTo(this);

Cependant, vous pouvez éventuellement établir les variables d'environnement appropriées en utilisant une fonction intégrée dans ewd-qoper8-gtm que vous pouvez trouver dans le référentiel. Recherchez le fichier module /lib/setEnvironment.js

Vous verrez que cela créera un environnement par défaut, basé sur l'hypothèse que vous avez utilisé apt-get install fis-gtm pour installer GT.M. Si c'est ainsi que vous avez installé GT.M, il ya une bonne chance que les paramètres d'environnement par défaut que le module setEnvironment fonctionnera pour vous. Vous pouvez choisir d'utiliser et d'appliquer ces paramètres par défaut en etablissant la connexion à GT.M comme suit:

      connectGTMTo(this, true);

Si vous avez besoin de modifier les paramètres, vous pouvez le faire en les fournissant dans un objet que vous pouvez passer à la fonction connectGTMTo (). Vous pouvez spécifier une ou toutes les variables d'environnement GT.M suivantes:

- gtmdir
- gtmver
- gtmdist
- gtmgbldir
- gtmroutines
- GTMCI
- GTM_REPLICATION  (par défaut 'off')

Toutes les variables que vous ne spécifiez pas explicitement auront des valeurs par défaut calculées pour vous. Inspectez le code dans /lib/setEnvironment.js pour voir les règles et la logique qu'elle applique pour créer ces valeurs par défaut.

Ainsi, par exemple, vous pourriez faire ceci :

      var env = {
        gtmdir: '/usr/lib/fis-gtm/V6.0-003_x86_64'
      };
      connectGTMTo(this, env);

### 3.2. Que fait d'autre yrexpert-gtm ?

yrexpert-gtm charge et initialise le module ewd-document-store, créant un objet DocumentStore dans votre worker.

### 3.2. Evénements émis par yrexpert-gtm

yrexpert-gtm utilise l'événement 'stop' du travailleur pour s'assurer que la connexion à GT.M est supprimée avant que le travailleur s'arrête.

yrexpert-gtm émet également 3 nouveaux événements que vous pouvez gérer:

- dbOpened: les incendies après l'ouverture de la connexion à GT.M dans un processus de travail
- dbClosed: se déclenche après la connexion à GT.M est fermé dans un processus de travail. Le travailleur quitte immédiatement après cet événement
- DocumentStoreStarted: se déclenche après que l'objet DocumentStore a été instancié. C'est un bon endroit pour gérer les événements DocumentStore,
  Par exemple pour maintenir des indices de documents.

L'événement dbOpened vous fournit un argument d'objet d'état unique, vous permettant de déterminer le succès (ou non) de l'ouverture de la connexion à GT.M, vous pouvez donc ajouter le gestionnaire suivant dans votre module de travail, par exemple:

    worker.on('dbOpened', function(status) {
      console.log('GT.M a été ouvert par le worker ' + process.pid + ': status = ' + JSON.stringify(status));
    });


Les événements dbClosed et DocumentStoreStarted ne fournissent aucun argument.

## 4. Example

Voir dans le répertoire / examples.

Gtm-express, js est un exemple de scripts de processus maître Express / ewd-qoper8. Gtm-module1.js est le module de travail associé qui se connecte et utilise GT.M, en utilisant les paramètres d'environnement par défaut.

Utilisez-les comme point de départ pour votre propre système.

## 5. Comment contribuer ?

* Dupliquer le dépôt (utiliser Fork)
* Créer un nouvelle branche (git checkout -b ma-branche)
* Commit(er) votre proposition d'évolution (git commit -am 'Ajouter mon évolution')
* Push(er) la branche (git push origin ma-branche)
* Créer une demande d'évolution (utiliser Pull Requests)

Pour remonter un bug : [https://github.com/yrelay/yrexpert-term/issues](https://github.com/yrelay/yrexpert-term/issues)

## 6. Liens

* Yrelay Page d'accueil : [https://www.yrelay.fr/](https://www.yrelay.fr/)
* Yrelay Référentiels : [https://code.yrelay.fr/](https://code.yrelay.fr/)
* Yrelay Github : [https://github.com/Yrelay/](https://github.com/Yrelay/)


