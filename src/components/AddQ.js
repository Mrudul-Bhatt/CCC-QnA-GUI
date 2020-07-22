import React, { useState, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';
// import { baseUrl, emailRegex } from '../../utility/helper';
// import { message, Space } from 'antd';
import { LinearProgress, MenuItem } from '@material-ui/core';
import { baseUrl } from '../helper';
import { message } from 'antd';
import { AddShoppingCart } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export const AddQ = () => {
	const history = useHistory();
	const classes = useStyles();
	const [question, setQuestion] = useState('');
	const [op1, setOp1] = useState('');
	const [op2, setOp2] = useState('');
	const [op3, setOp3] = useState('');
	const [op4, setOp4] = useState('');
	const [correct, setCorrect] = useState('');
	const [section, setSection] = useState('');
	const [loader, setLoader] = useState(false);

	const add = () => {
		if (!question || !op1 || !op2 || !op3 || !op4 || !correct || !section) {
			message.error('Enter all details!');

			return;
		}

		setLoader(true);
		fetch(`${baseUrl}/createques`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				question,
				options: [op1, op2, op3, op4],
				correct,
				section,
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
				setQuestion('');
				setOp1('');
				setOp2('');
				setOp3('');
				setOp4('');
				setCorrect('');
				setSection('');
				setLoader(false);
			})
			.catch((error) => {
				console.log(error);
				message.error('Server is down!');
				setLoader(false);
			});
	};

	return (
		<div>
			<Container component='main' maxWidth='lg' style={{ marginBottom: 50 }}>
				<div className={classes.paper}>
					<Typography component='h1' variant='h5'>
						Add Question
					</Typography>
					<div className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} lg={12}>
								<TextField
									variant='outlined'
									label='Question'
									required
									fullWidth
									autoFocus
									value={question}
									onChange={(e) => setQuestion(e.target.value)}
								/>
							</Grid>

							<Grid item xs={12} sm={12} lg={6}>
								<TextField
									variant='outlined'
									required
									fullWidth
									label='Option 1'
									value={op1}
									onChange={(e) => setOp1(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={12} lg={6}>
								<TextField
									variant='outlined'
									required
									fullWidth
									label='Option 2'
									value={op2}
									onChange={(e) => setOp2(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={12} lg={6}>
								<TextField
									variant='outlined'
									required
									fullWidth
									label='Option 3'
									value={op3}
									onChange={(e) => setOp3(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={12} lg={6}>
								<TextField
									variant='outlined'
									required
									fullWidth
									label='Option 4'
									value={op4}
									onChange={(e) => setOp4(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={12} lg={6}>
								<TextField
									variant='outlined'
									fullWidth
									select
									label='Correct Option (1,2,3,4)'
									value={correct}
									onChange={(e) => setCorrect(e.target.value)}
								>
									{[1, 2, 3, 4].map((option) => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</TextField>
							</Grid>

							<Grid item xs={12} sm={12} lg={6}>
								<TextField
									variant='outlined'
									fullWidth
									select
									value={section}
									onChange={(e) => setSection(e.target.value)}
									label='Section (1,2,3,...,10)'
								>
									{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</TextField>
							</Grid>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
							onClick={() => add()}
							disabled={loader}
						>
							Add
						</Button>
					</div>
				</div>
			</Container>
		</div>
	);
};
