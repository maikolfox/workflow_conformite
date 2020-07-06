const acteurArray = [
      { fonction: "COORDINATEUR CAISSE RESEAU", nomPrenom: "Louis KAKE", idActeur: "louis.kake@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE ÉTUDES ET DÉVELOPPEMENT", nomPrenom: "Laurent BEDI", idActeur: "laurent.bedi@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE OPERATIONS LOCALES", nomPrenom: "Manssah CHERIF", idActeur: "manssah.cherif@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE MARKETING ET COMMUNICATION", nomPrenom: "Maïmouna BA-GOMIS", idActeur: "maimouna.ba-gomis@bridgebankgroup.com" }
    , { fonction: "CHEF DE DIVISION TRAITEMENTS BANCAIRES", nomPrenom: "Laetitia N'DJABOUE", idActeur: "laetitia.ndjaboue@bridgebankgroup.com" }
    , { fonction: "DIRECTEUR FINANCES ET TRESORERIE", nomPrenom: "Clovis PATNELLI", idActeur: "clovis.patnelli@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE OPERATIONS INTERNATIONALES", nomPrenom: "Nanan-Boua KOUAMÉ", idActeur: "nanan-boua.kouame@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE TRESORERIE", nomPrenom: "Jean-Eric MENZAN", idActeur: "jean-eric.menzan@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE ADMINISTRATION ET PAIE", nomPrenom: "Jean EKISSI", idActeur: "jean.ekissi@bridgebankgroup.com" }
    , { fonction: "ASSISTANTE MOYENS GÉNÉRAUX", nomPrenom: "Christiane AFFRAN", idActeur: "christiane.affran@bridgebankgroup.com" }
    , { fonction: "CHEF DE DIVISION JURIDIQUE", nomPrenom: "Dramane TRAORÉ", idActeur: "dramane.traore@bridgebankgroup.com" }
    , { fonction: "SUPERVISEUR CELLULE DEPÖTS ET PRËT", nomPrenom: "Kevin SEYA", idActeur: "kevin.seya@bridgebankgroup.com" }
    , { fonction: "RESPONSABLE OPERATIONS ELECTRONIQUES", nomPrenom: "Eba KOUAO", idActeur: "eba.kouao@bridgebankgroup.com" }
    , { fonction: "SUPERVISEUR CELLULE CHEQUES ET VIREMENTS", nomPrenom: "Hélène KOUASSI", idActeur: "helene.kouassi@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE ADMINISTRATION DU CREDIT", nomPrenom: "Prisca VOIRE-AKA", idActeur: "prisca.voire-aka@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE CONTRÔLE FINANCIER", nomPrenom: "Dominique KADJO", idActeur: "dominique.kadjo@bridgebankgroup.com" }
    , { fonction: "RESPONSABLE COURRIER ET ECONOMAT", nomPrenom: "Sifa MBATHE", idActeur: "sifa.mbate@bridgebankgroup.com" }
    , { fonction: "DIRECTEUR DE PROJET DE TRANSFORMATION ET DE LA DIGITALISATION", nomPrenom: "Franck-Xavier N'GUESSAN", idActeur: "franck-xavier.nguessan@bridgebankgroup.com" }
    , { fonction: "CHARGE MIDDLE OFFICE", nomPrenom: "Victoria AHUA", idActeur: "victoria.ahua@bridgebankgroup.com" }
    , { fonction: "RESPONSABLE DE LA SÉCURITÉ DES SYSTÈMES D'INFORMATION", nomPrenom: "Christophe SEUNEU", idActeur: "christophe.seuneu@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE PATRIMOINE IMMOBILIER", nomPrenom: "Franck MBAHIA", idActeur: "franck.mbahia@bridgebankgroup.com" }
    , { fonction: "DIRECTRICE DE L'AUDIT INTERNE", nomPrenom: "Mercedes MAÏGA", idActeur: "mercedes.maiga@bridgebankgroup.com" }
    , { fonction: "ANALYSTE FINANCIER GRANDE ENTREPRISE", nomPrenom: "Regis KONIAN", idActeur: "regis.konian@bridgebankgroup.com" }
    , { fonction: "CHARGE D'AFFAIRES CLIENTÈLE DES PARTICULIERS", nomPrenom: "Patricia TUAN", idActeur: "patricia.tuan@bridgebankgroup.com" }
    , { fonction: "CHEF DE DIVISION INFORMATIQUE ET TECHNOLOGIES", nomPrenom: "Brice BLEGUIN", idActeur: "brice.bleguin@bridgebankgroup.com" }
    , { fonction: "GESTIONNAIRE ADMINISTRATION ET PAIE", nomPrenom: "Diana COFFI", idActeur: "diana.coffi@bridgebankgroup.com" }
    , { fonction: "CHEF D'AGENCE CLIENTÈLE DES TPE", nomPrenom: "Yvon-Brice ABOUSSOU", idActeur: "yvon-brice.aboussou@bridgebankgroup.com" }
    , { fonction: "DIRECTEUR BANQUE ENTREPRISES", nomPrenom: "Mohamed HAMZA", idActeur: "mohamed.hamza@bridgebankgroup.com" }
    , { fonction: "DIRECTEUR DU RÉSEAU ET DES PARTICULIERS", nomPrenom: "Kader DIALLO", idActeur: "kader.diallo@bridgebankgroup.com" }
    , { fonction: "CHEF DE DIVISION CREDIT", nomPrenom: "Antoine KOUADIO", idActeur: "antoine.kouadio@bridgebankgroup.com" }
    , { fonction: "CHEF DE DIVISION CORPORATE", nomPrenom: "Anna DJOUSSOU", idActeur: "anna.djoussou@bridgebankgroup.com" }
    , { fonction: "CONDUCTEUR DE TRAVAUX", nomPrenom: "Rodrigue TAH", idActeur: "rodrigue.tah@bridgebankgroup.com" }
    , { fonction: "CHEF DE DIVISION ANIMATION COMMERCIALE", nomPrenom: "Stanislas YAO", idActeur: "stanislas.yao@bridgebankgroup.com" }
    , { fonction: "PRESIDENT DU CONSEIL D'ADMINISTRATION", nomPrenom: "Amadou KOUYATÉ", idActeur: "amadou.kouyate@bridgebankgroup.com" }
    , { fonction: "PILOTE DU RECOUVREMENT COMMERCIAL", nomPrenom: "Marie-Laure YAO", idActeur: "marie-laure.yao@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE LOGISTIQUE", nomPrenom: "Marin KONAN", idActeur: "marin.konan@bridgebankgroup.com" }
    , { fonction: "CHEF D'AGENCE CLIENTELE DES PROFESSIONNELS", nomPrenom: "Marie-Pascale ARMOO", idActeur: "marie-pascale.armoo@bridgebankgroup.com" }
    , { fonction: "CHARGE D’AFFAIRES PARTICULIERS", nomPrenom: "Abibatou DIAW", idActeur: "abibatou.diaw@bridgebankgroup.com" }
    , { fonction: "CHARGE DES OPERATIONS LOCALES", nomPrenom: "SAVANÉ Drouho KANAO", idActeur: "kanoa.savane@bridgebankgroup.com" }
    , { fonction: "CHARGE MIDDLE OFFICE", nomPrenom: "Joseph ZEGBEHI", idActeur: "joseph.zegbehi@bridgebankgroup.com" }
    , { fonction: "CHARGE D'AFFAIRES CLIENTÈLE DES TPE", nomPrenom: "Seydou KEITA", idActeur: "seydou.keita@bridgebankgroup.com" }
    , { fonction: "CHARGE CLIENTELE- Agence Riviera Golf", nomPrenom: "Adeline BOHUI", idActeur: "adeline.bohui@bridgebankgroup.com" }
    , { fonction: "SUPERVISEUR DE CAISSE- Agence Treichville", nomPrenom: "Elisabeth AMANI", idActeur: "elisabeth.amani@bridgebankgroup.com" }
    , { fonction: "RESPONSABLE DE CAISSE CENTRALE", nomPrenom: "Valentine KAKOU", idActeur: "Valentine.kakou@bridgebankgroup.com" }
    , { fonction: "CHARGE D'AFFAIRES CLIENTÈLE DES PARTICULIERS", nomPrenom: "Kadio Paul-Auguste EHOUMAN", idActeur: "paul-auguste.ehouman@bridgebankgroup.com" }
    , { fonction: "CHEF D'AGENCE CLIENTELE DES TPE", nomPrenom: "Ahoua DIOMANDÉ", idActeur: "ahoua.diomande@bridgebankgroup.com" }
    , { fonction: "CHEF D'AGENCE CLIENTÈLE DES TPE", nomPrenom: "Fabrice TOURÉ", idActeur: "fabrice.toure@bridgebankgroup.com" }
    , { fonction: "ASSISTANTE DE DIRECTION", nomPrenom: "Ginette ABLA", idActeur: "ginette.abla@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE ACHATS", nomPrenom: "Laetitia GUIRE", idActeur: "laetitia.guire@bridgebankgroup.com" }
    , { fonction: "TRESORIER", nomPrenom: "Alain N'GUETTIA", idActeur: "alain.nguettia@bridgebankgroup.com" }
    , { fonction: "CHEF DE DIVISION GESTION DES RISQUES ET DU CONTROLE PERMANENT", nomPrenom: "Henri-Michel YAPO", idActeur: "henri-michel.yapo@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE OPÉRATIONS ET SUPPORT", nomPrenom: "Hugues BAROAN", idActeur: "hugues.baroan@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE MIDDLE OFFICE", nomPrenom: "Christelle DIBY", idActeur: "christelle.diby@bridgebankgroup.com" }
    , { fonction: "ANALYSTE-CREDIT", nomPrenom: "Lynda N' DRI", idActeur: "lynda.ndri@bridgebankgroup.com" }
    , { fonction: "DIRECTEUR DU CREDIT ET DU JURIDIQUE", nomPrenom: "Daouda ZOROM", idActeur: "daouda.zorom@bridgebankgroup.com" }
    , { fonction: "CHEF DE DIVISION CONTRÖLE ET SUIVI DES ENGAGEMENTS", nomPrenom: "Norbert KOUAMÉ", idActeur: "norbert.kouame@bridgebankgroup.com" }
    , { fonction: "CHARGE MIDDLE OFFICE", nomPrenom: "Safiatou MALÉ", idActeur: "safiatou.male@bridgebankgroup.com" }
    , { fonction: "CHARGE CLIENTÈLE", nomPrenom: "Aminata CISSÉ", idActeur: "aminata.cisse@bridgebankgroup.com" }
    , { fonction: "ASSISTANTE PROJETS", nomPrenom: "Yvonne HAMZA", idActeur: "yvonne.hamza@bridgebankgroup.com" }
    , { fonction: "ASSISTANTE JURIDIQUE", nomPrenom: "Lorraine GUIRAHOU", idActeur: "lorraine.guirahou@bridgebankgroup.com" }
    , { fonction: "CHEF DE DIVISION RECOUVREMENT", nomPrenom: "Marie-Louise LAGAHI", idActeur: "marie-louise.lagahi@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE ETUDE ET DEVELOPPEMENT RH", nomPrenom: "Edwige YAO Akissi", idActeur: "edwige.yao@bridgebankgroup.com" }
    , { fonction: "DIRECTEUR DES MOYENS ET DU DEVELOPPEMENT", nomPrenom: "Henri DATIÉ", idActeur: "henri.datie@bridgebankgroup.com" }
    , { fonction: "CHARGE CLIENTELE- Seen Hotel", nomPrenom: "Audrey KOULA AMENA", idActeur: "audrey.koula@bridgebankgroup.com" }
    , { fonction: "CHARGE DE LA LOGISTIQUE", nomPrenom: "Olivier ABOUANOU", idActeur: "olivier.abouanou@bridgebankgroup.com" }
    , { fonction: "CHARGEE CLIENTELE", nomPrenom: "Rita DIGBEU", idActeur: "rita.digbeu@bridgebankgroup.com" }
    , { fonction: "CHARGEE DES OPERATIONS LOCALES", nomPrenom: "Pascaline Amoin KOUAKOU", idActeur: "pascaline.kouakou@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE CREDIT", nomPrenom: "Eric Paul N'GORAN", idActeur: "eric.ngoran@bridgebankgroup.com" }
    , { fonction: "GESTIONNAIRE ADMINISTRATION DE CREDIT", nomPrenom: "Sylvain KOUAMÉ ALLUI", idActeur: "sylvain.allui@bridgebankgroup.com" }
    , { fonction: "SUPERVISEUR DE CAISSE- Agence Cocody Centre", nomPrenom: "Edmond ALESSE", idActeur: "edmond.alesse@bridgebankgroup.com" }
    , { fonction: "CHEF DE MARCHE PROFESSIONEL", nomPrenom: "Prisca Halley KONAN", idActeur: "prisca.konan@bridgebankgroup.com" }
    , { fonction: "CHARGEE D'AFFAIRES RESEAU INDIRECT", nomPrenom: "Benedicte DIAHA", idActeur: "benedicte.diaha@bridgebankgroup.com" }
    , { fonction: "CAISSIERE- Agence Zone 4", nomPrenom: "Marie-Laure GUEDÉ", idActeur: "marie-laure.guede@bridgebankgroup.com" }
    , { fonction: "SUPERVISEUR DE CAISSE- Agence Zone 3", nomPrenom: "Guy-Auguste KOUAKOU DJAN", idActeur: "guy-auguste.djan@bridgebankgroup.com" }
    , { fonction: "SUPERVISEUR DE CAISSE - Agence Marcory Résidentiel", nomPrenom: "Carine DOBRE", idActeur: "carine.dobre@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE EXPLOITATION INFORMATIQUE", nomPrenom: "Vincent KPAHIN", idActeur: "vincent.kpahin@bridgebankgroup.com" }
    , { fonction: "CHARGE DU SUPPORT COMMERCIAL", nomPrenom: "Pierre Alix Armel OUANA", idActeur: "pierre-armel.ouana@bridgebankgroup.com" }
    , { fonction: "SUPERVISEUR DE CAISSE - Agence Seen Hotel", nomPrenom: "Marina Eleonore YAO", idActeur: "marina.yao@bridgebankgroup.com" }
    , { fonction: "Assistante conformité", nomPrenom: "Alphonsine KOIDJANE", idActeur: "alphonsine.koidjane@bridgebankgroup.com" }
    , { fonction: "ASSISTANTE DE DIRECTION", nomPrenom: "Viviane ABOA", idActeur: "viviane.aboa@bridgebankgroup.com" }
    , { fonction: "CONTRÔLEUR FINANCIER", nomPrenom: "Gnamien KOFFI", idActeur: "gnamien.koffi@bridgebankgroup.com" }
    , { fonction: "CHEF D'AGENCE CLIENTÈLE DES TPE", nomPrenom: "Marie-Paule TIENDAGA", idActeur: "marie-paule.kodo@bridgebankgroup.com" }
    , { fonction: "CHEF DE DIVISION AUDIT INTERNE", nomPrenom: "Joël KOUADIO DOULEY", idActeur: "joel.kouadio@bridgebankgroup.com" }
    , { fonction: "ASSISTANTE ARCHIVISTE", nomPrenom: "Marie-Josiane FODJO", idActeur: "marie-josiane.fodjo@bridgebankgroup.com" }
    , { fonction: "CHEF D'AGENCE CLIENTELE DES PROFESSIONNELS", nomPrenom: "Ange-Desirée COFFIE", idActeur: "ange-desiree.coffie@bridgebankgroup.com" }
    , { fonction: "CHARGE DES OPÉRATIONS INTERNATIONALES", nomPrenom: "Eddy Patrice KAONOU", idActeur: "eddy-patrice.kaonou@bridgebankgroup.com" }
    , { fonction: "SUPERVISEUR DE CAISSE- Agence II Plateaux Latrille", nomPrenom: "Fabienne N'DRI", idActeur: "fabienne.ndri@bridgebankgroup.com" }
    , { fonction: "CHARGE D'AFFAIRES CLIENTÈLE DES TPE", nomPrenom: "Kouadio Evance N'DA", idActeur: "evance.nda@bridgebankgroup.com" }
    , { fonction: "ASSISTANT MARKETING ET COMMUNICATION", nomPrenom: "Stephane DOUKOURÉ", idActeur: "stephane.doukoure@bridgebankgroup.com" }
    , { fonction: "CHEF D'AGENCE CLIENTÈLE DES TPE", nomPrenom: "Laëtitia Carine AGOUA", idActeur: "laetitia.agoua@bridgebankgroup.com" }
    , { fonction: "CHEF DE DIVISION PME/PMI", nomPrenom: "Marie-Estelle ZAHUI", idActeur: "marie-estelle.zahui@bridgebankgroup.com" }
    , { fonction: "CHEF DE MARCHE PARTICULIERS", nomPrenom: "Alphoncine BLI-OUATTARA", idActeur: "alphoncine.ouattara@bridgebankgroup.com" }
    , { fonction: "ASSISTANTE JURIDIQUE", nomPrenom: "Colombe ASSIE- KOFFI", idActeur: "colombe.assie-koffi@bridgebankgroup.com" }
    , { fonction: "Assistant Recouvrement", nomPrenom: "Emmanuel VANGA", idActeur: "emmanuel.vanga@bridgebankgroup.com" }
    , { fonction: "ANALYSTE FINANCIER", nomPrenom: "Ali KONÉ", idActeur: "ali.kone@bridgebankgroup.com" }
    , { fonction: "ASSISTANTE ACHATS", nomPrenom: "Axelle KOUASSE", idActeur: "axelle.fale@bridgebankgroup.com" }
    , { fonction: "CHARGE DES OPERATIONS INTERNATIONALES", nomPrenom: "Gwladys YAOBLE", idActeur: "gwladys.yaoble@bridgebankgroup.com" }
    , { fonction: "CHARGE DU MIDDLE OFFICE", nomPrenom: "Peh COULIBALY", idActeur: "peh.coulibaly@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE SYSTÈMES ET RÉSEAUX INFORMATIQUE", nomPrenom: "Arnaud BOTI", idActeur: "arnaud.boti@bridgebankgroup.com" }
    , { fonction: "CAISSIERE- Agence II Plateau Vallon", nomPrenom: "Olivia NGUETTA", idActeur: "olivia.nguetta@bridgebankgroup.com" }
    , { fonction: "Analyste-Financier", nomPrenom: "Marc-Antoine ZAMBI NENEY", idActeur: "marc-antoine.zambi@bridgebankgroup.com" }
    , { fonction: "Chef de Caisse", nomPrenom: "Roméo Kouadio YAO", idActeur: "kouadio-romeo.yao@bridgebankgroup.com" }
    , { fonction: "CHARGÉ OPÉRATIONS ÉLECTRONIQUES", nomPrenom: "Adjei Van Steven ACKA", idActeur: "steven.acka@bridgebankgroup.com" }
    , { fonction: "CHARGE D'AFFAIRES CORPORATE", nomPrenom: "Franck DIEKOUADIO", idActeur: "Franck.diekouadio@bridgebankgroup.com" }
    , { fonction: "CHARGE DES OPERATIONS LOCALES", nomPrenom: "Stephane LEKY", idActeur: "stephane.leky@bridgebankgroup.com" }
    , { fonction: "CAISSIERE- Agence II Plateaux Latrille", nomPrenom: "Sylvie EDIMO", idActeur: "sylvie.edimo@bridgebankgroup.com" }
    , { fonction: "Chargée D'affaires Corporate", nomPrenom: "Linda KOUAME", idActeur: "linda.kouame@bridgebankgroup.com" }
    , { fonction: "CAISSIERE - TRIEUSE", nomPrenom: "Mariam TOURÉ", idActeur: "mariam.toure@bridgebankgroup.com" }
    , { fonction: "CHARGEE D'AFFAIRES GRANDE ENTREPRISE", nomPrenom: "Nelly N’Guetat EHORA", idActeur: "nelly.ehora@bridgebankgroup.com" }
    , { fonction: "CHARGE D’ÉTUDES ET DEVELOPPEMENT", nomPrenom: "Hermann GUEHI", idActeur: "hermann.guehi@bridgebankgroup.com" }
    , { fonction: "CHARGEE D'ETUDE ET DEVELOPPEMENT RH", nomPrenom: "Grâce-Colombe KONÉ", idActeur: "grace-colombe.kone@bridgebankgroup.com" }
    , { fonction: "ASSISTANTE ACHATS", nomPrenom: "Nancy EDOH", idActeur: "nancy.edoh@bridgebankgroup.com" }
    , { fonction: "GESTIONNAIRE AUTORISATIONS", nomPrenom: "jean-claude DIOMANDÉ", idActeur: "jean-claude.diomande@bridgebankgroup.com" }
    , { fonction: "CONTRÔLEUR FINANCIER", nomPrenom: "Désirée KPLOHI", idActeur: "desiree.kplohi@bridgebankgroup.com" }
    , { fonction: "PILOTE DU RENFORCEMENT DES CAPACITES METIERS", nomPrenom: "Thierry DOULOUROU", idActeur: "thierry.doulourou@bridgebankgroup.com" }
    , { fonction: "CAISSIER", nomPrenom: "Aimé DIASSIE", idActeur: "aime.diassie@bridgebankgroup.com" }
    , { fonction: "SUPERVISEUR DE CAISSE- Agence Zone 4", nomPrenom: "Nicole OGOU", idActeur: "nicole.ogou@bridgebankgroup.com" }
    , { fonction: "CAISSIERE", nomPrenom: "Colombe GBALE", idActeur: "colombe.gbale@bridgebankgroup.com" }
    , { fonction: "CHARGE D'AFFAIRES CLIENTÈLE DES PARTICULIERS", nomPrenom: "Johnson DAKOURY", idActeur: "johnson.dakoury@bridgebankgroup.com" }
    , { fonction: "GESTIONNAIRE QUALITE", nomPrenom: "Estelle ANOMAN", idActeur: "estelle.anoman@bridgebankgroup.com" }
    , { fonction: "CHARGE D'AFFAIRES CLIENTÈLE DES TPE", nomPrenom: "Serge BLE", idActeur: "serge.ble@bridgebankgroup.com" }
    , { fonction: "CHARGE D'AFFAIRES GRANDES ENTREPRISES", nomPrenom: "Miézan Guy Gérald N'GUESSAN", idActeur: "guy-gerald.nguessan@bridgebankgroup.com" }
    , { fonction: "CHARGE D'AFFAIRES CLIENTÈLE DES TPE", nomPrenom: "Martial KONAN", idActeur: "martial.konan@bridgebankgroup.com" }
    , { fonction: "CHARGEE D'AFFAIRES PME", nomPrenom: "Anicette TCHIMOU", idActeur: "anicette.tchimou@bridgebankgroup.com" }
    , { fonction: "CHEF D'AGENCE CLIENTÈLE DES TPE", nomPrenom: "Patrick ZUNON", idActeur: "patrick.zunon@bridgebankgroup.com" }
    , { fonction: "MAINTENANCIER", nomPrenom: "Annicet KOUASSI", idActeur: "annicet.kouassi@bridgebankgroup.com" }
    , { fonction: "BRIDGE BANK GROUP CÔTE D'IVOIRE", nomPrenom: "Call Center", idActeur: "call.center@bridgebankgroup.com" }
    , { fonction: "PROJECT MANAGER OFFICER", nomPrenom: "Adama KONE", idActeur: "adama.kone@bridgebankgroup.com" }
    , { fonction: "CHARGE D'AFFAIRES PME/PMI", nomPrenom: "Mohamed SANGARE", idActeur: "mohamed.sangare@bridgebankgroup.com" }
    , { fonction: "CHEF D'AGENCE CLIENTELE DES PARTICULIERS", nomPrenom: "Ange Marie-Estelle KOUASSI", idActeur: "ange.kouassi@bridgebankgroup.com" }
    , { fonction: "CHARGÉE D'AFFAIRES CLIENTELE DES PARTICULIERS", nomPrenom: "Emmanuelle Soutio OUATTARA", idActeur: "emmanuelle.ouattara@bridgebankgroup.com" }
    , { fonction: "CONTRÔLEUR DE GESTION", nomPrenom: "Anne-Marie BOLI", idActeur: "anne-marie.boli@bridgebankgroup.com" }
    , { fonction: "CAISSIERE Agence II Plateau Vallon", nomPrenom: "Aline YAPI", idActeur: "aline.yapi@bridgebankgroup.com" }
    , { fonction: "ANALYSTE-CRÉDIT SENIOR", nomPrenom: "Séverin Yao KOFFI", idActeur: "severin.koffi@bridgebankgroup.com" }
    , { fonction: "CHARGEE D'AFFAIRES RESEAU INDIRECT", nomPrenom: "Aminata FOFANA", idActeur: "aminata.fofana@bridgebankgroup.com" }
    , { fonction: "CAISSIÈRE", nomPrenom: "Emma Anin Sylvie ALLAPO", idActeur: "emma.allapo@bridgebankgroup.com" }
    , { fonction: "CHARGÉE D'AFFAIRES CLIENTELE DES PARTICULIERS", nomPrenom: "Emilie ARCHER", idActeur: "emilie.archer@bridgebankgroup.com" }
    , { fonction: "CHEF DE DIVISION ORGANISATION ET QUALITE", nomPrenom: "Sandrine ALIEFE", idActeur: "sandrine.abe@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE RECOUVREMENT JUDICIAIRE, PRECONTENTIEUX ET CONSEILS", nomPrenom: "Didier DOUGROU Gnahoua", idActeur: "didier.dougrou@bridgebankgroup.com" }
    , { fonction: "ASSISTANTE ADMINISTRATION DU CREDIT", nomPrenom: "Rosemonde Akissi N'GORAN", idActeur: "rosemonde.ngoran@bridgebankgroup.com" }
    , { fonction: "COORDONNATEUR DES PROJETS", nomPrenom: "Diane BAHOU", idActeur: "diane.bahou@bridgebankgroup.com" }
    , { fonction: "TRIEUSE", nomPrenom: "Laeticia FAYE", idActeur: "laeticia.faye@bridgebankgroup.com" }
    , { fonction: "CAISSIERE", nomPrenom: "Fabienne GNESSO", idActeur: "fabienne.gnesso@bridgebankgroup.com" }
    , { fonction: "CHEF D'AGENCE CLIENTÈLE DES TPE", nomPrenom: "Modeste BAH", idActeur: "modeste.bah@bridgebankgroup.com" }
    , { fonction: "CHEF DE DIVISION INSTITUTIONNELS", nomPrenom: "Vanessa N'DAKPRI", idActeur: "vanessa.ndakpri@bridgebankgroup.com" }
    , { fonction: "CHARGE CLIENTELE", nomPrenom: "Flore-Vanessa PRAO", idActeur: "flore-vanessa.prao@bridgebankgroup.com" }
    , { fonction: "CAISSIERE", nomPrenom: "Youa Annie Christelle BESSI", idActeur: "christelle.bessi@bridgebankgroup.com" }
    , { fonction: "ASSISTANTE ACHATS", nomPrenom: "Manet SAHI", idActeur: "manet.sahi@bridgebankgroup.com" }
    , { fonction: "CAISSIERE- Agence Riviera Golf", nomPrenom: "Dominique KOUADIO BLE", idActeur: "dominique.kouadio@bridgebankgroup.com" }
    , { fonction: "AUDITEUR INFORMATIQUE", nomPrenom: "Roger ASSAMOI N'Da", idActeur: "roger.assamoi@bridgebankgroup.com" }
    , { fonction: "CONTRÔLEUR PERMANENT", nomPrenom: "William MAWUDO", idActeur: "william.mawudo@bridgebankgroup.com" }
    , { fonction: "CAISSIERE", nomPrenom: "Leticia Valérie KPAYOU", idActeur: "leticia.kpayou@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE CONFORMITÉ", nomPrenom: "Ines Audrey YEBOUE", idActeur: "ines.yeboue@bridgebankgroup.com" }
    , { fonction: "CAISSIERE", nomPrenom: "Pierre-Marina HELAISE", idActeur: "marina.helaise@bridgebankgroup.com" }
    , { fonction: "CHARGE CLIENTELE", nomPrenom: "Mariame FOFONA", idActeur: "mariame.fofana@bridgebankgroup.com" }
    , { fonction: "CAISSIERE", nomPrenom: "Sylvie BLON-LOU Wroon", idActeur: "sylvie.blon-lou@bridgebankgroup.com" }
    , { fonction: "CHEF D'AGENCE CLIENTELE DES PARTICULIERS", nomPrenom: "Salimata KAM", idActeur: "salimata.kam@bridgebankgroup.com" }
    , { fonction: "CHARGE CLIENTELE", nomPrenom: "Marianne YEBOUET", idActeur: "marianne.yebouet@bridgebankgroup.com" }
    , { fonction: "CHARGE DES SYSTEMES ET RESEAUX", nomPrenom: "Pierre-Claver N'SAMIN", idActeur: "pierre-claver.nsamin@bridgebankgroup.com" }
    , { fonction: "ASSISTANT JURIDIQUE", nomPrenom: "Jonathan PLEGNON", idActeur: "jonathan.plegnon@bridgebankgroup.com" }
    , { fonction: "TRÉSORIER", nomPrenom: "Amira IRAQUI", idActeur: "amira.iraqui@bridgebankgroup.com" }
    , { fonction: "CAISSIERE", nomPrenom: "Reine OTE", idActeur: "reine.ote@bridgebankgroup.com" }
    , { fonction: "CHARGEE D'AFFAIRES CLIENTELE DES PARTICULIERS", nomPrenom: "Nguessan Christiane AMANI", idActeur: "christiane.amani@bridgebankgroup.com" }
    , { fonction: "GESTIONNAIRE AUTORISATIONS", nomPrenom: "Honoré KOUADIO", idActeur: "honore.kouadio@bridgebankgroup.com" }
    , { fonction: "CAISSIERE", nomPrenom: "Natacha PAN", idActeur: "natacha.pan@bridgebankgroup.com" }
    , { fonction: "ASSISTANTE MARKETING ET COMMUNICATION", nomPrenom: "Hermance ABOKON", idActeur: "hermance.abokon@bridgebankgroup.com" }
    , { fonction: "CHARGEE D'AFFAIRES CLIENTELE DES PARTICULIERS", nomPrenom: "Karine GRAH", idActeur: "karine.grah@bridgebankgroup.com" }
    , { fonction: "CHEF D'AGENCE CLIENTELE DES PARTICULIERS", nomPrenom: "Gisele Dukan KONAN", idActeur: "gisele.konan@bridgebankgroup.com" }
    , { fonction: "DIRECTRICE DES RESSOURCES HUMAINES", nomPrenom: "Roselyne KALOU", idActeur: "roselyne.kalou@bridgebankgroup.com" }
    , { fonction: "PILOTE DE L’ACTIVITÉ COMMERCIALE", nomPrenom: "Rocksanne N'guessan BROU", idActeur: "rocksanne.brou@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE ACTIVITÉS EXTERNALISÉES", nomPrenom: "Dorgeles ANGBOZAN", idActeur: "dorgeles.angbozan@bridgebankgroup.com" }
    , { fonction: "CHEF D'AGENCE CLIENTELE DES PARTICULIERS", nomPrenom: "Stéphane FONKOUA", idActeur: "stephane.fonkoua@bridgebankgroup.com" }
    , { fonction: "CHARGE D'AFFAIRES CLIENTELE DES PROFESSIONNELS", nomPrenom: "Fabrice AKA", idActeur: "fabrice.aka@bridgebankgroup.com" }
    , { fonction: "CONTROLEUR AGENCES", nomPrenom: "Ines YANKEY", idActeur: "ines.yankey@bridgebankgroup.com" }
    , { fonction: "ANALYSTE-FINANCIER", nomPrenom: "Philippe N'guessan KOFFI", idActeur: "philippe.koffi@bridgebankgroup.com" }
    , { fonction: "SUPERVISEUR DES OPERATIONS INTERNATIONALES", nomPrenom: "Mardochée ADOU", idActeur: "mardochee.adou@bridgebankgroup.com" }
    , { fonction: "CHARGEE DE DEVELOPPEMENT DES MARCHES", nomPrenom: "Carine SESSI", idActeur: "carine.sessi@bridgebankgroup.com" }
    , { fonction: "CAISSIERE", nomPrenom: "Danièle OUATTARA", idActeur: "daniele.ouattara@bridgebankgroup.com" }
    , { fonction: "CHARGE MIDDLE OFFICE", nomPrenom: "Arnaud KOUADIO", idActeur: "arnaud.kouadio@bridgebankgroup.com" }
    , { fonction: "CHARGE D’AFFAIRES CLIENTELE DES PARTICULIERS", nomPrenom: "Lucraice KOUADIO", idActeur: "lucraice.kouadio@bridgebankgroup.com" }
    , { fonction: "CHARGÉ DU DÉVELOPPEMENT DES MARCHES", nomPrenom: "Constant BONI", idActeur: "constant.boni@bridgebankgroup.com" }
    , { fonction: "ORGANISATEUR", nomPrenom: "Muriel BOGUI", idActeur: "muriel.bogui@bridgebankgroup.com" }
    , { fonction: "CHARGE DES OPERATIONS LOCALES", nomPrenom: "Benson KOFFI", idActeur: "benson.koffi@bridgebankgroup.com" }
    , { fonction: "CHARGEE DU MIDDLE OFFICE", nomPrenom: "Marie-Antoinette GAYE", idActeur: "marie.gaye@bridgebankgroup.com" }
    , { fonction: "ANALYSTE CREDIT", nomPrenom: "Oscar MENET", idActeur: "oscar.menet@bridgebankgroup.com" }
    , { fonction: "TELEOPERATRICE", nomPrenom: "Esther AMETCHI", idActeur: "esther.ametchi@bridgebankgroup.com" }
    , { fonction: "CAISSIER", nomPrenom: "Jean COLLON", idActeur: "jean.collon@bridgebankgroup.com" }
    , { fonction: "AUDITEUR INTERNE", nomPrenom: "Linda SEGNEBLE", idActeur: "linda.segneble@bridgebankgroup.com" }
    , { fonction: "ASSISTANT AUDITEUR INFORMATIQUE", nomPrenom: "Ibrahim MOHAMED", idActeur: "ibrahim.mohamed@bridgebankgroup.com" }
    , { fonction: "CHARGE DU CONTRÔLE ET DU SUIVI DES ENGAGEMENTS", nomPrenom: "Pascal BINDE", idActeur: "pascal.binde@bridgebankgroup.com" }
    , { fonction: "CHARGE DES OPERATIONS LOCALES", nomPrenom: "Vianney ELLO", idActeur: "vianney.ello@bridgebankgroup.com" }
    , { fonction: "CHARGE DES SYSTEMES ET RESEAUX", nomPrenom: "Marc GOMPOU", idActeur: "marc.gompou@bridgebankgroup.com" }
    , { fonction: "Stagiaire DBE", nomPrenom: "Stagiaire8.dbe", idActeur: "Stagiaire8.dbe@bridgebankgroup.com" }
    , { fonction: "JURISTE EN CHARGE DE LA GESTION DES GARANTIES", nomPrenom: "Dominique KOFFI", idActeur: "dominique.koffi@bridgebankgroup.com" }
    , { fonction: "CAISSIERE", nomPrenom: "Hermine KONAN", idActeur: "hermine.konan@bridgebankgroup.com" }
    , { fonction: "ANALYSTE CREDIT", nomPrenom: "Carmen KONAN", idActeur: "carmen.konan@bridgebankgroup.com" }
    , { fonction: "CHARGE DES OPERATIONS LOCALES", nomPrenom: "Stéphane OULOU", idActeur: "stephane.oulou@bridgebankgroup.com" }
    , { fonction: "AUDITEUR INTERNE SENIOR", nomPrenom: "Jocelyne KOUASSI", idActeur: "jocelyne.kouassi@bridgebankgroup.com" }
    , { fonction: "CONTRÖLEUR DE GESTION", nomPrenom: "Guy-Roland BOURA", idActeur: "guy-roland.boura@bridgebankgroup.com" }
    , { fonction: "GESTIONNAIRE RECOUVREMENT", nomPrenom: "Marcelle Magni MINLIN", idActeur: "marcelle.minlin@bridgebankgroup.com" }
    , { fonction: "STATISTICIEN", nomPrenom: "Kevin SESSOU", idActeur: "kevin.sessou@bridgebankgroup.com" }
    , { fonction: "CAISSIERE", nomPrenom: "Pascaline AHISSI", idActeur: "pascaline.ahissi@bridgebankgroup.com" }
    , { fonction: "CONTROLEUR PERMANENT", nomPrenom: "Melissa BROU", idActeur: "melissa.brou@bridgebankgroup.com" }
    , { fonction: "CAISSIERE", nomPrenom: "Lucienne ASSAMOI", idActeur: "lucienne.assamoi@bridgebankgroup.com" }
    , { fonction: "CHARGE DE SECURITE", nomPrenom: "Frédéric FLANH", idActeur: "frederic.flanh@bridgebankgroup.com" }
    , { fonction: "CAISSIER", nomPrenom: "Hervé ASSAMOI", idActeur: "herve.assamoi@bridgebankgroup.com" }
    , { fonction: "TRIEUSE", nomPrenom: "Marie-Ange GBEULY", idActeur: "marie-ange.gbeuly@bridgebankgroup.com" }
    , { fonction: "CHARGE D'EXPLOITATION INFORMATIQUE", nomPrenom: "Fidelin KOUAME", idActeur: "fidelin.kouame@bridgebankgroup.com" }
    , { fonction: "GESTIONNAIRE AUTORISATIONS", nomPrenom: "Lhetissia OULAI", idActeur: "lhetissia.oulai@bridgebankgroup.com" }
    , { fonction: "RESPONSABLE DU PILOTAGE DE L'EXPERIENCE CLIENT", nomPrenom: "Raissa KASSI", idActeur: "raissa.kassi@bridgebankgroup.com" }
    , { fonction: "CHEF DE SERVICE DÉVELOPPEMENT COMMERCIAL ET INNOVATION", nomPrenom: "Anselme OURA", idActeur: "anselme.oura@bridgebankgroup.com" }
    , { fonction: "CHARGEE DES OPÉRATIONS INTERNATIONALES", nomPrenom: "Marie-Claude AYI", idActeur: "marie-claude.ayi@bridgebankgroup.com" }
    , { fonction: "ANALYSTE FINANCIER", nomPrenom: "Frédéric GORE", idActeur: "frederic.gore@bridgebankgroup.com" }
    , { fonction: "CHARGE DES OPERATIONS LOCALES", nomPrenom: "Isaac KARAMOKO", idActeur: "isaac.karamoko@bridgebankgroup.com" }
    , { fonction: "TELEOPERATRICE", nomPrenom: "Dorigème KPANOUVI", idActeur: "dorigeme.kpanouvi@bridgebankgroup.com" }
    , { fonction: "TELEOPERATRICE", nomPrenom: "Daya KONE", idActeur: "daya.kone@bridgebankgroup.com" }
    , { fonction: "CHARGE DE CONFORMITE", nomPrenom: "Mireille ALI", idActeur: "mireille.ali@bridgebankgroup.com" }
    , { fonction: "ANALYSTE CRÉDIT", nomPrenom: "Alimamy KAMBIRE", idActeur: "no data" }
    , { fonction: "AUDITEUR INTERNE", nomPrenom: "Mamadou DIABATE", idActeur: "mamadou.diabate@bridgebankgroup.com" }
    , { fonction: "CHEF DE PROJET MONETIQUE", nomPrenom: "Messan Lassey Armel MENSAH", idActeur: "armel.mensah@bridgebankgroup.com" }
    , { fonction: "ANALYSTE ORGANISATIONNEL ET PROCESS", nomPrenom: "Donald LOHORE", idActeur: "donald.lohore@bridgebankgroup.com" }
    , { fonction: "CONTROLEUR FINANCIER", nomPrenom: "Jean De Dieu N'GUESSAN", idActeur: "jean.nguessan@bridgebankgroup.com" }
    , { fonction: "ANALYSTE FINANCIER GRANDE ENTREPRISE", nomPrenom: "Cheick TRAORE", idActeur: "no data" }
    , { fonction: "CHARGE D’ÉTUDES ET DEVELOPPEMENT", nomPrenom: "Maikol AHOUE", idActeur: "maikol.ahoue@bridgebankgroup.com" }
    , { fonction: "CHARGEE DE DEVELOPPEMENT RESSOURCES HUMAINES", nomPrenom: "Fatoumata SORO", idActeur: "no data" }
    , { fonction: "Chargée du Recouvrement", nomPrenom: "Hélène ADINGRA", idActeur: "helene.adingra@bridgebankgroup.com" }
    , { fonction: "CHARGE D’ÉTUDES ET DEVELOPPEMENT", nomPrenom: "Guillaume KOUADIO", idActeur: "guillaume.kouadio@bridgebankgroup.com" }
    , { fonction: "Chef de Service Contrôle et Maîtrise du Risque Opérationnel", nomPrenom: "Ines Flore KOUAME", idActeur: "ines.kouame@bridgebankgroup.com" }
    , { fonction: "CHARGE DU CONTROLE ET MAITRISE DU RISQUE OPERATIONNEL", nomPrenom: "Ly AMADOU", idActeur: "ly.amadou@bridgebankgroup.com" }
    , { fonction: "ARCHIVISTE RH", nomPrenom: "Kouadio KOUAKOU", idActeur: "kouadio.kouakou@bridgebankgroup.com" }
    , { fonction: "Analyste Financier PME/PMI", nomPrenom: "Geoffroy DATHE", idActeur: "geoffroy.dathe@bridgebankgroup.com" }
    , { fonction: "Chargée de la Paie et des Statistiques", nomPrenom: "Heloise ATTOUNGBLE", idActeur: "heloise.attoungble@bridgebankgroup.com" }
    , { fonction: "CHARGE D'AFFAIRE PME/PMI", nomPrenom: "Charles AMORISSANI", idActeur: "charles.amorissani@bridgebankgroup.com" }
    , { fonction: "CHARGÉE D'AFFAIRES CLIENTELE DES PARTICULIERS", nomPrenom: "Johanne Audrey KOUADIO-IV", idActeur: "johanne.kouadioiv@bridgebankgroup.com" }
    , { fonction: "DIRECTEUR GÉNÉRAL", nomPrenom: "Ehouman KASSI", idActeur: "ehouman.kassi@bridgebankgroup.com" }
    , { fonction: "Chargé de la Conformité", nomPrenom: "Camille LAUBOUET", idActeur: "camille.laubouet@bridgebankgroup.com" }
    , { fonction: "Chargé de Conformité", nomPrenom: "Maïmouna OUATTARA", idActeur: "maimouna.ouattara@bridgebankgroup.com" }
    , { fonction: "CHARGÉE D'AFFAIRES CLIENTELE DES PARTICULIERS", nomPrenom: "CECILE KAKOU", idActeur: "cecile.kakou@bridgebankgroup.com" }
    , { fonction: "Conseiller en Gestion Patrimoniale", nomPrenom: "Lionel EMOLO", idActeur: "lionel.emolo@bridgebankgroup.com" }
    , { fonction: "Analyste Financier", nomPrenom: "Stephane KONAN", idActeur: "stephane.konan@bridgebankgroup.com" }
    , { fonction: "CHARGEE D'AFFAIRE PME-PMI", nomPrenom: "Carole Muriel OYOU", idActeur: "carole.oyou@bridgebankgroup.com" }
    , { fonction: "ANALYSTE CREDIT", nomPrenom: "Jacques-Armel AHOUSSOU", idActeur: "jacques.ahoussou@bridgebankgroup.com" }

    ]

    export default  acteurArray