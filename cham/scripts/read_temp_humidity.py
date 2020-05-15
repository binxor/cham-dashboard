import RPi.GPIO as GPIO
import dht11
import time
import datetime
import sqlite3
from config import pin, db, dbTable, maxFailedSensorPings, sensor

# initialize GPIO
GPIO.setwarnings(True)
GPIO.setmode(GPIO.BCM)
instance = dht11.DHT11(pin=pin)

# attempt connection to database
sqliteConnection = None
cursor = None
failedSensorPingCount = 0

try:
    sqliteConnection = sqlite3.connect(db)
    cursor = sqliteConnection.cursor()
except ValueError:
    print(ValueError)


# read and record sensor
try:
	while True:
	    result = instance.read()
            now = datetime.datetime.now()

	    if result.is_valid():
                timestamp = now.strftime("%Y-%m-%d %H:%M:%S")
                temperature_f = (result.temperature*9/5) + 32
                humidity = result.humidity
                print("Temperature: %-3.1f F,\tHumidity: %-3.1f %%\t\t[%s]" %(temperature_f, humidity,  str(now)))
                failedSensorPingCount = 0

                try:
                    sql_statement = "INSERT INTO " + dbTable  + " VALUES(?,?,?,?,?);"
                    cursor.execute(sql_statement,(None,temperature_f,humidity,timestamp,sensor))
                    sqliteConnection.commit()
                except sqliteConnection.Error as e:
                    print(e)
                    print(type(e).__name__)

            else:
                failedSensorPingCount+=1
                print("Temperature: ---- F,\tHumidity: ---- %%\t\t[%s] [%d]" %(str(now), failedSensorPingCount))

                if failedSensorPingCount > maxFailedSensorPings:
                    break 
            
	    time.sleep(60)

except KeyboardInterrupt:
    print("Cleanup")
    GPIO.cleanup()
