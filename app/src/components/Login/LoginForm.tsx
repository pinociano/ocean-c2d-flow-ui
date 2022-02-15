import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'

interface LoginFormParams {
  onSubmit: (username: string, password: string) => any
}

function LoginForm({ onSubmit }: LoginFormParams) {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(username, password)
      }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  )
}

export default LoginForm
export { LoginForm }
