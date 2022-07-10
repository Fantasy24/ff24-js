import {
    API_AUTH,
    API_CATEGORIES_COMMON,
    API_ECCP,
    API_ECLARE_RESOURCES,
    API_GATEWAY,
    API_HELPDESK,
    API_TOKEN_ZAMMAD,
    V1
} from './Constant.js';

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

export const ConstantTableEndPoint = {
    SPOSITION: 'SPOSITION',
    SDEPARTMENT: 'SDEPARTMENT',
    SCUSTOMS: 'SCUSTOMS'
};

export const ConstantAPI = {
    LOGIN: {
        SIGN_IN: {
            url: `${API_AUTH}/api/auth/cas/signin`,
            method: POST
        },
        VALIDATE_JOSE: {
            url: `${API_AUTH}/api/auth/cas/validate-jose`,
            method: GET
        },
        SIGN_IN_OTP: {
            url: `${API_AUTH}/api/auth/cas/signin-with-totp`,
            method: POST
        },
        REFRESH_TOKEN: {
            url: `${API_AUTH}/api/auth/cas/refresh-token`,
            method: GET
        },
        GET_MENU_PERMISSION: {
            url: `${API_AUTH}/api/auth/cas/menu-parent-child-for-router`,
            method: GET
        },
        GET_BUTTON_PERMISSION: {
            url: `${API_AUTH}/api/auth/cas/get-menu-group-by-parent-code`,
            method: GET
        },
        LOGOUT: {
            url: `${API_AUTH}/api/auth/cas/signout`,
            method: POST
        }
    },

    SIGNUP: {
        GET_COMPANY_TYPE: {
            url: `${API_CATEGORIES_COMMON}/SCOMPANY_TYPE/all`,
            method: GET
        },
        SIGN_UP: {
            url: `${API_AUTH}/api/auth/cas/signup`,
            method: POST
        }
    },

    NOTIFY: {
        SEARCH: {
            url: `${API_AUTH}/${V1}/com-notify/search`,
            method: GET
        },
        INSERT: {
            url: `${API_AUTH}/${V1}/com-notify/`,
            method: POST
        },
        DETAIL: {
            url: `${API_AUTH}/${V1}/com-notify/`,
            method: GET
        },
        DELETE: {
            url: `${API_AUTH}/${V1}/com-notify/`,
            method: DELETE
        },
        COUNT_UNREAD: {
            url: `${API_AUTH}/${V1}/com-notify/count-unread-notify`,
            method: GET
        }
    },

    TK: {
        DOWNFILE: {
            url: `${API_ECCP}/tracuu-ctdt/download-file`,
            method: GET
        },
        TK_INFO: {
            url: `${API_ECCP}/tk/tab-tt-tk`,
            method: GET
        },
        TAB_GHI_NHAN: {
            url: `${API_ECCP}/tk/get-list--tk-status-his`,
            method: GET
        },
        TAB_HANG: {
            url: `${API_ECCP}/tk/get-list-hh-by-sotk`,
            method: GET
        },
        TAB_CTHQ: {
            url: `${API_ECCP}/tk-cthq/find-by-so-tk`,
            method: GET
        },
        TAB_DS_CONT: {
            url: `${API_ECCP}/tracuu-ctdt/tk-ds-cont-dtl`,
            method: GET
        },
        TAB_GIAYPHEP: {
            url: `${API_ECCP}/tracuu-ctdt/giay-phep`,
            method: GET
        },
        TAB_HOADON: {
            url: `${API_ECCP}/tracuu-ctdt/hoa-don-tm`,
            method: GET
        },
        TAB_CO: {
            url: `${API_ECCP}/tracuu-ctdt/co`,
            method: GET
        },
        TAB_VANDON: {
            url: `${API_ECCP}/tracuu-ctdt/van-don`,
            method: GET
        },
        TAB_BKHH: {
            url: `${API_ECCP}/tracuu-ctdt/bkhh`,
            method: GET
        },
        TAB_KTCN: {
            url: `${API_ECCP}/tracuu-ctdt/giay-cnktcn`,
            method: GET
        },
        TAB_CMCT: {
            url: `${API_ECCP}/tracuu-ctdt/cmtc`,
            method: GET
        },
        TAB_HOPDONG: {
            url: `${API_ECCP}/tracuu-ctdt/hop-dong-ut`,
            method: GET
        },
        TAB_TKTG: {
            url: `${API_ECCP}/tracuu-ctdt/tktg`,
            method: GET
        },
        TAB_MMTB: {
            url: `${API_ECCP}/tracuu-ctdt/mmtb`,
            method: GET
        },
        TAB_CTAT: {
            url: `${API_ECCP}/tracuu-ctdt/ctat`,
            method: GET
        }
    },

    EXPORT: {
        EXPORT_SEARCH: {
            url: `${API_AUTH}/${V1}/com-export-file-request/search`,
            method: GET
        },
        EXPORT_VIEW: {
            url: `${API_AUTH}/${V1}/com-export-file-request/`,
            method: GET
        },
        EXPORT_REQUEST: {
            url: `${API_AUTH}/${V1}/com-export-file-request/`,
            method: POST
        },
        EXPORT_SHARE: {
            url: `${API_AUTH}/${V1}/com-export-file-request/update-group-code`,
            method: PUT
        },
        DOWNLOAD: {
            url: `${API_AUTH}/${V1}/com-export-file-request/download-file`,
            method: GET
        },
        LIST_MENU_TREE: {
            url: `${API_AUTH}/${V1}/menu/search-by-parent-code-tree`,
            method: GET
        },
        GET_GROUP: {
            url: `${API_AUTH}/${V1}/group/get-list-group-by-orgcode`,
            method: GET
        }
    },

    'ql-nguoi-dung': {
        SELECT_ITEM: {
            url: `${API_AUTH}/${V1}/user/`,
            method: GET
        },
        UPDATE: {
            url: `${API_AUTH}/${V1}/user/`,
            method: PUT
        },
        RESET_PASS: {
            url: `${API_AUTH}/${V1}/user/changepass-user`,
            method: PUT
        },
        GET_TOTP_SECRET: {
            url: `${API_AUTH}/${V1}/user/get-totp-secret`,
            method: GET
        },
        UPDATE_TOTP_SECRET: {
            url: `${API_AUTH}/${V1}/user/update-totp-secret`,
            method: PUT
        },
        GET_RESEND_TOTP_KEY: {
            url: `${API_AUTH}/${V1}/user/get-totp-key`,
            method: GET
        },
        CHECK_TOTP_KEY: {
            url: `${API_AUTH}/${V1}/user/check-totp-key`,
            method: POST
        },
        TRANSFER_ORG: {
            url: `${API_AUTH}/${V1}/user/get-org-history-current`,
            method: GET
        }
    },

    'QLDM-1-1-1': {
        ALL: {
            url: `${API_CATEGORIES_COMMON}/${ConstantTableEndPoint.SCUSTOMS}/all`,
            method: GET
        },
        ALL_POSITION: {
            url: `${API_CATEGORIES_COMMON}/${ConstantTableEndPoint.SPOSITION}/all`,
            method: GET
        },
        ALL_DEPARTMENT: {
            url: `${API_CATEGORIES_COMMON}/${ConstantTableEndPoint.SDEPARTMENT}/all`,
            method: GET
        }
    },

    ACCOUNT_CHANGE: {
        ACTIVE_PASSWORD: {
            url: `${API_AUTH}/api/auth/cas/pw_active`,
            method: PUT
        },
        CHANGE_PASSWORD: {
            url: `${API_AUTH}/api/auth/cas/pw_change`,
            method: PUT
        },
        RESET_PASSWORD: {
            url: `${API_AUTH}/api/auth/cas/pw_reset`,
            method: PUT
        },
        GET_RESET_PASSWORD: {
            url: `${API_AUTH}/api/auth/cas/pw_reset`,
            method: GET
        },
        GET_CAPTCHA: {
            url: `${API_AUTH}/api/auth/cas/get-captcha`,
            method: GET
        }
    },

    REQUIREMENT: {
        FIND_BY_MENU_CODE: {
            url: `${API_GATEWAY}/erqms/v1/requirements/find-by-menu-code`,
            method: GET
        }
    },

    // helpdesk
    'chuc-nang-helpdesk': {
        INSERT: {
            url: `${API_HELPDESK}/form_config`,
            method: POST
        },
        SUBMIT: {
            url: `${API_HELPDESK}/form_submit`,
            method: POST
        },
        GET_TABLE: {
            url: `${API_HELPDESK}/tickets/search`,
            method: GET
        },
        GET_DETAIL: {
            url: `${API_HELPDESK}/ticket_articles/by_ticket/`,
            method: GET
        },
        REPLY: {
            url: `${API_HELPDESK}/ticket_articles/`,
            method: POST
        },
        DOWNLOAD_FILE: {
            url: `${API_HELPDESK}/ticket_attachment/`,
            method: GET
        },
        POST_QUESTIONS: {
            url: `${API_HELPDESK}/knowledge_bases/search/`,
            method: POST
        },
        GET_TOKEN_ZAMMAD: {
            url: `${API_TOKEN_ZAMMAD}/zammad/get-zammad-secret`,
            method: GET
        },
        DETAIL_QUESTIONS: {
            url: `${API_HELPDESK}/knowledge_bases/detail_answer`,
            method: POST
        }
    },

    'ql-chuc-nang': {
        SELECT_ITEM: {
            url: `${API_AUTH}${V1}/menu/`,
            method: GET
        }
    },

    CLIENT_COMMON_API: {
        SEARCH_SCHEMA: {
            url: `${API_CATEGORIES_COMMON}/search-schema-by-table-name-to-list`,
            method: GET
        },
        SEARCH_BY_TABLE_NAME: {
            url: `${API_CATEGORIES_COMMON}/search-schema-by-table-name-to-list-json`,
            method: GET
        },
        DOWNLOAD_SIGN_FILE: {
            url: `${API_ECLARE_RESOURCES}/public/`,
            method: GET
        }
    }
};

export default ConstantAPI;
