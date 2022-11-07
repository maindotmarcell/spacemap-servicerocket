import React from 'react';
import './App.css';
import LayoutFlow from './components/Tree';
import { PageProvider } from './context/PageContext';
import { LoadingProvider } from './context/LoadingContext';
import { ReactFlowProvider } from 'react-flow-renderer';
import { UndoProvider } from './context/UndoContext';
import { LabelProvider } from './context/LabelContext';
import { ErrorProvider } from './context/ErrorContext';

function App() {
	return (
		<div className="App">
			<ReactFlowProvider>
				<ErrorProvider>
					<LoadingProvider>
						<PageProvider>
							<LabelProvider>
								<UndoProvider>
									<LayoutFlow />
								</UndoProvider>
							</LabelProvider>
						</PageProvider>
					</LoadingProvider>
				</ErrorProvider>
			</ReactFlowProvider>
		</div>
	);
}

export default App;
