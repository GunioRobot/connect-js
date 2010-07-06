/**
 * Copyright Yahoo Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 *
 * Contains the public object ``FB.YUI``
 *
 * @provides fb.yui
 * @requires fb.prelude
 *           fb.api
 *           fb.flash
 */

/**
 * YUI context.
 * 
 * @class FB.YUI
 * @static
 * @access public
 */
FB.YUI = YUI( {
	loadOptional : true
});

FB.provide("Flash", {
	hasMinVersion : function() {
		return false;
	}
}, true);

FB.provide("ApiServer", {
	xdr : function(domain, path, method, params, cb) {
		try {
			FB.ApiServer.yui_io_xdr(domain, path, method, params, cb);
		} catch (ex) {
			FB.log(ex);
		}
	},
	yui_io_xdr : function(domain, path, method, params, cb) {
		FB.YUI.use("io-xdr", function(Y) {
			var url = FB._domain[domain] + path;

			if (method !== 'get' && method !== 'post') {
				method = 'post';
				params.method = method;
			}

			var onSuccess = function(transactionid, response, arguments) {
				try {
					var json = FB.JSON.parse(response.responseText);
					cb && cb(json);
				} catch (ex) {
					FB.log(ex);
				}
			};

			var cfg = {
				method : method,
				data : params,
				on : {
					success : onSuccess
				},
				xdr : {
					use : "flash",
					dataType : "json",
					credentials : false
				},
				sync : false
			};
			FB.YuiIo.onReady(function() {
				var request = Y.io(url, cfg);
			});
		});
	}
}, true);

FB.provide("YuiIo", {
	transportCfg : {
		src : "/io.swf"
	},
	/**
	 * The onReady callbacks.
	 * 
	 * @access private
	 * @type Array
	 */
	_callbacks : [],
	init : function() {
		if (FB.YuiIo._readying) {
			return;
		}
		FB.YuiIo._readying = true;
		FB.YUI.use("io-xdr", function(Y) {
			var rc = function(r) {
				FB.YuiIo._ready = true;
				for ( var i = 0, l = FB.YuiIo._callbacks.length; i < l; i++) {
					FB.YuiIo._callbacks[i]();
				}
				FB.YuiIo._callbacks = [];
			};
			Y.on("io:xdrReady", rc);
			Y.io.transport(FB.YuiIo.transportCfg);
		});
	},
	/**
	 * Register a function that needs to ensure YUI.io is ready.
	 * 
	 * @access private
	 * @param cb
	 *            {Function} the function
	 */
	onReady : function(cb) {
		if (FB.YuiIo._ready) {
			/*
			 * this forces the cb to be asynchronous to ensure no one relies on
			 * the _potential_ synchronous nature.
			 */
			window.setTimeout(cb, 0);
		} else {
			FB.YuiIo.init();
			FB.YuiIo._callbacks.push(cb);
		}
	}
}, true);
