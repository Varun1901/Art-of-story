import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ImageUpload } from "@/components/ImageUpload";
import { GenreSelector } from "@/components/GenreSelector";
import { StoryDisplay } from "@/components/StoryDisplay";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/lib/api";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [generatedStory, setGeneratedStory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean | null>(null);
  const [uploadedFilename, setUploadedFilename] = useState<string>("");
  const { toast } = useToast();

  // Check backend connection on component mount
  useEffect(() => {
    const checkBackend = async () => {
      const isConnected = await apiService.healthCheck();
      setIsBackendConnected(isConnected);
      
      if (!isConnected) {
        toast({
          title: "Backend Connection Failed",
          description: "Unable to connect to the backend server. Please ensure the backend is running on http://localhost:8000",
          variant: "destructive",
        });
      }
    };
    
    checkBackend();
  }, [toast]);

  const generateStory = async () => {
    if (!selectedImage || !selectedGenre) {
      toast({
        title: "Missing Information",
        description: "Please upload an image and select a genre first.",
        variant: "destructive",
      });
      return;
    }

    if (!isBackendConnected) {
      toast({
        title: "Backend Not Connected",
        description: "Please ensure the backend server is running on http://localhost:8000",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Show upload progress
      toast({
        title: "Uploading Image...",
        description: "Please wait while we upload your image.",
      });

      // First upload the image
      const uploadResponse = await apiService.uploadImage(selectedImage);
      setUploadedFilename(uploadResponse.filename);
      
      // Show generation progress
      toast({
        title: "Generating Story...",
        description: "AI is crafting your story. This may take 10-30 seconds.",
      });
      
      // Then generate the story with timeout
      const storyResponse = await Promise.race([
        apiService.generateStory(uploadResponse.filename, selectedGenre),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Story generation timed out. Please try again.")), 60000)
        )
      ]);
      
      setGeneratedStory(storyResponse.story);
      
      toast({
        title: "Story Generated!",
        description: "Your magical tale is ready to read.",
      });
    } catch (error) {
      console.error('Error generating story:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate story. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateStory = () => {
    setGeneratedStory("");
    generateStory();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold bg-hero-gradient bg-clip-text text-transparent">
                Transform Images into Stories
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Upload any image and watch as AI crafts a captivating story based on what it sees. 
                Choose your favorite genre and let the magic begin.
              </p>
              
              {/* Backend Connection Status */}
              {isBackendConnected !== null && (
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                  isBackendConnected 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    isBackendConnected ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  {isBackendConnected ? 'Backend Connected' : 'Backend Disconnected'}
                </div>
              )}
            </div>

            {/* Upload and Generation Section */}
            <Card className="p-8 shadow-card">
              <div className="space-y-8">
                {/* Image Upload */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Step 1: Upload Your Image</h3>
                  <ImageUpload 
                    onImageSelect={setSelectedImage} 
                    selectedImage={selectedImage}
                  />
                </div>

                {/* Genre Selection */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Step 2: Choose Your Genre</h3>
                  <GenreSelector 
                    selectedGenre={selectedGenre}
                    onGenreSelect={setSelectedGenre}
                  />
                </div>

                {/* Generate Button */}
                <div className="text-center">
                  <Button 
                    onClick={generateStory}
                    disabled={!selectedImage || !selectedGenre || isLoading}
                    size="lg"
                    className="bg-story-gradient hover:opacity-90 text-white font-semibold px-8 py-6 text-lg"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    {isLoading ? "Generating Story..." : "Generate Story"}
                  </Button>
                  
                  {isLoading && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        This may take 10-30 seconds depending on image complexity
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div className="bg-story-gradient h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Story Display */}
            {(isLoading || generatedStory) && (
              <StoryDisplay 
                story={generatedStory}
                isLoading={isLoading}
                onRegenerate={regenerateStory}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
