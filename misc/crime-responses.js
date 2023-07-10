//Average amount between -100 and 100

const CrimeResponses = [
  {
      text: "Vous braquez une banque. Son coffre contient",
      averageAmount: 60,
  },
  {
      text: "Vous pénétrez à l’Élysée en secret et y dérobez",
      averageAmount: 80,
  },
  {
      text: "Vous vous glissez en secret dans un sous-marin militaire, et dénoncez au pays ennemi ses maneuvres ultra-secrètes. Vous êtes récompensés par",
      averageAmount: 100,
  },
  {
      text: "Vous faites des casses dans 3 casinos d’affilés : le Bellagio, le MGM Grand et le Mirage. Ce pactole vous rapporte",
      averageAmount: 90,
  },
  {
      text: "Vous dealez de la drogue. Vous voilà avec",
      averageAmount: 70,
  },
  {
      text: "Vous faites du traffic d’armes volés pendant votre service militaire. Les clients vous rapportent",
      averageAmount: 50,
  },
  {
      text: "Vous taggez un mur avec votre nom, vos abonnés YouTube augmentent considérablement ! Un prix vous est attribué :",
      averageAmount: 40,
  },
  {
      text: "Vous demandez une rançon en échange des données de quelqu’un que vous avez piraté ! Il vous donne",
      averageAmount: 30,
  },
  {
      text: "Vous volez la maison de votre voisin, revendez son or et ses bijoux qui vous octroient",
      averageAmount: 20,
  },
  {
      text: "Vous faites preuve de violence dans la rue pour obtenir des portes-monnaie. Après avoir échappé à la gendarmerie, vous constatez votre butin :",
      averageAmount: 10,
  },
  {
      text: "Vous entrez dans la piscine municipale, déguisé en terroriste. Voyant que vos armes sont factices, vous êtes laissé tranquille",
      averageAmount: 0,
  },
  {
      text: "Vous entrez dans la biliothèque municipale. Pris la main dans le sac, ou plutôt les livres dans le sac, vous êtes laissé tranquille par la gentille bibliothécaire",
      averageAmount: 0,
  },
  {
      text: "Vous vous attaquez à une éolienne. Assommé par une de ses pales, vous prenez vos jambes à votre coup",
      averageAmount: 0,
  },
  {
      text: "Vous avez la brillante idée de faire un coup d’état. Vous arrivez donc à l’Élysée, armes à la main, criant \"À mort M. le président !\". Vous êtes rapidement arrêté par 3 agents de sécurité qui vous rient au nez et vous relâchent après garde à vue",
      averageAmount: 0,
  },
  {
      text: "Vous incendiez une voiture pour impressionner votre *date*. Quel *bad boy* ! La sirène retentit, elle part en courant, vous aussi, mais cet exploit ne vous rapporte que la maudique somme de",
      averageAmount: 0,
  },
  {
      text: "Vous tentez un cambriolage mais volez le mauvais coffre qui contenait... Rien !",
      averageAmount: 0,
  },
  {
      text: "Vous harcelez un camarade de classe. Vous êtes convoqué puis renvoyé de l’école et taxé de",
      averageAmount: -10,
  },
  {
      text: "Vous fumez dans un espace public clos, selon la legislation en vigueur et la loi du 10 janvier 1991, vous êtes condamné à une amende de",
      averageAmount: -20,
  },
  {
      text: "Vous avez travaillé en tant qu’espion, vous êtes fait repéré et avez donc perdu",
      averageAmount: -30,
  },
  {
      text: "Vous essayez de voler une Ferrari, cependant vous entendez \"Arrêtez tout ! Ne faites plus rien. Je suis Exal Feloy, commission d'urbanisme de Ylreveb Hills !\" Vous perdez",
      averageAmount: -40,
  },
  {
      text: "Un plan audacieux et sans défaut, un braquage exécuté de main de maître, une fuite à travers les canaux de Venise nette et sans bavure. Vous et vos hommes n'auraient pas assez d'une vie pour savourer les fruits amplement mérités de ce casse historique. Cependant, votre bande hébergeait à son insu un traître, qui ruina d'un coup tout vos espoirs : tombant le masque, Steve Frizille abattit froidement tout vos complices et s'enfuit avec les lingots. Vous perdez",
      averageAmount: -50,
  },
  {
      text: "Vous vous engagez dans la police anti-nazis. Vous rencontrez un groupe criminel actif et devant leur excuse : \"C'est marrant, c'est toujours les nazis qui ont le mauvais rôle. Nous sommes en 1955, on peut avoir une deuxième chance ? Merci\", vous les laissez en paix. Votre chef l’apprend, vous êtes virés avec une retenue de",
      averageAmount: -60,
  },
  {
      text: "Vous devenez médecin. Après la disparition de deux de vos patients, vous êtes condamnés à une amende de",
      averageAmount: -70,
  },
  {
      text: "Vous pénétrez dans un hôpital, armé jusqu’aux dents. Arrêté, vous recevez une amende de",
      averageAmount: -80,
  },
  {
      text: "Vous désertez l’Entrainement Militaire Intensif, hors de lui, votre sergent vous fais payer",
      averageAmount: -90,
  },
  {
      text: "Au supermarché, vous vous faites choper pour vol de chopes de bière. Vous perdez",
      averageAmount: -100,
  },
  {
      text: "Vous héritez de votre belle mère insupportable et recevez",
      averageAmount: 60,
  },
  {
      text: "Vous avez kidnappé votre meilleur ami ! En guise de rançon, vous recevez",
      averageAmount: 50,
  },
  {
      text: "Vous êtes cycliste mais vous chutez et cassez votre vélo, vous perdez le Tour de France à cause de ça. Vous êtes virés de votre équipe qui ne rembourse rien. Perdez",
      averageAmount: -50,
  },
  {
      text: "Vous économisez depuis toujours pour vous acheter votre trampoline de rêve. Vous avez accompli votre rêve ! Mais perdu",
      averageAmount: -70,
  },
  {
      text: "Vous avez insulté une vieille dame dans la rue. Pas de chance ! C'était une sorcière, vous êtes transformé en pot de fleur ! Perdez",
      averageAmount: -20,
  },
  {
      text: "Vous volez une Rolex et une Casio, qui vous rapportent",
      averageAmount: 70,
  },
  {
      text: "Vous et vos potes êtes des campeurs courageux, vous vous racontez des histoires le soir au bord du feu. Vous entendez des bruits derrière un buisson... Un lapin-garou tente de vous agresser, vous lui donnez des carottes pour le calmer. Perdez",
      averageAmount: -10,
  },
  {
      text: "Vous vous payez un dîner avec le président. Cela coûte cher : ",
      averageAmount: -20,
  },
  {
      text: "Parti faire du braconnage, vous vous faites attaquer par un canard sauvage, la vente de votre histoire à la presse vous rapporte",
      averageAmount: 50,
  },
  {
      text: "Riche homme d’affaire, vous êtes le patron de plusieurs boîtes de nuit. Le confinement est arrivé... Vous perdez",
      averageAmount: -40,
  },
  {
      text: "Vous vous battez dans la rue mais vous faites chopper par la police qui vous donne une amende de",
      averageAmount: -20,
  },
  {
      text: "Votre vielle belle mère que tout le monde déteste est (enfin) morte et l'héritage vous raporte",
      averageAmount: 60,
  },
  {
      text: "Votre ordinateur est cassé, le coût des réparations s’élève à",
      averageAmount: -80,
  },
  {
      text: "Vous avez fait de l'achat-revente avec des photos de vaches ! Ce n'était peut-être pas une bonne idée ! Personne ne les a racheté... Vous avez perdu au total",
      averageAmount: -60,
  },
  {
      text: "Vous avez volé une Lamborghini et réussi à la vendre, cela vous rapporte",
      averageAmount: 80,
  },
  {
      text: "Votre ordinateur est cassé, le coût des réparations s’élève à",
      averageAmount: -90,
  },
  {
      text: "Un soir, torse nu comme un mongol, vous insultiez les passants qui passaient. Un passant souhaitant que vous le laissiez tranquille, vous donna",
      averageAmount: 70,
  },
  {
      text: "Vous vous reveillez un matin, levez les yeux vers votre armoire à bijoux ainsi taggée : J’prends la moula et arrivederci ! La valeur de vos bijoux étaient de",
      averageAmount: -50,
  },
  {
      text: "Vous avez été forcé de travailler comme Community Manager d’un haut fonctionnaire que vous détestez. Le respect c’est coûteux comme la came, la vengeance est glacée. Vous le détroussez et vous enfuyez avec",
      averageAmount: 100,
  },
  {
      text: "Vous êtes partis vivre comme un ermite dans la forêt, perdez",
      averageAmount: -30,
  },

  
  
];

module.exports = { CrimeResponses };