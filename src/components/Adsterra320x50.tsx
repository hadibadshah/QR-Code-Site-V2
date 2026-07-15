import React from 'react';

interface Adsterra320x50Props {
  id: string;
}

export const Adsterra320x50: React.FC<Adsterra320x50Props> = ({ id }) => {
  const adHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 320px;
            height: 50px;
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
            'key' : '3021690b027b63131950c55585b3e871',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/3021690b027b63131950c55585b3e871/invoke.js"></script>
      </body>
    </html>
  `.trim();

  return (
    <div 
      className="flex justify-center items-center overflow-hidden" 
      style={{ minWidth: '320px', minHeight: '50px' }}
      id={`adsterra-320-container-${id}`}
    >
      <iframe
        title={`adsterra-320-ad-${id}`}
        srcDoc={adHtml}
        width="320"
        height="50"
        scrolling="no"
        frameBorder="0"
        style={{ border: 'none', overflow: 'hidden' }}
      />
    </div>
  );
};
