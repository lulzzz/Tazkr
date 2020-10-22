import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import AppContext from './components/AppContext';
import { SignalRHub } from './components/SignalRHub';
import Home from './components/Home';
import BoardsView from './components/views/BoardsView';
import BoardView from './components/views/BoardView';
import TestView from './components/views/TestView';

import './custom.css'
const signalRHub = new SignalRHub();
export default () => {
 
  return (
    <AppContext.Provider value={{signalRHub}}>
      <Layout>
        <AuthorizeRoute exact path='/' component={Home} />
        <AuthorizeRoute exact path='/boards' component={BoardsView} />
        <AuthorizeRoute exact path='/board/:hubGroupId' component={BoardView} />
        <AuthorizeRoute exact path='/testview' component={TestView} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    </AppContext.Provider>
  );
}

