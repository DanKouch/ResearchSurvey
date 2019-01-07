module.exports = {
    port: process.env.PORT || 3030,
    databaseURI: process.env.MONGODB_URI || process.env.MONGOLAB_URI || "mongodb://localhost/research-survey",
    sessionSecret: process.env.SESSION_SECRET
};