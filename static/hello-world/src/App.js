import React, { useEffect, useState } from 'react';
import './App.css';
import LayoutFlow from './components/Tree';
import { PageProvider } from './context/PageContext';
import { LoadingProvider } from './context/LoadingContext';

function App() {
	return (
		<div className="App">
			<LoadingProvider>
				<PageProvider>
					<LayoutFlow />
				</PageProvider>
			</LoadingProvider>
		</div>
	);
}

export default App;
