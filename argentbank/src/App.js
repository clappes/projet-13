import React from "react";

import Router from './components/Router/Router'
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import './styles/main.css'

function App() {

	return (
		<div className="App">
			<Header />
			<main>
				<Router />
			</main>
			<Footer />
		</div>
	);
}

export default App;
