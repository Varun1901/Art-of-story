import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Sparkles, Rocket, Heart, Zap, Smile } from "lucide-react";

const genres = [
  { value: "fantasy", label: "Fantasy", icon: Sparkles, description: "Magical worlds and mythical creatures" },
  { value: "sci-fi", label: "Sci-Fi", icon: Rocket, description: "Future technology and space adventures" },
  { value: "romance", label: "Romance", icon: Heart, description: "Love stories and emotional journeys" },
  { value: "thriller", label: "Thriller", icon: Zap, description: "Suspense and edge-of-seat excitement" },
  { value: "comedy", label: "Comedy", icon: Smile, description: "Humor and lighthearted fun" },
];

interface GenreSelectorProps {
  selectedGenre: string;
  onGenreSelect: (genre: string) => void;
}

export function GenreSelector({ selectedGenre, onGenreSelect }: GenreSelectorProps) {
  const selectedGenreData = genres.find(g => g.value === selectedGenre);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Choose Your Story Genre
        </label>
        <Select value={selectedGenre} onValueChange={onGenreSelect}>
          <SelectTrigger className="w-full h-12">
            <SelectValue placeholder="Select a genre for your story..." />
          </SelectTrigger>
          <SelectContent>
            {genres.map((genre) => {
              const Icon = genre.icon;
              return (
                <SelectItem key={genre.value} value={genre.value} className="cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-medium">{genre.label}</div>
                      <div className="text-xs text-muted-foreground">{genre.description}</div>
                    </div>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {selectedGenreData && (
        <Card className="p-4 bg-secondary/50 border-primary/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <selectedGenreData.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">{selectedGenreData.label} Selected</h4>
              <p className="text-xs text-muted-foreground">{selectedGenreData.description}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}