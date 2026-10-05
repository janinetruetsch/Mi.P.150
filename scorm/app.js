/* Übungen ASCII & UTF-8 – MI.P150 Informatik */
(function () {
  'use strict';

  // ---------- Hilfsfunktionen für Antwortprüfung ----------
  var norm = {
    bits: function (s) { return String(s).replace(/\s+/g, ''); },
    number: function (s) { return String(s).replace(/[\s'’]/g, ''); },
    exact: function (s) { return String(s).trim(); },
    ci: function (s) { return String(s).trim().toLowerCase(); }
  };

  // ---------- Inhalte ----------
  var EXERCISES = [
    {
      title: '1 · Was fällt auf?',
      lead: 'Vergleiche in der ASCII-Tabelle die Gross- und Kleinbuchstaben.',
      tools: ['ascii'],
      items: [
        {
          id: '1a', type: 'mc',
          prompt: 'Was unterscheidet die Codes von Gross- und Kleinbuchstaben (z.B. <code>A</code> und <code>a</code>)?',
          options: [
            { text: 'Kleinbuchstaben brauchen ein Bit mehr als Grossbuchstaben.', fb: 'Schau genau hin: Alle Codes in der Tabelle sind 7 Bit lang.' },
            { text: 'Sie unterscheiden sich immer nur in einem einzigen Bit – dem zweiten von links.', correct: true },
            { text: 'Der Code des Kleinbuchstabens ist immer doppelt so gross.', fb: 'Prüfe nach: 65 · 2 = 130, aber a = 97.' },
            { text: 'Es gibt keine Regelmässigkeit.', fb: 'Doch! Vergleiche A und a Bit für Bit.' }
          ],
          hints: [
            'Schreibe <code>A = 1000001</code> und <code>a = 1100001</code> untereinander und vergleiche Stelle für Stelle.',
            'Mach dasselbe mit <code>Z = 1011010</code> und <code>z = 1111010</code>. Ist es dieselbe Stelle?'
          ],
          explain: 'Gross- und Kleinbuchstaben unterscheiden sich nur im Bit mit dem Stellenwert 32. Bei Grossbuchstaben ist es 0, bei Kleinbuchstaben 1.'
        },
        {
          id: '1b', type: 'fields',
          prompt: 'Um wie viel unterscheiden sich die Dezimalwerte eines Gross- und des zugehörigen Kleinbuchstabens?',
          fields: [{ label: 'Differenz:', answer: ['32'], norm: 'number', width: 'short' }],
          diagnose: function (v) {
            if (norm.number(v[0]) === '-32') return 'Fast! Der Kleinbuchstabe hat den grösseren Wert – gefragt ist der Betrag.';
            return null;
          },
          hints: [
            'Rechne: <code>a − A = 97 − 65</code>',
            'Kontrolliere mit einem zweiten Paar: <code>z − Z = 122 − 90</code>'
          ],
          explain: '97 − 65 = 32 = 2<sup>5</sup>. Genau das ist der Stellenwert des Bits, das sich ändert. Darum lässt sich die Gross-/Kleinschreibung durch Umschalten eines einzigen Bits ändern.'
        }
      ]
    },
    {
      title: '2 · Binär → Text',
      lead: 'Entschlüssle die 7-Bit-ASCII-Codes.',
      tools: ['ascii', 'binary'],
      items: [
        {
          id: '2a', type: 'fields',
          prompt: 'Welches Wort steht hier?<br><span class="bits">1010000 1001000 1011010 1001000</span>',
          fields: [{ label: 'Wort:', answer: ['PHZH'], norm: 'exact', mono: true }],
          diagnose: function (v) {
            var s = norm.exact(v[0]);
            if (s.toUpperCase() === 'PHZH') return 'Die Buchstaben stimmen – achte aber auf Gross-/Kleinschreibung! Beginnen die Codes mit <code>10…</code> oder <code>11…</code>?';
            return null;
          },
          hints: [
            'Jede 7er-Gruppe ist genau ein Zeichen. Es sind also vier Buchstaben.',
            'Rechne die erste Gruppe um: <code>1010000</code> = 64 + 16 = 80. Welcher Buchstabe hat den Code 80?',
            'Alle vier Codes beginnen mit <code>10</code> – es sind also Grossbuchstaben (65–90).'
          ],
          explain: '1010000 = 80 = <b>P</b>, 1001000 = 72 = <b>H</b>, 1011010 = 90 = <b>Z</b>, 1001000 = 72 = <b>H</b>. Tipp: Der zweite und der vierte Code sind identisch – also auch derselbe Buchstabe.'
        }
      ]
    },
    {
      title: '3 · Gross ↔ Klein umschalten',
      lead: 'Nutze deine Erkenntnis aus Übung 1 – ohne Tabelle geht es schneller!',
      tools: ['ascii'],
      items: [
        {
          id: '3a', type: 'fields',
          prompt: 'Das Zeichen <code>m</code> hat den Code <span class="bits">1101101</span><br>Wie lautet der 7-Bit-Code von <code>M</code>?',
          fields: [{ label: 'M =', answer: ['1001101'], norm: 'bits', mono: true, placeholder: '7 Bit, z.B. 1000001' }],
          diagnose: function (v) {
            var s = norm.bits(v[0]);
            if (!/^[01]*$/.test(s)) return 'Bitte nur 0 und 1 eingeben.';
            if (s.length !== 7) return 'Der Code muss genau 7 Bit lang sein (du hast ' + s.length + ').';
            return null;
          },
          hints: [
            'Grossbuchstaben haben das Bit mit dem Stellenwert 32 auf 0.',
            'Das ist das zweite Bit von links. Ändere nur dieses eine Bit.'
          ],
          explain: '1<b>1</b>01101 → 1<b>0</b>01101. Kontrolle: 64 + 8 + 4 + 1 = 77 = M.'
        },
        {
          id: '3b', type: 'fields',
          prompt: 'Und umgekehrt: <code>G</code> hat den Code <span class="bits">1000111</span><br>Wie lautet der Code von <code>g</code>?',
          fields: [{ label: 'g =', answer: ['1100111'], norm: 'bits', mono: true, placeholder: '7 Bit' }],
          diagnose: function (v) {
            var s = norm.bits(v[0]);
            if (!/^[01]*$/.test(s)) return 'Bitte nur 0 und 1 eingeben.';
            if (s.length !== 7) return 'Der Code muss genau 7 Bit lang sein (du hast ' + s.length + ').';
            return null;
          },
          hints: ['Diesmal muss das Bit mit Stellenwert 32 von 0 auf 1 wechseln.'],
          explain: '1<b>0</b>00111 → 1<b>1</b>00111 = 103 = g.'
        }
      ]
    },
    {
      title: '4 · Wie viele Zeichen passen?',
      lead: 'Mit jedem zusätzlichen Bit verdoppelt sich die Anzahl möglicher Codes.',
      tools: [],
      items: [
        {
          id: '4a', type: 'fields',
          prompt: 'Wie viele verschiedene Zeichen lassen sich codieren mit …',
          fields: [
            { label: '7 Bit (ASCII):', answer: ['128'], norm: 'number', width: 'short' },
            { label: '8 Bit:', answer: ['256'], norm: 'number', width: 'short' }
          ],
          diagnose: function (v) {
            if (norm.number(v[0]) === '127' || norm.number(v[1]) === '255') return 'Achtung: 127 bzw. 255 ist der <i>grösste Wert</i>. Gefragt ist die <i>Anzahl</i> – die 0 zählt auch mit!';
            if (norm.number(v[0]) === '14' || norm.number(v[1]) === '16') return 'Nicht mal 2 rechnen, sondern 2 <i>hoch</i> die Anzahl Bits.';
            return null;
          },
          hints: [
            '1 Bit → 2 Möglichkeiten (0, 1). 2 Bit → 4 Möglichkeiten (00, 01, 10, 11). 3 Bit → ?',
            'Allgemein: n Bit → 2<sup>n</sup> Möglichkeiten.'
          ],
          explain: '2<sup>7</sup> = 128 und 2<sup>8</sup> = 256. Der Schritt von 7 auf 8 Bit verdoppelt also die Anzahl Zeichen.'
        },
        {
          id: '4b', type: 'fields',
          prompt: 'In China werden rund 5’000 Schriftzeichen aktiv genutzt. Wie viele Bit braucht man <b>mindestens</b>, um 5’000 Zeichen zu unterscheiden?',
          fields: [{ label: 'Anzahl Bit:', answer: ['13'], norm: 'number', width: 'short' }],
          diagnose: function (v) {
            var n = parseInt(norm.number(v[0]), 10);
            if (n === 12) return '2<sup>12</sup> = 4’096 – das reicht noch nicht ganz für 5’000.';
            if (n === 16) return '16 Bit (2 Bytes) würden reichen – aber geht es auch mit weniger?';
            if (n > 13 && n < 16) return 'Das reicht, aber gefragt ist das Minimum.';
            return null;
          },
          hints: [
            'Verdopple ab 256 (8 Bit) weiter: 9 Bit → 512, 10 Bit → 1’024, …',
            '2<sup>12</sup> = 4’096. Reicht das für 5’000?'
          ],
          explain: '2<sup>12</sup> = 4’096 &lt; 5’000 &le; 8’192 = 2<sup>13</sup>. Man braucht also 13 Bit – weit mehr als ein Byte. Darum braucht es eine Codierung wie UTF-8 mit mehreren Bytes pro Zeichen.'
        }
      ]
    },
    {
      title: '5 · UTF-8: Wie lang ist das Zeichen?',
      lead: 'In UTF-8 verrät das erste Byte, wie viele Bytes zum Zeichen gehören.',
      tools: ['utf8'],
      items: [
        {
          id: '5a', type: 'fields',
          prompt: 'Ordne jedem Byte die passende Bedeutung zu.',
          fields: [
            { label: '01000001', type: 'select', answer: ['1'] },
            { label: '11100010', type: 'select', answer: ['3'] },
            { label: '11000011', type: 'select', answer: ['2'] },
            { label: '10100100', type: 'select', answer: ['F'] },
            { label: '11110000', type: 'select', answer: ['4'] }
          ],
          selectOptions: [
            { value: '', text: '– bitte wählen –' },
            { value: '1', text: 'Startbyte: Zeichen mit 1 Byte' },
            { value: '2', text: 'Startbyte: Zeichen mit 2 Bytes' },
            { value: '3', text: 'Startbyte: Zeichen mit 3 Bytes' },
            { value: '4', text: 'Startbyte: Zeichen mit 4 Bytes' },
            { value: 'F', text: 'Folgebyte (gehört zum Zeichen davor)' }
          ],
          hints: [
            'Beginnt ein Byte mit <code>0</code>, ist es ein ganz normales ASCII-Zeichen.',
            'Zähle bei den anderen die Einsen am Anfang, bis zur ersten 0. So viele Bytes ist das Zeichen lang.',
            'Ein Byte, das mit <code>10</code> beginnt, ist nie ein Startbyte.'
          ],
          explain: 'Die Anzahl führender Einsen gibt die Länge an: <code>0…</code> = 1 Byte, <code>110…</code> = 2, <code>1110…</code> = 3, <code>11110…</code> = 4. <code>10…</code> kennzeichnet Folgebytes.'
        }
      ]
    },
    {
      title: '6 · UTF-8 entschlüsseln',
      lead: 'Jetzt alles zusammen: eine echte UTF-8-Bytefolge.',
      tools: ['utf8', 'ascii', 'binary'],
      items: [
        {
          id: '6a', type: 'fields',
          prompt: 'Diese Bytefolge ist in UTF-8 codiert:<br><span class="bits">01000010 11000011 10100100 01110010</span>',
          fields: [
            { label: 'Anzahl Bytes:', answer: ['4'], norm: 'number', width: 'short' },
            { label: 'Anzahl Zeichen:', answer: ['3'], norm: 'number', width: 'short' }
          ],
          diagnose: function (v) {
            if (norm.number(v[1]) === '4') return 'Nicht jedes Byte ist ein eigenes Zeichen! Schau dir die Startbits an.';
            return null;
          },
          hints: [
            'Ein Byte = 8 Bit. Zähle die Gruppen.',
            'Das zweite Byte beginnt mit <code>110</code> – wie viele Bytes gehören zu diesem Zeichen?'
          ],
          explain: '4 Bytes, aber nur 3 Zeichen: <code>11000011 10100100</code> bilden zusammen ein einziges Zeichen.'
        },
        {
          id: '6b', type: 'fields',
          prompt: 'Welches Wort ist es? (Tipp: Das 2-Byte-Zeichen ist ein Umlaut, den es in ASCII nicht gibt.)',
          fields: [{ label: 'Wort:', answer: ['Bär'], norm: 'exact', mono: true }],
          diagnose: function (v) {
            var s = norm.exact(v[0]);
            if (s.toLowerCase() === 'bär') return 'Fast – achte auf Gross-/Kleinschreibung.';
            if (/^b.r$/i.test(s)) return 'Erster und letzter Buchstabe stimmen! Das mittlere Zeichen ist ein Umlaut.';
            return null;
          },
          hints: [
            '<code>01000010</code>: lass die führende 0 weg → <code>1000010</code> = 66. Welcher Buchstabe?',
            '<code>01110010</code> → <code>1110010</code> = 114.',
            'Das Wort ist ein Tier mit drei Buchstaben, z.B. aus dem Berner Wappen.'
          ],
          explain: '<code>01000010</code> = B, <code>11000011 10100100</code> = ä, <code>01110010</code> = r → <b>Bär</b>. Die ASCII-Zeichen B und r sind in UTF-8 identisch mit ihrem ASCII-Code (nur mit führender 0).'
        }
      ]
    },
    {
      title: '7 · Warum UTF-8 so clever ist',
      lead: 'Zum Abschluss eine Verständnisfrage.',
      tools: ['utf8'],
      items: [
        {
          id: '7a', type: 'mc',
          prompt: 'Eine alte Textdatei enthält nur englischen Text in 7-Bit-ASCII (jedes Zeichen mit vorangestellter 0 als Byte gespeichert). Was passiert, wenn ein Programm sie als UTF-8 liest?',
          options: [
            { text: 'Der Text wird korrekt angezeigt, weil jede ASCII-Datei automatisch auch gültiges UTF-8 ist.', correct: true },
            { text: 'Der Text wird falsch angezeigt, weil UTF-8 immer mindestens 2 Bytes pro Zeichen braucht.', fb: 'Nein – laut Schema gibt es in UTF-8 auch Zeichen mit nur 1 Byte.' },
            { text: 'Nur die Kleinbuchstaben werden korrekt angezeigt.', fb: 'Gross- und Kleinbuchstaben beginnen beide mit 0 – es gibt hier keinen Unterschied.' },
            { text: 'Die Datei muss zuerst umgewandelt werden.', fb: 'Prüfe, wie UTF-8 Zeichen codiert, deren erstes Bit 0 ist.' }
          ],
          hints: [
            'Mit welchem Bit beginnt jedes Byte der ASCII-Datei?',
            'Schau im UTF-8-Schema nach: Was bedeutet ein Byte der Form <code>0xxxxxxx</code>?'
          ],
          explain: 'UTF-8 ist <b>rückwärtskompatibel</b> zu ASCII: Die ersten 128 Zeichen werden genau gleich codiert (<code>0xxxxxxx</code>). Erst für weitere Zeichen werden 2–4 Bytes verwendet.'
        }
      ]
    }
  ];

  // ---------- ASCII-Tabelle ----------
  function bin7(n) { return ('0000000' + n.toString(2)).slice(-7); }
  function pad3(n) { return ('  ' + n).slice(-3); }
  (function buildAsciiTable() {
    var el = document.getElementById('ascii-table');
    var html = '';
    for (var i = 0; i < 26; i++) {
      var up = 65 + i, lo = 97 + i;
      html += '<div>' + String.fromCharCode(up) + ' | ' + pad3(up) + ' | ' + bin7(up) + '</div>';
      html += '<div>' + String.fromCharCode(lo) + ' | ' + pad3(lo) + ' | ' + bin7(lo) + '</div>';
    }
    el.innerHTML = html;
  })();

  // ---------- Zustand ----------
  var allItems = [];
  EXERCISES.forEach(function (ex) { ex.items.forEach(function (it) { allItems.push(it); }); });

  var state = { step: 0, items: {} };
  allItems.forEach(function (it) { state.items[it.id] = { s: 'open', a: 0, h: 0, v: [] }; });
  // s: open | correct | revealed ; a: Fehlversuche ; h: genutzte Hinweise ; v: Eingaben

  var STEPS = EXERCISES.length + 2; // Intro + Übungen + Auswertung

  var lms = SCORM.init();
  var saved = SCORM.loadState();
  if (saved && saved.items) {
    Object.keys(saved.items).forEach(function (k) { if (state.items[k]) state.items[k] = saved.items[k]; });
    if (typeof saved.step === 'number') state.step = Math.min(saved.step, STEPS - 1);
  }

  function persist() {
    SCORM.set('cmi.core.lesson_location', String(state.step));
    SCORM.saveState(state);
  }

  function score() {
    var pts = 0;
    allItems.forEach(function (it) { if (state.items[it.id].s === 'correct') pts++; });
    return { pts: pts, max: allItems.length, pct: allItems.length ? (pts / allItems.length) * 100 : 0 };
  }

  // ---------- Rendering ----------
  var app = document.getElementById('app');
  var btnPrev = document.getElementById('btn-prev');
  var btnNext = document.getElementById('btn-next');

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var TOOL_LABELS = {
    ascii: { label: '📋 ASCII-Tabelle', dlg: 'dlg-ascii' },
    binary: { label: '🔢 Binär ↔ Dezimal', dlg: 'dlg-binary' },
    utf8: { label: '🧩 UTF-8-Schema', dlg: 'dlg-utf8' }
  };

  function render() {
    window.scrollTo(0, 0);
    var step = state.step;
    document.getElementById('progress-bar').style.width = (step / (STEPS - 1) * 100) + '%';
    document.getElementById('step-label').textContent =
      step === 0 ? 'Start' : step === STEPS - 1 ? 'Auswertung' : 'Übung ' + step + ' von ' + EXERCISES.length;
    btnPrev.disabled = step === 0;
    btnNext.style.visibility = step === STEPS - 1 ? 'hidden' : 'visible';
    btnNext.textContent = step === 0 ? 'Los geht’s →' : step === STEPS - 2 ? 'Zur Auswertung →' : 'Weiter →';

    if (step === 0) return renderIntro();
    if (step === STEPS - 1) return renderSummary();
    renderExercise(EXERCISES[step - 1]);
  }

  function renderIntro() {
    app.innerHTML =
      '<h2>Willkommen!</h2>' +
      '<p>In diesen kurzen Übungen vertiefst du die Inhalte der Folien zu <b>ASCII</b> und <b>UTF-8</b>. ' +
      'Du brauchst etwa <b>10 Minuten</b>.</p>' +
      '<ul>' +
      '<li>Bei jeder Aufgabe kannst du <b>💡 Hinweise</b> aufdecken – Schritt für Schritt. Hinweise kosten keine Punkte.</li>' +
      '<li>Über die Buttons oben in jeder Übung öffnest du die <b>ASCII-Tabelle</b>, eine <b>Umrechnungshilfe</b> und das <b>UTF-8-Schema</b>.</li>' +
      '<li>Du kannst beliebig oft prüfen. Nach zwei Fehlversuchen kannst du dir die Lösung anzeigen lassen (dann gibt es für diese Aufgabe aber keinen Punkt).</li>' +
      '</ul>' +
      (lms ? '' : '<p class="note">Hinweis: Keine Lernplattform erkannt – die Übungen funktionieren trotzdem, das Ergebnis wird aber nicht gespeichert.</p>');
  }

  function renderExercise(ex) {
    var html = '<h2>' + ex.title + '</h2><p class="lead">' + ex.lead + '</p>';
    if (ex.tools.length) {
      html += '<div class="toolbar">';
      ex.tools.forEach(function (t) {
        html += '<button type="button" class="btn small secondary" data-open="' + TOOL_LABELS[t].dlg + '">' + TOOL_LABELS[t].label + '</button>';
      });
      html += '</div>';
    }
    ex.items.forEach(function (it) { html += '<section class="item" id="item-' + it.id + '"></section>'; });
    app.innerHTML = html;
    ex.items.forEach(renderItem);
  }

  function renderItem(it) {
    var st = state.items[it.id];
    var el = document.getElementById('item-' + it.id);
    var done = st.s !== 'open';
    el.className = 'item' + (st.s === 'correct' ? ' correct' : st.s === 'revealed' ? ' solved' : '');

    var html = '<p class="q">' + it.prompt + '</p>';

    if (it.type === 'mc') {
      html += '<ul class="choices">';
      it.options.forEach(function (o, i) {
        var checked = st.v[0] === String(i) ? ' checked' : '';
        html += '<li><label><input type="radio" name="mc-' + it.id + '" value="' + i + '"' + checked + (done ? ' disabled' : '') + '><span>' + o.text + '</span></label></li>';
      });
      html += '</ul>';
    } else {
      it.fields.forEach(function (f, i) {
        var val = st.v[i] != null ? st.v[i] : '';
        html += '<div class="row"><span class="label' + (f.type === 'select' ? ' mono' : '') + '">' + f.label + '</span>';
        if (f.type === 'select') {
          html += '<select data-idx="' + i + '"' + (done ? ' disabled' : '') + '>';
          it.selectOptions.forEach(function (o) {
            html += '<option value="' + o.value + '"' + (o.value === val ? ' selected' : '') + '>' + o.text + '</option>';
          });
          html += '</select>';
        } else {
          html += '<input type="text" autocomplete="off" spellcheck="false" data-idx="' + i + '"' +
            (f.mono ? ' class="mono"' : '') +
            (f.width === 'short' ? ' style="min-width:0;width:120px"' : '') +
            ' placeholder="' + esc(f.placeholder || '') + '" value="' + esc(val) + '"' + (done ? ' disabled' : '') + '>';
        }
        html += '</div>';
      });
    }

    html += '<div class="actions">';
    if (!done) {
      html += '<button type="button" class="btn" data-act="check">Prüfen</button>';
      if (st.h < it.hints.length) {
        html += '<button type="button" class="btn hint" data-act="hint">💡 Hinweis ' + (st.h + 1) + ' von ' + it.hints.length + '</button>';
      }
      if (st.a >= 2) html += '<button type="button" class="btn secondary" data-act="reveal">Lösung anzeigen</button>';
    }
    html += '</div>';

    html += '<div class="feedback"></div>';

    if (st.h > 0) {
      html += '<div class="hints">';
      for (var h = 0; h < st.h; h++) html += '<div class="hint-box"><b>Hinweis ' + (h + 1) + '</b>' + it.hints[h] + '</div>';
      html += '</div>';
    }

    if (done) {
      html += '<div class="explain">' + (st.s === 'revealed' ? '<b>Lösung: </b>' + solutionText(it) + '<br>' : '') + it.explain + '</div>';
    }

    el.innerHTML = html;

    var fb = el.querySelector('.feedback');
    if (st.s === 'correct') { fb.className = 'feedback ok'; fb.innerHTML = '✔ Richtig!'; }

    el.querySelectorAll('[data-act]').forEach(function (b) {
      b.addEventListener('click', function () { onAction(it, b.getAttribute('data-act')); });
    });
    el.querySelectorAll('input[type=text]').forEach(function (inp) {
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') onAction(it, 'check'); });
    });
  }

  function solutionText(it) {
    if (it.type === 'mc') {
      for (var i = 0; i < it.options.length; i++) if (it.options[i].correct) return it.options[i].text;
    }
    return it.fields.map(function (f) {
      var a = f.answer[0];
      if (f.type === 'select') {
        a = it.selectOptions.filter(function (o) { return o.value === a; })[0].text;
      }
      return '<code>' + f.label + '</code> ' + a;
    }).join(' · ');
  }

  function readValues(it) {
    var el = document.getElementById('item-' + it.id);
    if (it.type === 'mc') {
      var r = el.querySelector('input[type=radio]:checked');
      return [r ? r.value : ''];
    }
    return it.fields.map(function (f, i) {
      return el.querySelector('[data-idx="' + i + '"]').value;
    });
  }

  function onAction(it, act) {
    var st = state.items[it.id];
    if (act === 'hint') {
      st.v = readValues(it);
      st.h = Math.min(st.h + 1, it.hints.length);
      renderItem(it);
      persist();
      return;
    }
    if (act === 'reveal') {
      st.s = 'revealed';
      renderItem(it);
      persist();
      return;
    }
    // Prüfen
    var v = readValues(it);
    st.v = v;
    var fbEl = document.querySelector('#item-' + it.id + ' .feedback');

    if (v.some(function (x) { return String(x).trim() === ''; })) {
      fbEl.className = 'feedback info';
      fbEl.innerHTML = it.type === 'mc' ? 'Bitte wähle eine Antwort aus.' : 'Bitte fülle alle Felder aus.';
      return;
    }

    var ok, msg = null;
    if (it.type === 'mc') {
      var opt = it.options[parseInt(v[0], 10)];
      ok = !!opt.correct;
      msg = opt.fb || null;
    } else {
      var wrongCount = it.fields.filter(function (f, i) {
        var n = norm[f.norm || 'exact'];
        return !f.answer.some(function (a) { return n(a) === n(v[i]); });
      }).length;
      ok = wrongCount === 0;
      if (!ok) {
        msg = it.diagnose ? it.diagnose(v) : null;
        if (!msg && it.fields.length > 1) {
          msg = wrongCount === 1 ? 'Ein Feld ist noch nicht richtig.' : wrongCount + ' Felder sind noch nicht richtig.';
        }
      }
    }

    if (ok) {
      st.s = 'correct';
      renderItem(it);
    } else {
      st.a++;
      renderItem(it);
      fbEl = document.querySelector('#item-' + it.id + ' .feedback');
      fbEl.className = 'feedback bad';
      var extra = st.h < it.hints.length ? ' Ein Hinweis könnte helfen.' : '';
      fbEl.innerHTML = '✘ Noch nicht ganz. ' + (msg || '') + (msg ? '' : extra);
    }
    persist();
  }

  function renderSummary() {
    var sc = score();
    var pct = Math.round(sc.pct);
    var html = '<h2>Auswertung</h2>' +
      '<div class="summary-score">' + sc.pts + ' / ' + sc.max + ' Punkte (' + pct + '%)</div>';
    html += '<ul class="summary-list">';
    EXERCISES.forEach(function (ex, ei) {
      ex.items.forEach(function (it, ii) {
        var st = state.items[it.id];
        var tag = st.s === 'correct' ? '<span class="tag ok">richtig</span>'
          : st.s === 'revealed' ? '<span class="tag bad">Lösung angezeigt</span>'
          : '<span class="tag bad">offen</span>';
        if (st.h > 0) tag += '<span class="tag hint">' + st.h + ' Hinweis' + (st.h > 1 ? 'e' : '') + '</span>';
        html += '<li><a href="#" data-goto="' + (ei + 1) + '">' + ex.title + (ex.items.length > 1 ? ' (' + String.fromCharCode(97 + ii) + ')' : '') + '</a> ' + tag + '</li>';
      });
    });
    html += '</ul>';
    var open = allItems.filter(function (it) { return state.items[it.id].s === 'open'; }).length;
    if (open) html += '<p>Du hast noch ' + open + ' offene Aufgabe' + (open > 1 ? 'n' : '') + '. Klicke auf eine Übung, um zurückzuspringen.</p>';
    html += '<h3>Das Wichtigste in Kürze</h3><ul>' +
      '<li>ASCII codiert Zeichen mit <b>7 Bit</b> → 2<sup>7</sup> = 128 Zeichen.</li>' +
      '<li>Gross- und Kleinbuchstaben unterscheiden sich nur im Bit mit Stellenwert <b>32</b>.</li>' +
      '<li>8 Bit ergeben nur 256 Zeichen – zu wenig für alle Sprachen der Welt.</li>' +
      '<li><b>UTF-8</b> nutzt 1 bis 4 Bytes pro Zeichen. Das erste Byte zeigt die Länge an, ASCII-Zeichen bleiben unverändert.</li>' +
      '</ul>';
    html += '<div class="actions"><button type="button" class="btn" id="btn-finish">Abschliessen</button></div>';
    app.innerHTML = html;

    app.querySelectorAll('[data-goto]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); go(parseInt(a.getAttribute('data-goto'), 10)); });
    });
    document.getElementById('btn-finish').addEventListener('click', function () {
      SCORM.reportScore(pct, 'completed');
      SCORM.finish('');
      this.disabled = true;
      this.textContent = 'Abgeschlossen ✔';
      var p = document.createElement('p');
      p.className = 'note';
      p.textContent = lms ? 'Dein Ergebnis wurde gespeichert. Du kannst dieses Fenster jetzt schliessen.' : 'Fertig! (Ohne Lernplattform wird nichts gespeichert.)';
      app.appendChild(p);
    });

    SCORM.reportScore(pct, open ? 'incomplete' : 'completed');
  }

  function go(step) {
    state.step = Math.max(0, Math.min(STEPS - 1, step));
    persist();
    render();
  }

  btnPrev.addEventListener('click', function () { go(state.step - 1); });
  btnNext.addEventListener('click', function () { go(state.step + 1); });

  // Dialoge
  document.addEventListener('click', function (e) {
    var open = e.target.closest('[data-open]');
    if (open) {
      var d = document.getElementById(open.getAttribute('data-open'));
      if (d.showModal) d.showModal(); else d.setAttribute('open', '');
    }
    if (e.target.closest('[data-close]')) {
      var dlg = e.target.closest('dialog');
      if (dlg.close) dlg.close(); else dlg.removeAttribute('open');
    }
    if (e.target.tagName === 'DIALOG') e.target.close();
  });

  window.addEventListener('beforeunload', function () { persist(); SCORM.finish('suspend'); });
  window.addEventListener('pagehide', function () { persist(); SCORM.finish('suspend'); });

  render();
})();
