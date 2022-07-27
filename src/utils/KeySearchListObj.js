import {DIRECTION, PAGINATION_PARAM} from './Constant'
//import store from '@/store'
import {numberRule, requiredRule} from "./index";

class KeySearchListObj {
    constructor() {
        /* ECARGO */
        this.borderGateCode = '' // (notes = "Mã cửa khẩu")
        this.portCode = ''       // (notes = "Mã KBC")
        this.locationCode = ''   // (notes = "Mã địa điểm")
        this.shipNo = ''         // (notes = "Số hiệu PTVT")
        this.shipCallNo = ''     // (notes = "Số hô hiệu tàu")
        this.imoNo = ''          // (notes = "Số IMO")
        this.tripNo = ''         // (notes = "Số chuyến")
        this.waybillNo = ''      // (notes = "Số vận đơn")
        this.waybillNoSecondary = ''      // (notes = "Số vận đơn thứ cấp")
        this.commodityId = ''    // (notes = "Số định danh hàng hóa")
        this.containerNo = ''    // (notes = "Số container")
        this.decId = ''          // (notes = "Số TK")
        this.decStatus = null    // (notes = "Trạng thái TK")
        this.decFlow = null      // (notes = "Phân luồng")
        this.eximType = null     // (notes = "Loại nhập/xuất")
        this.tradeType = ''      // (notes = "Mã loại hình")
        this.docNo = ''          // (notes = "Số văn bản")
        this.numDaysInExistenceFrom = null       // (notes = "Số ngày tồn từ")
        this.numDaysInExistenceTo = null         // (notes = "Số ngày tồn đến")
        this.status = null       // (notes = "Trạng thái")
        this.id = null           // (notes = "ID")
        this.dateShipArrivalAndDeparture = null  // (notes = "Ngày tàu đến khởi hành")
        this.fromToDate = []
        this.dateFrom = null
        this.dateFrom2 = null    // (notes = "Từ ngày 2")
        this.fromToDate2 = []
        this.dateTo = null
        this.dateTo2 = null      // (notes = "Đến ngày 2")
        this.typeDate = 1      // Báo cáo theo
        this.strDateFrom = ''      // Từ tháng/năm
        this.strDateTo = ''      // Đến tháng/năm
        this.receiveNum = ''                          // (notes = "Số TN")
        this.receiveYear = new Date().getFullYear().toString()   //(notes = "Năm tn")
        /* ECARGO */

        /* Base properties*/
        this.code = ''
        this.name = ''
        //this.orgCode = store.getters.org /* Mã HQ*/
        this.orgCodeTk = '' /* Mã HQ TK*/
        this.type = null
        this.barCode = true

        /* Pagination/Sort */
        this.page = PAGINATION_PARAM.page
        this.size = PAGINATION_PARAM.size
        this.properties = [] /* list prop to sort*/
        this.direction = DIRECTION.ASC /* Sort Type*/
    }
}

const validFromToDate = (rule, value, callback) => {
    if (value) {
        const startDate = value[0]
        const endDate = value[1]

        const diffInMs = new Date(endDate) - new Date(startDate)
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
        if (diffInDays > 31) {
            callback(new Error('Chỉ được phép tìm kiếm tối đa 31 ngày'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}

const validYear = (rule, value, callback) => {
    if (value && value.length !== 4) {
        callback(new Error('Năm TN không đúng định dạng'))
    } else {
        callback()
    }
}

const validNumDayExist = (rule, value, callback) => {
    if (value && Number(value) <= 0) {
        callback(new Error('Số ngày tồn chỉ được nhập số nguyên > 0'))
    } else {
        callback()
    }
}

export const SEARCH_RULES = {
    borderGateCode: [requiredRule('Mã cửa khẩu')],
    portCode: [requiredRule('Mã KBC')],
    selectDnk: [requiredRule('Mã kho')],
    locationCode: [requiredRule('Mã địa điểm')],
    shipNo: [requiredRule('Số hiệu PTVT')],
    shipCallNo: [requiredRule('Số hô hiệu')],
    imoNo: [numberRule('Số IMO', ['blur', 'change']), requiredRule('Số IMO')],
    tripNo: [requiredRule('Số chuyến')],
    waybillNo: [requiredRule('Số vận đơn')],
    waybillNoSecondary: [requiredRule('Số vận đơn thứ cấp')],
    commodityId: [requiredRule('Số định danh')],
    containerNo: [requiredRule('Số container')],
    decId: [requiredRule('Số tờ khai')],
    soTk: [
        numberRule('Số tờ khai', ['blur', 'change']),
        {min: 12, max: 12, message: 'Số tờ khai gồm 12 chữ số'}
    ],
    decStatus: [requiredRule('Trạng thái tờ khai')],
    decFlow: [requiredRule('Phân luồng')],
    eximType: [requiredRule('Loại nhập/xuất')],
    tradeType: [requiredRule('Mã loại hình')],
    status: [requiredRule('Trạng thái')],
    orgCode: [requiredRule('Mã HQ')],
    orgCodeTk: [requiredRule('Mã HQ TK')],
    receiveNum: [
        requiredRule('Số TN'),
        numberRule('Số TN')
    ],
    receiveYear: [
        requiredRule('Năm TN'),
        numberRule('Năm TN'),
        {validator: validYear, trigger: ['blur', 'change']}
    ],
    dateShipArrivalAndDeparture: [requiredRule('Ngày tàu đến/ khởi hành')],
    docNo: [requiredRule('Số văn bản')],
    fromToDate: [{validator: validFromToDate, trigger: ['change', 'blur']}],
    numDaysInExistenceFrom: [
        numberRule('Số ngày tồn từ', ['blur', 'change',]),
        {validator: validNumDayExist, trigger: ['change', 'blur']}
    ],
    numDaysInExistenceTo: [
        numberRule('Số ngày tồn đến', ['blur', 'change']),
        {validator: validNumDayExist, trigger: ['change', 'blur']}
    ]
}


export default KeySearchListObj

