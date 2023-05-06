import axios from "axios";

function RegisterComponent({setRegisterFormVisibility} : any) {

    async function handleRegister(e : React.FormEvent) {
        e.preventDefault();

        const form : any = e.target;
        const user = {
            username: form[0].value,
            email: form[1].value,
            password: form[2].value,
        }

        await axios.post("/register", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
    }

    return (
        <form onSubmit={handleRegister}>
            <label>
                Name:
                <div className="InputContainer">
                    <input type="text" name="name" />
                </div>
            </label>
            <label>
                E-mail:
                <div className="InputContainer">
                    <input type="text" name="email" />
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
                    <span className="RegisterSwitch" onClick={() => setRegisterFormVisibility(false)}>Login</span>
                </div>
                <div className="SubmitContainer">
                    <input type="submit" value="Register" className="SubmitLoginForm"/>
                </div>
            </div>
        </form>
    )
}

export default RegisterComponent