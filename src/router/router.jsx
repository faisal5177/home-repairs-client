import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './../layout/MainLayout/MainLayout';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import SignIn from '../pages/SignIn/SignIn';
import ServiceDetails from '../pages/ServiceDetails/ServiceDetails';
import PrivateRouter from './PrivateRouter';
import ServiceApply from '../pages/ServiceApply/ServiceApply';
import MyApplications from '../pages/MyApplications/MyApplications';
import AddService from '../pages/AddService/AddService';
import AllServices from '../pages/AllServices/AllServices';
import MyPostedServices from '../pages/MyPostedServices/MyPostedServices';
import ViewApplications from '../pages/ViewApplications/ViewApplications';
import EditService from '../pages/EditService/EditService';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <h2>Route not found</h2>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: 'services/:id',
        element: (
          <PrivateRouter>
            <ServiceDetails></ServiceDetails>
          </PrivateRouter>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/services/${params.id}`),
      },
      {
        path: 'serviceApply/:id',
        element: (
          <PrivateRouter>
            <ServiceApply></ServiceApply>
          </PrivateRouter>
        ),
      },
      {
        path: 'myApplications',
        element: (
          <PrivateRouter>
            <MyApplications></MyApplications>
          </PrivateRouter>
        ),
      },
      {
        path: 'addService',
        element: (
          <PrivateRouter>
            <AddService></AddService>
          </PrivateRouter>
        ),
      },
      {
        path: 'allServices',
        element: (
          <PrivateRouter>
            <AllServices></AllServices>
          </PrivateRouter>
        ),
      },
      {
        path: 'myPostedServices',
        element: (
          <PrivateRouter>
            <MyPostedServices></MyPostedServices>
          </PrivateRouter>
        ),
      },
      {
        path: 'viewApplications/:service_id',
        element: (
          <PrivateRouter>
            <ViewApplications />
          </PrivateRouter>
        ),
        loader: ({ params }) =>
          fetch(
            `http://localhost:3000/service-application/services/${params.service_id}`
          ),
      },
      {
        path: 'editService/:id',
        element: (
          <PrivateRouter>
            <EditService />
          </PrivateRouter>
        ),
      },

      {
        path: 'register',
        element: <Register></Register>,
      },
      {
        path: 'signIn',
        element: <SignIn></SignIn>,
      },
    ],
  },
]);

export default router;
