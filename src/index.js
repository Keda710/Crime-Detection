// // index.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Auth0Provider } from '@auth0/auth0-react';
// import App from './App';


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,

//     <Auth0Provider>
//         domain="dev-ugcy8h7b7dgyf1mv.us.auth0.com"
//         clientId="xFNvX3cG014FWyssYyvQMhH6JclORZQX"
//         authorizationParams={{
//           redirect_uri: window.location.origin
//         }}
//             <App />
        

//     </Auth0Provider>,


//   document.getElementById('root')
// );



import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-ugcy8h7b7dgyf1mv.us.auth0.com"
    clientId="xFNvX3cG014FWyssYyvQMhH6JclORZQX"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);