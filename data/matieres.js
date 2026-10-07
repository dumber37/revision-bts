// Registre des matières, fiches et visuels.
// R.fiche({...})  : ajoute une fiche
// R.visuel({...}) : ajoute un visuel (image dans le dossier visuels/<matiere>/)
var R = {
  matieres: [
    { id: 'drcv',       code: 'E41', nom: 'DRCV',                     long: 'Développement de la relation client et vente conseil', couleur: '#2f6fdb' },
    { id: 'adoc',       code: 'E42', nom: 'ADOC',                     long: 'Animation et dynamisation de l’offre commerciale', couleur: '#d9822b' },
    { id: 'management', code: 'E6',  nom: 'Management',               long: 'Management de l’équipe commerciale',              couleur: '#1f9d6b' },
    { id: 'gestion',    code: 'E5',  nom: 'Gestion opérationnelle',   long: 'Assurer la gestion opérationnelle',                   couleur: '#8a4fd1' }
  ],
  fiches: [],
  visuels: [],
  fiche: function (f) { this.fiches.push(f); },
  visuel: function (v) { this.visuels.push(v); }
};
