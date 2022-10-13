import React, { createContext, useState } from 'react';
import Pages from './data/Pages';

const PageContext = createContext();

export function PageProvider({ children }) {
	const [pages, setPages] = useState([]);

	const refreshPages = async () => {
		setPages(await Pages());
	};

	return (
		<PageContext.Provider value={{ pages, refreshPages }}>
			{children}
		</PageContext.Provider>
	);
}

export default PageContext;
