# MI.P150 Informatik – Übungen ASCII & UTF-8 (SCORM 1.2)

Interaktive Übungen (ca. 10 Minuten) zur Vertiefung der Folien «Codiertabelle ASCII», «Internationalisation» und «UTF-8».

**Fertiges Paket:** [`dist/ascii-utf8-uebungen-scorm12.zip`](dist/ascii-utf8-uebungen-scorm12.zip) – direkt in Moodle, ILIAS usw. als SCORM-Paket hochladen.

## Übungen

| # | Thema | Aufgabentyp |
|---|-------|-------------|
| 1 | Was fällt auf? Gross- vs. Kleinbuchstaben (Bit mit Wert 32) | Multiple Choice + Zahl |
| 2 | Binär → Text: `1010000 1001000 1011010 1001000` → PHZH | Freitext |
| 3 | Gross ↔ Klein durch Umschalten eines Bits (m → M, G → g) | Bitmuster eingeben |
| 4 | Wie viele Zeichen mit 7/8 Bit? Wie viele Bit für 5'000 Zeichen? | Zahlen |
| 5 | UTF-8: Länge eines Zeichens am ersten Byte erkennen | Zuordnung (Dropdown) |
| 6 | UTF-8-Bytefolge entschlüsseln («Bär») | Zahlen + Freitext |
| 7 | Warum ist UTF-8 rückwärtskompatibel zu ASCII? | Multiple Choice |

## Hilfestellungen

- **💡 Hinweise** pro Aufgabe, schrittweise aufklappbar (kosten keine Punkte, werden in der Auswertung angezeigt).
- **Nachschlage-Buttons:** ASCII-Tabelle, Binär↔Dezimal-Umrechnung, UTF-8-Schema.
- **Gezieltes Feedback** bei typischen Fehlern (z.B. 127 statt 128, Kleinschreibung, falsche Bitlänge).
- Nach zwei Fehlversuchen: **Lösung anzeigen** (dann 0 Punkte für diese Aufgabe).

## LMS-Daten (SCORM 1.2)

- `cmi.core.score.raw` = Anteil richtig gelöster Aufgaben in % (11 Teilaufgaben)
- `cmi.core.lesson_status` = `incomplete` bis alle Aufgaben bearbeitet sind, dann `completed`
- Fortschritt wird in `cmi.suspend_data` gespeichert – Studierende können unterbrechen und später weitermachen.
- Ohne LMS läuft `scorm/index.html` auch direkt im Browser (dann ohne Speicherung).

## Paket neu bauen

Nach Änderungen in `scorm/` (Inhalte stehen in `scorm/app.js` im Array `EXERCISES`):

```sh
./build.sh
```
