var React = require("react")
  , indexJade = require('./index.jade')
  , pellet = require("pellet");

module.exports = indexPage = pellet.createClass({
  /*
  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
  },
  componentDidMount: function(nextProps) {
  },
  componentWillReceiveProps: function(nextProps) {
  },
  shouldComponentUpdate: function(nextProps, nextState) {
  },
  componentWillUpdate: function(nextProps, nextState) {
  },
  componentDidUpdate: function(prevProps, prevState) {
  },
  componentWillUnmount: function(nextProps, nextState) {
  },
  */

// layoutTemplate: "{name_of_your_layout_in_the_manifest}",
  
  routes: ["/", "/index", "/movie/:id"],
  
  componentConstruction: function(options, next) {
    this.setCanonical('http://pellet.io/demo');
    this.addToHead('meta', {name: 'description', content:'movie database demo'});
    this.addToHead('link', {rel: 'alternate', media:'only screen and (max-width: 640px)', href: 'http://m.pellet.io/demo'});
    this.addToHead('meta', {property: 'og:description', content:'movie database demo'});

    /* Example of redirect and UA logic
    var userAgent = this.getUA();
    if(userAgent && userAgent.device && userAgent.device.type !== "web") {
      this.redirect('http://pellet.io/demo');
    }
    */

    // on the server load the file "staticMovies.json"
    // and serialize it for the client.
    if(process.env.SERVER_ENV) {
      var fs = require('fs');

      // get path from pellet options (skeletonPage is the full path to project page-skeleton.ejs so we can use it to find staticMovies.json
      var data = fs.readFileSync(pellet.options.skeletonPage.replace('src/page-skeleton.ejs', 'staticMovies.json')).toString();
      data = JSON.parse(data);
      this.set({movies:data});
    }

    // because the server called this.set({}) -> we have
    // the serialize data on our props
    this.setState({movies:this.props.movies});

    // now create a message board child component so it can
    // serialize its data to the page.
    this.addChildComponent("msg1", pellet.components.messageBoard, {file:'message-board.txt'}, next);
  },

  render: function() {
    return indexJade(this);
  }
});
