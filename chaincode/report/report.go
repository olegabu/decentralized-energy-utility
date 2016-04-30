package main

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric/core/chaincode/shim"
)

// SimpleChaincode implementation
type SimpleChaincode struct {
}

func (t *SimpleChaincode) Init(stub *shim.ChaincodeStub, function string, args []string) ([]byte, error) {
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
			return nil, errors.New("Meter cannot be created")
		}
	}

	return nil, nil
}

// Deletes an entity from state
func (t *SimpleChaincode) settle(stub *shim.ChaincodeStub, args []string) ([]byte, error) {
	var err error
	var val, total int

	keysIter, err := stub.RangeQueryState("", "")
	if err != nil {
		return nil, fmt.Errorf("keys operation failed. Error accessing state: %s", err)
	}
	defer keysIter.Close()

	var keys []string
	var values []int
	total = 0;

	for keysIter.HasNext() {
		key, _, err := keysIter.Next()
		if err != nil {
			return nil, fmt.Errorf("keys operation failed. Error accessing state: %s", err)
		}
		val, _, err = strconv.Atoi(string(args[1]))
		if err != nil {
			return nil, fmt.Errorf("cannot read state for key %s: %s", key, err)
		}

		keys = append(keys, key)
		values = append(values, val)
		if(val > 0){
			total = total + val;
		}

	}
	for index,name := range keys {
		if(values[index] < 0){
			stub.QueryChaincode()
		}
		err = stub.PutState(name, []byte(strconv.Itoa(0)));
		if err != nil {
			return nil, errors.New("Meter cannot be created")
		}
	}


	return nil, nil
}

func (t *SimpleChaincode) Invoke(stub *shim.ChaincodeStub, function string, args []string) ([]byte, error) {

	if function == "settle" {
		return t.settle(stub, args)
	}

	if function != "report" {
		return nil, errors.New("Unimplemented '" + function + "' invoked")
	}

	var name string    // Entities
	var val int // Asset holdings
	var err error

	if len(args) != 2 {
		return nil, errors.New("Incorrect number of arguments. Expecting 2")
	}

	name = args[0]
	val, _ = strconv.Atoi(string(args[1]))

	err = stub.PutState(name, []byte(strconv.Itoa(val)))

	if err != nil {
		return nil, err
	}

	return nil, nil
}


// Query callback representing the query of a chaincode
func (t *SimpleChaincode) Query(stub *shim.ChaincodeStub, function string, args []string) ([]byte, error) {
	if function != "querybalance" {
		return nil, errors.New("Invalid query function name. Expecting \"query\"")
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
		jsonResp := "{\"Error\":\"Nil amount for Meter" + name + "\"}"
		return nil, errors.New(jsonResp)
	}

	jsonResp := "{\"Name\":\"" + name + "\",\"Amount\":\"" + string(value) + "\"}"
	fmt.Printf("Query Response:%s\n", jsonResp)
	return value, nil
}

func main() {
	err := shim.Start(new(SimpleChaincode))
	if err != nil {
		fmt.Printf("Error starting Simple chaincode: %s", err)
	}
}
