/*
 * @Author: lpy lpy@qq.com
 * @Date: 2024-06-16 16:40:21
 * @LastEditors: lpy lpy@qq.com
 * @LastEditTime: 2024-06-16 17:47:43
 * @FilePath: \Web3-Ethers\02_Provider\Provider.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ethers } from 'ethers'

// 利用公共节点连接以太坊网络
const ALCHEMY_MAINNET_URL = 'https://rpc.ankr.com/eth'
const ALCHEMY_SEPOLIA_URL = 'https://rpc.sepolia.org'

// 连接以太坊主网
const providerETH = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL)
// 连接sepolia测试网
const ProviderSepolia = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL)

const main = async () => {
  // 利用provider读取链上信息
  // 1.查询vitalik在主网和sepolia测试网上的ETH余额
  console.log('1.查询vitalik在主网和sepolia测试网上的ETH余额')
  // 查询vitalik在主网上的ETH余额
  const balanceEth = await providerETH.getBalance(`vitalik.eth`)
  // 输出主网ETH余额
  console.log(`ETH Balance of vitalik: ${ethers.formatEther(balanceEth)} ETH`)
  // 查询vitalik在sepolia测试网上的ETH余额
  const balanceSepolia = await ProviderSepolia.getBalance(`0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`)
  // 输出Sepolia测试网ETH余额
  console.log(`Sepolia ETH Balance of vitalik: ${ethers.formatEther(balanceSepolia)} ETH`)

  // 2. 查询provider连接到了哪条链
  console.log('\n2. 查询provider连接到了哪条链')
  const network = await providerETH.getNetwork()
  console.log(network.toJSON())

  // 3. 查询区块高度
  console.log('\n3. 查询区块高度')
  const blockNumber = await providerETH.getBlockNumber()
  console.log(blockNumber)

  // 4. 查询 vitalik 钱包历史交易次数
  console.log('\n4. 查询 vitalik 钱包历史交易次数')
  const txCount = await providerETH.getTransactionCount(`vitalik.eth`)
  console.log(txCount)

  // 5. 查询当前建议的gas设置
  console.log('\n5. 查询当前建议的gas设置')
  const feeData = await providerETH.getFeeData()
  console.log(feeData)

  // 6. 查询区块信息
  console.log('\n6. 查询区块信息')
  const block = await providerETH.getBlock(0)
  console.log(block)

  // 7. 给定合约地址查询合约bytecode，例子用的WETH地址
  console.log('\n7. 给定合约地址查询合约bytecode，例子用的WETH地址')
  const code = await providerETH.getCode('0xc778417e063141139fce010982780140aa0cd5ab')
  console.log(code)
}

main()
