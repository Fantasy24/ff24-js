import apiFactory from '../api/apiFactory';
import {CUSTOM_LEVEL} from './Constant';
import ConstantAPI from './ConstantAPI';
import {getToken} from "./authCookie";

export const LIST_CUSTOMS = 'LIST_CUSTOMS';
export const LIST_POSITIONS = 'LIST_POSITIONS';
export const LIST_DEPARTMENT = 'LIST_DEPARTMENT';
export const LIST_MENU_BUTTON_FE = 'LIST_MENU_BUTTON_FE';

function checkIsNullOrUndefined(obj) {
    return (obj === undefined || obj === 'undefined' || obj === null || obj === '');
}

function checkIsArrayEmpty(arr) {
    return checkIsNullOrUndefined(arr) || !Array.isArray(arr) || arr.length <= 0;
}

export function getMenuButtonFE(appCode) {
    apiFactory.callAPI(ConstantAPI.LOGIN.GET_BUTTON_PERMISSION, {}, {
        appCode: appCode,
        type: 2
    }).then(response => {
        sessionStorage.setItem(LIST_MENU_BUTTON_FE, JSON.stringify(response));
    }).catch(response => {
        console.log('Lỗi API LIST_MENU_BUTTON_FE:', response.message);
    });
}

export function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
}

function checkPermissionShowButtonBK(idFunction, idButton) {
    /* Tắt phân quyền nếu không có biến VUE_APP_BUTTON_PERMISSION*/
    if (!process.env.VUE_APP_BUTTON_PERMISSION || process.env.VUE_APP_BUTTON_PERMISSION === 'false') return true

    const lstMenuGroupByParentCode = JSON.parse(sessionStorage.getItem(LIST_MENU_BUTTON_FE));
    if (checkIsArrayEmpty(lstMenuGroupByParentCode)) {
        return false;
    }

    const lstFunction = lstMenuGroupByParentCode.filter(obj => {
        return obj.parentCode === idFunction;
    });

    if (checkIsArrayEmpty(lstFunction) || checkIsNullOrUndefined(lstFunction[0]) || checkIsArrayEmpty(lstFunction[0].lstMenu)) {
        return false;
    }

    const lstMenu = lstFunction[0]['lstMenu'];
    return !checkIsArrayEmpty(lstMenu.filter(obj => {
        return obj.menuCode === idButton;
    }));
}

function checkPermissionShowButton(idFunction, idButton) {
    /* Tắt phân quyền nếu không có biến VUE_APP_BUTTON_PERMISSION*/
    if (!process.env.VUE_APP_BUTTON_PERMISSION || process.env.VUE_APP_BUTTON_PERMISSION === 'false') return true
    const arrDK =[undefined, null,""]
    const payload = parseJwt(getToken());
    if(arrDK.indexOf(payload) > -1 || payload.permission.length ===0){
        return false;
    }
    const lstFunction = [];
    for(const obj of payload.permission){
        lstFunction.push(obj.functionId);
    }
    const lstFilter = lstFunction.filter(obj => obj === idButton);
    if(lstFilter.length === 0){
        return false;
    }
    return true;    
}

export default checkPermissionShowButton;

export function getListCustoms(token) {
    apiFactory.callAPI(ConstantAPI['QLDM-1-1-1'].ALL, {}, {}, token).then(response => {
        localStorage.setItem(LIST_CUSTOMS, JSON.stringify(response));
    }).catch(response => {
        console.log('Lỗi API LIST_CUSTOMS:', response.message);
    });
}

export function getListPositions(token) {
    apiFactory.callAPI(ConstantAPI['QLDM-1-1-1'].ALL_POSITION, {}, {}, token).then(response => {
        localStorage.setItem(LIST_POSITIONS, JSON.stringify(response));
    }).catch(response => {
        console.log('Lỗi API LIST_POSITIONS:', response.message);
    });
}

export function getListDepartments(token) {
    apiFactory.callAPI(ConstantAPI['QLDM-1-1-1'].ALL_DEPARTMENT, {}, {}, token).then(response => {
        localStorage.setItem(LIST_DEPARTMENT, JSON.stringify(response));
    }).catch(response => {
        console.log('Lỗi API LIST_DEPARTMENT:', response.message);
    });
}

export function getTenHqByMa(maHq) {
    if (!maHq) return ''
    const listHq = JSON.parse(localStorage.getItem(LIST_CUSTOMS));
    if (listHq) {
        for (const item of listHq) {
            if (item.code.trim() === maHq.trim()) {
                return item.code.trim().concat(' - ', item.name);
            }
        }
    }
    return maHq;
}

export function getTenChucVuByKey(posCode) {
    if (!posCode) return ''
    const listChucVu = JSON.parse(localStorage.getItem(LIST_POSITIONS));
    if (listChucVu) {
        for (const item of listChucVu) {
            if (item.code === posCode) {
                return item.code.concat(' - ', item.name);
            }
        }
    }
    return posCode;
}

export function getTenPhongBanByKey(depCode) {
    if (!depCode) return ''
    const listPhongBan = JSON.parse(localStorage.getItem(LIST_DEPARTMENT));
    if (listPhongBan) {
        for (const item of listPhongBan) {
            if (item.code === depCode) {
                return item.code.concat(' - ', item.name);
            }
        }
    }
    return depCode;
}

export function getCapMaHq(maHq) {
    if (!maHq) return 0

    if (maHq === '00ZZ') {
        return CUSTOM_LEVEL.TONG_CUC;
    } else if ((maHq.substring(2, 4) === 'ZZ') && maHq !== '00ZZ') {
        return CUSTOM_LEVEL.CUC;
    } else if (maHq.length === 6) {
        return CUSTOM_LEVEL.TO_DOI;
    } else {
        return CUSTOM_LEVEL.CHI_CUC;
    }
}

export function cacheCategories(token) {
    if (!getToken()) return false
    // getListCustoms(token);
    getMenuButtonFE(process.env.VUE_APP_APP_CODE);
}

/**
 * Hàm chặn nhập ký tự (Chỉ được nhập số) - Dành cho <el-input>
 * Cách sử dụng: import vào method trong file js.
 * ở <el-input @keypress.native="preventChar">
 * */
export function preventChar($event) {
    const keyCode = ($event.keyCode ? $event.keyCode : $event.which);
    if ((keyCode <= 47 || keyCode >= 58)) $event.preventDefault();
}

/**
 * Hàm chặn nhập ký tự chỉ cho nhập dấu chấm(.) dành cho nhập số thập phân
 * Cách sử dụng: import vào method trong file js.
 * ở <el-input @keypress.native="moneyPrevent">
 * */
export function moneyPrevent($event) {
    if (!($event.charCode === 46 || ($event.charCode >= 48 && $event.charCode <= 57))) {
        $event.preventDefault()
    }
}
export function isExternal(path) {
    return /^(https?:|mailto:|tel:|.\/|..\/)/.test(path)
}
export function joinPath(basePath, routePath) {
    const arrDK = [undefined, null, ""];
    if (basePath === routePath) {
      return basePath;
    } else if (arrDK.indexOf(basePath) > -1) {
      return routePath;
    } else if (arrDK.indexOf(routePath) > -1) {
      return basePath;
    } else {
      const strPath = basePath + "/" + routePath;
      return strPath.replace("\/\/", "\/");
    }
}
  
export function resolvePath(routePath) {
    //console.log("routePath resolvePath");
    //console.log(routePath);
    if (isExternal(routePath)) {
      return routePath;
    }
    if (isExternal(this.basePath)) {
      return this.basePath;
    }
    //console.log("path.resolve nhidv");
    //console.log(this.joinPath(this.basePath, routePath));
    //console.log("basePath:" + this.basePath + "----routePath: " + routePath);
    //return path.resolve(this.basePath, routePath);
    return this.joinPath(this.basePath, routePath);
  }