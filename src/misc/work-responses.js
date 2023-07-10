//Average amount between 10 and 100

const WorkResponses = [
    {
        text: "Vous avez travaillé en tant que mineur, et vous venez de trouver... du bronze... je suis sûr que vous ferez mieux la prochaine fois. Cependant celui-ci vous rapporte",
        averageAmount: 30,
    },
    {
        text: "Vous avez travaillé en tant que mineur et vous venez de trouver... de l'argent ! Voici quelque chose d'intéressant ! Celui-ci vous rapporte",
        averageAmount: 50,
    },
    {
        text: "Vous avez travaillé en tant que mineur et vous venez de trouver... de l'or ! Quel miracle ! Ce précieux matériau vous octroie",
        averageAmount: 70,
    },
    {
        text: "Vous avez travaillé en tant que mineur et vous venez de trouver... Ne me dites pas que c'est vrai ?! Du diamant ?! Vous possédez une chance divine ! Celui-ci vous rapporte",
        averageAmount: 100,
    },
    {
        text: "Vous avez travaillé en tant que hacker, et vous venez de voler... 1 Bitcoin... je suis sûr que vous ferez mieux la prochaine fois. Cependant celui-ci vous rapporte",
        averageAmount: 30,
    },
    {
        text: "Vous avez travaillé en tant que hacker et vous venez de créer... un stack de Bitcoin ! Voici quelque chose d'intéressant ! Celui-ci vous rapporte",
        averageAmount: 50,
    },
    {
        text: "Vous avez travaillé en tant que hacker et vous venez de décrypter... 2 stack de Bitcoin ! Quel miracle ! Ces précieux *bits* vous octroie",
        averageAmount: 70,
    },
    {
        text: "Vous avez travaillé en tant que hacker et vous venez de pirater... Ne me dites pas que c'est vrai ?! Les bitcoin appartenants au président de la République ?! Vous possédez une chance divine ! Ceux-ci vous rapporte",
        averageAmount: 100,
    },
    {
        text: "Vous avez travaillé en tant qu’espion, avez réussi à pénétrer dans une base ennemie, avez volé 5 documents ultra-confidentiels, et... les avez perdus au bar alors que vous vouliez fêter cela...",
        averageAmount: 10,
    },
    {
        text: "Vous vous faites embaucher en tant que barman, vous cassez 3 verres et renversez 2 autres, le patron est gentil, il vous expulse sans vous taxer !",
        averageAmount: 10,
    },
    {
        text: "Vous êtes employé dans l’armée, vous y faites un beau travail et gagnez une promotion :",
        averageAmount: 60,
    },
    {
        text: "Vous devenez testeur de jeux vidéos, ceux-ci étants impossibles à réussir, vous vous énervez et vous enfuyez secrètement en volant",
        averageAmount: 40,
    },
    {
        text: "Vous développez une application mobile avec plein de pubs qui vous rapportent",
        averageAmount: 40,
    },
    {
        text: "Vous travaillez en tant que promeneur de chien, deux des chiens s’enfuient, vous ne gagnez rien ! Enfin presque, le porte-monnaie du proprio...",
        averageAmount: 20,
    },
    {
        text: "Vous devenez rappeur, vous acquiérez facilement le style, le flow, les fans et faites un disque d’or qui vous rapporte",
        averageAmount: 50,
    },
    {
        text: "Vous devenez rappeur, vous acquiérez facilement le style, le flow, les fans et faites un disque de platine qui vous rapporte",
        averageAmount: 90,
    },
    {
        text: "Vous mendiez dans la rue et obtenez",
        averageAmount: 30,
    },
    {
        text: "Vous mendiez dans la rue, un milliardaire passe et vous octroie généreusement",
        averageAmount: 60,
    },
    {
        text: "Vous avez travaillé en tant qu’espion, avez réussi à pénétrer dans une base ennemie, avez volé 5 documents ultra-confidentiels, et... les avez donné à votre patron ! Félicitations !",
        averageAmount: 80,
    },
    {
        text: "Vous avez travaillé en tant qu’espion, avez réussi à pénétrer dans une base ennemie, n’avez volé qu’un documents ultra-confidentiel sur les 5, et... votre patron est moyennement content. J’attendais mieux de vous.",
        averageAmount: 20,
    },
    {
        text: "Vous êtes embauché comme agriculteur et vos champs de blé vous rapportent ",
        averageAmount: 50,
    },
    {
        text: "Vous êtes embauchés à l’usine Ferrore, sur la chaine Kinder SchakaBons, une bactérie contamine la production par votre faute, et tout les chocolats doivent être rappelés ! Vous gagnez seulement",
        averageAmount: 30,
    },
    {
        text: "Vous devenez vétérinaire et faites un gros succès ! Le meilleur vétérinaire de tout les temps ! On a rien sans rien, voici",
        averageAmount: 100,
    },
    {
        text: "Vous vendez des billets de loto. Un jour, vous rencontrez un mendiant à Saint-Pétersbourg, vous essayez de lui vendre un ticket. Un tiens vaut mieux que deux tu l’auras. Il refuse.",
        averageAmount: 10,
    },
    {
        text: "Vous vendez des billets de loto. Un jour, vous rencontrez un mendiant à Saint-Pétersbourg, vous essayez de lui vendre un ticket. Un tiens vaut mieux que deux tu l’auras. Il refuse. Toutefois, vos autres billets vendus vous rapportent",
        averageAmount: 60,
    },
    {
        text: "Vous êtes architecte ! Votre renommée croît jusqu’à ce qu’un jour un tremblement de terre de magnitude 1 survienne et que toutes vos maisons s’écroulent ! Il vaut mieux être perdu de vue que de réputation, Vous vous enfuyez avec",
        averageAmount: 70,
    },
    {
        text: "Vous êtes chimiste ! Après l’explosion du labo, il ne reste plus grand chose... de votre salaire !",
        averageAmount: 10,
    },
    {
        text: "Vous êtes chimiste ! La découverte d’un nouvel élément vous rapporte",
        averageAmount: 80,
    },
    {
        text: "Vous êtes chimiste ! Vous fabriquez secrètement de la chlorure de sodium que vous mélanger avec du nitrate d’ammonium, de la sulfure de potassium et de la bromure de mendélévium. Vous vous en servez pour faire sauter le coffre-fort du patron renfermant votre salaire ! Voici",
        averageAmount: 60,
    },
    {
        text: "Vous devenez juge ! BOUM ! BOUM ! BOUM ! COUPABLE ! BOUM ! BOUM ! BOUM ! **COUPABLE !!** Justice extrême est extrême injustice. Vous gagnez uniquement",
        averageAmount: 40,
    },
    {
        text: "Vous devenez juge ! BOUM ! BOUM ! BOUM ! INNOCENT ! La clémence vaut mieux que la justice. Prenez ces",
        averageAmount: 70,
    },
    {
        text: "Vous gardez les moutons, mais voulant jouer avec elles, vous les énervez. Quand les brebis enragent, elles sont pires que les loups. Vous repartez avec",
        averageAmount: 20,
    },
    {
        text: "Vous avez été baby-sitter. Il ne faut pas jeter le bébé avec l’eau du bain !",
        averageAmount: 30,
    },
    {
        text: "Vous avez travaillé comme chauffeur de taxi. Vous êtes allé un peu trop vite sur l’autoroute et avez été flashé par un radar. Les excès tuent plus sûrement que les épées. Vous gagnez moitié-prix :",
        averageAmount: 50,
    },
    {
        text: "Vous trouvez un billet au sol. Sa valeur est de",
        averageAmount: 40,
    },
    {
        text: "Votre victoire à un tournoi sportif vous rapporte",
        averageAmount: 70,
    },
    {
        text: "Vous travaillez pour NitsuBot – Revolutionnary Multi-Purposes et gagnez",
        averageAmount: 60,
    },
    {
        text: "Vous avez réussi votre entretien d’embauche comme promis vous gagnez",
        averageAmount: 80,
    },
    {
        text: "Vous êtes un cycliste hors du commun et vous gagnez le Tour de France ! :first_place: Bravo vous remportez",
        averageAmount: 90,
    },
    {
        text: "Vous avez obtenu le pouvoir de devenir invisible ! Vous êtes maintenant invincible. Sauvez New York et gagnez",
        averageAmount: 50,
    },
    {
        text: "Vous *charbonnez* très dur, vous souvenant de cette citation de l’ancien : \"Vise le milliard et t’aura p’têtre 1 million ou 2\". Vous gagnez *mucho dinero* :",
        averageAmount: 60,
    },
    {
        text: "Vous avez gagné la coupe du monde de bras de fer chinois. Prix reçu :",
        averageAmount: 40,
    },
    {
        text: "Archéologue, vous avez retrouvé le carton rouge que s'est pris Zinedine Zidane en finale de la Coupe de Monde 2006 ! Vous le vendez aux enchères et repartez avec",
        averageAmount: 70,
    },
    {
        text: "Vous venez d'obtenir votre paye de modo Discord. Recevez",
        averageAmount: 20,
    },
    {
        text: "Nitsugua38 vous remercie d'utiliser son bot sur votre serveur et il vous donne",
        averageAmount: 80,
    },
    {
        text: "Vous vendez votre ancien ordinateur qui vous rapporte",
        averageAmount: 30,
    },
    {
        text: "Devenu chasseur de primes, vous avez tué l’ennemi mondial, votre récompense s’élève à",
        averageAmount: 70,
    },
    {
        text: "C’était les études ou le vol, vous avez choisi le RAP. 5 ans plus tard vous faites triple platine ! Pas mal ! Cela vous rapporte",
        averageAmount: 80,
    },
    {
        text: "Vous travaillez pour NitsuBot – Revolutionnary Multi-Purposes et gagnez",
        averageAmount: 20,
    }
];

module.exports = { WorkResponses };
