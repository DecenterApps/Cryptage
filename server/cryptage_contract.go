// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package main

import (
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// CryptageMovesABI is the input ABI used to generate the binding from.
const CryptageMovesABI = "[{\"constant\":false,\"inputs\":[{\"name\":\"_moves\",\"type\":\"bytes\"},{\"name\":\"_name\",\"type\":\"bytes32\"},{\"name\":\"_reset\",\"type\":\"bool\"}],\"name\":\"saveMoves\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"names\",\"outputs\":[{\"name\":\"\",\"type\":\"bytes32\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"leaderboard\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"exists\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_address\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"_moves\",\"type\":\"bytes\"},{\"indexed\":false,\"name\":\"_reset\",\"type\":\"bool\"}],\"name\":\"NewMoves\",\"type\":\"event\"}]"

// CryptageMovesBin is the compiled bytecode used for deploying new contracts.
const CryptageMovesBin = `0x608060405234801561001057600080fd5b5061033a806100206000396000f3006080604052600436106100615763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166346f8472481146100665780635cf3d346146100c8578063bf368399146100fb578063f6a3d24e1461012f575b600080fd5b34801561007257600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526100c6943694929360249392840191908190840183828082843750949750508435955050505050602001351515610164565b005b3480156100d457600080fd5b506100e9600160a060020a03600435166102bf565b60408051918252519081900360200190f35b34801561010757600080fd5b506101136004356102d1565b60408051600160a060020a039092168252519081900360200190f35b34801561013b57600080fd5b50610150600160a060020a03600435166102f9565b604080519115158252519081900360200190f35b600160a060020a03331660009081526020819052604090205460ff1615156101f957600160a060020a0333166000818152602081905260408120805460ff191660019081179091556002805491820181559091527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace01805473ffffffffffffffffffffffffffffffffffffffff191690911790555b600160a060020a033316600081815260016020908152604080832086905580518515158184015281815287519181019190915286517fea153764d729be0abd2becc2436e212c3f9cb4c753723eb28298183f6b34556193889387939283926060840192870191908190849084905b8381101561027f578181015183820152602001610267565b50505050905090810190601f1680156102ac5780820380516001836020036101000a031916815260200191505b50935050505060405180910390a2505050565b60016020526000908152604090205481565b60028054829081106102df57fe5b600091825260209091200154600160a060020a0316905081565b60006020819052908152604090205460ff16815600a165627a7a72305820225cf129c5d9abc5c0ffe290fa31af19eac748b5f927079fdc6fa0070cef10810029`

// DeployCryptageMoves deploys a new Ethereum contract, binding an instance of CryptageMoves to it.
func DeployCryptageMoves(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *CryptageMoves, error) {
	parsed, err := abi.JSON(strings.NewReader(CryptageMovesABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(CryptageMovesBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &CryptageMoves{CryptageMovesCaller: CryptageMovesCaller{contract: contract}, CryptageMovesTransactor: CryptageMovesTransactor{contract: contract}, CryptageMovesFilterer: CryptageMovesFilterer{contract: contract}}, nil
}

// CryptageMoves is an auto generated Go binding around an Ethereum contract.
type CryptageMoves struct {
	CryptageMovesCaller     // Read-only binding to the contract
	CryptageMovesTransactor // Write-only binding to the contract
	CryptageMovesFilterer   // Log filterer for contract events
}

// CryptageMovesCaller is an auto generated read-only Go binding around an Ethereum contract.
type CryptageMovesCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CryptageMovesTransactor is an auto generated write-only Go binding around an Ethereum contract.
type CryptageMovesTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CryptageMovesFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type CryptageMovesFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CryptageMovesSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type CryptageMovesSession struct {
	Contract     *CryptageMoves    // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// CryptageMovesCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type CryptageMovesCallerSession struct {
	Contract *CryptageMovesCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts        // Call options to use throughout this session
}

// CryptageMovesTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type CryptageMovesTransactorSession struct {
	Contract     *CryptageMovesTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts        // Transaction auth options to use throughout this session
}

// CryptageMovesRaw is an auto generated low-level Go binding around an Ethereum contract.
type CryptageMovesRaw struct {
	Contract *CryptageMoves // Generic contract binding to access the raw methods on
}

// CryptageMovesCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type CryptageMovesCallerRaw struct {
	Contract *CryptageMovesCaller // Generic read-only contract binding to access the raw methods on
}

// CryptageMovesTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type CryptageMovesTransactorRaw struct {
	Contract *CryptageMovesTransactor // Generic write-only contract binding to access the raw methods on
}

// NewCryptageMoves creates a new instance of CryptageMoves, bound to a specific deployed contract.
func NewCryptageMoves(address common.Address, backend bind.ContractBackend) (*CryptageMoves, error) {
	contract, err := bindCryptageMoves(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &CryptageMoves{CryptageMovesCaller: CryptageMovesCaller{contract: contract}, CryptageMovesTransactor: CryptageMovesTransactor{contract: contract}, CryptageMovesFilterer: CryptageMovesFilterer{contract: contract}}, nil
}

// NewCryptageMovesCaller creates a new read-only instance of CryptageMoves, bound to a specific deployed contract.
func NewCryptageMovesCaller(address common.Address, caller bind.ContractCaller) (*CryptageMovesCaller, error) {
	contract, err := bindCryptageMoves(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &CryptageMovesCaller{contract: contract}, nil
}

// NewCryptageMovesTransactor creates a new write-only instance of CryptageMoves, bound to a specific deployed contract.
func NewCryptageMovesTransactor(address common.Address, transactor bind.ContractTransactor) (*CryptageMovesTransactor, error) {
	contract, err := bindCryptageMoves(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &CryptageMovesTransactor{contract: contract}, nil
}

// NewCryptageMovesFilterer creates a new log filterer instance of CryptageMoves, bound to a specific deployed contract.
func NewCryptageMovesFilterer(address common.Address, filterer bind.ContractFilterer) (*CryptageMovesFilterer, error) {
	contract, err := bindCryptageMoves(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &CryptageMovesFilterer{contract: contract}, nil
}

// bindCryptageMoves binds a generic wrapper to an already deployed contract.
func bindCryptageMoves(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(CryptageMovesABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_CryptageMoves *CryptageMovesRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _CryptageMoves.Contract.CryptageMovesCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_CryptageMoves *CryptageMovesRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _CryptageMoves.Contract.CryptageMovesTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_CryptageMoves *CryptageMovesRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _CryptageMoves.Contract.CryptageMovesTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_CryptageMoves *CryptageMovesCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _CryptageMoves.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_CryptageMoves *CryptageMovesTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _CryptageMoves.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_CryptageMoves *CryptageMovesTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _CryptageMoves.Contract.contract.Transact(opts, method, params...)
}

// Exists is a free data retrieval call binding the contract method 0xf6a3d24e.
//
// Solidity: function exists( address) constant returns(bool)
func (_CryptageMoves *CryptageMovesCaller) Exists(opts *bind.CallOpts, arg0 common.Address) (bool, error) {
	var (
		ret0 = new(bool)
	)
	out := ret0
	err := _CryptageMoves.contract.Call(opts, out, "exists", arg0)
	return *ret0, err
}

// Exists is a free data retrieval call binding the contract method 0xf6a3d24e.
//
// Solidity: function exists( address) constant returns(bool)
func (_CryptageMoves *CryptageMovesSession) Exists(arg0 common.Address) (bool, error) {
	return _CryptageMoves.Contract.Exists(&_CryptageMoves.CallOpts, arg0)
}

// Exists is a free data retrieval call binding the contract method 0xf6a3d24e.
//
// Solidity: function exists( address) constant returns(bool)
func (_CryptageMoves *CryptageMovesCallerSession) Exists(arg0 common.Address) (bool, error) {
	return _CryptageMoves.Contract.Exists(&_CryptageMoves.CallOpts, arg0)
}

// Leaderboard is a free data retrieval call binding the contract method 0xbf368399.
//
// Solidity: function leaderboard( uint256) constant returns(address)
func (_CryptageMoves *CryptageMovesCaller) Leaderboard(opts *bind.CallOpts, arg0 *big.Int) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _CryptageMoves.contract.Call(opts, out, "leaderboard", arg0)
	return *ret0, err
}

// Leaderboard is a free data retrieval call binding the contract method 0xbf368399.
//
// Solidity: function leaderboard( uint256) constant returns(address)
func (_CryptageMoves *CryptageMovesSession) Leaderboard(arg0 *big.Int) (common.Address, error) {
	return _CryptageMoves.Contract.Leaderboard(&_CryptageMoves.CallOpts, arg0)
}

// Leaderboard is a free data retrieval call binding the contract method 0xbf368399.
//
// Solidity: function leaderboard( uint256) constant returns(address)
func (_CryptageMoves *CryptageMovesCallerSession) Leaderboard(arg0 *big.Int) (common.Address, error) {
	return _CryptageMoves.Contract.Leaderboard(&_CryptageMoves.CallOpts, arg0)
}

// Names is a free data retrieval call binding the contract method 0x5cf3d346.
//
// Solidity: function names( address) constant returns(bytes32)
func (_CryptageMoves *CryptageMovesCaller) Names(opts *bind.CallOpts, arg0 common.Address) ([32]byte, error) {
	var (
		ret0 = new([32]byte)
	)
	out := ret0
	err := _CryptageMoves.contract.Call(opts, out, "names", arg0)
	return *ret0, err
}

// Names is a free data retrieval call binding the contract method 0x5cf3d346.
//
// Solidity: function names( address) constant returns(bytes32)
func (_CryptageMoves *CryptageMovesSession) Names(arg0 common.Address) ([32]byte, error) {
	return _CryptageMoves.Contract.Names(&_CryptageMoves.CallOpts, arg0)
}

// Names is a free data retrieval call binding the contract method 0x5cf3d346.
//
// Solidity: function names( address) constant returns(bytes32)
func (_CryptageMoves *CryptageMovesCallerSession) Names(arg0 common.Address) ([32]byte, error) {
	return _CryptageMoves.Contract.Names(&_CryptageMoves.CallOpts, arg0)
}

// SaveMoves is a paid mutator transaction binding the contract method 0x46f84724.
//
// Solidity: function saveMoves(_moves bytes, _name bytes32, _reset bool) returns()
func (_CryptageMoves *CryptageMovesTransactor) SaveMoves(opts *bind.TransactOpts, _moves []byte, _name [32]byte, _reset bool) (*types.Transaction, error) {
	return _CryptageMoves.contract.Transact(opts, "saveMoves", _moves, _name, _reset)
}

// SaveMoves is a paid mutator transaction binding the contract method 0x46f84724.
//
// Solidity: function saveMoves(_moves bytes, _name bytes32, _reset bool) returns()
func (_CryptageMoves *CryptageMovesSession) SaveMoves(_moves []byte, _name [32]byte, _reset bool) (*types.Transaction, error) {
	return _CryptageMoves.Contract.SaveMoves(&_CryptageMoves.TransactOpts, _moves, _name, _reset)
}

// SaveMoves is a paid mutator transaction binding the contract method 0x46f84724.
//
// Solidity: function saveMoves(_moves bytes, _name bytes32, _reset bool) returns()
func (_CryptageMoves *CryptageMovesTransactorSession) SaveMoves(_moves []byte, _name [32]byte, _reset bool) (*types.Transaction, error) {
	return _CryptageMoves.Contract.SaveMoves(&_CryptageMoves.TransactOpts, _moves, _name, _reset)
}

// CryptageMovesNewMovesIterator is returned from FilterNewMoves and is used to iterate over the raw logs and unpacked data for NewMoves events raised by the CryptageMoves contract.
type CryptageMovesNewMovesIterator struct {
	Event *CryptageMovesNewMoves // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *CryptageMovesNewMovesIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(CryptageMovesNewMoves)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(CryptageMovesNewMoves)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *CryptageMovesNewMovesIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *CryptageMovesNewMovesIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// CryptageMovesNewMoves represents a NewMoves event raised by the CryptageMoves contract.
type CryptageMovesNewMoves struct {
	Address common.Address
	Moves   []byte
	Reset   bool
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterNewMoves is a free log retrieval operation binding the contract event 0xea153764d729be0abd2becc2436e212c3f9cb4c753723eb28298183f6b345561.
//
// Solidity: e NewMoves(_address indexed address, _moves bytes, _reset bool)
func (_CryptageMoves *CryptageMovesFilterer) FilterNewMoves(opts *bind.FilterOpts, _address []common.Address) (*CryptageMovesNewMovesIterator, error) {

	var _addressRule []interface{}
	for _, _addressItem := range _address {
		_addressRule = append(_addressRule, _addressItem)
	}

	logs, sub, err := _CryptageMoves.contract.FilterLogs(opts, "NewMoves", _addressRule)
	if err != nil {
		return nil, err
	}
	return &CryptageMovesNewMovesIterator{contract: _CryptageMoves.contract, event: "NewMoves", logs: logs, sub: sub}, nil
}

// WatchNewMoves is a free log subscription operation binding the contract event 0xea153764d729be0abd2becc2436e212c3f9cb4c753723eb28298183f6b345561.
//
// Solidity: e NewMoves(_address indexed address, _moves bytes, _reset bool)
func (_CryptageMoves *CryptageMovesFilterer) WatchNewMoves(opts *bind.WatchOpts, sink chan<- *CryptageMovesNewMoves, _address []common.Address) (event.Subscription, error) {

	var _addressRule []interface{}
	for _, _addressItem := range _address {
		_addressRule = append(_addressRule, _addressItem)
	}

	logs, sub, err := _CryptageMoves.contract.WatchLogs(opts, "NewMoves", _addressRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(CryptageMovesNewMoves)
				if err := _CryptageMoves.contract.UnpackLog(event, "NewMoves", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}
