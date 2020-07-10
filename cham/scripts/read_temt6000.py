import time
import sqlite3
import datetime
import RPi.GPIO as GPIO
from config import db, dbTable_temt_readings, sensor_temt, photoXistorPin

GPIO.setmode(GPIO.BCM)
GPIO.setup(photoXistorPin, GPIO.IN)

failedSensorReadCount = 0
table = dbTable_temt_readings
sensor = sensor_temt
lighton = 0

try: 
  sqliteConnection = sqlite3.connect(db)
  cursor = sqliteConnection.cursor()
except ValueError:
  print(ValueError)

while True:
  previouson = [lighton][0]
  previousstate = 'ON' if previouson == 1 else 'OFF'
  lighton = GPIO.input(photoXistorPin) 
  lightstate = 'ON' if lighton == 1 else 'OFF'

# Convert the data
  now = datetime.datetime.now()
  timestamp = now.strftime("%Y-%m-%d %H:%M:%S")

# Read sensor
  if (lighton is not None):
    if (previousstate != lightstate):
      
      # Output data to screen
      print("[%s] Light [%s] -> [%s]\t\t[%s]" %(sensor, previousstate, lightstate, str(now)))

      try:
        # Save data if light state changed
        sql_statement = "INSERT INTO " + table + " VALUES(?,?,?,?);"
        cursor.execute(sql_statement,(None,lighton,timestamp,sensor))
        sqliteConnection.commit()
      except sqliteConnection.Error as e:
         print(e)
         print(type(e).__name__)
 
  else:
    # Alert on sensor failure
    failedSensorReadCount+=1
    print("[%s] Light Unknown [%s]\t\t[%s]" %(sensor, failedSensorReadCount,  str(now)))

  time.sleep(30)
