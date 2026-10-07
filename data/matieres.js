// Registre des matières, fiches et visuels.
// R.fiche({...})  : ajoute une fiche
// R.visuel({...}) : ajoute un visuel (image dans le dossier visuels/<matiere>/)
var R = {
  matieres: [
    { id: 'drcv',       code: 'E41', nom: 'DRCV',                     long: 'Développement de la relation client et vente conseil', couleur: '#2f5fb3' },
    { id: 'adoc',       code: 'E42', nom: 'ADOC',                     long: 'Animation et dynamisation de l’offre commerciale', couleur: '#c8742a' },
    { id: 'management', code: 'E6',  nom: 'Management',               long: 'Management de l’équipe commerciale',              couleur: '#1d6b6b' },
    { id: 'gestion',    code: 'E5',  nom: 'Gestion opérationnelle',   long: 'Assurer la gestion opérationnelle',                   couleur: '#6b4fa0' }
  ],
  fiches: [],
  visuels: [],
  fiche: function (f) { this.fiches.push(f); },
  visuel: function (v) { this.visuels.push(v); },
  // Un PDF découpé en images : visuels/<matiere>/<prefixe>-01.jpg, -02.jpg…
  // pages : [légende, id de fiche (facultatif)] dans l'ordre du PDF.
  diaporama: function (d) {
    var self = this;
    d.pages.forEach(function (p, i) {
      self.visuels.push({
        matiere: d.matiere, groupe: d.groupe, pdf: d.pdf,
        src: 'visuels/' + d.matiere + '/' + d.prefixe + '-' + (i < 9 ? '0' : '') + (i + 1) + '.jpg',
        legende: p[0], fiche: p[1]
      });
    });
  }
};
