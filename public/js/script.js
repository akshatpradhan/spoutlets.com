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
        'complete': that.showControls,
        'duration': 300,
        'queue': false
      });
    },

    collapse: function() {
      $textarea[0].value = '';
      $textarea.animate({
        'height': initialHeight
      }, 
      {
        'complete': that.hideControls,
        'duration': 300,
        'queue': false
      });      
    },

    showControls: function() {
      $controls.removeClass('hide').css({'opacity': 0}).height(0).stop(true, false)
        .animate({
          'height': controlsHeight
        },
        {
          "duration": 300,
          "complete": function() { $controls.animate({'opacity': 1}, 200); $textarea.addClass('expanded') },
          "queue": false
        });
      console.log('Le display controls');
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
      console.log('Le hidding controls');
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

});