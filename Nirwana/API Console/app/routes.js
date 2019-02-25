import React from 'react';
import Loadable from 'react-loadable'


function Loading() {
  return <div>Loading...</div>;
}

const ICODashboard = Loadable({
  loader: () => import('./containers/ICODashboard'),
  loading: Loading,
});

const WalletPage = Loadable({
  loader: () => import('./containers/Wallet'),
  loading: Loading,
});


const SendAndRecieve = Loadable({
  loader: () => import('./containers/Send'),
  loading: Loading,
});

const Deploy = Loadable({
  loader: () => import('./containers/Deploy'),
  loading: Loading,
});


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/app/nirvana-console', exact: true,  name: 'ICO Dashboard', component: ICODashboard },
  { path: '/app/wallet', exact: true,  name: 'Wallet', component: WalletPage },
  { path: '/app/send', exact: true, name: 'Send and Recieve', component: SendAndRecieve },
  { path: '/app/deploy-contracts', exact: true, name: 'Deploy Contracts', component: Deploy },
];

export default routes;
