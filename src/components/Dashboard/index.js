import React, { useEffect, useState } from 'react'
import { Typography, Paper, Avatar, CircularProgress, Button } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../firebase'
import { withRouter, Link } from 'react-router-dom'

const styles = theme => ({
	main: {
		width: 'auto',
		backgroundColor: '#e6f2ff',
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
		background: 'linear-gradient(175deg, rgba(213,233,255,1) 0%, rgba(255,255,255,1) 30%)',
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
		  2
		)}px ${theme.spacing(2)}px`
	  },
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: '#4da6ff',
		secondary: 'red'
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

function Dashboard(props) {
    const { classes } = props
    
    const [wish, setWish] = useState('')

	useEffect(() => {
		firebase.getCurrentUserWish().then(setWish)
	}, [])

	if(!firebase.getCurrentUsername()) {
		// not logged in
		alert('Please login first')
		props.history.replace('/login')
		return null
    }
    
	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<VerifiedUserOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					Hello { firebase.getCurrentUsername() }!!
				</Typography><br />
				<Typography component="h1" variant="h5">
                 {!!wish ? `You will receive weekly inventory updates every Friday!` : <CircularProgress size={20} />}
				</Typography>
                <Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					onClick={logout}
					className={classes.root1}>
					Logout
          		</Button>
				<Button
					component={Link}
					to="/contact"
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					className={classes.root2}>
                        Contact Us
          		</Button>
			</Paper>
		</main>
	)

	async function logout() {
		await firebase.logout()
		props.history.push('/')
	}
}

export default withRouter(withStyles(styles)(Dashboard))