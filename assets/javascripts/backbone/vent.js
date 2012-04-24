'use strict';
(function ($) {
    
    var ventTemplate = '<article class="vent">' +
            '<aside class="centered">' + 
                '<div class="mood-options">' +
                    '<span class="options-rate1"></span>' +
                    '<span class="options-rate2"></span>' +
                    '<span class="options-rate3"></span>' +
                    '<span class="options-rate4"></span>' +
                    '<span class="options-rate5"></span>' +
                    '<span class="options-rate6"></span>' +
                    '<span class="options-rate7"></span>' +
                    '<span class="options-rate8"></span>' +
                    '<span class="options-rate9"></span>' +
                    '<span class="options-rate10"></span>' +
                '</div>' +
                '<div class="vent-mood vent-rate8"><!-- --></div>' +
                '<span>0</span>' +
                '<button class="btn btn-mini btn-success btn-relate">Relate</button>' +
            '</aside>' +
            '<header>' +
                                        '<span class="author">' +
                                            'by <a href="#"><%= vent.username %></a>' +
                                        '</span>' +
                                        '<span class="date">' +
                                            '4 days ago in <a class="label label-info" href="#"><%= vent.stream %></a>' +
                                        '</span>' +
            '</header>' +
            '<p>' +
                '<a href="vent">' +
                    '<%= vent.text %>' +
                '</a>' +
            '</p>' +
            '<footer>' +
                '<a href="vent#comments">2 comments</a> <span>137 views</span> <i class="icon-download pull-right"></i>' +
            '</footer>' +
        '</article>';
        
    var VentModel = Backbone.Model.extend({

        defaults:{
            username: "",
            text: "",
            stream: ""
        }

    });
    
    var VentCollection = Backbone.Collection.extend({

        model:VentModel,

        initialize: function() {
            _.bindAll(this, 'addVent');
        },

        addVent: function(vent) {  
           // console.log('adding vent');
           // console.log(vent);
           this.pop({silent: true});
            this.unshift(vent);
        },

        // Retrieve vents in JSON
        url : function() {
            return "/api/vents/";
        }

    });

    // Individual row view
    var VentRowView = Backbone.View.extend({

        tagName:'article',

        ventTemplate: _.template(ventTemplate),

        initialize:function () {
            // Fix this binding issues
            _.bindAll(this);

        },

        render:function () {
            
            var vent = this.model.toJSON();
            $(this.el).html(this.ventTemplate({vent: vent}));
            return this;
        },


    });

    // Our main app view
    // Takes a collection as a parameter
    var VentView = Backbone.View.extend({

        initialize: function() {
            _.bindAll(this, "render");
            this.model
            window.ventCollection = new VentCollection;
            var self = this;
            ventCollection.fetch({
                success: function() {
                    self.render(); 
                },
                error: function() {
                    console.log('error');
                }
            });
            
            ventCollection.on('add', function(vent) {
                $('.article-list').html('');
                self.render(); 
                
            });
        },

        
        render: function() {
            var rows = ventCollection.models;
            _.each(rows, (function (vent) {
                var rowView = new VentRowView({model: vent});
                  $('.article-list').append(rowView.render().el);
            }));                      
 
        }     

    });
    
    var socket = io.connect(location.hostname);
    socket.on('vent', function (data) {
      //  console.log(data);
        ventCollection.addVent(data);
    });

    new VentView();
    
})(jQuery);    