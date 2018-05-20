webpackHotUpdate(0,{58:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(3);\n\nvar _auth = __webpack_require__(59);\n\nvar _pubsubJs = __webpack_require__(12);\n\nvar _pubsubJs2 = _interopRequireDefault(_pubsubJs);\n\n__webpack_require__(61);\n\nvar _router = __webpack_require__(62);\n\nvar _router2 = _interopRequireDefault(_router);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar App = function (_Component) {\n    _inherits(App, _Component);\n\n    function App(props) {\n        _classCallCheck(this, App);\n\n        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));\n\n        _this.state = { \"isLoggedIn\": window.localStorage.getItem('isLoggedIn') };\n        _this.mySubscriber = _this.mySubscriber.bind(_this);\n        _pubsubJs2.default.subscribe('IS_LOGIN', _this.mySubscriber);\n        _this.auth = new _auth.Auth();\n        if (_this.state.isLoggedIn) {\n            _this.auth.activeInterval(_this.props.history);\n        } else {\n            _this.auth.stopInterval();\n        }\n\n        return _this;\n    }\n\n    _createClass(App, [{\n        key: 'initGeolocation',\n        value: function initGeolocation(callback) {\n            if (navigator && navigator.geolocation) {\n                navigator.geolocation.getCurrentPosition(function (position, callback) {\n\n                    if (window.localStorage.getItem('plat-log') === null) {\n                        window.localStorage.setItem('plat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                    }\n                    callback();\n                }, this.errorCallback, { timeout: 10000 });\n                //navigator.geolocation.watchPosition(this.successCallback, this.errorCallback);\n            } else {\n                console.log('Geolocation is not supported');\n            }\n        }\n    }, {\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n            var _this2 = this;\n\n            this.initGeolocation(function () {\n                _this2.initialize();\n            });\n            // \n        }\n    }, {\n        key: 'initialize',\n        value: function initialize() {\n            var _this3 = this;\n\n            alert(1);\n            var lat,\n                lng = '';\n            if (window.localStorage.getItem('plat-log') !== null) {\n                lat = window.localStorage.getItem('plat-log').split('--')[0];\n                lng = window.localStorage.getItem('plat-log').split('--')[1];\n                var geocoder = new google.maps.Geocoder();\n                var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };\n                geocoder.geocode({ 'location': latlng }, function (results, status) {\n                    if (status === 'OK') {\n                        _this3.getZipcode(results);\n                    } else {\n                        window.alert('Geocoder failed due to: ' + status);\n                    }\n                });\n            }\n        }\n    }, {\n        key: 'getZipcode',\n        value: function getZipcode(place) {\n\n            var zipcodes = [];\n            if (Array.isArray(place)) {\n                for (var k = 0; k < place.length; k++) {\n                    for (var i = 0; i < place[k].address_components.length; i++) {\n                        for (var j = 0; j < place[k].address_components[i].types.length; j++) {\n                            if (place[k].address_components[i].types[j] == \"postal_code\") {\n                                // console.log(place[k].address_components[i].long_name);\n                                zipcodes.push(place[k].address_components[i].long_name);\n                            }\n                        }\n                    }\n                }\n            } else {\n                for (var i = 0; i < place.address_components.length; i++) {\n                    for (var j = 0; j < place.address_components[i].types.length; j++) {\n                        if (place.address_components[i].types[j] == \"postal_code\") {\n                            // console.log(place.address_components[i].long_name);\n                            zipcodes.push(place.address_components[i].long_name);\n                        }\n                    }\n                }\n            }\n            console.log(zipcodes);\n            if (zipcodes.length > 0) {\n                window.localStorage.setItem('pzipcodes', zipcodes);\n                //Store in IndexDB\n\n                store.storeinIdb();\n            }\n        }\n    }, {\n        key: 'saveCurrentLocation',\n        value: function saveCurrentLocation() {\n            if (window.localStorage.getItem('deviceToken') !== null && window.localStorage.getItem('platlog') !== null) {\n                fetch('/api/whereiam', { method: 'post', headers: { 'Content-Type': 'application/json' },\n                    body: JSON.stringify({\n                        platlng: window.localStorage.getItem('plat-log'),\n                        pzipcodes: window.localStorage.getItem('pzipcodes'),\n                        userId: window.localStorage.getItem('userid'),\n                        token: window.localStorage.getItem('deviceToken')\n                    })\n                }).then(function (res) {\n                    return res.json();\n                }).then(function (json) {\n                    console.log(json);\n                });\n            }\n        }\n    }, {\n        key: 'mySubscriber',\n        value: function mySubscriber(msg, data) {\n\n            if (data.status) {\n                window.localStorage.setItem('accessToken', data.token);\n                window.localStorage.setItem('userid', data.userid);\n                window.localStorage.setItem('isLoggedIn', true);\n                this.auth.activeInterval(this.props.history);\n                this.saveCurrentLocation();\n            } else {\n                window.localStorage.removeItem('accessToken');\n                window.localStorage.removeItem('userid');\n                window.localStorage.removeItem('isLoggedIn');\n                this.auth.stopInterval();\n            }\n            this.isLoggedIn(data);\n        }\n    }, {\n        key: 'isLoggedIn',\n        value: function isLoggedIn(data) {\n            var boolFlag = window.localStorage.getItem('isLoggedIn');\n            if (data.hasOwnProperty('callback')) {\n                data.callback();\n            }\n\n            if (!data.status) {\n                _pubsubJs2.default.publish('IS_LOGOUT');\n            }\n\n            this.setState({\n                isLoggedIn: boolFlag !== null && boolFlag !== '' ? JSON.parse(boolFlag) : false\n            });\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return _react2.default.createElement(\n                'div',\n                null,\n                _react2.default.createElement(_router2.default, { islogin: this.state.isLoggedIn })\n            );\n        }\n    }]);\n\n    return App;\n}(_react.Component);\n\nexports.default = (0, _reactRouterDom.withRouter)(App);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL0FwcC5qcz9hMGY1Il0sIm5hbWVzIjpbIkFwcCIsInByb3BzIiwic3RhdGUiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibXlTdWJzY3JpYmVyIiwiYmluZCIsIlB1YlN1YiIsInN1YnNjcmliZSIsImF1dGgiLCJBdXRoIiwiaXNMb2dnZWRJbiIsImFjdGl2ZUludGVydmFsIiwiaGlzdG9yeSIsInN0b3BJbnRlcnZhbCIsImNhbGxiYWNrIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJwb3NpdGlvbiIsInNldEl0ZW0iLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImVycm9yQ2FsbGJhY2siLCJ0aW1lb3V0IiwiY29uc29sZSIsImxvZyIsImluaXRHZW9sb2NhdGlvbiIsImluaXRpYWxpemUiLCJhbGVydCIsImxhdCIsImxuZyIsInNwbGl0IiwiZ2VvY29kZXIiLCJnb29nbGUiLCJtYXBzIiwiR2VvY29kZXIiLCJsYXRsbmciLCJwYXJzZUZsb2F0IiwiZ2VvY29kZSIsInJlc3VsdHMiLCJzdGF0dXMiLCJnZXRaaXBjb2RlIiwicGxhY2UiLCJ6aXBjb2RlcyIsIkFycmF5IiwiaXNBcnJheSIsImsiLCJsZW5ndGgiLCJpIiwiYWRkcmVzc19jb21wb25lbnRzIiwiaiIsInR5cGVzIiwicHVzaCIsImxvbmdfbmFtZSIsInN0b3JlIiwic3RvcmVpbklkYiIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicGxhdGxuZyIsInB6aXBjb2RlcyIsInVzZXJJZCIsInRva2VuIiwidGhlbiIsInJlcyIsImpzb24iLCJtc2ciLCJkYXRhIiwidXNlcmlkIiwic2F2ZUN1cnJlbnRMb2NhdGlvbiIsInJlbW92ZUl0ZW0iLCJib29sRmxhZyIsImhhc093blByb3BlcnR5IiwicHVibGlzaCIsInNldFN0YXRlIiwi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UmVhY3QsIHtQcm9wVHlwZXMsIENvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyB3aXRoUm91dGVyIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuaW1wb3J0IHtBdXRofSBmcm9tICcuL2NvbW1vbi9hdXRoJztcclxuaW1wb3J0IFB1YlN1YiBmcm9tICdwdWJzdWItanMnO1xyXG5pbXBvcnQgJy4vc3R5bGUvY3NzL0FwcC5zY3NzJztcclxuaW1wb3J0IFJvdXRpbmcgZnJvbSAnLi9yb3V0ZXIvcm91dGVyJztcclxuY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XCJpc0xvZ2dlZEluXCI6IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaXNMb2dnZWRJbicpfTtcclxuICAgICAgICB0aGlzLm15U3Vic2NyaWJlciA9IHRoaXMubXlTdWJzY3JpYmVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgUHViU3ViLnN1YnNjcmliZSgnSVNfTE9HSU4nLCB0aGlzLm15U3Vic2NyaWJlcik7XHJcbiAgICAgICAgdGhpcy5hdXRoID0gbmV3IEF1dGgoKTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0xvZ2dlZEluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aC5hY3RpdmVJbnRlcnZhbCh0aGlzLnByb3BzLmhpc3RvcnkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aC5zdG9wSW50ZXJ2YWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGluaXRHZW9sb2NhdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIGlmIChuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24gKHBvc2l0aW9uLCBjYWxsYmFjaykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJykgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BsYXQtbG9nJywgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCItLVwiICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9LCB0aGlzLmVycm9yQ2FsbGJhY2ssIHt0aW1lb3V0OiAxMDAwMH0pO1xyXG4gICAgICAgICAgICAvL25hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKHRoaXMuc3VjY2Vzc0NhbGxiYWNrLCB0aGlzLmVycm9yQ2FsbGJhY2spO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHZW9sb2NhdGlvbiBpcyBub3Qgc3VwcG9ydGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0R2VvbG9jYXRpb24oICgpPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIFxyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgYWxlcnQoMSk7XHJcbiAgICAgICAgdmFyIGxhdCwgbG5nID0gJyc7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsYXQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJykuc3BsaXQoJy0tJylbMF07XHJcbiAgICAgICAgICAgIGxuZyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKS5zcGxpdCgnLS0nKVsxXTtcclxuICAgICAgICAgICAgdmFyIGdlb2NvZGVyID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyO1xyXG4gICAgICAgICAgICB2YXIgbGF0bG5nID0ge2xhdDogcGFyc2VGbG9hdChsYXQpLCBsbmc6IHBhcnNlRmxvYXQobG5nKX07XHJcbiAgICAgICAgICAgIGdlb2NvZGVyLmdlb2NvZGUoeydsb2NhdGlvbic6IGxhdGxuZ30sIChyZXN1bHRzLCBzdGF0dXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdPSycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFppcGNvZGUocmVzdWx0cyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydCgnR2VvY29kZXIgZmFpbGVkIGR1ZSB0bzogJyArIHN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRaaXBjb2RlKHBsYWNlKSB7XHJcblxyXG4gICAgICAgIHZhciB6aXBjb2RlcyA9IFtdO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBsYWNlKSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHBsYWNlLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWNlW2tdLmFkZHJlc3NfY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGxhY2Vba10uYWRkcmVzc19jb21wb25lbnRzW2ldLnR5cGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGFjZVtrXS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXNbal0gPT0gXCJwb3N0YWxfY29kZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwbGFjZVtrXS5hZGRyZXNzX2NvbXBvbmVudHNbaV0ubG9uZ19uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHppcGNvZGVzLnB1c2gocGxhY2Vba10uYWRkcmVzc19jb21wb25lbnRzW2ldLmxvbmdfbmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2UuYWRkcmVzc19jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXS50eXBlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXNbal0gPT0gXCJwb3N0YWxfY29kZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXS5sb25nX25hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB6aXBjb2Rlcy5wdXNoKHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXS5sb25nX25hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coemlwY29kZXMpO1xyXG4gICAgICAgIGlmICh6aXBjb2Rlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHppcGNvZGVzJywgemlwY29kZXMpO1xyXG4gICAgICAgICAgICAvL1N0b3JlIGluIEluZGV4REJcclxuXHJcbiAgICAgICAgICAgIHN0b3JlLnN0b3JlaW5JZGIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUN1cnJlbnRMb2NhdGlvbigpIHtcclxuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkZXZpY2VUb2tlbicpICE9PSBudWxsICYmIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdGxvZycpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZldGNoKCcvYXBpL3doZXJlaWFtJywge21ldGhvZDogJ3Bvc3QnLCBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhdGxuZzogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwbGF0LWxvZycpLFxyXG4gICAgICAgICAgICAgICAgICAgIHB6aXBjb2Rlczogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwemlwY29kZXMnKSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcmlkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGV2aWNlVG9rZW4nKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSkudGhlbihqc29uID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGpzb24pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBteVN1YnNjcmliZXIobXNnLCBkYXRhKSB7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLnN0YXR1cykge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FjY2Vzc1Rva2VuJywgZGF0YS50b2tlbik7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcmlkJywgZGF0YS51c2VyaWQpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lzTG9nZ2VkSW4nLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLmFjdGl2ZUludGVydmFsKHRoaXMucHJvcHMuaGlzdG9yeSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZUN1cnJlbnRMb2NhdGlvbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYWNjZXNzVG9rZW4nKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2VyaWQnKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdpc0xvZ2dlZEluJyk7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aC5zdG9wSW50ZXJ2YWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc0xvZ2dlZEluKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgaXNMb2dnZWRJbihkYXRhKSB7XHJcbiAgICAgICAgdmFyIGJvb2xGbGFnID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc0xvZ2dlZEluJyk7XHJcbiAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ2NhbGxiYWNrJykpIHtcclxuICAgICAgICAgICAgZGF0YS5jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFkYXRhLnN0YXR1cykge1xyXG4gICAgICAgICAgICBQdWJTdWIucHVibGlzaCgnSVNfTE9HT1VUJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNMb2dnZWRJbjogKGJvb2xGbGFnICE9PSBudWxsICYmIGJvb2xGbGFnICE9PSAnJykgPyBKU09OLnBhcnNlKGJvb2xGbGFnKSA6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPFJvdXRpbmcgaXNsb2dpbj17dGhpcy5zdGF0ZS5pc0xvZ2dlZElufSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihBcHApO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL0FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///58\n")}});