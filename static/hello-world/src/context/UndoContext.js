import { invoke } from '@forge/bridge';
import React, { createContext, useState } from 'react';

const UndoContext = createContext();

export function UndoProvider({ children }) {
	const [eventList, setEventList] = useState([]);
	// const { startLoading, stopLoading } = useContext(LoadingContext);
	// const { refreshPages } = useContext(PageContext);

	const addTitleChange = (id, prevTitle, version) => {
		const type = 'TC';
		setEventList((current) => [
			...current,
			{
				type,
				id,
				prevTitle,
				version,
			},
		]);
	};

	const addPageMove = (id, prevParent) => {
		const type = 'PM';
		setEventList((current) => [
			...current,
			{
				type,
				id,
				prevParent,
			},
		]);
	};

	const undo = async () => {
		const event = eventList[eventList.length - 1];
		if (event.type === 'TC') {
			console.log(
				`ID: ${event.id}, Old Title: ${event.prevTitle}, Version Number: ${event.version}`
			);
			try {
				const response = await invoke('changeTitle', {
					pageID: event.id,
					newTitle: event.prevTitle,
					version: event.version + 1,
				});
                console.log(response);
			} catch (err) {
				console.log(err);
			}
		} else if (event.type === 'PM') {
			console.log(`ID: ${event.id}, Old parent: ${event.prevParent}`);
			try {
				await invoke('movePage', {
					pageID: event.id,
					targetID: event.prevParent,
				});
			} catch (err) {
				console.log(err);
			}
		}
		setEventList((current) => current.slice(0, current.length - 1));
	};

	return (
		<UndoContext.Provider
			value={{ eventList, addTitleChange, addPageMove, undo }}
		>
			{children}
		</UndoContext.Provider>
	);
}

export default UndoContext;
