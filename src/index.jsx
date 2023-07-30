import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  // createBrowserRouter,      // Роутер для Веб-проектов
  createHashRouter,      // Роутер для Github-Pages
  RouterProvider,           // Рендер данных из роутера
} from "react-router-dom";

import Root, { 
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/router_contact";

import EditContact, {
  action as editAction,
} from "./routes/router_edit";

import {
  action as destroyAction,
} from "./routes/router_destroy";

import Index from "./routes/router_index";
import ErrorPage from "./routes/error-page";
// import App from './App';

import './index.css';
import './css/router_tutorial.css'

// import reportWebVitals from './reportWebVitals';

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children:[
          { 
            index: true,  // Если нет остальных потомков,( в URL ничего нет после "/" )
            element: <Index /> 
          },
          {
            path: "contacts/:contactId",  // ":" - значит "Динамический контент"
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          }
        ]
      }],
  },
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
