import React, { useContext, useState } from 'react';
import { invoke } from '@forge/bridge';
import PageContext from '../PageContext';

function TitleForm() {
	const [pageID, setPageID] = useState();
	const [newTitle, setNewTitle] = useState();
	const [version, setVersion] = useState();

	const {refreshPages} = useContext(PageContext);

	function changeTitle(event) {
		event.preventDefault();
		invoke('changeTitle', {
			pageID: pageID,
			newTitle: newTitle,
			version: (parseInt(version) + 1).toString(),
		})
			.then((data) => {
				console.log(data);
			})
			.catch((err) => console.log(err));
		refreshPages();
	}

	return (
		<div>
			<form onSubmit={changeTitle}>
				<input
					type="text"
					placeholder="Page ID"
					value={pageID}
					onChange={(e) => setPageID(e.target.value)}
				/>
				<input
					type="text"
					placeholder="New Title"
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Version Number"
					value={version}
					onChange={(e) => setVersion(e.target.value)}
				/>
				<input type="submit" value="submit" />
			</form>
		</div>
	);
}

export default TitleForm;
