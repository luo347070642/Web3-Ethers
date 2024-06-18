/*
 * @Author: lpy luopy4498@gmail.com
 * @Date: 2024-06-18 16:17:42
 * @LastEditors: lpy luopy4498@gmail.com
 * @LastEditTime: 2024-06-18 17:46:39
 * @FilePath: \Web3-Ethers\04_SendETH\SendETH.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ethers } from 'ethers'

const ALCHEMY_GOERLI_URL = 'https://eth-mainnet.g.alchemy.com/v2/Uz3mPlaxJ0zH6_uDPfMBigSie2BwJetC'
const provider = new ethers.JsonRpcProvider(ALCHEMY_GOERLI_URL)

// 创建随机wallet对象
const wallet1 = ethers.Wallet.createRandom()
const walletProviderWETH = wallet1.connect(provider)
const mnemonic = wallet1.mnemonic // 获取助记词

// 利用私钥和provider创建wallet对象
const privateKey = '0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b'
const wallet2 = new ethers.Wallet(privateKey, provider)

// 从助记词创建wallet对象
const wallet3 = ethers.Wallet.fromPhrase(mnemonic.phrase)

const main = async () => {
  // 1. 获取钱包地址
  const address1 = await wallet1.getAddress()
  const address2 = await wallet2.getAddress()
  const address3 = await wallet3.getAddress()
  console.log(`1. 获取钱包地址`)
  console.log(`钱包1地址: ${address1}`)
  console.log(`钱包2地址: ${address2}`)
  console.log(`钱包3地址: ${address3}`)
  console.log(`钱包1和钱包3的地址是否相同: ${address1 === address3}`)

  // 2. 获取助记词
  console.log(`\n2. 获取助记词`)
  console.log(`钱包1助记词: ${wallet1.mnemonic.phrase}`)
  // 3. 获取私钥
  console.log(`钱包1私钥: ${wallet1.privateKey}`)
  console.log(`钱包2私钥: ${wallet2.privateKey}`)
  // 4. 获取链上发送交易次数
  const txCount1 = await provider.getTransactionCount(walletProviderWETH)
  const txCount2 = await provider.getTransactionCount(wallet2)
  console.log(`钱包1发送交易次数: ${txCount1}`)
  console.log(`钱包2发送交易次数: ${txCount2}`)
  // 5. 发送ETH
  console.log(`i. 发送前余额`)
  console.log(`钱包1: ${ethers.formatEther(await provider.getBalance(walletProviderWETH))} ETH`)
  console.log(`钱包2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`)

  const tx = {
    to: address1,
    value: ethers.parseEther('0.001')
  }
  // iii. 发送交易，获得收据
  console.log(`\nii. 等待交易在区块链确认（需要几分钟）`)
  const receipt = await wallet2.sendTransaction(tx)
  await receipt.wait() // 等待链上确认交易
  console.log(receipt) // 打印交易详情
  // iv. 打印交易后余额
  console.log(`\niii. 发送后余额`)
  console.log(`钱包1: ${ethers.formatEther(await provider.getBalance(wallet1WithProvider))} ETH`)
  console.log(`钱包2: ${ethers.formatEther(await provider.getBalance(wallet2))} ETH`)
}
main()
