pragma solidity ^ 0.5.0;
import "./ValidatorSet.sol";
// Some addresses are admins.
// Admin can add or remove another admin or a validator.
contract Validators is ValidatorSet{

    /*
        Structure to store the Meta data for the pending validator
        :Parm index: index of the address of the new validator in the list of pending validators
        :Param voteCount: total vote count for the validator
    */
    struct CandidateDetails{
        string name;
        string socialProfile;
        bool exists;
        uint index;
    }

    struct ValidatorMeta{
        mapping(address => bool) votersAddress;
        uint voteCount;
        CandidateDetails details;
    }


    mapping(address => CandidateDetails) isValidator;
    address[] public validators;
    address[] public pendingValidators;
    uint public validatorCount;
    mapping(address => ValidatorMeta) isPendingValidator;
    mapping(address => bool) isAdmin;

    constructor() public{
        isAdmin[msg.sender] = true;
        isValidator[msg.sender] = CandidateDetails("shubham", "www.google.com", true, 0);
        validatorCount = validators.push(msg.sender);
    }

    /*
        Function to nominate a new Validator to the list
        :Param address validatorAddress: address the candidate
        :Param string name: name of the validator
        :Param string publicUrl: social url of the validator
        :Retruns bool: true if successfully nomiated
    */

    function nominateValidator(address _validatorAddress, string memory _name, string memory _publicUrl) public returns(bool){
        require(!isValidator[_validatorAddress].exists, 'Address is already a validator');
        require(!isPendingValidator[_validatorAddress].details.exists, 'Address is in pending address');

        // Pushing into the list and inserting into mapping for future reference
        CandidateDetails memory details = CandidateDetails(_name, _publicUrl, true, pendingValidators.push(_validatorAddress)-1);
        isPendingValidator[_validatorAddress] = ValidatorMeta(0, details);
        emit NewValidatorNormiated(msg.sender, _validatorAddress);
        return true;
    }

    /*
        Function to remove a validator by admin only
        :Parma address validatorAddress: address of the validator
    */

    function removeValidator(address _validatorAddress) public adminOnly returns(bool){
        require(isValidator[_validatorAddress].exists,"Invalid Validator Address");
        require(!isAdmin[_validatorAddress],"Cannot remove admin validators");
        
        uint index = isValidator[_validatorAddress].index;
        if(validators.length > 1){
            address lastAddress = validators[validators.length-1];
            isValidator[lastAddress].index = index;
            validators[index] =validators[validators.length-1];

        }
        delete isValidator[_validatorAddress];
        validators.length--;
        validatorCount--;
        emit ValidatorRemoved(_validatorAddress);
    }

    /*
        Function to vote for candidate
        :Param address validatorAddress: address of the validtor
        :Returns bool: true if successfully voted
    */
    function voteForValidator(address _validatorAddress) public validatorOnly returns(bool){
        require(isPendingValidator[_validatorAddress].details.exists, 'Address is in not pending address');
        if (isPendingValidator[_validatorAddress].votersAddress[msg.sender]) revert("You have already voted for the candidate");
        isPendingValidator[_validatorAddress].votersAddress[msg.sender] = true;
        isPendingValidator[_validatorAddress].voteCount++;
        checkForPromotion(_validatorAddress);
        return true;
    }

    /*
        Function to promote a candidate if he has more then 50% votes
        :Param address candidateAddress: address of the candidate
        :Returns bool: true if promoted false otherwise
    */
    function checkForPromotion(address _candidateAddress) private returns(bool){

        uint totalVotes = isPendingValidator[_candidateAddress].voteCount;

        if (totalVotes >= validatorCount / 2 + 1) {
            isValidator[_candidateAddress] = isPendingValidator[_candidateAddress].details;
            uint index = validators.push(_candidateAddress)-1;
            uint lastIndex = pendingValidators.length -1;
            isValidator[_candidateAddress].index = index;
            if(lastIndex > 1){
                pendingValidators[isPendingValidator[_candidateAddress].details.index] = pendingValidators[lastIndex];
                
            }
            pendingValidators.length--;
            isPendingValidator[_candidateAddress].votersAddress[msg.sender] = false;
            delete isPendingValidator[_candidateAddress];
            validatorCount++;
            emit NewValidatorJoined(_candidateAddress, isValidator[_candidateAddress].name, isValidator[_candidateAddress].socialProfile);
            return true;
        }
        return false;
    }



    function reportMalicious(address _validator, uint256 _blockNumber, bytes calldata _proof)  external {
        emit Report(msg.sender, _validator, true);
    }

    // Report that a validator has misbehaved in a benign way.
    function reportBenign(address _validator, uint256 _blockNumber)  external{
        emit Report(msg.sender, _validator, false);
    }

    function finalizeChange() external{

    }

    /*
        Function to get the list of validators
        :Returns list: of validators
    */
    function getValidators() external view returns(address[] memory){
        return validators;
    }
    /*
        Function to get the lsit of pendingValidators
        :Returns list: of pending validators
    */
    function getPendingValidators() external view returns(address[] memory){
        return pendingValidators;
    }


    /*
        Function to get information about the validators
        :Param address: address of validator
        :Returns name, socialProfileURL:
    */

    function getValidatorDetails(address _address) external view returns(string memory,string memory){
        return (isValidator[_address].name,isValidator[_address].socialProfile);
    }

    /*
        Function to check if an address is a validator
        :Param address addressToCheck: address of the user to check if he/she is a validator or not
        :Returns bool: true if a validator false otherwise
    */
    function isAddressAnValidator(address _addressToCheck) public view returns(bool){
        if (isValidator[_addressToCheck].exists) return true;
        return false;
    }
    
    /*
        Function to check if an address is in pending validators
        :Param address addressToCheck: address of the user to check if he/she is in pending validators
        :Returns bool: true if a validator false otherwise
    */
    function isAddressInPendingValidators(address _addressToCheck) public view returns(bool){
        if(isPendingValidator[_addressToCheck].details.exists) return true;
        return false;
    }

    function getVoteCountFor(address _address) public view returns(uint){
        return isPendingValidator[_address].voteCount;
    }

    // Modifiers
    modifier validatorOnly(){
        if (!isValidator[msg.sender].exists) revert();
        _;
    }

    modifier adminOnly(){
        if (!isAdmin[msg.sender]) revert();
        _;
    }

}