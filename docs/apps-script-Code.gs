/**
 * West Wind lead + call receiver v4 (PRE-FILLED). RESILIENT ORDERING.
 * Telegram is sent FIRST and independently, so a Google Sheet problem can never
 * block your ping again. Each step is wrapped in its own try/catch.
 *
 * WHY YOUR PINGS STOPPED: if this script is a STANDALONE project (not opened from
 * inside the Google Sheet), SpreadsheetApp.getActiveSpreadsheet() returns null and
 * the old code threw on the Sheet write BEFORE it ever reached the Telegram line.
 * Fix options: (a) this v4 sends Telegram first so it no longer matters, and/or
 * (b) paste your Sheet's ID into SHEET_ID below to write rows reliably.
 *
 * TO APPLY (the step people miss): paste this over the old code, click Save, then
 * Deploy > Manage deployments > (pencil icon) > Version: NEW VERSION > Deploy.
 * Editing + Save alone does NOT update the live web app. The /exec URL stays the same.
 * TEST after: open the /exec URL with ?test=1 on the end in a browser — you should
 * get a Telegram ping within a couple seconds.
 */

var TELEGRAM_BOT_TOKEN = 'PASTE_YOUR_BOT_TOKEN';
var TELEGRAM_CHAT_ID   = 'PASTE_YOUR_CHAT_ID';
var SHEET_NAME         = 'Leads';
// OPTIONAL: paste the long ID from your Google Sheet URL between the quotes to make
// the sheet write reliable even for a standalone script. Leave '' to use the bound sheet.
var SHEET_ID           = '';

var HEADERS = ['Received', 'Updated', 'Name', 'Phone', 'Email', 'State', 'Experience',
  'Reefer', 'Wants to run', 'Clean record', 'Result', 'Stage', 'Source', 'Channel',
  'Campaign', 'Lead ID'];

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.stage === 'call') {
      try { notifyCall_(d); } catch (err) { console.error('telegram(call)', err); }
      try { logCall_(d); }   catch (err) { console.error('sheet(call)', err); }
    } else {
      try { notifyTelegram_(d); } catch (err) { console.error('telegram(lead)', err); }
      try { upsertSheet_(d); }    catch (err) { console.error('sheet(lead)', err); }
    }
  } catch (err) {
    console.error('doPost', err);
  }
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Visit the /exec URL with ?test=1 to fire a Telegram test ping from the LIVE deploy. */
function doGet(e) {
  var msg = 'West Wind lead receiver v4 is live.';
  if (e && e.parameter && e.parameter.test) {
    try {
      telegram_('🔧 LIVE deploy test ping. If you see this, the deployed script CAN reach Telegram.');
      msg += ' Test ping sent to Telegram.';
    } catch (err) {
      msg += ' Test ping FAILED: ' + err;
    }
  }
  return ContentService.createTextOutput(msg);
}

function telegram_(text) {
  var res = UrlFetchApp.fetch('https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage', {
    method: 'post', muteHttpExceptions: true,
    payload: { chat_id: TELEGRAM_CHAT_ID, text: text }
  });
  return res.getContentText();
}

function sheet_() {
  var ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('No spreadsheet. Set SHEET_ID or open this script from inside the Sheet.');
  return ss;
}

/* ---------- Applications ---------- */
function upsertSheet_(d) {
  var ss = sheet_();
  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  var idCol = HEADERS.length;
  var row = [
    new Date(), new Date(),
    d.name || '', d.phone || '', d.email || '', d.state || '',
    d.experience_years || '', d.reefer || '', d.run_type || '',
    d.record_clean === true ? 'Yes' : (d.record_clean === false ? 'No' : ''),
    d.lead_outcome || '', d.stage || '', d.source || '', d.channel || '',
    d.utm_campaign || '', d.lead_id || ''
  ];
  var last = sh.getLastRow();
  var found = 0;
  if (d.lead_id && last > 1) {
    var ids = sh.getRange(2, idCol, last - 1, 1).getValues();
    for (var i = 0; i < ids.length; i++) {
      if (ids[i][0] === d.lead_id) { found = i + 2; break; }
    }
  }
  if (found) {
    var old = sh.getRange(found, 1, 1, HEADERS.length).getValues()[0];
    row[0] = old[0] || row[0];
    for (var c = 2; c < HEADERS.length; c++) {
      if (row[c] === '' && old[c] !== '') row[c] = old[c];
    }
    sh.getRange(found, 1, 1, HEADERS.length).setValues([row]);
  } else {
    sh.appendRow(row);
  }
}

function notifyTelegram_(d) {
  var started = d.stage === 'partial';
  if (!started && d.lead_outcome === 'hard_no') return;
  var head = started ? '🟡 Lead started (still filling out)' : '✅ Application completed';
  telegram_(head + '\n' +
    '👤 ' + (d.name || '-') + '\n' +
    '📞 ' + (d.phone || '-') + '\n' +
    '📍 ' + (d.state || '-') + '\n' +
    (started ? '' :
      'Exp: ' + (d.experience_years || '-') + '  ·  Reefer: ' + (d.reefer || '-') + '\n' +
      '🚛 Wants: ' + (d.run_type || '-') + '\n' +
      'Result: ' + (d.lead_outcome || '-') + '\n') +
    '📡 ' + (d.channel || d.source || '-'));
}

/* ---------- Website call taps ---------- */
function logCall_(d) {
  var ss = sheet_();
  var sh = ss.getSheetByName('Calls') || ss.insertSheet('Calls');
  if (sh.getLastRow() === 0) {
    sh.appendRow(['Time', 'Source', 'Page']);
    sh.getRange(1, 1, 1, 3).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  sh.appendRow([new Date(), d.channel || d.source || '', d.page || '']);
}

function notifyCall_(d) {
  telegram_('📞 Someone tapped Call on the site\n' +
    '📡 Source: ' + (d.channel || d.source || '-') + '\n' +
    '🔗 ' + (d.page || '/'));
}

/** Run once from the editor to confirm Telegram works from this project. */
function testTelegram() {
  Logger.log(telegram_('✅ testTelegram() ran from the Apps Script editor.'));
}
