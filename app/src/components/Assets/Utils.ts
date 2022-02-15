const haveOwnership = (asset: any, user: any, algorithm?: any) => {
  if (algorithm)
    return (
      algorithm.publisher === user ||
      algorithm.buyers.find((buyer: any) => buyer === user)
    )

  return (
    asset.publisher === user ||
    asset.buyers.find((buyer: any) => buyer === user)
  )
}

export default haveOwnership
