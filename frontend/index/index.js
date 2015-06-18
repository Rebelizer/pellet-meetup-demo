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

    // set our own props
    this.setProps({mode:'list'});

    // start with hardcoded movie values
    this.setState({
      movies:[{name:"a"},{name:"b"},{name:"c"},{name:"d"},{name:"e"},{name:"f"},{name:"a"}]
    });

    next();
  },

  render: function() {
    return indexJade(this);
  }
});
