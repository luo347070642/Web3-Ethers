/*
 * @Author: lpy lpy@qq.com
 * @Date: 2024-06-28 21:19:22
 * @LastEditors: lpy luopy4498@gmail.com
 * @LastEditTime: 2024-07-21 21:11:53
 * @FilePath: /Web3-Ethers/05_WriteContract/WriteContract.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import { ethers } from 'ethers'
const { ethers } = require('ethers')

const ALCHEMY_GOERLI_URL = 'https://arb-mainnet.g.alchemy.com/v2/Uz3mPlaxJ0zH6_uDPfMBigSie2BwJetC'
// 确保 URL 是正确的
const provider = new ethers.JsonRpcProvider(ALCHEMY_GOERLI_URL)

const privateKey = '882029cf74aa0b65960d6918bba79ce9e7b3f1d647c348d292b81c7e42e76422'
const wallet = new ethers.Wallet(privateKey, provider)
const abiWETH = [
  'function balanceOf(address) public view returns(uint)',
  'function deposit() public payable',
  'function transfer(address, uint) public returns (bool)',
  'function withdraw(uint) public'
]
// Goerli测试网的合约地址
const addressWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'

const contractWETH = new ethers.Contract(addressWETH, abiWETH, provider)

const main = async () => {
  try {
    const address = await wallet.getAddress()
    // 1. 读取WETH合约的链上信息（WETH abi）
    console.log('\n1. 读取WETH余额')
    const balanceWETH = await contractWETH.balanceOf(address)
    console.log(`存款前WETH持仓: ${ethers.formatEther(balanceWETH)}\n`)
    //读取钱包内ETH余额
    const balanceETH = await provider.getBalance(wallet)
    // 判断ETH余额是否足够
    if (ethers.formatEther(balanceETH) > 0.0015) {
      // 2. 调用deposit()函数，将0.001 ETH转为WETH
      console.log('\n2. 调用deposit()函数，存入0.001 ETH')
      const tx = await contractWETH.deposit({ value: ethers.utils.parseEther('0.001') })
      await tx.wait()
      console.log(`交易详情：`)
      console.log(tx)
      const balanceWETH_deposit = await contractWETH.balanceOf(address)
      console.log(`存款后WETH持仓: ${ethers.formatEther(balanceWETH_deposit)}\n`)

      // 3. 调用transfer()函数，将0.001 WETH转账给 vitalik
      console.log('\n3. 调用transfer()函数，给vitalik转账0.001 WETH')
      const tx2 = await contractWETH.transfer('vitalik.eth', ethers.utils.parseEther('0.001'))
      // 等待交易上链
      await tx2.wait()
      const balanceWETH_transfer = await contractWETH.balanceOf('vitalik.eth')
      console.log(`转账后WETH持仓: ${ethers.formatEther(balanceWETH_transfer)}\n`)
    } else {
      // 如果ETH不足
      console.log('ETH不足，去水龙头领一些Goerli ETH')
      console.log('1. chainlink水龙头: https://faucets.chain.link/goerli')
      console.log('2. paradigm水龙头: https://faucet.paradigm.xyz/')
    }
  } catch (error) {
    console.error('发生错误:', error)
  }
}
main()
