import React from 'react';
import { Flame, Beef, Wheat, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FoodItem {
  name: string;
  quantity: number | string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MacroData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  foodItems: FoodItem[];
}

interface NutritionResultsProps {
  data: MacroData;
}

const MacroCard: React.FC<{
  label: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: 'calories' | 'protein' | 'carbs' | 'fat';
  percentage?: number;
  delay?: number;
}> = ({ label, value, unit, icon, color, percentage, delay = 0 }) => {
  const colorClasses = {
    calories: 'bg-calories/10 text-calories border-calories/20',
    protein: 'bg-protein/10 text-protein border-protein/20',
    carbs: 'bg-carbs/10 text-carbs border-carbs/20',
    fat: 'bg-fat/10 text-fat border-fat/20',
  };

  const progressColors = {
    calories: 'bg-calories',
    protein: 'bg-protein',
    carbs: 'bg-carbs',
    fat: 'bg-fat',
  };

  return (
    <div 
      className={cn(
        "p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] animate-slide-up",
        colorClasses[color]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={cn("p-2 rounded-xl", progressColors[color])}>
          <span className="text-primary-foreground">{icon}</span>
        </div>
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-3xl font-bold">{Math.round(value)}</span>
        <span className="text-sm font-medium text-muted-foreground">{unit}</span>
      </div>

      {percentage !== undefined && (
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div 
            className={cn("h-full rounded-full animate-progress-fill", progressColors[color])}
            style={{ width: `${Math.min(percentage, 100)}%`, animationDelay: `${delay + 200}ms` }}
          />
        </div>
      )}
    </div>
  );
};

const FoodItemRow: React.FC<{ item: FoodItem; index: number }> = ({ item, index }) => {
  return (
    <div 
      className="flex items-center justify-between py-3 border-b border-border last:border-0 animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex-1">
        <p className="font-medium text-foreground">{item.name}</p>
        <p className="text-sm text-muted-foreground">{item.quantity}</p>
      </div>
      <div className="flex gap-4 text-sm">
        <span className="text-calories font-medium">{item.calories} kcal</span>
        <span className="text-protein">{item.protein}g P</span>
        <span className="text-carbs">{item.carbs}g C</span>
        <span className="text-fat">{item.fat}g F</span>
      </div>
    </div>
  );
};

const NutritionResults: React.FC<NutritionResultsProps> = ({ data }) => {
  const totalMacros = data.protein + data.carbs + data.fat;
  
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-scale-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Nutrition Analysis</h2>
        <p className="text-muted-foreground">
          Found {data.foodItems.length} items in your meal
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <MacroCard
          label="Calories"
          value={data.calories}
          unit="kcal"
          icon={<Flame className="w-5 h-5" />}
          color="calories"
          percentage={(data.calories / 2000) * 100}
          delay={0}
        />
        <MacroCard
          label="Protein"
          value={data.protein}
          unit="g"
          icon={<Beef className="w-5 h-5" />}
          color="protein"
          percentage={totalMacros > 0 ? (data.protein / totalMacros) * 100 : 0}
          delay={100}
        />
        <MacroCard
          label="Carbs"
          value={data.carbs}
          unit="g"
          icon={<Wheat className="w-5 h-5" />}
          color="carbs"
          percentage={totalMacros > 0 ? (data.carbs / totalMacros) * 100 : 0}
          delay={200}
        />
        <MacroCard
          label="Fat"
          value={data.fat}
          unit="g"
          icon={<Droplets className="w-5 h-5" />}
          color="fat"
          percentage={totalMacros > 0 ? (data.fat / totalMacros) * 100 : 0}
          delay={300}
        />
      </div>

      {/* Food Items Breakdown */}
      <div className="p-4 rounded-2xl bg-card border border-border">
        <h3 className="font-semibold text-foreground mb-4">Food Breakdown</h3>
        <div className="divide-y divide-border">
          {data.foodItems.map((item, index) => (
            <FoodItemRow key={index} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* Macro Distribution */}
      <div className="p-4 rounded-2xl bg-secondary/50 border border-border">
        <h3 className="font-semibold text-foreground mb-3">Macro Distribution</h3>
        <div className="flex h-4 rounded-full overflow-hidden">
          {totalMacros > 0 && (
            <>
              <div 
                className="bg-protein transition-all duration-500"
                style={{ width: `${(data.protein / totalMacros) * 100}%` }}
              />
              <div 
                className="bg-carbs transition-all duration-500"
                style={{ width: `${(data.carbs / totalMacros) * 100}%` }}
              />
              <div 
                className="bg-fat transition-all duration-500"
                style={{ width: `${(data.fat / totalMacros) * 100}%` }}
              />
            </>
          )}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-protein" />
            Protein {totalMacros > 0 ? Math.round((data.protein / totalMacros) * 100) : 0}%
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-carbs" />
            Carbs {totalMacros > 0 ? Math.round((data.carbs / totalMacros) * 100) : 0}%
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-fat" />
            Fat {totalMacros > 0 ? Math.round((data.fat / totalMacros) * 100) : 0}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default NutritionResults;
