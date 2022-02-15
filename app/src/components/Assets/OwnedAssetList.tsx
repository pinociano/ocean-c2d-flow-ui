import { Button, Badge } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination
} from 'react-table'

import React from 'react'

import TablePagination from 'Components/Utils/TablePagination'
import TablePlaceholder from 'Components/Utils/TablePlaceholder'
import haveOwnership from './Utils'

function OwnedAssetList({ assetList, user, onCompute }: any) {
  const history = useHistory()

  const ownedAssetList = assetList.filter((asset: any) =>
    haveOwnership(asset, user)
  )

  const actions = React.useCallback(
    (did, algorithm, isOwner) =>
      algorithm ? (
        <Button
          className="mr-2 mb-2"
          variant="primary"
          type="button"
          size="sm"
          disabled={!isOwner}
          onClick={() => onCompute(did, algorithm)}>
          <i className="fa-solid fa-gears"></i> Computazione
        </Button>
      ) : (
        <p>Nessun Algoritmo Associato</p>
      ),
    [onCompute]
  )

  const data = React.useMemo(() => {
    let data: any = []

    ownedAssetList.forEach((asset: any) => {
      let row = asset.algorithms.map((algorithm: any) => {
        let isOwner = haveOwnership(asset, user, algorithm)
        return {
          did: asset.name,
          algorithm: (
            <Badge pill bg={isOwner ? 'success' : 'danger'}>
              {algorithm.name}
            </Badge>
          ),
          actions: actions(asset.did, algorithm.did, isOwner)
        }
      })

      if (row.length <= 0)
        row = [
          {
            did: asset.name,
            algorithm: '-',
            actions: actions(asset.did, null, false)
          }
        ]
      data = [...data, ...row]
    })

    return data
  }, [actions, assetList, user])

  const columns = React.useMemo(
    () => [
      { Header: 'Nome Asset', accessor: 'did' },
      { Header: 'Algoritmi', accessor: 'algorithm' },
      { Header: 'Azioni', accessor: 'actions' }
    ],
    []
  )

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  return ownedAssetList.length > 0 ? (
    <TablePagination
      {...tableInstance}
      paginationProps={tableInstance}></TablePagination>
  ) : (
    <TablePlaceholder
      title="Asset Posseduti"
      body={
        <>
          <p>Non possiedi ancora nessun asset.</p>{' '}
          <p>
            Vai al Marketplace per acquistare asset, o pubblica il tuo primo
            asset.
          </p>
        </>
      }
      button={
        <>
          <i className="fa-solid fa-cart-shopping"></i> Vai al Marketplace
        </>
      }
      onClick={() => history.push('/marketplace')}></TablePlaceholder>
  )
}

export default OwnedAssetList
export { OwnedAssetList }
