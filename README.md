# EmailBot

A Node.js application for sending automated emails using Gmail's OAuth2.

## Quick Setup

1. **GCP Setup**
   - Create project in [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Gmail API
   - Configure OAuth consent screen (External type)
   - Create OAuth credentials (Web application)
   - Add redirect URI: `https://developers.google.com/oauthplayground`

2. **Get OAuth Tokens**
   - Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
   - Use your OAuth credentials
   - Select Gmail API scope: `https://mail.google.com/`
   - Get refresh token

3. **Environment Setup**
   Create `.env` file:
   ```
   CLIENT_ID=your_client_id
   CLIENT_SECRET=your_client_secret
   REFRESH_TOKEN=your_refresh_token
   GMAIL_ADDRESS=your_gmail_address
   ```

4. **Run**
   ```bash
   npm install
   node email.js
   ```

## Security
- Keep `.env` and OAuth credentials secure
- Monitor API usage in GCP Console

## Support
- [Gmail API Docs](https://developers.google.com/gmail/api/guides)
- [OAuth 2.0 Docs](https://developers.google.com/identity/protocols/oauth2)