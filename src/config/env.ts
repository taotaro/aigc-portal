export const getWorkbench = () => {
    return process.env.WORKBENCH || "Production";
}

export const getAPIUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL;
}

export const getExpayWebsiteUrl = () => {
    return process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_API_PREFIX;
}

export const getWebsiteLogo = () => {
    return process.env.NEXT_PUBLIC_WEBSITE_LOGO;
}

export const getWebsiteName = () => {
    return process.env.NEXT_PUBLIC_WEBSITE_NAME;
}