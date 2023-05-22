import { useEffect, useState } from "react";
import axios from "axios";
import "../scss/profile.scss";

function ProfileComponent() {
	const [userStats, setUserStats] = useState({
		searchAmount: 0,
		favbooksAmount: 0,
	});

	function logOut() {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		localStorage.removeItem("loggedIn");
		localStorage.removeItem("searchAmount");
		alert("Successfully logged out");
	}

	async function handleGetData() {
		await axios
			.post("/api/userdata/getUserStats", {
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username: localStorage.getItem("username") }),
			})
			.then((res: any) => {
				console.log(res);
				setUserStats(res.data);
			});
	}

	useEffect(() => {
		handleGetData();
	}, []);

	return (
		<div className="smartProfileContainer">
			<div className="ProfileContainer">
				<span className="welcomeMessage">
					Welcome,{" "}
					<span className="username">{localStorage.getItem("username")}</span>
				</span>
				<div className="statsContainer">
					<div className="favBookCountContainer container">
						<span className="favBookCount number">
							{userStats.favbooksAmount}
						</span>
						<span className="text">Offers starred</span>
					</div>
					<div className="searchCountContainer container">
						<span className="searchAmount number">
							{userStats.searchAmount}
						</span>
						<span className="text">Searches</span>
					</div>
				</div>
				<span className="LogOut" onClick={logOut}>
					Log out
				</span>
			</div>
		</div>
	);
}

export default ProfileComponent;
