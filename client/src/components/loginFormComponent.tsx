import {useState} from "react";
import "../scss/loginForm.scss"
import RegisterComponent from "./loginComponents/RegisterComponent"
import LogInComponent from "./loginComponents/LogInComponent";
function LoginFormComponent() {
    const [registerTab, setRegisterTab] = useState(false)


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
                    <LogInComponent setRegisterFormVisibility={setRegisterTabVisibility}></LogInComponent>
                </div>
            </div>
        )
    }
}

export default LoginFormComponent