#!/usr/bin/env python3
"""
Test script to verify database connectivity and table creation.
"""

from database import engine, SessionLocal
from models import Base, User
import os

def test_database():
    try:
        # Test database connection
        print("Testing database connection...")
        
        # Create tables
        Base.metadata.create_all(bind=engine)
        print("✓ Database tables created successfully")
        
        # Test session creation
        db = SessionLocal()
        try:
            # Test a simple query
            users = db.query(User).all()
            print(f"✓ Database session works. Found {len(users)} users")
        finally:
            db.close()
            
        print("✓ All database tests passed!")
        return True
        
    except Exception as e:
        print(f"✗ Database test failed: {str(e)}")
        print("\nMake sure you have:")
        print("1. MySQL server running")
        print("2. Created a database")
        print("3. Set up your .env file with database credentials")
        return False

if __name__ == "__main__":
    test_database() 