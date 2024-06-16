import { ethers } from 'ethers'

const provider = new ethers.getDefaultProvider()
const main = async () => {
  const balance = await provider.getBalance(`vitalik.eth`)
  console.log(`\nETH Balance of vitalik: \n ${ethers.formatEther(balance)} ETH`)
}
main()
