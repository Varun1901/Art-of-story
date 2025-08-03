#!/usr/bin/env python3
"""
Script to help set up the Gemini API key
"""

import os
from pathlib import Path

def setup_gemini_key():
    print("🔑 Gemini API Key Setup")
    print("=" * 40)
    print()
    print("To use the story generation feature, you need a Gemini API key.")
    print("Follow these steps:")
    print()
    print("1. Go to: https://makersuite.google.com/app/apikey")
    print("2. Sign in with your Google account")
    print("3. Click 'Create API Key'")
    print("4. Copy the generated API key")
    print()
    
    api_key = input("Enter your Gemini API key: ").strip()
    
    if not api_key:
        print("❌ No API key provided. Setup cancelled.")
        return False
    
    # Create .env file in backend directory
    backend_dir = Path("backend")
    env_file = backend_dir / ".env"
    
    # Create backend directory if it doesn't exist
    backend_dir.mkdir(exist_ok=True)
    
    # Write the API key to .env file
    with open(env_file, "w") as f:
        f.write(f"GEMINI_API_KEY={api_key}\n")
    
    print(f"✅ API key saved to {env_file}")
    print()
    print("🎉 Setup complete! You can now generate stories.")
    print("Restart the backend server for changes to take effect.")
    
    return True

if __name__ == "__main__":
    setup_gemini_key() 