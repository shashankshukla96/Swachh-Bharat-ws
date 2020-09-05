const devEnv = require('./dev')
const prodEnv = require('./prod')

const env = {
    dev: devEnv,
    prod: prodEnv
}

module.exports = env;
