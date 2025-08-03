#!/usr/bin/env python3
"""
Simple test script to verify the backend is working
"""

import requests
import json

def test_backend():
    base_url = "http://localhost:8000"
    
    print("Testing backend connection...")
    
    try:
        # Test health check
        response = requests.get(f"{base_url}/")
        if response.status_code == 200:
            print("✅ Backend is running!")
            print(f"Response: {response.json()}")
        else:
            print(f"❌ Backend health check failed: {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend. Make sure it's running on http://localhost:8000")
        return False
    except Exception as e:
        print(f"❌ Error testing backend: {e}")
        return False
    
    print("\nBackend is ready! You can now:")
    print("- Upload images at POST /upload-image")
    print("- Generate stories at POST /generate-story")
    print("- View API docs at http://localhost:8000/docs")
    
    return True

if __name__ == "__main__":
    test_backend() 