import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import { AddQ } from './components/AddQ';
import { ListQ } from './components/ListQ';
import { EditQ } from './components/EditQ';

const App = () => {
	return (
		<div className='App'>
			<Navbar />
			<Route path='/' exact component={AddQ} />
			<Route path='/listq' exact component={ListQ} />
			<Route path='/editques/:quesId' exact component={EditQ} />
		</div>
	);
};

export default App;
