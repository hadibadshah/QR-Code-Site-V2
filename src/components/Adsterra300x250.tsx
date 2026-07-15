import React from 'react';

interface Adsterra300x250Props {
  id: string;
}

export const Adsterra300x250: React.FC<Adsterra300x250Props> = ({ id }) => {
  const adHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 300px;
            height: 250px;
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
            'key' : '9caebf1ba20f40f3c2b6d82bf12e6892',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/9caebf1ba20f40f3c2b6d82bf12e6892/invoke.js"></script>
      </body>
    </html>
  `.trim();

  return (
    <div 
      className="w-full flex justify-center lg:justify-start items-center overflow-hidden my-4 lg:my-2" 
      style={{ minHeight: '250px' }}
      id={`adsterra-300-container-${id}`}
    >
      <iframe
        title={`adsterra-300-ad-${id}`}
        srcDoc={adHtml}
        width="300"
        height="250"
        scrolling="no"
        frameBorder="0"
        style={{ border: 'none', overflow: 'hidden' }}
      />
    </div>
  );
};
