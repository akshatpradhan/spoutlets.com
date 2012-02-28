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

});