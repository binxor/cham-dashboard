import RPi.GPIO as GPIO
import time
import datetime
import sqlite3
from config import irLightSensorPin, db, dbTable, maxFailedSensorPings
 
GPIO.setmode(GPIO.BCM)
GPIO.setup(irLightSensorPin, GPIO.IN)
 
def my_callback(channel):
    # Here, alternatively, an application / command etc. can be started.
    now = datetime.datetime.now()
    timestamp = now.strftime("%Y-%m-%d %H:%M:%S")
    print("%s Movement detected" %(timestamp))
 
try:
    GPIO.add_event_detect(irLightSensorPin, GPIO.RISING, callback=my_callback)
    while True:
        time.sleep(100)
except KeyboardInterrupt:
    print('Finish...')
GPIO.cleanup()
