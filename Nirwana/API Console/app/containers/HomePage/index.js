/**
 * LoginPage
 *
 * This is the page we show when the user visits login url
 */

import  React, { Component } from 'react'
import { Container } from 'reactstrap'
import { Redirect, Route, Switch } from 'react-router-dom'

import {
    AppAside,
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
} from '@coreui/react'
// sidebar nav config
import navigation from '../../nav'
// routes config
import routes from '../../routes'
import DefaultFooter from '../../components/DefaultFooter'
import DefaultHeader from '../../components/DefaultHeader'

class  HomePage extends Component {
   
    render() {
        return (
            <div className="app">
                <AppHeader fixed>
                    <DefaultHeader />
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        <AppSidebarNav navConfig={navigation} {...this.props} />
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                    <main className="main">
                        <AppBreadcrumb appRoutes={routes}/>
                        <Container fluid>
                            <Switch>
                                {routes.map((route, idx) => {
                                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                                        <route.component {...props} />
                                    )} />)
                                        : (null)
                                },
                                )}
                                <Redirect from="/app" to="/app/nirvana-console" />
                            </Switch>
                        </Container>
                    </main>
                </div>
                <AppFooter>
                    <DefaultFooter />
                </AppFooter>
            </div>
        )
    }
}


export default HomePage