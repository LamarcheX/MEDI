const {
    NODE_ENV: enviroment = 'development',
    APP_PORT: port = 5000,
    ATLAS_URL: atlasUrl = 'localhost',
    JWT_SECRET: jwtSecret = 'test',
} = process.env;

export const EnvConfig = () => ({
    enviroment,
    port,
    atlasUrl,
    jwtSecret,
});
