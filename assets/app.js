(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require("./global/main")();
},{"./global/main":3}],2:[function(require,module,exports){
module.exports = function() {
  cookie = {
    set: function (name, value, seconds) {
        if (seconds) {
          var date = new Date();
          date.setTime(date.getTime() + (seconds * 1000));
          var expires = "; expires="+date.toGMTString();
        } else {
          var expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    get: function (name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0)
          return c.substring(nameEQ.length,c.length);
      }
      return null;
    },
    delete: function (name) {
      this.set(name,"",-1);
    }
  }
  return cookie;
}
},{}],3:[function(require,module,exports){
var cookie = require('./cookie')();
module.exports = function() {
  // set background img
  var cookie_name = 'xxoo';
  if(window.headerBg && window.headerBg != undefined) {
    var header_bg_array = headerBg.split(',');
    if (!cookie.get(cookie_name)) {
      var header_bg_len = header_bg_array.length;
      var random_num = parseInt(Math.random() * header_bg_len);
      cookie.set(cookie_name, random_num, 24 * 60 * 60);
      var img_url = header_bg_array[random_num];
    } else {
      var id = parseInt(cookie.get(cookie_name));
      var img_url = header_bg_array[id];
    }
    // 获取屏幕分辨率
    var screen_w = parseInt(window.screen.width);
    setTimeout(function() {
      var img_elem = new Image();
      img_elem.src = img_url;
      img_elem.onload = function() {
        var site_header_elem = document.getElementById('site-header');
        site_header_elem.style['backgroundImage'] = "url(" + img_url + ")";
      }
    }, 1000);
  }
}
},{"./cookie":2}]},{},[1])