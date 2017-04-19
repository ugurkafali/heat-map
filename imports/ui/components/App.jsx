import React, { Component, constructor, State } from 'react';
import Flexbox from 'flexbox-react';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createContainer } from 'meteor/react-meteor-data';
injectTapEventPlugin();
CalHeatMap = require("cal-heatmap");
import { Tasks } from '../../api/tasks.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.addToDatabase = this.addToDatabase.bind(this);
    this.parser = this.parser.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  parser(data) { // saati 3 arttırıyor
    var stats = {};
    for(i=0;i<data.length;i++) {
      stats[new Date(data[i].baslangic).getTime() / 1000] = data[i].toplamilerleme;
    }
    return stats;
  }

  addToDatabase() {
    Meteor.call("taskUpdate", 1);
    //Meteor.call('abc');
    /*Tasks.insert({
     "_id" : ObjectId("56f1281e6fdfb24e18f07a79"),
    "baslangic" : ISODate("2015-10-21T02:00:00.000Z"),
    "bitis" : ISODate("2015-10-21T03:00:00.000Z"),
    "toplamilerleme" : 361,
    "toplamilerlemezamani" : 2012,
    "toplamhazirlikzamani" : 1054,
    "toplamatilzamani" : 0,
    "toplamkapalikalmazamani" : 534,
    "duration" : 3600,
    "ilerlemehizi" : 10.765407554672,
    "rcmindeksi" : 82.7373305626617,
    "ortalamaTork" : 45.0458891013384,
    "ortalamaBaski" : 18.3983428935628,
    "ortalamaAski" : NaN,
    "ortalamaCmpBasinci" : NaN,
    "ortalamaTakimDevri" : 890.70108349267,
    "ortalamaCmpDevri" : 95.8062460165711,
    "veriSayisi" : 1569
    }); */
  }

  componentWillReceiveProps(nextProps) {
    var node = document.getElementsByClassName("cal")[0];
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
    node = document.getElementsByClassName("cal1")[0];
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
    /*var parser = function(data) {
      var stats = {};
      for (var d in data) {
        stats[new Date(data[d].baslangic).getTime() / 1000] = data[d].toplamilerleme;
      }

      return stats;
    }; */

    var cal = new CalHeatMap();
    /*cal.init({
    legendColors: {
    min: "#efefef",
    max: "steelblue",
    empty: "white"
    // Will use the CSS for the missing keys
    },
    itemSelector: document.getElementsByClassName("cal")[0],
    domain: "month",
    subDomain: "day",
    cellSize: 20,
    subDomainTextFormat: "%d",
    range: 1,
    displayLegend: false,
    onsiderMissingDataAsZero: true
    }); */
    cal.init({
      itemSelector: document.getElementsByClassName("cal")[0],
      legendColors: {
        min: "#efefef",
        max: "steelblue",
        empty: "white"
        // Will use the CSS for the missing keys
      },
      domain: "day",
      subDomain: "hour",
      data: nextProps.tasks,
      cellSize: 40,
      subDomainTextFormat: "%H:00",
      domainGutter: 10,
      domainMargin: 10,
      columnLimit: 21,
      rowLimit: 8,
      range: 7,
      displayLegend: true,
      label: {
        position: "bottom",
        width: 46,
        rotate: "null"
      },
      previousSelector: document.getElementsByClassName("fa fa-angle-left fa-3x 1")[0],
      nextSelector: document.getElementsByClassName("fa fa-angle-right fa-3x 2")[0],
      start: new Date('2015-10-21'),
      afterLoadData: this.parser,
      legend: [2, 4, 6, 8],
      displayLegend: true,
      legendVerticalPosition: "bottom",
      legendHorizontalPosition: "center",
    });

    var cal1 = new CalHeatMap();
    cal1.init({
      itemSelector: document.getElementsByClassName("cal1")[0],
      domain: "month",
      subDomain: "week",
      subDomainTextFormat: "%d-%W",
      domainLabelFormat: "%b %Y",
      cellSize: 40,
      domainMargin: 10,
      domainGutter: 10,
      weekStartOnMonday: true,
      afterLoadData: this.parser,
      range: 4,
      displayLegend: false,
      previousSelector: document.getElementsByClassName("fa fa-angle-left fa-3x")[0],
      nextSelector: document.getElementsByClassName("fa fa-angle-right fa-3x")[0],
      start: new Date(),
    });




    /*cal.init({
    itemSelector: document.getElementsByClassName("cal")[0],
    legendColors: {
    min: "#efefef",
    max: "steelblue",
    empty: "white"
    // Will use the CSS for the missing keys
    },
    domain: "day",
    data: "datas-years.json",
    start: new Date(2000, 0),
    cellSize: 9,
    range: 15,
    legend: [2, 4, 6, 8]
    }); */
  }

  render() {
    if (this.props.tasks) {
      return(
        <div>
          <FlatButton label="Add" onTouchTap={this.addToDatabase} />
          <div className="cal1"></div>
          <i className="fa fa-angle-left fa-3x" aria-hidden="true"></i>
          <i className="fa fa-angle-right fa-3x" aria-hidden="true"></i>
          <div className="cal"></div>
          <i className="fa fa-angle-left fa-3x 1" aria-hidden="true"></i>
          <i className="fa fa-angle-right fa-3x 2" aria-hidden="true"></i>
        </div>
      );
    }
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default AppContainer = createContainer(() => {

  Meteor.subscribe('tasks');
  var tasks = Tasks.find({}).fetch();

  return {
    tasks,
  };
}, App);