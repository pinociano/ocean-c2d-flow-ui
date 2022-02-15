import { useState } from 'react'
import Select from 'react-select'
import { Form, Button, Col, Row } from 'react-bootstrap'
import haveOwnership from './Utils'

function LinkAssetsForm({ assets, algorithms, user, onLink }: any) {
  const [asset, setAsset] = useState(null)
  const [algorithm, setAlgorithm] = useState(null)

  const assetOptions = assets
    .filter((asset: any) => asset.publisher === user)
    .map((asset: any, index: any) => ({
      value: asset.did,
      label: asset.name
    }))

  const algorithmOptions = algorithms.map((algorithm: any, index: any) => ({
    value: algorithm.did,
    label: algorithm.name
  }))

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        onLink(asset, algorithm, () => {
          setAsset(null)
          setAlgorithm(null)
        })
      }}>
      <Row>
        <Col sm="4">
          <Form.Group controlId={'select-player'}>
            <Form.Label>
              <b>Seleziona Data Asset *</b> :
            </Form.Label>

            <Select
              inputId={`data-asset`}
              options={assetOptions}
              isSearchable={true}
              name={'data-asset'}
              value={
                assetOptions?.find((elem: any) => elem.value === asset) || null
              }
              onChange={(option: any) => {
                setAsset(option.value)
              }}
              placeholder={'Seleziona Asset'}
            />
          </Form.Group>
        </Col>

        <Col sm="4">
          <Form.Group controlId={'select-player'}>
            <Form.Label>
              <b>Seleziona Algoritmo *</b> :
            </Form.Label>

            <Select
              inputId={`data-algorithm`}
              options={algorithmOptions.filter(
                (algorithm: any) =>
                  asset === null ||
                  assets
                    .find((elem: any) => elem.did === asset)
                    ?.algorithms.filter(
                      (elem: any) => elem.did === algorithm.value
                    ).length <= 0
              )}
              isSearchable={true}
              name={'data-algorithm'}
              value={
                algorithmOptions?.find(
                  (elem: any) => elem.value === algorithm
                ) || null
              }
              onChange={(option: any) => {
                setAlgorithm(option.value)
              }}
              placeholder={'Seleziona Algoritmo'}
            />
          </Form.Group>
        </Col>

        <Col sm="2" className="align-self-center">
          <Button className="mr-3 mt-3" variant="primary" type="submit">
            <i className="fa-solid fa-link"></i> Assegna
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export { LinkAssetsForm }

export default LinkAssetsForm
