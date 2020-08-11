// module.exports = __DEV__ ? require("./env.dev") : require("./env.prod")

// Commented the above codes temporarly
module.exports = __DEV__ ? require("./env") : require("./env")
