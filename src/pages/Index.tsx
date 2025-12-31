import React, { useState } from 'react';
import { Zap, Leaf, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageUploader from '@/components/ImageUploader';
import NutritionResults from '@/components/NutritionResults';
import { useToast } from '@/hooks/use-toast';

interface FoodItem {
  name: string;
  quantity: number | string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  foodItems: FoodItem[];
}

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const analyzeImage = async (file: File, preview: string) => {
    setSelectedImage(preview);
    setIsAnalyzing(true);
    setNutritionData(null);

    try {
      // Convert file to base64 for webhook
      const base64 = preview.split(',')[1];
      
      const response = await fetch('https://yush01.app.n8n.cloud/webhook/meal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64 }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const data = await response.json();
      
      // Parse the n8n response format (handles both array and object)
      const result = Array.isArray(data) ? data[0] : data;
      const output = result.output;
      
      if (output?.food && output?.total) {
        setNutritionData({
          calories: output.total.calories,
          protein: output.total.protein,
          carbs: output.total.carbs,
          fat: output.total.fat,
          foodItems: output.food,
        });
        
        toast({
          title: "Analysis Complete!",
          description: `Detected ${output.food.length} food items in your meal.`,
        });
      } else {
        throw new Error('Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Could not analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setNutritionData(null);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen gradient-hero">
      {/* Hero Section */}
      <header className="container pt-8 pb-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CalCount</span>
          </div>
        </nav>
      </header>

      <main className="container pb-16">
        {/* Hero Content */}
        <section className="py-12 md:py-20 text-center space-y-8">
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Zap className="w-4 h-4" />
              AI-Powered Nutrition Analysis
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground text-balance leading-tight">
              Know Your Macros
              <span className="block text-primary">In Seconds</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto text-balance">
              Snap a photo of your meal and instantly get accurate protein, carbs, and fat breakdowns powered by AI.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: <Target className="w-4 h-4" />, text: "Accurate Analysis" },
              { icon: <Zap className="w-4 h-4" />, text: "Instant Results" },
              { icon: <Leaf className="w-4 h-4" />, text: "Any Meal Type" },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground"
              >
                {feature.icon}
                {feature.text}
              </div>
            ))}
          </div>
        </section>

        {/* Upload Section */}
        <section className="py-8 space-y-8">
          {!nutritionData ? (
            <ImageUploader onImageSelect={analyzeImage} isLoading={isAnalyzing} />
          ) : (
            <div className="space-y-6">
              {selectedImage && (
                <div className="w-full max-w-md mx-auto">
                  <img 
                    src={selectedImage} 
                    alt="Analyzed meal" 
                    className="w-full h-48 object-cover rounded-2xl shadow-md"
                  />
                </div>
              )}
              <NutritionResults data={nutritionData} />
              <div className="flex justify-center">
                <Button onClick={resetAnalysis} variant="outline" size="lg" className="gap-2">
                  Analyze Another Meal
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </section>

        {/* How it Works */}
        <section className="py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Upload Photo",
                description: "Take or upload a photo of your meal",
              },
              {
                step: "2", 
                title: "AI Analyzes",
                description: "Our AI identifies foods and calculates nutrition",
              },
              {
                step: "3",
                title: "Get Results",
                description: "See detailed macro breakdown instantly",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl bg-card border border-border text-center space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container py-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 CalCount. Powered by AI for accurate nutrition tracking.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
