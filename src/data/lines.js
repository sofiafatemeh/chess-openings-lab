export const CATEGORIES = [
  { id: "openings", label: "Ouvertures (Blancs)", side: "white" },
  { id: "defenses", label: "Défenses (Noirs)", side: "black" },
  { id: "systems", label: "Systèmes", side: "either" },
];

// moves: line in SAN from start position
export const LINES = {
  openings: [
    { name: "Italienne (Giuoco Piano)", eco: "C50", moves: "e4 e5 Nf3 Nc6 Bc4", desc: "Développement naturel, attaque rapide sur f7. Le classique absolu pour débuter avec les Blancs." },
    { name: "Espagnole (Ruy Lopez)", eco: "C60", moves: "e4 e5 Nf3 Nc6 Bb5", desc: "L'ouverture la plus solide des Blancs, pression durable sur le cavalier c6. Jouée par tous les champions du monde." },
    { name: "Jeu écossais", eco: "C45", moves: "e4 e5 Nf3 Nc6 d4", desc: "Ouverture immédiate du centre, positions vives et concrètes. Très populaire au haut niveau moderne." },
    { name: "Anglaise", eco: "A10", moves: "c4", desc: "Contrôle de d5 sans exposer immédiatement le pion e. Flexible, positionnelle, redoutable entre de bonnes mains." },
    { name: "Gambit de la Dame", eco: "D06", moves: "d4 d5 c4", desc: "Le meilleur gambit « son » : échange structurel favorable contre un pion temporairement sacrifié. Base de tout répertoire fermé." },
    { name: "Attaque du Levant (Richter-Veresov)", eco: "D01", moves: "d4 d5 Nc3 Bg5", desc: "Développement agressif, pressions rapides sur le centre noir. Moins théorisée, parfaite pour surprendre." },
    { name: "Ouverture du pion Roi", eco: "C20", moves: "e4 e5", desc: "La plus ancienne des ouvertures. Combat direct pour le centre, mène aux grandes lignes classiques." },
    { name: "Début Viennois", eco: "C25", moves: "e4 e5 Nc3", desc: "Préparation d'une poussée f4, style Gambit Roi sans le gambit. Aigue et trompeuse." },
    { name: "Réti", eco: "A05", moves: "Nf3 d5 c4", desc: "Hypermoderne : contrôle du centre à distance, transpositions multiples. Flexible à l'extrême." },
    { name: "Gambit Roi accepté", eco: "C33", moves: "e4 e5 f4 exf4", desc: "Attaque directe dès le 2e coup. Spectaculaire, à connaître absolument en tactique." },
  ],
  defenses: [
    { name: "Défense Sicilienne", eco: "B20", moves: "e4 c5", desc: "La meilleure défense contre 1.e4 : contre-attaque asymétrique, le pion d4 affaibli. Choix n°1 des attaquants." },
    { name: "Défense Française", eco: "C00", moves: "e4 e6", desc: "Solide et stratégique : structure solide, visée du pion d4, pièce mauvaise dame-aile à gérer." },
    { name: "Défense Caro-Kann", eco: "B10", moves: "e4 c6", desc: "Solide comme la Française mais sans fermer le Fou c8. Excellent pour les joueurs positionnels." },
    { name: "Défense Pirc", eco: "B07", moves: "e4 d6", desc: "Hypermoderne : laisser les Blancs prendre le centre pour le miner ensuite. Redoutable en pratique." },
    { name: "Défense Est-Indienne", eco: "E60", moves: "d4 Nf6 c4 g6", desc: "La défense moderne par excellence contre d4 : fianchetto roi, contre-jeu dynamique." },
    { name: "Défense Slave", eco: "D10", moves: "d4 d5 c4 c6", desc: "Solide et fiable, soutient d5 sans fermer le Fou c8. Très jouée au top niveau." },
    { name: "Défense Grünfeld", eco: "D80", moves: "d4 Nf6 c4 g6 Nc3 d5", desc: "Contre-attaque tranchante : inviter les Blancs à construire un centre pour le démolir par ...d5." },
    { name: "Défense Nimzo-Indienne", eco: "E20", moves: "d4 Nf6 c4 e6 Nc3 Bb4", desc: "La défense la plus respectée contre d4 : pression sur c3, structures riches, validée par tous les champions." },
    { name: "Défense Berlinoise (Espagnole)", eco: "C65", moves: "e4 e5 Nf3 Nc6 Bb5 Nf6", desc: "Le mur antiblancs moderne : la variante Berlin, réputée infranchissable au plus haut niveau." },
    { name: "Défense Hollandaise", eco: "A80", moves: "d4 f5", desc: "Agressive et pointue : contrôle e4 dès le premier coup, mais structure risquée. Pour les audacieux." },
  ],
  systems: [
    { name: "Système Londres", eco: "D02", moves: "d4 d5 Nf3 Nf6 Bf4", desc: "Le système anti-tout préféré des club players : même plan contre presque tout. Efficace et peu théorisé." },
    { name: "Attaque Colle", eco: "D03", moves: "d4 d5 Nf3 Nf6 e3 Bf4", desc: "Version classique du London : structure saine puis poussée e4 en bloc. Simple et dangereuse." },
    { name: "Attaque Torrent (Barry)", eco: "D00", moves: "d4 Nf6 Nc3 d5 Bf4", desc: "Développement rapide, grand roque et mat sur h. Système d'attaque brutal et trompeur." },
    { name: "Système du Hedgehog", eco: "A30", moves: "c4 Nf6 Nc3 c5 g3 b6", desc: "Piquant défensif : structure compacte de pions en 3e rangée, contre-attaque éclatante par d5/b4." },
    { name: "Attaque Est-Indienne du Roi", eco: "E60", moves: "d4 Nf6 c4 g6 Nc3 Bg7 e4 d6", desc: "Le système dynamique le plus joué : centre compact, puis tempête pion-dame avec attaque sur le roi." },
    { name: "Système Catalan", eco: "E00", moves: "d4 Nf6 c4 e6 g3", desc: "Fianchetto + Gambit Dame : pression silencieuse sur la grande diagonale, élégant et solide." },
    { name: "Système Botvinnik (Anglaise clôturée)", eco: "A17", moves: "c4 Nf6 Nc3 e6 g3 d5 d4", desc: "Mélange Anglaise + Catalane, structure riche en plans.clairs. Signature de Karpov." },
    { name: "Attaque Par-Advantage (Hippopotame)", eco: "B06", moves: "g3 d6 Bg2 Nf6", desc: "Le célèbre Hippopotame : tout en 3e rangée, hypermoderne absolu. Surprend et étouffe." },
    { name: "Système Méran (QGD Soncs)", eco: "D31", moves: "d4 d5 c4 e6 Nc3 Nf6 e3 c5", desc: "Contre-attaque centrale dans le Gambit Dame : libération rapide par c5 et b5." },
    { name: "Attaque Marshall (Espagnole)", eco: "C89", moves: "e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O d4 exd4", desc: "Le gambit du Marshall : sacrifice du pion e5 pour une initiative dévastatrice. Un classique de la contre-attaque." },
  ],
};
