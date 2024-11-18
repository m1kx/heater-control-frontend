import { ReactElement, useRef } from "react";

const LoginForm = (): ReactElement => {
  const apiKeyInput = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h1>Login</h1>
      <input ref={apiKeyInput} type="text" placeholder="apikey" />
      <button onClick={() => {
        window.localStorage.setItem('apikey', apiKeyInput.current!.value)
        window.location.reload()
      }}>Login</button>
    </div>
  )
}

export default LoginForm;