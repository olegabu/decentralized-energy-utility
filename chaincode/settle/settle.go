package main

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric/core/chaincode/shim"
)

// SettleChaincode implementation
type SettleChaincode struct {
}

func (t *SettleChaincode) Init(stub *shim.ChaincodeStub, function string, args []string) ([]byte, error) {
	var err error

	if len(args) == 0 {
		return nil, errors.New("Incorrect number of arguments. At least one Meter's name is required.")
	}

	for _,name := range args {
		if len(name) == 0{
			continue
		}
		err = stub.PutState(name, []byte(strconv.Itoa(0)));
		if err != nil {
			return nil, errors.New("Billing account cannot be created")
		}
	}

	return nil, nil
}


func (t *SettleChaincode) Invoke(stub *shim.ChaincodeStub, function string, args []string) ([]byte, error) {
	if function != "change" {
		return nil, errors.New("Unimplemented '" + function + "' invoked")
	}

	var name string
	var val, previous_val int
	var err error

	if len(args) != 2 {
		return nil, errors.New("Incorrect number of arguments. Expecting 2")
	}


	name = args[0]
	// Get the state from the ledger
	value, err := stub.GetState(name)
	if err != nil {
		jsonResp := "{\"Error\":\"Failed to get state for " + name + "\"}"
		return nil, errors.New(jsonResp)
	}

	previous_val, _ = strconv.Atoi(string(value));
	val, _ = strconv.Atoi(string(args[1]))

	err = stub.PutState(name, []byte(strconv.Itoa(val + previous_val)))

	if err != nil {
		return nil, err
	}

	return nil, nil
}


// Query callback representing the query of a chaincode
func (t *SettleChaincode) Query(stub *shim.ChaincodeStub, function string, args []string) ([]byte, error) {
	if function != "balance" {
		return nil, errors.New("Invalid query function name. Expecting \"balance\"")
	}
	var name string // Entities
	var err error

	if len(args) != 1 {
		return nil, errors.New("Incorrect number of arguments. Expecting name of the Meter to query")
	}

	name = args[0]

	// Get the state from the ledger
	value, err := stub.GetState(name)
	if err != nil {
		jsonResp := "{\"Error\":\"Failed to get state for " + name + "\"}"
		return nil, errors.New(jsonResp)
	}

	if value == nil {
		jsonResp := "{\"Error\":\"Nil amount for Meter " + name + "\"}"
		return nil, errors.New(jsonResp)
	}

	jsonResp := "{\"Name\":\"" + name + "\",\"Amount\":\"" + string(value) + "\"}"
	fmt.Printf("Query Response:%s\n", jsonResp)
	return value, nil
}

func main() {
	err := shim.Start(new(SettleChaincode))
	if err != nil {
		fmt.Printf("Error starting Simple chaincode: %s", err)
	}
}
