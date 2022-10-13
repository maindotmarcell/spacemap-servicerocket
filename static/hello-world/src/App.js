import React, { useEffect, useState } from 'react';
import Data from './data/Data';
import Tree from './components/Tree';
import './App.css';
import LayoutFlow from './components/Dagre';
import TitleForm from './components/TitleForm';
import MoveForm from './components/MoveForm';
import { PageProvider } from './PageContext';

function App() {
	return (
		<div className="App">
			<PageProvider>
				<TitleForm />
				<MoveForm />
				<LayoutFlow />
			</PageProvider>
		</div>
	);
}

export default App;
