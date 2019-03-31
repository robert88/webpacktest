(function anonymous(myParams
	) {
	"use strict";
	var _context = {};
	var _x = this._x;
	var _taps = this.taps;
	var _interceptors = this.interceptors;
	_interceptors[0].call(_context, myParams);
	do {
	var _counter = 3;
	var _done = () => {
	};
	if(_counter <= 0) break;
	var _tap0 = _taps[0];
	_interceptors[0].tap(_context, _tap0);
	var _fn0 = _x[0];
	_fn0(_context, myParams);
	if(--_counter === 0) _done();
	if(_counter <= 0) break;
	var _tap1 = _taps[1];
	_interceptors[0].tap(_context, _tap1);
	var _fn1 = _x[1];
	_fn1(myParams, _err1 => {
	if(_err1) {
	if(_counter > 0) {
	throw 1;
	}
	} else {
	if(--_counter === 0) _done();
	}
	});
	if(_counter <= 0) break;
	var _tap2 = _taps[2];
	_interceptors[0].tap(_context, _tap2);
	var _fn2 = _x[2];
	var _hasResult2 = false;
	var _promise2 = _fn2(myParams);
	if (!_promise2 || !_promise2.then)
	  throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise2 + ')');
	_promise2.then(_result2 => {
	_hasResult2 = true;
	if(--_counter === 0) _done();
	}, _err2 => {
	if(_hasResult2) throw _err2;
	if(_counter > 0) {
	throw 2;
	}
	});
	} while(false);
	
	})