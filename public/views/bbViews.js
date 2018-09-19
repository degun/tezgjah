

var ShkrimeView = Backbone.View.extend({
  indexTregim: 0,
  model: paragraf,
  el: '.trgm' ,
  initialize: function(){
    this.collection = new Paragrafe();
    this.render();
  },
  template: _.template('<p><%= permbajtja %></p>', this.model),
  render: function() {
      var that = this, p;
        p = this.collection.fetch();
        p.done(function () {
          var approved = _.filter(that.collection.models, function(item){
            return item.toJSON().aprovuar === 1;
          });
          var tregi = _.map(approved, function(item){
            return item.toJSON().idTregim;
          });
          var tregimet = [];
          $.each(tregi, function(i, el){
              if($.inArray(el, tregimet) === -1) tregimet.push(el);
          });
          var tekTregim = _.filter(approved, function(item){
            return item.toJSON().idTregim == tregimet[that.indexTregim];
          });

          var para = _.map(approved, function(item){
            return item.toJSON().idParagraf;
          });

          var id3gim = tregimet[that.indexTregim];
          var idPar = _.max(para, function(item){return item});
          var max3gim = _.max(tregimet, function(item){return item});

          sessionStorage.setItem('tregim', id3gim);
          sessionStorage.setItem('idPar', idPar);
          sessionStorage.setItem('maxTregim', max3gim);

          $(that.el).html('');
          $(that.el).append('<span class="vazhdo">Vazhdo te tregimi tjetër</span><br><br><br>')
          _.each(tekTregim, function (item) {
              $(that.el).append(that.template(item.toJSON()));
          }, that);

        });
	},
  parse : function(response){
        return response.aprovuar;
   },
   events:{
     'click .vazhdo': 'vazhdo'
   },
   vazhdo: function(){
     var that = this, p;
     p = this.collection.fetch();
     p.done(function () {
       var approved = _.filter(that.collection.models, function(item){
         return item.toJSON().aprovuar === 1;
       });
       var tregi = _.map(approved, function(item){
         return item.toJSON().idTregim;
       });
       var tregimet = [];
       $.each(tregi, function(i, el){
           if($.inArray(el, tregimet) === -1) tregimet.push(el);
       });
       var tekTregim = _.filter(approved, function(item){
         return item.toJSON().idTregim == tregimet[that.indexTregim];
       });

       var para = _.map(approved, function(item){
         return item.toJSON().idParagraf;
       });

       if(that.indexTregim < tregimet.length-1){
         that.indexTregim++;
       }else{
         that.indexTregim = 0;
       };

       var id3gim = tregimet[that.indexTregim];

       var idPar = _.max(para, function(item){return item});
       var max3gim = _.max(tregimet, function(item){return item});

       sessionStorage.setItem('tregim', id3gim);
       sessionStorage.setItem('idPar', idPar);
       sessionStorage.setItem('maxTregim', max3gim);

       that.render();
       console.log('Jemi tek vazhdo. idTregim është ' + sessionStorage.getItem('tregim') + ' ' + id3gim);
     });

   }
});

var sView = new ShkrimeView();

// Backbone View for one blog

var SingleView = Backbone.View.extend({
	model: new Paragraf(),
	tagName: 'p',
	initialize: function() {
		this.template = _.template('<p class="permbajtja"><%= permbajtja %>'+
    '</p><input type="textfield" style="display:none" class="permbajtja-txt materialize-textarea"></input>'+
    'nga <span class="nofka-par red"><%= nofka %>&nbsp</span>'+
    '<span class="aprovuar green"><%= aprovuar %></span><br>'+
    '<button class="fshi-btn orange">Fshi</button>'+
    '<button class="aprovo-btn green">Aprovo</button>'+
    '<button class="ndrysho-btn blue">Ndrysho</button>'+
    '<button style="display:none" class="perditeso-btn orange-red">Perditëso</button>'+
    '<button style="display:none" class="mbrapsh-btn red">Mbrapsh</button>');
	},
	events: {
		'click .fshi-btn': 'fshi',
		'click .aprovo-btn': 'aprovo',
		'click .ndrysho-btn': 'ndrysho',
    'click .perditeso-btn': 'perditeso',
    'click .mbrapsh-btn': 'mbrapsh'
	},
	ndrysho: function() {
		this.$('.fshi-btn').hide();
		this.$('.aprovo-btn').hide();
    this.$('.ndrysho-btn').hide();
		this.$('.perditeso-btn').show();
		this.$('.mbrapsh-btn').show();

		var permban = this.$('.permbajtja').html();
    this.$('.permbajtja').hide();
		var nofka = this.$('.nofka-par').html();
    this.$('.permbajtja-txt').show();
    this.$('.permbajtja-txt').val(permban);
    },
	perditeso: function() {
    this.model.save({
      permbajtja: this.$('.permbajtja-txt').val()
    })
	},
	mbrapsh: function() {
		this.render();
	},
	fshi: function() {
		this.model.destroy({
			success: function(response) {
				console.log('Successfully DELETED paragraf with id: ' + response.toJSON().id);
			},
			error: function(err) {
				console.log('Failed to delete paragraf!');
			}
		});
	},
  aprovo: function(){
        var newTregim = parseInt(sessionStorage.getItem('maxTregim'))+1;
        var idPar = this.model.get('idParagraf');
        if(parseInt(idPar) == 1){
        this.model.save({aprovuar: 1, idTregim: newTregim});
        }else{
          this.model.save({aprovuar: 1});
        }
        sessionStorage.setItem('maxTregim',parseInt(newTregim)+1);
        console.log('Jemi tek aprovo. idTregim është' + sessionStorage.getItem('tregim'));
    },
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

// Backbone View for all blogs

paragrafe = new Paragrafe();

var AdminView = Backbone.View.extend({
	model: paragrafe,
	el: $('.tregim_admin'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		},this);
		this.model.on('remove', this.render, this);

		this.model.fetch({
			success: function(response) {
        console.log('Successfully GOT paragrafe with id: ')
				_.each(response.toJSON(), function(item) {
					console.log(' '+item.id);
				})
			},
			error: function() {
				console.log('Failed to get stories!');
			}
		});
	},
  parse: function(data) {
    return JSON.parse(data).objects;
  },
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(paragraf) {
			self.$el.append((new SingleView({model: paragraf})).render().$el);
		});
		return this;
	}
});

var aView = new AdminView();
