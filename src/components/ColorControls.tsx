import React from 'react';
import { Palette, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ColorControlsProps {
  color: string;
  onColorChange: (color: string) => void;
  showColorLayer: boolean;
  showOverlayLayer: boolean;
  onToggleColorLayer: () => void;
  onToggleOverlayLayer: () => void;
}

export const ColorControls: React.FC<ColorControlsProps> = ({
  color,
  onColorChange,
  showColorLayer,
  showOverlayLayer,
  onToggleColorLayer,
  onToggleOverlayLayer,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Controls</h2>
        
        <div className="space-y-4">
          {/* Color Picker */}
          <div className="bg-control border border-control-border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Palette className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Blend Color</h3>
                <p className="text-sm text-muted-foreground">Choose the color for both layers</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div
                className="w-12 h-12 rounded-lg border-2 border-control-border relative overflow-hidden"
                style={{ backgroundColor: color }}
              >
                <input
                  type="color"
                  value={color}
                  onChange={(e) => onColorChange(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => onColorChange(e.target.value)}
                    className="bg-background border border-input rounded px-3 py-2 text-sm font-mono flex-1"
                    placeholder="#000000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Color Presets */}
          <div className="bg-control border border-control-border rounded-lg p-4">
            <h3 className="font-medium mb-3">Quick Colors</h3>
            <div className="grid grid-cols-6 gap-2">
              {[
                '#ff0077', '#00ff77', '#7700ff', '#ff7700',
                '#0077ff', '#ff0000', '#00ff00', '#0000ff',
                '#ffff00', '#ff00ff', '#00ffff', '#808080',
                '#000000', '#ffffff'
              ].map((presetColor) => (
                <button
                  key={presetColor}
                  onClick={() => onColorChange(presetColor)}
                  className={`
                    w-8 h-8 rounded border-2 transition-all duration-200 hover:scale-110
                    ${color === presetColor ? 'border-primary shadow-glow' : 'border-control-border'}
                  `}
                  style={{ backgroundColor: presetColor }}
                  title={presetColor}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};