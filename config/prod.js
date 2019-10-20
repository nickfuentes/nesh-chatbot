module.exports = {
  type: "service_account",
  project_id: process.env.GOOGLE_PROJECT_ID,
  sessionId: process.env.DIALOGFLOW_SESSION_ID,
  languageCode: process.env.DIALOGFLOW_LANGUAGE_CODE,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  DATABASE_URL: process.env.DATABASE_URL
};
