#!/bin/bash

lxterminal -e bash -c "node ../server/server.js; bash" & 
lxterminal -e bash -c "cd ..; npm start; bash" & 
lxterminal -e bash -c "python read_temp_humidity.py; bash" & 
