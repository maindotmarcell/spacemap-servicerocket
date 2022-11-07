import React, { useContext, useState } from 'react';
import PageContext from '../context/PageContext';
import { invoke } from '@forge/bridge';
import LoadingContext from '../context/LoadingContext';
import UndoContext from '../context/UndoContext';
import LabelContext from '../context/LabelContext';
import ErrorContext from '../context/ErrorContext';

function Label(props) {
	const [isInput, setIsInput] = useState(false);
	const [newTitle, setNewTitle] = useState('');

	const { refreshPages } = useContext(PageContext);
	const { startLoading, stopLoading } = useContext(LoadingContext);
	const { addTitleChange } = useContext(UndoContext);
	const { activeLabel, setActiveLabel } = useContext(LabelContext);
	const { setEmptyTitleError } = useContext(ErrorContext);

	function showInput() {
		setActiveLabel(props.id);
		setIsInput(true);
	}

	function hideInput() {
		setIsInput(false);
		setNewTitle('');
	}

	function changeTitle(event) {
		event.preventDefault();
		setIsInput(false);
		// api call to change title here
		startLoading();
		const prevTitle = props.title;
		invoke('changeTitle', {
			pageID: props.id,
			newTitle: newTitle,
			version: props.version + 1,
		})
			.then((data) => {
				if (data.statusCode === 400) {
					setEmptyTitleError(true);
				} else {
					addTitleChange(props.id, prevTitle, props.version + 1);
				}
				console.log(data);
				refreshPages(props.space).then(() => stopLoading());
				setNewTitle('');
			})
			.catch((err) => console.log(err));
	}

	return (
		<div>
			{isInput && activeLabel === props.id ? (
				<div className="control">
					<form onSubmit={changeTitle}>
						<input
							type="text"
							placeholder="New Title"
							value={newTitle}
							onChange={(e) => setNewTitle(e.target.value)}
						></input>
						<button type="button" onClick={hideInput}>
							Cancel
						</button>
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
