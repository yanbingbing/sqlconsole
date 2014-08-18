Realtime Sql Console
==============================


## Installation

1. cd /path/to/sqlconsole
2. npm install
3. npm install forever -g
4. forever start -l forever.log -o out.log -e err.log app.js
5. add vhost `domain.com` to document_root `/path/to/sqlconsole`
6. modify variable `sqllogfile` in app.js at line 5
7. visit `http://domain.com/index.html`