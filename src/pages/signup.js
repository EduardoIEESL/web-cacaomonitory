import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

function Signup() {
  const { user } = useAuthContext();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [errorMessage, setErrorMessage] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user]);

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error) {
      setErrorMessage(
        error.message
          .match(/\(([^)]+)\)/)[1]
          .split("/")[1]
          // capitalize the first letter and remove -
          .charAt(0)
          .toUpperCase() +
          error.message
            .match(/\(([^)]+)\)/)[1]
            .split("/")[1]
            .slice(1)
            .replace(/-/g, " ")
      );
      return console.log(
        //  extract the message between the () and all text after /
        error.message.match(/\(([^)]+)\)/)[1].split("/")[1]
      );
    }

    console.log(result);
    return router.push("/dashboard");
  };
  return (
    <div className='sign__container'>
      <div className='form__container'>
        <h1>Sign up</h1>
        <form onSubmit={handleForm} className='form__item'>
          <label htmlFor='email'>
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type='email'
              name='email'
              id='email'
              placeholder='example@mail.com'
            />
          </label>
          <label htmlFor='password'>
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type='password'
              name='password'
              id='password'
              placeholder='password'
            />
          </label>
          {errorMessage && <p className='error'>{errorMessage}</p>}
          <div className='btn__container'>
            <button className='btn-primary' type='submit'>
              Sign up
            </button>
            <Link className='singup_link' href='/signin'>
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
