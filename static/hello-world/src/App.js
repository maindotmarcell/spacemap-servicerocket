import React, { useEffect, useState } from 'react';
import './App.css';
import LayoutFlow from './components/Tree';
import { PageProvider } from './context/PageContext';
import { LoadingProvider } from './context/LoadingContext';
import { ReactFlowProvider } from 'react-flow-renderer';
import { UndoProvider } from './context/UndoContext';

function App() {
	return (
		<div className="App">
			<ReactFlowProvider>
				<LoadingProvider>
					<PageProvider>
						<UndoProvider>
							<LayoutFlow />
						</UndoProvider>
					</PageProvider>
				</LoadingProvider>
			</ReactFlowProvider>
		</div>
	);
}

export default App;
