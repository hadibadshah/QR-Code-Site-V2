import React from 'react';

interface AdsterraBannerProps {
  id: string;
}

export const AdsterraBanner: React.FC<AdsterraBannerProps> = ({ id }) => {
  // We use srcDoc to load the Adsterra 728x90 banner ad in an isolated sandbox iframe.
  // This is highly robust: it prevents script errors/ad blockers from bubbling up 
  // to the main thread and ensures consistent, clean ad delivery without disrupting React state.
  const adHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 728px;
            height: 90px;
            overflow: hidden;
            background: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : '1c8dc405f9c7742577caf0fe679c65e1',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/1c8dc405f9c7742577caf0fe679c65e1/invoke.js"></script>
      </body>
    </html>
  `.trim();

  return (
    <div 
      className="w-full flex justify-center items-center overflow-hidden my-6" 
      style={{ minHeight: '90px' }}
      id={`adsterra-container-${id}`}
    >
      <iframe
        title={`adsterra-ad-${id}`}
        srcDoc={adHtml}
        width="728"
        height="90"
        scrolling="no"
        frameBorder="0"
        style={{ border: 'none', overflow: 'hidden' }}
      />
    </div>
  );
};
