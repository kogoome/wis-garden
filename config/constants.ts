export const description = "글";

const isProduction = process.env.NODE_ENV === "production";
export const assetPrefix = isProduction ? "/wis-garden" : "";
