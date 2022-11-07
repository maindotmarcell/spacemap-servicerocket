import React, { createContext, useState } from 'react';

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
	const [childMoveError, setChildMoveError] = useState(false);
	const [emptyTitleError, setEmptyTitleError] = useState(false);

	return (
		<ErrorContext.Provider
			value={{
				childMoveError,
				setChildMoveError,
				emptyTitleError,
				setEmptyTitleError,
			}}
		>
			{children}
		</ErrorContext.Provider>
	);
}

export default ErrorContext;
