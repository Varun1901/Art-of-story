import { Card } from "@/components/ui/card";
import { Lightbulb, Palette, Camera, FileText } from "lucide-react";

const tips = [
  {
    icon: Camera,
    title: "Choose Clear Images",
    description: "High-quality, well-lit photos work best for story generation"
  },
  {
    icon: Palette,
    title: "Rich Visual Details",
    description: "Images with interesting subjects, settings, or emotions create better stories"
  },
  {
    icon: FileText,
    title: "Genre Matching",
    description: "Pick genres that complement your image's mood and setting"
  }
];

const examples = [
  {
    genre: "Fantasy",
    example: "Medieval castles, forests, magical creatures"
  },
  {
    genre: "Sci-Fi",
    example: "Futuristic cities, space scenes, technology"
  },
  {
    genre: "Romance",
    example: "Couples, sunset scenes, intimate moments"
  },
  {
    genre: "Thriller",
    example: "Dark alleys, mysterious figures, dramatic lighting"
  }
];

export function Sidebar() {
  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-card">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-accent" />
          </div>
          <h3 className="font-semibold">Tips for Better Stories</h3>
        </div>
        
        <div className="space-y-4">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div key={index} className="flex space-x-3">
                <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">{tip.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tip.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-6 shadow-card">
        <h3 className="font-semibold mb-4">Genre Examples</h3>
        <div className="space-y-3">
          {examples.map((item, index) => (
            <div key={index} className="border-l-2 border-primary/30 pl-3">
              <h4 className="font-medium text-sm text-primary">{item.genre}</h4>
              <p className="text-xs text-muted-foreground">{item.example}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}