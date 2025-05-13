import json
from .config import settings

FIREBASE_JSON = settings.FIREBASE_JSON

db = None
if FIREBASE_JSON and FIREBASE_JSON.strip() and FIREBASE_JSON.strip() != '{}' and FIREBASE_JSON.strip() != "''":
    import firebase_admin
    from firebase_admin import credentials, firestore
    cred = credentials.Certificate(json.loads(FIREBASE_JSON))
    firebase_admin.initialize_app(cred)
    db = firestore.client()

def log_bet(bet: dict):
    if db:
        db.collection("bets").add(bet)

def log_stats(stats: dict):
    if db:
        db.collection("stats").add(stats)
