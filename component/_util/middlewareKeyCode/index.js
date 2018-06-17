/**
 * 实现按键修饰符
 */
/**
 * 暴露qAntd，让用户扩展keyCodes
 */
import warning from 'warning';

global.qAntd = {
  config: {
    keyCodes: {
    },
  },
};

const enums = {
  enter: 13,
  right: 39,
  left: 37,
  up: 38,
  down: 40,
  del: 46,
  tab: 9,
  back: 8,
  esc: 27,
};

function getKeyCodeViaName(code) {
  return enums[code] || global.qAntd.config.keyCodes[code] || enums.enter;
}

function getKeyCode(code) {
  return !isNaN(Number(code)) ? code : getKeyCodeViaName(code);
}

export function testKeyCode(code) {
  if (isNaN(Number(code))) {
    warning(enums[code] || global.qAntd.config.keyCodes[code], `${code}别名的按键修饰器未定义，已使用enter代替.有2中解决办法：
    1.可通过window.qAntd.config.keyCodes.${code}=123进行对${code}的定义，然后使用别名
    2.直接使用keyCode值
    `);
  }
}
export default function (code, func) {
  return (e) => {
    if (e.keyCode === getKeyCode(code)) {
      func();
    }
  };
}
