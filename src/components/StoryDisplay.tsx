import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, BookOpen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StoryDisplayProps {
  story: string;
  isLoading: boolean;
  onRegenerate: () => void;
}

export function StoryDisplay({ story, isLoading, onRegenerate }: StoryDisplayProps) {
  if (isLoading) {
    return (
      <Card className="p-8 shadow-card">
        <div className="flex flex-col items-center justify-center space-y-4 min-h-[300px]">
          <div className="w-16 h-16 bg-story-gradient rounded-full flex items-center justify-center animate-pulse">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Crafting Your Story...</h3>
            <p className="text-muted-foreground">AI is analyzing your image and creating a magical tale</p>
          </div>
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (!story) {
    return null;
  }

  const downloadStory = () => {
    const element = document.createElement("a");
    const file = new Blob([story], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "my-story.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-story-gradient rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold">Your Generated Story</h3>
              <p className="text-sm text-muted-foreground">
                {story.split(' ').length} words • {Math.ceil(story.length / 1000)} min read
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onRegenerate}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
            <Button variant="outline" size="sm" onClick={downloadStory}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>
      
      <ScrollArea className="h-[400px] p-6">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {story.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed text-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}