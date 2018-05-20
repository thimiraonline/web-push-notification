webpackHotUpdate(0,{58:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(3);\n\nvar _auth = __webpack_require__(59);\n\nvar _pubsubJs = __webpack_require__(12);\n\nvar _pubsubJs2 = _interopRequireDefault(_pubsubJs);\n\n__webpack_require__(61);\n\nvar _router = __webpack_require__(62);\n\nvar _router2 = _interopRequireDefault(_router);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar App = function (_Component) {\n    _inherits(App, _Component);\n\n    function App(props) {\n        _classCallCheck(this, App);\n\n        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));\n\n        _this.state = { \"isLoggedIn\": window.localStorage.getItem('isLoggedIn') };\n        _this.mySubscriber = _this.mySubscriber.bind(_this);\n        _pubsubJs2.default.subscribe('IS_LOGIN', _this.mySubscriber);\n        _this.auth = new _auth.Auth();\n        if (_this.state.isLoggedIn) {\n            _this.auth.activeInterval(_this.props.history);\n        } else {\n            _this.auth.stopInterval();\n        }\n\n        return _this;\n    }\n\n    _createClass(App, [{\n        key: 'initGeolocation',\n        value: function initGeolocation(callback) {\n            if (navigator && navigator.geolocation) {\n                navigator.geolocation.getCurrentPosition(function (position) {\n                    if (window.localStorage.getItem('plat-log') === null) {\n                        window.localStorage.setItem('plat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                    }\n                    callback();\n                }, this.errorCallback, { timeout: 10000 });\n\n                navigator.geolocation.watchPosition(function (position) {\n\n                    if (window.localStorage.getItem('plat-log') !== position.coords.latitude + \"--\" + position.coords.longitude) {\n                        window.localStorage.setItem('plat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    }\n                }, function () {});\n            } else {\n                console.log('Geolocation is not supported');\n            }\n        }\n    }, {\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n            var _this2 = this;\n\n            this.initGeolocation(function () {\n                _this2.getZipcode();\n            });\n        }\n    }, {\n        key: 'getZipcode',\n        value: function getZipcode() {\n            var _this3 = this;\n\n            var lat,\n                lng = '';\n            if (window.localStorage.getItem('plat-log') !== null) {\n                lat = window.localStorage.getItem('plat-log').split('--')[0];\n                lng = window.localStorage.getItem('plat-log').split('--')[1];\n                var geocoder = new google.maps.Geocoder();\n                var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };\n                geocoder.geocode({ 'location': latlng }, function (results, status) {\n                    if (status === 'OK') {\n                        _this3.getZipcode(results);\n                    } else {\n                        window.alert('Geocoder failed due to: ' + status);\n                    }\n                });\n            }\n        }\n    }, {\n        key: 'getZipcode',\n        value: function getZipcode(place) {\n\n            var zipcodes = [];\n            if (Array.isArray(place)) {\n                for (var k = 0; k < place.length; k++) {\n                    for (var i = 0; i < place[k].address_components.length; i++) {\n                        for (var j = 0; j < place[k].address_components[i].types.length; j++) {\n                            if (place[k].address_components[i].types[j] == \"postal_code\") {\n                                // console.log(place[k].address_components[i].long_name);\n                                zipcodes.push(place[k].address_components[i].long_name);\n                            }\n                        }\n                    }\n                }\n            } else {\n                for (var i = 0; i < place.address_components.length; i++) {\n                    for (var j = 0; j < place.address_components[i].types.length; j++) {\n                        if (place.address_components[i].types[j] == \"postal_code\") {\n                            // console.log(place.address_components[i].long_name);\n                            zipcodes.push(place.address_components[i].long_name);\n                        }\n                    }\n                }\n            }\n            console.log(zipcodes);\n            if (zipcodes.length > 0) {\n                window.localStorage.setItem('pzipcodes', zipcodes);\n                //Store in IndexDB\n\n                store.storeinIdb();\n            }\n        }\n    }, {\n        key: 'saveCurrentLocation',\n        value: function saveCurrentLocation() {\n            if (window.localStorage.getItem('deviceToken') !== null && window.localStorage.getItem('plat-log') !== null) {\n                fetch('/api/whereiam', { method: 'post', headers: { 'Content-Type': 'application/json' },\n                    body: JSON.stringify({\n                        platlng: window.localStorage.getItem('plat-log'),\n                        pzipcodes: window.localStorage.getItem('pzipcodes'),\n                        userId: window.localStorage.getItem('userid'),\n                        token: window.localStorage.getItem('deviceToken')\n                    })\n                }).then(function (res) {\n                    return res.json();\n                }).then(function (json) {\n                    console.log(json);\n                });\n            }\n        }\n    }, {\n        key: 'mySubscriber',\n        value: function mySubscriber(msg, data) {\n\n            if (data.status) {\n                window.localStorage.setItem('accessToken', data.token);\n                window.localStorage.setItem('userid', data.userid);\n                window.localStorage.setItem('isLoggedIn', true);\n                this.auth.activeInterval(this.props.history);\n                this.saveCurrentLocation();\n            } else {\n                window.localStorage.removeItem('accessToken');\n                window.localStorage.removeItem('userid');\n                window.localStorage.removeItem('isLoggedIn');\n                this.auth.stopInterval();\n            }\n            this.isLoggedIn(data);\n        }\n    }, {\n        key: 'isLoggedIn',\n        value: function isLoggedIn(data) {\n            var boolFlag = window.localStorage.getItem('isLoggedIn');\n            if (data.hasOwnProperty('callback')) {\n                data.callback();\n            }\n\n            if (!data.status) {\n                _pubsubJs2.default.publish('IS_LOGOUT');\n            }\n\n            this.setState({\n                isLoggedIn: boolFlag !== null && boolFlag !== '' ? JSON.parse(boolFlag) : false\n            });\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return _react2.default.createElement(\n                'div',\n                null,\n                _react2.default.createElement(_router2.default, { islogin: this.state.isLoggedIn })\n            );\n        }\n    }]);\n\n    return App;\n}(_react.Component);\n\nexports.default = (0, _reactRouterDom.withRouter)(App);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL0FwcC5qcz9hMGY1Il0sIm5hbWVzIjpbIkFwcCIsInByb3BzIiwic3RhdGUiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibXlTdWJzY3JpYmVyIiwiYmluZCIsIlB1YlN1YiIsInN1YnNjcmliZSIsImF1dGgiLCJBdXRoIiwiaXNMb2dnZWRJbiIsImFjdGl2ZUludGVydmFsIiwiaGlzdG9yeSIsInN0b3BJbnRlcnZhbCIsImNhbGxiYWNrIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJwb3NpdGlvbiIsInNldEl0ZW0iLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImVycm9yQ2FsbGJhY2siLCJ0aW1lb3V0Iiwid2F0Y2hQb3NpdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJpbml0R2VvbG9jYXRpb24iLCJnZXRaaXBjb2RlIiwibGF0IiwibG5nIiwic3BsaXQiLCJnZW9jb2RlciIsImdvb2dsZSIsIm1hcHMiLCJHZW9jb2RlciIsImxhdGxuZyIsInBhcnNlRmxvYXQiLCJnZW9jb2RlIiwicmVzdWx0cyIsInN0YXR1cyIsImFsZXJ0IiwicGxhY2UiLCJ6aXBjb2RlcyIsIkFycmF5IiwiaXNBcnJheSIsImsiLCJsZW5ndGgiLCJpIiwiYWRkcmVzc19jb21wb25lbnRzIiwiaiIsInR5cGVzIiwicHVzaCIsImxvbmdfbmFtZSIsInN0b3JlIiwic3RvcmVpbklkYiIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicGxhdGxuZyIsInB6aXBjb2RlcyIsInVzZXJJZCIsInRva2VuIiwidGhlbiIsInJlcyIsImpzb24iLCJtc2ciLCJkYXRhIiwidXNlcmlkIiwic2F2ZUN1cnJlbnRMb2NhdGlvbiIsInJlbW92ZUl0ZW0iLCJib29sRmxhZyIsImhhc093blByb3BlcnR5IiwicHVibGlzaCIsInNldFN0YXRl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QWUsV0FBZjtBQUNIOztBQUVELGlCQUFLQyxRQUFMLENBQWM7QUFDVnBFLDRCQUFhaUUsYUFBYSxJQUFiLElBQXFCQSxhQUFhLEVBQW5DLEdBQXlDZCxLQUFLa0IsS0FBTCxDQUFXSixRQUFYLENBQXpDLEdBQWdFO0FBRGxFLGFBQWQ7QUFHSDs7O2lDQUNRO0FBQ0wsbUJBQ1E7QUFBQTtBQUFBO0FBQ0ksOENBQUMsZ0JBQUQsSUFBUyxTQUFTLEtBQUszRSxLQUFMLENBQVdVLFVBQTdCO0FBREosYUFEUjtBQUlIOzs7O0VBNUphc0UsZ0I7O2tCQStKSCxnQ0FBV2xGLEdBQVgsQyIsImZpbGUiOiI1OC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlcywgQ29tcG9uZW50fSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xyXG5pbXBvcnQge0F1dGh9IGZyb20gJy4vY29tbW9uL2F1dGgnO1xyXG5pbXBvcnQgUHViU3ViIGZyb20gJ3B1YnN1Yi1qcyc7XHJcbmltcG9ydCAnLi9zdHlsZS9jc3MvQXBwLnNjc3MnO1xyXG5pbXBvcnQgUm91dGluZyBmcm9tICcuL3JvdXRlci9yb3V0ZXInO1xyXG5jbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcImlzTG9nZ2VkSW5cIjogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc0xvZ2dlZEluJyl9O1xyXG4gICAgICAgIHRoaXMubXlTdWJzY3JpYmVyID0gdGhpcy5teVN1YnNjcmliZXIuYmluZCh0aGlzKTtcclxuICAgICAgICBQdWJTdWIuc3Vic2NyaWJlKCdJU19MT0dJTicsIHRoaXMubXlTdWJzY3JpYmVyKTtcclxuICAgICAgICB0aGlzLmF1dGggPSBuZXcgQXV0aCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzTG9nZ2VkSW4pIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLmFjdGl2ZUludGVydmFsKHRoaXMucHJvcHMuaGlzdG9yeSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEdlb2xvY2F0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbigocG9zaXRpb24pPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGxhdC1sb2cnLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMuZXJyb3JDYWxsYmFjaywge3RpbWVvdXQ6IDEwMDAwfSk7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKChwb3NpdGlvbik9PiB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIGlmKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKSE9PSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BsYXQtbG9nJywgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCItLVwiICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSk7ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pOyAgXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHZW9sb2NhdGlvbiBpcyBub3Qgc3VwcG9ydGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0R2VvbG9jYXRpb24oICgpPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdldFppcGNvZGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRaaXBjb2RlKCkge1xyXG4gICAgICAgIHZhciBsYXQsIGxuZyA9ICcnO1xyXG4gICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJykgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgbGF0ID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwbGF0LWxvZycpLnNwbGl0KCctLScpWzBdO1xyXG4gICAgICAgICAgICBsbmcgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJykuc3BsaXQoJy0tJylbMV07XHJcbiAgICAgICAgICAgIHZhciBnZW9jb2RlciA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcjtcclxuICAgICAgICAgICAgdmFyIGxhdGxuZyA9IHtsYXQ6IHBhcnNlRmxvYXQobGF0KSwgbG5nOiBwYXJzZUZsb2F0KGxuZyl9O1xyXG4gICAgICAgICAgICBnZW9jb2Rlci5nZW9jb2RlKHsnbG9jYXRpb24nOiBsYXRsbmd9LCAocmVzdWx0cywgc3RhdHVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnT0snKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRaaXBjb2RlKHJlc3VsdHMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoJ0dlb2NvZGVyIGZhaWxlZCBkdWUgdG86ICcgKyBzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WmlwY29kZShwbGFjZSkge1xyXG5cclxuICAgICAgICB2YXIgemlwY29kZXMgPSBbXTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwbGFjZSkpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBwbGFjZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGFjZVtrXS5hZGRyZXNzX2NvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBsYWNlW2tdLmFkZHJlc3NfY29tcG9uZW50c1tpXS50eXBlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2Vba10uYWRkcmVzc19jb21wb25lbnRzW2ldLnR5cGVzW2pdID09IFwicG9zdGFsX2NvZGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocGxhY2Vba10uYWRkcmVzc19jb21wb25lbnRzW2ldLmxvbmdfbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6aXBjb2Rlcy5wdXNoKHBsYWNlW2tdLmFkZHJlc3NfY29tcG9uZW50c1tpXS5sb25nX25hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldLnR5cGVzW2pdID09IFwicG9zdGFsX2NvZGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0ubG9uZ19uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgemlwY29kZXMucHVzaChwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0ubG9uZ19uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHppcGNvZGVzKTtcclxuICAgICAgICBpZiAoemlwY29kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3B6aXBjb2RlcycsIHppcGNvZGVzKTtcclxuICAgICAgICAgICAgLy9TdG9yZSBpbiBJbmRleERCXHJcblxyXG4gICAgICAgICAgICBzdG9yZS5zdG9yZWluSWRiKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNhdmVDdXJyZW50TG9jYXRpb24oKSB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGV2aWNlVG9rZW4nKSAhPT0gbnVsbCAmJiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJykgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgZmV0Y2goJy9hcGkvd2hlcmVpYW0nLCB7bWV0aG9kOiAncG9zdCcsIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF0bG5nOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJyksXHJcbiAgICAgICAgICAgICAgICAgICAgcHppcGNvZGVzOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3B6aXBjb2RlcycpLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyaWQnKSxcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkZXZpY2VUb2tlbicpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coanNvbik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG15U3Vic2NyaWJlcihtc2csIGRhdGEpIHtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWNjZXNzVG9rZW4nLCBkYXRhLnRva2VuKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyaWQnLCBkYXRhLnVzZXJpZCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXNMb2dnZWRJbicsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmF1dGguYWN0aXZlSW50ZXJ2YWwodGhpcy5wcm9wcy5oaXN0b3J5KTtcclxuICAgICAgICAgICAgdGhpcy5zYXZlQ3VycmVudExvY2F0aW9uKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhY2Nlc3NUb2tlbicpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJpZCcpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2lzTG9nZ2VkSW4nKTtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzTG9nZ2VkSW4oZGF0YSk7XHJcbiAgICB9XHJcbiAgICBpc0xvZ2dlZEluKGRhdGEpIHtcclxuICAgICAgICB2YXIgYm9vbEZsYWcgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lzTG9nZ2VkSW4nKTtcclxuICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnY2FsbGJhY2snKSkge1xyXG4gICAgICAgICAgICBkYXRhLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWRhdGEuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIFB1YlN1Yi5wdWJsaXNoKCdJU19MT0dPVVQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBpc0xvZ2dlZEluOiAoYm9vbEZsYWcgIT09IG51bGwgJiYgYm9vbEZsYWcgIT09ICcnKSA/IEpTT04ucGFyc2UoYm9vbEZsYWcpIDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8Um91dGluZyBpc2xvZ2luPXt0aGlzLnN0YXRlLmlzTG9nZ2VkSW59IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj4pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKEFwcCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvQXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///58\n")}});