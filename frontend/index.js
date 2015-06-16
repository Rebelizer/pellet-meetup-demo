var React = require("react")
  , indexJade = require('./index.jade')
  , pellet = require("pellet");

module.exports = indexPage = pellet.createClass({
  /*
  componentConstruction: function(options, next) {
    this.set({val:'val'}); // serialized to the broswer from the server render
    this.setProps({val:'val'}); // set props passed to getInitialState

    next();
  },
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
  
  routes: ["/", "/index"],
  

  render: function() {
    return indexJade(this);
  }
});
