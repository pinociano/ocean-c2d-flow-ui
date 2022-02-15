import { Alert, Button } from 'react-bootstrap'

function TablePlaceholder({ title, body, button, onClick }: any) {
  return (
    <Alert variant="primary" className="mt-5">
      <Alert.Heading>{title}</Alert.Heading>
      {body}

      <hr />
      <div className="d-flex justify-content-end">
        <Button onClick={onClick} variant="outline-primary">
          {button}
        </Button>
      </div>
    </Alert>
  )
}

export { TablePlaceholder }

export default TablePlaceholder
