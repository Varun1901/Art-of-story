const API_BASE_URL = 'http://localhost:8000';

export interface UploadResponse {
  message: string;
  filename: string;
}

export interface StoryResponse {
  message: string;
  genre: string;
  story: string;
}

export interface UserCreate {
  username: string;
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Upload image to backend
  async uploadImage(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseUrl}/upload-image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Generate story from uploaded image
  async generateStory(filename: string, genre: string): Promise<StoryResponse> {
    const formData = new FormData();
    formData.append('filename', filename);
    formData.append('genre', genre);

    const response = await fetch(`${this.baseUrl}/generate-story`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Story generation failed: ${response.statusText}`);
    }

    return response.json();
  }

  // User signup
  async signup(userData: UserCreate): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Signup failed: ${response.statusText}`);
    }

    return response.json();
  }

  // User login
  async login(userData: UserLogin): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Login failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Check if backend is running
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const apiService = new ApiService(); 