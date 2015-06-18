var React = require("react")
  , movieJade = require('./movie.jade')
  , pellet = require("pellet");

module.exports = movieComponent = pellet.createClass({
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

  getInitialState: function() {
    // use the movie title to get a image
    var str = this.props.details.name
      , i = str.length
      , ix = 0;

    while(i) {
      ix += str.charCodeAt(--i);
    }

    return {
      imgUrl: '/img/images-'+(ix % 5)+'.jpg',
      votes: 0
    };
  },

  click: function() {
    this.setState({votes:this.state.votes + 1});
  },

  render: function() {
    return movieJade(this);
  }
});
