import React from 'react';
import { Info, Lightbulb, Target } from 'lucide-react';

export const BlendModeExplainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">How this tool uses blend modes</h2>
        
        <div className="space-y-4">
          {/* What this tool does */}
          <div className="bg-control border border-control-border rounded-lg p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">What this tool does</h3>
              </div>
            </div>
            
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                This tool lets you create an SVG that blends a bitmap with colour layers to make a 
                <strong className="text-foreground"> re-colourable SVG that contains some texture</strong>, 
                like embroidery patterns.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  The <strong className="text-foreground">texture layer needs to be a grayscale texture image</strong> 
                  - see below about Mid Gray for best results
                </li>
                <li>
                  There are <strong className="text-foreground">two colour layers that use different blend modes</strong> 
                  each - read below why it's these specific two modes
                </li>
                <li>
                  The result is a single SVG file that can be recolored by changing the fill values
                </li>
              </ul>
            </div>
          </div>

          {/* Main Explanation */}
          <div className="bg-control border border-control-border rounded-lg p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Info className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Why combining 'color' and 'overlay' works</h3>
              </div>
            </div>
            
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">'color'</strong> applies the hue and saturation of your chosen fill, 
                while keeping the brightness of the grayscale image.
              </p>
              <p>
                <strong className="text-foreground">'overlay'</strong> then remaps brightness: dark grays are darkened, 
                light grays are lightened, and exact mid gray shows the fill color unchanged.
              </p>
              <p className="text-foreground font-medium">
                Stacking the two gives the effect you want:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Black stays black</li>
                <li>White stays white</li>
                <li>Midtones become fully colored</li>
              </ul>
            </div>
          </div>

          {/* Mid Gray Explanation */}
          <div className="bg-control border border-control-border rounded-lg p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Target className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">The role of mid gray</h3>
              </div>
            </div>
            
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                In blend modes like overlay, <strong className="text-foreground">mid gray is the pivot point:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Lighter than mid gray → brightens the color</li>
                <li>Darker than mid gray → darkens the color</li>
                <li>Exactly mid gray → shows the pure fill color</li>
              </ul>
              
              <div className="mt-4 p-3 bg-background/50 rounded border border-control-border">
                <p className="font-medium text-foreground mb-2">Mid gray in digital values:</p>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-muted-foreground">RGB:</span>
                    <span className="text-foreground ml-2">128, 128, 128</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">HEX:</span>
                    <span className="text-foreground ml-2">#808080</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <div className="w-4 h-4 bg-[#808080] rounded border border-control-border"></div>
                  <span className="text-muted-foreground text-xs">Mid gray reference</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Lightbulb className="h-3 w-3 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-primary mb-1">Pro Tip</h4>
                <p className="text-sm text-foreground/80">
                  Use the layer toggles above to see how each blend mode affects your image individually. 
                  This helps understand the contribution of each layer to the final result.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};