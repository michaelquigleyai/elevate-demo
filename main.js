// Removes any [data-show-until="YYYY-MM-DDTHH:MM"] element once Europe/London time is past it.
// Override the clock with ?now=YYYY-MM-DDTHH:MM (London local).
(function () {
  var override = new URLSearchParams(location.search).get('now');
  var now;
  if (override && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(override)) {
    now = override;
  } else {
    var p = {};
    new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    now = p.year + '-' + p.month + '-' + p.day + 'T' + p.hour + ':' + p.minute;
  }
  document.querySelectorAll('[data-show-until]').forEach(function (el) {
    if (now > el.getAttribute('data-show-until')) el.remove();
  });
})();
