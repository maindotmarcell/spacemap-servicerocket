import React, { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import ErrorContext from '../../context/ErrorContext';
import styles from './ErrorMsg.module.css';

export default function ErrorMsg() {
	const {
		emptyTitleError,
		setEmptyTitleError,
		childMoveError,
		setChildMoveError,
	} = useContext(ErrorContext);

	return (
		<div className={styles.alertWrapper}>
			{childMoveError && (
				<Alert
					className={styles.alert}
					key="danger"
					variant="danger"
					onClose={() => setChildMoveError(false)}
					dismissible
				>
					<p>You can't drag a page into its own child page.</p>
				</Alert>
			)}
			{emptyTitleError && (
				<Alert
					className={styles.alert}
					key="danger"
					variant="danger"
					onClose={() => setEmptyTitleError(false)}
					dismissible
				>
					<p>You can't submit an empty page title.</p>
				</Alert>
			)}
		</div>
	);
}
