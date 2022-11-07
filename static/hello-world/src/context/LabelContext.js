import React, { createContext, useState } from 'react';

const LabelContext = createContext();

export const LabelProvider = ({ children }) => {
	const [activeLabel, setActiveLabel] = useState('');

	return (
		<LabelContext.Provider value={{ activeLabel, setActiveLabel }}>
			{children}
		</LabelContext.Provider>
	);
};

export default LabelContext;
