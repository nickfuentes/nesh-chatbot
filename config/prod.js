module.exports = {
  type: "service_account",
  project_id: process.env.GOOGLE_PROJECT_ID,
  sessionId: process.env.DIALOGFLOW_SESSION_ID,
  languageCode: process.env.DIALOGFLOW_LANGUAGE_CODE,
  private_key_id: "76a8106918e02011a3e8abee19c941ebecc913fc",
  private_key: process.env.GOOGLE_PRIVATE_KEY,
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: "118445873928577417164",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/nesh-capstone%40nesh-capstone.iam.gserviceaccount.com"
};
