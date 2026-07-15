import React, { useState, useEffect } from 'react';

interface AdsterraNativeProps {
  id: string;
}

export const AdsterraNative: React.FC<AdsterraNativeProps> = ({ id }) => {
  const [iframeHeight, setIframeHeight] = useState(160);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile layout: Stacked vertically, needs substantial space for 4 items
        setIframeHeight(1280);
      } else if (width < 1024) {
        // Tablet layout: 2x2 layout or wrapped layout
        setIframeHeight(680);
      } else {
        // Desktop layout: Horizontal line of 4 items
        setIframeHeight(280);
      }
    };

    // Run once on mount
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const adHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: auto;
            min-height: 100%;
            overflow: hidden;
            background: transparent;
          }
          #container-1f8917f609560790912707af682dc8df {
            width: 100%;
            height: auto;
            min-height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }
        </style>
      </head>
      <body>
        <script async="async" data-cfasync="false" src="https://pl30372030.effectivecpmnetwork.com/1f8917f609560790912707af682dc8df/invoke.js"></script>
        <div id="container-1f8917f609560790912707af682dc8df"></div>
      </body>
    </html>
  `.trim();

  return (
    <div 
      className="w-full overflow-hidden my-4 transition-all duration-300" 
      style={{ minHeight: `${iframeHeight}px` }}
      id={`adsterra-native-container-${id}`}
    >
      <iframe
        title={`adsterra-native-ad-${id}`}
        srcDoc={adHtml}
        width="100%"
        height={iframeHeight}
        scrolling="no"
        frameBorder="0"
        style={{ border: 'none', overflow: 'hidden', height: `${iframeHeight}px` }}
      />
    </div>
  );
};

