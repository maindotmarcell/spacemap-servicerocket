import React, { useContext, useState } from 'react';
import PageContext from '../context/PageContext';
import { invoke } from '@forge/bridge';
import LoadingContext from '../context/LoadingContext';

function Label(props) {
	const [isInput, setIsInput] = useState(false);
	const [newTitle, setNewTitle] = useState('');

	const { pages, refreshPages } = useContext(PageContext);
	const { startLoading, stopLoading } = useContext(LoadingContext);

	function showInput() {
		setIsInput(true);
	}

	function hideInput() {
		setIsInput(false);
		setNewTitle('');
	}

	function changeTitle(event) {
		event.preventDefault();
		setIsInput(false);
		// ----------- add api call to change title here ---------
		// console.log('New title: ', newTitle);
		startLoading();
		invoke('changeTitle', {
			pageID: props.id,
			newTitle: newTitle,
			// version: (parseInt(props.version) + 1).toString(),
			version: props.version + 1,
		})
			.then((data) => {
				console.log(data);
				refreshPages(props.space).then(() => stopLoading());
				setNewTitle('');
			})
			.catch((err) => console.log(err));
		// -------------------------------------------------------
	}

	return (
		<div>
			{isInput ? (
				<div>
					<form onSubmit={changeTitle}>
						<input
							type="text"
							placeholder="New Title"
							value={newTitle}
							onChange={(e) => setNewTitle(e.target.value)}
						></input>
						<button onClick={hideInput}>Cancel</button>
						<input type="submit" value="Submit"></input>
					</form>
				</div>
			) : (
				<div>
					<p onDoubleClick={showInput} style={{ cursor: 'pointer' }}>
						{props.title}
					</p>
				</div>
			)}
		</div>
	);
}

export default Label;
