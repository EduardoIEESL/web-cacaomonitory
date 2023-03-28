import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

function Signin() {
  const { user } = useAuthContext();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();
    const { result, error } = await signIn(email, password);
    if (error) {
      return console.log(error);
    }
    return router.push("/dashboard");
  };

  React.useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user]);

  return (
    <div className='sign__container'>
      <div className='form__container'>
        <h1>Sign in</h1>
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
          <div className='btn__container'>
            <button className='btn-primary' type='submit'>
              Sign in
            </button>
            <Link className="singup_link" href='/signup'>Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
