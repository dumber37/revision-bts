// Page « Formules à retenir » : le tableau récapitulatif, puis chaque calcul mis en situation
// avec le même fil rouge (le magasin Sport'Tours). Les calculatrices des fiches reprennent les mêmes chiffres.
R.formules = `
  <div class="fil-rouge">
    <b>Le fil rouge : Sport'Tours</b>
    <p>Sport'Tours est un magasin de sport indépendant du centre de Tours. <b>Léa</b> en est la manager.
    <b>Hugo</b> est vendeur, payé 1 820 € brut par mois plus 2 % de commission sur ses ventes.
    Tous les calculs ci-dessous suivent une journée de décisions de Léa.</p>
  </div>

  <h2>Le récapitulatif</h2>
  <table>
    <tr><th>Calcul</th><th>Formule</th></tr>
    <tr><td>% de variation</td><td>(valeur finale − valeur initiale) ÷ valeur initiale × 100</td></tr>
    <tr><td>Élasticité</td><td>E = % variation demande ÷ % variation prix (valeur absolue)</td></tr>
    <tr><td>Note pondérée (scoring)</td><td>Σ (note × coefficient)</td></tr>
    <tr><td>Taux horaire</td><td>Salaire mensuel ÷ 151,67</td></tr>
    <tr><td>Heure supplémentaire</td><td>Taux horaire × (1 + 25 % ou 50 %)</td></tr>
    <tr><td>Salaire net</td><td>Brut − cotisations salariales</td></tr>
    <tr><td>Coût employeur</td><td>Brut + cotisations patronales</td></tr>
    <tr><td>Marge</td><td>Prix de vente HT − coût d'achat HT</td></tr>
    <tr><td>Taux de marge</td><td>Marge ÷ coût d'achat HT × 100</td></tr>
    <tr><td>Taux de marque</td><td>Marge ÷ prix de vente HT × 100</td></tr>
    <tr><td>Coefficient multiplicateur</td><td>Prix de vente TTC ÷ coût d'achat HT</td></tr>
  </table>

  <h2>Les calculs en situation</h2>
  <p>Lis la situation, fais le calcul de ton côté, puis ouvre la correction.</p>

  <div class="cas">
    <h3><span>1</span> Le pourcentage de variation</h3>
    <div class="formule">% variation = (valeur finale − valeur initiale) ÷ valeur initiale × 100</div>
    <p class="situation">Léa ouvre son tableau de bord. Le CA du magasin est passé de <b>48 000 €</b> en septembre à <b>52 800 €</b> en octobre. De combien a-t-il progressé ?</p>
    <details class="correction"><summary>Voir la correction</summary>
      <p>(52 800 − 48 000) ÷ 48 000 × 100 = 4 800 ÷ 48 000 × 100 = <b>+10 %</b>.</p>
      <p>Le CA a augmenté de 10 % en un mois.</p>
    </details>
  </div>

  <div class="cas">
    <h3><span>2</span> L'élasticité-prix de la demande</h3>
    <div class="formule">E = % variation demande ÷ % variation prix (valeur absolue)</div>
    <p class="situation">Pour gagner plus, Léa a monté le prix des gourdes de <b>10 €</b> à <b>10,50 €</b>. Sur le trimestre suivant, les ventes sont passées de <b>1 000</b> à <b>850</b> gourdes. Les clients sont-ils sensibles au prix ?</p>
    <details class="correction"><summary>Voir la correction</summary>
      <p>% variation du prix = (10,50 − 10) ÷ 10 × 100 = <b>+5 %</b>.</p>
      <p>% variation de la demande = (850 − 1 000) ÷ 1 000 × 100 = <b>−15 %</b>.</p>
      <p>E = |−15 ÷ 5| = <b>3</b>. E &gt; 1 : la demande est très élastique.</p>
      <p>Les clients réagissent fort au prix : Léa a perdu beaucoup de ventes pour 50 centimes. Elle a intérêt à revenir à 10 €.</p>
    </details>
  </div>

  <div class="cas">
    <h3><span>3</span> La note pondérée (scoring)</h3>
    <div class="formule">Note pondérée = Σ (note × coefficient)</div>
    <p class="situation">Léa cherche un nouveau fournisseur de ballons. Elle juge sur la <b>qualité (60 %)</b> et le <b>prix (40 %)</b>, notés sur 5.
    Le fournisseur C a <b>5</b> en qualité et <b>2</b> en prix. Le fournisseur D a <b>4</b> partout. Lequel choisir ?</p>
    <details class="correction"><summary>Voir la correction</summary>
      <p>C : 5 × 0,6 + 2 × 0,4 = 3 + 0,8 = <b>3,8</b>.</p>
      <p>D : 4 × 0,6 + 4 × 0,4 = 2,4 + 1,6 = <b>4,0</b>.</p>
      <p>Léa retient <b>D</b> : C est meilleur en qualité, mais son prix trop élevé lui fait perdre des points.</p>
    </details>
  </div>

  <div class="cas">
    <h3><span>4</span> Le taux horaire</h3>
    <div class="formule">Taux horaire = salaire mensuel ÷ 151,67</div>
    <p class="situation">Hugo est payé <b>1 820 € brut</b> par mois pour 35 h par semaine. Combien gagne-t-il de l'heure ?</p>
    <details class="correction"><summary>Voir la correction</summary>
      <p>1 820 ÷ 151,67 = <b>12,00 € brut de l'heure</b>.</p>
      <p>151,67 h, c'est 35 h × 52 semaines ÷ 12 mois.</p>
    </details>
  </div>

  <div class="cas">
    <h3><span>5</span> Les heures supplémentaires</h3>
    <div class="formule">Heure sup = taux horaire × (1 + 25 %) de la 36<sup>e</sup> à la 43<sup>e</sup> heure, × (1 + 50 %) à partir de la 44<sup>e</sup></div>
    <p class="situation">Semaine d'inventaire : Hugo travaille <b>46 h</b> au lieu de 35. Combien lui rapportent ses heures sup ?</p>
    <details class="correction"><summary>Voir la correction</summary>
      <p>Il fait 11 heures sup : 8 h à +25 % (36<sup>e</sup> à 43<sup>e</sup>) et 3 h à +50 % (44<sup>e</sup> à 46<sup>e</sup>).</p>
      <p>8 × 12 × 1,25 = 8 × 15 = <b>120 €</b>.</p>
      <p>3 × 12 × 1,5 = 3 × 18 = <b>54 €</b>.</p>
      <p>Total : <b>174 €</b> brut d'heures sup.</p>
    </details>
  </div>

  <div class="cas">
    <h3><span>6</span> Du brut au net</h3>
    <div class="formule">Salaire net = brut − cotisations salariales</div>
    <p class="situation">En octobre, Hugo a vendu pour <b>8 000 €</b>. Il touche son fixe de 1 820 € et <b>2 %</b> de commission.
    Les cotisations salariales sont de <b>22 %</b>. Quel est son brut, puis son net ?</p>
    <details class="correction"><summary>Voir la correction</summary>
      <p>Commission : 8 000 × 2 % = <b>160 €</b>.</p>
      <p>Brut : 1 820 + 160 = <b>1 980 €</b>.</p>
      <p>Cotisations salariales : 1 980 × 22 % = 435,60 €, <b>retenues sur le salaire d'Hugo</b>.</p>
      <p>Net : 1 980 − 435,60 = <b>1 544,40 €</b>.</p>
    </details>
  </div>

  <div class="cas">
    <h3><span>7</span> Le coût employeur</h3>
    <div class="formule">Coût employeur = brut + cotisations patronales</div>
    <p class="situation">Léa prépare son budget. Combien Hugo coûte-t-il vraiment au magasin en octobre, avec <b>42 %</b> de cotisations patronales ?</p>
    <details class="correction"><summary>Voir la correction</summary>
      <p>Cotisations patronales : 1 980 × 42 % = <b>831,60 €</b>, payées par le magasin.</p>
      <p>Coût employeur : 1 980 + 831,60 = <b>2 811,60 €</b>.</p>
      <p>Hugo touche 1 544,40 € net, mais il coûte 2 811,60 € au magasin.</p>
    </details>
  </div>

  <div class="cas">
    <h3><span>8</span> La marge, le taux de marge et le taux de marque</h3>
    <div class="formule">Marge = PV HT − coût d'achat HT<br>Taux de marge = marge ÷ coût d'achat HT × 100<br>Taux de marque = marge ÷ PV HT × 100</div>
    <p class="situation">Léa référence une nouvelle paire de chaussures de running. Elle l'achète <b>40 € HT</b> et la vend <b>60 € HT</b>. Quels sont sa marge, son taux de marge et son taux de marque ?</p>
    <details class="correction"><summary>Voir la correction</summary>
      <p>Marge : 60 − 40 = <b>20 €</b> par paire.</p>
      <p>Taux de marge : 20 ÷ 40 × 100 = <b>50 %</b> (on divise par le coût d'achat).</p>
      <p>Taux de marque : 20 ÷ 60 × 100 = <b>33,33 %</b> (on divise par le prix de vente).</p>
      <p>Même marge, deux taux différents : tout dépend de ce par quoi on divise.</p>
    </details>
  </div>

  <div class="cas">
    <h3><span>9</span> Le coefficient multiplicateur</h3>
    <div class="formule">Coefficient = prix de vente TTC ÷ coût d'achat HT</div>
    <p class="situation">Avec 20 % de TVA, les chaussures sont affichées <b>72 € TTC</b>. Quel coefficient Léa applique-t-elle à son prix d'achat ?</p>
    <details class="correction"><summary>Voir la correction</summary>
      <p>PV TTC : 60 × 1,2 = 72 €.</p>
      <p>Coefficient : 72 ÷ 40 = <b>1,8</b>.</p>
      <p>Pour fixer le prix d'un autre article, Léa peut multiplier directement son coût d'achat HT par 1,8.</p>
    </details>
  </div>
`;
