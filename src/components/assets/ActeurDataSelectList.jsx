const acteurArray = [
    { fonction: "COORDINATEUR CAISSE RESEAU", label: "Louis KAKE", value: "louis.kake@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE ÉTUDES ET DÉVELOPPEMENT", label: "Laurent BEDI", value: "laurent.bedi@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE OPERATIONS LOCALES", label: "Manssah CHERIF", value: "manssah.cherif@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE MARKETING ET COMMUNICATION", label: "Maïmouna BA-GOMIS", value: "maimouna.ba-gomis@bridgebankgroup.com" }
  , { fonction: "CHEF DE DIVISION TRAITEMENTS BANCAIRES", label: "Laetitia N'DJABOUE", value: "laetitia.ndjaboue@bridgebankgroup.com" }
  , { fonction: "DIRECTEUR FINANCES ET TRESORERIE", label: "Clovis PATNELLI", value: "clovis.patnelli@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE OPERATIONS INTERNATIONALES", label: "Nanan-Boua KOUAMÉ", value: "nanan-boua.kouame@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE TRESORERIE", label: "Jean-Eric MENZAN", value: "jean-eric.menzan@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE ADMINISTRATION ET PAIE", label: "Jean EKISSI", value: "jean.ekissi@bridgebankgroup.com" }
  , { fonction: "ASSISTANTE MOYENS GÉNÉRAUX", label: "Christiane AFFRAN", value: "christiane.affran@bridgebankgroup.com" }
  , { fonction: "CHEF DE DIVISION JURIDIQUE", label: "Dramane TRAORÉ", value: "dramane.traore@bridgebankgroup.com" }
  , { fonction: "SUPERVISEUR CELLULE DEPÖTS ET PRËT", label: "Kevin SEYA", value: "kevin.seya@bridgebankgroup.com" }
  , { fonction: "RESPONSABLE OPERATIONS ELECTRONIQUES", label: "Eba KOUAO", value: "eba.kouao@bridgebankgroup.com" }
  , { fonction: "SUPERVISEUR CELLULE CHEQUES ET VIREMENTS", label: "Hélène KOUASSI", value: "helene.kouassi@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE ADMINISTRATION DU CREDIT", label: "Prisca VOIRE-AKA", value: "prisca.voire-aka@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE CONTRÔLE FINANCIER", label: "Dominique KADJO", value: "dominique.kadjo@bridgebankgroup.com" }
  , { fonction: "RESPONSABLE COURRIER ET ECONOMAT", label: "Sifa MBATHE", value: "sifa.mbate@bridgebankgroup.com" }
  , { fonction: "DIRECTEUR DE PROJET DE TRANSFORMATION ET DE LA DIGITALISATION", label: "Franck-Xavier N'GUESSAN", value: "franck-xavier.nguessan@bridgebankgroup.com" }
  , { fonction: "CHARGE MIDDLE OFFICE", label: "Victoria AHUA", value: "victoria.ahua@bridgebankgroup.com" }
  , { fonction: "RESPONSABLE DE LA SÉCURITÉ DES SYSTÈMES D'INFORMATION", label: "Christophe SEUNEU", value: "christophe.seuneu@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE PATRIMOINE IMMOBILIER", label: "Franck MBAHIA", value: "franck.mbahia@bridgebankgroup.com" }
  , { fonction: "DIRECTRICE DE L'AUDIT INTERNE", label: "Mercedes MAÏGA", value: "mercedes.maiga@bridgebankgroup.com" }
  , { fonction: "ANALYSTE FINANCIER GRANDE ENTREPRISE", label: "Regis KONIAN", value: "regis.konian@bridgebankgroup.com" }
  , { fonction: "CHARGE D'AFFAIRES CLIENTÈLE DES PARTICULIERS", label: "Patricia TUAN", value: "patricia.tuan@bridgebankgroup.com" }
  , { fonction: "CHEF DE DIVISION INFORMATIQUE ET TECHNOLOGIES", label: "Brice BLEGUIN", value: "brice.bleguin@bridgebankgroup.com" }
  , { fonction: "GESTIONNAIRE ADMINISTRATION ET PAIE", label: "Diana COFFI", value: "diana.coffi@bridgebankgroup.com" }
  , { fonction: "CHEF D'AGENCE CLIENTÈLE DES TPE", label: "Yvon-Brice ABOUSSOU", value: "yvon-brice.aboussou@bridgebankgroup.com" }
  , { fonction: "DIRECTEUR BANQUE ENTREPRISES", label: "Mohamed HAMZA", value: "mohamed.hamza@bridgebankgroup.com" }
  , { fonction: "DIRECTEUR DU RÉSEAU ET DES PARTICULIERS", label: "Kader DIALLO", value: "kader.diallo@bridgebankgroup.com" }
  , { fonction: "CHEF DE DIVISION CREDIT", label: "Antoine KOUADIO", value: "antoine.kouadio@bridgebankgroup.com" }
  , { fonction: "CHEF DE DIVISION CORPORATE", label: "Anna DJOUSSOU", value: "anna.djoussou@bridgebankgroup.com" }
  , { fonction: "CONDUCTEUR DE TRAVAUX", label: "Rodrigue TAH", value: "rodrigue.tah@bridgebankgroup.com" }
  , { fonction: "CHEF DE DIVISION ANIMATION COMMERCIALE", label: "Stanislas YAO", value: "stanislas.yao@bridgebankgroup.com" }
  , { fonction: "PRESIDENT DU CONSEIL D'ADMINISTRATION", label: "Amadou KOUYATÉ", value: "amadou.kouyate@bridgebankgroup.com" }
  , { fonction: "PILOTE DU RECOUVREMENT COMMERCIAL", label: "Marie-Laure YAO", value: "marie-laure.yao@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE LOGISTIQUE", label: "Marin KONAN", value: "marin.konan@bridgebankgroup.com" }
  , { fonction: "CHEF D'AGENCE CLIENTELE DES PROFESSIONNELS", label: "Marie-Pascale ARMOO", value: "marie-pascale.armoo@bridgebankgroup.com" }
  , { fonction: "CHARGE D’AFFAIRES PARTICULIERS", label: "Abibatou DIAW", value: "abibatou.diaw@bridgebankgroup.com" }
  , { fonction: "CHARGE DES OPERATIONS LOCALES", label: "SAVANÉ Drouho KANAO", value: "kanoa.savane@bridgebankgroup.com" }
  , { fonction: "CHARGE MIDDLE OFFICE", label: "Joseph ZEGBEHI", value: "joseph.zegbehi@bridgebankgroup.com" }
  , { fonction: "CHARGE D'AFFAIRES CLIENTÈLE DES TPE", label: "Seydou KEITA", value: "seydou.keita@bridgebankgroup.com" }
  , { fonction: "CHARGE CLIENTELE- Agence Riviera Golf", label: "Adeline BOHUI", value: "adeline.bohui@bridgebankgroup.com" }
  , { fonction: "SUPERVISEUR DE CAISSE- Agence Treichville", label: "Elisabeth AMANI", value: "elisabeth.amani@bridgebankgroup.com" }
  , { fonction: "RESPONSABLE DE CAISSE CENTRALE", label: "Valentine KAKOU", value: "Valentine.kakou@bridgebankgroup.com" }
  , { fonction: "CHARGE D'AFFAIRES CLIENTÈLE DES PARTICULIERS", label: "Kadio Paul-Auguste EHOUMAN", value: "paul-auguste.ehouman@bridgebankgroup.com" }
  , { fonction: "CHEF D'AGENCE CLIENTELE DES TPE", label: "Ahoua DIOMANDÉ", value: "ahoua.diomande@bridgebankgroup.com" }
  , { fonction: "CHEF D'AGENCE CLIENTÈLE DES TPE", label: "Fabrice TOURÉ", value: "fabrice.toure@bridgebankgroup.com" }
  , { fonction: "ASSISTANTE DE DIRECTION", label: "Ginette ABLA", value: "ginette.abla@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE ACHATS", label: "Laetitia GUIRE", value: "laetitia.guire@bridgebankgroup.com" }
  , { fonction: "TRESORIER", label: "Alain N'GUETTIA", value: "alain.nguettia@bridgebankgroup.com" }
  , { fonction: "CHEF DE DIVISION GESTION DES RISQUES ET DU CONTROLE PERMANENT", label: "Henri-Michel YAPO", value: "henri-michel.yapo@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE OPÉRATIONS ET SUPPORT", label: "Hugues BAROAN", value: "hugues.baroan@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE MIDDLE OFFICE", label: "Christelle DIBY", value: "christelle.diby@bridgebankgroup.com" }
  , { fonction: "ANALYSTE-CREDIT", label: "Lynda N' DRI", value: "lynda.ndri@bridgebankgroup.com" }
  , { fonction: "DIRECTEUR DU CREDIT ET DU JURIDIQUE", label: "Daouda ZOROM", value: "daouda.zorom@bridgebankgroup.com" }
  , { fonction: "CHEF DE DIVISION CONTRÖLE ET SUIVI DES ENGAGEMENTS", label: "Norbert KOUAMÉ", value: "norbert.kouame@bridgebankgroup.com" }
  , { fonction: "CHARGE MIDDLE OFFICE", label: "Safiatou MALÉ", value: "safiatou.male@bridgebankgroup.com" }
  , { fonction: "CHARGE CLIENTÈLE", label: "Aminata CISSÉ", value: "aminata.cisse@bridgebankgroup.com" }
  , { fonction: "ASSISTANTE PROJETS", label: "Yvonne HAMZA", value: "yvonne.hamza@bridgebankgroup.com" }
  , { fonction: "ASSISTANTE JURIDIQUE", label: "Lorraine GUIRAHOU", value: "lorraine.guirahou@bridgebankgroup.com" }
  , { fonction: "CHEF DE DIVISION RECOUVREMENT", label: "Marie-Louise LAGAHI", value: "marie-louise.lagahi@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE ETUDE ET DEVELOPPEMENT RH", label: "Edwige YAO Akissi", value: "edwige.yao@bridgebankgroup.com" }
  , { fonction: "DIRECTEUR DES MOYENS ET DU DEVELOPPEMENT", label: "Henri DATIÉ", value: "henri.datie@bridgebankgroup.com" }
  , { fonction: "CHARGE CLIENTELE- Seen Hotel", label: "Audrey KOULA AMENA", value: "audrey.koula@bridgebankgroup.com" }
  , { fonction: "CHARGE DE LA LOGISTIQUE", label: "Olivier ABOUANOU", value: "olivier.abouanou@bridgebankgroup.com" }
  , { fonction: "CHARGEE CLIENTELE", label: "Rita DIGBEU", value: "rita.digbeu@bridgebankgroup.com" }
  , { fonction: "CHARGEE DES OPERATIONS LOCALES", label: "Pascaline Amoin KOUAKOU", value: "pascaline.kouakou@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE CREDIT", label: "Eric Paul N'GORAN", value: "eric.ngoran@bridgebankgroup.com" }
  , { fonction: "GESTIONNAIRE ADMINISTRATION DE CREDIT", label: "Sylvain KOUAMÉ ALLUI", value: "sylvain.allui@bridgebankgroup.com" }
  , { fonction: "SUPERVISEUR DE CAISSE- Agence Cocody Centre", label: "Edmond ALESSE", value: "edmond.alesse@bridgebankgroup.com" }
  , { fonction: "CHEF DE MARCHE PROFESSIONEL", label: "Prisca Halley KONAN", value: "prisca.konan@bridgebankgroup.com" }
  , { fonction: "CHARGEE D'AFFAIRES RESEAU INDIRECT", label: "Benedicte DIAHA", value: "benedicte.diaha@bridgebankgroup.com" }
  , { fonction: "CAISSIERE- Agence Zone 4", label: "Marie-Laure GUEDÉ", value: "marie-laure.guede@bridgebankgroup.com" }
  , { fonction: "SUPERVISEUR DE CAISSE- Agence Zone 3", label: "Guy-Auguste KOUAKOU DJAN", value: "guy-auguste.djan@bridgebankgroup.com" }
  , { fonction: "SUPERVISEUR DE CAISSE - Agence Marcory Résidentiel", label: "Carine DOBRE", value: "carine.dobre@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE EXPLOITATION INFORMATIQUE", label: "Vincent KPAHIN", value: "vincent.kpahin@bridgebankgroup.com" }
  , { fonction: "CHARGE DU SUPPORT COMMERCIAL", label: "Pierre Alix Armel OUANA", value: "pierre-armel.ouana@bridgebankgroup.com" }
  , { fonction: "SUPERVISEUR DE CAISSE - Agence Seen Hotel", label: "Marina Eleonore YAO", value: "marina.yao@bridgebankgroup.com" }
  , { fonction: "Assistante conformité", label: "Alphonsine KOIDJANE", value: "alphonsine.koidjane@bridgebankgroup.com" }
  , { fonction: "ASSISTANTE DE DIRECTION", label: "Viviane ABOA", value: "viviane.aboa@bridgebankgroup.com" }
  , { fonction: "CONTRÔLEUR FINANCIER", label: "Gnamien KOFFI", value: "gnamien.koffi@bridgebankgroup.com" }
  , { fonction: "CHEF D'AGENCE CLIENTÈLE DES TPE", label: "Marie-Paule TIENDAGA", value: "marie-paule.kodo@bridgebankgroup.com" }
  , { fonction: "CHEF DE DIVISION AUDIT INTERNE", label: "Joël KOUADIO DOULEY", value: "joel.kouadio@bridgebankgroup.com" }
  , { fonction: "ASSISTANTE ARCHIVISTE", label: "Marie-Josiane FODJO", value: "marie-josiane.fodjo@bridgebankgroup.com" }
  , { fonction: "CHEF D'AGENCE CLIENTELE DES PROFESSIONNELS", label: "Ange-Desirée COFFIE", value: "ange-desiree.coffie@bridgebankgroup.com" }
  , { fonction: "CHARGE DES OPÉRATIONS INTERNATIONALES", label: "Eddy Patrice KAONOU", value: "eddy-patrice.kaonou@bridgebankgroup.com" }
  , { fonction: "SUPERVISEUR DE CAISSE- Agence II Plateaux Latrille", label: "Fabienne N'DRI", value: "fabienne.ndri@bridgebankgroup.com" }
  , { fonction: "CHARGE D'AFFAIRES CLIENTÈLE DES TPE", label: "Kouadio Evance N'DA", value: "evance.nda@bridgebankgroup.com" }
  , { fonction: "ASSISTANT MARKETING ET COMMUNICATION", label: "Stephane DOUKOURÉ", value: "stephane.doukoure@bridgebankgroup.com" }
  , { fonction: "CHEF D'AGENCE CLIENTÈLE DES TPE", label: "Laëtitia Carine AGOUA", value: "laetitia.agoua@bridgebankgroup.com" }
  , { fonction: "CHEF DE DIVISION PME/PMI", label: "Marie-Estelle ZAHUI", value: "marie-estelle.zahui@bridgebankgroup.com" }
  , { fonction: "CHEF DE MARCHE PARTICULIERS", label: "Alphoncine BLI-OUATTARA", value: "alphoncine.ouattara@bridgebankgroup.com" }
  , { fonction: "ASSISTANTE JURIDIQUE", label: "Colombe ASSIE- KOFFI", value: "colombe.assie-koffi@bridgebankgroup.com" }
  , { fonction: "Assistant Recouvrement", label: "Emmanuel VANGA", value: "emmanuel.vanga@bridgebankgroup.com" }
  , { fonction: "ANALYSTE FINANCIER", label: "Ali KONÉ", value: "ali.kone@bridgebankgroup.com" }
  , { fonction: "ASSISTANTE ACHATS", label: "Axelle KOUASSE", value: "axelle.fale@bridgebankgroup.com" }
  , { fonction: "CHARGE DES OPERATIONS INTERNATIONALES", label: "Gwladys YAOBLE", value: "gwladys.yaoble@bridgebankgroup.com" }
  , { fonction: "CHARGE DU MIDDLE OFFICE", label: "Peh COULIBALY", value: "peh.coulibaly@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE SYSTÈMES ET RÉSEAUX INFORMATIQUE", label: "Arnaud BOTI", value: "arnaud.boti@bridgebankgroup.com" }
  , { fonction: "CAISSIERE- Agence II Plateau Vallon", label: "Olivia NGUETTA", value: "olivia.nguetta@bridgebankgroup.com" }
  , { fonction: "Analyste-Financier", label: "Marc-Antoine ZAMBI NENEY", value: "marc-antoine.zambi@bridgebankgroup.com" }
  , { fonction: "Chef de Caisse", label: "Roméo Kouadio YAO", value: "kouadio-romeo.yao@bridgebankgroup.com" }
  , { fonction: "CHARGÉ OPÉRATIONS ÉLECTRONIQUES", label: "Adjei Van Steven ACKA", value: "steven.acka@bridgebankgroup.com" }
  , { fonction: "CHARGE D'AFFAIRES CORPORATE", label: "Franck DIEKOUADIO", value: "Franck.diekouadio@bridgebankgroup.com" }
  , { fonction: "CHARGE DES OPERATIONS LOCALES", label: "Stephane LEKY", value: "stephane.leky@bridgebankgroup.com" }
  , { fonction: "CAISSIERE- Agence II Plateaux Latrille", label: "Sylvie EDIMO", value: "sylvie.edimo@bridgebankgroup.com" }
  , { fonction: "Chargée D'affaires Corporate", label: "Linda KOUAME", value: "linda.kouame@bridgebankgroup.com" }
  , { fonction: "CAISSIERE - TRIEUSE", label: "Mariam TOURÉ", value: "mariam.toure@bridgebankgroup.com" }
  , { fonction: "CHARGEE D'AFFAIRES GRANDE ENTREPRISE", label: "Nelly N’Guetat EHORA", value: "nelly.ehora@bridgebankgroup.com" }
  , { fonction: "CHARGE D’ÉTUDES ET DEVELOPPEMENT", label: "Hermann GUEHI", value: "hermann.guehi@bridgebankgroup.com" }
  , { fonction: "CHARGEE D'ETUDE ET DEVELOPPEMENT RH", label: "Grâce-Colombe KONÉ", value: "grace-colombe.kone@bridgebankgroup.com" }
  , { fonction: "ASSISTANTE ACHATS", label: "Nancy EDOH", value: "nancy.edoh@bridgebankgroup.com" }
  , { fonction: "GESTIONNAIRE AUTORISATIONS", label: "jean-claude DIOMANDÉ", value: "jean-claude.diomande@bridgebankgroup.com" }
  , { fonction: "CONTRÔLEUR FINANCIER", label: "Désirée KPLOHI", value: "desiree.kplohi@bridgebankgroup.com" }
  , { fonction: "PILOTE DU RENFORCEMENT DES CAPACITES METIERS", label: "Thierry DOULOUROU", value: "thierry.doulourou@bridgebankgroup.com" }
  , { fonction: "CAISSIER", label: "Aimé DIASSIE", value: "aime.diassie@bridgebankgroup.com" }
  , { fonction: "SUPERVISEUR DE CAISSE- Agence Zone 4", label: "Nicole OGOU", value: "nicole.ogou@bridgebankgroup.com" }
  , { fonction: "CAISSIERE", label: "Colombe GBALE", value: "colombe.gbale@bridgebankgroup.com" }
  , { fonction: "CHARGE D'AFFAIRES CLIENTÈLE DES PARTICULIERS", label: "Johnson DAKOURY", value: "johnson.dakoury@bridgebankgroup.com" }
  , { fonction: "GESTIONNAIRE QUALITE", label: "Estelle ANOMAN", value: "estelle.anoman@bridgebankgroup.com" }
  , { fonction: "CHARGE D'AFFAIRES CLIENTÈLE DES TPE", label: "Serge BLE", value: "serge.ble@bridgebankgroup.com" }
  , { fonction: "CHARGE D'AFFAIRES GRANDES ENTREPRISES", label: "Miézan Guy Gérald N'GUESSAN", value: "guy-gerald.nguessan@bridgebankgroup.com" }
  , { fonction: "CHARGE D'AFFAIRES CLIENTÈLE DES TPE", label: "Martial KONAN", value: "martial.konan@bridgebankgroup.com" }
  , { fonction: "CHARGEE D'AFFAIRES PME", label: "Anicette TCHIMOU", value: "anicette.tchimou@bridgebankgroup.com" }
  , { fonction: "CHEF D'AGENCE CLIENTÈLE DES TPE", label: "Patrick ZUNON", value: "patrick.zunon@bridgebankgroup.com" }
  , { fonction: "MAINTENANCIER", label: "Annicet KOUASSI", value: "annicet.kouassi@bridgebankgroup.com" }
  , { fonction: "BRIDGE BANK GROUP CÔTE D'IVOIRE", label: "Call Center", value: "call.center@bridgebankgroup.com" }
  , { fonction: "PROJECT MANAGER OFFICER", label: "Adama KONE", value: "adama.kone@bridgebankgroup.com" }
  , { fonction: "CHARGE D'AFFAIRES PME/PMI", label: "Mohamed SANGARE", value: "mohamed.sangare@bridgebankgroup.com" }
  , { fonction: "CHEF D'AGENCE CLIENTELE DES PARTICULIERS", label: "Ange Marie-Estelle KOUASSI", value: "ange.kouassi@bridgebankgroup.com" }
  , { fonction: "CHARGÉE D'AFFAIRES CLIENTELE DES PARTICULIERS", label: "Emmanuelle Soutio OUATTARA", value: "emmanuelle.ouattara@bridgebankgroup.com" }
  , { fonction: "CONTRÔLEUR DE GESTION", label: "Anne-Marie BOLI", value: "anne-marie.boli@bridgebankgroup.com" }
  , { fonction: "CAISSIERE Agence II Plateau Vallon", label: "Aline YAPI", value: "aline.yapi@bridgebankgroup.com" }
  , { fonction: "ANALYSTE-CRÉDIT SENIOR", label: "Séverin Yao KOFFI", value: "severin.koffi@bridgebankgroup.com" }
  , { fonction: "CHARGEE D'AFFAIRES RESEAU INDIRECT", label: "Aminata FOFANA", value: "aminata.fofana@bridgebankgroup.com" }
  , { fonction: "CAISSIÈRE", label: "Emma Anin Sylvie ALLAPO", value: "emma.allapo@bridgebankgroup.com" }
  , { fonction: "CHARGÉE D'AFFAIRES CLIENTELE DES PARTICULIERS", label: "Emilie ARCHER", value: "emilie.archer@bridgebankgroup.com" }
  , { fonction: "CHEF DE DIVISION ORGANISATION ET QUALITE", label: "Sandrine ALIEFE", value: "sandrine.abe@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE RECOUVREMENT JUDICIAIRE, PRECONTENTIEUX ET CONSEILS", label: "Didier DOUGROU Gnahoua", value: "didier.dougrou@bridgebankgroup.com" }
  , { fonction: "ASSISTANTE ADMINISTRATION DU CREDIT", label: "Rosemonde Akissi N'GORAN", value: "rosemonde.ngoran@bridgebankgroup.com" }
  , { fonction: "COORDONNATEUR DES PROJETS", label: "Diane BAHOU", value: "diane.bahou@bridgebankgroup.com" }
  , { fonction: "TRIEUSE", label: "Laeticia FAYE", value: "laeticia.faye@bridgebankgroup.com" }
  , { fonction: "CAISSIERE", label: "Fabienne GNESSO", value: "fabienne.gnesso@bridgebankgroup.com" }
  , { fonction: "CHEF D'AGENCE CLIENTÈLE DES TPE", label: "Modeste BAH", value: "modeste.bah@bridgebankgroup.com" }
  , { fonction: "CHEF DE DIVISION INSTITUTIONNELS", label: "Vanessa N'DAKPRI", value: "vanessa.ndakpri@bridgebankgroup.com" }
  , { fonction: "CHARGE CLIENTELE", label: "Flore-Vanessa PRAO", value: "flore-vanessa.prao@bridgebankgroup.com" }
  , { fonction: "CAISSIERE", label: "Youa Annie Christelle BESSI", value: "christelle.bessi@bridgebankgroup.com" }
  , { fonction: "ASSISTANTE ACHATS", label: "Manet SAHI", value: "manet.sahi@bridgebankgroup.com" }
  , { fonction: "CAISSIERE- Agence Riviera Golf", label: "Dominique KOUADIO BLE", value: "dominique.kouadio@bridgebankgroup.com" }
  , { fonction: "AUDITEUR INFORMATIQUE", label: "Roger ASSAMOI N'Da", value: "roger.assamoi@bridgebankgroup.com" }
  , { fonction: "CONTRÔLEUR PERMANENT", label: "William MAWUDO", value: "william.mawudo@bridgebankgroup.com" }
  , { fonction: "CAISSIERE", label: "Leticia Valérie KPAYOU", value: "leticia.kpayou@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE CONFORMITÉ", label: "Ines Audrey YEBOUE", value: "ines.yeboue@bridgebankgroup.com" }
  , { fonction: "CAISSIERE", label: "Pierre-Marina HELAISE", value: "marina.helaise@bridgebankgroup.com" }
  , { fonction: "CHARGE CLIENTELE", label: "Mariame FOFONA", value: "mariame.fofana@bridgebankgroup.com" }
  , { fonction: "CAISSIERE", label: "Sylvie BLON-LOU Wroon", value: "sylvie.blon-lou@bridgebankgroup.com" }
  , { fonction: "CHEF D'AGENCE CLIENTELE DES PARTICULIERS", label: "Salimata KAM", value: "salimata.kam@bridgebankgroup.com" }
  , { fonction: "CHARGE CLIENTELE", label: "Marianne YEBOUET", value: "marianne.yebouet@bridgebankgroup.com" }
  , { fonction: "CHARGE DES SYSTEMES ET RESEAUX", label: "Pierre-Claver N'SAMIN", value: "pierre-claver.nsamin@bridgebankgroup.com" }
  , { fonction: "ASSISTANT JURIDIQUE", label: "Jonathan PLEGNON", value: "jonathan.plegnon@bridgebankgroup.com" }
  , { fonction: "TRÉSORIER", label: "Amira IRAQUI", value: "amira.iraqui@bridgebankgroup.com" }
  , { fonction: "CAISSIERE", label: "Reine OTE", value: "reine.ote@bridgebankgroup.com" }
  , { fonction: "CHARGEE D'AFFAIRES CLIENTELE DES PARTICULIERS", label: "Nguessan Christiane AMANI", value: "christiane.amani@bridgebankgroup.com" }
  , { fonction: "GESTIONNAIRE AUTORISATIONS", label: "Honoré KOUADIO", value: "honore.kouadio@bridgebankgroup.com" }
  , { fonction: "CAISSIERE", label: "Natacha PAN", value: "natacha.pan@bridgebankgroup.com" }
  , { fonction: "ASSISTANTE MARKETING ET COMMUNICATION", label: "Hermance ABOKON", value: "hermance.abokon@bridgebankgroup.com" }
  , { fonction: "CHARGEE D'AFFAIRES CLIENTELE DES PARTICULIERS", label: "Karine GRAH", value: "karine.grah@bridgebankgroup.com" }
  , { fonction: "CHEF D'AGENCE CLIENTELE DES PARTICULIERS", label: "Gisele Dukan KONAN", value: "gisele.konan@bridgebankgroup.com" }
  , { fonction: "DIRECTRICE DES RESSOURCES HUMAINES", label: "Roselyne KALOU", value: "roselyne.kalou@bridgebankgroup.com" }
  , { fonction: "PILOTE DE L’ACTIVITÉ COMMERCIALE", label: "Rocksanne N'guessan BROU", value: "rocksanne.brou@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE ACTIVITÉS EXTERNALISÉES", label: "Dorgeles ANGBOZAN", value: "dorgeles.angbozan@bridgebankgroup.com" }
  , { fonction: "CHEF D'AGENCE CLIENTELE DES PARTICULIERS", label: "Stéphane FONKOUA", value: "stephane.fonkoua@bridgebankgroup.com" }
  , { fonction: "CHARGE D'AFFAIRES CLIENTELE DES PROFESSIONNELS", label: "Fabrice AKA", value: "fabrice.aka@bridgebankgroup.com" }
  , { fonction: "CONTROLEUR AGENCES", label: "Ines YANKEY", value: "ines.yankey@bridgebankgroup.com" }
  , { fonction: "ANALYSTE-FINANCIER", label: "Philippe N'guessan KOFFI", value: "philippe.koffi@bridgebankgroup.com" }
  , { fonction: "SUPERVISEUR DES OPERATIONS INTERNATIONALES", label: "Mardochée ADOU", value: "mardochee.adou@bridgebankgroup.com" }
  , { fonction: "CHARGEE DE DEVELOPPEMENT DES MARCHES", label: "Carine SESSI", value: "carine.sessi@bridgebankgroup.com" }
  , { fonction: "CAISSIERE", label: "Danièle OUATTARA", value: "daniele.ouattara@bridgebankgroup.com" }
  , { fonction: "CHARGE MIDDLE OFFICE", label: "Arnaud KOUADIO", value: "arnaud.kouadio@bridgebankgroup.com" }
  , { fonction: "CHARGE D’AFFAIRES CLIENTELE DES PARTICULIERS", label: "Lucraice KOUADIO", value: "lucraice.kouadio@bridgebankgroup.com" }
  , { fonction: "CHARGÉ DU DÉVELOPPEMENT DES MARCHES", label: "Constant BONI", value: "constant.boni@bridgebankgroup.com" }
  , { fonction: "ORGANISATEUR", label: "Muriel BOGUI", value: "muriel.bogui@bridgebankgroup.com" }
  , { fonction: "CHARGE DES OPERATIONS LOCALES", label: "Benson KOFFI", value: "benson.koffi@bridgebankgroup.com" }
  , { fonction: "CHARGEE DU MIDDLE OFFICE", label: "Marie-Antoinette GAYE", value: "marie.gaye@bridgebankgroup.com" }
  , { fonction: "ANALYSTE CREDIT", label: "Oscar MENET", value: "oscar.menet@bridgebankgroup.com" }
  , { fonction: "TELEOPERATRICE", label: "Esther AMETCHI", value: "esther.ametchi@bridgebankgroup.com" }
  , { fonction: "CAISSIER", label: "Jean COLLON", value: "jean.collon@bridgebankgroup.com" }
  , { fonction: "AUDITEUR INTERNE", label: "Linda SEGNEBLE", value: "linda.segneble@bridgebankgroup.com" }
  , { fonction: "ASSISTANT AUDITEUR INFORMATIQUE", label: "Ibrahim MOHAMED", value: "ibrahim.mohamed@bridgebankgroup.com" }
  , { fonction: "CHARGE DU CONTRÔLE ET DU SUIVI DES ENGAGEMENTS", label: "Pascal BINDE", value: "pascal.binde@bridgebankgroup.com" }
  , { fonction: "CHARGE DES OPERATIONS LOCALES", label: "Vianney ELLO", value: "vianney.ello@bridgebankgroup.com" }
  , { fonction: "CHARGE DES SYSTEMES ET RESEAUX", label: "Marc GOMPOU", value: "marc.gompou@bridgebankgroup.com" }
  , { fonction: "Stagiaire DBE", label: "Stagiaire8.dbe", value: "Stagiaire8.dbe@bridgebankgroup.com" }
  , { fonction: "JURISTE EN CHARGE DE LA GESTION DES GARANTIES", label: "Dominique KOFFI", value: "dominique.koffi@bridgebankgroup.com" }
  , { fonction: "CAISSIERE", label: "Hermine KONAN", value: "hermine.konan@bridgebankgroup.com" }
  , { fonction: "ANALYSTE CREDIT", label: "Carmen KONAN", value: "carmen.konan@bridgebankgroup.com" }
  , { fonction: "CHARGE DES OPERATIONS LOCALES", label: "Stéphane OULOU", value: "stephane.oulou@bridgebankgroup.com" }
  , { fonction: "AUDITEUR INTERNE SENIOR", label: "Jocelyne KOUASSI", value: "jocelyne.kouassi@bridgebankgroup.com" }
  , { fonction: "CONTRÖLEUR DE GESTION", label: "Guy-Roland BOURA", value: "guy-roland.boura@bridgebankgroup.com" }
  , { fonction: "GESTIONNAIRE RECOUVREMENT", label: "Marcelle Magni MINLIN", value: "marcelle.minlin@bridgebankgroup.com" }
  , { fonction: "STATISTICIEN", label: "Kevin SESSOU", value: "kevin.sessou@bridgebankgroup.com" }
  , { fonction: "CAISSIERE", label: "Pascaline AHISSI", value: "pascaline.ahissi@bridgebankgroup.com" }
  , { fonction: "CONTROLEUR PERMANENT", label: "Melissa BROU", value: "melissa.brou@bridgebankgroup.com" }
  , { fonction: "CAISSIERE", label: "Lucienne ASSAMOI", value: "lucienne.assamoi@bridgebankgroup.com" }
  , { fonction: "CHARGE DE SECURITE", label: "Frédéric FLANH", value: "frederic.flanh@bridgebankgroup.com" }
  , { fonction: "CAISSIER", label: "Hervé ASSAMOI", value: "herve.assamoi@bridgebankgroup.com" }
  , { fonction: "TRIEUSE", label: "Marie-Ange GBEULY", value: "marie-ange.gbeuly@bridgebankgroup.com" }
  , { fonction: "CHARGE D'EXPLOITATION INFORMATIQUE", label: "Fidelin KOUAME", value: "fidelin.kouame@bridgebankgroup.com" }
  , { fonction: "GESTIONNAIRE AUTORISATIONS", label: "Lhetissia OULAI", value: "lhetissia.oulai@bridgebankgroup.com" }
  , { fonction: "RESPONSABLE DU PILOTAGE DE L'EXPERIENCE CLIENT", label: "Raissa KASSI", value: "raissa.kassi@bridgebankgroup.com" }
  , { fonction: "CHEF DE SERVICE DÉVELOPPEMENT COMMERCIAL ET INNOVATION", label: "Anselme OURA", value: "anselme.oura@bridgebankgroup.com" }
  , { fonction: "CHARGEE DES OPÉRATIONS INTERNATIONALES", label: "Marie-Claude AYI", value: "marie-claude.ayi@bridgebankgroup.com" }
  , { fonction: "ANALYSTE FINANCIER", label: "Frédéric GORE", value: "frederic.gore@bridgebankgroup.com" }
  , { fonction: "CHARGE DES OPERATIONS LOCALES", label: "Isaac KARAMOKO", value: "isaac.karamoko@bridgebankgroup.com" }
  , { fonction: "TELEOPERATRICE", label: "Dorigème KPANOUVI", value: "dorigeme.kpanouvi@bridgebankgroup.com" }
  , { fonction: "TELEOPERATRICE", label: "Daya KONE", value: "daya.kone@bridgebankgroup.com" }
  , { fonction: "CHARGE DE CONFORMITE", label: "Mireille ALI", value: "mireille.ali@bridgebankgroup.com" }
  , { fonction: "ANALYSTE CRÉDIT", label: "Alimamy KAMBIRE", value: "no data" }
  , { fonction: "AUDITEUR INTERNE", label: "Mamadou DIABATE", value: "mamadou.diabate@bridgebankgroup.com" }
  , { fonction: "CHEF DE PROJET MONETIQUE", label: "Messan Lassey Armel MENSAH", value: "armel.mensah@bridgebankgroup.com" }
  , { fonction: "ANALYSTE ORGANISATIONNEL ET PROCESS", label: "Donald LOHORE", value: "donald.lohore@bridgebankgroup.com" }
  , { fonction: "CONTROLEUR FINANCIER", label: "Jean De Dieu N'GUESSAN", value: "jean.nguessan@bridgebankgroup.com" }
  , { fonction: "ANALYSTE FINANCIER GRANDE ENTREPRISE", label: "Cheick TRAORE", value: "no data" }
  , { fonction: "CHARGE D’ÉTUDES ET DEVELOPPEMENT", label: "Maikol AHOUE", value: "maikol.ahoue@bridgebankgroup.com" }
  , { fonction: "CHARGEE DE DEVELOPPEMENT RESSOURCES HUMAINES", label: "Fatoumata SORO", value: "no data" }
  , { fonction: "Chargée du Recouvrement", label: "Hélène ADINGRA", value: "helene.adingra@bridgebankgroup.com" }
  , { fonction: "CHARGE D’ÉTUDES ET DEVELOPPEMENT", label: "Guillaume KOUADIO", value: "guillaume.kouadio@bridgebankgroup.com" }
  , { fonction: "Chef de Service Contrôle et Maîtrise du Risque Opérationnel", label: "Ines Flore KOUAME", value: "ines.kouame@bridgebankgroup.com" }
  , { fonction: "CHARGE DU CONTROLE ET MAITRISE DU RISQUE OPERATIONNEL", label: "Ly AMADOU", value: "ly.amadou@bridgebankgroup.com" }
  , { fonction: "ARCHIVISTE RH", label: "Kouadio KOUAKOU", value: "kouadio.kouakou@bridgebankgroup.com" }
  , { fonction: "Analyste Financier PME/PMI", label: "Geoffroy DATHE", value: "geoffroy.dathe@bridgebankgroup.com" }
  , { fonction: "Chargée de la Paie et des Statistiques", label: "Heloise ATTOUNGBLE", value: "heloise.attoungble@bridgebankgroup.com" }
  , { fonction: "CHARGE D'AFFAIRE PME/PMI", label: "Charles AMORISSANI", value: "charles.amorissani@bridgebankgroup.com" }
  , { fonction: "CHARGÉE D'AFFAIRES CLIENTELE DES PARTICULIERS", label: "Johanne Audrey KOUADIO-IV", value: "johanne.kouadioiv@bridgebankgroup.com" }
  , { fonction: "DIRECTEUR GÉNÉRAL", label: "Ehouman KASSI", value: "ehouman.kassi@bridgebankgroup.com" }
  , { fonction: "Chargé de la Conformité", label: "Camille LAUBOUET", value: "camille.laubouet@bridgebankgroup.com" }
  , { fonction: "Chargé de Conformité", label: "Maïmouna OUATTARA", value: "maimouna.ouattara@bridgebankgroup.com" }
  , { fonction: "CHARGÉE D'AFFAIRES CLIENTELE DES PARTICULIERS", label: "CECILE KAKOU", value: "cecile.kakou@bridgebankgroup.com" }
  , { fonction: "Conseiller en Gestion Patrimoniale", label: "Lionel EMOLO", value: "lionel.emolo@bridgebankgroup.com" }
  , { fonction: "Analyste Financier", label: "Stephane KONAN", value: "stephane.konan@bridgebankgroup.com" }
  , { fonction: "CHARGEE D'AFFAIRE PME-PMI", label: "Carole Muriel OYOU", value: "carole.oyou@bridgebankgroup.com" }
  , { fonction: "ANALYSTE CREDIT", label: "Jacques-Armel AHOUSSOU", value: "jacques.ahoussou@bridgebankgroup.com" }]

  export default  acteurArray