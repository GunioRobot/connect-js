var FB_MODULES = {
	loadOptional : true,
	groups : {
		"gallery-fb" : {
			combine : false,
			// base : "http://l.yimg.com/a/lib/sp/fn/",
			base : "http://localhost:8888/target/classes/",
			modules : {
				"gallery-fb-connect" : {
					// path : "js/gallery_fb_connect.js",
					path : "gallery-fb-connect.js?",
					requires : [ "gallery-fb-connect-css" ]
				},
				"gallery-fb-connect-css" : {
					// path : "css/gallery_fb_connect.css",
					path : "gallery-fb-connect.css?",
					type : "css"
				}
			}
		}
	}
};

var FB_MODULES_CDN = {
	loadOptional : true,
	groups : {
		"gallery-fb" : {
			combine : false,
			base : "http://l.yimg.com/a/lib/sp/fn/",
			modules : {
				"gallery-fb-connect" : {
					path : "js/gallery_fb_connect.js?",
					requires : [ "gallery-fb-connect-css" ]
				},
				"gallery-fb-connect-css" : {
					path : "css/gallery_fb_connect.css?",
					type : "css"
				}
			}
		}
	}
};

var FB_INIT = {
	FB : {
		init : {
			appId : 130375173667364,
			logging : true,
			status : true,
			cookie : true,
			xfbml : true,
			channelUrl : "http://localhost:8888/examples/yuixdr/channelUrl.html"
		},
		YuiIo : {
			transportCfg : {
				src : "http://localhost:8888/target/classes/io.swf"
			}
		}
	}
};
