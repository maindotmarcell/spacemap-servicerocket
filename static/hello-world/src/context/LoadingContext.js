import React, { createContext, useState } from 'react';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
	const [isLoading, setIsLoading] = useState();

	const startLoading = () => {
		setIsLoading(true);
	};

	const stopLoading = () => {
		setIsLoading(false);
	};

	return (
		<LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
			{children}
		</LoadingContext.Provider>
	);
}

export default LoadingContext;
