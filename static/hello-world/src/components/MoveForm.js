import React, { useState } from 'react';
import { invoke } from '@forge/bridge';

function MoveForm() {
	const [pageID, setPageID] = useState();
	const [targetID, setTargetID] = useState();

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
