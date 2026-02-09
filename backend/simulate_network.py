import requests
import sys
import time
import random
import string

def get_random_string(length):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))

def simulate_frontend_signup():
    base_url = "http://localhost:8000"
    
    # 1. Check Health
    print(f"Checking health at {base_url}/health...")
    try:
        resp = requests.get(f"{base_url}/health", timeout=2)
        print(f"Health Status: {resp.status_code}")
        if resp.status_code != 200:
            print("Server is not healthy.")
            sys.exit(1)
        print("Server is healthy.")
    except Exception as e:
        print(f"Failed to connect to backend: {e}")
        print("Is the backend server running on port 8000?")
        sys.exit(1)

    # 2. Signup
    username = f"sim_user_{get_random_string(5)}"
    payload = {
        "username": username,
        "password": "password123",
        "email": "",
        "phone": ""
    }
    
    print(f"\nAttempting signup for user: {username}")
    print(f"Payload: {payload}")
    
    try:
        resp = requests.post(f"{base_url}/signup", json=payload, headers={"Content-Type": "application/json"})
        print(f"Signup Response Code: {resp.status_code}")
        print(f"Signup Response Body: {resp.json()}")
        
        if resp.status_code == 200:
            print("SUCCESS: Signup worked over network.")
        else:
            print("FAILURE: Signup failed.")
            
    except Exception as e:
        print(f"Signup request failed: {e}")

if __name__ == "__main__":
    simulate_frontend_signup()
