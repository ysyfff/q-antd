'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testKeyCode = testKeyCode;

exports.default = function (code, func) {
  return function (e) {
    if (e.keyCode === getKeyCode(code)) {
      func();
    }
  };
};

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.qAntd = {
  config: {
    keyCodes: {}
  }
}; /**
    * 实现按键修饰符
    */
/**
 * 暴露qAntd，让用户扩展keyCodes
 */


var enums = {
  enter: 13,
  right: 39,
  left: 37,
  up: 38,
  down: 40,
  del: 46,
  tab: 9,
  back: 8,
  esc: 27
};

function getKeyCodeViaName(code) {
  return enums[code] || global.qAntd.config.keyCodes[code] || enums.enter;
}

function getKeyCode(code) {
  return !isNaN(Number(code)) ? code : getKeyCodeViaName(code);
}

function testKeyCode(code) {
  if (isNaN(Number(code))) {
    (0, _warning2.default)(enums[code] || global.qAntd.config.keyCodes[code], code + '\u522B\u540D\u7684\u6309\u952E\u4FEE\u9970\u5668\u672A\u5B9A\u4E49\uFF0C\u5DF2\u4F7F\u7528enter\u4EE3\u66FF.\u67092\u4E2D\u89E3\u51B3\u529E\u6CD5\uFF1A\n    1.\u53EF\u901A\u8FC7window.qAntd.config.keyCodes.' + code + '=123\u8FDB\u884C\u5BF9' + code + '\u7684\u5B9A\u4E49\uFF0C\u7136\u540E\u4F7F\u7528\u522B\u540D\n    2.\u76F4\u63A5\u4F7F\u7528keyCode\u503C\n    ');
  }
}