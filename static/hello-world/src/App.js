import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import Data from './components/Data';
import Tree from './components/Tree';
import './App.css';

function App() {
	const [data, setData] = useState(null);

	useEffect(() => {
		invoke('getText').then(setData);
	}, []);

	return (
		<div className="App">
			{/* {data ? data : 'Loading...'} */}
			<Data />
			<Tree />
		</div>
	);
}

export default App;
