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
	var total int
	//var val, total, exchange_rate, amount int

	//exchange_rate = 13;

	keysIter, err := stub.RangeQueryState("1", "10")
	if err != nil {
		return nil, fmt.Errorf("keys operation failed. Error accessing state: %s", err)
	}
	//defer keysIter.Close()
	//
	//var keys []string
	//var values []int
	//total = 0;
	//
	for keysIter.HasNext() {
		total = total + 1
	//	key, _, err := keysIter.Next()
	//	if err != nil {
	//		return nil, fmt.Errorf("keys operation failed. Error accessing state: %s", err)
	//	}
	//	val, _ = strconv.Atoi(string(args[1]))
	//
	//	keys = append(keys, key)
	//	values = append(values, val)
	//	if(val > 0){
	//		total = total + val;
	//	}
	//
	}
	//for index,name := range keys {
	//	if(values[index] < 0){
	//		amount = values[index]*-1*exchange_rate;
	//		stub.QueryChaincode("2780b7463c57f343a9e107854c4b53150018cdd8fd74ca970c028de6bfa707f6e9f6cf2b20f0af4fdd04d2167651eb29c7bfabf19e6a93ae2aff65f55202d0e6", "change", []string{string(amount)})
	//	}
	//	name = name + "";
	//	//err = stub.PutState(name, []byte(strconv.Itoa(0)));
	//	//if err != nil {
	//	//	return nil, errors.New("Meter cannot be updated")
	//	//}
	//}


	return []byte(strconv.Itoa(total)), nil
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

	if function == "settle" {
		return t.settle(stub, args)
	}

	if function != "querybalance" {
		return nil, errors.New("Invalid query function name. Expecting \"querybalance\"")
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
