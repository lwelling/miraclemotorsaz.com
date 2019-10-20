import React, { useState } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import firebase from '../firebase';

import { addTodo } from '../../actions';
const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		[theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		background: 'linear-gradient(170deg, rgba(213,233,255,1) 0%, rgba(255,255,255,1) 30%)',
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
		  2
		)}px ${theme.spacing(2)}px`
	  },
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: '#4da6ff',
	},
	root1: {
		marginTop: theme.spacing(3),
		backgroundColor: '#4da6ff',
		'&:hover': {
			background: "#99ccff",
		}
  },
  root2: {
		marginTop: theme.spacing(3),
		backgroundColor: '#ff6666',
		'&:hover': {
			background: "#ff9999",
		}
  }
})

function SignIn(props) {
	console.log('props: ', props);
	const { classes } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
       			</Typography>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email Address</InputLabel>
						<Input id="email" name="email" autoComplete="off" autoFocus value={email}onChange={e => setEmail(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input name="password" type="password" id="password" autoComplete="off" value={password}onChange={e => setPassword(e.target.value)}/>
					</FormControl>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={login}
						className={classes.root1}>
						Sign in
          			</Button>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/register"
						className={classes.root2}>
						Register
					</Button>
					<Button
						type="button"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.root1}
						onClick={() => { props.addTodo(email); console.log('todos: ', props.todos) }}
					>
						TEST
					</Button>
					{
						props.todos.map((todo, i) => (
							<Button key={i} type="button" fullWidth variant="contained" color="secondary">
								{todo.text}
							</Button>
						))
					}
				</form>
			</Paper>
		</main> 
	)

	async function login() {
		try {
			await firebase.login(email, password)
			props.history.replace('/dashboard')
		} catch(error) {
			alert(error.message)
		}
	}
}

const mapStateToProps = state => {
	console.log('state here: ', state);
	return {
		todos: state.todos,
	};
};

export default connect(mapStateToProps, { addTodo })(withRouter(withStyles(styles)(SignIn)))
