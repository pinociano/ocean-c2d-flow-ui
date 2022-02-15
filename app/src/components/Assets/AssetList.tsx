import { Button } from 'react-bootstrap'

import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination
} from 'react-table'

import React from 'react'

import TablePagination from 'Components/Utils/TablePagination'

function AssetList({ assetList, user, onBuy }: any) {
  const actions = React.useCallback(
    (did, isOwner) =>
      !isOwner ? (
        <Button
          className="mr-2 mb-2"
          variant="primary"
          type="button"
          size="sm"          
          onClick={() => onBuy(did)}>
          <i className="fa-brands fa-digital-ocean"></i> Richiedi Accesso
        </Button>
      ) : <p>Asset già in possesso</p>,
    [onBuy]
  )

  const data = React.useMemo(() => {
    return assetList.map((asset: any) => {
      let haveOwnership = (asset: any) => {
        return (
          asset.publisher === user ||
          asset.buyers.find((buyer: any) => buyer === user)
        )
      }

      let isOwner = haveOwnership(asset)

      return {
        did: asset.name,
        description: asset.description,
        actions: actions(asset.did, isOwner)
      }
    })
  }, [actions, assetList, user])

  const columns = React.useMemo(
    () => [
      { Header: 'Nome Asset', accessor: 'did' },
      { Header: 'Descrizione', accessor: 'description' },
      { Header: 'Azioni', accessor: 'actions' }
    ],
    []
  )
 

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination,
  )

  return (
    <TablePagination
      {...tableInstance}
      paginationProps={tableInstance}></TablePagination>
  )
}

export default AssetList
export { AssetList }
