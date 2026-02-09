from fastapi.testclient import TestClient
from app import app
from database_mongo import get_db
import sys

def test_empty_string_collision():
    with TestClient(app) as client:
        # Cleanup
        db = get_db()
        db.users.delete_many({"username": {"$in": ["user_a", "user_b"]}})

        # User A with empty email/phone
        payload_a = {
            "username": "user_a",
            "password": "password",
            "email": "",
            "phone": ""
        }
        resp_a = client.post("/signup", json=payload_a)
        print(f"User A Signup: {resp_a.status_code}")

        # User B with empty email/phone
        payload_b = {
            "username": "user_b",
            "password": "password",
            "email": "",
            "phone": ""
        }
        resp_b = client.post("/signup", json=payload_b)
        print(f"User B Signup: {resp_b.status_code}")
        print(f"User B Response: {resp_b.json()}")

        if resp_b.status_code == 200:
            print("Fix Verified: User B signed up successfully")
        else:
            print(f"Fix Failed: User B signup failed with {resp_b.status_code}")
            print(resp_b.json())

if __name__ == "__main__":
    test_empty_string_collision()
