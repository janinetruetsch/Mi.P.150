/* Minimaler SCORM-1.2-Wrapper. Funktioniert auch ohne LMS (Standalone-Modus). */
var SCORM = (function () {
  var api = null;
  var startTime = null;
  var finished = false;

  function findAPI(win) {
    var tries = 0;
    while (win && !win.API && win.parent && win.parent !== win && tries < 10) {
      tries++;
      win = win.parent;
    }
    return win && win.API ? win.API : null;
  }

  function getAPI() {
    var found = null;
    try { found = findAPI(window); } catch (e) { /* cross-origin */ }
    if (!found) {
      try { if (window.opener) found = findAPI(window.opener); } catch (e) { /* cross-origin */ }
    }
    return found;
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function sessionTime() {
    var secs = Math.round((Date.now() - startTime) / 1000);
    var h = Math.floor(secs / 3600);
    var m = Math.floor((secs % 3600) / 60);
    var s = secs % 60;
    return (h < 1000 ? ('000' + h).slice(-4) : h) + ':' + pad(m) + ':' + pad(s);
  }

  return {
    init: function () {
      startTime = Date.now();
      api = getAPI();
      if (!api) return false;
      api.LMSInitialize('');
      var status = api.LMSGetValue('cmi.core.lesson_status');
      if (status === 'not attempted' || status === '') {
        api.LMSSetValue('cmi.core.lesson_status', 'incomplete');
      }
      api.LMSCommit('');
      return true;
    },
    connected: function () { return !!api; },
    get: function (key) { return api ? api.LMSGetValue(key) : ''; },
    set: function (key, value) { if (api) api.LMSSetValue(key, String(value)); },
    commit: function () { if (api) api.LMSCommit(''); },
    saveState: function (obj) {
      if (!api) return;
      var data = JSON.stringify(obj);
      if (data.length <= 4096) api.LMSSetValue('cmi.suspend_data', data);
      api.LMSCommit('');
    },
    loadState: function () {
      if (!api) return null;
      try { return JSON.parse(api.LMSGetValue('cmi.suspend_data') || 'null'); } catch (e) { return null; }
    },
    reportScore: function (percent, status) {
      if (!api) return;
      api.LMSSetValue('cmi.core.score.min', '0');
      api.LMSSetValue('cmi.core.score.max', '100');
      api.LMSSetValue('cmi.core.score.raw', String(Math.round(percent)));
      api.LMSSetValue('cmi.core.lesson_status', status);
      api.LMSCommit('');
    },
    finish: function (exitMode) {
      if (!api || finished) return;
      finished = true;
      api.LMSSetValue('cmi.core.session_time', sessionTime());
      api.LMSSetValue('cmi.core.exit', exitMode || '');
      api.LMSCommit('');
      api.LMSFinish('');
    }
  };
})();
