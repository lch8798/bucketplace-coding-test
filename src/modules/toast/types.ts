export type Toast = {
    id: number;
    text: string;
    duration: number;
};

export type ToastState = {
    genID: number;
    toasts: Toast[];
};
