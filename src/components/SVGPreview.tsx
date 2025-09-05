import React from 'react';
import { Download, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SVGPreviewProps {
  imageData?: string;
  color: string;
  showColorLayer: boolean;
  showOverlayLayer: boolean;
  onDownload: () => void;
}

export const SVGPreview: React.FC<SVGPreviewProps> = ({
  imageData,
  color,
  showColorLayer,
  showOverlayLayer,
  onDownload,
}) => {
  const generateSVG = () => {
    if (!imageData) return null;

    // Extract image dimensions from the loaded image
    const img = new Image();
    img.src = imageData;

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 163" width="100%" height="auto">
        <defs>
          <image width="350" height="163" id="bitmap" href="${imageData}"></image>
          <mask id="embroidery-mask" maskUnits="userSpaceOnUse" mask-type="alpha">
            <use href="#bitmap" />
          </mask>
        </defs>
        
        <use href="#bitmap"/>
        ${showColorLayer ? `<rect id="rect" width="100%" height="100%" fill="${color}" style="mix-blend-mode: color;" mask="url(#embroidery-mask)" fill-opacity="0.5"/>` : ''}
        ${showOverlayLayer ? `<rect id="rect2" width="100%" height="100%" fill="${color}" style="mix-blend-mode: overlay;" fill-opacity="1" mask="url(#embroidery-mask)"/>` : ''}
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
        <div className={`
          p-3 border rounded-lg transition-all duration-200
          ${showColorLayer 
            ? 'border-primary/50 bg-primary/5' 
            : 'border-control-border bg-control'
          }
        `}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Color Layer</span>
            {showColorLayer ? (
              <Eye className="h-4 w-4 text-primary" />
            ) : (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Applies hue & saturation
          </p>
        </div>

        <div className={`
          p-3 border rounded-lg transition-all duration-200
          ${showOverlayLayer 
            ? 'border-primary/50 bg-primary/5' 
            : 'border-control-border bg-control'
          }
        `}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overlay Layer</span>
            {showOverlayLayer ? (
              <Eye className="h-4 w-4 text-primary" />
            ) : (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Remaps brightness
          </p>
        </div>
      </div>
    </div>
  );
};