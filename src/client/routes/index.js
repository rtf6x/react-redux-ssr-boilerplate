import App from 'wrappers/app';
import Index from 'pages/index';

const routes = [
  {
    component: App,
    routes: [
      {
        exact: true,
        path: '/',
        component: Index,
      },
    ],
  },
];

export default routes;
