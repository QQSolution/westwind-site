# Get applications on Telegram + a live Google Sheet

Every time a driver finishes the 60-second application, it will (1) drop a new row
into a Google Sheet automatically, and (2) ping your Telegram. One free Google
Apps Script does both. ~10 minutes, one time.

## 1. Make the spreadsheet
1. Go to **sheets.new** (signed into the Google account you want to own this).
2. Name it **West Wind Leads**. Leave it open.

## 2. Add the script
1. In that sheet: **Extensions → Apps Script**.
2. Delete whatever code is there, and paste in the whole of **`apps-script-Code.gs`**
   (in this folder).
3. Leave it for now — we fill in the two Telegram values next.

## 3. Make the Telegram bot (2 min)
1. In Telegram, open a chat with **@BotFather**.
2. Send **/newbot**, follow the prompts (name it e.g. "West Wind Leads").
3. BotFather gives you a **bot token** like `8123456789:AAH...`. Copy it.

## 4. Get your chat id
- **To your own DM:** open a chat with your new bot and send it any message ("hi").
  Then open this URL in a browser (paste your token in):
  `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
  Find `"chat":{"id":123456789` — that number is your **chat id**.
- **To a team group instead:** create a group, add the bot to it, send a message in
  the group, then open the same getUpdates URL. The group id is the **negative**
  number (e.g. `-1001234567890`).

## 5. Fill in + deploy
1. Back in Apps Script, at the top of the code set:
   - `TELEGRAM_BOT_TOKEN` = your bot token
   - `TELEGRAM_CHAT_ID` = your chat id
2. Click **Save**.
3. Click **Deploy → New deployment**.
4. Gear icon → **Web app**.
5. Set **Execute as: Me**, **Who has access: Anyone**. Click **Deploy**.
6. Click **Authorize access** and allow it (it's your own script).
7. Copy the **Web app URL** — it ends in **`/exec`**.

## 6. Turn it on
Send that `/exec` URL back to me and I'll wire it into the site and redeploy
(it goes into `src/content/site.ts` → `config.lead.webhookUrl`). After that:
- Submit a test application on drivewestwind.com.
- A new row appears in your Sheet, and a Telegram message arrives. Done.

Notes
- The full DOT application still lives in Tenstreet/IntelliApp; this captures the
  pre-qualified lead (name, phone, answers, and where they came from) the moment
  they finish the quiz — before the Tenstreet handoff.
- Until the URL is set, leads are safely captured in the browser (nothing is lost),
  they just don't forward yet.
