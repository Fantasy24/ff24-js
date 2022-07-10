import cloneDeep from 'clone-deep';
import {REGEX_NUMBER, SPECIAL_CHAR_REGEX} from './Constant';

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if ((typeof time === 'string')) {
            if ((/^[0-9]+$/.test(time))) {
                // support "1548221490638"
                time = parseInt(time);
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/');
            }
        }

        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value];
        }
        return value.toString().padStart(2, '0');
    });
    return time_str;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000;
    } else {
        time = +time;
    }
    const d = new Date(time);
    const now = Date.now();

    const diff = (now - d) / 1000;

    if (diff < 30) {
        return '刚刚';
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前';
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前';
    } else if (diff < 3600 * 24 * 2) {
        return '1天前';
    }
    if (option) {
        return parseTime(time, option);
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        );
    }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
    url = url == null ? window.location.href : url;
    const search = url.substring(url.lastIndexOf('?') + 1);
    const obj = {};
    const reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1);
        let val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;
        return rs;
    });
    return obj;
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
    // returns the byte length of an utf8 string
    let s = str.length;
    for (var i = str.length - 1; i >= 0; i--) {
        const code = str.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff) {
            s++;
        } else if (code > 0x7ff && code <= 0xffff) s += 2;
        if (code >= 0xDC00 && code <= 0xDFFF) i--;
    }
    return s;
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
    const newArray = [];
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
    if (!json) return '';
    return cleanArray(
        Object.keys(json).map(key => {
            if (json[key] === undefined) return '';
            return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
        })
    ).join('&');
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ');
    if (!search) {
        return {};
    }
    const obj = {};
    const searchArr = search.split('&');
    searchArr.forEach(v => {
        const index = v.indexOf('=');
        if (index !== -1) {
            const name = v.substring(0, index);
            const val = v.substring(index + 1, v.length);
            obj[name] = val;
        }
    });
    return obj;
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
    const div = document.createElement('div');
    div.innerHTML = val;
    return div.textContent || div.innerText;
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
    if (typeof target !== 'object') {
        target = {};
    }
    if (Array.isArray(source)) {
        return source.slice();
    }
    Object.keys(source).forEach(property => {
        const sourceProperty = source[property];
        if (typeof sourceProperty === 'object') {
            target[property] = objectMerge(target[property], sourceProperty);
        } else {
            target[property] = sourceProperty;
        }
    });
    return target;
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
    if (!element || !className) {
        return;
    }
    let classString = element.className;
    const nameIndex = classString.indexOf(className);
    if (nameIndex === -1) {
        classString += '' + className;
    } else {
        classString =
            classString.substr(0, nameIndex) +
            classString.substr(nameIndex + className.length);
    }
    element.className = classString;
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
    if (type === 'start') {
        return new Date().getTime() - 3600 * 1000 * 24 * 90;
    } else {
        return new Date(new Date().toDateString());
    }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;
    const later = function () {
        const last = +new Date() - timestamp;

        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function (...listParams) {
        context = this;
        timestamp = +new Date();
        const callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, listParams);
            context = null;
        }

        return result;
    };
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
    return cloneDeep(source);
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
    return Array.from(new Set(arr));
}

/**
 * @returns {string}
 */
export function createUniqueString() {
    const timestamp = +new Date() + '';
    const randomNum = parseInt((1 + Math.random()) * 65536) + '';
    return (+(randomNum + timestamp)).toString(32);
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += ' ' + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

export function formatNumber(number) {
    if (number === undefined || number === null || isNaN(number)) return ''
    return number.toLocaleString()
}

export function mapComputed(prop) {
    return {
        get() {
            return this[prop]
        },
        set(newValue) {
            this.$emit(`update:${prop}`, newValue)
        }
    }
}

export function onKeyDownVietnameseChar(e) {
    const tagDelKey = 'Backspace'

    const actionBlock = () => {

        return !(['Tab', 'Enter'].indexOf(e.key) >= 0 || (e.ctrlKey && ['v', 'a', 'c', 'x', 'z'].indexOf(e.key.toLowerCase()) >= 0))

    }

    const isNumber = () => {

        return !isNaN(Number.parseFloat(e.key))

    }
    const delay = (!e.target.delay ? 20 : new Date() - e.target.delay)

    if (!isNumber() && actionBlock() && (e.key !== tagDelKey || delay < 20)) {

        if (e.target.old && delay < 20) {

            e.target.value = e.target.old

        }
        e.target.old = null

        e.preventDefault()

    } else if (e.key === tagDelKey) {
        e.target.old = e.target.value
    }

    e.target.delay = new Date()
}

export function requiredRule(label, trigger) {
    return {
        required: true,
        message: `${label} bắt buộc`,
        trigger: trigger
    };
}

export function numberRule(label, trigger) {
    return {
        pattern: REGEX_NUMBER,
        message: `${label} là kiểu số`,
        trigger: trigger || ['change', 'blur']
    };
}

export function specialCharRule(label, trigger) {
    return {
        pattern: SPECIAL_CHAR_REGEX,
        message: `${label} không đúng định dạng`,
        trigger: trigger || ['change', 'blur']
    };
}

export function validateRegex(regex, label, trigger) {
    return {
        pattern: regex,
        message: `${label} không đúng định dạng`,
        trigger: trigger || ['change', 'blur']
    };
}
