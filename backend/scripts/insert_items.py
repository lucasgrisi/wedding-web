from pymongo import MongoClient
import csv

client = MongoClient("mongodb://localhost:27017")
db = client["casamento"]

collection = db.get_collection("items")

collection.drop()

def currency_to_float(currency_str):
    # Remove currency symbol and thousands separator
    currency_str = currency_str.replace('R$', '').replace('.', '').replace(',', '.')
    # Convert to float
    return float(currency_str)

with open('items_maria_e_diogo.csv', 'r') as f:
    csv_reader = csv.reader(f)
    headers = next(csv_reader)
    print(headers)
    for i, row in enumerate(csv_reader):
        relevance =  i
        quantity = int(row[0]) if row[0] else 1
        title = row[1]
        price = currency_to_float(row[2])
        total_price = quantity * price
        sold = 0
        available = True
        img = row[4]
        collection.insert_one({
            'relevance': relevance,
            'quantity': quantity,
            'title': title,
            'total_price': total_price,
            'price': price,
            'sold': sold,
            'available': available,
            'img': img
        })

