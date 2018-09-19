// Paragraf model

var Paragraf = Backbone.Model.extend({
  defaults: {
    permbajtja: '',
    nofka: '',
    aprovuar: '',
    idTregim: '',
    idParagraf: ''
  }
});

paragraf = new Paragraf();

var Paragrafe = Backbone.Collection.extend({
  model: Paragraf,
  url: 'http://localhost:3000/tregime'
});

var Perdorues = Backbone.Model.extend({
  defaults: {
    nofka: '',
    fjalekalimi: ''
  }
});

//Users model

var Perdoruesit = Backbone.Collection.extend({
    url: 'http://localhost:3000/perdorues'
});

perdoruesit = new Perdoruesit();
