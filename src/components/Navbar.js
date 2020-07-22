import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
} from '@material-ui/core';
import { Add, ViewList } from '@material-ui/icons';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export const Navbar = () => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						CCC-QnA-GUI
					</Typography>
					<IconButton color='inherit' onClick={() => history.push('/')}>
						<Add />
					</IconButton>
					<IconButton color='inherit' onClick={() => history.push('/listq')}>
						<ViewList />
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	);
};
