import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/milligram.min.css";
// import { Button } from "milligram";
//theme provider provides a theme to all react components
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/styled-components/global';
import { theme } from './styles/styled-components/themes';
import { Burger, Menu } from './styles/styled-components/components/index';

// import UserLogin from "./components/auth/login.component";
import UserRegister from "./components/register.component";
// import UserDashboard from "./components/dashboard.component";

function App() {
	//create state that handles if the menu is activated
	const [open, setOpen] = useState(false)

    return (
	<Router>
		<ThemeProvider theme={theme}>
			<GlobalStyles />
				<Menu open={open} setOpen={setOpen}/>
					<Burger open={open} setOpen={setOpen}/>
						<Switch>
				  			<Route path="/register" component={UserRegister} />
				  		</Switch>
	  	</ThemeProvider>
  	</Router>
    );
}

export default App;