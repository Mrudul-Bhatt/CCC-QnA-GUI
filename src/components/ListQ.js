import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
	Container,
	Grid,
	Paper,
	Divider,
	List,
	ListItem,
	ListItemText,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@material-ui/core';
import { baseUrl } from '../helper';
import { Delete, Edit } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { message } from 'antd';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
	paper: {
		textAlign: 'center',
		color: theme.palette.text.secondary,
		// maxWidth: 500,
		// maxHeight: 500,
		// maxHeight: '100%',
		// height: '100%',
		maxHeight: 590,
		overflow: 'auto',
	},
}));

export const ListQ = () => {
	const classes = useStyles();
	const [loader, setLoader] = useState(false);
	const [deleteId, setDeleteId] = useState(null);
	const [deleteDialog, setDeleteDialog] = useState(false);
	const [data, setData] = useState([]);
	const history = useHistory();

	useEffect(() => {
		fetch(`${baseUrl}/allquesnoauth`)
			.then((res) => res.json())
			.then((response) => {
				console.log(response);

				setData(response.myques);
				setLoader(false);
			})
			.catch((error) => {
				console.log(error);
				message.error('Server is down!');
				setLoader(false);
			});
	}, []);

	const deleteQues = () => {
		fetch(`${baseUrl}/deleteques`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				quesId: deleteId,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				if (response.message) {
					message.success(response.message);
				} else {
					message.error(response.error);
				}
				// setData(response.myques);
				const newData = data.filter((item) => {
					if (item._id !== response.result._id) {
						return item;
					}
				});
				setData(newData);
				setLoader(false);
				setDeleteId(null);
			})
			.catch((error) => {
				console.log(error);
				message.error('Server is down!');
				setLoader(false);
			});
	};

	const DeleteDialog = () => {
		return (
			<Dialog
				fullWidth
				open={deleteDialog}
				onClose={() => setDeleteDialog(false)}
			>
				<DialogTitle>{'Delete Question ?'}</DialogTitle>
				<DialogContent>
					<DialogContentText>This action cannot be undone!</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteDialog(false)} color='primary'>
						Cancel
					</Button>
					<Button
						onClick={() => {
							setDeleteDialog(false);
							deleteQues();
						}}
						color='primary'
						autoFocus
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		);
	};

	return (
		<Container component='main' maxWidth='lg'>
			<DeleteDialog />
			<Grid container spacing={2} style={{ marginTop: 20, marginBottom: 20 }}>
				{data &&
					data.map((item, index) => {
						return (
							<Grid item lg={12} sm={12} xs={12} key={item._id}>
								<Paper variant='outlined' style={{ width: '100%' }}>
									<h3 style={{ whiteSpace: 'pre-wrap' }}>
										{`(S ${item.section}) Q ${index + 1} ${item.question}`}
									</h3>
									<Divider />
									<List>
										{item.options.map((value, index) => {
											return (
												<ListItem
													key={value}
													selected={item.correct - 1 === index}
												>
													<ListItemText primary={value} />
												</ListItem>
											);
										})}
									</List>
									<IconButton
										onClick={() => {
											setDeleteDialog(true);
											setDeleteId(item._id);
										}}
									>
										<Delete />
									</IconButton>
									<IconButton
										onClick={() => history.push('/editques/' + item._id)}
									>
										<Edit />
									</IconButton>
								</Paper>
							</Grid>
						);
					})}
			</Grid>
		</Container>
	);
};
