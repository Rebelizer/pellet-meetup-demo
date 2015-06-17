var pellet = require('pellet')
  , superagent = require('superagent');

function djb2(str) {
  var hash = 5381, i = str.length;
  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0;
}

pellet.registerCoordinatorSpec("DAL", {
	initialize: function() {
		this.cache = {};
	},

	load: function(data) {
		for(var i in data) {
			var item = data[i];
			this.cache[item.key] = item.val;
		}
	},

	select: function(sql, params, limit, next) {
		var body = {
			SQL: sql,
			params: params,
			limit:limit
		};

		var key = djb2(JSON.stringify(body));
		var data = this.cache[key];
		var _this = this;

		// cache hit
		if(data) {
			// make cache hit callback act like async calls (so they do not exec right away)
			if(process.env.SERVER_ENV) {
				process.nextTick(function () {
					_this.event("api").emit({type: 'select', err: null, data: data, params: params, limit:limit});
					_this.event("serialize").emit({key: key, val: data});
					next && next(null, data);
				});
			} else {
				setTimeout(function () {
					_this.event("api").emit({type: 'select', err: null, data: data, params: params, limit:limit});
					_this.event("serialize").emit({key: key, val: data});
					next && next(null, data);
				}, 1);
			}

			return;
		}

		// cache miss
		superagent
	   .post(pellet.config.RESTFulAPIBaseUrl + '/api/select')
	   .send(body)
	   .set('X-API-Key', '849b7648-14b8-4154-9ef2-8d1dc4c2b7e9')
	   .set('Accept', 'application/json')
	   .end(function(err, res) {
				// do not cache error
				if(err) {
					_this.event("api").emit({type: 'select', err: new Error('hard error'), data: data, params: params, limit:limit});
					next && next(new Error('hard error'), data);
					return;
				}

				if (res.ok) {
					// update the cache
					_this.cache[key] = res.body;

					_this.event("api").emit({type: 'select', err: null, data: res.body, params: params, limit:limit});
					_this.event("serialize").emit({key: key, val: res.body});
					next && next(null, res.body);
				} else {
					_this.event("api").emit({type: 'select', err: new Error('database error'), data: data, params: params, limit:limit});
					next && next(new Error('database error'), data);
				}
			});
	}
});
