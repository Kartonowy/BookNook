import axios from "axios";

function LogInComponent({ setRegisterFormVisibility }: any) {
	async function handleLogIn(e: React.FormEvent) {
		e.preventDefault();

		const form: any = e.target;
		const user = {
			username: form[0].value.toLowerCase(),
			password: form[1].value,
		};

		await axios
			.post("/api/auth/login", {
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			})
			.then((data: any) => {
				if (data.data.message === "Success") {
					localStorage.setItem("token", data.data.token);
					localStorage.setItem("username", data.data.username);
					localStorage.setItem("loggedIn", data.data.loggedIn);
					localStorage.setItem("searchAmount", data.data.searchAmount);
					console.log(data);
					alert("Sucessfully logged in!");
				} else {
					alert(data.data.message);
				}
			});
	}

	return (
		<form onSubmit={(e) => handleLogIn(e)}>
			<label>
				Name:
				<div className="InputContainer">
					<input type="text" name="name" placeholder="Enter your username" />
				</div>
			</label>
			<label>
				Password:
				<div className="InputContainer">
					<input
						type="password"
						name="password"
						placeholder="Enter your password"
					/>
				</div>
			</label>
			<div className="Options">
				<div className="Switch">
					<span
						className="RegisterSwitch"
						onClick={() => setRegisterFormVisibility(true)}
					>
						Register
					</span>
					<span className="ForgotPassword">Forgot Password?</span>
				</div>
				<div className="SubmitContainer">
					<input type="submit" value="Login" className="SubmitLoginForm" />
				</div>
			</div>
		</form>
	);
}

export default LogInComponent;
