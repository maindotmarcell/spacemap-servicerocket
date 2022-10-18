import React, { useEffect, useState } from 'react';
import './App.css';
import LayoutFlow from './components/Tree';
import { PageProvider } from './context/PageContext';

function App() {
	return (
		<div className="App">
			<PageProvider>
				<LayoutFlow />
			</PageProvider>
		</div>
	);
}

export default App;
