var React = require("react")
  , messageBoardJade = require('./message-board.jade')
  , pellet = require("pellet");

module.exports = messageBoardComponent = pellet.createClass({
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

  componentConstruction: function(options, next) {

    // on the server load the file "message-board.txt"
    // and serialize it for the client.
    if(process.env.SERVER_ENV) {
      var fs = require('fs')
        , _this = this;

      // get path from pellet options (skeletonPage is the full path to project page-skeleton.ejs so we can use it to find staticMovies.json
      fs.readFile(pellet.options.skeletonPage.replace('src/page-skeleton.ejs', options.file), function(err, buf) {
        if(err) {
          return next(err);
        }

        _this.set({text:buf.toString()});

        next();
      });
    } else {
      // IMPORTANT NOTE: in componentConstruction this.props is the rootNode of props
      // so it this.props.msg1.XXXX not this.props.XXXX\
      console.log('message-board props:', this.props);
      next();
    }
  },

  render: function() {
    return messageBoardJade(this);
  }
});
