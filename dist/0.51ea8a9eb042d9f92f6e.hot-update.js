webpackHotUpdate(0,{58:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(3);\n\nvar _auth = __webpack_require__(59);\n\nvar _pubsubJs = __webpack_require__(12);\n\nvar _pubsubJs2 = _interopRequireDefault(_pubsubJs);\n\n__webpack_require__(61);\n\nvar _router = __webpack_require__(62);\n\nvar _router2 = _interopRequireDefault(_router);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar App = function (_Component) {\n    _inherits(App, _Component);\n\n    function App(props) {\n        _classCallCheck(this, App);\n\n        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));\n\n        _this.state = { \"isLoggedIn\": window.localStorage.getItem('isLoggedIn') };\n        _this.mySubscriber = _this.mySubscriber.bind(_this);\n        _pubsubJs2.default.subscribe('IS_LOGIN', _this.mySubscriber);\n        _this.auth = new _auth.Auth();\n        if (_this.state.isLoggedIn) {\n            _this.auth.activeInterval(_this.props.history);\n        } else {\n            _this.auth.stopInterval();\n        }\n\n        return _this;\n    }\n\n    _createClass(App, [{\n        key: 'initGeolocation',\n        value: function initGeolocation(callback) {\n            if (navigator && navigator.geolocation) {\n                navigator.geolocation.getCurrentPosition(function (position) {\n                    if (window.localStorage.getItem('plat-log') === null) {\n                        window.localStorage.setItem('plat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                    }\n                    callback();\n                }, this.errorCallback, { timeout: 10000 });\n                //navigator.geolocation.watchPosition(this.successCallback, this.errorCallback);\n            } else {\n                console.log('Geolocation is not supported');\n            }\n        }\n    }, {\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n            var _this2 = this;\n\n            this.initGeolocation(function () {\n                _this2.initialize();\n            });\n        }\n    }, {\n        key: 'initialize',\n        value: function initialize() {\n            var _this3 = this;\n\n            var lat,\n                lng = '';\n            if (window.localStorage.getItem('plat-log') !== null) {\n                lat = window.localStorage.getItem('plat-log').split('--')[0];\n                lng = window.localStorage.getItem('plat-log').split('--')[1];\n                var geocoder = new google.maps.Geocoder();\n                var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };\n                geocoder.geocode({ 'location': latlng }, function (results, status) {\n                    if (status === 'OK') {\n                        _this3.getZipcode(results);\n                    } else {\n                        window.alert('Geocoder failed due to: ' + status);\n                    }\n                });\n            }\n        }\n    }, {\n        key: 'getZipcode',\n        value: function getZipcode(place) {\n\n            var zipcodes = [];\n            if (Array.isArray(place)) {\n                for (var k = 0; k < place.length; k++) {\n                    for (var i = 0; i < place[k].address_components.length; i++) {\n                        for (var j = 0; j < place[k].address_components[i].types.length; j++) {\n                            if (place[k].address_components[i].types[j] == \"postal_code\") {\n                                // console.log(place[k].address_components[i].long_name);\n                                zipcodes.push(place[k].address_components[i].long_name);\n                            }\n                        }\n                    }\n                }\n            } else {\n                for (var i = 0; i < place.address_components.length; i++) {\n                    for (var j = 0; j < place.address_components[i].types.length; j++) {\n                        if (place.address_components[i].types[j] == \"postal_code\") {\n                            // console.log(place.address_components[i].long_name);\n                            zipcodes.push(place.address_components[i].long_name);\n                        }\n                    }\n                }\n            }\n            console.log(zipcodes);\n            if (zipcodes.length > 0) {\n                window.localStorage.setItem('pzipcodes', zipcodes);\n                //Store in IndexDB\n\n                store.storeinIdb();\n            }\n        }\n    }, {\n        key: 'saveCurrentLocation',\n        value: function saveCurrentLocation() {\n            alert(1);\n            if (window.localStorage.getItem('deviceToken') !== null && window.localStorage.getItem('platlog') !== null) {\n                fetch('/api/whereiam', { method: 'post', headers: { 'Content-Type': 'application/json' },\n                    body: JSON.stringify({\n                        platlng: window.localStorage.getItem('plat-log'),\n                        pzipcodes: window.localStorage.getItem('pzipcodes'),\n                        userId: window.localStorage.getItem('userid'),\n                        token: window.localStorage.getItem('deviceToken')\n                    })\n                }).then(function (res) {\n                    return res.json();\n                }).then(function (json) {\n                    console.log(json);\n                });\n            }\n        }\n    }, {\n        key: 'mySubscriber',\n        value: function mySubscriber(msg, data) {\n\n            if (data.status) {\n                window.localStorage.setItem('accessToken', data.token);\n                window.localStorage.setItem('userid', data.userid);\n                window.localStorage.setItem('isLoggedIn', true);\n                this.auth.activeInterval(this.props.history);\n                this.saveCurrentLocation();\n            } else {\n                window.localStorage.removeItem('accessToken');\n                window.localStorage.removeItem('userid');\n                window.localStorage.removeItem('isLoggedIn');\n                this.auth.stopInterval();\n            }\n            this.isLoggedIn(data);\n        }\n    }, {\n        key: 'isLoggedIn',\n        value: function isLoggedIn(data) {\n            var boolFlag = window.localStorage.getItem('isLoggedIn');\n            if (data.hasOwnProperty('callback')) {\n                data.callback();\n            }\n\n            if (!data.status) {\n                _pubsubJs2.default.publish('IS_LOGOUT');\n            }\n\n            this.setState({\n                isLoggedIn: boolFlag !== null && boolFlag !== '' ? JSON.parse(boolFlag) : false\n            });\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return _react2.default.createElement(\n                'div',\n                null,\n                _react2.default.createElement(_router2.default, { islogin: this.state.isLoggedIn })\n            );\n        }\n    }]);\n\n    return App;\n}(_react.Component);\n\nexports.default = (0, _reactRouterDom.withRouter)(App);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL0FwcC5qcz9hMGY1Il0sIm5hbWVzIjpbIkFwcCIsInByb3BzIiwic3RhdGUiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibXlTdWJzY3JpYmVyIiwiYmluZCIsIlB1YlN1YiIsInN1YnNjcmliZSIsImF1dGgiLCJBdXRoIiwiaXNMb2dnZWRJbiIsImFjdGl2ZUludGVydmFsIiwiaGlzdG9yeSIsInN0b3BJbnRlcnZhbCIsImNhbGxiYWNrIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJwb3NpdGlvbiIsInNldEl0ZW0iLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImVycm9yQ2FsbGJhY2siLCJ0aW1lb3V0IiwiY29uc29sZSIsImxvZyIsImluaXRHZW9sb2NhdGlvbiIsImluaXRpYWxpemUiLCJsYXQiLCJsbmciLCJzcGxpdCIsImdlb2NvZGVyIiwiZ29vZ2xlIiwibWFwcyIsIkdlb2NvZGVyIiwibGF0bG5nIiwicGFyc2VGbG9hdCIsImdlb2NvZGUiLCJyZXN1bHRzIiwic3RhdHVzIiwiZ2V0WmlwY29kZSIsImFsZXJ0IiwicGxhY2UiLCJ6aXBjb2RlcyIsIkFycmF5IiwiaXNBcnJheSIsImsiLCJsZW5ndGgiLCJpIiwiYWRkcmVzc19jb21wb25lbnRzIiwiaiIsInR5cGVzIiwicHVzaCIsImxvbmdfbmFtZSIsInN0b3JlIiwic3RvcmVpbklkYiIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicGxhdGxuZyIsInB6aXBjb2RlcyIsInVzZXJJZCIsInRva2VuIiwidGhlbiIsInJlcyIsImpzb24iLCJtc2ciLCJkYXRhIiwidXNlcmlkIiwic2F2ZUN1cnJlbnRMb2NhdGlvbiIsInJlbW92ZUl0ZW0iLCJib29sRmxhZyIsImhhc093blByb3BlcnR5IiwicHVibGlzaCIsInNldFN0YXRlIiwi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Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xyXG5pbXBvcnQge0F1dGh9IGZyb20gJy4vY29tbW9uL2F1dGgnO1xyXG5pbXBvcnQgUHViU3ViIGZyb20gJ3B1YnN1Yi1qcyc7XHJcbmltcG9ydCAnLi9zdHlsZS9jc3MvQXBwLnNjc3MnO1xyXG5pbXBvcnQgUm91dGluZyBmcm9tICcuL3JvdXRlci9yb3V0ZXInO1xyXG5jbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcImlzTG9nZ2VkSW5cIjogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc0xvZ2dlZEluJyl9O1xyXG4gICAgICAgIHRoaXMubXlTdWJzY3JpYmVyID0gdGhpcy5teVN1YnNjcmliZXIuYmluZCh0aGlzKTtcclxuICAgICAgICBQdWJTdWIuc3Vic2NyaWJlKCdJU19MT0dJTicsIHRoaXMubXlTdWJzY3JpYmVyKTtcclxuICAgICAgICB0aGlzLmF1dGggPSBuZXcgQXV0aCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzTG9nZ2VkSW4pIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLmFjdGl2ZUludGVydmFsKHRoaXMucHJvcHMuaGlzdG9yeSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEdlb2xvY2F0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbigocG9zaXRpb24pPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGxhdC1sb2cnLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMuZXJyb3JDYWxsYmFjaywge3RpbWVvdXQ6IDEwMDAwfSk7XHJcbiAgICAgICAgICAgIC8vbmF2aWdhdG9yLmdlb2xvY2F0aW9uLndhdGNoUG9zaXRpb24odGhpcy5zdWNjZXNzQ2FsbGJhY2ssIHRoaXMuZXJyb3JDYWxsYmFjayk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dlb2xvY2F0aW9uIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmluaXRHZW9sb2NhdGlvbiggKCk9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgdmFyIGxhdCwgbG5nID0gJyc7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsYXQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJykuc3BsaXQoJy0tJylbMF07XHJcbiAgICAgICAgICAgIGxuZyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKS5zcGxpdCgnLS0nKVsxXTtcclxuICAgICAgICAgICAgdmFyIGdlb2NvZGVyID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyO1xyXG4gICAgICAgICAgICB2YXIgbGF0bG5nID0ge2xhdDogcGFyc2VGbG9hdChsYXQpLCBsbmc6IHBhcnNlRmxvYXQobG5nKX07XHJcbiAgICAgICAgICAgIGdlb2NvZGVyLmdlb2NvZGUoeydsb2NhdGlvbic6IGxhdGxuZ30sIChyZXN1bHRzLCBzdGF0dXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdPSycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFppcGNvZGUocmVzdWx0cyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydCgnR2VvY29kZXIgZmFpbGVkIGR1ZSB0bzogJyArIHN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRaaXBjb2RlKHBsYWNlKSB7XHJcblxyXG4gICAgICAgIHZhciB6aXBjb2RlcyA9IFtdO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBsYWNlKSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHBsYWNlLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWNlW2tdLmFkZHJlc3NfY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGxhY2Vba10uYWRkcmVzc19jb21wb25lbnRzW2ldLnR5cGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGFjZVtrXS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXNbal0gPT0gXCJwb3N0YWxfY29kZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwbGFjZVtrXS5hZGRyZXNzX2NvbXBvbmVudHNbaV0ubG9uZ19uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHppcGNvZGVzLnB1c2gocGxhY2Vba10uYWRkcmVzc19jb21wb25lbnRzW2ldLmxvbmdfbmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2UuYWRkcmVzc19jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXS50eXBlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXNbal0gPT0gXCJwb3N0YWxfY29kZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXS5sb25nX25hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB6aXBjb2Rlcy5wdXNoKHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXS5sb25nX25hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coemlwY29kZXMpO1xyXG4gICAgICAgIGlmICh6aXBjb2Rlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHppcGNvZGVzJywgemlwY29kZXMpO1xyXG4gICAgICAgICAgICAvL1N0b3JlIGluIEluZGV4REJcclxuXHJcbiAgICAgICAgICAgIHN0b3JlLnN0b3JlaW5JZGIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUN1cnJlbnRMb2NhdGlvbigpIHtcclxuICAgICAgICBhbGVydCgxKVxyXG4gICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RldmljZVRva2VuJykgIT09IG51bGwgJiYgd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwbGF0bG9nJykgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgZmV0Y2goJy9hcGkvd2hlcmVpYW0nLCB7bWV0aG9kOiAncG9zdCcsIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF0bG5nOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJyksXHJcbiAgICAgICAgICAgICAgICAgICAgcHppcGNvZGVzOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3B6aXBjb2RlcycpLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyaWQnKSxcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkZXZpY2VUb2tlbicpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coanNvbik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG15U3Vic2NyaWJlcihtc2csIGRhdGEpIHtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWNjZXNzVG9rZW4nLCBkYXRhLnRva2VuKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyaWQnLCBkYXRhLnVzZXJpZCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXNMb2dnZWRJbicsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmF1dGguYWN0aXZlSW50ZXJ2YWwodGhpcy5wcm9wcy5oaXN0b3J5KTtcclxuICAgICAgICAgICAgdGhpcy5zYXZlQ3VycmVudExvY2F0aW9uKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhY2Nlc3NUb2tlbicpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJpZCcpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2lzTG9nZ2VkSW4nKTtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzTG9nZ2VkSW4oZGF0YSk7XHJcbiAgICB9XHJcbiAgICBpc0xvZ2dlZEluKGRhdGEpIHtcclxuICAgICAgICB2YXIgYm9vbEZsYWcgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lzTG9nZ2VkSW4nKTtcclxuICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnY2FsbGJhY2snKSkge1xyXG4gICAgICAgICAgICBkYXRhLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWRhdGEuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIFB1YlN1Yi5wdWJsaXNoKCdJU19MT0dPVVQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBpc0xvZ2dlZEluOiAoYm9vbEZsYWcgIT09IG51bGwgJiYgYm9vbEZsYWcgIT09ICcnKSA/IEpTT04ucGFyc2UoYm9vbEZsYWcpIDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8Um91dGluZyBpc2xvZ2luPXt0aGlzLnN0YXRlLmlzTG9nZ2VkSW59IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj4pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKEFwcCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvQXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///58\n")}});