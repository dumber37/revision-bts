// Gestion opérationnelle (E5)

R.fiche({
  id: 'fixation-prix',
  matiere: 'gestion',
  titre: 'La fixation du prix',
  resume: 'Contraintes économiques et légales, prix d’acceptabilité, élasticité, stratégies, calculatrices.',
  date: '2026-10-05',
  contenu: `
    <h2>Le prix, critère de choix</h2>
    <div class="cartes">
      <div><b>Sensibilité au prix</b><p>Plus forte pour les achats courants et pour les produits à forte image (luxe).</p></div>
      <div><b>Valeur client</b><p>Prix et valeur sont différents : le prix accepté dépend de la valeur perçue (ex. iPhone).</p></div>
    </div>

    <h2>La contrainte économique</h2>
    <p>Le prix doit couvrir toutes les charges et dégager un profit. Exemple, un paquet de pâtes :</p>
    <div class="barre" data-parts="Coût d'achat|70|ce que le magasin paie au fournisseur;Transport|3|acheminement jusqu'au magasin;Démarque|1|connue (casse, péremption) ou inconnue (vol, erreurs);Marge|20,5|ce qui reste au distributeur pour ses charges et son profit;TVA|5,5|taux réduit des produits alimentaires, reversé à l'État"></div>
    <div class="formule">Prix public = coût d'achat + transport + démarque + marge + taxes</div>

    <h2>Les contraintes légales</h2>
    <p>Principe : les prix sont libres. Exceptions : secteurs réglementés (livres, taxis, électricité, péages) ou circonstances exceptionnelles (gel hydroalcoolique plafonné à 3 € les 100 ml).</p>
    <table>
      <tr><th>Règle</th><th>À retenir</th><th>Exemple</th></tr>
      <tr><td>Prix imposé</td><td>Interdit (prix conseillé seulement)</td><td>—</td></tr>
      <tr><td>Prix d'appel</td><td>Interdit si le stock est insuffisant</td><td>Lidl</td></tr>
      <tr><td>Vente à perte</td><td>Interdite (sauf soldes, périssables, saisonnier)</td><td>—</td></tr>
      <tr><td>Discrimination</td><td>Interdite sauf montant d'achat négocié</td><td>Apple (1,1 Md€)</td></tr>
      <tr><td>Refus de vente</td><td>Interdit envers un particulier</td><td>—</td></tr>
      <tr><td>Information</td><td>Prix visible, lisible, TTC, prix à l'unité</td><td>—</td></tr>
    </table>

    <h2>Méthode 1 : le prix d'acceptabilité</h2>
    <p>Sondage de la cible avec 2 questions :</p>
    <ul>
      <li>« À partir de quel prix est-ce trop cher ? »</li>
      <li>« En dessous de quel prix est-ce de mauvaise qualité ? »</li>
    </ul>
    <p>On retient le prix accepté par le plus de personnes. <b>Limites :</b> déclaratif, hors situation d'achat, regarde le CA mais pas la marge.</p>

    <h2>Méthode 2 : l'élasticité de la demande</h2>
    <div class="formule"><b>E</b> = % variation demande ÷ % variation prix (valeur absolue)<br><b>% variation</b> = (après − avant) ÷ avant</div>
    <div class="chiffres">
      <div><b>Très élastique</b><strong>E &gt; 1</strong><span>Les clients réagissent fort au prix.</span></div>
      <div><b>Peu élastique</b><strong>E &lt; 1</strong><span>Les clients réagissent peu au prix.</span></div>
      <div><b>Unitaire</b><strong>E = 1</strong><span>La demande varie comme le prix.</span></div>
    </div>
    <p class="situation"><b>Fil rouge Sport'Tours :</b> Léa monte le prix des gourdes de 10 € à 10,50 €. Sur le trimestre, les ventes passent de 1 000 à 850. Les clients sont-ils sensibles au prix ? Change les chiffres pour tester d'autres cas.</p>
    <div data-calc="elasticite"></div>

    <h2>Stratégies face à la concurrence</h2>
    <div class="cartes">
      <div><b>Écrémage</b><p>Prix élevé, forte marge, petits volumes. Luxe ou avance technologique. Ex. Red Bull.</p></div>
      <div><b>Pénétration</b><p>Prix bas, gros volumes. Ex. Free Mobile.</p></div>
      <div><b>Alignement</b><p>Même prix que les concurrents, sans entente. Ex. Fnac Darty.</p></div>
      <div><b>Yield management</b><p>Prix variable en temps réel selon la demande, surtout pour les services (avion, TGV, hôtel). Ex. SNCF.</p></div>
    </div>

    <h2>Les modulations de prix du distributeur</h2>
    <div class="cartes">
      <div><b>Rabais</b><p>Produit défectueux ou déclassé.</p></div>
      <div><b>Remise</b><p>Selon la taille de la commande ou le statut du client.</p></div>
      <div><b>Ristourne</b><p>Selon le volume acheté sur une période.</p></div>
      <div><b>Prix promo</b><p>Baisse temporaire du prix.</p></div>
      <div><b>Escompte</b><p>Réduction pour paiement comptant.</p></div>
    </div>
    <p><b>Différenciation :</b> tarifs multidimensionnels (heure, saison), tarifs selon la quantité, bundling (offre groupée).</p>

    <h2>Calculs de marge (souvent à l'examen)</h2>
    <p class="situation"><b>Fil rouge Sport'Tours :</b> Léa achète une paire de chaussures de running 40 € HT et la vend 60 € HT (72 € TTC). Calcule sa marge, ses taux et son coefficient, puis change les prix.</p>
    <div data-calc="marge"></div>
  `
});

R.fiche({
  id: 'fournisseurs',
  matiere: 'gestion',
  titre: 'Les fournisseurs et la relation commerciale',
  resume: 'Sélection en 8 étapes, scoring, enjeux de la négociation, cadre juridique, coopération.',
  date: '2026-10-05',
  contenu: `
    <h2>Sélectionner un fournisseur en 8 étapes</h2>
    <ol class="etapes">
      <li><b>Critères de sélection</b><p>Décider sur quoi on va juger : compétences et fiabilité, capacités de production, engagement (qualité, délais), contrôle qualité, ressources financières, tarifs.</p></li>
      <li><b>Cahier des charges</b><p>Décrire précisément le besoin : produit, quantités, qualité, délais, conditions.</p></li>
      <li><b>Appel d'offres</b><p>Envoyer le cahier des charges à plusieurs fournisseurs pour les mettre en concurrence.</p></li>
      <li><b>Examen des offres</b><p>Comparer les réponses, par exemple avec la méthode du scoring.</p></li>
      <li><b>Négociation</b><p>Discuter prix, délais, services, promotions avec les meilleurs candidats.</p></li>
      <li><b>Choix du fournisseur</b><p>Retenir celui qui a la meilleure note après négociation.</p></li>
      <li><b>Signature du contrat</b><p>Mettre par écrit les engagements des deux parties (convention annuelle).</p></li>
      <li><b>Début de la relation</b><p>Premières commandes, puis suivi de la qualité et des délais.</p></li>
    </ol>

    <h2>Le scoring : choisir avec une note pondérée</h2>
    <ol>
      <li>Choisir les critères.</li>
      <li>Les pondérer (coefficient).</li>
      <li>Noter chaque fournisseur.</li>
      <li>Calculer la note pondérée : le meilleur total gagne.</li>
    </ol>
    <div class="formule"><b>Note pondérée</b> = Σ (note × coefficient)</div>
    <p class="exemple"><b>Ex. fournisseur C :</b> 5 × 60 % + 2 × 40 % = 3,8.<br>
    <b>Exercice</b> (qualité et prix coef. 2) : Durax 15, Helpon 15, <b>Astoa 17</b>, Socx 13. On retient Astoa.</p>
    <p class="situation"><b>Fil rouge Sport'Tours :</b> Léa compare trois fournisseurs de ballons (A, B, C) sur 4 critères, notés sur 5. La qualité et le prix comptent double. Change les notes pour voir qui l'emporte.</p>
    <div data-calc="scoring"></div>

    <h2>Les enjeux de la négociation</h2>
    <table>
      <tr><th>Sujet</th><th>Distributeur</th><th>Fournisseur</th></tr>
      <tr><td>CGV</td><td>Prix bas et services en plus</td><td>Prix élevés</td></tr>
      <tr><td>Promotions</td><td>Les meilleures, payées par le fournisseur</td><td>Préserver son image</td></tr>
      <tr><td>Mise en valeur</td><td>Mettre ses MDD en avant</td><td>Meilleure place en rayon</td></tr>
      <tr><td>Marques</td><td>Vendre ses MDD (meilleure marge)</td><td>Valoriser ses produits</td></tr>
      <tr><td>Retours</td><td>Reprise des invendus</td><td>Vente définitive</td></tr>
    </table>
    <p>CGV : conditions générales de vente. MDD : marques de distributeur.</p>

    <h2>Le cadre juridique des négociations</h2>
    <div class="cartes">
      <div><b>Interdits</b><p>Revente à perte (sous le prix de la facture), prix imposés, refus de vente à un particulier.</p></div>
      <div><b>Délai de paiement</b><p>30 jours après réception, ou 45 jours fin de mois par dérogation (version du cours).</p></div>
      <div><b>Contrats et CGV</b><p>Référencement par contrat, préavis en cas de déréférencement. CGV données à tout acheteur qui les demande, tarifs négociés chaque année par convention écrite.</p></div>
      <div><b>Promos alimentaires</b><p>Maximum 34 % du prix et 25 % du stock. Le mot « gratuit » est interdit : on dit « offert ».</p></div>
    </div>
    <p><b>Pratiques discriminatoires :</b> les tarifs doivent être liés à des contreparties (remises pour les meilleurs clients).</p>
    <div class="attention"><b>Délai de paiement :</b> si un délai est convenu entre les deux, la loi le plafonne à 60 jours après la date de facture, ou 45 jours fin de mois. Vérifie quelle version ton prof attend.</div>

    <h2>La coopération commerciale</h2>
    <div class="cartes">
      <div><b>EDI</b><p>Échange de données informatisé : commandes et factures automatisées, moins d'erreurs et de coûts.</p></div>
      <div><b>SRM</b><p>Gestion de la relation fournisseur : mêmes outils, mêmes informations, meilleures conditions.</p></div>
      <div><b>SCM</b><p>Gestion de la chaîne logistique : optimise les flux et anticipe les besoins.</p></div>
      <div><b>ECR</b><p>Réponse optimale au consommateur : le bon produit, au bon moment, au bon prix. Assortiment commun, co-organisation des rayons, co-animation.</p></div>
      <div><b>Category management</b><p>Regrouper les produits par univers, à partir d'une segmentation (lieu, cible).</p></div>
    </div>
  `
});

R.fiche({
  id: 'boite-outils',
  matiere: 'gestion',
  titre: 'La boîte à outils du gestionnaire',
  resume: 'Les 8 leviers de performance, évolutions, parts, HT/TTC, remises, marges et prix, commentaire en trois temps.',
  date: '2026-11-16',
  contenu: `
    <h2>Les 8 leviers de performance</h2>
    <p>Tout le bloc 3 s’organise autour de huit leviers. À l’examen, <b>nommer le levier</b> après un calcul rapporte des points.</p>
    <div class="cartes">
      <div><b>Levier 1</b><p>Le chiffre d’affaires.</p></div>
      <div><b>Levier 2</b><p>La fidélité des clients.</p></div>
      <div><b>Levier 3</b><p>La baisse des coûts.</p></div>
      <div><b>Levier 4</b><p>L’optimisation des ressources (le temps de l’équipe, la place).</p></div>
      <div><b>Levier 5</b><p>Les créances clients (ce que les clients doivent).</p></div>
      <div><b>Levier 6</b><p>Les dettes fournisseurs (ce que l’on doit aux fournisseurs).</p></div>
      <div><b>Levier 7</b><p>Les stocks.</p></div>
      <div><b>Levier 8</b><p>Investir intelligemment.</p></div>
    </div>
    <div class="attention">Les leviers tirent souvent en sens contraire : moins de stock (levier 7) augmente le risque de rupture, donc de perte de clients (levier 2). Le dire montre que l’on a compris.</div>

    <h2>Le taux d’évolution</h2>
    <div class="formule">Taux d’évolution = (valeur d’arrivée − valeur de départ) ÷ valeur de départ × 100</div>
    <p class="exemple"><b>Sport Loire :</b> CA de 380 000 € à 408 500 € = <b>+7,5 %</b>. Marge de 152 000 € à 144 400 € = <b>−5 %</b>. Le magasin vend plus mais gagne moins : la marge passe de 40 % à 35,3 % du CA (prix baissés ou coûts d’achat en hausse non répercutés).</p>
    <p><b>Piège :</b> diviser par la valeur d’arrivée. C’est la question « que peut-on en conclure ? » qui rapporte le plus.</p>

    <h2>Les parts</h2>
    <div class="formule">Part = partie ÷ total × 100 &nbsp;·&nbsp; Total = partie ÷ part</div>
    <p class="exemple">Inès 54 000 € sur 120 000 € = <b>45 %</b>. Lucas fait 27 000 €, soit 18 % de son magasin : total = 27 000 ÷ 0,18 = <b>150 000 €</b> (et non 27 000 × 0,18). Le total est toujours plus grand que la partie.</p>

    <h2>HT et TTC</h2>
    <div class="formule">TTC = HT × (1 + taux de TVA) &nbsp;·&nbsp; HT = TTC ÷ (1 + taux de TVA)</div>
    <p class="exemple">85 € HT × 1,20 = <b>102 € TTC</b>. 126,60 € TTC ÷ 1,055 = <b>120 € HT</b>.</p>
    <p><b>Piège :</b> retirer 5,5 % au TTC (126,60 − 5,5 % = 119,64 €) : faux, la TVA se calcule sur le HT.</p>

    <h2>Les remises</h2>
    <div class="formule">Net = brut × (1 − taux) &nbsp;·&nbsp; Brut = net ÷ (1 − taux)</div>
    <ul>
      <li>Remise de 12 % sur 250 € : 250 × 0,88 = <b>220 €</b>.</li>
      <li>Payé 391 € après 15 % : 391 ÷ 0,85 = <b>460 €</b> (et non 391 × 1,15).</li>
      <li><b>Remises successives</b> 10 % puis 5 % sur 1 000 € : 1 000 × 0,90 × 0,95 = 855 €, soit <b>14,5 %</b> de remise globale, pas 15 % : la 2<sup>e</sup> remise porte sur un montant déjà réduit.</li>
    </ul>

    <h2>Marges et prix de vente</h2>
    <table>
      <tr><th>Notion</th><th>Formule</th></tr>
      <tr><td>Coût d’achat HT</td><td>Prix d’achat + frais (transport…)</td></tr>
      <tr><td>Marge commerciale</td><td>Prix de vente HT − coût d’achat HT</td></tr>
      <tr><td>Taux de marge</td><td>Marge ÷ coût d’achat HT × 100</td></tr>
      <tr><td>Taux de marque</td><td>Marge ÷ prix de vente HT × 100</td></tr>
      <tr><td>Coefficient multiplicateur</td><td>Prix de vente TTC ÷ coût d’achat HT</td></tr>
      <tr><td>PV HT avec un taux de marque</td><td>Coût d’achat ÷ (1 − taux de marque)</td></tr>
      <tr><td>PV HT avec un taux de marge</td><td>Coût d’achat × (1 + taux de marge)</td></tr>
    </table>
    <p class="exemple"><b>Montre :</b> 48 € + 2 € de transport = 50 € de coût d’achat. Vendue 90 € TTC, soit 75 € HT. Marge 25 €, taux de marge 50 %, taux de marque 33,3 %, coefficient 1,8. <b>Pièges :</b> oublier le transport ; calculer la marge sur le TTC.</p>
    <div data-calc="marge" data-valeurs="pa=50;pv=75;tva=20"></div>
    <p class="situation"><b>Le piège du sac de sport (A6) :</b> coût d’achat 32 €. Taux de <b>marque</b> de 36 % : 32 ÷ 0,64 = <b>50 € HT</b> (60 € TTC). Un vendeur qui comprend taux de <b>marge</b> fixe 32 × 1,36 = 43,52 € : la confusion coûte <b>6,48 € par sac</b>.</p>
    <div data-calc="prixvente"></div>

    <h2>Commenter un résultat en trois temps</h2>
    <ol class="etapes">
      <li><b>Fait</b><p>Ce que disent les chiffres, avec les valeurs : « le coût passe de 2 240 € à 832 €, soit −63 % ».</p></li>
      <li><b>Sens</b><p>Ce que cela signifie et pourquoi : quel coût baisse, quel argent est libéré, quel levier est actionné.</p></li>
      <li><b>Recommandation</b><p>Ce qu’il faut faire, avec un seuil ou une condition : « passer à 10 commandes et vérifier que le fournisseur accepte ».</p></li>
    </ol>
    <p>Toujours écrire <b>le calcul avant le résultat</b>. Par convention, une année compte <b>360 jours</b> et un mois 30 jours.</p>
  `
});

R.fiche({
  id: 'approvisionnements',
  matiere: 'gestion',
  titre: 'Les approvisionnements : rythme, Wilson et cadencier',
  resume: 'Coûts de passation et de possession, stocks minimum, de sécurité et d’alerte, modèle de Wilson, cadencier.',
  date: '2026-11-19',
  contenu: `
    <h2>Les deux coûts d’un approvisionnement</h2>
    <div class="cartes">
      <div><b>Coût de passation</b><p>Ce que coûte le fait de passer une commande (temps, transmission, réception). Total = nombre de commandes × coût d’une commande. Augmente si l’on commande souvent.</p></div>
      <div><b>Coût de possession</b><p>Ce que coûte le stock qui dort (argent immobilisé, place, assurance, péremption). Total = stock moyen en valeur × taux de possession. Augmente si l’on commande rarement.</p></div>
    </div>
    <div class="formule">Q = consommation ÷ N &nbsp;·&nbsp; Stock moyen = Q ÷ 2<br>
    Coût de possession = (Q ÷ 2) × coût d’achat unitaire × taux de possession<br>
    Coût de passation = N × coût d’une commande &nbsp;·&nbsp; <b>Coût total = possession + passation</b></div>
    <p class="exemple"><b>Gourdes Sport Loire</b> (7 200 par an, 8 €, 40 € par commande, 15 %) :</p>
    <table>
      <tr><th>Commandes par an</th><th>2</th><th>6</th><th>10</th><th>12</th><th>24</th></tr>
      <tr><td>Quantité par commande</td><td>3 600</td><td>1 200</td><td>720</td><td>600</td><td>300</td></tr>
      <tr><td>Coût de possession</td><td>2 160 €</td><td>720 €</td><td>432 €</td><td>360 €</td><td>180 €</td></tr>
      <tr><td>Coût de passation</td><td>80 €</td><td>240 €</td><td>400 €</td><td>480 €</td><td>960 €</td></tr>
      <tr><td><b>Coût total</b></td><td>2 240 €</td><td>960 €</td><td><b>832 €</b></td><td>840 €</td><td>1 140 €</td></tr>
    </table>
    <p>La courbe du coût total a une forme de <b>U</b>. Passer de 2 à 10 commandes économise 1 408 € par an (−62,9 %) et libère 11 520 € de trésorerie. Si commander coûte moins cher (40 € → 10 €), on commande plus souvent (20 fois) et on stocke moins : c’est la logique du <b>flux tendu</b>.</p>

    <h2>Quand commander : les stocks de référence</h2>
    <div class="cartes">
      <div><b>Stock minimum</b><p>Ventes par jour × délai de livraison : de quoi tenir jusqu’à l’arrivée de la commande.</p></div>
      <div><b>Stock de sécurité</b><p>Ventes par jour × nombre de jours de sécurité : la réserve contre un retard ou un pic de ventes.</p></div>
      <div><b>Stock d’alerte</b><p>Stock minimum + stock de sécurité : quand on l’atteint, on passe commande.</p></div>
      <div><b>Nombre maximum de commandes</b><p>Consommation ÷ stock minimum : chaque livraison doit couvrir au moins le délai de livraison.</p></div>
    </div>
    <p class="exemple"><b>Gourdes :</b> 7 200 ÷ 360 = 20 par jour. Délai 9 jours : stock minimum 180. Sécurité 3 jours : 60. <b>Stock d’alerte 240</b>. Maximum 7 200 ÷ 180 = 40 commandes par an.</p>

    <h2>Demande régulière : le modèle de Wilson</h2>
    <div class="formule"><b>N = √[ (C × PU × T) ÷ (2 × P) ]</b> &nbsp;·&nbsp; <b>Q = C ÷ N</b><br>
    C : consommation · PU : coût d’achat unitaire · T : taux de possession · P : coût d’une commande</div>
    <p>Le coût total est au plus bas quand <b>coût de passation = coût de possession</b>. La formule donne directement ce point, sans tester les rythmes un par un.</p>
    <p class="situation"><b>Café de l’Épicerie des Halles :</b> 3 600 paquets, 5 € HT, 20 %, 18 € par commande. 3 600 × 5 × 0,20 = 3 600 ; 2 × 18 = 36 ; 3 600 ÷ 36 = 100 ; <b>N = 10</b> commandes de <b>Q = 360</b> paquets. Possession = 180 × 5 × 0,20 = 180 € = passation 10 × 18 = 180 €. Total 360 €, contre 366 € avec 12 commandes.</p>
    <div data-calc="wilson"></div>
    <p><b>Résultat à virgule</b> (ex. gourdes : N = √108 = 10,39) : à l’examen, on <b>arrondit à l’entier supérieur</b> (11), sauf consigne contraire. En entreprise, on compare les deux entiers voisins (832 € pour 10, 832,73 € pour 11).</p>
    <p><b>Erreurs fréquentes :</b> oublier le 2 au dénominateur, oublier la racine, saisir 15 au lieu de 0,15.</p>
    <h3>Les limites du modèle (à citer après le calcul)</h3>
    <ol class="etapes" data-libre>
      <li><b>Demande régulière</b><p>Inutilisable pour un produit saisonnier, une promotion ou un lancement.</p></li>
      <li><b>Prix constant</b><p>Il ignore les remises par quantité (ex. 3 % dès 1 000 ballons : la remise peut l’emporter).</p></li>
      <li><b>Livraison libre</b><p>Il ignore les lots imposés et les minimums de commande.</p></li>
      <li><b>Stockage illimité</b><p>Il ignore la place en réserve et la péremption.</p></li>
    </ol>
    <p>Wilson donne un <b>ordre de grandeur</b>, pas un ordre de mission. Leviers : baisse des coûts (3) et stocks (7). C’est le stock de sécurité qui protège la fidélité (2).</p>

    <h2>Demande irrégulière : le cadencier</h2>
    <p>Produit saisonnier, promotion, lancement : on construit un tableau période par période.</p>
    <table>
      <tr><th>Ligne</th><th>Calcul</th></tr>
      <tr><td>A. Prévisions de ventes</td><td>Données</td></tr>
      <tr><td>B. Stock de sécurité</td><td>Donné</td></tr>
      <tr><td>C. Besoin</td><td>A + B</td></tr>
      <tr><td>D. Stock initial</td><td>Stock final de la période précédente</td></tr>
      <tr><td>E. Livraison ?</td><td>Oui si stock initial &lt; besoin</td></tr>
      <tr><td>F. Quantité livrée</td><td>Besoin − stock initial, <b>arrondi au lot supérieur</b></td></tr>
      <tr><td>G. Stock final</td><td>D + F − <b>A</b> (les ventes, pas le besoin)</td></tr>
      <tr><td>H. Date de commande</td><td>Date de livraison − délai</td></tr>
    </table>
    <div class="attention">Le stock final se calcule avec les <b>ventes prévues</b> : le stock de sécurité n’est pas vendu, il reste en rayon.</div>

    <h3>1. Le magasin choisit ses dates : le point de commande</h3>
    <p class="exemple"><b>Coffret « Gourmand » :</b> stock au 30/11 = 10, sécurité 5, lots de 12, livraison une semaine après la commande.</p>
    <table>
      <tr><th></th><th>S1 (30/11)</th><th>S2 (07/12)</th><th>S3 (14/12)</th><th>S4 (21/12)</th></tr>
      <tr><td>Ventes prévues</td><td>20</td><td>35</td><td>60</td><td>15</td></tr>
      <tr><td>Besoin</td><td>25</td><td>40</td><td>65</td><td>20</td></tr>
      <tr><td>Stock initial</td><td>10</td><td>14</td><td>15</td><td>15</td></tr>
      <tr><td>Quantité livrée</td><td>24</td><td>36</td><td>60</td><td>12</td></tr>
      <tr><td>Stock final</td><td>14</td><td>15</td><td>15</td><td>12</td></tr>
      <tr><td>Commande le</td><td>23/11</td><td>30/11</td><td>07/12</td><td>14/12</td></tr>
    </table>
    <p>S3 : besoin 65, manque 50, 50 ÷ 12 = 4,17 donc <b>5 lots</b> = 60. Stock final 15 + 60 − 60 = 15.</p>

    <h3>2. Le fournisseur impose ses dates : la gestion calendaire</h3>
    <p>Livraisons en S1 et S3 seulement : chaque livraison couvre les ventes jusqu’à la suivante.</p>
    <table>
      <tr><th></th><th>S1 (30/11)</th><th>S2 (07/12)</th><th>S3 (14/12)</th><th>S4 (21/12)</th></tr>
      <tr><td>Ventes prévues</td><td>20</td><td>35</td><td>60</td><td>15</td></tr>
      <tr><td>Besoin</td><td>60</td><td>—</td><td>80</td><td>—</td></tr>
      <tr><td>Stock initial</td><td>10</td><td>50</td><td>15</td><td>27</td></tr>
      <tr><td>Quantité livrée</td><td>60</td><td>0</td><td>72</td><td>0</td></tr>
      <tr><td>Stock final</td><td>50</td><td>15</td><td>27</td><td>12</td></tr>
    </table>
    <p>S1 : besoin = 20 + 35 + 5 = 60. S3 : 60 + 15 + 5 = 80, manque 65, soit 6 lots = 72.</p>
    <p><b>Comparaison :</b> même total livré (132 coffrets), mais stock final moyen de <b>14</b> contre <b>26</b>. Quand le fournisseur impose son calendrier, le magasin porte plus de stock : la fréquence de livraison <b>se négocie</b>, comme le prix et le délai de paiement (levier 6).</p>
    <p>Leviers : fidélité (2) et chiffre d’affaires (1), le produit est là le bon jour ; stocks (7). Un cadencier ne vaut que ce que valent les prévisions.</p>
    <div class="attention"><b>Erreurs fréquentes :</b> stock final calculé avec le besoin ; arrondi au lot inférieur ; en gestion calendaire, oublier d’ajouter les ventes de la semaine sans livraison.</div>
  `
});

R.fiche({
  id: 'gestion-stocks',
  matiere: 'gestion',
  titre: 'La gestion des stocks',
  resume: 'Inventaire et démarque, fiche de stock et coût moyen pondéré, méthode des 20/80, rotation et durée de stockage.',
  date: '2026-11-19',
  contenu: `
    <h2>L’inventaire : le seul stock vrai</h2>
    <div class="cartes">
      <div><b>Stock théorique</b><p>Calculé par le logiciel : stock de départ + livraisons saisies − ventes en caisse. Il ignore ce qui n’a pas été saisi.</p></div>
      <div><b>Stock réel</b><p>Compté physiquement en rayon et en réserve (l’inventaire). Après l’inventaire, c’est lui qui fait foi : le logiciel est corrigé.</p></div>
      <div><b>Démarque</b><p>Stock réel inférieur au théorique : vol, casse, péremption, erreur de caisse, livraison incomplète non signalée.</p></div>
      <div><b>Surmarque</b><p>Stock réel supérieur au théorique : erreur de saisie, livraison non enregistrée, retour client non saisi.</p></div>
      <div><b>Démarque connue</b><p>On en connaît la cause (produit cassé et noté).</p></div>
      <div><b>Démarque inconnue</b><p>Découverte sans explication ; le vol en est la première cause.</p></div>
    </div>
    <div class="formule">Démarque = stock théorique − stock réel &nbsp;·&nbsp; Valeur = quantité × coût d’achat</div>
    <p class="exemple">Logiciel : 46 coffrets, comptage : 43. Démarque de 3 × 22 € = <b>66 €</b>, logiciel corrigé à 43.<br>
    Rayon running : Trail X −3 × 60 € = 180 € et montre −2 × 50 € = 100 €, soit <b>280 € de démarque</b>. La gourde +3 est une <b>surmarque</b> de 24 € : elle <b>ne se compense pas</b>, c’est une autre erreur à expliquer.</p>
    <table>
      <tr><th>Inventaire</th><th>Principe</th><th>Avantage</th><th>Limite</th></tr>
      <tr><td>Complet</td><td>Tout compter en une fois</td><td>Photographie exacte</td><td>Long, coûteux, souvent magasin fermé</td></tr>
      <tr><td>Tournant</td><td>Quelques références à tour de rôle toute l’année</td><td>Pas de fermeture, erreurs vues vite</td><td>Logiciel et rigueur nécessaires</td></tr>
    </table>
    <p>Au moins <b>un inventaire par an</b> : obligation légale (comptabilité). Leviers : baisse des coûts (3), mesurer la démarque pour la réduire ; fidélité (2), un stock faux fait promettre un produit absent.</p>

    <h2>Valoriser le stock : la fiche de stock et le CMP</h2>
    <div class="formule"><b>CMP</b> = valeur totale (stock initial + entrées) ÷ quantité totale (stock initial + entrées)</div>
    <p>« Pondéré » : chaque prix compte selon la quantité achetée à ce prix. Ce n’est <b>pas</b> la moyenne simple des prix.</p>
    <p class="exemple"><b>Café, novembre</b> (CMP de fin de période) :</p>
    <table>
      <tr><th>Date</th><th>Libellé</th><th>Entrée</th><th>PU</th><th>Valeur</th><th>Sortie</th><th>Valeur</th><th>Stock</th></tr>
      <tr><td>01/11</td><td>Stock initial</td><td>200</td><td>5,00</td><td>1 000</td><td></td><td></td><td>200</td></tr>
      <tr><td>05/11</td><td>BE n° 41</td><td>400</td><td>5,25</td><td>2 100</td><td></td><td></td><td>600</td></tr>
      <tr><td>12/11</td><td>BS n° 87</td><td></td><td></td><td></td><td>300</td><td>1 575</td><td>300</td></tr>
      <tr><td>18/11</td><td>BE n° 42</td><td>200</td><td>5,50</td><td>1 100</td><td></td><td></td><td>500</td></tr>
      <tr><td>26/11</td><td>BS n° 88</td><td></td><td></td><td></td><td>320</td><td>1 680</td><td>180</td></tr>
      <tr><td>30/11</td><td><b>Total</b></td><td>800</td><td><b>5,25</b></td><td>4 200</td><td>620</td><td>3 255</td><td>180</td></tr>
    </table>
    <ol class="etapes">
      <li><b>Remplir les quantités</b><p>Les mouvements dans l’ordre, stock mis à jour après chacun.</p></li>
      <li><b>Valoriser les entrées</b><p>Chaque entrée à son propre coût d’achat.</p></li>
      <li><b>Calculer le CMP</b><p>4 200 ÷ 800 = 5,25 €.</p></li>
      <li><b>Valoriser sorties et stock final</b><p>Sorties 620 × 5,25 = 3 255 € ; stock final 180 × 5,25 = 945 €.</p></li>
      <li><b>Contrôler</b><p>Sorties + stock final = total des entrées : 3 255 + 945 = 4 200 €.</p></li>
    </ol>
    <p><b>Variante :</b> CMP recalculé après chaque entrée (200 à 5,00 € + 300 à 5,50 € : 2 650 ÷ 500 = 5,30 €). L’annexe du sujet précise toujours la méthode : la lire avant de commencer.</p>
    <p class="situation"><b>Du stock à la marge :</b> 620 paquets vendus 8 € HT. Marge réelle = 620 × (8 − 5,25) = <b>1 705 €</b>. Avec l’ancien coût de 5 €, l’épicerie aurait cru gagner 1 860 € : la hausse du prix d’achat lui coûte 155 € de marge, sans que rien ne change en rayon. Il faut renégocier ou revoir le prix de vente.</p>

    <h2>Choisir les articles à surveiller : les 20/80</h2>
    <p>Environ <b>20 % des références font 80 % du chiffre d’affaires</b> (loi de Pareto). Elles reçoivent un suivi serré (stock de sécurité calculé, inventaire fréquent, commande surveillée) ; les autres, un suivi allégé.</p>
    <ol class="etapes">
      <li><b>Classer</b><p>Les références par chiffre d’affaires décroissant.</p></li>
      <li><b>Calculer les parts</b><p>CA de la référence ÷ CA total × 100.</p></li>
      <li><b>Cumuler</b><p>Additionner les parts ligne après ligne.</p></li>
      <li><b>Repérer les 80 %</b><p>Les références qui atteignent environ 80 % du cumul.</p></li>
    </ol>
    <p class="exemple"><b>Rayon thés</b> (10 références, 60 000 €) : Earl Grey 45 % puis thé vert à la menthe 35 %, cumul <b>80 %</b>. 2 références sur 10 = 20 % de l’assortiment : la loi est vérifiée, elles ne doivent jamais manquer.</p>
    <div class="barre" data-parts="Earl Grey|45|27 000 €, rang 1;Thé vert menthe|35|21 000 €, cumul 80 %;Darjeeling|5|3 000 €;Rooibos|4|2 400 €;Thé blanc|3|1 800 €;5 autres|8|4 800 € à elles cinq"></div>
    <p>Précautions : le classement peut se faire sur la marge ou la valeur du stock (le sujet le précise) ; un article qui vend peu peut rester indispensable s’il attire des clients. La loi donne un ordre de grandeur : 79 % suffit. Leviers : CA (1), optimisation des ressources (4), stocks (7).</p>

    <h2>Les indicateurs de suivi</h2>
    <table>
      <tr><th>Indicateur</th><th>Formule</th><th>Sens souhaité</th></tr>
      <tr><td>Stock moyen</td><td>(stock début + stock fin) ÷ 2</td><td>À réduire</td></tr>
      <tr><td>Ratio de rotation</td><td>Quantité vendue ÷ stock moyen</td><td>À augmenter</td></tr>
      <tr><td>Durée moyenne de stockage</td><td>(stock moyen ÷ quantité vendue) × nombre de jours, ou jours ÷ rotation</td><td>À réduire</td></tr>
    </table>
    <div class="attention">Ne pas confondre avec le stock moyen <b>Q ÷ 2</b> des approvisionnements : c’est une estimation pour choisir un rythme de commande.</div>
    <table>
      <tr><th>Café</th><th>N-1</th><th>N</th></tr>
      <tr><td>Stocks début / fin</td><td>400 / 200</td><td>200 / 160</td></tr>
      <tr><td>Quantité vendue</td><td>3 300</td><td>3 600</td></tr>
      <tr><td>Stock moyen</td><td>300</td><td>180</td></tr>
      <tr><td>Rotation</td><td>11</td><td>20</td></tr>
      <tr><td>Durée de stockage</td><td>32,7 jours</td><td>18 jours</td></tr>
    </table>
    <div data-calc="rotation"></div>
    <p class="situation"><b>Fait :</b> le stock moyen passe de 300 à 180 paquets alors que les ventes montent de 3 300 à 3 600 ; rotation 20 contre 11, 18 jours en stock au lieu de 33. <b>Sens :</b> l’épicerie vend plus avec moins de stock ; 120 paquets × 5,25 € = 630 € de trésorerie libérée, café plus frais. <b>Recommandation :</b> garder le rythme et surveiller les ruptures ; relever le stock de sécurité si elles apparaissent.</p>
    <p>Un bon stock <b>tourne vite sans jamais manquer</b> : le levier 7 se règle toujours sous la contrainte du levier 2.</p>
  `
});

R.diaporama({
  matiere: 'gestion', groupe: 'Approvisionnements et stocks', prefixe: 'stocks', pdf: 'visuels/gestion/stocks-seance-19-novembre.pdf',
  pages: [
    ['Commander juste, stocker juste'],
    ['Le programme de la séance'],
    ['Les 8 leviers de performance', 'boite-outils'],
    ['Retour sur les exercices A6 et C2', 'boite-outils'],
    ['Le modèle de Wilson', 'approvisionnements'],
    ['Wilson appliqué au café', 'approvisionnements'],
    ['Ce que Wilson suppose', 'approvisionnements'],
    ['Quand les ventes ne sont plus régulières', 'approvisionnements'],
    ['Le point de commande', 'approvisionnements'],
    ['La gestion calendaire', 'approvisionnements'],
    ['Même total livré, plus de stock', 'approvisionnements'],
    ['Stock théorique et stock réel', 'gestion-stocks'],
    ['Inventaire complet ou tournant', 'gestion-stocks'],
    ['Le coût moyen pondéré', 'gestion-stocks'],
    ['La fiche de stock', 'gestion-stocks'],
    ['Du stock à la marge', 'gestion-stocks'],
    ['La méthode des 20/80', 'gestion-stocks'],
    ['Deux références font 80 % des ventes', 'gestion-stocks'],
    ['Trois indicateurs de suivi', 'gestion-stocks'],
    ['Vendre plus avec moins de stock', 'gestion-stocks'],
    ['À retenir'],
    ['Travail noté du 11 janvier']
  ]
});

R.diaporama({
  matiere: 'gestion', groupe: 'Offre commerciale', prefixe: 'offre', pdf: 'visuels/gestion/offre-commerciale.pdf',
  pages: [
    ['Offre commerciale : sommaire'],
    ['Le prix, critère de choix', 'fixation-prix'],
    ['Les contraintes légales', 'fixation-prix'],
    ['Les méthodes de fixation du prix', 'fixation-prix'],
    ['Stratégies face à la concurrence', 'fixation-prix'],
    ['Les modulations de prix du distributeur', 'fixation-prix'],
    ['Sélectionner un fournisseur en 8 étapes', 'fournisseurs'],
    ['Le scoring : choisir avec une note pondérée', 'fournisseurs'],
    ['Les enjeux de la négociation', 'fournisseurs'],
    ['Le cadre juridique des négociations', 'fournisseurs'],
    ['La coopération commerciale', 'fournisseurs']
  ]
});
