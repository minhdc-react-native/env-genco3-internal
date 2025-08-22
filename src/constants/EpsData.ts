export const LOGIN_TYPES = {
    EPS: 0,
    NON_EPS: 1,
    EXTERNAL: 2,
} as const;

export type LoginType = (typeof LOGIN_TYPES)[keyof typeof LOGIN_TYPES];

// Texts displayed UI
export const LOGIN_TYPE_LABELS: Record<LoginType, string> = {
    [LOGIN_TYPES.EPS]: 'EPS',
    [LOGIN_TYPES.NON_EPS]: 'NON EPS',
    [LOGIN_TYPES.EXTERNAL]: 'Bên Ngoài',
};

export const EXAM_STATUS = {
    DRAFT: 0,
    REGISTRATION: 1,
    REVIEW: 2,
    APPROVED: 3,
    EXAM: 4,
    ENTER_RESULT: 5,
    ENTER_DECISION: 6,
    COMPLETED: 7,
} as const;
export type ExamStatus =
    (typeof EXAM_STATUS)[keyof typeof EXAM_STATUS];
export const EXAM_STATUS_LABELS: Record<ExamStatus, string> = {
    [EXAM_STATUS.DRAFT]: 'Nháp',
    [EXAM_STATUS.REGISTRATION]: 'Đăng Ký',
    [EXAM_STATUS.REVIEW]: 'Rà Soát',
    [EXAM_STATUS.APPROVED]: 'Phê Duyệt',
    [EXAM_STATUS.EXAM]: 'Thi',
    [EXAM_STATUS.ENTER_RESULT]: 'Nhập Kết Quả',
    [EXAM_STATUS.ENTER_DECISION]: 'Nhập Quyết Định',
    [EXAM_STATUS.COMPLETED]: 'Kết Thúc',
};
export const EXAM_REGISTRATION_STATUS = {
    PENDING: 0,
    SIGNED: 1,
    POSTPONED: 2,
    REJECTED: 3,
    ADDED: 4,
} as const;
export type ExamRegistrationStatus =
    (typeof EXAM_REGISTRATION_STATUS)[keyof typeof EXAM_REGISTRATION_STATUS];

export const EXAM_REGISTRATION_STATUS_LABELS: Record<
    ExamRegistrationStatus,
    string
> = {
    [EXAM_REGISTRATION_STATUS.PENDING]: 'Chưa Xác Nhận',
    [EXAM_REGISTRATION_STATUS.SIGNED]: 'Tham Gia',
    [EXAM_REGISTRATION_STATUS.REJECTED]: 'Để Lại',
    [EXAM_REGISTRATION_STATUS.POSTPONED]: 'Hoãn Thi',
    [EXAM_REGISTRATION_STATUS.ADDED]: 'Bổ Sung',
};
