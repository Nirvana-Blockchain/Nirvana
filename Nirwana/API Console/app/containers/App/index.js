/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-redux-spinner';

import LoginPage from 'containers/LoginPage/Loadable'
import HomePage from 'containers/HomePage'


// import NotFoundPage from 'containers/NotFoundPage/Loadable';


export default function App() {
    return (
        <div>
            <Helmet
                titleTemplate="%s - Nirvana"
                defaultTitle="Nirvana"
            >
                <title>Home</title>
                <meta name="description" content="Nirvana" />
            </Helmet>
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <Route path="/app" render={() => (
                    sessionStorage.getItem('subId') ? (
                        <HomePage />                        
                    ) : (
                        <Redirect to="/login"/>
                    )
                 )} />
                {/* Define children routes of app in routes.js*/}
                <Route exact path="" component={LoginPage} />
            </Switch>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}                
                draggable
                pauseOnHover={false}
                />
            <Spinner />         

        </div>
    )
}
