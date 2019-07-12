# Private Ethereum network
1. Install Parity using below command(only for LINUX)
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
