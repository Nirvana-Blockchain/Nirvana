# Private Ethereum network
1. Install Parity using below command(only for LINUX)<br>
    $ bash <(curl https://get.parity.io -L)
	It will install and configure the Parity Ethereum client
2. Download genesis file, and modify networkid as per choice
3. Download configuration file for setting up your node and modify chain 
	field to point to genesis file path downloaded above and set base_path to 	folder you want to set keep all your DB and chain data
4. Run below command to create an account,
	parity --config “config_file_path” account new
5. Save the address of account
6. Add the account entry in Validator array of genesis file
7. Prefund this account by adding it in account section of genesis and add some balance(refer here)
8. Run the node with below command to run the 
   parity --config "config_file_path" --jsonrpc-cors="all" --jsonrpc-apis="all" --jsonrpc-interface=all 
---
## Proof of Athority

In PoA-based networks, transactions and blocks are validated by approved accounts, known as validators. Validators run software allowing them to put transactions in blocks. The process is automated and does not require validators to be constantly monitoring their computers. It, however, does require maintaining the computer (the authority node) uncompromised. The term was coined by Gavin Wood, co-founder of Ethereum and Parity Technologies. </br>

With PoA, individuals earn the right to become validators, so there is an incentive to retain the position that they have gained. By attaching a reputation to identity, validators are incentivized to uphold the transaction process, as they do not wish to have their identities attached to a negative reputation. This is considered more robust than PoS (proof-of-stake) - PoS, while a stake between two parties may be even, it does not take into account each party’s total holdings. This means that incentives can be unbalanced. On the other hand, PoA only allows non-consecutive block approval from any one validator, meaning that the risk of serious damage is centralized to the authority node.</br>

PoA is suited for both private networks and public networks, like POA Network, where trust is distributed.[citation needed]

## POA Dapp
* POA requires a front end client to add or remove athority nodes.
