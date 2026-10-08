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
