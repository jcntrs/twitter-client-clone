import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { map } from 'lodash';
import routingConfig from './routingConfig';

const Routing = () => {
    return (
        <Router>
            <Switch>
                {map(routingConfig, (route, idx) => (
                    <Route key={idx} path={route.path} exact={route.exact}>
                        <route.page />
                    </Route>
                )
                    /* {
                        // Ejecutar lógica
                        return (
                            <Route key={idx} path={route.path} exact={route.exact}>
                                <route.page />
                            </Route>
                        )
                    } */
                )}
            </Switch>
        </Router>
    );
}

export default Routing;