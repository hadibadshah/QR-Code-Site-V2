import React from 'react';

interface Adsterra160x600Props {
  id: string;
}

export const Adsterra160x600: React.FC<Adsterra160x600Props> = ({ id }) => {
  const adHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 160px;
            height: 600px;
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
            'key' : '3f36335f0794b17bcb52d7cfb8eeb3df',
            'format' : 'iframe',
            'height' : 600,
            'width' : 160,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/3f36335f0794b17bcb52d7cfb8eeb3df/invoke.js"></script>
      </body>
    </html>
  `.trim();

  return (
    <div 
      className="flex justify-center items-center overflow-hidden" 
      style={{ minWidth: '160px', minHeight: '600px' }}
      id={`adsterra-160-container-${id}`}
    >
      <iframe
        title={`adsterra-160-ad-${id}`}
        srcDoc={adHtml}
        width="160"
        height="600"
        scrolling="no"
        frameBorder="0"
        style={{ border: 'none', overflow: 'hidden' }}
      />
    </div>
  );
};
