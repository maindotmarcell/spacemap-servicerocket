// import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';

async function Data(space) {
	// const [pages, setPages] = useState()
	let pages = [];
	await invoke('getPages', { space }).then((pagesJSON) => {
		pages = pagesJSON;
	});
	return pages;
}

export default Data;
