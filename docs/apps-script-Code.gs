/**
 * West Wind driver-lead receiver v2 (PRE-FILLED with your bot).
 * - Appends/UPDATES one row per driver in this spreadsheet (partial + complete merge
 *   into the same row by Lead ID, so no duplicates).
 * - Telegram: a "started" ping the moment they give name+phone, then a "completed"
 *   ping when they finish (skips a completed hard-no so you're not pinged for
 *   drivers who didn't qualify).
 *
 * To update: paste this over your existing script, Save, then
 * Deploy > Manage deployments > (pencil) > Version: New version > Deploy.
 * The /exec URL stays the same, so nothing on the website needs to change.
 */

var TELEGRAM_BOT_TOKEN = 'PASTE_YOUR_BOT_TOKEN';
var TELEGRAM_CHAT_ID   = 'PASTE_YOUR_CHAT_ID';
var SHEET_NAME         = 'Leads';

var HEADERS = ['Received', 'Updated', 'Name', 'Phone', 'Email', 'State', 'Experience',
  'Reefer', 'Wants to run', 'Clean record', 'Result', 'Stage', 'Source', 'Channel',
  'Campaign', 'Lead ID'];

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    upsertSheet_(d);
    notifyTelegram_(d);
  } catch (err) {
    console.error(err);
  }
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function upsertSheet_(d) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  var idCol = HEADERS.length; // Lead ID is the last column
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
    row[0] = old[0] || row[0]; // keep original Received time
    for (var c = 2; c < HEADERS.length; c++) {
      if (row[c] === '' && old[c] !== '') row[c] = old[c]; // don't blank existing data
    }
    sh.getRange(found, 1, 1, HEADERS.length).setValues([row]);
  } else {
    sh.appendRow(row);
  }
}

function notifyTelegram_(d) {
  var started = d.stage === 'partial';
  if (!started && d.lead_outcome === 'hard_no') return; // don't ping completed non-qualifiers
  var head = started ? '🟡 Lead started (still filling out)' : '✅ Application completed';
  var text = head + '\n' +
    '👤 ' + (d.name || '-') + '\n' +
    '📞 ' + (d.phone || '-') + '\n' +
    '📍 ' + (d.state || '-') + '\n' +
    (started ? '' :
      'Exp: ' + (d.experience_years || '-') + '  ·  Reefer: ' + (d.reefer || '-') + '\n' +
      '🚛 Wants: ' + (d.run_type || '-') + '\n' +
      'Result: ' + (d.lead_outcome || '-') + '\n') +
    '📡 ' + (d.channel || d.source || '-');
  UrlFetchApp.fetch('https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage', {
    method: 'post', muteHttpExceptions: true,
    payload: { chat_id: TELEGRAM_CHAT_ID, text: text }
  });
}

/** Optional: run once from the editor to send yourself a test ping. */
function testTelegram() {
  notifyTelegram_({ stage: 'complete', name: 'Test Driver', phone: '8004009956', state: 'IL',
    experience_years: '2plus', reefer: 'reefer', run_type: 'otr', lead_outcome: 'qualified', channel: 'Website' });
}
