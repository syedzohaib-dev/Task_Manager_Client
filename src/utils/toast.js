import { toast } from "react-hot-toast";

const toastConfig = {
    style: {
        border: "1px solid #007AFF",
        padding: "14px",
        color: "#713200",
        fontSize: "15px"
    },
    iconTheme: {
        primary: "#007AFF",
        secondary: "#ffffff",
    },
};

export const successToast = (msg) => {
    toast.success(msg, {
        style: {
            border: "1px solid green",
            paddingInline: "34px",
            color: "green",
            fontSize: "15px"
        },
        iconTheme: {
            primary: "green",
            secondary: "#ffffff",
        },
    });
};

export const errorToast = (msg) => {
    toast.error(msg, {
        style: {
            border: "1px solid red",
            paddingInline: "34px",
            color: "red",
            fontSize: "15px"
        },
        iconTheme: {
            primary: "red",
            secondary: "#ffffff",
        },
    });
};

export const infoToast = (msg) => {
    toast(msg, {
        style: {
            border: "1px solid yellow",
            paddingInline: "14px",
            color: "yellow",
            fontSize: "15px"
        },
        iconTheme: {
            primary: "yellow",
            secondary: "#ffffff",
        },
    }); // normal info toast
};
