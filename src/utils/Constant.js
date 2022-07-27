export const V1 = '/v1';
export const CATE = '/cate';
export const CATEGORY_COMMON = '/category-common';
export const API_GATEWAY = process.env.VUE_APP_API_GATEWAY;
export const API_AUTH = API_GATEWAY;  // + (process.env.VUE_APP_ENDPOINT_AUTH || CATE);
export const API_ECCP = API_GATEWAY + process.env.VUE_APP_ENDPOINT_ECCP + V1;
export const API_CATEGORIES_COMMON = API_AUTH + V1 + CATEGORY_COMMON;
export const API_ECLARE_RESOURCES = API_GATEWAY + process.env.VUE_APP_API_ECLARE + '/swagger-resources'
export const TOKEN = 'ACCESS_TOKEN';

export function checkEnvFeLib() {
  let envFeLib = process.env.VUE_APP_FE_LIB;
  if (!envFeLib) {
    envFeLib = '/fe-lib/';
  }
  return envFeLib;
}

/*HELP DESK*/
const ZAMAD = '/zammad/api' + V1;
// export const API_HELPDESK = API_GATEWAY.replace('/gateway', '') + ZAMAD;
export const API_HELPDESK = API_GATEWAY + ZAMAD;
export const API_TOKEN_ZAMMAD = API_GATEWAY + CATE + V1;
export const MENU_CODE_API_HELPDESK = 'chuc-nang-helpdesk';
/*HELP DESK*/

/* TFS*/
export const SEC = 10000;
export const MINUTES = 60000;
export const REFRESH_TOKEN_TIME = 30 * SEC;
export const SESSION_TIMEOUT = process.env.VUE_APP_IDLE_TIME || (30 * MINUTES) /* Minutes*/;

// Chuông thông báo
export const NOTIFY_INTERVAL = 3 * SEC /* Second*/;
export const ALERT_URL = `${checkEnvFeLib()}assets/audio/doorbell.mp3`;

/**
 * REGEX dùng chung
 * */
export const REGEX_NUMBER = '^[0-9]*$';
export const SPECIAL_CHAR_REGEX = '^[a-zA-Z0-9]+$';
export const SPECIAL_ALLOW_SPACE_REGEX = '^[a-zA-Z0-9 ]+$';
export const SPECIAL_CHAR_REGEX_VIETNAMESE = '^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ ]+$'
/* REGEX dùng chung */

/*WHITE LIST*/
export const WHITE_LIST = ['/', '/login', '/auth-redirect', '/account-active', '/account-reset-pass'];

export const DATE_FORMAT = {
  YYYY_MM_DD_TIME: 'YYYY/MM/DD HH:mm:ss',
  YYYY_MM_DD: 'YYYY/MM/DD',
  DD_MM_YYYY: 'DD-MM-YYYY',
  DD_MM_YYYY_TIME: 'DD-MM-YYYY HH:mm:ss'
};

export const DATE = {
  DD_MM_YYYY: 'dd/MM/yyyy',
  DD_MM_YYYY_HH_MM_SS: 'dd/MM/yyyy HH:mm:ss',
  DD_MM_YYYY_HH_MM: 'dd/MM/yyyy HH:MM',
  YYYY_MM_DD: 'yyyy/MM/dd',
  YYYY_MM_DD_HH_MM_SS: 'yyyy/MM/dd HH:mm:ss',
  YYYY_MM_DD_HH_MM: 'yyyy/MM/dd HH:MM',
  DD_MM_YYYY2: 'dd-MM-yyyy',
  DD_MM_YYYY_HH_MM_SS2: 'dd-MM-yyyy HH:mm:ss',
  DD_MM_YYYY_HH_MM2: 'dd-MM-yyyy HH:mm',
  YYYY_MM_DD2: 'yyyy-MM-dd',
  YYYY_MM_DD_HH_MM_SS2: 'yyyy-MM-dd HH:mm:ss',
  YYYY_MM_DD_HH_MM2: 'yyyy-MM-dd HH:MM',
  DDMMYYYY: 'DDMMYYYY',
  DDMMYYYYHHMMSS: 'DDMMYYYYHHMMSS',
  DDMMYYYYHHMM: 'DDMMYYYYHHMM',
  YYYYMMDD: 'YYYYMMDD',
  HHMMSSYYYYMMDD: 'HHMMSSYYYYMMDD',
  HHMMYYYYMMDD: 'HHMMYYYYMMDD'
};

export const FORM_MODE = {
  DEFAULT: 0,
  CREATE: 1,
  EDIT: 2,
  VIEW: 3,
  APPROVE: 4,
  REJECT: 5
};

export const PAGINATION_PARAM = {
  page: 0,
  size: 20, /* Size mặc định*/
  pageTicket: 1
};

export const DIRECTION = {
  ASC: 'ASC',
  DESC: 'DESC'
};

/* Customs Constant*/
export const CUSTOM_LEVEL = {
  TONG_CUC: 1,
  CUC: 2,
  CHI_CUC: 4,
  TO_DOI: 8
};

/**
 * Cấu hình EXPORT_FILE_TYPES dùng cho DropdownUtil (etc-customs-lib)
 * Array/Object
 * key: type
 * icon: icon
 * */
export const EXPORT_FILE_TYPES = [
  { type: 'xlsx', icon: 'excel' },
  { type: 'pdf', icon: 'pdf' }
]

// export const HELP_DESK_ROUTER = (MasterLayout) => {
//   return [
//     {
//       path: '/helpdesk/user-manual',
//       component: MasterLayout,
//       redirect: '/helpdesk/user-manual/user-manual',
//       hidden: true,
//       children: [
//         {
//           path: 'user-manual',
//           component: () => import('etc-layout/src/lib-components/layout/helpdesk/user-manual/user-manual'),
//           name: 'Hướng dẫn sử dụng'
//         }
//       ]
//     },
//     {
//       path: '/helpdesk/questions',
//       component: MasterLayout,
//       redirect: '/helpdesk/questions/questions',
//       hidden: true,
//       children: [
//         {
//           path: 'questions',
//           component: () => import('etc-layout/src/lib-components/layout/helpdesk/questions/questions'),
//           name: 'Câu hỏi thường gặp'
//         },
//         {
//           path: 'BodyDetailView',
//           component: () => import('etc-layout/src/lib-components/layout/helpdesk/questions/BodyDetailView'),
//           name: 'Chi tiết câu hỏi'
//         }
//       ]
//     },
//     {
//       path: '/helpdesk/ticket-manager',
//       component: MasterLayout,
//       redirect: '/helpdesk/ticket-manager/ticket-manager',
//       hidden: true,
//       children: [
//         {
//           path: 'ticket-manager',
//           component: () => import('etc-layout/src/lib-components/layout/helpdesk/ticket-manager/ticket-manager'),
//           name: 'Quản lý Ticket'
//         }
//       ]
//     },
//     {
//       path: '/helpdesk/search-export-request',
//       component: MasterLayout,
//       redirect: '/helpdesk/search-export-request/export-requests',
//       hidden: true,
//       children: [
//         {
//           path: 'export-requests',
//           component: () => import('etc-layout/src/lib-components/layout/helpdesk/search-export-request/export-requests'),
//           name: 'Tra cứu yêu cầu kết xuất dữ liệu'
//         }
//       ]
//     }
//   ];
// };
