#!/bin/sh
s1="var wsProtocol \= window\.location\.protocol \=\=\= 'https:' \? 'wss' : 'ws';" && 
s2="var wsProtocol \= window\.location \&\& window\.location\.protocol \=\=\= 'https:' \? 'wss' : 'ws';" && 
sed -i -e "s/$s1/$s2/g" node_modules/@adonisjs/websocket-client/dist/Ws.browser.js