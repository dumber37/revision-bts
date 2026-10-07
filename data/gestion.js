// Gestion opérationnelle (E5)

R.fiche({
  id: 'fixation-prix',
  matiere: 'gestion',
  titre: 'La fixation du prix',
  resume: 'Contraintes économiques et légales, prix d’acceptabilité, élasticité, stratégies de prix.',
  date: '2026-10-05',
  contenu: `
    <h2>Le prix, critère de choix</h2>
    <ul>
      <li><b>Sensibilité au prix</b> : plus forte pour les achats courants et les produits à forte image.</li>
      <li><b>Valeur client</b> : le prix n'est pas la valeur. Le client accepte un prix selon la valeur qu'il perçoit (ex. iPhone).</li>
    </ul>

    <h2>La contrainte économique</h2>
    <div class="formule">Prix public = coût d'achat + transport + démarque + marge + taxes</div>
    <p>La démarque peut être connue (casse, péremption) ou inconnue (vol, erreurs).</p>
    <table>
      <tr><th>Paquet de pâtes</th><th>Part du prix</th></tr>
      <tr><td>Coût d'achat</td><td>70 %</td></tr>
      <tr><td>Transport</td><td>3 %</td></tr>
      <tr><td>Démarque</td><td>1 %</td></tr>
      <tr><td>Marge</td><td>20,5 %</td></tr>
      <tr><td>TVA</td><td>5,5 %</td></tr>
      <tr><td><b>Total</b></td><td><b>100 %</b></td></tr>
    </table>

    <h2>Les contraintes légales</h2>
    <p>Les prix sont libres, sauf secteurs réglementés (livres, taxis, électricité, péages) ou circonstances exceptionnelles (gel hydroalcoolique plafonné à 3 € les 100 ml pendant le Covid).</p>
    <table>
      <tr><th>Règle</th><th>À retenir</th><th>Exemple</th></tr>
      <tr><td>Prix imposé</td><td>Interdit, seul un prix conseillé est permis</td><td></td></tr>
      <tr><td>Prix d'appel</td><td>Interdit si le stock est insuffisant</td><td>Lidl</td></tr>
      <tr><td>Vente à perte</td><td>Interdite sous coût d'achat + transport, sauf produits saisonniers, périssables, fin de soldes</td><td></td></tr>
      <tr><td>Pratiques discriminatoires</td><td>Interdites, sauf si justifiées (ex. montant d'achat négocié)</td><td>Apple (1,1 Md€ d'amende)</td></tr>
      <tr><td>Refus de vente</td><td>Interdit envers un particulier, autorisé entre professionnels s'il est justifié</td><td></td></tr>
      <tr><td>Information</td><td>Prix visible, lisible, TTC, avec prix à l'unité</td><td></td></tr>
    </table>

    <h2>Méthodes de fixation</h2>
    <h3>Prix d'acceptabilité (prix psychologique)</h3>
    <p>Sondage à 2 questions :</p>
    <ul>
      <li>« À partir de quel prix trouvez-vous ce produit trop cher ? »</li>
      <li>« En dessous de quel prix pensez-vous qu'il est de mauvaise qualité ? »</li>
    </ul>
    <p>Le prix retenu est celui qui est accepté par le plus de personnes.
    <b>Limites :</b> réponses déclaratives, pas en situation réelle d'achat, on regarde le CA et pas la marge.</p>

    <h3>L'élasticité-prix de la demande</h3>
    <div class="formule">E = % variation de la demande ÷ % variation du prix (en valeur absolue)</div>
    <div class="formule">% variation = (valeur après − valeur avant) ÷ valeur avant</div>
    <ul>
      <li><b>E = 1</b> : la demande varie autant que le prix.</li>
      <li><b>E &gt; 1</b> : demande très élastique, les clients réagissent fort au prix.</li>
      <li><b>E &lt; 1</b> : demande peu élastique, les clients réagissent peu.</li>
    </ul>
    <p class="exemple"><b>Exemple :</b> le prix augmente de 5 %, les ventes baissent de 15 %. E = 15 ÷ 5 = 3, la demande est très élastique.</p>

    <h2>Stratégies face à la concurrence</h2>
    <table>
      <tr><th>Stratégie</th><th>Principe</th><th>Exemple</th></tr>
      <tr><td>Écrémage</td><td>Prix élevé, forte marge, petits volumes</td><td>Red Bull</td></tr>
      <tr><td>Pénétration</td><td>Prix bas, gros volumes</td><td>Free Mobile</td></tr>
      <tr><td>Alignement</td><td>Même prix que les concurrents (sans entente)</td><td>Fnac Darty</td></tr>
      <tr><td>Yield management</td><td>Prix qui change en temps réel selon la demande</td><td>SNCF</td></tr>
    </table>
    <p>Écrémage : luxe ou avance technologique. Yield management : surtout pour les services (avion, TGV, hôtel).</p>

    <h2>Réductions de prix</h2>
    <table>
      <tr><th>Réduction</th><th>Pourquoi</th></tr>
      <tr><td>Rabais</td><td>Produit défectueux ou déclassé</td></tr>
      <tr><td>Remise</td><td>Taille de la commande ou statut du client</td></tr>
      <tr><td>Ristourne</td><td>Volume acheté sur une période</td></tr>
      <tr><td>Prix promo</td><td>Baisse temporaire</td></tr>
      <tr><td>Escompte</td><td>Paiement comptant</td></tr>
    </table>

    <h2>Différencier les prix</h2>
    <ul>
      <li>Tarifs selon l'heure ou la saison.</li>
      <li>Tarifs selon la quantité.</li>
      <li>Bundling : plusieurs produits vendus ensemble à un prix global.</li>
      <li>Yield management pour les services (avion, TGV, hôtel).</li>
    </ul>

    <h2>Calculs de marge (souvent à l'examen)</h2>
    <div class="formule">Marge = prix de vente HT − coût d'achat HT</div>
    <div class="formule">Taux de marge = marge ÷ coût d'achat HT × 100</div>
    <div class="formule">Taux de marque = marge ÷ prix de vente HT × 100</div>
    <div class="formule">Coefficient multiplicateur = prix de vente TTC ÷ coût d'achat HT</div>
    <p class="exemple"><b>Exemple :</b> achat 40 € HT, vente 60 € HT (72 € TTC avec 20 % de TVA). Marge = 20 €. Taux de marge = 50 %. Taux de marque = 33,3 %. Coefficient = 72 ÷ 40 = 1,8.</p>
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
    <ol>
      <li>Définir les critères de sélection</li>
      <li>Rédiger le cahier des charges</li>
      <li>Lancer un appel d'offres</li>
      <li>Examiner les offres</li>
      <li>Négocier</li>
      <li>Choisir le fournisseur</li>
      <li>Signer le contrat</li>
      <li>Démarrer la relation</li>
    </ol>

    <h2>Les critères</h2>
    <p>Compétences et fiabilité, capacités de production, engagement (qualité constante, délais), contrôle qualité, solidité financière, tarifs.</p>

    <h2>Le scoring</h2>
    <ol>
      <li>Choisir les critères.</li>
      <li>Les pondérer (coefficient ou %).</li>
      <li>Noter chaque fournisseur sur chaque critère.</li>
      <li>Calculer la note pondérée.</li>
    </ol>
    <div class="formule">Note pondérée = Σ (note × coefficient)</div>
    <p class="exemple"><b>Exemple :</b> qualité (60 %) noté 5, prix (40 %) noté 2. Note = 5 × 0,6 + 2 × 0,4 = <b>3,8</b>.</p>
    <p class="exemple"><b>Exercice 2</b> (coefficient 2 pour qualité et prix, 1 pour les autres) : Durax 15, Helpon 15, <b>Astoa 17</b>, Socx 13. On retient Astoa.</p>

    <h2>Les enjeux de la négociation</h2>
    <table>
      <tr><th>Sujet</th><th>Le distributeur veut…</th><th>Le fournisseur veut…</th></tr>
      <tr><td>Conditions de vente</td><td>Prix bas et services</td><td>Prix élevés</td></tr>
      <tr><td>Promotions</td><td>Que le fournisseur les paie</td><td>Préserver son image</td></tr>
      <tr><td>Mise en valeur</td><td>Mettre en avant ses MDD</td><td>La meilleure place en rayon</td></tr>
      <tr><td>Marques</td><td>Des MDD à meilleure marge</td><td>Valoriser ses produits</td></tr>
      <tr><td>Retours</td><td>Faire reprendre les invendus</td><td>Une vente définitive</td></tr>
    </table>

    <h2>Le cadre juridique</h2>
    <ul>
      <li>Revente à perte (sous le prix de la facture) interdite.</li>
      <li><b>Délais de paiement</b> : sans accord, 30 jours après réception de la marchandise. Si un délai est convenu, il ne peut pas dépasser 60 jours après la date de facture, ou 45 jours fin de mois.</li>
      <li>Refus de vente interdit envers un particulier.</li>
      <li>Référencement par contrat, avec un préavis en cas de déréférencement.</li>
      <li>CGV communiquées à tout acheteur qui les demande. Les tarifs sont négociés chaque année dans une convention écrite.</li>
      <li>Prix imposés interdits.</li>
      <li>Pratiques discriminatoires : les écarts de tarif doivent être justifiés par des contreparties (ex. remises pour les meilleurs clients).</li>
      <li>Promotions alimentaires (loi Egalim) : au maximum 34 % du prix et 25 % du volume. Le mot « gratuit » est interdit, on dit « offert ».</li>
    </ul>
    <div class="attention"><b>Délai de paiement :</b> le cours ne donne que « 30 jours, ou 45 jours fin de mois ». Si on te demande le délai maximal convenu, c'est 60 jours date de facture ou 45 jours fin de mois. Vérifie quelle version ton prof attend.</div>

    <h2>La coopération commerciale</h2>
    <table>
      <tr><th>Outil</th><th>Rôle</th></tr>
      <tr><td>EDI</td><td>Échange de données informatisé : commandes et factures automatisées, moins d'erreurs et de coûts</td></tr>
      <tr><td>SRM</td><td>Gestion de la relation fournisseur : mêmes outils, mêmes informations, meilleures conditions</td></tr>
      <tr><td>SCM</td><td>Gestion de la chaîne logistique : optimise les flux et anticipe les besoins</td></tr>
      <tr><td>ECR</td><td>Réponse optimale au consommateur : le bon produit, au bon moment, au bon prix. Assortiment commun, co-organisation des rayons, co-animation</td></tr>
      <tr><td>Category management</td><td>Regrouper les produits par univers, à partir d'une segmentation (lieu, cible)</td></tr>
    </table>
  `
});
