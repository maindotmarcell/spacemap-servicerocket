import React, { useContext, useState } from 'react';
import { invoke } from '@forge/bridge';
import PageContext from '../PageContext';

function MoveForm() {
	const [pageID, setPageID] = useState();
	const [targetID, setTargetID] = useState();

	const { refreshPages } = useContext(PageContext);

	function movePage(event) {
		event.preventDefault();
		invoke('movePage', {
			pageID: pageID,
			targetID: targetID,
		})
			.then((data) => {
				console.log(data);
			})
			.catch((err) => console.log(err));
		refreshPages();
	}

	return (
		<div>
			<form onSubmit={movePage}>
				<input
					type="text"
					placeholder="Page ID"
					value={pageID}
					onChange={(e) => setPageID(e.target.value)}
				/>
				<input
					type="text"
					placeholder="New Parent ID"
					value={targetID}
					onChange={(e) => setTargetID(e.target.value)}
				/>
				<input type="submit" value="submit" />
			</form>
		</div>
	);
}

export default MoveForm;
