var React = require("react")
  , indexJade = require('./index.jade')
  , pellet = require("pellet");

function getData(_this, page, next) {
  var api = _this.coordinator('DAL', 'DAL', next?'serialize':void 0);

  if(page < 0) {
    page = 0;
  }

  var limit = 5;
  var offset = limit * page;
  api.select('SELECT title, out(hasGenera).description as genera FROM Movies OFFSET=:offset', {offset:offset}, limit, function(err, movies) {
    if(err) {
      return next(err);
    }

    _this.setState({movies:movies, limit:limit, offset:offset, page:page});
    if(next) {
      next();
    }
  });
}

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

    getData(this, 0, next);
  },

  prev: function() {
    getData(this, this.state.page-1);
  },

  next: function() {
    getData(this, this.state.page+1);
  },

  render: function() {
    return indexJade(this);
  }
});
