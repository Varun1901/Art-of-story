import { useState } from "react";
import { Header } from "@/components/Header";
import { ImageUpload } from "@/components/ImageUpload";
import { GenreSelector } from "@/components/GenreSelector";
import { StoryDisplay } from "@/components/StoryDisplay";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [generatedStory, setGeneratedStory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateStory = async () => {
    if (!selectedImage || !selectedGenre) {
      toast({
        title: "Missing Information",
        description: "Please upload an image and select a genre first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI story generation
    setTimeout(() => {
      const sampleStory = `In the mystical realm of ${selectedGenre}, where shadows dance with light and dreams take tangible form, our story begins...

The ancient oak tree stood sentinel at the edge of the enchanted forest, its gnarled branches reaching toward the star-filled sky. Beneath its protective canopy, a young adventurer paused to catch their breath, heart racing from the journey through the moonlit wilderness.

The silver pendant around their neck began to glow with an otherworldly light, responding to the magical energies that pulsed through this sacred place. Legend spoke of such moments – when destiny calls and ordinary souls are chosen for extraordinary purposes.

As the wind whispered secrets through the leaves above, the adventurer felt the weight of an ancient prophecy settling upon their shoulders. The time had come to embrace their true calling and step into a world where magic was as real as the ground beneath their feet.

With renewed determination, they adjusted their pack and continued deeper into the forest, knowing that whatever lay ahead would test not only their courage but the very essence of who they were meant to become.

The journey of a lifetime was just beginning, and with each step forward, the boundary between the mundane and the magical grew ever thinner, until they disappeared entirely into the realm of infinite possibilities.`;
      
      setGeneratedStory(sampleStory);
      setIsLoading(false);
      
      toast({
        title: "Story Generated!",
        description: "Your magical tale is ready to read.",
      });
    }, 3000);
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
