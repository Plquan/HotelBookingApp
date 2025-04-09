import EVN from '@/env.json'
const env = {
    API_URL: EVN.API_URL || "https://localhost:7197",
    LANGUAGE: EVN.LANGUAGE,
    ACCESS_TOKEN: EVN.ACCESS_TOKEN,
    IMAGE_URL: EVN.IMAGE_URL
}

export default env