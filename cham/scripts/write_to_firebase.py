import json
import requests
import sqlite3
from config import db, dbTable_sht_readings, sensor_sht, firebaseURL

table = dbTable_sht_readings


# SQLITE3 CALL
try: 
    sqliteConnection = sqlite3.connect(db)
    cursor = sqliteConnection.cursor()
    sql_statement = "SELECT * FROM " + table + " ORDER BY id DESC LIMIT 1;"
    cursor.execute(sql_statement)
    rows = cursor.fetchall()
    fields = cursor.description
    kluge, counter = {}, 0

    for f in fields:
        kluge[f[0]] = rows[0][counter]
        counter += 1

    del kluge["id"]
    kluge_json = json.dumps(kluge)

except ValueError:
    print(ValueError)


# FIREBASE CALL
response = requests.put(firebaseURL, data = kluge_json)
#print("PUT:    ", response.json())