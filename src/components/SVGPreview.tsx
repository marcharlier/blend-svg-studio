import React from 'react';
import { Download, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface SVGPreviewProps {
  imageData?: string;
  imageDimensions?: { width: number; height: number };
  color: string;
  showColorLayer: boolean;
  showOverlayLayer: boolean;
  colorLayerIntensity: number;
  overlayLayerIntensity: number;
  onDownload: () => void;
  onToggleColorLayer: () => void;
  onToggleOverlayLayer: () => void;
  onColorLayerIntensityChange: (value: number) => void;
  onOverlayLayerIntensityChange: (value: number) => void;
}

export const SVGPreview: React.FC<SVGPreviewProps> = ({
  imageData,
  imageDimensions,
  color,
  showColorLayer,
  showOverlayLayer,
  colorLayerIntensity,
  overlayLayerIntensity,
  onDownload,
  onToggleColorLayer,
  onToggleOverlayLayer,
  onColorLayerIntensityChange,
  onOverlayLayerIntensityChange,
}) => {
  const generateSVG = () => {
    if (!imageData || !imageDimensions) return null;

    const { width, height } = imageDimensions;

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="auto">
        <defs>
          <image width="${width}" height="${height}" id="bitmap" href="${imageData}"></image>
          <mask id="embroidery-mask" maskUnits="userSpaceOnUse" mask-type="alpha">
            <use href="#bitmap" />
          </mask>
        </defs>
        
        <use href="#bitmap"/>
        ${showColorLayer ? `<rect id="rect" width="100%" height="100%" fill="${color}" style="mix-blend-mode: color;" mask="url(#embroidery-mask)" fill-opacity="${colorLayerIntensity}"/>` : ''}
        ${showOverlayLayer ? `<rect id="rect2" width="100%" height="100%" fill="${color}" style="mix-blend-mode: overlay;" fill-opacity="${overlayLayerIntensity}" mask="url(#embroidery-mask)"/>` : ''}
      </svg>
    `.trim();
  };

  const svgContent = generateSVG();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Preview</h2>
        <Button
          onClick={onDownload}
          disabled={!imageData}
          className="bg-primary hover:bg-primary/90"
        >
          <Download className="h-4 w-4 mr-2" />
          Download SVG
        </Button>
      </div>

      <div className="bg-preview border border-preview-border rounded-lg p-6 min-h-[300px] flex items-center justify-center">
        {imageData && svgContent ? (
          <div
            className="max-w-full max-h-[400px] rounded border border-preview-border bg-background/5"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <div className="text-center text-muted-foreground">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted/20 rounded-full flex items-center justify-center">
              <Eye className="h-8 w-8" />
            </div>
            <p className="text-lg font-medium">No preview available</p>
            <p className="text-sm">Upload an image to see the blend preview</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div
          className={`
            p-4 border rounded-lg transition-all duration-200 text-left
            ${showColorLayer 
              ? 'border-primary/50 bg-primary/5' 
              : 'border-control-border bg-control'
            }
          `}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Color Layer</span>
            <Button
              variant="outline"
              size="icon"
              onClick={onToggleColorLayer}
              className="h-6 w-6"
            >
              {showColorLayer ? (
                <Eye className="h-3 w-3" />
              ) : (
                <EyeOff className="h-3 w-3" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            Applies hue & saturation while preserving brightness
          </p>
          <p className="text-xs text-primary/70 mb-3">
            mix-blend-mode: color
          </p>
          {showColorLayer && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Intensity</span>
                <span className="text-xs text-primary font-mono">{Math.round(colorLayerIntensity * 100)}%</span>
              </div>
              <Slider
                value={[colorLayerIntensity]}
                onValueChange={(value) => onColorLayerIntensityChange(value[0])}
                min={0}
                max={1}
                step={0.01}
                className="w-full"
              />
            </div>
          )}
        </div>

        <div
          className={`
            p-4 border rounded-lg transition-all duration-200 text-left
            ${showOverlayLayer 
              ? 'border-primary/50 bg-primary/5' 
              : 'border-control-border bg-control'
            }
          `}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overlay Layer</span>
            <Button
              variant="outline"  
              size="icon"
              onClick={onToggleOverlayLayer}
              className="h-6 w-6"
            >
              {showOverlayLayer ? (
                <Eye className="h-3 w-3" />
              ) : (
                <EyeOff className="h-3 w-3" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            Remaps brightness - darkens dark areas, lightens light areas
          </p>
          <p className="text-xs text-primary/70 mb-3">
            mix-blend-mode: overlay
          </p>
          {showOverlayLayer && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Intensity</span>
                <span className="text-xs text-primary font-mono">{Math.round(overlayLayerIntensity * 100)}%</span>
              </div>
              <Slider
                value={[overlayLayerIntensity]}
                onValueChange={(value) => onOverlayLayerIntensityChange(value[0])}
                min={0}
                max={1}
                step={0.01}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};