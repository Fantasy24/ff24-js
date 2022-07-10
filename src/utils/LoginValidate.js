import i18n from '../lang/index.js'
/*Login*/
export const validateOrgCode = (rule, value, callback) => {
    const patt = new RegExp('^[0-9\\-]*$')
    if (!value) {
        callback(new Error(i18n.t('signUp.validTaxCode')))
    } else if (value.length < 10 || value.length > 14) {
        callback(new Error(i18n.t('signUp.maxlengthTaxCode')))
    } else if (!patt.test(value)) {
        callback(new Error(i18n.t('signUp.regexTaxCode')))
    } else {
        callback()
    }
}

export const validateUsername = (rule, value, callback) => {
    const patt = new RegExp('^[a-zA-Z_0-9\\-.]*$')
    if (!value) {
        callback(new Error(i18n.t('login.validUsername')))
    } else if (value.length < 3 || value.length > 25) {
        callback(new Error(i18n.t('login.maxlengthUsername')))
    } else if (!patt.test(value)) {
        callback(new Error(i18n.t('login.usernamePattern')))
    } else {
        callback()
    }
}

export const validatePassword = (rule, value, callback) => {
    if (!value) {
        callback(new Error(i18n.t('login.validPassword')))
    } else if (value.length < 8 || value.length > 50) {
        callback(new Error(i18n.t('login.maxlengthPw')))
    } else {
        callback()
    }
}

export const validateCaptcha = (rule, value, callback) => {
    if (!value) {
        callback(new Error(i18n.t('login.validCaptcha')))
    } else if (value.length > 8) {
        callback(new Error(i18n.t('login.maxlengthCc')))
    } else {
        callback()
    }
}

export const validateOtpKey = (rule, value, callback) => {
    if (!value) {
        callback(new Error(i18n.t('otpForm.validOtp')))
    } else if (value.length < 6 || value.length > 8) {
        callback(new Error(i18n.t('otpForm.maxlengthOtp')))
    } else {
        callback()
    }
}
/*Login*/

/*AccountActive*/
export const validateNewPass = (rule, value, callback) => {
    const passLenght = 8;
    const reg = [/[a-z]/, /[A-Z]/, /[0-9]/, /[(!@#$%&]/];
    let count = 0;
    for (let i = 0; i < reg.length; i++) {
        if (reg[i].test(value)) {
            count++;
        }
    }
    if (value === '') {
        callback(new Error('Hãy nhập mật khẩu mới'));
    } else if (value.length < passLenght) {
        callback(new Error(`Tối thiểu ${passLenght} ký tự`));
    } else if (count < 3) {
        callback(new Error('Mật khẩu không thỏa mãn điều kiện'));
    } else {
        callback();
    }
};

export const validateConfirmPass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Hãy nhập lại mật khẩu'));
    } else {
        callback();
    }
};
/*AccountActive*/
