import sqlite3
import smbus
import time
import datetime
from config import db, dbTable_sht_readings, sensor_sht

table = dbTable_sht_readings
sensor = sensor_sht 
failedSensorReadCount = 0

# Get I2C bus
bus = smbus.SMBus(1)

try: 
    sqliteConnection = sqlite3.connect(db)
    cursor = sqliteConnection.cursor()
except ValueError:
    print(ValueError)


try:
    while True:

# SHT30 address, 0x44(68)
# Send measurement command, 0x2C(44)
#		0x06(06)	High repeatability measurement
        bus.write_i2c_block_data(0x44, 0x2C, [0x06])

        time.sleep(0.5)

# SHT30 address, 0x44(68)
# Read data back from 0x00(00), 6 bytes
# cTemp MSB, cTemp LSB, cTemp CRC, Humididty MSB, Humidity LSB, Humidity CRC
        data = bus.read_i2c_block_data(0x44, 0x00, 6)

# Convert the data
        now = datetime.datetime.now()
        timestamp = now.strftime("%Y-%m-%d %H:%M:%S")
        temperature_c = ((((data[0] * 256.0) + data[1]) * 175) / 65535.0) - 45
        temperature_f = temperature_c * 1.8 + 32
        humidity = 100 * (data[3] * 256 + data[4]) / 65535.0

# Output data to screen
        print("[%s] Temperature: %-3.1f F,\tHumidity: %-3.1f %%\t\t[%s]" %(sensor, temperature_f, humidity,  str(now)))

        if ((temperature_f is not None) & (humidity is not None)):

            try:
                sql_statement = "INSERT INTO " + table + " VALUES(?,?,?,?,?);"
                cursor.execute(sql_statement,(None,temperature_f,humidity,timestamp,sensor))
                sqliteConnection.commit()
            except sqliteConnection.Error as e:
                print(e)
                print(type(e).__name__)

        else:
            failedSensorReadCount+=1
            print("[%s] Temperature: ---- F,\tHumidity: ---- %%\t\t[%s] [%d]" %(sensor, str(now), failedSensorReadCount))
        time.sleep(59.5)

except KeyboardInterrupt:
    print("Cleanup")
