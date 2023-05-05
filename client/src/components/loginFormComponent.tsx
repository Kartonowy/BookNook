import {useState} from "react";
import "../scss/loginForm.scss"

function LoginFormComponent() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")
    const [registerTab, setRegisterTab] = useState(false)
    function handleLogIn() {

    }
    function handleRegister() {

    }


    if (registerTab) {
        return (
            <div className="LoginContainer">
                <div className="formContainer">
                    <form onSubmit={handleRegister}>
                        <label>
                            Name:
                            <div className="InputContainer">
                                <input type="text" name="name" onChange={event => {
                                    setLogin(event.target.value)
                                }}/>
                            </div>
                        </label>
                        <label>
                            E-mail:
                            <div className="InputContainer">
                                <input type="text" name="email" onChange={event => {
                                    setEmail(event.target.value)
                                }}/>
                            </div>
                        </label>
                        <label>
                            Password:
                            <div className="InputContainer">
                                <input type="password" name="password" onChange={event => {
                                    setPassword(event.target.value)
                                }}/>
                            </div>
                        </label>
                        <div className="Options">
                            <div className="Switch">
                                <span className="RegisterSwitch" onClick={() => setRegisterTab(false)}>Login</span>
                            </div>
                            <div className="SubmitContainer">
                                <input type="submit" value="Register" className="SubmitLoginForm"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    } else {
        return (
            <div className="LoginContainer">
                <div className="formContainer">
                    <form onSubmit={handleLogIn}>
                        <label>
                            Name:
                            <div className="InputContainer">
                                <input type="text" name="name" onChange={event => {
                                    setLogin(event.target.value)
                                }}/>
                            </div>
                        </label>
                        <label>
                            Password:
                            <div className="InputContainer">
                                <input type="password" name="password" onChange={event => {
                                    setPassword(event.target.value)
                                }}/>
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