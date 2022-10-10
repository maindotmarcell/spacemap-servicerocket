import React, { useState, useEffect } from 'react';
import { invoke } from '@forge/bridge';

function Form() {
	const [pageID, setPageID] = useState();
	const [newTitle, setNewTitle] = useState();

	function changeTitle(event) {
        event.preventDefault()
		invoke('changeTitle',{pageID: pageID, newTitle: newTitle})
			.then((data) => {
				// console.log(pagesJSON);
				// setPages(pagesJSON);
				console.log(data);
			})
			.catch((err) => console.log(err));
	}

    // useEffect(() => {
	// 	invoke('getText')
	// 		.then((data) => {
	// 			// console.log(pagesJSON);
	// 			// setPages(pagesJSON);
	// 			console.log(data);
	// 		})
	// 		.catch((err) => console.log(err));
    // },[])

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
				<input type="submit" value="submit" />
			</form>
		</div>
	);
}

export default Form;
