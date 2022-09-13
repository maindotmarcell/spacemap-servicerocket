import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import Data from './components/Data';

function App() {
	const [data, setData] = useState(null);

	useEffect(() => {
		invoke('getText').then(setData);
	}, []);

	return (
		<div>
			{data ? data : 'Loading...'}
			<Data />
		</div>
	);
}

export default App;
