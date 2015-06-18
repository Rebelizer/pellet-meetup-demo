var React = require("react")
  , indexJade = require('./index.jade')
  , pellet = require("pellet");

function getData(_this, page, search, next) {
  var api = _this.coordinator('DAL', 'DAL', next?'serialize':void 0);

  if(page < 0) {
    page = 0;
  }

  var limit = 5;
  var offset = limit * page;
  var sql = search ?
      'SELECT title, out(hasGenera).description as genera, first(in(rated)).gender as gender, in(ratings).size() as ratings FROM Movies WHERE title LIKE :search OFFSET :offset' :
      'SELECT title, out(hasGenera).description as genera, first(in(rated)).gender as gender, in(ratings).size() as ratings FROM Movies WHERE OFFSET :offset';

  var instrument = pellet.instrumentation.namespace(process.env.SERVER_ENV?'server.movieDBDemo.':'client.movieDBDemo.');

  pellet.instrumentation.log({type:'search', term:search});

  instrument.increment("search");
  var measure = instrument.elapseTimer(false, "select.");

  measure.mark("start");

  api.select(sql, {offset:offset, search: '%' + search + '%'}, limit, function(err, movies) {
    measure.mark("done");
    if(err) {
      instrument.increment("select.error");
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

    getData(this, 0, this.props.query && this.props.query.search, next);
  },

  componentDidMount: function(nextProps) {
    var _this = this;
    var el = this.refs['search'].getDOMNode();
    pellet.observables.fromEvent(el, "keyup")
      .debounce(300)
      .onValue(function(evt) {
        if(evt.key === 13 || evt.keyCode === 13 || evt.which === 13) {
          el.blur();
        }

        window.history.replaceState(null, null, '/?search=' + encodeURIComponent(el.value));
        getData(_this, 0, (el.value.trim().length > 1) ? el.value : null);
      });
  },

  prev: function() {
    getData(this, this.state.page-1, null);
  },

  next: function() {
    getData(this, this.state.page+1, null);
  },

  setLanguage: function(locale) {
    var _this = this;

    pellet.intl.load(locale, function() {
      _this.setProps({locales: locale});
      pellet.cookie.set('language', locale);
      document.body.setAttribute('locales', locale);
    });
  },

  en: function() {
    this.setLanguage('en-US');
  },

  fr: function() {
    this.setLanguage('fr-FR');
  },

  ja:function() {
    this.setLanguage('ja');
  },

  render: function() {
    return indexJade(this);
  }
});


pellet.setLocaleLookupFn(function(renderOptions, component, options) {
  var loc = renderOptions.http.cookie('language') ||
            renderOptions.http.headers('x-vevo-culture') ||
            pellet.options.locales || 'en-US';
  loc = loc.split('-');
  return loc[0].toLowerCase() + '-' + (loc[1] || loc[0]).toUpperCase();
});