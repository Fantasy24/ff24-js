export const INFO = 'info'
export const SUCCESS = 'success'
export const WARNING = 'warning'
export const ERROR = 'error'

const md5 = require('md5')
export const ERR_MSG = 'ERR_MSG'

/*
* Hàm hiển thị thông báo trên góc phải
* @param this$Message  :this.$message
* @param type : dùng constant loại thông báo
* @param message: nội dung thông báo
* @param duration: thời gian xuất hiện
* */
export function showAlert($this, type, message, duration = 4000, isHtmlMsg = false) {
    const err = sessionStorage.getItem(ERR_MSG)
    const newMsg = message ? md5(message) : undefined
    if (newMsg && err !== newMsg) {
        sessionStorage.setItem(ERR_MSG, newMsg)
        setTimeout(() => {
            sessionStorage.removeItem(ERR_MSG)
        }, duration)
        return $this.$message({
            dangerouslyUseHTMLString: isHtmlMsg,
            message: message,
            type: type,
            duration: duration,
            showClose: true
        })
    } else {
        sessionStorage.setItem(ERR_MSG, newMsg)
    }
}

export function errAlert($this, err, duration = 4000) {
    if (typeof err === 'string' || !err.response) {
        showAlert($this, ERROR, err, duration)
        return
    }
    if (err.response && err.response.data.name) {
        showAlert($this, ERROR, err.response.data.name, duration)
        return
    }
    if (err.response && err.response.data instanceof Blob) {
        const reader = new FileReader()
        reader.addEventListener('loadend', async (e) => {
            err.response.data = JSON.parse(e.target.result)
            errAlert($this, err)
        })
        reader.readAsText(err.response.data)
    }
    /*if ((err.response && (err.response.status === 500 && err.response.message === 'GENERAL')) || !err.toJSON().status) {
        showAlert($this, ERROR, '<strong>HỆ THỐNG ĐANG ĐƯỢC BẢO TRÌ. VUI LÒNG THỬ LẠI SAU ÍT PHÚT...</strong>', 8000, true)
        return
    }*/
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        return $this.$confirm('Bạn không có quyền sử dụng chức năng này hoặc thông tin xác thực không đúng hoặc đã quá hạn. Vui lòng đăng nhập lại để sử dụng dịch vụ', 'Cảnh báo', {
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Không',
            customClass: '',
            cancelButtonClass: '',
            confirmButtonClass: '',
            type: 'warning'
        })
            .then(async () =>{
                await $this.$store.dispatch('user/logout')
                await $this.$router.push(`/login?redirect=/dashboard`);
                location.reload();
            })
            .catch(() => {
                // doNothing
            })
        // showAlert($this, ERROR, '<strong>Thông tin xác thực không đúng hoặc đã quá hạn. Vui lòng đăng nhập lại để sử dụng dịch vụ</strong>', 8000, true)
    }
    showAlert($this, ERROR, err.response ? err.response.data.message : '', duration)
}

/*
* Hàm hiển thị dialog xác nhận khi xóa
* @param this$Confirm  :this.$confirm
* @param onSuccess : function callBack khi click nút có
* */
export function showConfirmDelete(this$Confirm, onSuccess, TITLE_MESSAGE_BOX = '', CANCEL_BUTTON_BOX = '', CONFIRM_BUTTON_BOX = '') {
    return this$Confirm('Bạn có chắc chắn muốn xóa?', 'Cảnh báo', {
        confirmButtonText: 'Có',
        cancelButtonText: 'Không',
        customClass: TITLE_MESSAGE_BOX,
        cancelButtonClass: CANCEL_BUTTON_BOX,
        confirmButtonClass: CONFIRM_BUTTON_BOX,
        type: 'warning'
    })
        .then(onSuccess)
        .catch(() => {
            // doNothing
        })
}
