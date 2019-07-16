import data from '../contracts/Validators.json';


class Validator {
    address = null;
    contractAddress = "0x7a9f6787686e61f08d1bbff3d8ab96c659281873";
    abi = data.abi;
    web3 = null;
    constructor(web) {
        this.web3 = web;
        this.contract = new this.web3.eth.Contract(data.abi, this.contractAddress);
        this.address = this.web3.eth.getAccounts()[0];
        this.methods = this.contract.methods;
    }

    setAddress(address) {
        this.address = address;
    }
    getPendingValidators() {
        var retValue = this.methods.getPendingValidators().call({
            from: this.address
        })
        return retValue;
    }
    getValidators() {
        return this.methods.getValidators().call({
            from: this.address
        });
    }
    isAddressAnValidator(addressToCheck) {
        return this.methods.isAddressAnValidator(addressToCheck).call({
            from: this.address
        });
    }
    nominateValidator(nominieeAddress, name, socialProfileURL, callBack) {
        this.methods.nominateValidator(nominieeAddress, name, socialProfileURL).send({
            from: this.address
        }).then((receipt) => {
            // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
            console.warn("response");
            callBack();
        });
    }
    getVoteCountFor(_address) {
        return this.methods.getVoteCountFor(_address).call({
            from: this.address
        });
    }

    voteForValidator(candidateAddress) {
        return this.methods.voteForValidator(candidateAddress).send({
            from: this.address
        })
    }
    getValidatorDetails(_address){
        return this.methods.getValidatorDetails(_address).call({
            from: this.address
        })
    }
    async validatorCount(candidateAddress) {
        return await this.methods.validatorCount(candidateAddress).call({
            from: this.address
        })
    }

}
export default Validator;