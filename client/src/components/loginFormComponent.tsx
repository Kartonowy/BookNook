import {useState} from "react";
import "../scss/loginForm.scss"
import axios from "axios";
import RegisterComponent from "./loginComponents/RegisterComponent"

function LoginFormComponent() {
    const [registerTab, setRegisterTab] = useState(false)

    async function handleLogIn(e : React.FormEvent) {
            e.preventDefault();

            const form : any = e.target;
            const user = {
                username: form[0].value,
                password: form[1].value
            }

            await axios.post("/login", {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
                }
            )
                .then((res : any) => res.json())
                .then(data => {
                    localStorage.setItem("token", data.token);
                })
    }

    function setRegisterTabVisibility(value : boolean) {
        setRegisterTab(value)
    }

    if (registerTab) {
        return (
            <div className="LoginContainer">
                <div className="formContainer">
                    <RegisterComponent setRegisterFormVisibility={setRegisterTabVisibility}></RegisterComponent>
                </div>
            </div>
        )
    } else {
        return (
            <div className="LoginContainer">
                <div className="formContainer">
                    <form onSubmit={e => handleLogIn(e)}>
                        <label>
                            Name:
                            <div className="InputContainer">
                                <input type="text" name="name" />
                            </div>
                        </label>
                        <label>
                            Password:
                            <div className="InputContainer">
                                <input type="password" name="password" />
                            </div>
                        </label>
                        <div className="Options">
                            <div className="Switch">
                                <span className="RegisterSwitch" onClick={() => setRegisterTab(true)}>Register</span>
                                <span className="ForgotPassword">Forgot Password?</span>
                            </div>
                            <div className="SubmitContainer">
                                <input type="submit" value="Login" className="SubmitLoginForm"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginFormComponent