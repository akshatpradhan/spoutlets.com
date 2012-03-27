var chart;
$(document).ready(function() {
  if ($('#chart-graph').length) {
    chart = new Highcharts.Chart({
      chart: {
        renderTo: 'chart-graph',
        type: 'spline'
      },
        title: {
          text: 'Mood Rating'
        },
        subtitle: {
          text: ''   
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { // don't display the dummy year
            month: '%e. %b',
            year: '%b'
          }
        },
        yAxis: {
          title: {
            text: 'Rating'
          },
          min: 0
        },
        tooltip: {
          formatter: function() {
            var formater = '<strong>' + this.series.name + '</strong><br/>' + Highcharts.dateFormat('%b %e @ %H:%M', this.x) +': '+ 'Your Mood ' + this.y;
                      
            if (this.point.config[2] != undefined) {
              formater +=  ' <br /><strong>Your comment: </strong><br />' + this.point.config[2].comment;
            }
                      
            return formater;
                          
          }
        },
        series: [{
          name: 'Rating',
          data: [
            [Date.UTC(2012, 0, 30, 9, 41), 3],
            [Date.UTC(2012, 0, 30, 13, 20), 1, {comment: "#angry, #irritated, #annoyed"}],
            [Date.UTC(2012, 1, 1, 8, 54), 3, {comment: "#bodysucks"}],
            [Date.UTC(2012, 1, 1, 9, 47), 5, {comment: "#medskickingin"}],
            [Date.UTC(2012, 1, 2, 7, 22), 5, {comment: "#lesssick"}],
            [Date.UTC(2012, 1, 3, 11, 02), 5 ],  
            [Date.UTC(2012, 1, 5, 12, 48), 7  ],
            [Date.UTC(2012, 1, 6, 10, 16), 5  ],
            [Date.UTC(2012, 1, 6, 22, 03), 5  ],
            [Date.UTC(2012, 1, 7, 20, 59), 4  ]
          ]
        }]
    });
  }

  if ($('#chart-graph-mood').length) {
    chart = new Highcharts.Chart({
      chart: {
        renderTo: 'chart-graph-mood',
        type: 'spline'
      },
      title: {
        text: 'Mood graph'
      },
      subtitle: {
        text: ''   
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
          month: '%e. %b',
          year: '%b'
        }
      },
      yAxis: {
        title: {
          text: 'Rating'
        },
        min: 0
      },
      tooltip: {
        formatter: function() {
          var formater = '<strong>' + this.series.name + '</strong><br/>' + Highcharts.dateFormat('%b %e @ %H:%M', this.x) +': '+ 'Your Mood ' + this.y;
                      
          if (this.point.config[2] != undefined) {
            formater +=  ' <br /><strong>Your comment: </strong><br />' + this.point.config[2].comment;
          }
                      
          return formater;
        }
      },
      series: [{
        name: 'Rating',
        data: [
          [Date.UTC(2012, 0, 30, 9, 41), 3],
          [Date.UTC(2012, 0, 30, 13, 20), 1, {comment: "#angry, #irritated, #annoyed"}],
          [Date.UTC(2012, 1, 1, 8, 54), 3, {comment: "#bodysucks"}],
          [Date.UTC(2012, 1, 1, 9, 47), 5, {comment: "#medskickingin"}],
          [Date.UTC(2012, 1, 2, 7, 22), 5, {comment: "#lesssick"}],
          [Date.UTC(2012, 1, 3, 11, 02), 5 ],  
          [Date.UTC(2012, 1, 5, 12, 48), 7  ],
          [Date.UTC(2012, 1, 6, 10, 16), 5  ],
          [Date.UTC(2012, 1, 6, 22, 03), 5  ],
          [Date.UTC(2012, 1, 7, 20, 59), 4  ]
        ]
      }]
    });
  }     

// Issue #23: Relate Button Increase by 1

$(".btn-relate").click(function() {
  var $elem = $(this).parent().find('> span');
  var currentValue = parseFloat($elem.html(), 10);
  $elem.fadeOut('fast', function() { $elem.html(++currentValue).fadeIn('fast') });
  return false;
});

//Issue #39: expand/collapse of text area on /vent-stream

var ventFormActions = function(params) {
  var $controls = $(params.controls),
        $textarea = $(params.textarea),
        controlsHeight = params.controlsHeight,
        expandedHeight = params.expandedHeight,
        initialHeight = params.initialHeight;

  var that = {
    expand: function() {
      if ($textarea.hasClass('expanded')) return;
      $textarea.animate({
        'height': expandedHeight
      }, 
      {
        'duration': 300,
        'queue': false
      });
      that.showControls();
    },

    collapse: function() {
      $textarea[0].value = '';
      $textarea.animate({
        'height': initialHeight
      }, 
      {
        'duration': 300,
        'queue': false
      });      
      that.hideControls();
    },

    showControls: function() {
      $controls.removeClass('hide').css({'opacity': 0}).height(0).stop(true, false)
        .animate({
          'height': controlsHeight,
          'opacity': 1
        },
        {
          "duration": 300,
          "complete": function() { $textarea.addClass('expanded') },
          "queue": false
        });
    },

    hideControls: function() {
      $controls.stop(true, false)
        .animate({
          'opacity': 0,
          'height': 0
        },
        {
          "complete": function() { $controls.addClass('hide'); $textarea.removeClass('expanded') },
          "duration": 300,
          "queue": false
        })
    }
  }

  return {
    collapse: that.collapse,
    expand: that.expand
  }
}


if ($('.vent-form textarea').length) {
  var formParams = {
    textarea: '.vent-form textarea',
    controls: '.vent-control',
    initialHeight: '20px',
    expandedHeight: '80px',
    controlsHeight: '30px'
  };
  var ventForm = new ventFormActions(formParams);

  $(formParams.textarea).focus(function() {
     ventForm.expand();
  });
  $(formParams.controls + "> .close").click(function() {
     ventForm.collapse();
  });
}

//Issue #41: Tag it

var tagFormActions = function(params) {
  var $container = $(params.container),
        $tagsContainer = $(params.tagsContainer),
        reasonString = '',
        hashesArray = [];
  
  var that = {
    tagIt: function() {
      reasonString = $container.find('#feelings')[0].value;
      hashesArray = reasonString.match(/#\w+/g);
      that.addHashes(hashesArray);
    },

    addHashes: function(hashesArray) {
      if (hashesArray == null) return;

      var currentHashesArray = [];
      $tagsContainer.find('> a').each(function(index, value) { currentHashesArray.push(value.innerHTML) });
      
      $.each(hashesArray, function(index, value) {
        if (currentHashesArray.indexOf(value) > -1) { 
          that.IncreaseTagSize(currentHashesArray.indexOf(value)); 
          return; 
        };
        $tagsContainer.animate({ 'opacity': 0 }, 500, function() {
          var elem = '<a href="#" class="lnk-tag" style="font-size: 14px">' + value + '</a>';
          $tagsContainer.prepend(elem);
        });
      });

      $tagsContainer.animate({ 'opacity': 1 });
    },

    IncreaseTagSize: function(elemIndex) {
      $tagsContainer.find('a').eq(elemIndex).animate({'font-size': "+=3px"})
    }
  }

  return {
    tagIt: that.tagIt
  }
}

var tagFormParams = {
  container: '.form-feelings',
  tagsContainer: '.tag-feelings'
}

if ($('.form-feelings').length) {
  var tagForm = new tagFormActions(tagFormParams);

  $(tagFormParams.container).submit(function(e) {
    e.preventDefault();
    tagForm.tagIt();
  });
}

// Issue #38: Mood Faces on Vent Stream

$('.vent-mood, .mood-options span').click(function() {
  $(this).parent().parent().find('.mood-options').fadeToggle('slow');
})


});