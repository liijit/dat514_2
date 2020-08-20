import React from "react";
import axios from "axios";

interface AppProps {
	username: string;
	email: string;
	password: string;
	retypepassword: string;
	res: string;
	date?: Date;
	this?: {
		state: {
			username: string;
			email: string;
			password: string;
			retypepassword: string;
		};
	};
}

interface AppState {
	users?: string;
	username: string;
	email: string;
	password: string;
	retypepassword: string;
	res?: string;
	date?: Date;
	e?:{ target: { value: string }; };
}

interface DataFields {
	target: { value: string }; onChange(event: React.FormEvent<HTMLLabelElement>): void;
}

export default class UserRegister extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);

		//binds methods to the user interaction
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangeRetypePassword = this.onChangeRetypePassword.bind(this);
		this.onChangeRes = this.onChangeRes.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		//initialise variables
		this.state = {
			username: "",
			email: "",
			password: "",
			retypepassword: "",
			res: "",
			date: new Date(),
		};
	}

	//life cycle method to runs before anything is rendered
	//example data to test

	//update following variables to user input values
	onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			username: e.target.value,
		});
	};
	onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			email: e.target.value,
		});
	};
	onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			password: e.target.value,
		});
	};
	onChangeRetypePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			retypepassword: e.target.value,
		});
	};
	onChangeRes = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		this.setState({
			res: e.target.value,
		});
	};

	onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		//ignore HTML defaulted interaction with the form
		e.preventDefault();

		//creates an object formulated for the backend api post request with form data parsed in
		const user: AppState = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			retypepassword: this.state.retypepassword,
		};

		//attempt a post request and parse 'user' object
		axios
			.post("http://localhost:8008/register", user)
			.then((res) =>
				this.setState((state, props) => {
					//after a successful post request, clear each state and update the res with the promise response
					return {
						username: "",
						email: "",
						password: "",
						retypepassword: "",
						res: res.data,
					};
				})
			)
			.catch((res) =>
				this.setState((state, props) => {
					//return the error message and update the res field with error message
					return { res: res.toJSON().message };
				})
			);
	};
	render() {
		return (
			<div className="menucontainer">
				<div className="container nopad">
					<div className="flexy">
						<div className="menu">
							<div className="column">
								<div className="row logo-c"></div>
								<div className="column">
									<form onSubmit={this.onSubmit}>
										<div className="labelcont">
											<label
												className="label"
												htmlFor="username"
											>
												<p>USERNAME</p>
											</label>
											<label
												className="labelres"
											>
												<p>{this.state.res}</p>
											</label>
										</div>
										<input
											type="text"
											id="usernameField"
											value={this.state.username}
											onChange={this.onChangeUsername}
										/>
										<div className="labelcont">
											<label className="label">
												<p>EMAIL</p>
											</label>
										</div>
										<input
											type="text"
											id="emailField"
											value={this.state.email}
											onChange={this.onChangeEmail}
										/>
										<div className="labelcont">
											<label className="label">
												<p>PASSWORD</p>
											</label>
										</div>
										<input
											type="password"
											id="passwordField"
											value={this.state.password}
											onChange={this.onChangePassword}
										/>
										<div className="labelcont">
											<label className="label">
												<p>RETYPE PASSWORD</p>
											</label>
										</div>
										<input
											type="password"
											id="retypepasswordField"
											value={this.state.retypepassword}
											onChange={this.onChangeRetypePassword}
										/>
										<button
											className="buttonW b1"
											type="submit"
											value="login"
										>
											Create an Account
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="background"></div>
			</div>
		);
	}
}
