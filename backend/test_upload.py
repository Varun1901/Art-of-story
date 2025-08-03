import requests
import os

def test_upload_endpoint():
    """Test the upload endpoint with a sample image"""
    url = "http://localhost:8000/upload-image"
    
    # Check if backend is running
    try:
        response = requests.get("http://localhost:8000/")
        print("Backend is running:", response.json())
    except requests.exceptions.ConnectionError:
        print("ERROR: Backend is not running. Please start it with: uvicorn main:app --reload")
        return
    
    # Create a simple test image (1x1 pixel)
    test_image_path = "test_image.png"
    try:
        from PIL import Image
        img = Image.new('RGB', (1, 1), color='red')
        img.save(test_image_path)
        
        # Test upload
        with open(test_image_path, 'rb') as f:
            files = {'file': ('test_image.png', f, 'image/png')}
            data = {'genre': 'fantasy'}
            
            response = requests.post(url, files=files, data=data)
            
            if response.status_code == 200:
                print("✅ Upload test successful!")
                print("Response:", response.json())
            else:
                print("❌ Upload test failed!")
                print("Status code:", response.status_code)
                print("Response:", response.text)
                
    except Exception as e:
        print(f"❌ Test failed with error: {e}")
    finally:
        # Clean up test file
        if os.path.exists(test_image_path):
            os.remove(test_image_path)

if __name__ == "__main__":
    test_upload_endpoint() 