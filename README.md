Realtime Sql Console
==============================


## Installation

1. cd /path/to/sqlconsole
2. modify variable `sqllogfile` in app.js at line 5
3. npm install
4. npm install forever -g
5. forever start -l forever.log -o out.log -e err.log app.js
6. add vhost `domain.com` to document_root `/path/to/sqlconsole`
7. visit `http://domain.com/index.html`