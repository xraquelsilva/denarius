import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host="db",  
        user="root",  
        password="root",  
        database="denarius"
    )
