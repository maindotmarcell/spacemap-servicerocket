// import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';

async function Data() {
	// const [pages, setPages] = useState()
	console.log('hi');
	let pages = [];
	await invoke('getPages').then((pagesJSON) => {
		// console.log(pagesJSON);
		pages = pagesJSON;
		// console.log('pages are: ', pages);
		// setPages(pagesJSON);
	});
	return pages;
}

export default Data;
