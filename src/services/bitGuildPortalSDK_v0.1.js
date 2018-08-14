(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.sdk = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var prefix = "https://www.bitguild.com/api/";

  var _default = new (
    /*#__PURE__*/
    function () {
      function BitGuildSDK() {
        _classCallCheck(this, BitGuildSDK);

        Object.defineProperty(this, "user", {
          configurable: true,
          enumerable: true,
          writable: true,
          value: null
        });
        Object.defineProperty(this, "_init", {
          configurable: true,
          enumerable: true,
          writable: true,
          value: null
        });
        Object.defineProperty(this, "_user", {
          configurable: true,
          enumerable: true,
          writable: true,
          value: null
        });
      }

      _createClass(BitGuildSDK, [{
        key: "init",
        value: function init() {
          if (!this._init) {
            this._init = new Promise(function (resolve, reject) {
              setTimeout(function () {
                reject(new Error("timeout!"));
              }, 200);
              window.addEventListener("message", function (_ref) {
                var data = _ref.data;

                if (data.type === "pong") {
                  resolve();
                }
              }, false);
              window.top.postMessage({
                type: "ping"
              }, "*");
            });
          }

          return this._init;
        }
      }, {
        key: "receiveMessage",
        value: function receiveMessage(resolve) {
          var _this = this;

          return function (_ref2) {
            var data = _ref2.data;

            switch (data.type) {
              case "user":
                _this.user = data.user;
                break;

              default:
                break;
            }

            resolve();
          };
        }
      }, {
        key: "isOnPortal",
        value: function isOnPortal() {
          return this.init().then(function () {
            return true;
          }).catch(function () {
            return false;
          });
        }
      }, {
        key: "getUser",
        value: function getUser() {
          var _this2 = this;

          return this.init().then(function () {
            if (!_this2._user) {
              _this2._user = new Promise(function (resolve, reject) {
                setTimeout(function () {
                  reject(new Error("timeout!"));
                }, 200);
                window.addEventListener("message", function (_ref3) {
                  var data = _ref3.data;

                  if (data.type === "user") {
                    _this2.user = data.user;
                    resolve();
                  }
                }, false);
                window.top.postMessage({
                  type: "user"
                }, "*");
              });
            }

            return _this2._user;
          }).then(function () {
            return _this2.user;
          });
        }
      }, {
        key: "getUsersByAddress",
        value: function getUsersByAddress() {
          var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          var query = "{ usersByWallet(wallets:".concat(JSON.stringify(address), ") { id wallet nickName language } }");
          return fetch(prefix, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
              query: query
            })
          }).then(function (response) {
            return response.json().then(function (json) {
              if (!response.ok) {
                return Promise.reject(json.errors);
              }

              return {
                list: json.data.usersByWallet.reduce(function (memo, item) {
                  return _extends({}, memo, _defineProperty({}, item.wallet, item));
                }, {})
              };
            });
          });
        }
      }]);

      return BitGuildSDK;
    }())();

  _exports.default = _default;
});