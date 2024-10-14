export default () => ({
    redis: {
        host: process.env.REDISHOST,
        port: process.env.REDISPORT,
    },
})