To deploy chaincode rung

    curl -XPOST -d @chaincode.txt https://aee1e8b6-52b9-4d2d-b0a1-e81bfad3157a_vp1-api.blockchain.ibm.com:443/chaincode

To report the status changes

    curl -XPOST -d @report.txt https://aee1e8b6-52b9-4d2d-b0a1-e81bfad3157a_vp1-api.blockchain.ibm.com:443/chaincode

To check the status

    curl -XPOST -d @query.txt https://aee1e8b6-52b9-4d2d-b0a1-e81bfad3157a_vp1-api.blockchain.ibm.com:443/chaincode