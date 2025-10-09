import React, { useState } from 'react';
import { UploadArea } from '@/components/UploadArea';
import { SVGPreview } from '@/components/SVGPreview';
import { ColorControls } from '@/components/ColorControls';
import { BlendModeExplainer } from '@/components/BlendModeExplainer';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [imageData, setImageData] = useState<string | undefined>();
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | undefined>();
  const [color, setColor] = useState('#ff0077');
  const [showColorLayer, setShowColorLayer] = useState(true);
  const [showOverlayLayer, setShowOverlayLayer] = useState(true);
  const [colorLayerIntensity, setColorLayerIntensity] = useState(0.5);
  const [overlayLayerIntensity, setOverlayLayerIntensity] = useState(1.0);
  const { toast } = useToast();

  const handleImageUpload = (file: File, data: string) => {
    // Load image to get actual dimensions
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
    img.src = data;
    
    setImageData(data);
    toast({
      title: "Image uploaded successfully",
      description: `${file.name} is ready for SVG generation`,
    });
  };

  const handleClearImage = () => {
    setImageData(undefined);
    setImageDimensions(undefined);
    toast({
      title: "Image cleared",
      description: "Upload a new image to continue",
    });
  };

  const handleDownload = () => {
    if (!imageData || !imageDimensions) return;

    const { width, height } = imageDimensions;
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
  <defs>
    <image width="${width}" height="${height}" id="bitmap" href="${imageData}"></image>
    <mask id="embroidery-mask" maskUnits="userSpaceOnUse" mask-type="alpha">
      <use href="#bitmap" />
    </mask>
  </defs>

  <use href="#bitmap"/>
  ${showColorLayer ? `<rect id="rect" width="100%" height="100%" fill="${color}" style="mix-blend-mode: color;" mask="url(#embroidery-mask)" fill-opacity="${colorLayerIntensity}"/>` : ''}
  ${showOverlayLayer ? `<rect id="rect2" width="100%" height="100%" fill="${color}" style="mix-blend-mode: overlay;" fill-opacity="${overlayLayerIntensity}" mask="url(#embroidery-mask)"/>` : ''}
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blended-svg-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "SVG downloaded",
      description: "Your blended SVG file has been saved",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                SVG Blend Studio
              </h1>
              <p className="text-sm text-muted-foreground">
                Create stunning SVGs with bitmap images and blend mode overlays
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload and Controls */}
          <div className="lg:col-span-1 space-y-8">
            <UploadArea
              onImageUpload={handleImageUpload}
              currentImage={imageData}
              onClearImage={handleClearImage}
            />
            
            <ColorControls
              color={color}
              onColorChange={setColor}
              showColorLayer={showColorLayer}
              showOverlayLayer={showOverlayLayer}
              onToggleColorLayer={() => setShowColorLayer(!showColorLayer)}
              onToggleOverlayLayer={() => setShowOverlayLayer(!showOverlayLayer)}
            />
          </div>

          {/* Middle Column - Preview */}
          <div className="lg:col-span-1">
            <SVGPreview
              imageData={imageData}
              imageDimensions={imageDimensions}
              color={color}
              showColorLayer={showColorLayer}
              showOverlayLayer={showOverlayLayer}
              colorLayerIntensity={colorLayerIntensity}
              overlayLayerIntensity={overlayLayerIntensity}
              onDownload={handleDownload}
              onToggleColorLayer={() => setShowColorLayer(!showColorLayer)}
              onToggleOverlayLayer={() => setShowOverlayLayer(!showOverlayLayer)}
              onColorLayerIntensityChange={setColorLayerIntensity}
              onOverlayLayerIntensityChange={setOverlayLayerIntensity}
            />
          </div>

          {/* Right Column - Explanation */}
          <div className="lg:col-span-1">
            <BlendModeExplainer />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              Built with React, TypeScript, and CSS blend modes • 
              <span className="text-primary ml-1">SVG Blend Studio</span>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;