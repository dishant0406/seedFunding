pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] deployedCampaigns;

    function createCampaign(uint minContri) public{
        address newCampaign = new Campaign(minContri, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
}

contract Campaign{
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address=>bool) hasApproved;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address=>bool) public approvers;
    uint public approversCount;

    modifier restricted(){
        require(msg.sender==manager);
        _;
    }

    function Campaign(uint minimumContri, address createrAddress) public{
        manager = createrAddress;
        minimumContribution=minimumContri;
    }

    function contribute() public payable{
        require(msg.value>minimumContribution);
        
        approvers[msg.sender]=true;
        approversCount++;
    }

    function createRequest(string desc, uint val, address resp) public restricted{
        Request memory newRequest = Request({
            description: desc,
            value: val,
            recipient: resp,
            complete:false,
            approvalCount:0
        });

        requests.push(newRequest);

    }

    function approveRequest(uint index) public {
            Request storage request = requests[index];
            
            //require the approver has donated minimum amount of money
            require(approvers[msg.sender]);

            //require that the person has not approved prior to this
            require(!request.hasApproved[msg.sender]);

            request.hasApproved[msg.sender]=true;
            request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];

        //require that atleast 50% of total contributers has votes yes
        require(request.approvalCount>(approversCount/2));

        //require that the request is not complete yet
        require(!request.complete);

        require(this.balance>request.value);

        request.recipient.transfer(request.value);
        request.complete=true;
    }
}