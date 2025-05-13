from .cache import redis_client
from .firestore import db

def get_redis():
    return redis_client

def get_firestore():
    return db
