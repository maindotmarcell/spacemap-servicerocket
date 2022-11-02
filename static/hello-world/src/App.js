import React, { useEffect, useState } from 'react';
import './App.css';
import LayoutFlow from './components/Tree';
import { PageProvider } from './context/PageContext';
import { LoadingProvider } from './context/LoadingContext';
import { ReactFlowProvider } from 'react-flow-renderer';

function App() {
	return (
		<div className="App">
			<ReactFlowProvider>
				<LoadingProvider>
					<PageProvider>
						<LayoutFlow />
					</PageProvider>
				</LoadingProvider>
			</ReactFlowProvider>
		</div>
	);
}

export default App;
