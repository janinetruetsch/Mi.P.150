#!/bin/sh
# Erstellt das SCORM-1.2-Paket (ZIP) aus dem Ordner scorm/.
set -e
cd "$(dirname "$0")"
mkdir -p dist
rm -f dist/ascii-utf8-uebungen-scorm12.zip
cd scorm
zip -q -X ../dist/ascii-utf8-uebungen-scorm12.zip imsmanifest.xml index.html style.css scorm.js app.js
echo "Erstellt: dist/ascii-utf8-uebungen-scorm12.zip"
