import { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';

function useSpace() {
	const [spaceList, setSpaceList] = useState([]);
	useEffect(() => {
		invoke('getSpaces')
			.then((spaces) => setSpaceList(spaces))
			.catch((err) => console.log(err));
	}, []);
	return {
		spaceList,
	};
}

export { useSpace };
