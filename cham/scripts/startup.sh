#!/bin/bash

lxterminal -e bash -c "node ../server/server.js; bash" & 
lxterminal -e bash -c "cd ..; BROWSER=none npm start; bash" & 
# lxterminal -e bash -c "python3 read_am2302.py; bash" & 
lxterminal -e bash -c "python3 read_sht30.py; bash" & 
lxterminal -e bash -c "python3 read_temt6000.py; bash" &
