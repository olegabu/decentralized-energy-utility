
As a first step both chaincodes should be deployed

    curl -XPOST -d @report_chaincode.txt https://aee1e8b6-52b9-4d2d-b0a1-e81bfad3157a_vp1-api.blockchain.ibm.com:443/chaincode
    curl -XPOST -d @settle_chaincode.txt https://aee1e8b6-52b9-4d2d-b0a1-e81bfad3157a_vp1-api.blockchain.ibm.com:443/chaincode

Smart Meters can report status for consumption and production using:

    curl -XPOST -d @report.txt https://aee1e8b6-52b9-4d2d-b0a1-e81bfad3157a_vp1-api.blockchain.ibm.com:443/chaincode

In order to change current balance for consumers:

    curl -XPOST -d @settle_change.txt https://aee1e8b6-52b9-4d2d-b0a1-e81bfad3157a_vp1-api.blockchain.ibm.com:443/chaincode

To check the status for kWh and account:

    curl -XPOST -d @report_query.txt https://aee1e8b6-52b9-4d2d-b0a1-e81bfad3157a_vp1-api.blockchain.ibm.com:443/chaincode
    curl -XPOST -d @settle_query.txt https://aee1e8b6-52b9-4d2d-b0a1-e81bfad3157a_vp1-api.blockchain.ibm.com:443/chaincode

To submit iteration and move mone from consumer to producers

    curl -XPOST -d @settle.txt https://aee1e8b6-52b9-4d2d-b0a1-e81bfad3157a_vp1-api.blockchain.ibm.com:443/chaincode