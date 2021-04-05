import React from 'react';

const Info: React.FC = () => (
  <div className="mt-2 space-y-4">
    <h3 className="text-2xl font-bold">
      Setup
    </h3>
    <div>
      To allow Chie access to Anki, first follow the instructions to install AnkiConnect
      <a className="text-blue-500 visited:text-purple-500" href="https://foosoft.net/projects/anki-connect/"> here.</a>
    </div>
    <div>
      After installing AnkiConnect, replace the AnkiConnect config with the following:
    </div>
    <div className="p-4 bg-gray-200">
      <div>&#123;</div>
      <div>&emsp;&quot;apiKey&quot;: null</div>
      <div>&emsp;&quot;apiLogPath&quot;: null</div>
      <div>&emsp;&quot;webBindAddress&quot;: &quot;127.0.0.1&quot;</div>
      <div>&emsp;&quot;webBindPort&quot;: 8765</div>
      <div>&emsp;&quot;webCorsOrigin&quot;: &quot;http://localhost&quot;</div>
      <div>&emsp;&quot;webCorsOriginList&quot;: [</div>
      <div>&emsp;&emsp;&quot;http://localhost&quot;</div>
      <div>&emsp;&emsp;&quot;http://localhost:3000&quot;</div>
      <div>&emsp;&emsp;&quot;https://brave-grass-06ab5cd1e.azurestaticapps.net&quot;</div>
      <div>&emsp;]</div>
      <div>&#125;</div>
    </div>
    <div>
      You can now add cards to Anki using this site.
      Make sure to keep Anki running in the background.
    </div>
  </div>
);

export default Info;
