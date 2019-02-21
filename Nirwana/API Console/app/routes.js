import React from 'react';
import Loadable from 'react-loadable'


function Loading() {
  return <div>Loading...</div>;
}



const ConfigPage = Loadable({
  loader: () => import('./containers/ConfigPage'),
  loading: Loading,
});


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/app/pms/:pmsId/config/:psId', exact: true, name: 'Configure', component: ConfigPage },
];

export default routes;
