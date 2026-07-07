/**
 * West Wind driver-lead receiver (Google Apps Script).
 * Every application from drivewestwind.com is:
 *   1) appended as a new row to THIS spreadsheet (updates automatically), and
 *   2) sent to your Telegram.
 *
 * Setup: see docs/lead-delivery-setup.md. Fill the 3 values below, then
 * Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone),
 * and send the /exec URL back so it can be wired into the site.
 */

// ======== FILL THESE IN ========
var TELEGRAM_BOT_TOKEN = 'PASTE_YOUR_BOT_TOKEN';   // from @BotFather
var TELEGRAM_CHAT_ID   = 'PASTE_YOUR_CHAT_ID';     // your chat or group id
var SHEET_NAME         = 'Leads';                  // tab name (created automatically)
// ================================

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    saveToSheet_(d);
    sendTelegram_(d);
  } catch (err) {
    console.error(err);
  }
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function saveToSheet_(d) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(['Received', 'Name', 'Phone', 'Email', 'State', 'Experience',
      'Reefer', 'Wants to run', 'Clean record', 'Result', 'Source', 'Channel',
      'Campaign', 'Lead ID']);
    sh.getRange(1, 1, 1, 14).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  sh.appendRow([
    new Date(),
    d.name || '', d.phone || '', d.email || '', d.state || '',
    d.experience_years || '', d.reefer || '', d.run_type || '',
    d.record_clean === true ? 'Yes' : (d.record_clean === false ? 'No' : ''),
    d.lead_outcome || '', d.source || '', d.channel || '',
    d.utm_campaign || '', d.lead_id || ''
  ]);
}

function sendTelegram_(d) {
  if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN.indexOf('PASTE') === 0) return;
  var text =
    '🚚 New driver lead (' + (d.lead_outcome || '') + ')\n' +
    '👤 ' + (d.name || '-') + '\n' +
    '📞 ' + (d.phone || '-') + '\n' +
    '📍 ' + (d.state || '-') + '\n' +
    'Exp: ' + (d.experience_years || '-') + '  ·  Reefer: ' + (d.reefer || '-') + '\n' +
    '🚛 Wants: ' + (d.run_type || '-') + '\n' +
    '📡 Source: ' + (d.channel || d.source || '-');
  UrlFetchApp.fetch('https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage', {
    method: 'post',
    muteHttpExceptions: true,
    payload: { chat_id: TELEGRAM_CHAT_ID, text: text }
  });
}
