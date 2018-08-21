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

// BasicTokenABI is the input ABI used to generate the binding from.
const BasicTokenABI = "[{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"balance\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"}]"

// BasicTokenBin is the compiled bytecode used for deploying new contracts.
const BasicTokenBin = `0x608060405234801561001057600080fd5b50610249806100206000396000f3006080604052600436106100565763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166318160ddd811461005b57806370a0823114610082578063a9059cbb146100a3575b600080fd5b34801561006757600080fd5b506100706100db565b60408051918252519081900360200190f35b34801561008e57600080fd5b50610070600160a060020a03600435166100e1565b3480156100af57600080fd5b506100c7600160a060020a03600435166024356100fc565b604080519115158252519081900360200190f35b60015490565b600160a060020a031660009081526020819052604090205490565b6000600160a060020a038316151561011357600080fd5b600160a060020a03331660009081526020819052604090205482111561013857600080fd5b600160a060020a033316600090815260208190526040902054610161908363ffffffff6101f516565b600160a060020a033381166000908152602081905260408082209390935590851681522054610196908363ffffffff61020716565b600160a060020a03808516600081815260208181526040918290209490945580518681529051919333909316927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a350600192915050565b60008282111561020157fe5b50900390565b60008282018381101561021657fe5b93925050505600a165627a7a72305820ae92a1f75da03f9a69587f94e56e43ec474165be77e181fbeb23c2ed0f17e3a10029`

// DeployBasicToken deploys a new Ethereum contract, binding an instance of BasicToken to it.
func DeployBasicToken(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *BasicToken, error) {
	parsed, err := abi.JSON(strings.NewReader(BasicTokenABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(BasicTokenBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &BasicToken{BasicTokenCaller: BasicTokenCaller{contract: contract}, BasicTokenTransactor: BasicTokenTransactor{contract: contract}, BasicTokenFilterer: BasicTokenFilterer{contract: contract}}, nil
}

// BasicToken is an auto generated Go binding around an Ethereum contract.
type BasicToken struct {
	BasicTokenCaller     // Read-only binding to the contract
	BasicTokenTransactor // Write-only binding to the contract
	BasicTokenFilterer   // Log filterer for contract events
}

// BasicTokenCaller is an auto generated read-only Go binding around an Ethereum contract.
type BasicTokenCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// BasicTokenTransactor is an auto generated write-only Go binding around an Ethereum contract.
type BasicTokenTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// BasicTokenFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type BasicTokenFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// BasicTokenSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type BasicTokenSession struct {
	Contract     *BasicToken       // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// BasicTokenCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type BasicTokenCallerSession struct {
	Contract *BasicTokenCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts     // Call options to use throughout this session
}

// BasicTokenTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type BasicTokenTransactorSession struct {
	Contract     *BasicTokenTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts     // Transaction auth options to use throughout this session
}

// BasicTokenRaw is an auto generated low-level Go binding around an Ethereum contract.
type BasicTokenRaw struct {
	Contract *BasicToken // Generic contract binding to access the raw methods on
}

// BasicTokenCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type BasicTokenCallerRaw struct {
	Contract *BasicTokenCaller // Generic read-only contract binding to access the raw methods on
}

// BasicTokenTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type BasicTokenTransactorRaw struct {
	Contract *BasicTokenTransactor // Generic write-only contract binding to access the raw methods on
}

// NewBasicToken creates a new instance of BasicToken, bound to a specific deployed contract.
func NewBasicToken(address common.Address, backend bind.ContractBackend) (*BasicToken, error) {
	contract, err := bindBasicToken(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &BasicToken{BasicTokenCaller: BasicTokenCaller{contract: contract}, BasicTokenTransactor: BasicTokenTransactor{contract: contract}, BasicTokenFilterer: BasicTokenFilterer{contract: contract}}, nil
}

// NewBasicTokenCaller creates a new read-only instance of BasicToken, bound to a specific deployed contract.
func NewBasicTokenCaller(address common.Address, caller bind.ContractCaller) (*BasicTokenCaller, error) {
	contract, err := bindBasicToken(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &BasicTokenCaller{contract: contract}, nil
}

// NewBasicTokenTransactor creates a new write-only instance of BasicToken, bound to a specific deployed contract.
func NewBasicTokenTransactor(address common.Address, transactor bind.ContractTransactor) (*BasicTokenTransactor, error) {
	contract, err := bindBasicToken(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &BasicTokenTransactor{contract: contract}, nil
}

// NewBasicTokenFilterer creates a new log filterer instance of BasicToken, bound to a specific deployed contract.
func NewBasicTokenFilterer(address common.Address, filterer bind.ContractFilterer) (*BasicTokenFilterer, error) {
	contract, err := bindBasicToken(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &BasicTokenFilterer{contract: contract}, nil
}

// bindBasicToken binds a generic wrapper to an already deployed contract.
func bindBasicToken(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(BasicTokenABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_BasicToken *BasicTokenRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _BasicToken.Contract.BasicTokenCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_BasicToken *BasicTokenRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _BasicToken.Contract.BasicTokenTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_BasicToken *BasicTokenRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _BasicToken.Contract.BasicTokenTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_BasicToken *BasicTokenCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _BasicToken.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_BasicToken *BasicTokenTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _BasicToken.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_BasicToken *BasicTokenTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _BasicToken.Contract.contract.Transact(opts, method, params...)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(_owner address) constant returns(balance uint256)
func (_BasicToken *BasicTokenCaller) BalanceOf(opts *bind.CallOpts, _owner common.Address) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _BasicToken.contract.Call(opts, out, "balanceOf", _owner)
	return *ret0, err
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(_owner address) constant returns(balance uint256)
func (_BasicToken *BasicTokenSession) BalanceOf(_owner common.Address) (*big.Int, error) {
	return _BasicToken.Contract.BalanceOf(&_BasicToken.CallOpts, _owner)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(_owner address) constant returns(balance uint256)
func (_BasicToken *BasicTokenCallerSession) BalanceOf(_owner common.Address) (*big.Int, error) {
	return _BasicToken.Contract.BalanceOf(&_BasicToken.CallOpts, _owner)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_BasicToken *BasicTokenCaller) TotalSupply(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _BasicToken.contract.Call(opts, out, "totalSupply")
	return *ret0, err
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_BasicToken *BasicTokenSession) TotalSupply() (*big.Int, error) {
	return _BasicToken.Contract.TotalSupply(&_BasicToken.CallOpts)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_BasicToken *BasicTokenCallerSession) TotalSupply() (*big.Int, error) {
	return _BasicToken.Contract.TotalSupply(&_BasicToken.CallOpts)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(_to address, _value uint256) returns(bool)
func (_BasicToken *BasicTokenTransactor) Transfer(opts *bind.TransactOpts, _to common.Address, _value *big.Int) (*types.Transaction, error) {
	return _BasicToken.contract.Transact(opts, "transfer", _to, _value)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(_to address, _value uint256) returns(bool)
func (_BasicToken *BasicTokenSession) Transfer(_to common.Address, _value *big.Int) (*types.Transaction, error) {
	return _BasicToken.Contract.Transfer(&_BasicToken.TransactOpts, _to, _value)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(_to address, _value uint256) returns(bool)
func (_BasicToken *BasicTokenTransactorSession) Transfer(_to common.Address, _value *big.Int) (*types.Transaction, error) {
	return _BasicToken.Contract.Transfer(&_BasicToken.TransactOpts, _to, _value)
}

// BasicTokenTransferIterator is returned from FilterTransfer and is used to iterate over the raw logs and unpacked data for Transfer events raised by the BasicToken contract.
type BasicTokenTransferIterator struct {
	Event *BasicTokenTransfer // Event containing the contract specifics and raw log

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
func (it *BasicTokenTransferIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(BasicTokenTransfer)
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
		it.Event = new(BasicTokenTransfer)
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
func (it *BasicTokenTransferIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *BasicTokenTransferIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// BasicTokenTransfer represents a Transfer event raised by the BasicToken contract.
type BasicTokenTransfer struct {
	From  common.Address
	To    common.Address
	Value *big.Int
	Raw   types.Log // Blockchain specific contextual infos
}

// FilterTransfer is a free log retrieval operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: e Transfer(from indexed address, to indexed address, value uint256)
func (_BasicToken *BasicTokenFilterer) FilterTransfer(opts *bind.FilterOpts, from []common.Address, to []common.Address) (*BasicTokenTransferIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _BasicToken.contract.FilterLogs(opts, "Transfer", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &BasicTokenTransferIterator{contract: _BasicToken.contract, event: "Transfer", logs: logs, sub: sub}, nil
}

// WatchTransfer is a free log subscription operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: e Transfer(from indexed address, to indexed address, value uint256)
func (_BasicToken *BasicTokenFilterer) WatchTransfer(opts *bind.WatchOpts, sink chan<- *BasicTokenTransfer, from []common.Address, to []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _BasicToken.contract.WatchLogs(opts, "Transfer", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(BasicTokenTransfer)
				if err := _BasicToken.contract.UnpackLog(event, "Transfer", log); err != nil {
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

// BoosterABI is the input ABI used to generate the binding from.
const BoosterABI = "[{\"constant\":true,\"inputs\":[{\"name\":\"_boosterId\",\"type\":\"uint256\"}],\"name\":\"getCardFromBooster\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256[]\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"buyBooster\",\"outputs\":[],\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"buyInstantBooster\",\"outputs\":[],\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_cardPackTokenAddress\",\"type\":\"address\"}],\"name\":\"addCardPackToken\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"CARD_ARTIST_PERCENTAGE\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"metadataContract\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"withdraw\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"},{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"boosters\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"numberOfCardsInBooster\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"cardPackToken\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"boughtWithToken\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"withdrawBalance\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"}],\"name\":\"buyBoosterWithToken\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"seleneanCards\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"OWNER_PERCENTAGE\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getMyBoosters\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256[]\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_metadataContract\",\"type\":\"address\"}],\"name\":\"addMetadataContract\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"},{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"unrevealedBoosters\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"}],\"name\":\"buyInstantBoosterWithToken\",\"outputs\":[],\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_buyWithReveal\",\"type\":\"bool\"}],\"name\":\"setBytWithReveal\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"boosterOwners\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"numOfBoosters\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_boosterId\",\"type\":\"uint256\"}],\"name\":\"revealBooster\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"blockNumbers\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"REVEALER_PERCENTAGE\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"BOOSTER_PRICE\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"BUY_WITH_REVEAL\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"_cardAddress\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"user\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"boosterId\",\"type\":\"uint256\"}],\"name\":\"BoosterBought\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"boosterId\",\"type\":\"uint256\"}],\"name\":\"BoosterRevealed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"user\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"boosterId\",\"type\":\"uint256\"}],\"name\":\"BoosterInstantBought\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"}]"

// BoosterBin is the compiled bytecode used for deploying new contracts.
const BoosterBin = `0x608060405266038d7ea4c680006003908155603c600455600590815560196006556305f5e1006007556008556009805460ff1916905534801561004157600080fd5b50604051602080611ae5833981016040525160008054600160a060020a03338116600160a060020a03199283161790925560018054929093169116179055611a578061008e6000396000f30060806040526004361061015b5763ffffffff60e060020a600035041663063d44fd81146101605780630c7c0c0f146101c85780631049caeb146101d257806310a57ca0146101da5780633492db44146101fb57806335209821146102225780633ccfd60b146102535780633cd949dd1461026857806342ec2c5f146102835780635cee7d4d1461029857806372bf765b146102ad578063756af45f146102d95780637f5e409c146102fa5780638da5cb5b1461031b57806393c52162146103305780639d5fbb8e14610345578063a4788ed81461035a578063b05120b71461036f578063b258233514610390578063b3e02f62146103b4578063be5056ea146103c8578063c48cd76d146103e2578063cb841dcd146103fa578063cd30fc6f1461040f578063cd8bff3314610427578063cedb8e841461043f578063d035770c14610454578063d1b1071214610469578063f2fde38b1461047e575b600080fd5b34801561016c57600080fd5b5061017860043561049f565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101b457818101518382015260200161019c565b505050509050019250505060405180910390f35b6101d0610501565b005b6101d06105e2565b3480156101e657600080fd5b506101d0600160a060020a036004351661094a565b34801561020757600080fd5b50610210610994565b60408051918252519081900360200190f35b34801561022e57600080fd5b5061023761099a565b60408051600160a060020a039092168252519081900360200190f35b34801561025f57600080fd5b506101d06109a9565b34801561027457600080fd5b506102106004356024356109f7565b34801561028f57600080fd5b50610210610a27565b3480156102a457600080fd5b50610237610a2d565b3480156102b957600080fd5b506102c5600435610a3c565b604080519115158252519081900360200190f35b3480156102e557600080fd5b50610210600160a060020a0360043516610a51565b34801561030657600080fd5b506101d0600160a060020a0360043516610a63565b34801561032757600080fd5b50610237610c0c565b34801561033c57600080fd5b50610237610c1b565b34801561035157600080fd5b50610210610c2a565b34801561036657600080fd5b50610178610c30565b34801561037b57600080fd5b506101d0600160a060020a0360043516610c9b565b34801561039c57600080fd5b50610210600160a060020a0360043516602435610ce5565b6101d0600160a060020a0360043516610d00565b3480156103d457600080fd5b506101d0600435151561102a565b3480156103ee57600080fd5b50610237600435611058565b34801561040657600080fd5b50610210611073565b34801561041b57600080fd5b506101d0600435611079565b34801561043357600080fd5b50610210600435611507565b34801561044b57600080fd5b50610210611519565b34801561046057600080fd5b5061021061151f565b34801561047557600080fd5b506102c5611525565b34801561048a57600080fd5b506101d0600160a060020a036004351661152e565b6000818152600e60209081526040918290208054835181840281018401909452808452606093928301828280156104f557602002820191906000526020600020905b8154815260200190600101908083116104e1575b50505050509050919050565b60035460009034101561051357600080fd5b60095460ff16151561052457600080fd5b61052d336115c6565b1561053757600080fd5b50601080546000818152600b60209081526040808320805473ffffffffffffffffffffffffffffffffffffffff191633600160a060020a0316908117909155600c8352818420439055808452600d835281842080546001818101835591865294849020909401859055855490930190945583519182528101829052825191927f79cea4dba95ebbe0ec86e48d206fd19f2f40cbf6232e25f43e9af2dd7a99e82d92918290030190a150565b60008060608060008060035434101515156105fc57600080fd5b60095460ff161561060c57600080fd5b610615336115c6565b1561061f57600080fd5b600260009054906101000a9004600160a060020a0316600160a060020a031663c487282c6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561067257600080fd5b505af1158015610686573d6000803e3d6000fd5b505050506040513d602081101561069c57600080fd5b50516008549096508610156106ad57fe5b60085460001943014095506106c39086906115ce565b935083516040519080825280602002602001820160405280156106f0578160200160208202803883390190505b509250600091505b8351821015610894576001548451600160a060020a0390911690635de038b190339087908690811061072657fe5b906020019060200201516040518363ffffffff1660e060020a0281526004018083600160a060020a0316600160a060020a0316815260200182815260200192505050602060405180830381600087803b15801561078257600080fd5b505af1158015610796573d6000803e3d6000fd5b505050506040513d60208110156107ac57600080fd5b505183518490849081106107bc57fe5b602090810290910101526002548451600160a060020a039091169063811dd0e2908690859081106107e957fe5b906020019060200201516040518263ffffffff1660e060020a02815260040180828152602001915050602060405180830381600087803b15801561082c57600080fd5b505af1158015610840573d6000803e3d6000fd5b505050506040513d602081101561085657600080fd5b505160055460035491925060649102600160a060020a0383166000908152600a602052604090208054929091049091019055600191909101906106f8565b6010546000908152600e6020908152604090912084516108b69286019061199d565b5060108054600101815560065460035460045460008054600160a060020a039081168252600a60209081526040928390208054606495870286900496909702949094049490940190940190915592548351339093168352600019019082015281517fe7dcea48e6f51d32be953021f71f6a212c680f1fadc9376a5aaf81ac5a2a448f929181900390910190a1505050505050565b60005433600160a060020a0390811691161461096557600080fd5b6011805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b60055481565b600254600160a060020a031681565b600160a060020a0333166000818152600a6020526040808220805490839055905190929183156108fc02918491818181858888f193505050501580156109f3573d6000803e3d6000fd5b5050565b600e60205281600052604060002081815481101515610a1257fe5b90600052602060002001600091509150505481565b60085481565b601154600160a060020a031681565b600f6020526000908152604090205460ff1681565b600a6020526000908152604090205481565b60115460009033600160a060020a03908116911614610a8157600080fd5b60095460ff161515610a9257600080fd5b610a9b336115c6565b15610aa557600080fd5b50601054601154600754604080517f23b872dd000000000000000000000000000000000000000000000000000000008152600160a060020a03868116600483015230811660248301526044820193909352905191909216916323b872dd9160648083019260209291908290030181600087803b158015610b2457600080fd5b505af1158015610b38573d6000803e3d6000fd5b505050506040513d6020811015610b4e57600080fd5b50506000818152600f60209081526040808320805460ff19166001908117909155600b83528184208054600160a060020a03881673ffffffffffffffffffffffffffffffffffffffff199091168117909155600c8452828520439055808552600d84528285208054808401825590865294849020909401859055601080549091019055805192835290820183905280517f79cea4dba95ebbe0ec86e48d206fd19f2f40cbf6232e25f43e9af2dd7a99e82d9281900390910190a15050565b600054600160a060020a031681565b600154600160a060020a031681565b60045481565b600160a060020a0333166000908152600d6020908152604091829020805483518184028101840190945280845260609392830182828015610c9057602002820191906000526020600020905b815481526020019060010190808311610c7c575b505050505090505b90565b60005433600160a060020a03908116911614610cb657600080fd5b6002805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b600d60205281600052604060002081815481101515610a1257fe5b600954600090819081906060908190839060ff1615610d1e57600080fd5b610d27876115c6565b15610d3157600080fd5b601054601154600754604080517f23b872dd000000000000000000000000000000000000000000000000000000008152600160a060020a038c811660048301523081166024830152604482019390935290519399509116916323b872dd916064808201926020929091908290030181600087803b158015610db157600080fd5b505af1158015610dc5573d6000803e3d6000fd5b505050506040513d6020811015610ddb57600080fd5b50506000868152600f60209081526040808320805460ff1916600190811790915560108054909101905560025481517fc487282c0000000000000000000000000000000000000000000000000000000081529151600160a060020a039091169363c487282c93600480850194919392918390030190829087803b158015610e6157600080fd5b505af1158015610e75573d6000803e3d6000fd5b505050506040513d6020811015610e8b57600080fd5b5051600854909550851015610e9c57fe5b6008546000194301409450610eb29085906115ce565b92508251604051908082528060200260200182016040528015610edf578160200160208202803883390190505b509150600090505b8251811015610fbd576001548351600160a060020a0390911690635de038b1908990869085908110610f1557fe5b906020019060200201516040518363ffffffff1660e060020a0281526004018083600160a060020a0316600160a060020a0316815260200182815260200192505050602060405180830381600087803b158015610f7157600080fd5b505af1158015610f85573d6000803e3d6000fd5b505050506040513d6020811015610f9b57600080fd5b50518251839083908110610fab57fe5b60209081029091010152600101610ee7565b6000868152600e602090815260409091208351610fdc9285019061199d565b5060408051600160a060020a03891681526020810188905281517fe7dcea48e6f51d32be953021f71f6a212c680f1fadc9376a5aaf81ac5a2a448f929181900390910190a150505050505050565b60005433600160a060020a0390811691161461104557600080fd5b6009805460ff1916911515919091179055565b600b60205260009081526040902054600160a060020a031681565b60105481565b6000818152600c6020526040812054819060609081908390819060fe194301106110a257600080fd5b6000878152600b602052604090205433600160a060020a03908116911614806110dc57506000878152600c60205260409020546063194301115b15156110e757600080fd5b600260009054906101000a9004600160a060020a0316600160a060020a031663c487282c6040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561113a57600080fd5b505af115801561114e573d6000803e3d6000fd5b505050506040513d602081101561116457600080fd5b505160085490965086101561117557fe5b61117f3388611843565b6000878152600c6020526040902054600854904095506111a09086906115ce565b935083516040519080825280602002602001820160405280156111cd578160200160208202803883390190505b509250600091505b835182101561138d576001548451600160a060020a0390911690635de038b190339087908690811061120357fe5b906020019060200201516040518363ffffffff1660e060020a0281526004018083600160a060020a0316600160a060020a0316815260200182815260200192505050602060405180830381600087803b15801561125f57600080fd5b505af1158015611273573d6000803e3d6000fd5b505050506040513d602081101561128957600080fd5b5051835184908490811061129957fe5b60209081029091018101919091526000888152600f909152604090205460ff161515611382576002548451600160a060020a039091169063811dd0e2908690859081106112e257fe5b906020019060200201516040518263ffffffff1660e060020a02815260040180828152602001915050602060405180830381600087803b15801561132557600080fd5b505af1158015611339573d6000803e3d6000fd5b505050506040513d602081101561134f57600080fd5b505160055460035491925060649102600160a060020a0383166000908152600a6020526040902080549290910490910190555b6001909101906111d5565b6000878152600e6020908152604090912084516113ac9286019061199d565b506000878152600f602052604090205460ff1615156001141561147057601154600754604080517fa9059cbb000000000000000000000000000000000000000000000000000000008152600160a060020a033381166004830152600a90930460248201529051919092169163a9059cbb9160448083019260209291908290030181600087803b15801561143e57600080fd5b505af1158015611452573d6000803e3d6000fd5b505050506040513d602081101561146857600080fd5b506114cb9050565b6006546003546064910233600160a060020a03166000908152600a6020526040902080549290910490910190556004546003546064910260008054600160a060020a03168152600a6020526040902080549290910490910190555b6040805188815290517f991a35b34139bb4a4bb1a41e31b546b0eff0745f4523f53fc60caba9acfa911a9181900360200190a150505050505050565b600c6020526000908152604090205481565b60065481565b60035481565b60095460ff1681565b60005433600160a060020a0390811691161461154957600080fd5b600160a060020a038116151561155e57600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b6000903b1190565b606080600080600085604051908082528060200260200182016040528015611600578160200160208202803883390190505b509350600260009054906101000a9004600160a060020a0316600160a060020a031663913953526040518163ffffffff1660e060020a028152600401602060405180830381600087803b15801561165657600080fd5b505af115801561166a573d6000803e3d6000fd5b505050506040513d602081101561168057600080fd5b50516001019250600091505b8582101561183857601054600154604080517f70a08231000000000000000000000000000000000000000000000000000000008152600160a060020a03338116600483015291518b948794909316916370a082319160248083019260209291908290030181600087803b15801561170257600080fd5b505af1158015611716573d6000803e3d6000fd5b505050506040513d602081101561172c57600080fd5b50516040805194855260208501939093528383019190915260608301526c01000000000000000000000000600160a060020a033316026080830152519081900360940190209650828781151561177e57fe5b600254604080517f0e7eca0e00000000000000000000000000000000000000000000000000000000815293909206600484018190529151919350600160a060020a031691630e7eca0e9160248083019260209291908290030181600087803b1580156117e957600080fd5b505af11580156117fd573d6000803e3d6000fd5b505050506040513d602081101561181357600080fd5b5051845185908490811061182357fe5b6020908102909101015260019091019061168c565b509195945050505050565b600160a060020a0382166000908152600d6020908152604080832054848452600b9092528220805473ffffffffffffffffffffffffffffffffffffffff19169055905b8181101561199757600160a060020a0384166000908152600d602052604090208054849190839081106118b557fe5b9060005260206000200154141561198f57600160a060020a0384166000908152600d60205260409020805460001984019081106118ee57fe5b6000918252602080832090910154600160a060020a0387168352600d909152604090912080548390811061191e57fe5b6000918252602080832090910192909255600160a060020a0386168152600d909152604090208054600019840190811061195457fe5b60009182526020808320909101829055600160a060020a0386168252600d9052604090208054906119899060001983016119e8565b50611997565b600101611886565b50505050565b8280548282559060005260206000209081019282156119d8579160200282015b828111156119d85782518255916020019190600101906119bd565b506119e4929150611a11565b5090565b815481835581811115611a0c57600083815260209020611a0c918101908301611a11565b505050565b610c9891905b808211156119e45760008155600101611a175600a165627a7a72305820aa4142485a9cc637af7fed1fa4e65a0210f792e50f25d49f5f5a4392d8973b520029`

// DeployBooster deploys a new Ethereum contract, binding an instance of Booster to it.
func DeployBooster(auth *bind.TransactOpts, backend bind.ContractBackend, _cardAddress common.Address) (common.Address, *types.Transaction, *Booster, error) {
	parsed, err := abi.JSON(strings.NewReader(BoosterABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(BoosterBin), backend, _cardAddress)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &Booster{BoosterCaller: BoosterCaller{contract: contract}, BoosterTransactor: BoosterTransactor{contract: contract}, BoosterFilterer: BoosterFilterer{contract: contract}}, nil
}

// Booster is an auto generated Go binding around an Ethereum contract.
type Booster struct {
	BoosterCaller     // Read-only binding to the contract
	BoosterTransactor // Write-only binding to the contract
	BoosterFilterer   // Log filterer for contract events
}

// BoosterCaller is an auto generated read-only Go binding around an Ethereum contract.
type BoosterCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// BoosterTransactor is an auto generated write-only Go binding around an Ethereum contract.
type BoosterTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// BoosterFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type BoosterFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// BoosterSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type BoosterSession struct {
	Contract     *Booster          // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// BoosterCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type BoosterCallerSession struct {
	Contract *BoosterCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts  // Call options to use throughout this session
}

// BoosterTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type BoosterTransactorSession struct {
	Contract     *BoosterTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts  // Transaction auth options to use throughout this session
}

// BoosterRaw is an auto generated low-level Go binding around an Ethereum contract.
type BoosterRaw struct {
	Contract *Booster // Generic contract binding to access the raw methods on
}

// BoosterCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type BoosterCallerRaw struct {
	Contract *BoosterCaller // Generic read-only contract binding to access the raw methods on
}

// BoosterTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type BoosterTransactorRaw struct {
	Contract *BoosterTransactor // Generic write-only contract binding to access the raw methods on
}

// NewBooster creates a new instance of Booster, bound to a specific deployed contract.
func NewBooster(address common.Address, backend bind.ContractBackend) (*Booster, error) {
	contract, err := bindBooster(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Booster{BoosterCaller: BoosterCaller{contract: contract}, BoosterTransactor: BoosterTransactor{contract: contract}, BoosterFilterer: BoosterFilterer{contract: contract}}, nil
}

// NewBoosterCaller creates a new read-only instance of Booster, bound to a specific deployed contract.
func NewBoosterCaller(address common.Address, caller bind.ContractCaller) (*BoosterCaller, error) {
	contract, err := bindBooster(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &BoosterCaller{contract: contract}, nil
}

// NewBoosterTransactor creates a new write-only instance of Booster, bound to a specific deployed contract.
func NewBoosterTransactor(address common.Address, transactor bind.ContractTransactor) (*BoosterTransactor, error) {
	contract, err := bindBooster(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &BoosterTransactor{contract: contract}, nil
}

// NewBoosterFilterer creates a new log filterer instance of Booster, bound to a specific deployed contract.
func NewBoosterFilterer(address common.Address, filterer bind.ContractFilterer) (*BoosterFilterer, error) {
	contract, err := bindBooster(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &BoosterFilterer{contract: contract}, nil
}

// bindBooster binds a generic wrapper to an already deployed contract.
func bindBooster(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(BoosterABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Booster *BoosterRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _Booster.Contract.BoosterCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Booster *BoosterRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Booster.Contract.BoosterTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Booster *BoosterRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Booster.Contract.BoosterTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Booster *BoosterCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _Booster.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Booster *BoosterTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Booster.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Booster *BoosterTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Booster.Contract.contract.Transact(opts, method, params...)
}

// BOOSTERPRICE is a free data retrieval call binding the contract method 0xd035770c.
//
// Solidity: function BOOSTER_PRICE() constant returns(uint256)
func (_Booster *BoosterCaller) BOOSTERPRICE(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "BOOSTER_PRICE")
	return *ret0, err
}

// BOOSTERPRICE is a free data retrieval call binding the contract method 0xd035770c.
//
// Solidity: function BOOSTER_PRICE() constant returns(uint256)
func (_Booster *BoosterSession) BOOSTERPRICE() (*big.Int, error) {
	return _Booster.Contract.BOOSTERPRICE(&_Booster.CallOpts)
}

// BOOSTERPRICE is a free data retrieval call binding the contract method 0xd035770c.
//
// Solidity: function BOOSTER_PRICE() constant returns(uint256)
func (_Booster *BoosterCallerSession) BOOSTERPRICE() (*big.Int, error) {
	return _Booster.Contract.BOOSTERPRICE(&_Booster.CallOpts)
}

// BUYWITHREVEAL is a free data retrieval call binding the contract method 0xd1b10712.
//
// Solidity: function BUY_WITH_REVEAL() constant returns(bool)
func (_Booster *BoosterCaller) BUYWITHREVEAL(opts *bind.CallOpts) (bool, error) {
	var (
		ret0 = new(bool)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "BUY_WITH_REVEAL")
	return *ret0, err
}

// BUYWITHREVEAL is a free data retrieval call binding the contract method 0xd1b10712.
//
// Solidity: function BUY_WITH_REVEAL() constant returns(bool)
func (_Booster *BoosterSession) BUYWITHREVEAL() (bool, error) {
	return _Booster.Contract.BUYWITHREVEAL(&_Booster.CallOpts)
}

// BUYWITHREVEAL is a free data retrieval call binding the contract method 0xd1b10712.
//
// Solidity: function BUY_WITH_REVEAL() constant returns(bool)
func (_Booster *BoosterCallerSession) BUYWITHREVEAL() (bool, error) {
	return _Booster.Contract.BUYWITHREVEAL(&_Booster.CallOpts)
}

// CARDARTISTPERCENTAGE is a free data retrieval call binding the contract method 0x3492db44.
//
// Solidity: function CARD_ARTIST_PERCENTAGE() constant returns(uint256)
func (_Booster *BoosterCaller) CARDARTISTPERCENTAGE(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "CARD_ARTIST_PERCENTAGE")
	return *ret0, err
}

// CARDARTISTPERCENTAGE is a free data retrieval call binding the contract method 0x3492db44.
//
// Solidity: function CARD_ARTIST_PERCENTAGE() constant returns(uint256)
func (_Booster *BoosterSession) CARDARTISTPERCENTAGE() (*big.Int, error) {
	return _Booster.Contract.CARDARTISTPERCENTAGE(&_Booster.CallOpts)
}

// CARDARTISTPERCENTAGE is a free data retrieval call binding the contract method 0x3492db44.
//
// Solidity: function CARD_ARTIST_PERCENTAGE() constant returns(uint256)
func (_Booster *BoosterCallerSession) CARDARTISTPERCENTAGE() (*big.Int, error) {
	return _Booster.Contract.CARDARTISTPERCENTAGE(&_Booster.CallOpts)
}

// OWNERPERCENTAGE is a free data retrieval call binding the contract method 0x9d5fbb8e.
//
// Solidity: function OWNER_PERCENTAGE() constant returns(uint256)
func (_Booster *BoosterCaller) OWNERPERCENTAGE(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "OWNER_PERCENTAGE")
	return *ret0, err
}

// OWNERPERCENTAGE is a free data retrieval call binding the contract method 0x9d5fbb8e.
//
// Solidity: function OWNER_PERCENTAGE() constant returns(uint256)
func (_Booster *BoosterSession) OWNERPERCENTAGE() (*big.Int, error) {
	return _Booster.Contract.OWNERPERCENTAGE(&_Booster.CallOpts)
}

// OWNERPERCENTAGE is a free data retrieval call binding the contract method 0x9d5fbb8e.
//
// Solidity: function OWNER_PERCENTAGE() constant returns(uint256)
func (_Booster *BoosterCallerSession) OWNERPERCENTAGE() (*big.Int, error) {
	return _Booster.Contract.OWNERPERCENTAGE(&_Booster.CallOpts)
}

// REVEALERPERCENTAGE is a free data retrieval call binding the contract method 0xcedb8e84.
//
// Solidity: function REVEALER_PERCENTAGE() constant returns(uint256)
func (_Booster *BoosterCaller) REVEALERPERCENTAGE(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "REVEALER_PERCENTAGE")
	return *ret0, err
}

// REVEALERPERCENTAGE is a free data retrieval call binding the contract method 0xcedb8e84.
//
// Solidity: function REVEALER_PERCENTAGE() constant returns(uint256)
func (_Booster *BoosterSession) REVEALERPERCENTAGE() (*big.Int, error) {
	return _Booster.Contract.REVEALERPERCENTAGE(&_Booster.CallOpts)
}

// REVEALERPERCENTAGE is a free data retrieval call binding the contract method 0xcedb8e84.
//
// Solidity: function REVEALER_PERCENTAGE() constant returns(uint256)
func (_Booster *BoosterCallerSession) REVEALERPERCENTAGE() (*big.Int, error) {
	return _Booster.Contract.REVEALERPERCENTAGE(&_Booster.CallOpts)
}

// BlockNumbers is a free data retrieval call binding the contract method 0xcd8bff33.
//
// Solidity: function blockNumbers( uint256) constant returns(uint256)
func (_Booster *BoosterCaller) BlockNumbers(opts *bind.CallOpts, arg0 *big.Int) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "blockNumbers", arg0)
	return *ret0, err
}

// BlockNumbers is a free data retrieval call binding the contract method 0xcd8bff33.
//
// Solidity: function blockNumbers( uint256) constant returns(uint256)
func (_Booster *BoosterSession) BlockNumbers(arg0 *big.Int) (*big.Int, error) {
	return _Booster.Contract.BlockNumbers(&_Booster.CallOpts, arg0)
}

// BlockNumbers is a free data retrieval call binding the contract method 0xcd8bff33.
//
// Solidity: function blockNumbers( uint256) constant returns(uint256)
func (_Booster *BoosterCallerSession) BlockNumbers(arg0 *big.Int) (*big.Int, error) {
	return _Booster.Contract.BlockNumbers(&_Booster.CallOpts, arg0)
}

// BoosterOwners is a free data retrieval call binding the contract method 0xc48cd76d.
//
// Solidity: function boosterOwners( uint256) constant returns(address)
func (_Booster *BoosterCaller) BoosterOwners(opts *bind.CallOpts, arg0 *big.Int) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "boosterOwners", arg0)
	return *ret0, err
}

// BoosterOwners is a free data retrieval call binding the contract method 0xc48cd76d.
//
// Solidity: function boosterOwners( uint256) constant returns(address)
func (_Booster *BoosterSession) BoosterOwners(arg0 *big.Int) (common.Address, error) {
	return _Booster.Contract.BoosterOwners(&_Booster.CallOpts, arg0)
}

// BoosterOwners is a free data retrieval call binding the contract method 0xc48cd76d.
//
// Solidity: function boosterOwners( uint256) constant returns(address)
func (_Booster *BoosterCallerSession) BoosterOwners(arg0 *big.Int) (common.Address, error) {
	return _Booster.Contract.BoosterOwners(&_Booster.CallOpts, arg0)
}

// Boosters is a free data retrieval call binding the contract method 0x3cd949dd.
//
// Solidity: function boosters( uint256,  uint256) constant returns(uint256)
func (_Booster *BoosterCaller) Boosters(opts *bind.CallOpts, arg0 *big.Int, arg1 *big.Int) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "boosters", arg0, arg1)
	return *ret0, err
}

// Boosters is a free data retrieval call binding the contract method 0x3cd949dd.
//
// Solidity: function boosters( uint256,  uint256) constant returns(uint256)
func (_Booster *BoosterSession) Boosters(arg0 *big.Int, arg1 *big.Int) (*big.Int, error) {
	return _Booster.Contract.Boosters(&_Booster.CallOpts, arg0, arg1)
}

// Boosters is a free data retrieval call binding the contract method 0x3cd949dd.
//
// Solidity: function boosters( uint256,  uint256) constant returns(uint256)
func (_Booster *BoosterCallerSession) Boosters(arg0 *big.Int, arg1 *big.Int) (*big.Int, error) {
	return _Booster.Contract.Boosters(&_Booster.CallOpts, arg0, arg1)
}

// BoughtWithToken is a free data retrieval call binding the contract method 0x72bf765b.
//
// Solidity: function boughtWithToken( uint256) constant returns(bool)
func (_Booster *BoosterCaller) BoughtWithToken(opts *bind.CallOpts, arg0 *big.Int) (bool, error) {
	var (
		ret0 = new(bool)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "boughtWithToken", arg0)
	return *ret0, err
}

// BoughtWithToken is a free data retrieval call binding the contract method 0x72bf765b.
//
// Solidity: function boughtWithToken( uint256) constant returns(bool)
func (_Booster *BoosterSession) BoughtWithToken(arg0 *big.Int) (bool, error) {
	return _Booster.Contract.BoughtWithToken(&_Booster.CallOpts, arg0)
}

// BoughtWithToken is a free data retrieval call binding the contract method 0x72bf765b.
//
// Solidity: function boughtWithToken( uint256) constant returns(bool)
func (_Booster *BoosterCallerSession) BoughtWithToken(arg0 *big.Int) (bool, error) {
	return _Booster.Contract.BoughtWithToken(&_Booster.CallOpts, arg0)
}

// CardPackToken is a free data retrieval call binding the contract method 0x5cee7d4d.
//
// Solidity: function cardPackToken() constant returns(address)
func (_Booster *BoosterCaller) CardPackToken(opts *bind.CallOpts) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "cardPackToken")
	return *ret0, err
}

// CardPackToken is a free data retrieval call binding the contract method 0x5cee7d4d.
//
// Solidity: function cardPackToken() constant returns(address)
func (_Booster *BoosterSession) CardPackToken() (common.Address, error) {
	return _Booster.Contract.CardPackToken(&_Booster.CallOpts)
}

// CardPackToken is a free data retrieval call binding the contract method 0x5cee7d4d.
//
// Solidity: function cardPackToken() constant returns(address)
func (_Booster *BoosterCallerSession) CardPackToken() (common.Address, error) {
	return _Booster.Contract.CardPackToken(&_Booster.CallOpts)
}

// GetCardFromBooster is a free data retrieval call binding the contract method 0x063d44fd.
//
// Solidity: function getCardFromBooster(_boosterId uint256) constant returns(uint256[])
func (_Booster *BoosterCaller) GetCardFromBooster(opts *bind.CallOpts, _boosterId *big.Int) ([]*big.Int, error) {
	var (
		ret0 = new([]*big.Int)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "getCardFromBooster", _boosterId)
	return *ret0, err
}

// GetCardFromBooster is a free data retrieval call binding the contract method 0x063d44fd.
//
// Solidity: function getCardFromBooster(_boosterId uint256) constant returns(uint256[])
func (_Booster *BoosterSession) GetCardFromBooster(_boosterId *big.Int) ([]*big.Int, error) {
	return _Booster.Contract.GetCardFromBooster(&_Booster.CallOpts, _boosterId)
}

// GetCardFromBooster is a free data retrieval call binding the contract method 0x063d44fd.
//
// Solidity: function getCardFromBooster(_boosterId uint256) constant returns(uint256[])
func (_Booster *BoosterCallerSession) GetCardFromBooster(_boosterId *big.Int) ([]*big.Int, error) {
	return _Booster.Contract.GetCardFromBooster(&_Booster.CallOpts, _boosterId)
}

// GetMyBoosters is a free data retrieval call binding the contract method 0xa4788ed8.
//
// Solidity: function getMyBoosters() constant returns(uint256[])
func (_Booster *BoosterCaller) GetMyBoosters(opts *bind.CallOpts) ([]*big.Int, error) {
	var (
		ret0 = new([]*big.Int)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "getMyBoosters")
	return *ret0, err
}

// GetMyBoosters is a free data retrieval call binding the contract method 0xa4788ed8.
//
// Solidity: function getMyBoosters() constant returns(uint256[])
func (_Booster *BoosterSession) GetMyBoosters() ([]*big.Int, error) {
	return _Booster.Contract.GetMyBoosters(&_Booster.CallOpts)
}

// GetMyBoosters is a free data retrieval call binding the contract method 0xa4788ed8.
//
// Solidity: function getMyBoosters() constant returns(uint256[])
func (_Booster *BoosterCallerSession) GetMyBoosters() ([]*big.Int, error) {
	return _Booster.Contract.GetMyBoosters(&_Booster.CallOpts)
}

// MetadataContract is a free data retrieval call binding the contract method 0x35209821.
//
// Solidity: function metadataContract() constant returns(address)
func (_Booster *BoosterCaller) MetadataContract(opts *bind.CallOpts) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "metadataContract")
	return *ret0, err
}

// MetadataContract is a free data retrieval call binding the contract method 0x35209821.
//
// Solidity: function metadataContract() constant returns(address)
func (_Booster *BoosterSession) MetadataContract() (common.Address, error) {
	return _Booster.Contract.MetadataContract(&_Booster.CallOpts)
}

// MetadataContract is a free data retrieval call binding the contract method 0x35209821.
//
// Solidity: function metadataContract() constant returns(address)
func (_Booster *BoosterCallerSession) MetadataContract() (common.Address, error) {
	return _Booster.Contract.MetadataContract(&_Booster.CallOpts)
}

// NumOfBoosters is a free data retrieval call binding the contract method 0xcb841dcd.
//
// Solidity: function numOfBoosters() constant returns(uint256)
func (_Booster *BoosterCaller) NumOfBoosters(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "numOfBoosters")
	return *ret0, err
}

// NumOfBoosters is a free data retrieval call binding the contract method 0xcb841dcd.
//
// Solidity: function numOfBoosters() constant returns(uint256)
func (_Booster *BoosterSession) NumOfBoosters() (*big.Int, error) {
	return _Booster.Contract.NumOfBoosters(&_Booster.CallOpts)
}

// NumOfBoosters is a free data retrieval call binding the contract method 0xcb841dcd.
//
// Solidity: function numOfBoosters() constant returns(uint256)
func (_Booster *BoosterCallerSession) NumOfBoosters() (*big.Int, error) {
	return _Booster.Contract.NumOfBoosters(&_Booster.CallOpts)
}

// NumberOfCardsInBooster is a free data retrieval call binding the contract method 0x42ec2c5f.
//
// Solidity: function numberOfCardsInBooster() constant returns(uint256)
func (_Booster *BoosterCaller) NumberOfCardsInBooster(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "numberOfCardsInBooster")
	return *ret0, err
}

// NumberOfCardsInBooster is a free data retrieval call binding the contract method 0x42ec2c5f.
//
// Solidity: function numberOfCardsInBooster() constant returns(uint256)
func (_Booster *BoosterSession) NumberOfCardsInBooster() (*big.Int, error) {
	return _Booster.Contract.NumberOfCardsInBooster(&_Booster.CallOpts)
}

// NumberOfCardsInBooster is a free data retrieval call binding the contract method 0x42ec2c5f.
//
// Solidity: function numberOfCardsInBooster() constant returns(uint256)
func (_Booster *BoosterCallerSession) NumberOfCardsInBooster() (*big.Int, error) {
	return _Booster.Contract.NumberOfCardsInBooster(&_Booster.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_Booster *BoosterCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "owner")
	return *ret0, err
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_Booster *BoosterSession) Owner() (common.Address, error) {
	return _Booster.Contract.Owner(&_Booster.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_Booster *BoosterCallerSession) Owner() (common.Address, error) {
	return _Booster.Contract.Owner(&_Booster.CallOpts)
}

// SeleneanCards is a free data retrieval call binding the contract method 0x93c52162.
//
// Solidity: function seleneanCards() constant returns(address)
func (_Booster *BoosterCaller) SeleneanCards(opts *bind.CallOpts) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "seleneanCards")
	return *ret0, err
}

// SeleneanCards is a free data retrieval call binding the contract method 0x93c52162.
//
// Solidity: function seleneanCards() constant returns(address)
func (_Booster *BoosterSession) SeleneanCards() (common.Address, error) {
	return _Booster.Contract.SeleneanCards(&_Booster.CallOpts)
}

// SeleneanCards is a free data retrieval call binding the contract method 0x93c52162.
//
// Solidity: function seleneanCards() constant returns(address)
func (_Booster *BoosterCallerSession) SeleneanCards() (common.Address, error) {
	return _Booster.Contract.SeleneanCards(&_Booster.CallOpts)
}

// UnrevealedBoosters is a free data retrieval call binding the contract method 0xb2582335.
//
// Solidity: function unrevealedBoosters( address,  uint256) constant returns(uint256)
func (_Booster *BoosterCaller) UnrevealedBoosters(opts *bind.CallOpts, arg0 common.Address, arg1 *big.Int) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "unrevealedBoosters", arg0, arg1)
	return *ret0, err
}

// UnrevealedBoosters is a free data retrieval call binding the contract method 0xb2582335.
//
// Solidity: function unrevealedBoosters( address,  uint256) constant returns(uint256)
func (_Booster *BoosterSession) UnrevealedBoosters(arg0 common.Address, arg1 *big.Int) (*big.Int, error) {
	return _Booster.Contract.UnrevealedBoosters(&_Booster.CallOpts, arg0, arg1)
}

// UnrevealedBoosters is a free data retrieval call binding the contract method 0xb2582335.
//
// Solidity: function unrevealedBoosters( address,  uint256) constant returns(uint256)
func (_Booster *BoosterCallerSession) UnrevealedBoosters(arg0 common.Address, arg1 *big.Int) (*big.Int, error) {
	return _Booster.Contract.UnrevealedBoosters(&_Booster.CallOpts, arg0, arg1)
}

// WithdrawBalance is a free data retrieval call binding the contract method 0x756af45f.
//
// Solidity: function withdrawBalance( address) constant returns(uint256)
func (_Booster *BoosterCaller) WithdrawBalance(opts *bind.CallOpts, arg0 common.Address) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Booster.contract.Call(opts, out, "withdrawBalance", arg0)
	return *ret0, err
}

// WithdrawBalance is a free data retrieval call binding the contract method 0x756af45f.
//
// Solidity: function withdrawBalance( address) constant returns(uint256)
func (_Booster *BoosterSession) WithdrawBalance(arg0 common.Address) (*big.Int, error) {
	return _Booster.Contract.WithdrawBalance(&_Booster.CallOpts, arg0)
}

// WithdrawBalance is a free data retrieval call binding the contract method 0x756af45f.
//
// Solidity: function withdrawBalance( address) constant returns(uint256)
func (_Booster *BoosterCallerSession) WithdrawBalance(arg0 common.Address) (*big.Int, error) {
	return _Booster.Contract.WithdrawBalance(&_Booster.CallOpts, arg0)
}

// AddCardPackToken is a paid mutator transaction binding the contract method 0x10a57ca0.
//
// Solidity: function addCardPackToken(_cardPackTokenAddress address) returns()
func (_Booster *BoosterTransactor) AddCardPackToken(opts *bind.TransactOpts, _cardPackTokenAddress common.Address) (*types.Transaction, error) {
	return _Booster.contract.Transact(opts, "addCardPackToken", _cardPackTokenAddress)
}

// AddCardPackToken is a paid mutator transaction binding the contract method 0x10a57ca0.
//
// Solidity: function addCardPackToken(_cardPackTokenAddress address) returns()
func (_Booster *BoosterSession) AddCardPackToken(_cardPackTokenAddress common.Address) (*types.Transaction, error) {
	return _Booster.Contract.AddCardPackToken(&_Booster.TransactOpts, _cardPackTokenAddress)
}

// AddCardPackToken is a paid mutator transaction binding the contract method 0x10a57ca0.
//
// Solidity: function addCardPackToken(_cardPackTokenAddress address) returns()
func (_Booster *BoosterTransactorSession) AddCardPackToken(_cardPackTokenAddress common.Address) (*types.Transaction, error) {
	return _Booster.Contract.AddCardPackToken(&_Booster.TransactOpts, _cardPackTokenAddress)
}

// AddMetadataContract is a paid mutator transaction binding the contract method 0xb05120b7.
//
// Solidity: function addMetadataContract(_metadataContract address) returns()
func (_Booster *BoosterTransactor) AddMetadataContract(opts *bind.TransactOpts, _metadataContract common.Address) (*types.Transaction, error) {
	return _Booster.contract.Transact(opts, "addMetadataContract", _metadataContract)
}

// AddMetadataContract is a paid mutator transaction binding the contract method 0xb05120b7.
//
// Solidity: function addMetadataContract(_metadataContract address) returns()
func (_Booster *BoosterSession) AddMetadataContract(_metadataContract common.Address) (*types.Transaction, error) {
	return _Booster.Contract.AddMetadataContract(&_Booster.TransactOpts, _metadataContract)
}

// AddMetadataContract is a paid mutator transaction binding the contract method 0xb05120b7.
//
// Solidity: function addMetadataContract(_metadataContract address) returns()
func (_Booster *BoosterTransactorSession) AddMetadataContract(_metadataContract common.Address) (*types.Transaction, error) {
	return _Booster.Contract.AddMetadataContract(&_Booster.TransactOpts, _metadataContract)
}

// BuyBooster is a paid mutator transaction binding the contract method 0x0c7c0c0f.
//
// Solidity: function buyBooster() returns()
func (_Booster *BoosterTransactor) BuyBooster(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Booster.contract.Transact(opts, "buyBooster")
}

// BuyBooster is a paid mutator transaction binding the contract method 0x0c7c0c0f.
//
// Solidity: function buyBooster() returns()
func (_Booster *BoosterSession) BuyBooster() (*types.Transaction, error) {
	return _Booster.Contract.BuyBooster(&_Booster.TransactOpts)
}

// BuyBooster is a paid mutator transaction binding the contract method 0x0c7c0c0f.
//
// Solidity: function buyBooster() returns()
func (_Booster *BoosterTransactorSession) BuyBooster() (*types.Transaction, error) {
	return _Booster.Contract.BuyBooster(&_Booster.TransactOpts)
}

// BuyBoosterWithToken is a paid mutator transaction binding the contract method 0x7f5e409c.
//
// Solidity: function buyBoosterWithToken(_to address) returns()
func (_Booster *BoosterTransactor) BuyBoosterWithToken(opts *bind.TransactOpts, _to common.Address) (*types.Transaction, error) {
	return _Booster.contract.Transact(opts, "buyBoosterWithToken", _to)
}

// BuyBoosterWithToken is a paid mutator transaction binding the contract method 0x7f5e409c.
//
// Solidity: function buyBoosterWithToken(_to address) returns()
func (_Booster *BoosterSession) BuyBoosterWithToken(_to common.Address) (*types.Transaction, error) {
	return _Booster.Contract.BuyBoosterWithToken(&_Booster.TransactOpts, _to)
}

// BuyBoosterWithToken is a paid mutator transaction binding the contract method 0x7f5e409c.
//
// Solidity: function buyBoosterWithToken(_to address) returns()
func (_Booster *BoosterTransactorSession) BuyBoosterWithToken(_to common.Address) (*types.Transaction, error) {
	return _Booster.Contract.BuyBoosterWithToken(&_Booster.TransactOpts, _to)
}

// BuyInstantBooster is a paid mutator transaction binding the contract method 0x1049caeb.
//
// Solidity: function buyInstantBooster() returns()
func (_Booster *BoosterTransactor) BuyInstantBooster(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Booster.contract.Transact(opts, "buyInstantBooster")
}

// BuyInstantBooster is a paid mutator transaction binding the contract method 0x1049caeb.
//
// Solidity: function buyInstantBooster() returns()
func (_Booster *BoosterSession) BuyInstantBooster() (*types.Transaction, error) {
	return _Booster.Contract.BuyInstantBooster(&_Booster.TransactOpts)
}

// BuyInstantBooster is a paid mutator transaction binding the contract method 0x1049caeb.
//
// Solidity: function buyInstantBooster() returns()
func (_Booster *BoosterTransactorSession) BuyInstantBooster() (*types.Transaction, error) {
	return _Booster.Contract.BuyInstantBooster(&_Booster.TransactOpts)
}

// BuyInstantBoosterWithToken is a paid mutator transaction binding the contract method 0xb3e02f62.
//
// Solidity: function buyInstantBoosterWithToken(_to address) returns()
func (_Booster *BoosterTransactor) BuyInstantBoosterWithToken(opts *bind.TransactOpts, _to common.Address) (*types.Transaction, error) {
	return _Booster.contract.Transact(opts, "buyInstantBoosterWithToken", _to)
}

// BuyInstantBoosterWithToken is a paid mutator transaction binding the contract method 0xb3e02f62.
//
// Solidity: function buyInstantBoosterWithToken(_to address) returns()
func (_Booster *BoosterSession) BuyInstantBoosterWithToken(_to common.Address) (*types.Transaction, error) {
	return _Booster.Contract.BuyInstantBoosterWithToken(&_Booster.TransactOpts, _to)
}

// BuyInstantBoosterWithToken is a paid mutator transaction binding the contract method 0xb3e02f62.
//
// Solidity: function buyInstantBoosterWithToken(_to address) returns()
func (_Booster *BoosterTransactorSession) BuyInstantBoosterWithToken(_to common.Address) (*types.Transaction, error) {
	return _Booster.Contract.BuyInstantBoosterWithToken(&_Booster.TransactOpts, _to)
}

// RevealBooster is a paid mutator transaction binding the contract method 0xcd30fc6f.
//
// Solidity: function revealBooster(_boosterId uint256) returns()
func (_Booster *BoosterTransactor) RevealBooster(opts *bind.TransactOpts, _boosterId *big.Int) (*types.Transaction, error) {
	return _Booster.contract.Transact(opts, "revealBooster", _boosterId)
}

// RevealBooster is a paid mutator transaction binding the contract method 0xcd30fc6f.
//
// Solidity: function revealBooster(_boosterId uint256) returns()
func (_Booster *BoosterSession) RevealBooster(_boosterId *big.Int) (*types.Transaction, error) {
	return _Booster.Contract.RevealBooster(&_Booster.TransactOpts, _boosterId)
}

// RevealBooster is a paid mutator transaction binding the contract method 0xcd30fc6f.
//
// Solidity: function revealBooster(_boosterId uint256) returns()
func (_Booster *BoosterTransactorSession) RevealBooster(_boosterId *big.Int) (*types.Transaction, error) {
	return _Booster.Contract.RevealBooster(&_Booster.TransactOpts, _boosterId)
}

// SetBytWithReveal is a paid mutator transaction binding the contract method 0xbe5056ea.
//
// Solidity: function setBytWithReveal(_buyWithReveal bool) returns()
func (_Booster *BoosterTransactor) SetBytWithReveal(opts *bind.TransactOpts, _buyWithReveal bool) (*types.Transaction, error) {
	return _Booster.contract.Transact(opts, "setBytWithReveal", _buyWithReveal)
}

// SetBytWithReveal is a paid mutator transaction binding the contract method 0xbe5056ea.
//
// Solidity: function setBytWithReveal(_buyWithReveal bool) returns()
func (_Booster *BoosterSession) SetBytWithReveal(_buyWithReveal bool) (*types.Transaction, error) {
	return _Booster.Contract.SetBytWithReveal(&_Booster.TransactOpts, _buyWithReveal)
}

// SetBytWithReveal is a paid mutator transaction binding the contract method 0xbe5056ea.
//
// Solidity: function setBytWithReveal(_buyWithReveal bool) returns()
func (_Booster *BoosterTransactorSession) SetBytWithReveal(_buyWithReveal bool) (*types.Transaction, error) {
	return _Booster.Contract.SetBytWithReveal(&_Booster.TransactOpts, _buyWithReveal)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_Booster *BoosterTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _Booster.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_Booster *BoosterSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Booster.Contract.TransferOwnership(&_Booster.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_Booster *BoosterTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Booster.Contract.TransferOwnership(&_Booster.TransactOpts, newOwner)
}

// Withdraw is a paid mutator transaction binding the contract method 0x3ccfd60b.
//
// Solidity: function withdraw() returns()
func (_Booster *BoosterTransactor) Withdraw(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Booster.contract.Transact(opts, "withdraw")
}

// Withdraw is a paid mutator transaction binding the contract method 0x3ccfd60b.
//
// Solidity: function withdraw() returns()
func (_Booster *BoosterSession) Withdraw() (*types.Transaction, error) {
	return _Booster.Contract.Withdraw(&_Booster.TransactOpts)
}

// Withdraw is a paid mutator transaction binding the contract method 0x3ccfd60b.
//
// Solidity: function withdraw() returns()
func (_Booster *BoosterTransactorSession) Withdraw() (*types.Transaction, error) {
	return _Booster.Contract.Withdraw(&_Booster.TransactOpts)
}

// BoosterBoosterBoughtIterator is returned from FilterBoosterBought and is used to iterate over the raw logs and unpacked data for BoosterBought events raised by the Booster contract.
type BoosterBoosterBoughtIterator struct {
	Event *BoosterBoosterBought // Event containing the contract specifics and raw log

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
func (it *BoosterBoosterBoughtIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(BoosterBoosterBought)
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
		it.Event = new(BoosterBoosterBought)
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
func (it *BoosterBoosterBoughtIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *BoosterBoosterBoughtIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// BoosterBoosterBought represents a BoosterBought event raised by the Booster contract.
type BoosterBoosterBought struct {
	User      common.Address
	BoosterId *big.Int
	Raw       types.Log // Blockchain specific contextual infos
}

// FilterBoosterBought is a free log retrieval operation binding the contract event 0x79cea4dba95ebbe0ec86e48d206fd19f2f40cbf6232e25f43e9af2dd7a99e82d.
//
// Solidity: e BoosterBought(user address, boosterId uint256)
func (_Booster *BoosterFilterer) FilterBoosterBought(opts *bind.FilterOpts) (*BoosterBoosterBoughtIterator, error) {

	logs, sub, err := _Booster.contract.FilterLogs(opts, "BoosterBought")
	if err != nil {
		return nil, err
	}
	return &BoosterBoosterBoughtIterator{contract: _Booster.contract, event: "BoosterBought", logs: logs, sub: sub}, nil
}

// WatchBoosterBought is a free log subscription operation binding the contract event 0x79cea4dba95ebbe0ec86e48d206fd19f2f40cbf6232e25f43e9af2dd7a99e82d.
//
// Solidity: e BoosterBought(user address, boosterId uint256)
func (_Booster *BoosterFilterer) WatchBoosterBought(opts *bind.WatchOpts, sink chan<- *BoosterBoosterBought) (event.Subscription, error) {

	logs, sub, err := _Booster.contract.WatchLogs(opts, "BoosterBought")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(BoosterBoosterBought)
				if err := _Booster.contract.UnpackLog(event, "BoosterBought", log); err != nil {
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

// BoosterBoosterInstantBoughtIterator is returned from FilterBoosterInstantBought and is used to iterate over the raw logs and unpacked data for BoosterInstantBought events raised by the Booster contract.
type BoosterBoosterInstantBoughtIterator struct {
	Event *BoosterBoosterInstantBought // Event containing the contract specifics and raw log

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
func (it *BoosterBoosterInstantBoughtIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(BoosterBoosterInstantBought)
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
		it.Event = new(BoosterBoosterInstantBought)
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
func (it *BoosterBoosterInstantBoughtIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *BoosterBoosterInstantBoughtIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// BoosterBoosterInstantBought represents a BoosterInstantBought event raised by the Booster contract.
type BoosterBoosterInstantBought struct {
	User      common.Address
	BoosterId *big.Int
	Raw       types.Log // Blockchain specific contextual infos
}

// FilterBoosterInstantBought is a free log retrieval operation binding the contract event 0xe7dcea48e6f51d32be953021f71f6a212c680f1fadc9376a5aaf81ac5a2a448f.
//
// Solidity: e BoosterInstantBought(user address, boosterId uint256)
func (_Booster *BoosterFilterer) FilterBoosterInstantBought(opts *bind.FilterOpts) (*BoosterBoosterInstantBoughtIterator, error) {

	logs, sub, err := _Booster.contract.FilterLogs(opts, "BoosterInstantBought")
	if err != nil {
		return nil, err
	}
	return &BoosterBoosterInstantBoughtIterator{contract: _Booster.contract, event: "BoosterInstantBought", logs: logs, sub: sub}, nil
}

// WatchBoosterInstantBought is a free log subscription operation binding the contract event 0xe7dcea48e6f51d32be953021f71f6a212c680f1fadc9376a5aaf81ac5a2a448f.
//
// Solidity: e BoosterInstantBought(user address, boosterId uint256)
func (_Booster *BoosterFilterer) WatchBoosterInstantBought(opts *bind.WatchOpts, sink chan<- *BoosterBoosterInstantBought) (event.Subscription, error) {

	logs, sub, err := _Booster.contract.WatchLogs(opts, "BoosterInstantBought")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(BoosterBoosterInstantBought)
				if err := _Booster.contract.UnpackLog(event, "BoosterInstantBought", log); err != nil {
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

// BoosterBoosterRevealedIterator is returned from FilterBoosterRevealed and is used to iterate over the raw logs and unpacked data for BoosterRevealed events raised by the Booster contract.
type BoosterBoosterRevealedIterator struct {
	Event *BoosterBoosterRevealed // Event containing the contract specifics and raw log

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
func (it *BoosterBoosterRevealedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(BoosterBoosterRevealed)
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
		it.Event = new(BoosterBoosterRevealed)
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
func (it *BoosterBoosterRevealedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *BoosterBoosterRevealedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// BoosterBoosterRevealed represents a BoosterRevealed event raised by the Booster contract.
type BoosterBoosterRevealed struct {
	BoosterId *big.Int
	Raw       types.Log // Blockchain specific contextual infos
}

// FilterBoosterRevealed is a free log retrieval operation binding the contract event 0x991a35b34139bb4a4bb1a41e31b546b0eff0745f4523f53fc60caba9acfa911a.
//
// Solidity: e BoosterRevealed(boosterId uint256)
func (_Booster *BoosterFilterer) FilterBoosterRevealed(opts *bind.FilterOpts) (*BoosterBoosterRevealedIterator, error) {

	logs, sub, err := _Booster.contract.FilterLogs(opts, "BoosterRevealed")
	if err != nil {
		return nil, err
	}
	return &BoosterBoosterRevealedIterator{contract: _Booster.contract, event: "BoosterRevealed", logs: logs, sub: sub}, nil
}

// WatchBoosterRevealed is a free log subscription operation binding the contract event 0x991a35b34139bb4a4bb1a41e31b546b0eff0745f4523f53fc60caba9acfa911a.
//
// Solidity: e BoosterRevealed(boosterId uint256)
func (_Booster *BoosterFilterer) WatchBoosterRevealed(opts *bind.WatchOpts, sink chan<- *BoosterBoosterRevealed) (event.Subscription, error) {

	logs, sub, err := _Booster.contract.WatchLogs(opts, "BoosterRevealed")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(BoosterBoosterRevealed)
				if err := _Booster.contract.UnpackLog(event, "BoosterRevealed", log); err != nil {
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

// BoosterOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the Booster contract.
type BoosterOwnershipTransferredIterator struct {
	Event *BoosterOwnershipTransferred // Event containing the contract specifics and raw log

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
func (it *BoosterOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(BoosterOwnershipTransferred)
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
		it.Event = new(BoosterOwnershipTransferred)
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
func (it *BoosterOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *BoosterOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// BoosterOwnershipTransferred represents a OwnershipTransferred event raised by the Booster contract.
type BoosterOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: e OwnershipTransferred(previousOwner indexed address, newOwner indexed address)
func (_Booster *BoosterFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*BoosterOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Booster.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &BoosterOwnershipTransferredIterator{contract: _Booster.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: e OwnershipTransferred(previousOwner indexed address, newOwner indexed address)
func (_Booster *BoosterFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *BoosterOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Booster.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(BoosterOwnershipTransferred)
				if err := _Booster.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
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

// CardMetadataABI is the input ABI used to generate the binding from.
const CardMetadataABI = "[{\"constant\":true,\"inputs\":[{\"name\":\"_rarity\",\"type\":\"uint256\"}],\"name\":\"getCardByRarity\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"rarities\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_metadataId\",\"type\":\"uint256\"}],\"name\":\"getArtist\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getMaxRandom\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getNumberOfCards\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_rarity\",\"type\":\"uint256\"},{\"name\":\"_ipfsHash\",\"type\":\"bytes32\"},{\"name\":\"_ipfsHashFunction\",\"type\":\"uint8\"},{\"name\":\"_ipfsSize\",\"type\":\"uint8\"},{\"name\":\"_artist\",\"type\":\"address\"}],\"name\":\"addCardMetadata\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_rarities\",\"type\":\"uint256[]\"}],\"name\":\"setNewRarities\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"properties\",\"outputs\":[{\"name\":\"id\",\"type\":\"uint256\"},{\"name\":\"rarity\",\"type\":\"uint256\"},{\"name\":\"ipfsHash\",\"type\":\"bytes32\"},{\"name\":\"ipfsHashFunction\",\"type\":\"uint8\"},{\"name\":\"ipfsSize\",\"type\":\"uint8\"},{\"name\":\"artist\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"}]"

// CardMetadataBin is the compiled bytecode used for deploying new contracts.
const CardMetadataBin = `0x608060405260008054600160a060020a033316600160a060020a0319909116179055610826806100306000396000f3006080604052600436106100a35763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e7eca0e81146100a857806317b8e1cf146100d2578063811dd0e2146100ea5780638da5cb5b1461011e5780639139535214610133578063c487282c14610148578063cf2411d41461015d578063df8cf6e214610192578063f2fde38b146101e7578063f7b1080814610208575b600080fd5b3480156100b457600080fd5b506100c060043561025f565b60408051918252519081900360200190f35b3480156100de57600080fd5b506100c060043561039b565b3480156100f657600080fd5b506101026004356103ba565b60408051600160a060020a039092168252519081900360200190f35b34801561012a57600080fd5b506101026103f4565b34801561013f57600080fd5b506100c0610403565b34801561015457600080fd5b506100c0610429565b34801561016957600080fd5b5061019060043560243560ff60443581169060643516600160a060020a036084351661042f565b005b34801561019e57600080fd5b5060408051602060048035808201358381028086018501909652808552610190953695939460249493850192918291850190849080828437509497506106059650505050505050565b3480156101f357600080fd5b50610190600160a060020a036004351661070c565b34801561021457600080fd5b506102206004356107a4565b6040805196875260208701959095528585019390935260ff9182166060860152166080840152600160a060020a031660a0830152519081900360c00190f35b60028054600091829182918291600019810190811061027a57fe5b9060005260206000200154851115151561029357600080fd5b50506002805460001901915060009082045b8282116103935760028383010490506002818154811015156102c357fe5b90600052602060002001548511158015610300575080158061030057506002805460001983019081106102f257fe5b906000526020600020015485115b1561030d57809350610393565b600280548290811061031b57fe5b90600052602060002001548511801561034f5750600280546001830190811061034057fe5b90600052602060002001548511155b1561035f57806001019350610393565b600280548290811061036d57fe5b906000526020600020015485101561038a5760018103925061038e565b8091505b6102a5565b505050919050565b60028054829081106103a957fe5b600091825260209091200154905081565b60006001828154811015156103cb57fe5b6000918252602090912060049091020160030154620100009004600160a060020a031692915050565b600054600160a060020a031681565b6002805460009190600019810190811061041957fe5b9060005260206000200154905090565b60015490565b6000805433600160a060020a0390811691161461044b57600080fd5b5060015480151561049057600280546001810182556000919091527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace018690556104c5565b600280600183038154811015156104a357fe5b6000918252602080832090910154835460018101855593835291209088019101555b6040805160c08101825291825260208201968752810194855260ff9384166060820190815292841660808201908152600160a060020a0392831660a08301908152600180548082018255600091909152925160049093027fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf681019390935596517fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf783015594517fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf882015591517fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf9909201805494519551909116620100000275ffffffffffffffffffffffffffffffffffffffff0000199584166101000261ff00199390941660ff1990951694909417919091169190911792909216179055565b6000805433600160a060020a0390811691161461062157600080fd5b60025482511461063057600080fd5b81600081518110151561063f57fe5b906020019060200201516002600081548110151561065957fe5b6000918252602090912001555060015b81518110156107085760028054600019830190811061068457fe5b9060005260206000200154828281518110151561069d57fe5b90602001906020020151016002828154811015156106b757fe5b60009182526020909120015581518290829081106106d157fe5b906020019060200201516001828154811015156106ea57fe5b60009182526020909120600160049092020181019190915501610669565b5050565b60005433600160a060020a0390811691161461072757600080fd5b600160a060020a038116151561073c57600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b60018054829081106107b257fe5b60009182526020909120600490910201805460018201546002830154600390930154919350919060ff80821691610100810490911690620100009004600160a060020a0316865600a165627a7a7230582002c8a9238a97be6b132cca719cbf2d3d6a0509a9ff1f8fe871aece9fdd1ffddb0029`

// DeployCardMetadata deploys a new Ethereum contract, binding an instance of CardMetadata to it.
func DeployCardMetadata(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *CardMetadata, error) {
	parsed, err := abi.JSON(strings.NewReader(CardMetadataABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(CardMetadataBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &CardMetadata{CardMetadataCaller: CardMetadataCaller{contract: contract}, CardMetadataTransactor: CardMetadataTransactor{contract: contract}, CardMetadataFilterer: CardMetadataFilterer{contract: contract}}, nil
}

// CardMetadata is an auto generated Go binding around an Ethereum contract.
type CardMetadata struct {
	CardMetadataCaller     // Read-only binding to the contract
	CardMetadataTransactor // Write-only binding to the contract
	CardMetadataFilterer   // Log filterer for contract events
}

// CardMetadataCaller is an auto generated read-only Go binding around an Ethereum contract.
type CardMetadataCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CardMetadataTransactor is an auto generated write-only Go binding around an Ethereum contract.
type CardMetadataTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CardMetadataFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type CardMetadataFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CardMetadataSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type CardMetadataSession struct {
	Contract     *CardMetadata     // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// CardMetadataCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type CardMetadataCallerSession struct {
	Contract *CardMetadataCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts       // Call options to use throughout this session
}

// CardMetadataTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type CardMetadataTransactorSession struct {
	Contract     *CardMetadataTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts       // Transaction auth options to use throughout this session
}

// CardMetadataRaw is an auto generated low-level Go binding around an Ethereum contract.
type CardMetadataRaw struct {
	Contract *CardMetadata // Generic contract binding to access the raw methods on
}

// CardMetadataCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type CardMetadataCallerRaw struct {
	Contract *CardMetadataCaller // Generic read-only contract binding to access the raw methods on
}

// CardMetadataTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type CardMetadataTransactorRaw struct {
	Contract *CardMetadataTransactor // Generic write-only contract binding to access the raw methods on
}

// NewCardMetadata creates a new instance of CardMetadata, bound to a specific deployed contract.
func NewCardMetadata(address common.Address, backend bind.ContractBackend) (*CardMetadata, error) {
	contract, err := bindCardMetadata(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &CardMetadata{CardMetadataCaller: CardMetadataCaller{contract: contract}, CardMetadataTransactor: CardMetadataTransactor{contract: contract}, CardMetadataFilterer: CardMetadataFilterer{contract: contract}}, nil
}

// NewCardMetadataCaller creates a new read-only instance of CardMetadata, bound to a specific deployed contract.
func NewCardMetadataCaller(address common.Address, caller bind.ContractCaller) (*CardMetadataCaller, error) {
	contract, err := bindCardMetadata(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &CardMetadataCaller{contract: contract}, nil
}

// NewCardMetadataTransactor creates a new write-only instance of CardMetadata, bound to a specific deployed contract.
func NewCardMetadataTransactor(address common.Address, transactor bind.ContractTransactor) (*CardMetadataTransactor, error) {
	contract, err := bindCardMetadata(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &CardMetadataTransactor{contract: contract}, nil
}

// NewCardMetadataFilterer creates a new log filterer instance of CardMetadata, bound to a specific deployed contract.
func NewCardMetadataFilterer(address common.Address, filterer bind.ContractFilterer) (*CardMetadataFilterer, error) {
	contract, err := bindCardMetadata(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &CardMetadataFilterer{contract: contract}, nil
}

// bindCardMetadata binds a generic wrapper to an already deployed contract.
func bindCardMetadata(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(CardMetadataABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_CardMetadata *CardMetadataRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _CardMetadata.Contract.CardMetadataCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_CardMetadata *CardMetadataRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _CardMetadata.Contract.CardMetadataTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_CardMetadata *CardMetadataRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _CardMetadata.Contract.CardMetadataTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_CardMetadata *CardMetadataCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _CardMetadata.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_CardMetadata *CardMetadataTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _CardMetadata.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_CardMetadata *CardMetadataTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _CardMetadata.Contract.contract.Transact(opts, method, params...)
}

// GetArtist is a free data retrieval call binding the contract method 0x811dd0e2.
//
// Solidity: function getArtist(_metadataId uint256) constant returns(address)
func (_CardMetadata *CardMetadataCaller) GetArtist(opts *bind.CallOpts, _metadataId *big.Int) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _CardMetadata.contract.Call(opts, out, "getArtist", _metadataId)
	return *ret0, err
}

// GetArtist is a free data retrieval call binding the contract method 0x811dd0e2.
//
// Solidity: function getArtist(_metadataId uint256) constant returns(address)
func (_CardMetadata *CardMetadataSession) GetArtist(_metadataId *big.Int) (common.Address, error) {
	return _CardMetadata.Contract.GetArtist(&_CardMetadata.CallOpts, _metadataId)
}

// GetArtist is a free data retrieval call binding the contract method 0x811dd0e2.
//
// Solidity: function getArtist(_metadataId uint256) constant returns(address)
func (_CardMetadata *CardMetadataCallerSession) GetArtist(_metadataId *big.Int) (common.Address, error) {
	return _CardMetadata.Contract.GetArtist(&_CardMetadata.CallOpts, _metadataId)
}

// GetCardByRarity is a free data retrieval call binding the contract method 0x0e7eca0e.
//
// Solidity: function getCardByRarity(_rarity uint256) constant returns(uint256)
func (_CardMetadata *CardMetadataCaller) GetCardByRarity(opts *bind.CallOpts, _rarity *big.Int) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _CardMetadata.contract.Call(opts, out, "getCardByRarity", _rarity)
	return *ret0, err
}

// GetCardByRarity is a free data retrieval call binding the contract method 0x0e7eca0e.
//
// Solidity: function getCardByRarity(_rarity uint256) constant returns(uint256)
func (_CardMetadata *CardMetadataSession) GetCardByRarity(_rarity *big.Int) (*big.Int, error) {
	return _CardMetadata.Contract.GetCardByRarity(&_CardMetadata.CallOpts, _rarity)
}

// GetCardByRarity is a free data retrieval call binding the contract method 0x0e7eca0e.
//
// Solidity: function getCardByRarity(_rarity uint256) constant returns(uint256)
func (_CardMetadata *CardMetadataCallerSession) GetCardByRarity(_rarity *big.Int) (*big.Int, error) {
	return _CardMetadata.Contract.GetCardByRarity(&_CardMetadata.CallOpts, _rarity)
}

// GetMaxRandom is a free data retrieval call binding the contract method 0x91395352.
//
// Solidity: function getMaxRandom() constant returns(uint256)
func (_CardMetadata *CardMetadataCaller) GetMaxRandom(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _CardMetadata.contract.Call(opts, out, "getMaxRandom")
	return *ret0, err
}

// GetMaxRandom is a free data retrieval call binding the contract method 0x91395352.
//
// Solidity: function getMaxRandom() constant returns(uint256)
func (_CardMetadata *CardMetadataSession) GetMaxRandom() (*big.Int, error) {
	return _CardMetadata.Contract.GetMaxRandom(&_CardMetadata.CallOpts)
}

// GetMaxRandom is a free data retrieval call binding the contract method 0x91395352.
//
// Solidity: function getMaxRandom() constant returns(uint256)
func (_CardMetadata *CardMetadataCallerSession) GetMaxRandom() (*big.Int, error) {
	return _CardMetadata.Contract.GetMaxRandom(&_CardMetadata.CallOpts)
}

// GetNumberOfCards is a free data retrieval call binding the contract method 0xc487282c.
//
// Solidity: function getNumberOfCards() constant returns(uint256)
func (_CardMetadata *CardMetadataCaller) GetNumberOfCards(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _CardMetadata.contract.Call(opts, out, "getNumberOfCards")
	return *ret0, err
}

// GetNumberOfCards is a free data retrieval call binding the contract method 0xc487282c.
//
// Solidity: function getNumberOfCards() constant returns(uint256)
func (_CardMetadata *CardMetadataSession) GetNumberOfCards() (*big.Int, error) {
	return _CardMetadata.Contract.GetNumberOfCards(&_CardMetadata.CallOpts)
}

// GetNumberOfCards is a free data retrieval call binding the contract method 0xc487282c.
//
// Solidity: function getNumberOfCards() constant returns(uint256)
func (_CardMetadata *CardMetadataCallerSession) GetNumberOfCards() (*big.Int, error) {
	return _CardMetadata.Contract.GetNumberOfCards(&_CardMetadata.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_CardMetadata *CardMetadataCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _CardMetadata.contract.Call(opts, out, "owner")
	return *ret0, err
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_CardMetadata *CardMetadataSession) Owner() (common.Address, error) {
	return _CardMetadata.Contract.Owner(&_CardMetadata.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_CardMetadata *CardMetadataCallerSession) Owner() (common.Address, error) {
	return _CardMetadata.Contract.Owner(&_CardMetadata.CallOpts)
}

// Properties is a free data retrieval call binding the contract method 0xf7b10808.
//
// Solidity: function properties( uint256) constant returns(id uint256, rarity uint256, ipfsHash bytes32, ipfsHashFunction uint8, ipfsSize uint8, artist address)
func (_CardMetadata *CardMetadataCaller) Properties(opts *bind.CallOpts, arg0 *big.Int) (struct {
	Id               *big.Int
	Rarity           *big.Int
	IpfsHash         [32]byte
	IpfsHashFunction uint8
	IpfsSize         uint8
	Artist           common.Address
}, error) {
	ret := new(struct {
		Id               *big.Int
		Rarity           *big.Int
		IpfsHash         [32]byte
		IpfsHashFunction uint8
		IpfsSize         uint8
		Artist           common.Address
	})
	out := ret
	err := _CardMetadata.contract.Call(opts, out, "properties", arg0)
	return *ret, err
}

// Properties is a free data retrieval call binding the contract method 0xf7b10808.
//
// Solidity: function properties( uint256) constant returns(id uint256, rarity uint256, ipfsHash bytes32, ipfsHashFunction uint8, ipfsSize uint8, artist address)
func (_CardMetadata *CardMetadataSession) Properties(arg0 *big.Int) (struct {
	Id               *big.Int
	Rarity           *big.Int
	IpfsHash         [32]byte
	IpfsHashFunction uint8
	IpfsSize         uint8
	Artist           common.Address
}, error) {
	return _CardMetadata.Contract.Properties(&_CardMetadata.CallOpts, arg0)
}

// Properties is a free data retrieval call binding the contract method 0xf7b10808.
//
// Solidity: function properties( uint256) constant returns(id uint256, rarity uint256, ipfsHash bytes32, ipfsHashFunction uint8, ipfsSize uint8, artist address)
func (_CardMetadata *CardMetadataCallerSession) Properties(arg0 *big.Int) (struct {
	Id               *big.Int
	Rarity           *big.Int
	IpfsHash         [32]byte
	IpfsHashFunction uint8
	IpfsSize         uint8
	Artist           common.Address
}, error) {
	return _CardMetadata.Contract.Properties(&_CardMetadata.CallOpts, arg0)
}

// Rarities is a free data retrieval call binding the contract method 0x17b8e1cf.
//
// Solidity: function rarities( uint256) constant returns(uint256)
func (_CardMetadata *CardMetadataCaller) Rarities(opts *bind.CallOpts, arg0 *big.Int) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _CardMetadata.contract.Call(opts, out, "rarities", arg0)
	return *ret0, err
}

// Rarities is a free data retrieval call binding the contract method 0x17b8e1cf.
//
// Solidity: function rarities( uint256) constant returns(uint256)
func (_CardMetadata *CardMetadataSession) Rarities(arg0 *big.Int) (*big.Int, error) {
	return _CardMetadata.Contract.Rarities(&_CardMetadata.CallOpts, arg0)
}

// Rarities is a free data retrieval call binding the contract method 0x17b8e1cf.
//
// Solidity: function rarities( uint256) constant returns(uint256)
func (_CardMetadata *CardMetadataCallerSession) Rarities(arg0 *big.Int) (*big.Int, error) {
	return _CardMetadata.Contract.Rarities(&_CardMetadata.CallOpts, arg0)
}

// AddCardMetadata is a paid mutator transaction binding the contract method 0xcf2411d4.
//
// Solidity: function addCardMetadata(_rarity uint256, _ipfsHash bytes32, _ipfsHashFunction uint8, _ipfsSize uint8, _artist address) returns()
func (_CardMetadata *CardMetadataTransactor) AddCardMetadata(opts *bind.TransactOpts, _rarity *big.Int, _ipfsHash [32]byte, _ipfsHashFunction uint8, _ipfsSize uint8, _artist common.Address) (*types.Transaction, error) {
	return _CardMetadata.contract.Transact(opts, "addCardMetadata", _rarity, _ipfsHash, _ipfsHashFunction, _ipfsSize, _artist)
}

// AddCardMetadata is a paid mutator transaction binding the contract method 0xcf2411d4.
//
// Solidity: function addCardMetadata(_rarity uint256, _ipfsHash bytes32, _ipfsHashFunction uint8, _ipfsSize uint8, _artist address) returns()
func (_CardMetadata *CardMetadataSession) AddCardMetadata(_rarity *big.Int, _ipfsHash [32]byte, _ipfsHashFunction uint8, _ipfsSize uint8, _artist common.Address) (*types.Transaction, error) {
	return _CardMetadata.Contract.AddCardMetadata(&_CardMetadata.TransactOpts, _rarity, _ipfsHash, _ipfsHashFunction, _ipfsSize, _artist)
}

// AddCardMetadata is a paid mutator transaction binding the contract method 0xcf2411d4.
//
// Solidity: function addCardMetadata(_rarity uint256, _ipfsHash bytes32, _ipfsHashFunction uint8, _ipfsSize uint8, _artist address) returns()
func (_CardMetadata *CardMetadataTransactorSession) AddCardMetadata(_rarity *big.Int, _ipfsHash [32]byte, _ipfsHashFunction uint8, _ipfsSize uint8, _artist common.Address) (*types.Transaction, error) {
	return _CardMetadata.Contract.AddCardMetadata(&_CardMetadata.TransactOpts, _rarity, _ipfsHash, _ipfsHashFunction, _ipfsSize, _artist)
}

// SetNewRarities is a paid mutator transaction binding the contract method 0xdf8cf6e2.
//
// Solidity: function setNewRarities(_rarities uint256[]) returns()
func (_CardMetadata *CardMetadataTransactor) SetNewRarities(opts *bind.TransactOpts, _rarities []*big.Int) (*types.Transaction, error) {
	return _CardMetadata.contract.Transact(opts, "setNewRarities", _rarities)
}

// SetNewRarities is a paid mutator transaction binding the contract method 0xdf8cf6e2.
//
// Solidity: function setNewRarities(_rarities uint256[]) returns()
func (_CardMetadata *CardMetadataSession) SetNewRarities(_rarities []*big.Int) (*types.Transaction, error) {
	return _CardMetadata.Contract.SetNewRarities(&_CardMetadata.TransactOpts, _rarities)
}

// SetNewRarities is a paid mutator transaction binding the contract method 0xdf8cf6e2.
//
// Solidity: function setNewRarities(_rarities uint256[]) returns()
func (_CardMetadata *CardMetadataTransactorSession) SetNewRarities(_rarities []*big.Int) (*types.Transaction, error) {
	return _CardMetadata.Contract.SetNewRarities(&_CardMetadata.TransactOpts, _rarities)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_CardMetadata *CardMetadataTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _CardMetadata.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_CardMetadata *CardMetadataSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _CardMetadata.Contract.TransferOwnership(&_CardMetadata.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_CardMetadata *CardMetadataTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _CardMetadata.Contract.TransferOwnership(&_CardMetadata.TransactOpts, newOwner)
}

// CardMetadataOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the CardMetadata contract.
type CardMetadataOwnershipTransferredIterator struct {
	Event *CardMetadataOwnershipTransferred // Event containing the contract specifics and raw log

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
func (it *CardMetadataOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(CardMetadataOwnershipTransferred)
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
		it.Event = new(CardMetadataOwnershipTransferred)
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
func (it *CardMetadataOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *CardMetadataOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// CardMetadataOwnershipTransferred represents a OwnershipTransferred event raised by the CardMetadata contract.
type CardMetadataOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: e OwnershipTransferred(previousOwner indexed address, newOwner indexed address)
func (_CardMetadata *CardMetadataFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*CardMetadataOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _CardMetadata.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &CardMetadataOwnershipTransferredIterator{contract: _CardMetadata.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: e OwnershipTransferred(previousOwner indexed address, newOwner indexed address)
func (_CardMetadata *CardMetadataFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *CardMetadataOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _CardMetadata.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(CardMetadataOwnershipTransferred)
				if err := _CardMetadata.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
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

// CardPackTokenABI is the input ABI used to generate the binding from.
const CardPackTokenABI = "[{\"constant\":true,\"inputs\":[],\"name\":\"mintingFinished\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_spender\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_from\",\"type\":\"address\"},{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\"}],\"name\":\"mint\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_spender\",\"type\":\"address\"},{\"name\":\"_subtractedValue\",\"type\":\"uint256\"}],\"name\":\"decreaseApproval\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"balance\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"finishMinting\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"booster\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"buyBoosterWithToken\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_spender\",\"type\":\"address\"},{\"name\":\"_addedValue\",\"type\":\"uint256\"}],\"name\":\"increaseApproval\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"},{\"name\":\"_spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"_booster\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Mint\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[],\"name\":\"MintFinished\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"}]"

// CardPackTokenBin is the compiled bytecode used for deploying new contracts.
const CardPackTokenBin = `0x6003805460a060020a60ff021916905560c0604052600d60808190527f436172645061636b546f6b656e0000000000000000000000000000000000000060a090815261004e91600591906100f4565b506040805180820190915260038082527f43505400000000000000000000000000000000000000000000000000000000006020909201918252610093916006916100f4565b5060086007556305f5e1006009553480156100ad57600080fd5b50604051602080610f9e833981016040525160038054600160a060020a03338116600160a060020a031992831617909255600880549290931691161790554260045561018f565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061013557805160ff1916838001178555610162565b82800160010185558215610162579182015b82811115610162578251825591602001919060010190610147565b5061016e929150610172565b5090565b61018c91905b8082111561016e5760008155600101610178565b90565b610e008061019e6000396000f3006080604052600436106100fb5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166305d2035b811461010057806306fdde0314610129578063095ea7b3146101b357806318160ddd146101d757806323b872dd146101fe578063313ce5671461022857806340c10f191461023d578063661884631461026157806370a08231146102855780637d64bcb4146102a65780638da5cb5b146102bb57806395d89b41146102ec578063a9059cbb14610301578063c6def07614610325578063c7ed1d511461033a578063d73dd62314610351578063dd62ed3e14610375578063f2fde38b1461039c575b600080fd5b34801561010c57600080fd5b506101156103bd565b604080519115158252519081900360200190f35b34801561013557600080fd5b5061013e6103de565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610178578181015183820152602001610160565b50505050905090810190601f1680156101a55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156101bf57600080fd5b50610115600160a060020a036004351660243561046c565b3480156101e357600080fd5b506101ec6104d6565b60408051918252519081900360200190f35b34801561020a57600080fd5b50610115600160a060020a03600435811690602435166044356104dc565b34801561023457600080fd5b506101ec61065c565b34801561024957600080fd5b50610115600160a060020a0360043516602435610662565b34801561026d57600080fd5b50610115600160a060020a03600435166024356107a7565b34801561029157600080fd5b506101ec600160a060020a03600435166108a0565b3480156102b257600080fd5b506101156108bb565b3480156102c757600080fd5b506102d061098b565b60408051600160a060020a039092168252519081900360200190f35b3480156102f857600080fd5b5061013e61099a565b34801561030d57600080fd5b50610115600160a060020a03600435166024356109f5565b34801561033157600080fd5b506102d0610aee565b34801561034657600080fd5b5061034f610afd565b005b34801561035d57600080fd5b50610115600160a060020a0360043516602435610c46565b34801561038157600080fd5b506101ec600160a060020a0360043581169060243516610ce8565b3480156103a857600080fd5b5061034f600160a060020a0360043516610d13565b60035474010000000000000000000000000000000000000000900460ff1681565b6005805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104645780601f1061043957610100808354040283529160200191610464565b820191906000526020600020905b81548152906001019060200180831161044757829003601f168201915b505050505081565b600160a060020a03338116600081815260026020908152604080832094871680845294825280832086905580518681529051929493927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a350600192915050565b60015490565b6000600160a060020a03831615156104f357600080fd5b600160a060020a03841660009081526020819052604090205482111561051857600080fd5b600160a060020a038085166000908152600260209081526040808320339094168352929052205482111561054b57600080fd5b600160a060020a038416600090815260208190526040902054610574908363ffffffff610dac16565b600160a060020a0380861660009081526020819052604080822093909355908516815220546105a9908363ffffffff610dbe16565b600160a060020a03808516600090815260208181526040808320949094558783168252600281528382203390931682529190915220546105ef908363ffffffff610dac16565b600160a060020a038086166000818152600260209081526040808320338616845282529182902094909455805186815290519287169391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a35060019392505050565b60075481565b60035460009033600160a060020a0390811691161461068057600080fd5b6001546103e8101561069157600080fd5b60035474010000000000000000000000000000000000000000900460ff16156106b957600080fd5b626ebe0060045442031015156106ce57600080fd5b6001546106e1908363ffffffff610dbe16565b600155600160a060020a03831660009081526020819052604090205461070d908363ffffffff610dbe16565b600160a060020a03841660008181526020818152604091829020939093558051858152905191927f0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d412139688592918290030190a2604080518381529051600160a060020a038516916000917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a350600192915050565b600160a060020a0333811660009081526002602090815260408083209386168352929052908120548083111561080457600160a060020a03338116600090815260026020908152604080832093881683529290529081205561083b565b610814818463ffffffff610dac16565b600160a060020a033381166000908152600260209081526040808320938916835292905220555b600160a060020a0333811660008181526002602090815260408083209489168084529482529182902054825190815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a35060019392505050565b600160a060020a031660009081526020819052604090205490565b60035460009033600160a060020a039081169116146108d957600080fd5b6001546103e810156108ea57600080fd5b60035474010000000000000000000000000000000000000000900460ff161561091257600080fd5b626ebe00600454420310151561092757600080fd5b6003805474ff00000000000000000000000000000000000000001916740100000000000000000000000000000000000000001790556040517fae5184fba832cb2b1f702aca6117b8d265eaf03ad33eb133f19dde0f5920fa0890600090a150600190565b600354600160a060020a031681565b6006805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104645780601f1061043957610100808354040283529160200191610464565b6000600160a060020a0383161515610a0c57600080fd5b600160a060020a033316600090815260208190526040902054821115610a3157600080fd5b600160a060020a033316600090815260208190526040902054610a5a908363ffffffff610dac16565b600160a060020a033381166000908152602081905260408082209390935590851681522054610a8f908363ffffffff610dbe16565b600160a060020a03808516600081815260208181526040918290209490945580518681529051919333909316927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a350600192915050565b600854600160a060020a031681565b60095430600160a060020a03166370a08231336040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082600160a060020a0316600160a060020a03168152602001915050602060405180830381600087803b158015610b7457600080fd5b505af1158015610b88573d6000803e3d6000fd5b505050506040513d6020811015610b9e57600080fd5b50511015610bab57600080fd5b600854600954610bc491600160a060020a03169061046c565b50600854604080517fb3e02f62000000000000000000000000000000000000000000000000000000008152600160a060020a0333811660048301529151919092169163b3e02f6291602480830192600092919082900301818387803b158015610c2c57600080fd5b505af1158015610c40573d6000803e3d6000fd5b50505050565b600160a060020a033381166000908152600260209081526040808320938616835292905290812054610c7e908363ffffffff610dbe16565b600160a060020a0333811660008181526002602090815260408083209489168084529482529182902085905581519485529051929391927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a350600192915050565b600160a060020a03918216600090815260026020908152604080832093909416825291909152205490565b60035433600160a060020a03908116911614610d2e57600080fd5b600160a060020a0381161515610d4357600080fd5b600354604051600160a060020a038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a36003805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b600082821115610db857fe5b50900390565b600082820183811015610dcd57fe5b93925050505600a165627a7a7230582033b3167a9b52dc90d4a4fdb35962c8c4d81f60b9fd787cfe6009bab8234d39e90029`

// DeployCardPackToken deploys a new Ethereum contract, binding an instance of CardPackToken to it.
func DeployCardPackToken(auth *bind.TransactOpts, backend bind.ContractBackend, _booster common.Address) (common.Address, *types.Transaction, *CardPackToken, error) {
	parsed, err := abi.JSON(strings.NewReader(CardPackTokenABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(CardPackTokenBin), backend, _booster)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &CardPackToken{CardPackTokenCaller: CardPackTokenCaller{contract: contract}, CardPackTokenTransactor: CardPackTokenTransactor{contract: contract}, CardPackTokenFilterer: CardPackTokenFilterer{contract: contract}}, nil
}

// CardPackToken is an auto generated Go binding around an Ethereum contract.
type CardPackToken struct {
	CardPackTokenCaller     // Read-only binding to the contract
	CardPackTokenTransactor // Write-only binding to the contract
	CardPackTokenFilterer   // Log filterer for contract events
}

// CardPackTokenCaller is an auto generated read-only Go binding around an Ethereum contract.
type CardPackTokenCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CardPackTokenTransactor is an auto generated write-only Go binding around an Ethereum contract.
type CardPackTokenTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CardPackTokenFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type CardPackTokenFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CardPackTokenSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type CardPackTokenSession struct {
	Contract     *CardPackToken    // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// CardPackTokenCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type CardPackTokenCallerSession struct {
	Contract *CardPackTokenCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts        // Call options to use throughout this session
}

// CardPackTokenTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type CardPackTokenTransactorSession struct {
	Contract     *CardPackTokenTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts        // Transaction auth options to use throughout this session
}

// CardPackTokenRaw is an auto generated low-level Go binding around an Ethereum contract.
type CardPackTokenRaw struct {
	Contract *CardPackToken // Generic contract binding to access the raw methods on
}

// CardPackTokenCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type CardPackTokenCallerRaw struct {
	Contract *CardPackTokenCaller // Generic read-only contract binding to access the raw methods on
}

// CardPackTokenTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type CardPackTokenTransactorRaw struct {
	Contract *CardPackTokenTransactor // Generic write-only contract binding to access the raw methods on
}

// NewCardPackToken creates a new instance of CardPackToken, bound to a specific deployed contract.
func NewCardPackToken(address common.Address, backend bind.ContractBackend) (*CardPackToken, error) {
	contract, err := bindCardPackToken(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &CardPackToken{CardPackTokenCaller: CardPackTokenCaller{contract: contract}, CardPackTokenTransactor: CardPackTokenTransactor{contract: contract}, CardPackTokenFilterer: CardPackTokenFilterer{contract: contract}}, nil
}

// NewCardPackTokenCaller creates a new read-only instance of CardPackToken, bound to a specific deployed contract.
func NewCardPackTokenCaller(address common.Address, caller bind.ContractCaller) (*CardPackTokenCaller, error) {
	contract, err := bindCardPackToken(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &CardPackTokenCaller{contract: contract}, nil
}

// NewCardPackTokenTransactor creates a new write-only instance of CardPackToken, bound to a specific deployed contract.
func NewCardPackTokenTransactor(address common.Address, transactor bind.ContractTransactor) (*CardPackTokenTransactor, error) {
	contract, err := bindCardPackToken(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &CardPackTokenTransactor{contract: contract}, nil
}

// NewCardPackTokenFilterer creates a new log filterer instance of CardPackToken, bound to a specific deployed contract.
func NewCardPackTokenFilterer(address common.Address, filterer bind.ContractFilterer) (*CardPackTokenFilterer, error) {
	contract, err := bindCardPackToken(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &CardPackTokenFilterer{contract: contract}, nil
}

// bindCardPackToken binds a generic wrapper to an already deployed contract.
func bindCardPackToken(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(CardPackTokenABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_CardPackToken *CardPackTokenRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _CardPackToken.Contract.CardPackTokenCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_CardPackToken *CardPackTokenRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _CardPackToken.Contract.CardPackTokenTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_CardPackToken *CardPackTokenRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _CardPackToken.Contract.CardPackTokenTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_CardPackToken *CardPackTokenCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _CardPackToken.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_CardPackToken *CardPackTokenTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _CardPackToken.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_CardPackToken *CardPackTokenTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _CardPackToken.Contract.contract.Transact(opts, method, params...)
}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(_owner address, _spender address) constant returns(uint256)
func (_CardPackToken *CardPackTokenCaller) Allowance(opts *bind.CallOpts, _owner common.Address, _spender common.Address) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _CardPackToken.contract.Call(opts, out, "allowance", _owner, _spender)
	return *ret0, err
}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(_owner address, _spender address) constant returns(uint256)
func (_CardPackToken *CardPackTokenSession) Allowance(_owner common.Address, _spender common.Address) (*big.Int, error) {
	return _CardPackToken.Contract.Allowance(&_CardPackToken.CallOpts, _owner, _spender)
}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(_owner address, _spender address) constant returns(uint256)
func (_CardPackToken *CardPackTokenCallerSession) Allowance(_owner common.Address, _spender common.Address) (*big.Int, error) {
	return _CardPackToken.Contract.Allowance(&_CardPackToken.CallOpts, _owner, _spender)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(_owner address) constant returns(balance uint256)
func (_CardPackToken *CardPackTokenCaller) BalanceOf(opts *bind.CallOpts, _owner common.Address) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _CardPackToken.contract.Call(opts, out, "balanceOf", _owner)
	return *ret0, err
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(_owner address) constant returns(balance uint256)
func (_CardPackToken *CardPackTokenSession) BalanceOf(_owner common.Address) (*big.Int, error) {
	return _CardPackToken.Contract.BalanceOf(&_CardPackToken.CallOpts, _owner)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(_owner address) constant returns(balance uint256)
func (_CardPackToken *CardPackTokenCallerSession) BalanceOf(_owner common.Address) (*big.Int, error) {
	return _CardPackToken.Contract.BalanceOf(&_CardPackToken.CallOpts, _owner)
}

// Booster is a free data retrieval call binding the contract method 0xc6def076.
//
// Solidity: function booster() constant returns(address)
func (_CardPackToken *CardPackTokenCaller) Booster(opts *bind.CallOpts) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _CardPackToken.contract.Call(opts, out, "booster")
	return *ret0, err
}

// Booster is a free data retrieval call binding the contract method 0xc6def076.
//
// Solidity: function booster() constant returns(address)
func (_CardPackToken *CardPackTokenSession) Booster() (common.Address, error) {
	return _CardPackToken.Contract.Booster(&_CardPackToken.CallOpts)
}

// Booster is a free data retrieval call binding the contract method 0xc6def076.
//
// Solidity: function booster() constant returns(address)
func (_CardPackToken *CardPackTokenCallerSession) Booster() (common.Address, error) {
	return _CardPackToken.Contract.Booster(&_CardPackToken.CallOpts)
}

// Decimals is a free data retrieval call binding the contract method 0x313ce567.
//
// Solidity: function decimals() constant returns(uint256)
func (_CardPackToken *CardPackTokenCaller) Decimals(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _CardPackToken.contract.Call(opts, out, "decimals")
	return *ret0, err
}

// Decimals is a free data retrieval call binding the contract method 0x313ce567.
//
// Solidity: function decimals() constant returns(uint256)
func (_CardPackToken *CardPackTokenSession) Decimals() (*big.Int, error) {
	return _CardPackToken.Contract.Decimals(&_CardPackToken.CallOpts)
}

// Decimals is a free data retrieval call binding the contract method 0x313ce567.
//
// Solidity: function decimals() constant returns(uint256)
func (_CardPackToken *CardPackTokenCallerSession) Decimals() (*big.Int, error) {
	return _CardPackToken.Contract.Decimals(&_CardPackToken.CallOpts)
}

// MintingFinished is a free data retrieval call binding the contract method 0x05d2035b.
//
// Solidity: function mintingFinished() constant returns(bool)
func (_CardPackToken *CardPackTokenCaller) MintingFinished(opts *bind.CallOpts) (bool, error) {
	var (
		ret0 = new(bool)
	)
	out := ret0
	err := _CardPackToken.contract.Call(opts, out, "mintingFinished")
	return *ret0, err
}

// MintingFinished is a free data retrieval call binding the contract method 0x05d2035b.
//
// Solidity: function mintingFinished() constant returns(bool)
func (_CardPackToken *CardPackTokenSession) MintingFinished() (bool, error) {
	return _CardPackToken.Contract.MintingFinished(&_CardPackToken.CallOpts)
}

// MintingFinished is a free data retrieval call binding the contract method 0x05d2035b.
//
// Solidity: function mintingFinished() constant returns(bool)
func (_CardPackToken *CardPackTokenCallerSession) MintingFinished() (bool, error) {
	return _CardPackToken.Contract.MintingFinished(&_CardPackToken.CallOpts)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() constant returns(string)
func (_CardPackToken *CardPackTokenCaller) Name(opts *bind.CallOpts) (string, error) {
	var (
		ret0 = new(string)
	)
	out := ret0
	err := _CardPackToken.contract.Call(opts, out, "name")
	return *ret0, err
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() constant returns(string)
func (_CardPackToken *CardPackTokenSession) Name() (string, error) {
	return _CardPackToken.Contract.Name(&_CardPackToken.CallOpts)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() constant returns(string)
func (_CardPackToken *CardPackTokenCallerSession) Name() (string, error) {
	return _CardPackToken.Contract.Name(&_CardPackToken.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_CardPackToken *CardPackTokenCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _CardPackToken.contract.Call(opts, out, "owner")
	return *ret0, err
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_CardPackToken *CardPackTokenSession) Owner() (common.Address, error) {
	return _CardPackToken.Contract.Owner(&_CardPackToken.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_CardPackToken *CardPackTokenCallerSession) Owner() (common.Address, error) {
	return _CardPackToken.Contract.Owner(&_CardPackToken.CallOpts)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() constant returns(string)
func (_CardPackToken *CardPackTokenCaller) Symbol(opts *bind.CallOpts) (string, error) {
	var (
		ret0 = new(string)
	)
	out := ret0
	err := _CardPackToken.contract.Call(opts, out, "symbol")
	return *ret0, err
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() constant returns(string)
func (_CardPackToken *CardPackTokenSession) Symbol() (string, error) {
	return _CardPackToken.Contract.Symbol(&_CardPackToken.CallOpts)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() constant returns(string)
func (_CardPackToken *CardPackTokenCallerSession) Symbol() (string, error) {
	return _CardPackToken.Contract.Symbol(&_CardPackToken.CallOpts)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_CardPackToken *CardPackTokenCaller) TotalSupply(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _CardPackToken.contract.Call(opts, out, "totalSupply")
	return *ret0, err
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_CardPackToken *CardPackTokenSession) TotalSupply() (*big.Int, error) {
	return _CardPackToken.Contract.TotalSupply(&_CardPackToken.CallOpts)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_CardPackToken *CardPackTokenCallerSession) TotalSupply() (*big.Int, error) {
	return _CardPackToken.Contract.TotalSupply(&_CardPackToken.CallOpts)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(_spender address, _value uint256) returns(bool)
func (_CardPackToken *CardPackTokenTransactor) Approve(opts *bind.TransactOpts, _spender common.Address, _value *big.Int) (*types.Transaction, error) {
	return _CardPackToken.contract.Transact(opts, "approve", _spender, _value)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(_spender address, _value uint256) returns(bool)
func (_CardPackToken *CardPackTokenSession) Approve(_spender common.Address, _value *big.Int) (*types.Transaction, error) {
	return _CardPackToken.Contract.Approve(&_CardPackToken.TransactOpts, _spender, _value)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(_spender address, _value uint256) returns(bool)
func (_CardPackToken *CardPackTokenTransactorSession) Approve(_spender common.Address, _value *big.Int) (*types.Transaction, error) {
	return _CardPackToken.Contract.Approve(&_CardPackToken.TransactOpts, _spender, _value)
}

// BuyBoosterWithToken is a paid mutator transaction binding the contract method 0xc7ed1d51.
//
// Solidity: function buyBoosterWithToken() returns()
func (_CardPackToken *CardPackTokenTransactor) BuyBoosterWithToken(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _CardPackToken.contract.Transact(opts, "buyBoosterWithToken")
}

// BuyBoosterWithToken is a paid mutator transaction binding the contract method 0xc7ed1d51.
//
// Solidity: function buyBoosterWithToken() returns()
func (_CardPackToken *CardPackTokenSession) BuyBoosterWithToken() (*types.Transaction, error) {
	return _CardPackToken.Contract.BuyBoosterWithToken(&_CardPackToken.TransactOpts)
}

// BuyBoosterWithToken is a paid mutator transaction binding the contract method 0xc7ed1d51.
//
// Solidity: function buyBoosterWithToken() returns()
func (_CardPackToken *CardPackTokenTransactorSession) BuyBoosterWithToken() (*types.Transaction, error) {
	return _CardPackToken.Contract.BuyBoosterWithToken(&_CardPackToken.TransactOpts)
}

// DecreaseApproval is a paid mutator transaction binding the contract method 0x66188463.
//
// Solidity: function decreaseApproval(_spender address, _subtractedValue uint256) returns(bool)
func (_CardPackToken *CardPackTokenTransactor) DecreaseApproval(opts *bind.TransactOpts, _spender common.Address, _subtractedValue *big.Int) (*types.Transaction, error) {
	return _CardPackToken.contract.Transact(opts, "decreaseApproval", _spender, _subtractedValue)
}

// DecreaseApproval is a paid mutator transaction binding the contract method 0x66188463.
//
// Solidity: function decreaseApproval(_spender address, _subtractedValue uint256) returns(bool)
func (_CardPackToken *CardPackTokenSession) DecreaseApproval(_spender common.Address, _subtractedValue *big.Int) (*types.Transaction, error) {
	return _CardPackToken.Contract.DecreaseApproval(&_CardPackToken.TransactOpts, _spender, _subtractedValue)
}

// DecreaseApproval is a paid mutator transaction binding the contract method 0x66188463.
//
// Solidity: function decreaseApproval(_spender address, _subtractedValue uint256) returns(bool)
func (_CardPackToken *CardPackTokenTransactorSession) DecreaseApproval(_spender common.Address, _subtractedValue *big.Int) (*types.Transaction, error) {
	return _CardPackToken.Contract.DecreaseApproval(&_CardPackToken.TransactOpts, _spender, _subtractedValue)
}

// FinishMinting is a paid mutator transaction binding the contract method 0x7d64bcb4.
//
// Solidity: function finishMinting() returns(bool)
func (_CardPackToken *CardPackTokenTransactor) FinishMinting(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _CardPackToken.contract.Transact(opts, "finishMinting")
}

// FinishMinting is a paid mutator transaction binding the contract method 0x7d64bcb4.
//
// Solidity: function finishMinting() returns(bool)
func (_CardPackToken *CardPackTokenSession) FinishMinting() (*types.Transaction, error) {
	return _CardPackToken.Contract.FinishMinting(&_CardPackToken.TransactOpts)
}

// FinishMinting is a paid mutator transaction binding the contract method 0x7d64bcb4.
//
// Solidity: function finishMinting() returns(bool)
func (_CardPackToken *CardPackTokenTransactorSession) FinishMinting() (*types.Transaction, error) {
	return _CardPackToken.Contract.FinishMinting(&_CardPackToken.TransactOpts)
}

// IncreaseApproval is a paid mutator transaction binding the contract method 0xd73dd623.
//
// Solidity: function increaseApproval(_spender address, _addedValue uint256) returns(bool)
func (_CardPackToken *CardPackTokenTransactor) IncreaseApproval(opts *bind.TransactOpts, _spender common.Address, _addedValue *big.Int) (*types.Transaction, error) {
	return _CardPackToken.contract.Transact(opts, "increaseApproval", _spender, _addedValue)
}

// IncreaseApproval is a paid mutator transaction binding the contract method 0xd73dd623.
//
// Solidity: function increaseApproval(_spender address, _addedValue uint256) returns(bool)
func (_CardPackToken *CardPackTokenSession) IncreaseApproval(_spender common.Address, _addedValue *big.Int) (*types.Transaction, error) {
	return _CardPackToken.Contract.IncreaseApproval(&_CardPackToken.TransactOpts, _spender, _addedValue)
}

// IncreaseApproval is a paid mutator transaction binding the contract method 0xd73dd623.
//
// Solidity: function increaseApproval(_spender address, _addedValue uint256) returns(bool)
func (_CardPackToken *CardPackTokenTransactorSession) IncreaseApproval(_spender common.Address, _addedValue *big.Int) (*types.Transaction, error) {
	return _CardPackToken.Contract.IncreaseApproval(&_CardPackToken.TransactOpts, _spender, _addedValue)
}

// Mint is a paid mutator transaction binding the contract method 0x40c10f19.
//
// Solidity: function mint(_to address, _amount uint256) returns(bool)
func (_CardPackToken *CardPackTokenTransactor) Mint(opts *bind.TransactOpts, _to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _CardPackToken.contract.Transact(opts, "mint", _to, _amount)
}

// Mint is a paid mutator transaction binding the contract method 0x40c10f19.
//
// Solidity: function mint(_to address, _amount uint256) returns(bool)
func (_CardPackToken *CardPackTokenSession) Mint(_to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _CardPackToken.Contract.Mint(&_CardPackToken.TransactOpts, _to, _amount)
}

// Mint is a paid mutator transaction binding the contract method 0x40c10f19.
//
// Solidity: function mint(_to address, _amount uint256) returns(bool)
func (_CardPackToken *CardPackTokenTransactorSession) Mint(_to common.Address, _amount *big.Int) (*types.Transaction, error) {
	return _CardPackToken.Contract.Mint(&_CardPackToken.TransactOpts, _to, _amount)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(_to address, _value uint256) returns(bool)
func (_CardPackToken *CardPackTokenTransactor) Transfer(opts *bind.TransactOpts, _to common.Address, _value *big.Int) (*types.Transaction, error) {
	return _CardPackToken.contract.Transact(opts, "transfer", _to, _value)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(_to address, _value uint256) returns(bool)
func (_CardPackToken *CardPackTokenSession) Transfer(_to common.Address, _value *big.Int) (*types.Transaction, error) {
	return _CardPackToken.Contract.Transfer(&_CardPackToken.TransactOpts, _to, _value)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(_to address, _value uint256) returns(bool)
func (_CardPackToken *CardPackTokenTransactorSession) Transfer(_to common.Address, _value *big.Int) (*types.Transaction, error) {
	return _CardPackToken.Contract.Transfer(&_CardPackToken.TransactOpts, _to, _value)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(_from address, _to address, _value uint256) returns(bool)
func (_CardPackToken *CardPackTokenTransactor) TransferFrom(opts *bind.TransactOpts, _from common.Address, _to common.Address, _value *big.Int) (*types.Transaction, error) {
	return _CardPackToken.contract.Transact(opts, "transferFrom", _from, _to, _value)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(_from address, _to address, _value uint256) returns(bool)
func (_CardPackToken *CardPackTokenSession) TransferFrom(_from common.Address, _to common.Address, _value *big.Int) (*types.Transaction, error) {
	return _CardPackToken.Contract.TransferFrom(&_CardPackToken.TransactOpts, _from, _to, _value)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(_from address, _to address, _value uint256) returns(bool)
func (_CardPackToken *CardPackTokenTransactorSession) TransferFrom(_from common.Address, _to common.Address, _value *big.Int) (*types.Transaction, error) {
	return _CardPackToken.Contract.TransferFrom(&_CardPackToken.TransactOpts, _from, _to, _value)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_CardPackToken *CardPackTokenTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _CardPackToken.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_CardPackToken *CardPackTokenSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _CardPackToken.Contract.TransferOwnership(&_CardPackToken.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_CardPackToken *CardPackTokenTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _CardPackToken.Contract.TransferOwnership(&_CardPackToken.TransactOpts, newOwner)
}

// CardPackTokenApprovalIterator is returned from FilterApproval and is used to iterate over the raw logs and unpacked data for Approval events raised by the CardPackToken contract.
type CardPackTokenApprovalIterator struct {
	Event *CardPackTokenApproval // Event containing the contract specifics and raw log

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
func (it *CardPackTokenApprovalIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(CardPackTokenApproval)
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
		it.Event = new(CardPackTokenApproval)
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
func (it *CardPackTokenApprovalIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *CardPackTokenApprovalIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// CardPackTokenApproval represents a Approval event raised by the CardPackToken contract.
type CardPackTokenApproval struct {
	Owner   common.Address
	Spender common.Address
	Value   *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterApproval is a free log retrieval operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: e Approval(owner indexed address, spender indexed address, value uint256)
func (_CardPackToken *CardPackTokenFilterer) FilterApproval(opts *bind.FilterOpts, owner []common.Address, spender []common.Address) (*CardPackTokenApprovalIterator, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var spenderRule []interface{}
	for _, spenderItem := range spender {
		spenderRule = append(spenderRule, spenderItem)
	}

	logs, sub, err := _CardPackToken.contract.FilterLogs(opts, "Approval", ownerRule, spenderRule)
	if err != nil {
		return nil, err
	}
	return &CardPackTokenApprovalIterator{contract: _CardPackToken.contract, event: "Approval", logs: logs, sub: sub}, nil
}

// WatchApproval is a free log subscription operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: e Approval(owner indexed address, spender indexed address, value uint256)
func (_CardPackToken *CardPackTokenFilterer) WatchApproval(opts *bind.WatchOpts, sink chan<- *CardPackTokenApproval, owner []common.Address, spender []common.Address) (event.Subscription, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var spenderRule []interface{}
	for _, spenderItem := range spender {
		spenderRule = append(spenderRule, spenderItem)
	}

	logs, sub, err := _CardPackToken.contract.WatchLogs(opts, "Approval", ownerRule, spenderRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(CardPackTokenApproval)
				if err := _CardPackToken.contract.UnpackLog(event, "Approval", log); err != nil {
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

// CardPackTokenMintIterator is returned from FilterMint and is used to iterate over the raw logs and unpacked data for Mint events raised by the CardPackToken contract.
type CardPackTokenMintIterator struct {
	Event *CardPackTokenMint // Event containing the contract specifics and raw log

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
func (it *CardPackTokenMintIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(CardPackTokenMint)
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
		it.Event = new(CardPackTokenMint)
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
func (it *CardPackTokenMintIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *CardPackTokenMintIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// CardPackTokenMint represents a Mint event raised by the CardPackToken contract.
type CardPackTokenMint struct {
	To     common.Address
	Amount *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterMint is a free log retrieval operation binding the contract event 0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885.
//
// Solidity: e Mint(to indexed address, amount uint256)
func (_CardPackToken *CardPackTokenFilterer) FilterMint(opts *bind.FilterOpts, to []common.Address) (*CardPackTokenMintIterator, error) {

	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _CardPackToken.contract.FilterLogs(opts, "Mint", toRule)
	if err != nil {
		return nil, err
	}
	return &CardPackTokenMintIterator{contract: _CardPackToken.contract, event: "Mint", logs: logs, sub: sub}, nil
}

// WatchMint is a free log subscription operation binding the contract event 0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885.
//
// Solidity: e Mint(to indexed address, amount uint256)
func (_CardPackToken *CardPackTokenFilterer) WatchMint(opts *bind.WatchOpts, sink chan<- *CardPackTokenMint, to []common.Address) (event.Subscription, error) {

	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _CardPackToken.contract.WatchLogs(opts, "Mint", toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(CardPackTokenMint)
				if err := _CardPackToken.contract.UnpackLog(event, "Mint", log); err != nil {
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

// CardPackTokenMintFinishedIterator is returned from FilterMintFinished and is used to iterate over the raw logs and unpacked data for MintFinished events raised by the CardPackToken contract.
type CardPackTokenMintFinishedIterator struct {
	Event *CardPackTokenMintFinished // Event containing the contract specifics and raw log

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
func (it *CardPackTokenMintFinishedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(CardPackTokenMintFinished)
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
		it.Event = new(CardPackTokenMintFinished)
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
func (it *CardPackTokenMintFinishedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *CardPackTokenMintFinishedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// CardPackTokenMintFinished represents a MintFinished event raised by the CardPackToken contract.
type CardPackTokenMintFinished struct {
	Raw types.Log // Blockchain specific contextual infos
}

// FilterMintFinished is a free log retrieval operation binding the contract event 0xae5184fba832cb2b1f702aca6117b8d265eaf03ad33eb133f19dde0f5920fa08.
//
// Solidity: e MintFinished()
func (_CardPackToken *CardPackTokenFilterer) FilterMintFinished(opts *bind.FilterOpts) (*CardPackTokenMintFinishedIterator, error) {

	logs, sub, err := _CardPackToken.contract.FilterLogs(opts, "MintFinished")
	if err != nil {
		return nil, err
	}
	return &CardPackTokenMintFinishedIterator{contract: _CardPackToken.contract, event: "MintFinished", logs: logs, sub: sub}, nil
}

// WatchMintFinished is a free log subscription operation binding the contract event 0xae5184fba832cb2b1f702aca6117b8d265eaf03ad33eb133f19dde0f5920fa08.
//
// Solidity: e MintFinished()
func (_CardPackToken *CardPackTokenFilterer) WatchMintFinished(opts *bind.WatchOpts, sink chan<- *CardPackTokenMintFinished) (event.Subscription, error) {

	logs, sub, err := _CardPackToken.contract.WatchLogs(opts, "MintFinished")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(CardPackTokenMintFinished)
				if err := _CardPackToken.contract.UnpackLog(event, "MintFinished", log); err != nil {
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

// CardPackTokenOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the CardPackToken contract.
type CardPackTokenOwnershipTransferredIterator struct {
	Event *CardPackTokenOwnershipTransferred // Event containing the contract specifics and raw log

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
func (it *CardPackTokenOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(CardPackTokenOwnershipTransferred)
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
		it.Event = new(CardPackTokenOwnershipTransferred)
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
func (it *CardPackTokenOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *CardPackTokenOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// CardPackTokenOwnershipTransferred represents a OwnershipTransferred event raised by the CardPackToken contract.
type CardPackTokenOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: e OwnershipTransferred(previousOwner indexed address, newOwner indexed address)
func (_CardPackToken *CardPackTokenFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*CardPackTokenOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _CardPackToken.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &CardPackTokenOwnershipTransferredIterator{contract: _CardPackToken.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: e OwnershipTransferred(previousOwner indexed address, newOwner indexed address)
func (_CardPackToken *CardPackTokenFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *CardPackTokenOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _CardPackToken.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(CardPackTokenOwnershipTransferred)
				if err := _CardPackToken.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
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

// CardPackTokenTransferIterator is returned from FilterTransfer and is used to iterate over the raw logs and unpacked data for Transfer events raised by the CardPackToken contract.
type CardPackTokenTransferIterator struct {
	Event *CardPackTokenTransfer // Event containing the contract specifics and raw log

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
func (it *CardPackTokenTransferIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(CardPackTokenTransfer)
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
		it.Event = new(CardPackTokenTransfer)
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
func (it *CardPackTokenTransferIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *CardPackTokenTransferIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// CardPackTokenTransfer represents a Transfer event raised by the CardPackToken contract.
type CardPackTokenTransfer struct {
	From  common.Address
	To    common.Address
	Value *big.Int
	Raw   types.Log // Blockchain specific contextual infos
}

// FilterTransfer is a free log retrieval operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: e Transfer(from indexed address, to indexed address, value uint256)
func (_CardPackToken *CardPackTokenFilterer) FilterTransfer(opts *bind.FilterOpts, from []common.Address, to []common.Address) (*CardPackTokenTransferIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _CardPackToken.contract.FilterLogs(opts, "Transfer", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &CardPackTokenTransferIterator{contract: _CardPackToken.contract, event: "Transfer", logs: logs, sub: sub}, nil
}

// WatchTransfer is a free log subscription operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: e Transfer(from indexed address, to indexed address, value uint256)
func (_CardPackToken *CardPackTokenFilterer) WatchTransfer(opts *bind.WatchOpts, sink chan<- *CardPackTokenTransfer, from []common.Address, to []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _CardPackToken.contract.WatchLogs(opts, "Transfer", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(CardPackTokenTransfer)
				if err := _CardPackToken.contract.UnpackLog(event, "Transfer", log); err != nil {
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

// CardsABI is the input ABI used to generate the binding from.
const CardsABI = "[{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"tokenPosInArr\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"tokensForOwner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_cardId\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"tokensForApproved\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"implementsERC721\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_from\",\"type\":\"address\"},{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_cardId\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"},{\"name\":\"_index\",\"type\":\"uint256\"}],\"name\":\"tokenOfOwnerByIndex\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_cardId\",\"type\":\"uint256\"}],\"name\":\"ownerOf\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"balance\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"},{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"tokensOwned\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"getUserCards\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256[]\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_cardId\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"numOfCards\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"approved\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_to\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"Mint\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"}]"

// CardsBin is the compiled bytecode used for deploying new contracts.
const CardsBin = `0x608060405234801561001057600080fd5b5060008054600160a060020a03191633600160a060020a03161790556040805180820190915260118082527f53656c656e65616e43617264546f6b656e0000000000000000000000000000006020909201918252610070916005916100bb565b506040805180820190915260038082527f53454c000000000000000000000000000000000000000000000000000000000060209092019182526100b5916006916100bb565b50610156565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100fc57805160ff1916838001178555610129565b82800160010185558215610129579182015b8281111561012957825182559160200191906001019061010e565b50610135929150610139565b5090565b61015391905b80821115610135576000815560010161013f565b90565b610c38806101656000396000f3006080604052600436106100fb5763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663056cf1d9811461010057806306fdde031461012a57806308a6c05a146101b4578063095ea7b3146101e85780630de66a7d1461020e5780631051db341461022657806318160ddd1461024f57806323b872dd146102645780632f745c591461028e5780636352211e146102b257806370a08231146102ca578063853b5bb3146102eb57806388d9f40d1461030f5780638da5cb5b1461038057806395d89b4114610395578063a9059cbb146103aa578063ae1e36d9146103ce578063f2fde38b146103e3575b600080fd5b34801561010c57600080fd5b50610118600435610404565b60408051918252519081900360200190f35b34801561013657600080fd5b5061013f610416565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610179578181015183820152602001610161565b50505050905090810190601f1680156101a65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156101c057600080fd5b506101cc6004356104a4565b60408051600160a060020a039092168252519081900360200190f35b3480156101f457600080fd5b5061020c600160a060020a03600435166024356104bf565b005b34801561021a57600080fd5b506101cc6004356105bf565b34801561023257600080fd5b5061023b6105da565b604080519115158252519081900360200190f35b34801561025b57600080fd5b506101186105e0565b34801561027057600080fd5b5061020c600160a060020a03600435811690602435166044356105e6565b34801561029a57600080fd5b50610118600160a060020a0360043516602435610726565b3480156102be57600080fd5b506101cc60043561075d565b3480156102d657600080fd5b50610118600160a060020a0360043516610778565b3480156102f757600080fd5b50610118600160a060020a0360043516602435610793565b34801561031b57600080fd5b50610330600160a060020a03600435166107c3565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561036c578181015183820152602001610354565b505050509050019250505060405180910390f35b34801561038c57600080fd5b506101cc61082f565b3480156103a157600080fd5b5061013f61083e565b3480156103b657600080fd5b5061020c600160a060020a0360043516602435610899565b3480156103da57600080fd5b5061011861099e565b3480156103ef57600080fd5b5061020c600160a060020a03600435166109a4565b60046020526000908152604090205481565b6005805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561049c5780601f106104715761010080835404028352916020019161049c565b820191906000526020600020905b81548152906001019060200180831161047f57829003601f168201915b505050505081565b600160205260009081526040902054600160a060020a031681565b600081815260016020526040902054600160a060020a031615156104e257600080fd5b33600160a060020a03166104f58261075d565b600160a060020a03161461050857600080fd5b33600160a060020a031682600160a060020a03161415151561052957600080fd5b61053281610a3c565b600160a060020a03161515806105505750600160a060020a03821615155b156105bb57600081815260026020526040808220805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a038681169182179092559151849333909216917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a45b5050565b600260205260009081526040902054600160a060020a031681565b60015b90565b60075490565b600081815260016020526040902054600160a060020a0316151561060957600080fd5b33600160a060020a031661061c82610a3c565b600160a060020a03161461062f57600080fd5b82600160a060020a03166106428261075d565b600160a060020a03161461065557600080fd5b600160a060020a038216151561066a57600080fd5b6000818152600260205260409020805473ffffffffffffffffffffffffffffffffffffffff1916905561069d8382610a57565b6106a78282610b56565b80600084600160a060020a03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a48082600160a060020a031684600160a060020a03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b600160a060020a038216600090815260036020526040812080548390811061074a57fe5b9060005260206000200154905092915050565b600090815260016020526040902054600160a060020a031690565b600160a060020a031660009081526003602052604090205490565b6003602052816000526040600020818154811015156107ae57fe5b90600052602060002001600091509150505481565b600160a060020a03811660009081526003602090815260409182902080548351818402810184019094528084526060939283018282801561082357602002820191906000526020600020905b81548152602001906001019080831161080f575b50505050509050919050565b600054600160a060020a031681565b6006805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561049c5780601f106104715761010080835404028352916020019161049c565b600081815260016020526040902054600160a060020a031615156108bc57600080fd5b60008181526001602052604090205433600160a060020a039081169116146108e357600080fd5b6000818152600260205260409020805473ffffffffffffffffffffffffffffffffffffffff191690556109163382610a57565b6109208282610b56565b80600033600160a060020a03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a48082600160a060020a031633600160a060020a03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050565b60075481565b60005433600160a060020a039081169116146109bf57600080fd5b600160a060020a03811615156109d457600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b600090815260026020526040902054600160a060020a031690565b600160a060020a038216600081815260036020818152604080842080548786526004845291852054958552929091529291906000198401848110610a9757fe5b90600052602060002001549050806003600087600160a060020a0316600160a060020a0316815260200190815260200160002083815481101515610ad757fe5b6000918252602080832090910192909255828152600482526040808220859055600160a060020a038816825260039092522080546000198501908110610b1957fe5b60009182526020808320909101829055600160a060020a03871682526003905260409020805490610b4e906000198301610bc5565b505050505050565b6000818152600160208181526040808420805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039790971696871790559483526003815284832080549283018155808452818420909201849055905492825260049052919091206000199091019055565b815481835581811115610be957600083815260209020610be9918101908301610bee565b505050565b6105dd91905b80821115610c085760008155600101610bf4565b50905600a165627a7a72305820c9e12a9b86e4dfbe3f65508c6e5fabe4e1a792ec494786557dd42b089591da720029`

// DeployCards deploys a new Ethereum contract, binding an instance of Cards to it.
func DeployCards(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *Cards, error) {
	parsed, err := abi.JSON(strings.NewReader(CardsABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(CardsBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &Cards{CardsCaller: CardsCaller{contract: contract}, CardsTransactor: CardsTransactor{contract: contract}, CardsFilterer: CardsFilterer{contract: contract}}, nil
}

// Cards is an auto generated Go binding around an Ethereum contract.
type Cards struct {
	CardsCaller     // Read-only binding to the contract
	CardsTransactor // Write-only binding to the contract
	CardsFilterer   // Log filterer for contract events
}

// CardsCaller is an auto generated read-only Go binding around an Ethereum contract.
type CardsCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CardsTransactor is an auto generated write-only Go binding around an Ethereum contract.
type CardsTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CardsFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type CardsFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CardsSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type CardsSession struct {
	Contract     *Cards            // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// CardsCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type CardsCallerSession struct {
	Contract *CardsCaller  // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// CardsTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type CardsTransactorSession struct {
	Contract     *CardsTransactor  // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// CardsRaw is an auto generated low-level Go binding around an Ethereum contract.
type CardsRaw struct {
	Contract *Cards // Generic contract binding to access the raw methods on
}

// CardsCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type CardsCallerRaw struct {
	Contract *CardsCaller // Generic read-only contract binding to access the raw methods on
}

// CardsTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type CardsTransactorRaw struct {
	Contract *CardsTransactor // Generic write-only contract binding to access the raw methods on
}

// NewCards creates a new instance of Cards, bound to a specific deployed contract.
func NewCards(address common.Address, backend bind.ContractBackend) (*Cards, error) {
	contract, err := bindCards(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Cards{CardsCaller: CardsCaller{contract: contract}, CardsTransactor: CardsTransactor{contract: contract}, CardsFilterer: CardsFilterer{contract: contract}}, nil
}

// NewCardsCaller creates a new read-only instance of Cards, bound to a specific deployed contract.
func NewCardsCaller(address common.Address, caller bind.ContractCaller) (*CardsCaller, error) {
	contract, err := bindCards(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &CardsCaller{contract: contract}, nil
}

// NewCardsTransactor creates a new write-only instance of Cards, bound to a specific deployed contract.
func NewCardsTransactor(address common.Address, transactor bind.ContractTransactor) (*CardsTransactor, error) {
	contract, err := bindCards(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &CardsTransactor{contract: contract}, nil
}

// NewCardsFilterer creates a new log filterer instance of Cards, bound to a specific deployed contract.
func NewCardsFilterer(address common.Address, filterer bind.ContractFilterer) (*CardsFilterer, error) {
	contract, err := bindCards(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &CardsFilterer{contract: contract}, nil
}

// bindCards binds a generic wrapper to an already deployed contract.
func bindCards(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(CardsABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Cards *CardsRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _Cards.Contract.CardsCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Cards *CardsRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Cards.Contract.CardsTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Cards *CardsRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Cards.Contract.CardsTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Cards *CardsCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _Cards.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Cards *CardsTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Cards.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Cards *CardsTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Cards.Contract.contract.Transact(opts, method, params...)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(_owner address) constant returns(balance uint256)
func (_Cards *CardsCaller) BalanceOf(opts *bind.CallOpts, _owner common.Address) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Cards.contract.Call(opts, out, "balanceOf", _owner)
	return *ret0, err
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(_owner address) constant returns(balance uint256)
func (_Cards *CardsSession) BalanceOf(_owner common.Address) (*big.Int, error) {
	return _Cards.Contract.BalanceOf(&_Cards.CallOpts, _owner)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(_owner address) constant returns(balance uint256)
func (_Cards *CardsCallerSession) BalanceOf(_owner common.Address) (*big.Int, error) {
	return _Cards.Contract.BalanceOf(&_Cards.CallOpts, _owner)
}

// GetUserCards is a free data retrieval call binding the contract method 0x88d9f40d.
//
// Solidity: function getUserCards(_owner address) constant returns(uint256[])
func (_Cards *CardsCaller) GetUserCards(opts *bind.CallOpts, _owner common.Address) ([]*big.Int, error) {
	var (
		ret0 = new([]*big.Int)
	)
	out := ret0
	err := _Cards.contract.Call(opts, out, "getUserCards", _owner)
	return *ret0, err
}

// GetUserCards is a free data retrieval call binding the contract method 0x88d9f40d.
//
// Solidity: function getUserCards(_owner address) constant returns(uint256[])
func (_Cards *CardsSession) GetUserCards(_owner common.Address) ([]*big.Int, error) {
	return _Cards.Contract.GetUserCards(&_Cards.CallOpts, _owner)
}

// GetUserCards is a free data retrieval call binding the contract method 0x88d9f40d.
//
// Solidity: function getUserCards(_owner address) constant returns(uint256[])
func (_Cards *CardsCallerSession) GetUserCards(_owner common.Address) ([]*big.Int, error) {
	return _Cards.Contract.GetUserCards(&_Cards.CallOpts, _owner)
}

// ImplementsERC721 is a free data retrieval call binding the contract method 0x1051db34.
//
// Solidity: function implementsERC721() constant returns(bool)
func (_Cards *CardsCaller) ImplementsERC721(opts *bind.CallOpts) (bool, error) {
	var (
		ret0 = new(bool)
	)
	out := ret0
	err := _Cards.contract.Call(opts, out, "implementsERC721")
	return *ret0, err
}

// ImplementsERC721 is a free data retrieval call binding the contract method 0x1051db34.
//
// Solidity: function implementsERC721() constant returns(bool)
func (_Cards *CardsSession) ImplementsERC721() (bool, error) {
	return _Cards.Contract.ImplementsERC721(&_Cards.CallOpts)
}

// ImplementsERC721 is a free data retrieval call binding the contract method 0x1051db34.
//
// Solidity: function implementsERC721() constant returns(bool)
func (_Cards *CardsCallerSession) ImplementsERC721() (bool, error) {
	return _Cards.Contract.ImplementsERC721(&_Cards.CallOpts)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() constant returns(string)
func (_Cards *CardsCaller) Name(opts *bind.CallOpts) (string, error) {
	var (
		ret0 = new(string)
	)
	out := ret0
	err := _Cards.contract.Call(opts, out, "name")
	return *ret0, err
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() constant returns(string)
func (_Cards *CardsSession) Name() (string, error) {
	return _Cards.Contract.Name(&_Cards.CallOpts)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() constant returns(string)
func (_Cards *CardsCallerSession) Name() (string, error) {
	return _Cards.Contract.Name(&_Cards.CallOpts)
}

// NumOfCards is a free data retrieval call binding the contract method 0xae1e36d9.
//
// Solidity: function numOfCards() constant returns(uint256)
func (_Cards *CardsCaller) NumOfCards(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Cards.contract.Call(opts, out, "numOfCards")
	return *ret0, err
}

// NumOfCards is a free data retrieval call binding the contract method 0xae1e36d9.
//
// Solidity: function numOfCards() constant returns(uint256)
func (_Cards *CardsSession) NumOfCards() (*big.Int, error) {
	return _Cards.Contract.NumOfCards(&_Cards.CallOpts)
}

// NumOfCards is a free data retrieval call binding the contract method 0xae1e36d9.
//
// Solidity: function numOfCards() constant returns(uint256)
func (_Cards *CardsCallerSession) NumOfCards() (*big.Int, error) {
	return _Cards.Contract.NumOfCards(&_Cards.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_Cards *CardsCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _Cards.contract.Call(opts, out, "owner")
	return *ret0, err
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_Cards *CardsSession) Owner() (common.Address, error) {
	return _Cards.Contract.Owner(&_Cards.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_Cards *CardsCallerSession) Owner() (common.Address, error) {
	return _Cards.Contract.Owner(&_Cards.CallOpts)
}

// OwnerOf is a free data retrieval call binding the contract method 0x6352211e.
//
// Solidity: function ownerOf(_cardId uint256) constant returns(address)
func (_Cards *CardsCaller) OwnerOf(opts *bind.CallOpts, _cardId *big.Int) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _Cards.contract.Call(opts, out, "ownerOf", _cardId)
	return *ret0, err
}

// OwnerOf is a free data retrieval call binding the contract method 0x6352211e.
//
// Solidity: function ownerOf(_cardId uint256) constant returns(address)
func (_Cards *CardsSession) OwnerOf(_cardId *big.Int) (common.Address, error) {
	return _Cards.Contract.OwnerOf(&_Cards.CallOpts, _cardId)
}

// OwnerOf is a free data retrieval call binding the contract method 0x6352211e.
//
// Solidity: function ownerOf(_cardId uint256) constant returns(address)
func (_Cards *CardsCallerSession) OwnerOf(_cardId *big.Int) (common.Address, error) {
	return _Cards.Contract.OwnerOf(&_Cards.CallOpts, _cardId)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() constant returns(string)
func (_Cards *CardsCaller) Symbol(opts *bind.CallOpts) (string, error) {
	var (
		ret0 = new(string)
	)
	out := ret0
	err := _Cards.contract.Call(opts, out, "symbol")
	return *ret0, err
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() constant returns(string)
func (_Cards *CardsSession) Symbol() (string, error) {
	return _Cards.Contract.Symbol(&_Cards.CallOpts)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() constant returns(string)
func (_Cards *CardsCallerSession) Symbol() (string, error) {
	return _Cards.Contract.Symbol(&_Cards.CallOpts)
}

// TokenOfOwnerByIndex is a free data retrieval call binding the contract method 0x2f745c59.
//
// Solidity: function tokenOfOwnerByIndex(_owner address, _index uint256) constant returns(uint256)
func (_Cards *CardsCaller) TokenOfOwnerByIndex(opts *bind.CallOpts, _owner common.Address, _index *big.Int) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Cards.contract.Call(opts, out, "tokenOfOwnerByIndex", _owner, _index)
	return *ret0, err
}

// TokenOfOwnerByIndex is a free data retrieval call binding the contract method 0x2f745c59.
//
// Solidity: function tokenOfOwnerByIndex(_owner address, _index uint256) constant returns(uint256)
func (_Cards *CardsSession) TokenOfOwnerByIndex(_owner common.Address, _index *big.Int) (*big.Int, error) {
	return _Cards.Contract.TokenOfOwnerByIndex(&_Cards.CallOpts, _owner, _index)
}

// TokenOfOwnerByIndex is a free data retrieval call binding the contract method 0x2f745c59.
//
// Solidity: function tokenOfOwnerByIndex(_owner address, _index uint256) constant returns(uint256)
func (_Cards *CardsCallerSession) TokenOfOwnerByIndex(_owner common.Address, _index *big.Int) (*big.Int, error) {
	return _Cards.Contract.TokenOfOwnerByIndex(&_Cards.CallOpts, _owner, _index)
}

// TokenPosInArr is a free data retrieval call binding the contract method 0x056cf1d9.
//
// Solidity: function tokenPosInArr( uint256) constant returns(uint256)
func (_Cards *CardsCaller) TokenPosInArr(opts *bind.CallOpts, arg0 *big.Int) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Cards.contract.Call(opts, out, "tokenPosInArr", arg0)
	return *ret0, err
}

// TokenPosInArr is a free data retrieval call binding the contract method 0x056cf1d9.
//
// Solidity: function tokenPosInArr( uint256) constant returns(uint256)
func (_Cards *CardsSession) TokenPosInArr(arg0 *big.Int) (*big.Int, error) {
	return _Cards.Contract.TokenPosInArr(&_Cards.CallOpts, arg0)
}

// TokenPosInArr is a free data retrieval call binding the contract method 0x056cf1d9.
//
// Solidity: function tokenPosInArr( uint256) constant returns(uint256)
func (_Cards *CardsCallerSession) TokenPosInArr(arg0 *big.Int) (*big.Int, error) {
	return _Cards.Contract.TokenPosInArr(&_Cards.CallOpts, arg0)
}

// TokensForApproved is a free data retrieval call binding the contract method 0x0de66a7d.
//
// Solidity: function tokensForApproved( uint256) constant returns(address)
func (_Cards *CardsCaller) TokensForApproved(opts *bind.CallOpts, arg0 *big.Int) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _Cards.contract.Call(opts, out, "tokensForApproved", arg0)
	return *ret0, err
}

// TokensForApproved is a free data retrieval call binding the contract method 0x0de66a7d.
//
// Solidity: function tokensForApproved( uint256) constant returns(address)
func (_Cards *CardsSession) TokensForApproved(arg0 *big.Int) (common.Address, error) {
	return _Cards.Contract.TokensForApproved(&_Cards.CallOpts, arg0)
}

// TokensForApproved is a free data retrieval call binding the contract method 0x0de66a7d.
//
// Solidity: function tokensForApproved( uint256) constant returns(address)
func (_Cards *CardsCallerSession) TokensForApproved(arg0 *big.Int) (common.Address, error) {
	return _Cards.Contract.TokensForApproved(&_Cards.CallOpts, arg0)
}

// TokensForOwner is a free data retrieval call binding the contract method 0x08a6c05a.
//
// Solidity: function tokensForOwner( uint256) constant returns(address)
func (_Cards *CardsCaller) TokensForOwner(opts *bind.CallOpts, arg0 *big.Int) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _Cards.contract.Call(opts, out, "tokensForOwner", arg0)
	return *ret0, err
}

// TokensForOwner is a free data retrieval call binding the contract method 0x08a6c05a.
//
// Solidity: function tokensForOwner( uint256) constant returns(address)
func (_Cards *CardsSession) TokensForOwner(arg0 *big.Int) (common.Address, error) {
	return _Cards.Contract.TokensForOwner(&_Cards.CallOpts, arg0)
}

// TokensForOwner is a free data retrieval call binding the contract method 0x08a6c05a.
//
// Solidity: function tokensForOwner( uint256) constant returns(address)
func (_Cards *CardsCallerSession) TokensForOwner(arg0 *big.Int) (common.Address, error) {
	return _Cards.Contract.TokensForOwner(&_Cards.CallOpts, arg0)
}

// TokensOwned is a free data retrieval call binding the contract method 0x853b5bb3.
//
// Solidity: function tokensOwned( address,  uint256) constant returns(uint256)
func (_Cards *CardsCaller) TokensOwned(opts *bind.CallOpts, arg0 common.Address, arg1 *big.Int) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Cards.contract.Call(opts, out, "tokensOwned", arg0, arg1)
	return *ret0, err
}

// TokensOwned is a free data retrieval call binding the contract method 0x853b5bb3.
//
// Solidity: function tokensOwned( address,  uint256) constant returns(uint256)
func (_Cards *CardsSession) TokensOwned(arg0 common.Address, arg1 *big.Int) (*big.Int, error) {
	return _Cards.Contract.TokensOwned(&_Cards.CallOpts, arg0, arg1)
}

// TokensOwned is a free data retrieval call binding the contract method 0x853b5bb3.
//
// Solidity: function tokensOwned( address,  uint256) constant returns(uint256)
func (_Cards *CardsCallerSession) TokensOwned(arg0 common.Address, arg1 *big.Int) (*big.Int, error) {
	return _Cards.Contract.TokensOwned(&_Cards.CallOpts, arg0, arg1)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_Cards *CardsCaller) TotalSupply(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Cards.contract.Call(opts, out, "totalSupply")
	return *ret0, err
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_Cards *CardsSession) TotalSupply() (*big.Int, error) {
	return _Cards.Contract.TotalSupply(&_Cards.CallOpts)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_Cards *CardsCallerSession) TotalSupply() (*big.Int, error) {
	return _Cards.Contract.TotalSupply(&_Cards.CallOpts)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(_to address, _cardId uint256) returns()
func (_Cards *CardsTransactor) Approve(opts *bind.TransactOpts, _to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _Cards.contract.Transact(opts, "approve", _to, _cardId)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(_to address, _cardId uint256) returns()
func (_Cards *CardsSession) Approve(_to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _Cards.Contract.Approve(&_Cards.TransactOpts, _to, _cardId)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(_to address, _cardId uint256) returns()
func (_Cards *CardsTransactorSession) Approve(_to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _Cards.Contract.Approve(&_Cards.TransactOpts, _to, _cardId)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(_to address, _cardId uint256) returns()
func (_Cards *CardsTransactor) Transfer(opts *bind.TransactOpts, _to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _Cards.contract.Transact(opts, "transfer", _to, _cardId)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(_to address, _cardId uint256) returns()
func (_Cards *CardsSession) Transfer(_to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _Cards.Contract.Transfer(&_Cards.TransactOpts, _to, _cardId)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(_to address, _cardId uint256) returns()
func (_Cards *CardsTransactorSession) Transfer(_to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _Cards.Contract.Transfer(&_Cards.TransactOpts, _to, _cardId)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(_from address, _to address, _cardId uint256) returns()
func (_Cards *CardsTransactor) TransferFrom(opts *bind.TransactOpts, _from common.Address, _to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _Cards.contract.Transact(opts, "transferFrom", _from, _to, _cardId)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(_from address, _to address, _cardId uint256) returns()
func (_Cards *CardsSession) TransferFrom(_from common.Address, _to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _Cards.Contract.TransferFrom(&_Cards.TransactOpts, _from, _to, _cardId)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(_from address, _to address, _cardId uint256) returns()
func (_Cards *CardsTransactorSession) TransferFrom(_from common.Address, _to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _Cards.Contract.TransferFrom(&_Cards.TransactOpts, _from, _to, _cardId)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_Cards *CardsTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _Cards.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_Cards *CardsSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Cards.Contract.TransferOwnership(&_Cards.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_Cards *CardsTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Cards.Contract.TransferOwnership(&_Cards.TransactOpts, newOwner)
}

// CardsApprovalIterator is returned from FilterApproval and is used to iterate over the raw logs and unpacked data for Approval events raised by the Cards contract.
type CardsApprovalIterator struct {
	Event *CardsApproval // Event containing the contract specifics and raw log

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
func (it *CardsApprovalIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(CardsApproval)
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
		it.Event = new(CardsApproval)
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
func (it *CardsApprovalIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *CardsApprovalIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// CardsApproval represents a Approval event raised by the Cards contract.
type CardsApproval struct {
	Owner    common.Address
	Approved common.Address
	TokenId  *big.Int
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterApproval is a free log retrieval operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: e Approval(owner indexed address, approved indexed address, tokenId indexed uint256)
func (_Cards *CardsFilterer) FilterApproval(opts *bind.FilterOpts, owner []common.Address, approved []common.Address, tokenId []*big.Int) (*CardsApprovalIterator, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var approvedRule []interface{}
	for _, approvedItem := range approved {
		approvedRule = append(approvedRule, approvedItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _Cards.contract.FilterLogs(opts, "Approval", ownerRule, approvedRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return &CardsApprovalIterator{contract: _Cards.contract, event: "Approval", logs: logs, sub: sub}, nil
}

// WatchApproval is a free log subscription operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: e Approval(owner indexed address, approved indexed address, tokenId indexed uint256)
func (_Cards *CardsFilterer) WatchApproval(opts *bind.WatchOpts, sink chan<- *CardsApproval, owner []common.Address, approved []common.Address, tokenId []*big.Int) (event.Subscription, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var approvedRule []interface{}
	for _, approvedItem := range approved {
		approvedRule = append(approvedRule, approvedItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _Cards.contract.WatchLogs(opts, "Approval", ownerRule, approvedRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(CardsApproval)
				if err := _Cards.contract.UnpackLog(event, "Approval", log); err != nil {
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

// CardsMintIterator is returned from FilterMint and is used to iterate over the raw logs and unpacked data for Mint events raised by the Cards contract.
type CardsMintIterator struct {
	Event *CardsMint // Event containing the contract specifics and raw log

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
func (it *CardsMintIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(CardsMint)
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
		it.Event = new(CardsMint)
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
func (it *CardsMintIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *CardsMintIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// CardsMint represents a Mint event raised by the Cards contract.
type CardsMint struct {
	To      common.Address
	TokenId *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterMint is a free log retrieval operation binding the contract event 0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885.
//
// Solidity: e Mint(_to indexed address, _tokenId indexed uint256)
func (_Cards *CardsFilterer) FilterMint(opts *bind.FilterOpts, _to []common.Address, _tokenId []*big.Int) (*CardsMintIterator, error) {

	var _toRule []interface{}
	for _, _toItem := range _to {
		_toRule = append(_toRule, _toItem)
	}
	var _tokenIdRule []interface{}
	for _, _tokenIdItem := range _tokenId {
		_tokenIdRule = append(_tokenIdRule, _tokenIdItem)
	}

	logs, sub, err := _Cards.contract.FilterLogs(opts, "Mint", _toRule, _tokenIdRule)
	if err != nil {
		return nil, err
	}
	return &CardsMintIterator{contract: _Cards.contract, event: "Mint", logs: logs, sub: sub}, nil
}

// WatchMint is a free log subscription operation binding the contract event 0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885.
//
// Solidity: e Mint(_to indexed address, _tokenId indexed uint256)
func (_Cards *CardsFilterer) WatchMint(opts *bind.WatchOpts, sink chan<- *CardsMint, _to []common.Address, _tokenId []*big.Int) (event.Subscription, error) {

	var _toRule []interface{}
	for _, _toItem := range _to {
		_toRule = append(_toRule, _toItem)
	}
	var _tokenIdRule []interface{}
	for _, _tokenIdItem := range _tokenId {
		_tokenIdRule = append(_tokenIdRule, _tokenIdItem)
	}

	logs, sub, err := _Cards.contract.WatchLogs(opts, "Mint", _toRule, _tokenIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(CardsMint)
				if err := _Cards.contract.UnpackLog(event, "Mint", log); err != nil {
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

// CardsOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the Cards contract.
type CardsOwnershipTransferredIterator struct {
	Event *CardsOwnershipTransferred // Event containing the contract specifics and raw log

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
func (it *CardsOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(CardsOwnershipTransferred)
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
		it.Event = new(CardsOwnershipTransferred)
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
func (it *CardsOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *CardsOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// CardsOwnershipTransferred represents a OwnershipTransferred event raised by the Cards contract.
type CardsOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: e OwnershipTransferred(previousOwner indexed address, newOwner indexed address)
func (_Cards *CardsFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*CardsOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Cards.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &CardsOwnershipTransferredIterator{contract: _Cards.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: e OwnershipTransferred(previousOwner indexed address, newOwner indexed address)
func (_Cards *CardsFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *CardsOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Cards.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(CardsOwnershipTransferred)
				if err := _Cards.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
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

// CardsTransferIterator is returned from FilterTransfer and is used to iterate over the raw logs and unpacked data for Transfer events raised by the Cards contract.
type CardsTransferIterator struct {
	Event *CardsTransfer // Event containing the contract specifics and raw log

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
func (it *CardsTransferIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(CardsTransfer)
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
		it.Event = new(CardsTransfer)
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
func (it *CardsTransferIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *CardsTransferIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// CardsTransfer represents a Transfer event raised by the Cards contract.
type CardsTransfer struct {
	From    common.Address
	To      common.Address
	TokenId *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterTransfer is a free log retrieval operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: e Transfer(from indexed address, to indexed address, tokenId indexed uint256)
func (_Cards *CardsFilterer) FilterTransfer(opts *bind.FilterOpts, from []common.Address, to []common.Address, tokenId []*big.Int) (*CardsTransferIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _Cards.contract.FilterLogs(opts, "Transfer", fromRule, toRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return &CardsTransferIterator{contract: _Cards.contract, event: "Transfer", logs: logs, sub: sub}, nil
}

// WatchTransfer is a free log subscription operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: e Transfer(from indexed address, to indexed address, tokenId indexed uint256)
func (_Cards *CardsFilterer) WatchTransfer(opts *bind.WatchOpts, sink chan<- *CardsTransfer, from []common.Address, to []common.Address, tokenId []*big.Int) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _Cards.contract.WatchLogs(opts, "Transfer", fromRule, toRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(CardsTransfer)
				if err := _Cards.contract.UnpackLog(event, "Transfer", log); err != nil {
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

// ERC20ABI is the input ABI used to generate the binding from.
const ERC20ABI = "[{\"constant\":false,\"inputs\":[{\"name\":\"spender\",\"type\":\"address\"},{\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"from\",\"type\":\"address\"},{\"name\":\"to\",\"type\":\"address\"},{\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"who\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"to\",\"type\":\"address\"},{\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"owner\",\"type\":\"address\"},{\"name\":\"spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"}]"

// ERC20Bin is the compiled bytecode used for deploying new contracts.
const ERC20Bin = `0x`

// DeployERC20 deploys a new Ethereum contract, binding an instance of ERC20 to it.
func DeployERC20(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *ERC20, error) {
	parsed, err := abi.JSON(strings.NewReader(ERC20ABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(ERC20Bin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &ERC20{ERC20Caller: ERC20Caller{contract: contract}, ERC20Transactor: ERC20Transactor{contract: contract}, ERC20Filterer: ERC20Filterer{contract: contract}}, nil
}

// ERC20 is an auto generated Go binding around an Ethereum contract.
type ERC20 struct {
	ERC20Caller     // Read-only binding to the contract
	ERC20Transactor // Write-only binding to the contract
	ERC20Filterer   // Log filterer for contract events
}

// ERC20Caller is an auto generated read-only Go binding around an Ethereum contract.
type ERC20Caller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ERC20Transactor is an auto generated write-only Go binding around an Ethereum contract.
type ERC20Transactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ERC20Filterer is an auto generated log filtering Go binding around an Ethereum contract events.
type ERC20Filterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ERC20Session is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type ERC20Session struct {
	Contract     *ERC20            // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// ERC20CallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type ERC20CallerSession struct {
	Contract *ERC20Caller  // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// ERC20TransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type ERC20TransactorSession struct {
	Contract     *ERC20Transactor  // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// ERC20Raw is an auto generated low-level Go binding around an Ethereum contract.
type ERC20Raw struct {
	Contract *ERC20 // Generic contract binding to access the raw methods on
}

// ERC20CallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type ERC20CallerRaw struct {
	Contract *ERC20Caller // Generic read-only contract binding to access the raw methods on
}

// ERC20TransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type ERC20TransactorRaw struct {
	Contract *ERC20Transactor // Generic write-only contract binding to access the raw methods on
}

// NewERC20 creates a new instance of ERC20, bound to a specific deployed contract.
func NewERC20(address common.Address, backend bind.ContractBackend) (*ERC20, error) {
	contract, err := bindERC20(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &ERC20{ERC20Caller: ERC20Caller{contract: contract}, ERC20Transactor: ERC20Transactor{contract: contract}, ERC20Filterer: ERC20Filterer{contract: contract}}, nil
}

// NewERC20Caller creates a new read-only instance of ERC20, bound to a specific deployed contract.
func NewERC20Caller(address common.Address, caller bind.ContractCaller) (*ERC20Caller, error) {
	contract, err := bindERC20(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &ERC20Caller{contract: contract}, nil
}

// NewERC20Transactor creates a new write-only instance of ERC20, bound to a specific deployed contract.
func NewERC20Transactor(address common.Address, transactor bind.ContractTransactor) (*ERC20Transactor, error) {
	contract, err := bindERC20(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &ERC20Transactor{contract: contract}, nil
}

// NewERC20Filterer creates a new log filterer instance of ERC20, bound to a specific deployed contract.
func NewERC20Filterer(address common.Address, filterer bind.ContractFilterer) (*ERC20Filterer, error) {
	contract, err := bindERC20(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &ERC20Filterer{contract: contract}, nil
}

// bindERC20 binds a generic wrapper to an already deployed contract.
func bindERC20(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(ERC20ABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ERC20 *ERC20Raw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _ERC20.Contract.ERC20Caller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ERC20 *ERC20Raw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ERC20.Contract.ERC20Transactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ERC20 *ERC20Raw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ERC20.Contract.ERC20Transactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ERC20 *ERC20CallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _ERC20.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ERC20 *ERC20TransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ERC20.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ERC20 *ERC20TransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ERC20.Contract.contract.Transact(opts, method, params...)
}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(owner address, spender address) constant returns(uint256)
func (_ERC20 *ERC20Caller) Allowance(opts *bind.CallOpts, owner common.Address, spender common.Address) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _ERC20.contract.Call(opts, out, "allowance", owner, spender)
	return *ret0, err
}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(owner address, spender address) constant returns(uint256)
func (_ERC20 *ERC20Session) Allowance(owner common.Address, spender common.Address) (*big.Int, error) {
	return _ERC20.Contract.Allowance(&_ERC20.CallOpts, owner, spender)
}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(owner address, spender address) constant returns(uint256)
func (_ERC20 *ERC20CallerSession) Allowance(owner common.Address, spender common.Address) (*big.Int, error) {
	return _ERC20.Contract.Allowance(&_ERC20.CallOpts, owner, spender)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(who address) constant returns(uint256)
func (_ERC20 *ERC20Caller) BalanceOf(opts *bind.CallOpts, who common.Address) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _ERC20.contract.Call(opts, out, "balanceOf", who)
	return *ret0, err
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(who address) constant returns(uint256)
func (_ERC20 *ERC20Session) BalanceOf(who common.Address) (*big.Int, error) {
	return _ERC20.Contract.BalanceOf(&_ERC20.CallOpts, who)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(who address) constant returns(uint256)
func (_ERC20 *ERC20CallerSession) BalanceOf(who common.Address) (*big.Int, error) {
	return _ERC20.Contract.BalanceOf(&_ERC20.CallOpts, who)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_ERC20 *ERC20Caller) TotalSupply(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _ERC20.contract.Call(opts, out, "totalSupply")
	return *ret0, err
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_ERC20 *ERC20Session) TotalSupply() (*big.Int, error) {
	return _ERC20.Contract.TotalSupply(&_ERC20.CallOpts)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_ERC20 *ERC20CallerSession) TotalSupply() (*big.Int, error) {
	return _ERC20.Contract.TotalSupply(&_ERC20.CallOpts)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(spender address, value uint256) returns(bool)
func (_ERC20 *ERC20Transactor) Approve(opts *bind.TransactOpts, spender common.Address, value *big.Int) (*types.Transaction, error) {
	return _ERC20.contract.Transact(opts, "approve", spender, value)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(spender address, value uint256) returns(bool)
func (_ERC20 *ERC20Session) Approve(spender common.Address, value *big.Int) (*types.Transaction, error) {
	return _ERC20.Contract.Approve(&_ERC20.TransactOpts, spender, value)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(spender address, value uint256) returns(bool)
func (_ERC20 *ERC20TransactorSession) Approve(spender common.Address, value *big.Int) (*types.Transaction, error) {
	return _ERC20.Contract.Approve(&_ERC20.TransactOpts, spender, value)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(to address, value uint256) returns(bool)
func (_ERC20 *ERC20Transactor) Transfer(opts *bind.TransactOpts, to common.Address, value *big.Int) (*types.Transaction, error) {
	return _ERC20.contract.Transact(opts, "transfer", to, value)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(to address, value uint256) returns(bool)
func (_ERC20 *ERC20Session) Transfer(to common.Address, value *big.Int) (*types.Transaction, error) {
	return _ERC20.Contract.Transfer(&_ERC20.TransactOpts, to, value)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(to address, value uint256) returns(bool)
func (_ERC20 *ERC20TransactorSession) Transfer(to common.Address, value *big.Int) (*types.Transaction, error) {
	return _ERC20.Contract.Transfer(&_ERC20.TransactOpts, to, value)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(from address, to address, value uint256) returns(bool)
func (_ERC20 *ERC20Transactor) TransferFrom(opts *bind.TransactOpts, from common.Address, to common.Address, value *big.Int) (*types.Transaction, error) {
	return _ERC20.contract.Transact(opts, "transferFrom", from, to, value)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(from address, to address, value uint256) returns(bool)
func (_ERC20 *ERC20Session) TransferFrom(from common.Address, to common.Address, value *big.Int) (*types.Transaction, error) {
	return _ERC20.Contract.TransferFrom(&_ERC20.TransactOpts, from, to, value)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(from address, to address, value uint256) returns(bool)
func (_ERC20 *ERC20TransactorSession) TransferFrom(from common.Address, to common.Address, value *big.Int) (*types.Transaction, error) {
	return _ERC20.Contract.TransferFrom(&_ERC20.TransactOpts, from, to, value)
}

// ERC20ApprovalIterator is returned from FilterApproval and is used to iterate over the raw logs and unpacked data for Approval events raised by the ERC20 contract.
type ERC20ApprovalIterator struct {
	Event *ERC20Approval // Event containing the contract specifics and raw log

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
func (it *ERC20ApprovalIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ERC20Approval)
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
		it.Event = new(ERC20Approval)
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
func (it *ERC20ApprovalIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ERC20ApprovalIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ERC20Approval represents a Approval event raised by the ERC20 contract.
type ERC20Approval struct {
	Owner   common.Address
	Spender common.Address
	Value   *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterApproval is a free log retrieval operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: e Approval(owner indexed address, spender indexed address, value uint256)
func (_ERC20 *ERC20Filterer) FilterApproval(opts *bind.FilterOpts, owner []common.Address, spender []common.Address) (*ERC20ApprovalIterator, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var spenderRule []interface{}
	for _, spenderItem := range spender {
		spenderRule = append(spenderRule, spenderItem)
	}

	logs, sub, err := _ERC20.contract.FilterLogs(opts, "Approval", ownerRule, spenderRule)
	if err != nil {
		return nil, err
	}
	return &ERC20ApprovalIterator{contract: _ERC20.contract, event: "Approval", logs: logs, sub: sub}, nil
}

// WatchApproval is a free log subscription operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: e Approval(owner indexed address, spender indexed address, value uint256)
func (_ERC20 *ERC20Filterer) WatchApproval(opts *bind.WatchOpts, sink chan<- *ERC20Approval, owner []common.Address, spender []common.Address) (event.Subscription, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var spenderRule []interface{}
	for _, spenderItem := range spender {
		spenderRule = append(spenderRule, spenderItem)
	}

	logs, sub, err := _ERC20.contract.WatchLogs(opts, "Approval", ownerRule, spenderRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ERC20Approval)
				if err := _ERC20.contract.UnpackLog(event, "Approval", log); err != nil {
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

// ERC20TransferIterator is returned from FilterTransfer and is used to iterate over the raw logs and unpacked data for Transfer events raised by the ERC20 contract.
type ERC20TransferIterator struct {
	Event *ERC20Transfer // Event containing the contract specifics and raw log

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
func (it *ERC20TransferIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ERC20Transfer)
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
		it.Event = new(ERC20Transfer)
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
func (it *ERC20TransferIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ERC20TransferIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ERC20Transfer represents a Transfer event raised by the ERC20 contract.
type ERC20Transfer struct {
	From  common.Address
	To    common.Address
	Value *big.Int
	Raw   types.Log // Blockchain specific contextual infos
}

// FilterTransfer is a free log retrieval operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: e Transfer(from indexed address, to indexed address, value uint256)
func (_ERC20 *ERC20Filterer) FilterTransfer(opts *bind.FilterOpts, from []common.Address, to []common.Address) (*ERC20TransferIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _ERC20.contract.FilterLogs(opts, "Transfer", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &ERC20TransferIterator{contract: _ERC20.contract, event: "Transfer", logs: logs, sub: sub}, nil
}

// WatchTransfer is a free log subscription operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: e Transfer(from indexed address, to indexed address, value uint256)
func (_ERC20 *ERC20Filterer) WatchTransfer(opts *bind.WatchOpts, sink chan<- *ERC20Transfer, from []common.Address, to []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _ERC20.contract.WatchLogs(opts, "Transfer", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ERC20Transfer)
				if err := _ERC20.contract.UnpackLog(event, "Transfer", log); err != nil {
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

// ERC20BasicABI is the input ABI used to generate the binding from.
const ERC20BasicABI = "[{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"who\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"to\",\"type\":\"address\"},{\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"}]"

// ERC20BasicBin is the compiled bytecode used for deploying new contracts.
const ERC20BasicBin = `0x`

// DeployERC20Basic deploys a new Ethereum contract, binding an instance of ERC20Basic to it.
func DeployERC20Basic(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *ERC20Basic, error) {
	parsed, err := abi.JSON(strings.NewReader(ERC20BasicABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(ERC20BasicBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &ERC20Basic{ERC20BasicCaller: ERC20BasicCaller{contract: contract}, ERC20BasicTransactor: ERC20BasicTransactor{contract: contract}, ERC20BasicFilterer: ERC20BasicFilterer{contract: contract}}, nil
}

// ERC20Basic is an auto generated Go binding around an Ethereum contract.
type ERC20Basic struct {
	ERC20BasicCaller     // Read-only binding to the contract
	ERC20BasicTransactor // Write-only binding to the contract
	ERC20BasicFilterer   // Log filterer for contract events
}

// ERC20BasicCaller is an auto generated read-only Go binding around an Ethereum contract.
type ERC20BasicCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ERC20BasicTransactor is an auto generated write-only Go binding around an Ethereum contract.
type ERC20BasicTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ERC20BasicFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type ERC20BasicFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ERC20BasicSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type ERC20BasicSession struct {
	Contract     *ERC20Basic       // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// ERC20BasicCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type ERC20BasicCallerSession struct {
	Contract *ERC20BasicCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts     // Call options to use throughout this session
}

// ERC20BasicTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type ERC20BasicTransactorSession struct {
	Contract     *ERC20BasicTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts     // Transaction auth options to use throughout this session
}

// ERC20BasicRaw is an auto generated low-level Go binding around an Ethereum contract.
type ERC20BasicRaw struct {
	Contract *ERC20Basic // Generic contract binding to access the raw methods on
}

// ERC20BasicCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type ERC20BasicCallerRaw struct {
	Contract *ERC20BasicCaller // Generic read-only contract binding to access the raw methods on
}

// ERC20BasicTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type ERC20BasicTransactorRaw struct {
	Contract *ERC20BasicTransactor // Generic write-only contract binding to access the raw methods on
}

// NewERC20Basic creates a new instance of ERC20Basic, bound to a specific deployed contract.
func NewERC20Basic(address common.Address, backend bind.ContractBackend) (*ERC20Basic, error) {
	contract, err := bindERC20Basic(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &ERC20Basic{ERC20BasicCaller: ERC20BasicCaller{contract: contract}, ERC20BasicTransactor: ERC20BasicTransactor{contract: contract}, ERC20BasicFilterer: ERC20BasicFilterer{contract: contract}}, nil
}

// NewERC20BasicCaller creates a new read-only instance of ERC20Basic, bound to a specific deployed contract.
func NewERC20BasicCaller(address common.Address, caller bind.ContractCaller) (*ERC20BasicCaller, error) {
	contract, err := bindERC20Basic(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &ERC20BasicCaller{contract: contract}, nil
}

// NewERC20BasicTransactor creates a new write-only instance of ERC20Basic, bound to a specific deployed contract.
func NewERC20BasicTransactor(address common.Address, transactor bind.ContractTransactor) (*ERC20BasicTransactor, error) {
	contract, err := bindERC20Basic(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &ERC20BasicTransactor{contract: contract}, nil
}

// NewERC20BasicFilterer creates a new log filterer instance of ERC20Basic, bound to a specific deployed contract.
func NewERC20BasicFilterer(address common.Address, filterer bind.ContractFilterer) (*ERC20BasicFilterer, error) {
	contract, err := bindERC20Basic(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &ERC20BasicFilterer{contract: contract}, nil
}

// bindERC20Basic binds a generic wrapper to an already deployed contract.
func bindERC20Basic(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(ERC20BasicABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ERC20Basic *ERC20BasicRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _ERC20Basic.Contract.ERC20BasicCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ERC20Basic *ERC20BasicRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ERC20Basic.Contract.ERC20BasicTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ERC20Basic *ERC20BasicRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ERC20Basic.Contract.ERC20BasicTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ERC20Basic *ERC20BasicCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _ERC20Basic.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ERC20Basic *ERC20BasicTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ERC20Basic.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ERC20Basic *ERC20BasicTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ERC20Basic.Contract.contract.Transact(opts, method, params...)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(who address) constant returns(uint256)
func (_ERC20Basic *ERC20BasicCaller) BalanceOf(opts *bind.CallOpts, who common.Address) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _ERC20Basic.contract.Call(opts, out, "balanceOf", who)
	return *ret0, err
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(who address) constant returns(uint256)
func (_ERC20Basic *ERC20BasicSession) BalanceOf(who common.Address) (*big.Int, error) {
	return _ERC20Basic.Contract.BalanceOf(&_ERC20Basic.CallOpts, who)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(who address) constant returns(uint256)
func (_ERC20Basic *ERC20BasicCallerSession) BalanceOf(who common.Address) (*big.Int, error) {
	return _ERC20Basic.Contract.BalanceOf(&_ERC20Basic.CallOpts, who)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_ERC20Basic *ERC20BasicCaller) TotalSupply(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _ERC20Basic.contract.Call(opts, out, "totalSupply")
	return *ret0, err
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_ERC20Basic *ERC20BasicSession) TotalSupply() (*big.Int, error) {
	return _ERC20Basic.Contract.TotalSupply(&_ERC20Basic.CallOpts)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_ERC20Basic *ERC20BasicCallerSession) TotalSupply() (*big.Int, error) {
	return _ERC20Basic.Contract.TotalSupply(&_ERC20Basic.CallOpts)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(to address, value uint256) returns(bool)
func (_ERC20Basic *ERC20BasicTransactor) Transfer(opts *bind.TransactOpts, to common.Address, value *big.Int) (*types.Transaction, error) {
	return _ERC20Basic.contract.Transact(opts, "transfer", to, value)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(to address, value uint256) returns(bool)
func (_ERC20Basic *ERC20BasicSession) Transfer(to common.Address, value *big.Int) (*types.Transaction, error) {
	return _ERC20Basic.Contract.Transfer(&_ERC20Basic.TransactOpts, to, value)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(to address, value uint256) returns(bool)
func (_ERC20Basic *ERC20BasicTransactorSession) Transfer(to common.Address, value *big.Int) (*types.Transaction, error) {
	return _ERC20Basic.Contract.Transfer(&_ERC20Basic.TransactOpts, to, value)
}

// ERC20BasicTransferIterator is returned from FilterTransfer and is used to iterate over the raw logs and unpacked data for Transfer events raised by the ERC20Basic contract.
type ERC20BasicTransferIterator struct {
	Event *ERC20BasicTransfer // Event containing the contract specifics and raw log

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
func (it *ERC20BasicTransferIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ERC20BasicTransfer)
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
		it.Event = new(ERC20BasicTransfer)
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
func (it *ERC20BasicTransferIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ERC20BasicTransferIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ERC20BasicTransfer represents a Transfer event raised by the ERC20Basic contract.
type ERC20BasicTransfer struct {
	From  common.Address
	To    common.Address
	Value *big.Int
	Raw   types.Log // Blockchain specific contextual infos
}

// FilterTransfer is a free log retrieval operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: e Transfer(from indexed address, to indexed address, value uint256)
func (_ERC20Basic *ERC20BasicFilterer) FilterTransfer(opts *bind.FilterOpts, from []common.Address, to []common.Address) (*ERC20BasicTransferIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _ERC20Basic.contract.FilterLogs(opts, "Transfer", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &ERC20BasicTransferIterator{contract: _ERC20Basic.contract, event: "Transfer", logs: logs, sub: sub}, nil
}

// WatchTransfer is a free log subscription operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: e Transfer(from indexed address, to indexed address, value uint256)
func (_ERC20Basic *ERC20BasicFilterer) WatchTransfer(opts *bind.WatchOpts, sink chan<- *ERC20BasicTransfer, from []common.Address, to []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _ERC20Basic.contract.WatchLogs(opts, "Transfer", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ERC20BasicTransfer)
				if err := _ERC20Basic.contract.UnpackLog(event, "Transfer", log); err != nil {
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

// ERC721ABI is the input ABI used to generate the binding from.
const ERC721ABI = "[{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"implementsERC721\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"name\":\"total\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_from\",\"type\":\"address\"},{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"ownerOf\",\"outputs\":[{\"name\":\"owner\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"balance\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"approved\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"}]"

// ERC721Bin is the compiled bytecode used for deploying new contracts.
const ERC721Bin = `0x`

// DeployERC721 deploys a new Ethereum contract, binding an instance of ERC721 to it.
func DeployERC721(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *ERC721, error) {
	parsed, err := abi.JSON(strings.NewReader(ERC721ABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(ERC721Bin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &ERC721{ERC721Caller: ERC721Caller{contract: contract}, ERC721Transactor: ERC721Transactor{contract: contract}, ERC721Filterer: ERC721Filterer{contract: contract}}, nil
}

// ERC721 is an auto generated Go binding around an Ethereum contract.
type ERC721 struct {
	ERC721Caller     // Read-only binding to the contract
	ERC721Transactor // Write-only binding to the contract
	ERC721Filterer   // Log filterer for contract events
}

// ERC721Caller is an auto generated read-only Go binding around an Ethereum contract.
type ERC721Caller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ERC721Transactor is an auto generated write-only Go binding around an Ethereum contract.
type ERC721Transactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ERC721Filterer is an auto generated log filtering Go binding around an Ethereum contract events.
type ERC721Filterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ERC721Session is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type ERC721Session struct {
	Contract     *ERC721           // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// ERC721CallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type ERC721CallerSession struct {
	Contract *ERC721Caller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// ERC721TransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type ERC721TransactorSession struct {
	Contract     *ERC721Transactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// ERC721Raw is an auto generated low-level Go binding around an Ethereum contract.
type ERC721Raw struct {
	Contract *ERC721 // Generic contract binding to access the raw methods on
}

// ERC721CallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type ERC721CallerRaw struct {
	Contract *ERC721Caller // Generic read-only contract binding to access the raw methods on
}

// ERC721TransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type ERC721TransactorRaw struct {
	Contract *ERC721Transactor // Generic write-only contract binding to access the raw methods on
}

// NewERC721 creates a new instance of ERC721, bound to a specific deployed contract.
func NewERC721(address common.Address, backend bind.ContractBackend) (*ERC721, error) {
	contract, err := bindERC721(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &ERC721{ERC721Caller: ERC721Caller{contract: contract}, ERC721Transactor: ERC721Transactor{contract: contract}, ERC721Filterer: ERC721Filterer{contract: contract}}, nil
}

// NewERC721Caller creates a new read-only instance of ERC721, bound to a specific deployed contract.
func NewERC721Caller(address common.Address, caller bind.ContractCaller) (*ERC721Caller, error) {
	contract, err := bindERC721(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &ERC721Caller{contract: contract}, nil
}

// NewERC721Transactor creates a new write-only instance of ERC721, bound to a specific deployed contract.
func NewERC721Transactor(address common.Address, transactor bind.ContractTransactor) (*ERC721Transactor, error) {
	contract, err := bindERC721(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &ERC721Transactor{contract: contract}, nil
}

// NewERC721Filterer creates a new log filterer instance of ERC721, bound to a specific deployed contract.
func NewERC721Filterer(address common.Address, filterer bind.ContractFilterer) (*ERC721Filterer, error) {
	contract, err := bindERC721(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &ERC721Filterer{contract: contract}, nil
}

// bindERC721 binds a generic wrapper to an already deployed contract.
func bindERC721(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(ERC721ABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ERC721 *ERC721Raw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _ERC721.Contract.ERC721Caller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ERC721 *ERC721Raw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ERC721.Contract.ERC721Transactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ERC721 *ERC721Raw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ERC721.Contract.ERC721Transactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_ERC721 *ERC721CallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _ERC721.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_ERC721 *ERC721TransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _ERC721.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_ERC721 *ERC721TransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _ERC721.Contract.contract.Transact(opts, method, params...)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(_owner address) constant returns(balance uint256)
func (_ERC721 *ERC721Caller) BalanceOf(opts *bind.CallOpts, _owner common.Address) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _ERC721.contract.Call(opts, out, "balanceOf", _owner)
	return *ret0, err
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(_owner address) constant returns(balance uint256)
func (_ERC721 *ERC721Session) BalanceOf(_owner common.Address) (*big.Int, error) {
	return _ERC721.Contract.BalanceOf(&_ERC721.CallOpts, _owner)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(_owner address) constant returns(balance uint256)
func (_ERC721 *ERC721CallerSession) BalanceOf(_owner common.Address) (*big.Int, error) {
	return _ERC721.Contract.BalanceOf(&_ERC721.CallOpts, _owner)
}

// ImplementsERC721 is a free data retrieval call binding the contract method 0x1051db34.
//
// Solidity: function implementsERC721() constant returns(bool)
func (_ERC721 *ERC721Caller) ImplementsERC721(opts *bind.CallOpts) (bool, error) {
	var (
		ret0 = new(bool)
	)
	out := ret0
	err := _ERC721.contract.Call(opts, out, "implementsERC721")
	return *ret0, err
}

// ImplementsERC721 is a free data retrieval call binding the contract method 0x1051db34.
//
// Solidity: function implementsERC721() constant returns(bool)
func (_ERC721 *ERC721Session) ImplementsERC721() (bool, error) {
	return _ERC721.Contract.ImplementsERC721(&_ERC721.CallOpts)
}

// ImplementsERC721 is a free data retrieval call binding the contract method 0x1051db34.
//
// Solidity: function implementsERC721() constant returns(bool)
func (_ERC721 *ERC721CallerSession) ImplementsERC721() (bool, error) {
	return _ERC721.Contract.ImplementsERC721(&_ERC721.CallOpts)
}

// OwnerOf is a free data retrieval call binding the contract method 0x6352211e.
//
// Solidity: function ownerOf(_tokenId uint256) constant returns(owner address)
func (_ERC721 *ERC721Caller) OwnerOf(opts *bind.CallOpts, _tokenId *big.Int) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _ERC721.contract.Call(opts, out, "ownerOf", _tokenId)
	return *ret0, err
}

// OwnerOf is a free data retrieval call binding the contract method 0x6352211e.
//
// Solidity: function ownerOf(_tokenId uint256) constant returns(owner address)
func (_ERC721 *ERC721Session) OwnerOf(_tokenId *big.Int) (common.Address, error) {
	return _ERC721.Contract.OwnerOf(&_ERC721.CallOpts, _tokenId)
}

// OwnerOf is a free data retrieval call binding the contract method 0x6352211e.
//
// Solidity: function ownerOf(_tokenId uint256) constant returns(owner address)
func (_ERC721 *ERC721CallerSession) OwnerOf(_tokenId *big.Int) (common.Address, error) {
	return _ERC721.Contract.OwnerOf(&_ERC721.CallOpts, _tokenId)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(total uint256)
func (_ERC721 *ERC721Caller) TotalSupply(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _ERC721.contract.Call(opts, out, "totalSupply")
	return *ret0, err
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(total uint256)
func (_ERC721 *ERC721Session) TotalSupply() (*big.Int, error) {
	return _ERC721.Contract.TotalSupply(&_ERC721.CallOpts)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(total uint256)
func (_ERC721 *ERC721CallerSession) TotalSupply() (*big.Int, error) {
	return _ERC721.Contract.TotalSupply(&_ERC721.CallOpts)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(_to address, _tokenId uint256) returns()
func (_ERC721 *ERC721Transactor) Approve(opts *bind.TransactOpts, _to common.Address, _tokenId *big.Int) (*types.Transaction, error) {
	return _ERC721.contract.Transact(opts, "approve", _to, _tokenId)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(_to address, _tokenId uint256) returns()
func (_ERC721 *ERC721Session) Approve(_to common.Address, _tokenId *big.Int) (*types.Transaction, error) {
	return _ERC721.Contract.Approve(&_ERC721.TransactOpts, _to, _tokenId)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(_to address, _tokenId uint256) returns()
func (_ERC721 *ERC721TransactorSession) Approve(_to common.Address, _tokenId *big.Int) (*types.Transaction, error) {
	return _ERC721.Contract.Approve(&_ERC721.TransactOpts, _to, _tokenId)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(_to address, _tokenId uint256) returns()
func (_ERC721 *ERC721Transactor) Transfer(opts *bind.TransactOpts, _to common.Address, _tokenId *big.Int) (*types.Transaction, error) {
	return _ERC721.contract.Transact(opts, "transfer", _to, _tokenId)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(_to address, _tokenId uint256) returns()
func (_ERC721 *ERC721Session) Transfer(_to common.Address, _tokenId *big.Int) (*types.Transaction, error) {
	return _ERC721.Contract.Transfer(&_ERC721.TransactOpts, _to, _tokenId)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(_to address, _tokenId uint256) returns()
func (_ERC721 *ERC721TransactorSession) Transfer(_to common.Address, _tokenId *big.Int) (*types.Transaction, error) {
	return _ERC721.Contract.Transfer(&_ERC721.TransactOpts, _to, _tokenId)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(_from address, _to address, _tokenId uint256) returns()
func (_ERC721 *ERC721Transactor) TransferFrom(opts *bind.TransactOpts, _from common.Address, _to common.Address, _tokenId *big.Int) (*types.Transaction, error) {
	return _ERC721.contract.Transact(opts, "transferFrom", _from, _to, _tokenId)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(_from address, _to address, _tokenId uint256) returns()
func (_ERC721 *ERC721Session) TransferFrom(_from common.Address, _to common.Address, _tokenId *big.Int) (*types.Transaction, error) {
	return _ERC721.Contract.TransferFrom(&_ERC721.TransactOpts, _from, _to, _tokenId)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(_from address, _to address, _tokenId uint256) returns()
func (_ERC721 *ERC721TransactorSession) TransferFrom(_from common.Address, _to common.Address, _tokenId *big.Int) (*types.Transaction, error) {
	return _ERC721.Contract.TransferFrom(&_ERC721.TransactOpts, _from, _to, _tokenId)
}

// ERC721ApprovalIterator is returned from FilterApproval and is used to iterate over the raw logs and unpacked data for Approval events raised by the ERC721 contract.
type ERC721ApprovalIterator struct {
	Event *ERC721Approval // Event containing the contract specifics and raw log

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
func (it *ERC721ApprovalIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ERC721Approval)
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
		it.Event = new(ERC721Approval)
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
func (it *ERC721ApprovalIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ERC721ApprovalIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ERC721Approval represents a Approval event raised by the ERC721 contract.
type ERC721Approval struct {
	Owner    common.Address
	Approved common.Address
	TokenId  *big.Int
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterApproval is a free log retrieval operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: e Approval(owner indexed address, approved indexed address, tokenId indexed uint256)
func (_ERC721 *ERC721Filterer) FilterApproval(opts *bind.FilterOpts, owner []common.Address, approved []common.Address, tokenId []*big.Int) (*ERC721ApprovalIterator, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var approvedRule []interface{}
	for _, approvedItem := range approved {
		approvedRule = append(approvedRule, approvedItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _ERC721.contract.FilterLogs(opts, "Approval", ownerRule, approvedRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return &ERC721ApprovalIterator{contract: _ERC721.contract, event: "Approval", logs: logs, sub: sub}, nil
}

// WatchApproval is a free log subscription operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: e Approval(owner indexed address, approved indexed address, tokenId indexed uint256)
func (_ERC721 *ERC721Filterer) WatchApproval(opts *bind.WatchOpts, sink chan<- *ERC721Approval, owner []common.Address, approved []common.Address, tokenId []*big.Int) (event.Subscription, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var approvedRule []interface{}
	for _, approvedItem := range approved {
		approvedRule = append(approvedRule, approvedItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _ERC721.contract.WatchLogs(opts, "Approval", ownerRule, approvedRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ERC721Approval)
				if err := _ERC721.contract.UnpackLog(event, "Approval", log); err != nil {
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

// ERC721TransferIterator is returned from FilterTransfer and is used to iterate over the raw logs and unpacked data for Transfer events raised by the ERC721 contract.
type ERC721TransferIterator struct {
	Event *ERC721Transfer // Event containing the contract specifics and raw log

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
func (it *ERC721TransferIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ERC721Transfer)
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
		it.Event = new(ERC721Transfer)
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
func (it *ERC721TransferIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ERC721TransferIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ERC721Transfer represents a Transfer event raised by the ERC721 contract.
type ERC721Transfer struct {
	From    common.Address
	To      common.Address
	TokenId *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterTransfer is a free log retrieval operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: e Transfer(from indexed address, to indexed address, tokenId indexed uint256)
func (_ERC721 *ERC721Filterer) FilterTransfer(opts *bind.FilterOpts, from []common.Address, to []common.Address, tokenId []*big.Int) (*ERC721TransferIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _ERC721.contract.FilterLogs(opts, "Transfer", fromRule, toRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return &ERC721TransferIterator{contract: _ERC721.contract, event: "Transfer", logs: logs, sub: sub}, nil
}

// WatchTransfer is a free log subscription operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: e Transfer(from indexed address, to indexed address, tokenId indexed uint256)
func (_ERC721 *ERC721Filterer) WatchTransfer(opts *bind.WatchOpts, sink chan<- *ERC721Transfer, from []common.Address, to []common.Address, tokenId []*big.Int) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _ERC721.contract.WatchLogs(opts, "Transfer", fromRule, toRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ERC721Transfer)
				if err := _ERC721.contract.UnpackLog(event, "Transfer", log); err != nil {
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

// MarketplaceABI is the input ABI used to generate the binding from.
const MarketplaceABI = "[{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"positionOfCard\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_cardIdOnMarketplace\",\"type\":\"uint256\"},{\"name\":\"_buyerCardId\",\"type\":\"uint256\"}],\"name\":\"exchangeCard\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_cardId\",\"type\":\"uint256\"},{\"name\":\"_price\",\"type\":\"uint256\"},{\"name\":\"_acceptableExchange\",\"type\":\"uint256[]\"}],\"name\":\"edit\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_cardId\",\"type\":\"uint256\"}],\"name\":\"cancel\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_cardId\",\"type\":\"uint256\"}],\"name\":\"buyWithEther\",\"outputs\":[],\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getCardsOnSale\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256[]\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_cardId1\",\"type\":\"uint256\"},{\"name\":\"_cardId2\",\"type\":\"uint256\"}],\"name\":\"canCardsBeExchanged\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"cardsOnSale\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"seleneanCards\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"numOfAds\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"sellAds\",\"outputs\":[{\"name\":\"cardId\",\"type\":\"uint256\"},{\"name\":\"price\",\"type\":\"uint256\"},{\"name\":\"exchanger\",\"type\":\"address\"},{\"name\":\"exists\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_cardId\",\"type\":\"uint256\"},{\"name\":\"_price\",\"type\":\"uint256\"},{\"name\":\"_acceptableExchange\",\"type\":\"uint256[]\"}],\"name\":\"sell\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"_seleneanCards\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"cardId\",\"type\":\"uint256\"},{\"indexed\":false,\"name\":\"acceptableExchange\",\"type\":\"uint256[]\"},{\"indexed\":false,\"name\":\"price\",\"type\":\"uint256\"}],\"name\":\"SellAd\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"cardId\",\"type\":\"uint256\"},{\"indexed\":false,\"name\":\"buyer\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"price\",\"type\":\"uint256\"}],\"name\":\"Bought\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"cardId\",\"type\":\"uint256\"}],\"name\":\"Canceled\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"}]"

// MarketplaceBin is the compiled bytecode used for deploying new contracts.
const MarketplaceBin = `0x608060405234801561001057600080fd5b50604051602080611017833981016040525160008054600160a060020a03338116600160a060020a03199283161783556005805491909416911617909155600155610fb7806100606000396000f3006080604052600436106100cf5763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663172f3eda81146100d4578063241ed40d146100fe578063264838cf1461011b57806340e58ee514610179578063550b9c11146101915780635e55b0921461019c57806368dd3d63146102015780636e7413de146102305780638da5cb5b1461024857806393c52162146102795780639bcf2c7e1461028e578063e50eea8d146102a3578063eb48340c146102eb578063f2fde38b14610349575b600080fd5b3480156100e057600080fd5b506100ec60043561036a565b60408051918252519081900360200190f35b34801561010a57600080fd5b5061011960043560243561037c565b005b34801561012757600080fd5b5060408051602060046044358181013583810280860185019096528085526101199583359560248035963696956064959394920192918291850190849080828437509497506106239650505050505050565b34801561018557600080fd5b506101196004356106ac565b61011960043561078b565b3480156101a857600080fd5b506101b16108af565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101ed5781810151838201526020016101d5565b505050509050019250505060405180910390f35b34801561020d57600080fd5b5061021c600435602435610908565b604080519115158252519081900360200190f35b34801561023c57600080fd5b506100ec6004356109af565b34801561025457600080fd5b5061025d6109ce565b60408051600160a060020a039092168252519081900360200190f35b34801561028557600080fd5b5061025d6109dd565b34801561029a57600080fd5b506100ec6109ec565b3480156102af57600080fd5b506102bb6004356109f2565b604080519485526020850193909352600160a060020a039091168383015215156060830152519081900360800190f35b3480156102f757600080fd5b506040805160206004604435818101358381028086018501909652808552610119958335956024803596369695606495939492019291829185019084908082843750949750610a289650505050505050565b34801561035557600080fd5b50610119600160a060020a0360043516610cfd565b60036020526000908152604090205481565b600554604080517f6352211e000000000000000000000000000000000000000000000000000000008152600481018490529051600092600160a060020a0333811693911691636352211e9160248082019260209290919082900301818887803b1580156103e857600080fd5b505af11580156103fc573d6000803e3d6000fd5b505050506040513d602081101561041257600080fd5b5051600160a060020a03161461042757600080fd5b60008381526004602052604090206003015460a060020a900460ff16151560011461045157600080fd5b61045b8383610908565b151560011461046957600080fd5b503361047483610d95565b600554604080517ff4d5698a000000000000000000000000000000000000000000000000000000008152600160a060020a033081166004830152602482018690529151919092169163f4d5698a91604480830192600092919082900301818387803b1580156104e257600080fd5b505af11580156104f6573d6000803e3d6000fd5b5050600554604080517fa9059cbb000000000000000000000000000000000000000000000000000000008152600160a060020a03868116600483015260248201899052915191909216935063a9059cbb9250604480830192600092919082900301818387803b15801561056857600080fd5b505af115801561057c573d6000803e3d6000fd5b505060055460008681526004602081905260408083206003015481517f23b872dd000000000000000000000000000000000000000000000000000000008152600160a060020a038981169482019490945290831660248201526044810189905290519190931694506323b872dd935060648084019382900301818387803b15801561060657600080fd5b505af115801561061a573d6000803e3d6000fd5b50505050505050565b60008381526004602052604081206003015460a060020a900460ff16151560011461064d57600080fd5b60008481526004602052604090206003015433600160a060020a0390811691161461067757600080fd5b50600083815260046020908152604090912060018101849055825190916106a5916002840191850190610efd565b5050505050565b60008181526004602052604090206003015460a060020a900460ff1615156001146106d657600080fd5b60008181526004602052604090206003015433600160a060020a0390811691161461070057600080fd5b61070981610d95565b600554604080517fa9059cbb000000000000000000000000000000000000000000000000000000008152600160a060020a033381166004830152602482018590529151919092169163a9059cbb91604480830192600092919082900301818387803b15801561077757600080fd5b505af11580156106a5573d6000803e3d6000fd5b60008181526004602052604090206003015460a060020a900460ff1615156001146107b557600080fd5b6000818152600460205260409020600101543410156107d357600080fd5b6107dc81610d95565b600554604080517fa9059cbb000000000000000000000000000000000000000000000000000000008152600160a060020a033381166004830152602482018590529151919092169163a9059cbb91604480830192600092919082900301818387803b15801561084a57600080fd5b505af115801561085e573d6000803e3d6000fd5b505050600082815260046020526040808220600301549051600160a060020a0390911692503480156108fc0292909190818181858888f193505050501580156108ab573d6000803e3d6000fd5b5050565b606060028054806020026020016040519081016040528092919081815260200182805480156108fd57602002820191906000526020600020905b8154815260200190600101908083116108e9575b505050505090505b90565b6000828152600460205260408120600301548190819060a060020a900460ff16151561093757600092506109a7565b61094084610e5f565b9150600090505b6000858152600460205260409020600201548110156109a257600085815260046020526040902060020180548391908390811061098057fe5b9060005260206000200154141561099a57600192506109a7565b600101610947565b600092505b505092915050565b60028054829081106109bd57fe5b600091825260209091200154905081565b600054600160a060020a031681565b600554600160a060020a031681565b60015481565b600460205260009081526040902080546001820154600390920154909190600160a060020a0381169060a060020a900460ff1684565b600554604080517f6352211e000000000000000000000000000000000000000000000000000000008152600481018690529051600160a060020a03338116931691636352211e9160248083019260209291908290030181600087803b158015610a9057600080fd5b505af1158015610aa4573d6000803e3d6000fd5b505050506040513d6020811015610aba57600080fd5b5051600160a060020a031614610acf57600080fd5b60008381526004602052604090206003015460a060020a900460ff1615610af557600080fd5b6040805160a0810182528481526020808201858152828401858152600160a060020a0333166060850152600160808501819052600089815260048552959095208451815591519482019490945592518051929392610b599260028501920190610efd565b5060608201516003918201805460809094015173ffffffffffffffffffffffffffffffffffffffff19909416600160a060020a039283161774ff0000000000000000000000000000000000000000191660a060020a941515949094029390931790925560018054810181556002805491820181557f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace90910186905554600086815260209290925260408083206000199290920190915560055481517ff4d5698a000000000000000000000000000000000000000000000000000000008152308516600482015260248101889052915193169263f4d5698a9260448084019391929182900301818387803b158015610c6f57600080fd5b505af1158015610c83573d6000803e3d6000fd5b5050600554604080517f23b872dd000000000000000000000000000000000000000000000000000000008152600160a060020a03338116600483015230811660248301526044820189905291519190921693506323b872dd9250606480830192600092919082900301818387803b15801561060657600080fd5b60005433600160a060020a03908116911614610d1857600080fd5b600160a060020a0381161515610d2d57600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b6002805460008381526003602052604081205491926000198401848110610db857fe5b600091825260208083209091015486835260049091526040909120600301805474ff0000000000000000000000000000000000000000191690556001805460001901905560028054919250829184908110610e0f57fe5b6000918252602080832090910192909255828152600390915260409020829055600280546000198501908110610e4157fe5b600091825260208220015560028054906106a5906000198301610f48565b600554604080517fe3684e390000000000000000000000000000000000000000000000000000000081526004810184905290516000928392600160a060020a039091169163e3684e399160248082019260c09290919082900301818787803b158015610eca57600080fd5b505af1158015610ede573d6000803e3d6000fd5b505050506040513d60c0811015610ef457600080fd5b50519392505050565b828054828255906000526020600020908101928215610f38579160200282015b82811115610f38578251825591602001919060010190610f1d565b50610f44929150610f71565b5090565b815481835581811115610f6c57600083815260209020610f6c918101908301610f71565b505050565b61090591905b80821115610f445760008155600101610f775600a165627a7a72305820bfebcde3303f75dbc5c2eedfc52966a1f2559d37fc652517167bec043a4cb00c0029`

// DeployMarketplace deploys a new Ethereum contract, binding an instance of Marketplace to it.
func DeployMarketplace(auth *bind.TransactOpts, backend bind.ContractBackend, _seleneanCards common.Address) (common.Address, *types.Transaction, *Marketplace, error) {
	parsed, err := abi.JSON(strings.NewReader(MarketplaceABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(MarketplaceBin), backend, _seleneanCards)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &Marketplace{MarketplaceCaller: MarketplaceCaller{contract: contract}, MarketplaceTransactor: MarketplaceTransactor{contract: contract}, MarketplaceFilterer: MarketplaceFilterer{contract: contract}}, nil
}

// Marketplace is an auto generated Go binding around an Ethereum contract.
type Marketplace struct {
	MarketplaceCaller     // Read-only binding to the contract
	MarketplaceTransactor // Write-only binding to the contract
	MarketplaceFilterer   // Log filterer for contract events
}

// MarketplaceCaller is an auto generated read-only Go binding around an Ethereum contract.
type MarketplaceCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// MarketplaceTransactor is an auto generated write-only Go binding around an Ethereum contract.
type MarketplaceTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// MarketplaceFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type MarketplaceFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// MarketplaceSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type MarketplaceSession struct {
	Contract     *Marketplace      // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// MarketplaceCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type MarketplaceCallerSession struct {
	Contract *MarketplaceCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts      // Call options to use throughout this session
}

// MarketplaceTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type MarketplaceTransactorSession struct {
	Contract     *MarketplaceTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts      // Transaction auth options to use throughout this session
}

// MarketplaceRaw is an auto generated low-level Go binding around an Ethereum contract.
type MarketplaceRaw struct {
	Contract *Marketplace // Generic contract binding to access the raw methods on
}

// MarketplaceCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type MarketplaceCallerRaw struct {
	Contract *MarketplaceCaller // Generic read-only contract binding to access the raw methods on
}

// MarketplaceTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type MarketplaceTransactorRaw struct {
	Contract *MarketplaceTransactor // Generic write-only contract binding to access the raw methods on
}

// NewMarketplace creates a new instance of Marketplace, bound to a specific deployed contract.
func NewMarketplace(address common.Address, backend bind.ContractBackend) (*Marketplace, error) {
	contract, err := bindMarketplace(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Marketplace{MarketplaceCaller: MarketplaceCaller{contract: contract}, MarketplaceTransactor: MarketplaceTransactor{contract: contract}, MarketplaceFilterer: MarketplaceFilterer{contract: contract}}, nil
}

// NewMarketplaceCaller creates a new read-only instance of Marketplace, bound to a specific deployed contract.
func NewMarketplaceCaller(address common.Address, caller bind.ContractCaller) (*MarketplaceCaller, error) {
	contract, err := bindMarketplace(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &MarketplaceCaller{contract: contract}, nil
}

// NewMarketplaceTransactor creates a new write-only instance of Marketplace, bound to a specific deployed contract.
func NewMarketplaceTransactor(address common.Address, transactor bind.ContractTransactor) (*MarketplaceTransactor, error) {
	contract, err := bindMarketplace(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &MarketplaceTransactor{contract: contract}, nil
}

// NewMarketplaceFilterer creates a new log filterer instance of Marketplace, bound to a specific deployed contract.
func NewMarketplaceFilterer(address common.Address, filterer bind.ContractFilterer) (*MarketplaceFilterer, error) {
	contract, err := bindMarketplace(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &MarketplaceFilterer{contract: contract}, nil
}

// bindMarketplace binds a generic wrapper to an already deployed contract.
func bindMarketplace(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(MarketplaceABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Marketplace *MarketplaceRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _Marketplace.Contract.MarketplaceCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Marketplace *MarketplaceRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Marketplace.Contract.MarketplaceTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Marketplace *MarketplaceRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Marketplace.Contract.MarketplaceTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Marketplace *MarketplaceCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _Marketplace.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Marketplace *MarketplaceTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Marketplace.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Marketplace *MarketplaceTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Marketplace.Contract.contract.Transact(opts, method, params...)
}

// CanCardsBeExchanged is a free data retrieval call binding the contract method 0x68dd3d63.
//
// Solidity: function canCardsBeExchanged(_cardId1 uint256, _cardId2 uint256) constant returns(bool)
func (_Marketplace *MarketplaceCaller) CanCardsBeExchanged(opts *bind.CallOpts, _cardId1 *big.Int, _cardId2 *big.Int) (bool, error) {
	var (
		ret0 = new(bool)
	)
	out := ret0
	err := _Marketplace.contract.Call(opts, out, "canCardsBeExchanged", _cardId1, _cardId2)
	return *ret0, err
}

// CanCardsBeExchanged is a free data retrieval call binding the contract method 0x68dd3d63.
//
// Solidity: function canCardsBeExchanged(_cardId1 uint256, _cardId2 uint256) constant returns(bool)
func (_Marketplace *MarketplaceSession) CanCardsBeExchanged(_cardId1 *big.Int, _cardId2 *big.Int) (bool, error) {
	return _Marketplace.Contract.CanCardsBeExchanged(&_Marketplace.CallOpts, _cardId1, _cardId2)
}

// CanCardsBeExchanged is a free data retrieval call binding the contract method 0x68dd3d63.
//
// Solidity: function canCardsBeExchanged(_cardId1 uint256, _cardId2 uint256) constant returns(bool)
func (_Marketplace *MarketplaceCallerSession) CanCardsBeExchanged(_cardId1 *big.Int, _cardId2 *big.Int) (bool, error) {
	return _Marketplace.Contract.CanCardsBeExchanged(&_Marketplace.CallOpts, _cardId1, _cardId2)
}

// CardsOnSale is a free data retrieval call binding the contract method 0x6e7413de.
//
// Solidity: function cardsOnSale( uint256) constant returns(uint256)
func (_Marketplace *MarketplaceCaller) CardsOnSale(opts *bind.CallOpts, arg0 *big.Int) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Marketplace.contract.Call(opts, out, "cardsOnSale", arg0)
	return *ret0, err
}

// CardsOnSale is a free data retrieval call binding the contract method 0x6e7413de.
//
// Solidity: function cardsOnSale( uint256) constant returns(uint256)
func (_Marketplace *MarketplaceSession) CardsOnSale(arg0 *big.Int) (*big.Int, error) {
	return _Marketplace.Contract.CardsOnSale(&_Marketplace.CallOpts, arg0)
}

// CardsOnSale is a free data retrieval call binding the contract method 0x6e7413de.
//
// Solidity: function cardsOnSale( uint256) constant returns(uint256)
func (_Marketplace *MarketplaceCallerSession) CardsOnSale(arg0 *big.Int) (*big.Int, error) {
	return _Marketplace.Contract.CardsOnSale(&_Marketplace.CallOpts, arg0)
}

// GetCardsOnSale is a free data retrieval call binding the contract method 0x5e55b092.
//
// Solidity: function getCardsOnSale() constant returns(uint256[])
func (_Marketplace *MarketplaceCaller) GetCardsOnSale(opts *bind.CallOpts) ([]*big.Int, error) {
	var (
		ret0 = new([]*big.Int)
	)
	out := ret0
	err := _Marketplace.contract.Call(opts, out, "getCardsOnSale")
	return *ret0, err
}

// GetCardsOnSale is a free data retrieval call binding the contract method 0x5e55b092.
//
// Solidity: function getCardsOnSale() constant returns(uint256[])
func (_Marketplace *MarketplaceSession) GetCardsOnSale() ([]*big.Int, error) {
	return _Marketplace.Contract.GetCardsOnSale(&_Marketplace.CallOpts)
}

// GetCardsOnSale is a free data retrieval call binding the contract method 0x5e55b092.
//
// Solidity: function getCardsOnSale() constant returns(uint256[])
func (_Marketplace *MarketplaceCallerSession) GetCardsOnSale() ([]*big.Int, error) {
	return _Marketplace.Contract.GetCardsOnSale(&_Marketplace.CallOpts)
}

// NumOfAds is a free data retrieval call binding the contract method 0x9bcf2c7e.
//
// Solidity: function numOfAds() constant returns(uint256)
func (_Marketplace *MarketplaceCaller) NumOfAds(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Marketplace.contract.Call(opts, out, "numOfAds")
	return *ret0, err
}

// NumOfAds is a free data retrieval call binding the contract method 0x9bcf2c7e.
//
// Solidity: function numOfAds() constant returns(uint256)
func (_Marketplace *MarketplaceSession) NumOfAds() (*big.Int, error) {
	return _Marketplace.Contract.NumOfAds(&_Marketplace.CallOpts)
}

// NumOfAds is a free data retrieval call binding the contract method 0x9bcf2c7e.
//
// Solidity: function numOfAds() constant returns(uint256)
func (_Marketplace *MarketplaceCallerSession) NumOfAds() (*big.Int, error) {
	return _Marketplace.Contract.NumOfAds(&_Marketplace.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_Marketplace *MarketplaceCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _Marketplace.contract.Call(opts, out, "owner")
	return *ret0, err
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_Marketplace *MarketplaceSession) Owner() (common.Address, error) {
	return _Marketplace.Contract.Owner(&_Marketplace.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_Marketplace *MarketplaceCallerSession) Owner() (common.Address, error) {
	return _Marketplace.Contract.Owner(&_Marketplace.CallOpts)
}

// PositionOfCard is a free data retrieval call binding the contract method 0x172f3eda.
//
// Solidity: function positionOfCard( uint256) constant returns(uint256)
func (_Marketplace *MarketplaceCaller) PositionOfCard(opts *bind.CallOpts, arg0 *big.Int) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _Marketplace.contract.Call(opts, out, "positionOfCard", arg0)
	return *ret0, err
}

// PositionOfCard is a free data retrieval call binding the contract method 0x172f3eda.
//
// Solidity: function positionOfCard( uint256) constant returns(uint256)
func (_Marketplace *MarketplaceSession) PositionOfCard(arg0 *big.Int) (*big.Int, error) {
	return _Marketplace.Contract.PositionOfCard(&_Marketplace.CallOpts, arg0)
}

// PositionOfCard is a free data retrieval call binding the contract method 0x172f3eda.
//
// Solidity: function positionOfCard( uint256) constant returns(uint256)
func (_Marketplace *MarketplaceCallerSession) PositionOfCard(arg0 *big.Int) (*big.Int, error) {
	return _Marketplace.Contract.PositionOfCard(&_Marketplace.CallOpts, arg0)
}

// SeleneanCards is a free data retrieval call binding the contract method 0x93c52162.
//
// Solidity: function seleneanCards() constant returns(address)
func (_Marketplace *MarketplaceCaller) SeleneanCards(opts *bind.CallOpts) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _Marketplace.contract.Call(opts, out, "seleneanCards")
	return *ret0, err
}

// SeleneanCards is a free data retrieval call binding the contract method 0x93c52162.
//
// Solidity: function seleneanCards() constant returns(address)
func (_Marketplace *MarketplaceSession) SeleneanCards() (common.Address, error) {
	return _Marketplace.Contract.SeleneanCards(&_Marketplace.CallOpts)
}

// SeleneanCards is a free data retrieval call binding the contract method 0x93c52162.
//
// Solidity: function seleneanCards() constant returns(address)
func (_Marketplace *MarketplaceCallerSession) SeleneanCards() (common.Address, error) {
	return _Marketplace.Contract.SeleneanCards(&_Marketplace.CallOpts)
}

// SellAds is a free data retrieval call binding the contract method 0xe50eea8d.
//
// Solidity: function sellAds( uint256) constant returns(cardId uint256, price uint256, exchanger address, exists bool)
func (_Marketplace *MarketplaceCaller) SellAds(opts *bind.CallOpts, arg0 *big.Int) (struct {
	CardId    *big.Int
	Price     *big.Int
	Exchanger common.Address
	Exists    bool
}, error) {
	ret := new(struct {
		CardId    *big.Int
		Price     *big.Int
		Exchanger common.Address
		Exists    bool
	})
	out := ret
	err := _Marketplace.contract.Call(opts, out, "sellAds", arg0)
	return *ret, err
}

// SellAds is a free data retrieval call binding the contract method 0xe50eea8d.
//
// Solidity: function sellAds( uint256) constant returns(cardId uint256, price uint256, exchanger address, exists bool)
func (_Marketplace *MarketplaceSession) SellAds(arg0 *big.Int) (struct {
	CardId    *big.Int
	Price     *big.Int
	Exchanger common.Address
	Exists    bool
}, error) {
	return _Marketplace.Contract.SellAds(&_Marketplace.CallOpts, arg0)
}

// SellAds is a free data retrieval call binding the contract method 0xe50eea8d.
//
// Solidity: function sellAds( uint256) constant returns(cardId uint256, price uint256, exchanger address, exists bool)
func (_Marketplace *MarketplaceCallerSession) SellAds(arg0 *big.Int) (struct {
	CardId    *big.Int
	Price     *big.Int
	Exchanger common.Address
	Exists    bool
}, error) {
	return _Marketplace.Contract.SellAds(&_Marketplace.CallOpts, arg0)
}

// BuyWithEther is a paid mutator transaction binding the contract method 0x550b9c11.
//
// Solidity: function buyWithEther(_cardId uint256) returns()
func (_Marketplace *MarketplaceTransactor) BuyWithEther(opts *bind.TransactOpts, _cardId *big.Int) (*types.Transaction, error) {
	return _Marketplace.contract.Transact(opts, "buyWithEther", _cardId)
}

// BuyWithEther is a paid mutator transaction binding the contract method 0x550b9c11.
//
// Solidity: function buyWithEther(_cardId uint256) returns()
func (_Marketplace *MarketplaceSession) BuyWithEther(_cardId *big.Int) (*types.Transaction, error) {
	return _Marketplace.Contract.BuyWithEther(&_Marketplace.TransactOpts, _cardId)
}

// BuyWithEther is a paid mutator transaction binding the contract method 0x550b9c11.
//
// Solidity: function buyWithEther(_cardId uint256) returns()
func (_Marketplace *MarketplaceTransactorSession) BuyWithEther(_cardId *big.Int) (*types.Transaction, error) {
	return _Marketplace.Contract.BuyWithEther(&_Marketplace.TransactOpts, _cardId)
}

// Cancel is a paid mutator transaction binding the contract method 0x40e58ee5.
//
// Solidity: function cancel(_cardId uint256) returns()
func (_Marketplace *MarketplaceTransactor) Cancel(opts *bind.TransactOpts, _cardId *big.Int) (*types.Transaction, error) {
	return _Marketplace.contract.Transact(opts, "cancel", _cardId)
}

// Cancel is a paid mutator transaction binding the contract method 0x40e58ee5.
//
// Solidity: function cancel(_cardId uint256) returns()
func (_Marketplace *MarketplaceSession) Cancel(_cardId *big.Int) (*types.Transaction, error) {
	return _Marketplace.Contract.Cancel(&_Marketplace.TransactOpts, _cardId)
}

// Cancel is a paid mutator transaction binding the contract method 0x40e58ee5.
//
// Solidity: function cancel(_cardId uint256) returns()
func (_Marketplace *MarketplaceTransactorSession) Cancel(_cardId *big.Int) (*types.Transaction, error) {
	return _Marketplace.Contract.Cancel(&_Marketplace.TransactOpts, _cardId)
}

// Edit is a paid mutator transaction binding the contract method 0x264838cf.
//
// Solidity: function edit(_cardId uint256, _price uint256, _acceptableExchange uint256[]) returns()
func (_Marketplace *MarketplaceTransactor) Edit(opts *bind.TransactOpts, _cardId *big.Int, _price *big.Int, _acceptableExchange []*big.Int) (*types.Transaction, error) {
	return _Marketplace.contract.Transact(opts, "edit", _cardId, _price, _acceptableExchange)
}

// Edit is a paid mutator transaction binding the contract method 0x264838cf.
//
// Solidity: function edit(_cardId uint256, _price uint256, _acceptableExchange uint256[]) returns()
func (_Marketplace *MarketplaceSession) Edit(_cardId *big.Int, _price *big.Int, _acceptableExchange []*big.Int) (*types.Transaction, error) {
	return _Marketplace.Contract.Edit(&_Marketplace.TransactOpts, _cardId, _price, _acceptableExchange)
}

// Edit is a paid mutator transaction binding the contract method 0x264838cf.
//
// Solidity: function edit(_cardId uint256, _price uint256, _acceptableExchange uint256[]) returns()
func (_Marketplace *MarketplaceTransactorSession) Edit(_cardId *big.Int, _price *big.Int, _acceptableExchange []*big.Int) (*types.Transaction, error) {
	return _Marketplace.Contract.Edit(&_Marketplace.TransactOpts, _cardId, _price, _acceptableExchange)
}

// ExchangeCard is a paid mutator transaction binding the contract method 0x241ed40d.
//
// Solidity: function exchangeCard(_cardIdOnMarketplace uint256, _buyerCardId uint256) returns()
func (_Marketplace *MarketplaceTransactor) ExchangeCard(opts *bind.TransactOpts, _cardIdOnMarketplace *big.Int, _buyerCardId *big.Int) (*types.Transaction, error) {
	return _Marketplace.contract.Transact(opts, "exchangeCard", _cardIdOnMarketplace, _buyerCardId)
}

// ExchangeCard is a paid mutator transaction binding the contract method 0x241ed40d.
//
// Solidity: function exchangeCard(_cardIdOnMarketplace uint256, _buyerCardId uint256) returns()
func (_Marketplace *MarketplaceSession) ExchangeCard(_cardIdOnMarketplace *big.Int, _buyerCardId *big.Int) (*types.Transaction, error) {
	return _Marketplace.Contract.ExchangeCard(&_Marketplace.TransactOpts, _cardIdOnMarketplace, _buyerCardId)
}

// ExchangeCard is a paid mutator transaction binding the contract method 0x241ed40d.
//
// Solidity: function exchangeCard(_cardIdOnMarketplace uint256, _buyerCardId uint256) returns()
func (_Marketplace *MarketplaceTransactorSession) ExchangeCard(_cardIdOnMarketplace *big.Int, _buyerCardId *big.Int) (*types.Transaction, error) {
	return _Marketplace.Contract.ExchangeCard(&_Marketplace.TransactOpts, _cardIdOnMarketplace, _buyerCardId)
}

// Sell is a paid mutator transaction binding the contract method 0xeb48340c.
//
// Solidity: function sell(_cardId uint256, _price uint256, _acceptableExchange uint256[]) returns()
func (_Marketplace *MarketplaceTransactor) Sell(opts *bind.TransactOpts, _cardId *big.Int, _price *big.Int, _acceptableExchange []*big.Int) (*types.Transaction, error) {
	return _Marketplace.contract.Transact(opts, "sell", _cardId, _price, _acceptableExchange)
}

// Sell is a paid mutator transaction binding the contract method 0xeb48340c.
//
// Solidity: function sell(_cardId uint256, _price uint256, _acceptableExchange uint256[]) returns()
func (_Marketplace *MarketplaceSession) Sell(_cardId *big.Int, _price *big.Int, _acceptableExchange []*big.Int) (*types.Transaction, error) {
	return _Marketplace.Contract.Sell(&_Marketplace.TransactOpts, _cardId, _price, _acceptableExchange)
}

// Sell is a paid mutator transaction binding the contract method 0xeb48340c.
//
// Solidity: function sell(_cardId uint256, _price uint256, _acceptableExchange uint256[]) returns()
func (_Marketplace *MarketplaceTransactorSession) Sell(_cardId *big.Int, _price *big.Int, _acceptableExchange []*big.Int) (*types.Transaction, error) {
	return _Marketplace.Contract.Sell(&_Marketplace.TransactOpts, _cardId, _price, _acceptableExchange)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_Marketplace *MarketplaceTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _Marketplace.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_Marketplace *MarketplaceSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Marketplace.Contract.TransferOwnership(&_Marketplace.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_Marketplace *MarketplaceTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Marketplace.Contract.TransferOwnership(&_Marketplace.TransactOpts, newOwner)
}

// MarketplaceBoughtIterator is returned from FilterBought and is used to iterate over the raw logs and unpacked data for Bought events raised by the Marketplace contract.
type MarketplaceBoughtIterator struct {
	Event *MarketplaceBought // Event containing the contract specifics and raw log

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
func (it *MarketplaceBoughtIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(MarketplaceBought)
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
		it.Event = new(MarketplaceBought)
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
func (it *MarketplaceBoughtIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *MarketplaceBoughtIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// MarketplaceBought represents a Bought event raised by the Marketplace contract.
type MarketplaceBought struct {
	CardId *big.Int
	Buyer  common.Address
	Price  *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterBought is a free log retrieval operation binding the contract event 0xd2728f908c7e0feb83c6278798370fcb86b62f236c9dbf1a3f541096c2159040.
//
// Solidity: e Bought(cardId uint256, buyer address, price uint256)
func (_Marketplace *MarketplaceFilterer) FilterBought(opts *bind.FilterOpts) (*MarketplaceBoughtIterator, error) {

	logs, sub, err := _Marketplace.contract.FilterLogs(opts, "Bought")
	if err != nil {
		return nil, err
	}
	return &MarketplaceBoughtIterator{contract: _Marketplace.contract, event: "Bought", logs: logs, sub: sub}, nil
}

// WatchBought is a free log subscription operation binding the contract event 0xd2728f908c7e0feb83c6278798370fcb86b62f236c9dbf1a3f541096c2159040.
//
// Solidity: e Bought(cardId uint256, buyer address, price uint256)
func (_Marketplace *MarketplaceFilterer) WatchBought(opts *bind.WatchOpts, sink chan<- *MarketplaceBought) (event.Subscription, error) {

	logs, sub, err := _Marketplace.contract.WatchLogs(opts, "Bought")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(MarketplaceBought)
				if err := _Marketplace.contract.UnpackLog(event, "Bought", log); err != nil {
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

// MarketplaceCanceledIterator is returned from FilterCanceled and is used to iterate over the raw logs and unpacked data for Canceled events raised by the Marketplace contract.
type MarketplaceCanceledIterator struct {
	Event *MarketplaceCanceled // Event containing the contract specifics and raw log

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
func (it *MarketplaceCanceledIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(MarketplaceCanceled)
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
		it.Event = new(MarketplaceCanceled)
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
func (it *MarketplaceCanceledIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *MarketplaceCanceledIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// MarketplaceCanceled represents a Canceled event raised by the Marketplace contract.
type MarketplaceCanceled struct {
	Owner  common.Address
	CardId *big.Int
	Raw    types.Log // Blockchain specific contextual infos
}

// FilterCanceled is a free log retrieval operation binding the contract event 0xf3a6ef5718c05d9183af076f5753197b68b04552a763c34796637d6134bdd0f2.
//
// Solidity: e Canceled(owner address, cardId uint256)
func (_Marketplace *MarketplaceFilterer) FilterCanceled(opts *bind.FilterOpts) (*MarketplaceCanceledIterator, error) {

	logs, sub, err := _Marketplace.contract.FilterLogs(opts, "Canceled")
	if err != nil {
		return nil, err
	}
	return &MarketplaceCanceledIterator{contract: _Marketplace.contract, event: "Canceled", logs: logs, sub: sub}, nil
}

// WatchCanceled is a free log subscription operation binding the contract event 0xf3a6ef5718c05d9183af076f5753197b68b04552a763c34796637d6134bdd0f2.
//
// Solidity: e Canceled(owner address, cardId uint256)
func (_Marketplace *MarketplaceFilterer) WatchCanceled(opts *bind.WatchOpts, sink chan<- *MarketplaceCanceled) (event.Subscription, error) {

	logs, sub, err := _Marketplace.contract.WatchLogs(opts, "Canceled")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(MarketplaceCanceled)
				if err := _Marketplace.contract.UnpackLog(event, "Canceled", log); err != nil {
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

// MarketplaceOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the Marketplace contract.
type MarketplaceOwnershipTransferredIterator struct {
	Event *MarketplaceOwnershipTransferred // Event containing the contract specifics and raw log

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
func (it *MarketplaceOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(MarketplaceOwnershipTransferred)
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
		it.Event = new(MarketplaceOwnershipTransferred)
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
func (it *MarketplaceOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *MarketplaceOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// MarketplaceOwnershipTransferred represents a OwnershipTransferred event raised by the Marketplace contract.
type MarketplaceOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: e OwnershipTransferred(previousOwner indexed address, newOwner indexed address)
func (_Marketplace *MarketplaceFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*MarketplaceOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Marketplace.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &MarketplaceOwnershipTransferredIterator{contract: _Marketplace.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: e OwnershipTransferred(previousOwner indexed address, newOwner indexed address)
func (_Marketplace *MarketplaceFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *MarketplaceOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Marketplace.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(MarketplaceOwnershipTransferred)
				if err := _Marketplace.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
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

// MarketplaceSellAdIterator is returned from FilterSellAd and is used to iterate over the raw logs and unpacked data for SellAd events raised by the Marketplace contract.
type MarketplaceSellAdIterator struct {
	Event *MarketplaceSellAd // Event containing the contract specifics and raw log

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
func (it *MarketplaceSellAdIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(MarketplaceSellAd)
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
		it.Event = new(MarketplaceSellAd)
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
func (it *MarketplaceSellAdIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *MarketplaceSellAdIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// MarketplaceSellAd represents a SellAd event raised by the Marketplace contract.
type MarketplaceSellAd struct {
	Owner              common.Address
	CardId             *big.Int
	AcceptableExchange []*big.Int
	Price              *big.Int
	Raw                types.Log // Blockchain specific contextual infos
}

// FilterSellAd is a free log retrieval operation binding the contract event 0x35cb876eaec5d3fa49b234fc51dab69a618e1a2d2dfb15190d5f67c1380fe113.
//
// Solidity: e SellAd(owner address, cardId uint256, acceptableExchange uint256[], price uint256)
func (_Marketplace *MarketplaceFilterer) FilterSellAd(opts *bind.FilterOpts) (*MarketplaceSellAdIterator, error) {

	logs, sub, err := _Marketplace.contract.FilterLogs(opts, "SellAd")
	if err != nil {
		return nil, err
	}
	return &MarketplaceSellAdIterator{contract: _Marketplace.contract, event: "SellAd", logs: logs, sub: sub}, nil
}

// WatchSellAd is a free log subscription operation binding the contract event 0x35cb876eaec5d3fa49b234fc51dab69a618e1a2d2dfb15190d5f67c1380fe113.
//
// Solidity: e SellAd(owner address, cardId uint256, acceptableExchange uint256[], price uint256)
func (_Marketplace *MarketplaceFilterer) WatchSellAd(opts *bind.WatchOpts, sink chan<- *MarketplaceSellAd) (event.Subscription, error) {

	logs, sub, err := _Marketplace.contract.WatchLogs(opts, "SellAd")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(MarketplaceSellAd)
				if err := _Marketplace.contract.UnpackLog(event, "SellAd", log); err != nil {
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

// OwnableABI is the input ABI used to generate the binding from.
const OwnableABI = "[{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"}]"

// OwnableBin is the compiled bytecode used for deploying new contracts.
const OwnableBin = `0x608060405234801561001057600080fd5b5060008054600160a060020a033316600160a060020a03199091161790556101778061003d6000396000f30060806040526004361061004b5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416638da5cb5b8114610050578063f2fde38b14610081575b600080fd5b34801561005c57600080fd5b506100656100a4565b60408051600160a060020a039092168252519081900360200190f35b34801561008d57600080fd5b506100a2600160a060020a03600435166100b3565b005b600054600160a060020a031681565b60005433600160a060020a039081169116146100ce57600080fd5b600160a060020a03811615156100e357600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a72305820587da4eebf7375646af651ea9564448c17ad9c66b69867c7ccb70e06dd6e3a020029`

// DeployOwnable deploys a new Ethereum contract, binding an instance of Ownable to it.
func DeployOwnable(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *Ownable, error) {
	parsed, err := abi.JSON(strings.NewReader(OwnableABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(OwnableBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &Ownable{OwnableCaller: OwnableCaller{contract: contract}, OwnableTransactor: OwnableTransactor{contract: contract}, OwnableFilterer: OwnableFilterer{contract: contract}}, nil
}

// Ownable is an auto generated Go binding around an Ethereum contract.
type Ownable struct {
	OwnableCaller     // Read-only binding to the contract
	OwnableTransactor // Write-only binding to the contract
	OwnableFilterer   // Log filterer for contract events
}

// OwnableCaller is an auto generated read-only Go binding around an Ethereum contract.
type OwnableCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// OwnableTransactor is an auto generated write-only Go binding around an Ethereum contract.
type OwnableTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// OwnableFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type OwnableFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// OwnableSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type OwnableSession struct {
	Contract     *Ownable          // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// OwnableCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type OwnableCallerSession struct {
	Contract *OwnableCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts  // Call options to use throughout this session
}

// OwnableTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type OwnableTransactorSession struct {
	Contract     *OwnableTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts  // Transaction auth options to use throughout this session
}

// OwnableRaw is an auto generated low-level Go binding around an Ethereum contract.
type OwnableRaw struct {
	Contract *Ownable // Generic contract binding to access the raw methods on
}

// OwnableCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type OwnableCallerRaw struct {
	Contract *OwnableCaller // Generic read-only contract binding to access the raw methods on
}

// OwnableTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type OwnableTransactorRaw struct {
	Contract *OwnableTransactor // Generic write-only contract binding to access the raw methods on
}

// NewOwnable creates a new instance of Ownable, bound to a specific deployed contract.
func NewOwnable(address common.Address, backend bind.ContractBackend) (*Ownable, error) {
	contract, err := bindOwnable(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Ownable{OwnableCaller: OwnableCaller{contract: contract}, OwnableTransactor: OwnableTransactor{contract: contract}, OwnableFilterer: OwnableFilterer{contract: contract}}, nil
}

// NewOwnableCaller creates a new read-only instance of Ownable, bound to a specific deployed contract.
func NewOwnableCaller(address common.Address, caller bind.ContractCaller) (*OwnableCaller, error) {
	contract, err := bindOwnable(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &OwnableCaller{contract: contract}, nil
}

// NewOwnableTransactor creates a new write-only instance of Ownable, bound to a specific deployed contract.
func NewOwnableTransactor(address common.Address, transactor bind.ContractTransactor) (*OwnableTransactor, error) {
	contract, err := bindOwnable(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &OwnableTransactor{contract: contract}, nil
}

// NewOwnableFilterer creates a new log filterer instance of Ownable, bound to a specific deployed contract.
func NewOwnableFilterer(address common.Address, filterer bind.ContractFilterer) (*OwnableFilterer, error) {
	contract, err := bindOwnable(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &OwnableFilterer{contract: contract}, nil
}

// bindOwnable binds a generic wrapper to an already deployed contract.
func bindOwnable(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(OwnableABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Ownable *OwnableRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _Ownable.Contract.OwnableCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Ownable *OwnableRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Ownable.Contract.OwnableTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Ownable *OwnableRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Ownable.Contract.OwnableTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Ownable *OwnableCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _Ownable.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Ownable *OwnableTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Ownable.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Ownable *OwnableTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Ownable.Contract.contract.Transact(opts, method, params...)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_Ownable *OwnableCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _Ownable.contract.Call(opts, out, "owner")
	return *ret0, err
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_Ownable *OwnableSession) Owner() (common.Address, error) {
	return _Ownable.Contract.Owner(&_Ownable.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_Ownable *OwnableCallerSession) Owner() (common.Address, error) {
	return _Ownable.Contract.Owner(&_Ownable.CallOpts)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_Ownable *OwnableTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _Ownable.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_Ownable *OwnableSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Ownable.Contract.TransferOwnership(&_Ownable.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_Ownable *OwnableTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Ownable.Contract.TransferOwnership(&_Ownable.TransactOpts, newOwner)
}

// OwnableOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the Ownable contract.
type OwnableOwnershipTransferredIterator struct {
	Event *OwnableOwnershipTransferred // Event containing the contract specifics and raw log

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
func (it *OwnableOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(OwnableOwnershipTransferred)
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
		it.Event = new(OwnableOwnershipTransferred)
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
func (it *OwnableOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *OwnableOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// OwnableOwnershipTransferred represents a OwnershipTransferred event raised by the Ownable contract.
type OwnableOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: e OwnershipTransferred(previousOwner indexed address, newOwner indexed address)
func (_Ownable *OwnableFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*OwnableOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Ownable.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &OwnableOwnershipTransferredIterator{contract: _Ownable.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: e OwnershipTransferred(previousOwner indexed address, newOwner indexed address)
func (_Ownable *OwnableFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *OwnableOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Ownable.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(OwnableOwnershipTransferred)
				if err := _Ownable.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
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

// SafeMathABI is the input ABI used to generate the binding from.
const SafeMathABI = "[]"

// SafeMathBin is the compiled bytecode used for deploying new contracts.
const SafeMathBin = `0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146080604052600080fd00a165627a7a72305820ce0411ba92f18a034058ca65ceb4a6f6410b821e7baac4babb4e5c5d5e67ea3c0029`

// DeploySafeMath deploys a new Ethereum contract, binding an instance of SafeMath to it.
func DeploySafeMath(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *SafeMath, error) {
	parsed, err := abi.JSON(strings.NewReader(SafeMathABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(SafeMathBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &SafeMath{SafeMathCaller: SafeMathCaller{contract: contract}, SafeMathTransactor: SafeMathTransactor{contract: contract}, SafeMathFilterer: SafeMathFilterer{contract: contract}}, nil
}

// SafeMath is an auto generated Go binding around an Ethereum contract.
type SafeMath struct {
	SafeMathCaller     // Read-only binding to the contract
	SafeMathTransactor // Write-only binding to the contract
	SafeMathFilterer   // Log filterer for contract events
}

// SafeMathCaller is an auto generated read-only Go binding around an Ethereum contract.
type SafeMathCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SafeMathTransactor is an auto generated write-only Go binding around an Ethereum contract.
type SafeMathTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SafeMathFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type SafeMathFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SafeMathSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type SafeMathSession struct {
	Contract     *SafeMath         // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// SafeMathCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type SafeMathCallerSession struct {
	Contract *SafeMathCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts   // Call options to use throughout this session
}

// SafeMathTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type SafeMathTransactorSession struct {
	Contract     *SafeMathTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts   // Transaction auth options to use throughout this session
}

// SafeMathRaw is an auto generated low-level Go binding around an Ethereum contract.
type SafeMathRaw struct {
	Contract *SafeMath // Generic contract binding to access the raw methods on
}

// SafeMathCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type SafeMathCallerRaw struct {
	Contract *SafeMathCaller // Generic read-only contract binding to access the raw methods on
}

// SafeMathTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type SafeMathTransactorRaw struct {
	Contract *SafeMathTransactor // Generic write-only contract binding to access the raw methods on
}

// NewSafeMath creates a new instance of SafeMath, bound to a specific deployed contract.
func NewSafeMath(address common.Address, backend bind.ContractBackend) (*SafeMath, error) {
	contract, err := bindSafeMath(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &SafeMath{SafeMathCaller: SafeMathCaller{contract: contract}, SafeMathTransactor: SafeMathTransactor{contract: contract}, SafeMathFilterer: SafeMathFilterer{contract: contract}}, nil
}

// NewSafeMathCaller creates a new read-only instance of SafeMath, bound to a specific deployed contract.
func NewSafeMathCaller(address common.Address, caller bind.ContractCaller) (*SafeMathCaller, error) {
	contract, err := bindSafeMath(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &SafeMathCaller{contract: contract}, nil
}

// NewSafeMathTransactor creates a new write-only instance of SafeMath, bound to a specific deployed contract.
func NewSafeMathTransactor(address common.Address, transactor bind.ContractTransactor) (*SafeMathTransactor, error) {
	contract, err := bindSafeMath(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &SafeMathTransactor{contract: contract}, nil
}

// NewSafeMathFilterer creates a new log filterer instance of SafeMath, bound to a specific deployed contract.
func NewSafeMathFilterer(address common.Address, filterer bind.ContractFilterer) (*SafeMathFilterer, error) {
	contract, err := bindSafeMath(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &SafeMathFilterer{contract: contract}, nil
}

// bindSafeMath binds a generic wrapper to an already deployed contract.
func bindSafeMath(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(SafeMathABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_SafeMath *SafeMathRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _SafeMath.Contract.SafeMathCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_SafeMath *SafeMathRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SafeMath.Contract.SafeMathTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_SafeMath *SafeMathRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _SafeMath.Contract.SafeMathTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_SafeMath *SafeMathCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _SafeMath.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_SafeMath *SafeMathTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SafeMath.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_SafeMath *SafeMathTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _SafeMath.Contract.contract.Transact(opts, method, params...)
}

// SeleneanCardsABI is the input ABI used to generate the binding from.
const SeleneanCardsABI = "[{\"constant\":false,\"inputs\":[{\"name\":\"_boosterContract\",\"type\":\"address\"}],\"name\":\"addBoosterContract\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"tokenPosInArr\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"tokensForOwner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_cardId\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"tokensForApproved\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"implementsERC721\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_marketplaceContract\",\"type\":\"address\"}],\"name\":\"addMarketplaceContract\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_from\",\"type\":\"address\"},{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_cardId\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_user\",\"type\":\"address\"},{\"name\":\"_metadataId\",\"type\":\"uint256\"}],\"name\":\"numberOfCardsWithType\",\"outputs\":[{\"name\":\"_num\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"},{\"name\":\"_index\",\"type\":\"uint256\"}],\"name\":\"tokenOfOwnerByIndex\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"},{\"name\":\"_metadataId\",\"type\":\"uint256\"}],\"name\":\"createCard\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_cardId\",\"type\":\"uint256\"}],\"name\":\"ownerOf\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"balance\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"},{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"tokensOwned\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"getUserCards\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256[]\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_cardId\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"numOfCards\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_metadataContract\",\"type\":\"address\"}],\"name\":\"addMetadataContract\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_cardId\",\"type\":\"uint256\"}],\"name\":\"metadata\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"},{\"name\":\"\",\"type\":\"uint256\"},{\"name\":\"\",\"type\":\"bytes32\"},{\"name\":\"\",\"type\":\"uint8\"},{\"name\":\"\",\"type\":\"uint8\"},{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_cardId\",\"type\":\"uint256\"}],\"name\":\"_approveByMarketplace\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"approved\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"_to\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"Mint\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"}]"

// SeleneanCardsBin is the compiled bytecode used for deploying new contracts.
const SeleneanCardsBin = `0x60008054600160a060020a03191633600160a060020a031617905560c0604052601160808190527f53656c656e65616e43617264546f6b656e00000000000000000000000000000060a09081526200005b9160059190620000a9565b506040805180820190915260038082527f53454c00000000000000000000000000000000000000000000000000000000006020909201918252620000a291600691620000a9565b506200014e565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620000ec57805160ff19168380011785556200011c565b828001600101855582156200011c579182015b828111156200011c578251825591602001919060010190620000ff565b506200012a9291506200012e565b5090565b6200014b91905b808211156200012a576000815560010162000135565b90565b611191806200015e6000396000f30060806040526004361061012e5763ffffffff60e060020a600035041662cbdd528114610133578063056cf1d91461015657806306fdde031461018057806308a6c05a1461020a578063095ea7b31461023e5780630de66a7d146102625780631051db341461027a57806318160ddd146102a35780631e14d823146102b857806323b872dd146102d957806325b56364146103035780632f745c59146103275780635de038b11461034b5780636352211e1461036f57806370a0823114610387578063853b5bb3146103a857806388d9f40d146103cc5780638da5cb5b1461043d57806395d89b4114610452578063a9059cbb14610467578063ae1e36d91461048b578063b05120b7146104a0578063e3684e39146104c1578063f2fde38b14610518578063f4d5698a14610539575b600080fd5b34801561013f57600080fd5b50610154600160a060020a036004351661055d565b005b34801561016257600080fd5b5061016e60043561059a565b60408051918252519081900360200190f35b34801561018c57600080fd5b506101956105ac565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101cf5781810151838201526020016101b7565b50505050905090810190601f1680156101fc5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561021657600080fd5b5061022260043561063a565b60408051600160a060020a039092168252519081900360200190f35b34801561024a57600080fd5b50610154600160a060020a0360043516602435610655565b34801561026e57600080fd5b50610222600435610748565b34801561028657600080fd5b5061028f610763565b604080519115158252519081900360200190f35b3480156102af57600080fd5b5061016e610769565b3480156102c457600080fd5b50610154600160a060020a036004351661076f565b3480156102e557600080fd5b50610154600160a060020a03600435811690602435166044356107ac565b34801561030f57600080fd5b5061016e600160a060020a03600435166024356108df565b34801561033357600080fd5b5061016e600160a060020a036004351660243561096e565b34801561035757600080fd5b5061016e600160a060020a03600435166024356109a5565b34801561037b57600080fd5b50610222600435610b07565b34801561039357600080fd5b5061016e600160a060020a0360043516610b22565b3480156103b457600080fd5b5061016e600160a060020a0360043516602435610b3d565b3480156103d857600080fd5b506103ed600160a060020a0360043516610b6d565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015610429578181015183820152602001610411565b505050509050019250505060405180910390f35b34801561044957600080fd5b50610222610bd9565b34801561045e57600080fd5b50610195610be8565b34801561047357600080fd5b50610154600160a060020a0360043516602435610c43565b34801561049757600080fd5b5061016e610d3b565b3480156104ac57600080fd5b50610154600160a060020a0360043516610d41565b3480156104cd57600080fd5b506104d9600435610d7e565b6040805196875260208701959095528585019390935260ff9182166060860152166080840152600160a060020a031660a0830152519081900360c00190f35b34801561052457600080fd5b50610154600160a060020a0360043516610e40565b34801561054557600080fd5b50610154600160a060020a0360043516602435610ecb565b60005433600160a060020a0390811691161461057857600080fd5b60098054600160a060020a031916600160a060020a0392909216919091179055565b60046020526000908152604090205481565b6005805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156106325780601f1061060757610100808354040283529160200191610632565b820191906000526020600020905b81548152906001019060200180831161061557829003601f168201915b505050505081565b600160205260009081526040902054600160a060020a031681565b600081815260016020526040902054600160a060020a0316151561067857600080fd5b33600160a060020a031661068b82610b07565b600160a060020a03161461069e57600080fd5b33600160a060020a031682600160a060020a0316141515156106bf57600080fd5b6106c881610f09565b600160a060020a03161515806106e65750600160a060020a03821615155b15610744576000818152600260205260408082208054600160a060020a031916600160a060020a038681169182179092559151849333909216917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a45b5050565b600260205260009081526040902054600160a060020a031681565b60015b90565b60075490565b60005433600160a060020a0390811691161461078a57600080fd5b600a8054600160a060020a031916600160a060020a0392909216919091179055565b600081815260016020526040902054600160a060020a031615156107cf57600080fd5b33600160a060020a03166107e282610f09565b600160a060020a0316146107f557600080fd5b82600160a060020a031661080882610b07565b600160a060020a03161461081b57600080fd5b600160a060020a038216151561083057600080fd5b60008181526002602052604090208054600160a060020a03191690556108568382610f24565b6108608282611023565b80600084600160a060020a03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a48082600160a060020a031684600160a060020a03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b600160a060020a038216600090815260036020526040812054815b8181101561096657600160a060020a038516600090815260036020526040812080548692600b9290918590811061092d57fe5b906000526020600020015481526020019081526020016000205414610953576000610956565b60015b60ff1692909201916001016108fa565b505092915050565b600160a060020a038216600090815260036020526040812080548390811061099257fe5b9060005260206000200154905092915050565b6009546000908190819033600160a060020a039081169116146109c757600080fd5b600860009054906101000a9004600160a060020a0316600160a060020a031663c487282c6040518163ffffffff1660e060020a028152600401602060405180830381600087803b158015610a1a57600080fd5b505af1158015610a2e573d6000803e3d6000fd5b505050506040513d6020811015610a4457600080fd5b50518410610a5157600080fd5b610a5a85611085565b600854604080517ff7b10808000000000000000000000000000000000000000000000000000000008152600481018890529051929450600160a060020a039091169163f7b108089160248082019260c0929091908290030181600087803b158015610ac457600080fd5b505af1158015610ad8573d6000803e3d6000fd5b505050506040513d60c0811015610aee57600080fd5b50516000838152600b6020526040902055509392505050565b600090815260016020526040902054600160a060020a031690565b600160a060020a031660009081526003602052604090205490565b600360205281600052604060002081815481101515610b5857fe5b90600052602060002001600091509150505481565b600160a060020a038116600090815260036020908152604091829020805483518184028101840190945280845260609392830182828015610bcd57602002820191906000526020600020905b815481526020019060010190808311610bb9575b50505050509050919050565b600054600160a060020a031681565b6006805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156106325780601f1061060757610100808354040283529160200191610632565b600081815260016020526040902054600160a060020a03161515610c6657600080fd5b60008181526001602052604090205433600160a060020a03908116911614610c8d57600080fd5b60008181526002602052604090208054600160a060020a0319169055610cb33382610f24565b610cbd8282611023565b80600033600160a060020a03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a48082600160a060020a031633600160a060020a03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050565b60075481565b60005433600160a060020a03908116911614610d5c57600080fd5b60088054600160a060020a031916600160a060020a0392909216919091179055565b600080600080600080600860009054906101000a9004600160a060020a0316600160a060020a031663f7b10808886040518263ffffffff1660e060020a0281526004018082815260200191505060c060405180830381600087803b158015610de557600080fd5b505af1158015610df9573d6000803e3d6000fd5b505050506040513d60c0811015610e0f57600080fd5b508051602082015160408301516060840151608085015160a090950151939c929b5090995097509195509350915050565b60005433600160a060020a03908116911614610e5b57600080fd5b600160a060020a0381161515610e7057600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a360008054600160a060020a031916600160a060020a0392909216919091179055565b600a5433600160a060020a03908116911614610ee657600080fd5b600081815260016020526040902054600160a060020a031615156106bf57600080fd5b600090815260026020526040902054600160a060020a031690565b600160a060020a038216600081815260036020818152604080842080548786526004845291852054958552929091529291906000198401848110610f6457fe5b90600052602060002001549050806003600087600160a060020a0316600160a060020a0316815260200190815260200160002083815481101515610fa457fe5b6000918252602080832090910192909255828152600482526040808220859055600160a060020a038816825260039092522080546000198501908110610fe657fe5b60009182526020808320909101829055600160a060020a0387168252600390526040902080549061101b90600019830161111e565b505050505050565b60008181526001602081815260408084208054600160a060020a031916600160a060020a039790971696871790559483526003815284832080549283018155808452818420909201849055905492825260049052919091206000199091019055565b6007805460008181526001602081815260408084208054600160a060020a031916600160a060020a038916908117909155808552600383528185208054808601825581875284872001879055548686526004909352818520600019909301909255855490920190945551909282917f0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885908590a392915050565b81548183558181111561114257600083815260209020611142918101908301611147565b505050565b61076691905b80821115611161576000815560010161114d565b50905600a165627a7a723058201ede812d08bc05f8d90557e1388c07889e06c60b7135b2a7acc01016a10593470029`

// DeploySeleneanCards deploys a new Ethereum contract, binding an instance of SeleneanCards to it.
func DeploySeleneanCards(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *SeleneanCards, error) {
	parsed, err := abi.JSON(strings.NewReader(SeleneanCardsABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(SeleneanCardsBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &SeleneanCards{SeleneanCardsCaller: SeleneanCardsCaller{contract: contract}, SeleneanCardsTransactor: SeleneanCardsTransactor{contract: contract}, SeleneanCardsFilterer: SeleneanCardsFilterer{contract: contract}}, nil
}

// SeleneanCards is an auto generated Go binding around an Ethereum contract.
type SeleneanCards struct {
	SeleneanCardsCaller     // Read-only binding to the contract
	SeleneanCardsTransactor // Write-only binding to the contract
	SeleneanCardsFilterer   // Log filterer for contract events
}

// SeleneanCardsCaller is an auto generated read-only Go binding around an Ethereum contract.
type SeleneanCardsCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SeleneanCardsTransactor is an auto generated write-only Go binding around an Ethereum contract.
type SeleneanCardsTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SeleneanCardsFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type SeleneanCardsFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SeleneanCardsSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type SeleneanCardsSession struct {
	Contract     *SeleneanCards    // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// SeleneanCardsCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type SeleneanCardsCallerSession struct {
	Contract *SeleneanCardsCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts        // Call options to use throughout this session
}

// SeleneanCardsTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type SeleneanCardsTransactorSession struct {
	Contract     *SeleneanCardsTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts        // Transaction auth options to use throughout this session
}

// SeleneanCardsRaw is an auto generated low-level Go binding around an Ethereum contract.
type SeleneanCardsRaw struct {
	Contract *SeleneanCards // Generic contract binding to access the raw methods on
}

// SeleneanCardsCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type SeleneanCardsCallerRaw struct {
	Contract *SeleneanCardsCaller // Generic read-only contract binding to access the raw methods on
}

// SeleneanCardsTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type SeleneanCardsTransactorRaw struct {
	Contract *SeleneanCardsTransactor // Generic write-only contract binding to access the raw methods on
}

// NewSeleneanCards creates a new instance of SeleneanCards, bound to a specific deployed contract.
func NewSeleneanCards(address common.Address, backend bind.ContractBackend) (*SeleneanCards, error) {
	contract, err := bindSeleneanCards(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &SeleneanCards{SeleneanCardsCaller: SeleneanCardsCaller{contract: contract}, SeleneanCardsTransactor: SeleneanCardsTransactor{contract: contract}, SeleneanCardsFilterer: SeleneanCardsFilterer{contract: contract}}, nil
}

// NewSeleneanCardsCaller creates a new read-only instance of SeleneanCards, bound to a specific deployed contract.
func NewSeleneanCardsCaller(address common.Address, caller bind.ContractCaller) (*SeleneanCardsCaller, error) {
	contract, err := bindSeleneanCards(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &SeleneanCardsCaller{contract: contract}, nil
}

// NewSeleneanCardsTransactor creates a new write-only instance of SeleneanCards, bound to a specific deployed contract.
func NewSeleneanCardsTransactor(address common.Address, transactor bind.ContractTransactor) (*SeleneanCardsTransactor, error) {
	contract, err := bindSeleneanCards(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &SeleneanCardsTransactor{contract: contract}, nil
}

// NewSeleneanCardsFilterer creates a new log filterer instance of SeleneanCards, bound to a specific deployed contract.
func NewSeleneanCardsFilterer(address common.Address, filterer bind.ContractFilterer) (*SeleneanCardsFilterer, error) {
	contract, err := bindSeleneanCards(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &SeleneanCardsFilterer{contract: contract}, nil
}

// bindSeleneanCards binds a generic wrapper to an already deployed contract.
func bindSeleneanCards(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(SeleneanCardsABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_SeleneanCards *SeleneanCardsRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _SeleneanCards.Contract.SeleneanCardsCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_SeleneanCards *SeleneanCardsRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SeleneanCards.Contract.SeleneanCardsTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_SeleneanCards *SeleneanCardsRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _SeleneanCards.Contract.SeleneanCardsTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_SeleneanCards *SeleneanCardsCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _SeleneanCards.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_SeleneanCards *SeleneanCardsTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SeleneanCards.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_SeleneanCards *SeleneanCardsTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _SeleneanCards.Contract.contract.Transact(opts, method, params...)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(_owner address) constant returns(balance uint256)
func (_SeleneanCards *SeleneanCardsCaller) BalanceOf(opts *bind.CallOpts, _owner common.Address) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _SeleneanCards.contract.Call(opts, out, "balanceOf", _owner)
	return *ret0, err
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(_owner address) constant returns(balance uint256)
func (_SeleneanCards *SeleneanCardsSession) BalanceOf(_owner common.Address) (*big.Int, error) {
	return _SeleneanCards.Contract.BalanceOf(&_SeleneanCards.CallOpts, _owner)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(_owner address) constant returns(balance uint256)
func (_SeleneanCards *SeleneanCardsCallerSession) BalanceOf(_owner common.Address) (*big.Int, error) {
	return _SeleneanCards.Contract.BalanceOf(&_SeleneanCards.CallOpts, _owner)
}

// GetUserCards is a free data retrieval call binding the contract method 0x88d9f40d.
//
// Solidity: function getUserCards(_owner address) constant returns(uint256[])
func (_SeleneanCards *SeleneanCardsCaller) GetUserCards(opts *bind.CallOpts, _owner common.Address) ([]*big.Int, error) {
	var (
		ret0 = new([]*big.Int)
	)
	out := ret0
	err := _SeleneanCards.contract.Call(opts, out, "getUserCards", _owner)
	return *ret0, err
}

// GetUserCards is a free data retrieval call binding the contract method 0x88d9f40d.
//
// Solidity: function getUserCards(_owner address) constant returns(uint256[])
func (_SeleneanCards *SeleneanCardsSession) GetUserCards(_owner common.Address) ([]*big.Int, error) {
	return _SeleneanCards.Contract.GetUserCards(&_SeleneanCards.CallOpts, _owner)
}

// GetUserCards is a free data retrieval call binding the contract method 0x88d9f40d.
//
// Solidity: function getUserCards(_owner address) constant returns(uint256[])
func (_SeleneanCards *SeleneanCardsCallerSession) GetUserCards(_owner common.Address) ([]*big.Int, error) {
	return _SeleneanCards.Contract.GetUserCards(&_SeleneanCards.CallOpts, _owner)
}

// ImplementsERC721 is a free data retrieval call binding the contract method 0x1051db34.
//
// Solidity: function implementsERC721() constant returns(bool)
func (_SeleneanCards *SeleneanCardsCaller) ImplementsERC721(opts *bind.CallOpts) (bool, error) {
	var (
		ret0 = new(bool)
	)
	out := ret0
	err := _SeleneanCards.contract.Call(opts, out, "implementsERC721")
	return *ret0, err
}

// ImplementsERC721 is a free data retrieval call binding the contract method 0x1051db34.
//
// Solidity: function implementsERC721() constant returns(bool)
func (_SeleneanCards *SeleneanCardsSession) ImplementsERC721() (bool, error) {
	return _SeleneanCards.Contract.ImplementsERC721(&_SeleneanCards.CallOpts)
}

// ImplementsERC721 is a free data retrieval call binding the contract method 0x1051db34.
//
// Solidity: function implementsERC721() constant returns(bool)
func (_SeleneanCards *SeleneanCardsCallerSession) ImplementsERC721() (bool, error) {
	return _SeleneanCards.Contract.ImplementsERC721(&_SeleneanCards.CallOpts)
}

// Metadata is a free data retrieval call binding the contract method 0xe3684e39.
//
// Solidity: function metadata(_cardId uint256) constant returns(uint256, uint256, bytes32, uint8, uint8, address)
func (_SeleneanCards *SeleneanCardsCaller) Metadata(opts *bind.CallOpts, _cardId *big.Int) (*big.Int, *big.Int, [32]byte, uint8, uint8, common.Address, error) {
	var (
		ret0 = new(*big.Int)
		ret1 = new(*big.Int)
		ret2 = new([32]byte)
		ret3 = new(uint8)
		ret4 = new(uint8)
		ret5 = new(common.Address)
	)
	out := &[]interface{}{
		ret0,
		ret1,
		ret2,
		ret3,
		ret4,
		ret5,
	}
	err := _SeleneanCards.contract.Call(opts, out, "metadata", _cardId)
	return *ret0, *ret1, *ret2, *ret3, *ret4, *ret5, err
}

// Metadata is a free data retrieval call binding the contract method 0xe3684e39.
//
// Solidity: function metadata(_cardId uint256) constant returns(uint256, uint256, bytes32, uint8, uint8, address)
func (_SeleneanCards *SeleneanCardsSession) Metadata(_cardId *big.Int) (*big.Int, *big.Int, [32]byte, uint8, uint8, common.Address, error) {
	return _SeleneanCards.Contract.Metadata(&_SeleneanCards.CallOpts, _cardId)
}

// Metadata is a free data retrieval call binding the contract method 0xe3684e39.
//
// Solidity: function metadata(_cardId uint256) constant returns(uint256, uint256, bytes32, uint8, uint8, address)
func (_SeleneanCards *SeleneanCardsCallerSession) Metadata(_cardId *big.Int) (*big.Int, *big.Int, [32]byte, uint8, uint8, common.Address, error) {
	return _SeleneanCards.Contract.Metadata(&_SeleneanCards.CallOpts, _cardId)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() constant returns(string)
func (_SeleneanCards *SeleneanCardsCaller) Name(opts *bind.CallOpts) (string, error) {
	var (
		ret0 = new(string)
	)
	out := ret0
	err := _SeleneanCards.contract.Call(opts, out, "name")
	return *ret0, err
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() constant returns(string)
func (_SeleneanCards *SeleneanCardsSession) Name() (string, error) {
	return _SeleneanCards.Contract.Name(&_SeleneanCards.CallOpts)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() constant returns(string)
func (_SeleneanCards *SeleneanCardsCallerSession) Name() (string, error) {
	return _SeleneanCards.Contract.Name(&_SeleneanCards.CallOpts)
}

// NumOfCards is a free data retrieval call binding the contract method 0xae1e36d9.
//
// Solidity: function numOfCards() constant returns(uint256)
func (_SeleneanCards *SeleneanCardsCaller) NumOfCards(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _SeleneanCards.contract.Call(opts, out, "numOfCards")
	return *ret0, err
}

// NumOfCards is a free data retrieval call binding the contract method 0xae1e36d9.
//
// Solidity: function numOfCards() constant returns(uint256)
func (_SeleneanCards *SeleneanCardsSession) NumOfCards() (*big.Int, error) {
	return _SeleneanCards.Contract.NumOfCards(&_SeleneanCards.CallOpts)
}

// NumOfCards is a free data retrieval call binding the contract method 0xae1e36d9.
//
// Solidity: function numOfCards() constant returns(uint256)
func (_SeleneanCards *SeleneanCardsCallerSession) NumOfCards() (*big.Int, error) {
	return _SeleneanCards.Contract.NumOfCards(&_SeleneanCards.CallOpts)
}

// NumberOfCardsWithType is a free data retrieval call binding the contract method 0x25b56364.
//
// Solidity: function numberOfCardsWithType(_user address, _metadataId uint256) constant returns(_num uint256)
func (_SeleneanCards *SeleneanCardsCaller) NumberOfCardsWithType(opts *bind.CallOpts, _user common.Address, _metadataId *big.Int) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _SeleneanCards.contract.Call(opts, out, "numberOfCardsWithType", _user, _metadataId)
	return *ret0, err
}

// NumberOfCardsWithType is a free data retrieval call binding the contract method 0x25b56364.
//
// Solidity: function numberOfCardsWithType(_user address, _metadataId uint256) constant returns(_num uint256)
func (_SeleneanCards *SeleneanCardsSession) NumberOfCardsWithType(_user common.Address, _metadataId *big.Int) (*big.Int, error) {
	return _SeleneanCards.Contract.NumberOfCardsWithType(&_SeleneanCards.CallOpts, _user, _metadataId)
}

// NumberOfCardsWithType is a free data retrieval call binding the contract method 0x25b56364.
//
// Solidity: function numberOfCardsWithType(_user address, _metadataId uint256) constant returns(_num uint256)
func (_SeleneanCards *SeleneanCardsCallerSession) NumberOfCardsWithType(_user common.Address, _metadataId *big.Int) (*big.Int, error) {
	return _SeleneanCards.Contract.NumberOfCardsWithType(&_SeleneanCards.CallOpts, _user, _metadataId)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_SeleneanCards *SeleneanCardsCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _SeleneanCards.contract.Call(opts, out, "owner")
	return *ret0, err
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_SeleneanCards *SeleneanCardsSession) Owner() (common.Address, error) {
	return _SeleneanCards.Contract.Owner(&_SeleneanCards.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() constant returns(address)
func (_SeleneanCards *SeleneanCardsCallerSession) Owner() (common.Address, error) {
	return _SeleneanCards.Contract.Owner(&_SeleneanCards.CallOpts)
}

// OwnerOf is a free data retrieval call binding the contract method 0x6352211e.
//
// Solidity: function ownerOf(_cardId uint256) constant returns(address)
func (_SeleneanCards *SeleneanCardsCaller) OwnerOf(opts *bind.CallOpts, _cardId *big.Int) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _SeleneanCards.contract.Call(opts, out, "ownerOf", _cardId)
	return *ret0, err
}

// OwnerOf is a free data retrieval call binding the contract method 0x6352211e.
//
// Solidity: function ownerOf(_cardId uint256) constant returns(address)
func (_SeleneanCards *SeleneanCardsSession) OwnerOf(_cardId *big.Int) (common.Address, error) {
	return _SeleneanCards.Contract.OwnerOf(&_SeleneanCards.CallOpts, _cardId)
}

// OwnerOf is a free data retrieval call binding the contract method 0x6352211e.
//
// Solidity: function ownerOf(_cardId uint256) constant returns(address)
func (_SeleneanCards *SeleneanCardsCallerSession) OwnerOf(_cardId *big.Int) (common.Address, error) {
	return _SeleneanCards.Contract.OwnerOf(&_SeleneanCards.CallOpts, _cardId)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() constant returns(string)
func (_SeleneanCards *SeleneanCardsCaller) Symbol(opts *bind.CallOpts) (string, error) {
	var (
		ret0 = new(string)
	)
	out := ret0
	err := _SeleneanCards.contract.Call(opts, out, "symbol")
	return *ret0, err
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() constant returns(string)
func (_SeleneanCards *SeleneanCardsSession) Symbol() (string, error) {
	return _SeleneanCards.Contract.Symbol(&_SeleneanCards.CallOpts)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() constant returns(string)
func (_SeleneanCards *SeleneanCardsCallerSession) Symbol() (string, error) {
	return _SeleneanCards.Contract.Symbol(&_SeleneanCards.CallOpts)
}

// TokenOfOwnerByIndex is a free data retrieval call binding the contract method 0x2f745c59.
//
// Solidity: function tokenOfOwnerByIndex(_owner address, _index uint256) constant returns(uint256)
func (_SeleneanCards *SeleneanCardsCaller) TokenOfOwnerByIndex(opts *bind.CallOpts, _owner common.Address, _index *big.Int) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _SeleneanCards.contract.Call(opts, out, "tokenOfOwnerByIndex", _owner, _index)
	return *ret0, err
}

// TokenOfOwnerByIndex is a free data retrieval call binding the contract method 0x2f745c59.
//
// Solidity: function tokenOfOwnerByIndex(_owner address, _index uint256) constant returns(uint256)
func (_SeleneanCards *SeleneanCardsSession) TokenOfOwnerByIndex(_owner common.Address, _index *big.Int) (*big.Int, error) {
	return _SeleneanCards.Contract.TokenOfOwnerByIndex(&_SeleneanCards.CallOpts, _owner, _index)
}

// TokenOfOwnerByIndex is a free data retrieval call binding the contract method 0x2f745c59.
//
// Solidity: function tokenOfOwnerByIndex(_owner address, _index uint256) constant returns(uint256)
func (_SeleneanCards *SeleneanCardsCallerSession) TokenOfOwnerByIndex(_owner common.Address, _index *big.Int) (*big.Int, error) {
	return _SeleneanCards.Contract.TokenOfOwnerByIndex(&_SeleneanCards.CallOpts, _owner, _index)
}

// TokenPosInArr is a free data retrieval call binding the contract method 0x056cf1d9.
//
// Solidity: function tokenPosInArr( uint256) constant returns(uint256)
func (_SeleneanCards *SeleneanCardsCaller) TokenPosInArr(opts *bind.CallOpts, arg0 *big.Int) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _SeleneanCards.contract.Call(opts, out, "tokenPosInArr", arg0)
	return *ret0, err
}

// TokenPosInArr is a free data retrieval call binding the contract method 0x056cf1d9.
//
// Solidity: function tokenPosInArr( uint256) constant returns(uint256)
func (_SeleneanCards *SeleneanCardsSession) TokenPosInArr(arg0 *big.Int) (*big.Int, error) {
	return _SeleneanCards.Contract.TokenPosInArr(&_SeleneanCards.CallOpts, arg0)
}

// TokenPosInArr is a free data retrieval call binding the contract method 0x056cf1d9.
//
// Solidity: function tokenPosInArr( uint256) constant returns(uint256)
func (_SeleneanCards *SeleneanCardsCallerSession) TokenPosInArr(arg0 *big.Int) (*big.Int, error) {
	return _SeleneanCards.Contract.TokenPosInArr(&_SeleneanCards.CallOpts, arg0)
}

// TokensForApproved is a free data retrieval call binding the contract method 0x0de66a7d.
//
// Solidity: function tokensForApproved( uint256) constant returns(address)
func (_SeleneanCards *SeleneanCardsCaller) TokensForApproved(opts *bind.CallOpts, arg0 *big.Int) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _SeleneanCards.contract.Call(opts, out, "tokensForApproved", arg0)
	return *ret0, err
}

// TokensForApproved is a free data retrieval call binding the contract method 0x0de66a7d.
//
// Solidity: function tokensForApproved( uint256) constant returns(address)
func (_SeleneanCards *SeleneanCardsSession) TokensForApproved(arg0 *big.Int) (common.Address, error) {
	return _SeleneanCards.Contract.TokensForApproved(&_SeleneanCards.CallOpts, arg0)
}

// TokensForApproved is a free data retrieval call binding the contract method 0x0de66a7d.
//
// Solidity: function tokensForApproved( uint256) constant returns(address)
func (_SeleneanCards *SeleneanCardsCallerSession) TokensForApproved(arg0 *big.Int) (common.Address, error) {
	return _SeleneanCards.Contract.TokensForApproved(&_SeleneanCards.CallOpts, arg0)
}

// TokensForOwner is a free data retrieval call binding the contract method 0x08a6c05a.
//
// Solidity: function tokensForOwner( uint256) constant returns(address)
func (_SeleneanCards *SeleneanCardsCaller) TokensForOwner(opts *bind.CallOpts, arg0 *big.Int) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _SeleneanCards.contract.Call(opts, out, "tokensForOwner", arg0)
	return *ret0, err
}

// TokensForOwner is a free data retrieval call binding the contract method 0x08a6c05a.
//
// Solidity: function tokensForOwner( uint256) constant returns(address)
func (_SeleneanCards *SeleneanCardsSession) TokensForOwner(arg0 *big.Int) (common.Address, error) {
	return _SeleneanCards.Contract.TokensForOwner(&_SeleneanCards.CallOpts, arg0)
}

// TokensForOwner is a free data retrieval call binding the contract method 0x08a6c05a.
//
// Solidity: function tokensForOwner( uint256) constant returns(address)
func (_SeleneanCards *SeleneanCardsCallerSession) TokensForOwner(arg0 *big.Int) (common.Address, error) {
	return _SeleneanCards.Contract.TokensForOwner(&_SeleneanCards.CallOpts, arg0)
}

// TokensOwned is a free data retrieval call binding the contract method 0x853b5bb3.
//
// Solidity: function tokensOwned( address,  uint256) constant returns(uint256)
func (_SeleneanCards *SeleneanCardsCaller) TokensOwned(opts *bind.CallOpts, arg0 common.Address, arg1 *big.Int) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _SeleneanCards.contract.Call(opts, out, "tokensOwned", arg0, arg1)
	return *ret0, err
}

// TokensOwned is a free data retrieval call binding the contract method 0x853b5bb3.
//
// Solidity: function tokensOwned( address,  uint256) constant returns(uint256)
func (_SeleneanCards *SeleneanCardsSession) TokensOwned(arg0 common.Address, arg1 *big.Int) (*big.Int, error) {
	return _SeleneanCards.Contract.TokensOwned(&_SeleneanCards.CallOpts, arg0, arg1)
}

// TokensOwned is a free data retrieval call binding the contract method 0x853b5bb3.
//
// Solidity: function tokensOwned( address,  uint256) constant returns(uint256)
func (_SeleneanCards *SeleneanCardsCallerSession) TokensOwned(arg0 common.Address, arg1 *big.Int) (*big.Int, error) {
	return _SeleneanCards.Contract.TokensOwned(&_SeleneanCards.CallOpts, arg0, arg1)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_SeleneanCards *SeleneanCardsCaller) TotalSupply(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _SeleneanCards.contract.Call(opts, out, "totalSupply")
	return *ret0, err
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_SeleneanCards *SeleneanCardsSession) TotalSupply() (*big.Int, error) {
	return _SeleneanCards.Contract.TotalSupply(&_SeleneanCards.CallOpts)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_SeleneanCards *SeleneanCardsCallerSession) TotalSupply() (*big.Int, error) {
	return _SeleneanCards.Contract.TotalSupply(&_SeleneanCards.CallOpts)
}

// ApproveByMarketplace is a paid mutator transaction binding the contract method 0xf4d5698a.
//
// Solidity: function _approveByMarketplace(_to address, _cardId uint256) returns()
func (_SeleneanCards *SeleneanCardsTransactor) ApproveByMarketplace(opts *bind.TransactOpts, _to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _SeleneanCards.contract.Transact(opts, "_approveByMarketplace", _to, _cardId)
}

// ApproveByMarketplace is a paid mutator transaction binding the contract method 0xf4d5698a.
//
// Solidity: function _approveByMarketplace(_to address, _cardId uint256) returns()
func (_SeleneanCards *SeleneanCardsSession) ApproveByMarketplace(_to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _SeleneanCards.Contract.ApproveByMarketplace(&_SeleneanCards.TransactOpts, _to, _cardId)
}

// ApproveByMarketplace is a paid mutator transaction binding the contract method 0xf4d5698a.
//
// Solidity: function _approveByMarketplace(_to address, _cardId uint256) returns()
func (_SeleneanCards *SeleneanCardsTransactorSession) ApproveByMarketplace(_to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _SeleneanCards.Contract.ApproveByMarketplace(&_SeleneanCards.TransactOpts, _to, _cardId)
}

// AddBoosterContract is a paid mutator transaction binding the contract method 0x00cbdd52.
//
// Solidity: function addBoosterContract(_boosterContract address) returns()
func (_SeleneanCards *SeleneanCardsTransactor) AddBoosterContract(opts *bind.TransactOpts, _boosterContract common.Address) (*types.Transaction, error) {
	return _SeleneanCards.contract.Transact(opts, "addBoosterContract", _boosterContract)
}

// AddBoosterContract is a paid mutator transaction binding the contract method 0x00cbdd52.
//
// Solidity: function addBoosterContract(_boosterContract address) returns()
func (_SeleneanCards *SeleneanCardsSession) AddBoosterContract(_boosterContract common.Address) (*types.Transaction, error) {
	return _SeleneanCards.Contract.AddBoosterContract(&_SeleneanCards.TransactOpts, _boosterContract)
}

// AddBoosterContract is a paid mutator transaction binding the contract method 0x00cbdd52.
//
// Solidity: function addBoosterContract(_boosterContract address) returns()
func (_SeleneanCards *SeleneanCardsTransactorSession) AddBoosterContract(_boosterContract common.Address) (*types.Transaction, error) {
	return _SeleneanCards.Contract.AddBoosterContract(&_SeleneanCards.TransactOpts, _boosterContract)
}

// AddMarketplaceContract is a paid mutator transaction binding the contract method 0x1e14d823.
//
// Solidity: function addMarketplaceContract(_marketplaceContract address) returns()
func (_SeleneanCards *SeleneanCardsTransactor) AddMarketplaceContract(opts *bind.TransactOpts, _marketplaceContract common.Address) (*types.Transaction, error) {
	return _SeleneanCards.contract.Transact(opts, "addMarketplaceContract", _marketplaceContract)
}

// AddMarketplaceContract is a paid mutator transaction binding the contract method 0x1e14d823.
//
// Solidity: function addMarketplaceContract(_marketplaceContract address) returns()
func (_SeleneanCards *SeleneanCardsSession) AddMarketplaceContract(_marketplaceContract common.Address) (*types.Transaction, error) {
	return _SeleneanCards.Contract.AddMarketplaceContract(&_SeleneanCards.TransactOpts, _marketplaceContract)
}

// AddMarketplaceContract is a paid mutator transaction binding the contract method 0x1e14d823.
//
// Solidity: function addMarketplaceContract(_marketplaceContract address) returns()
func (_SeleneanCards *SeleneanCardsTransactorSession) AddMarketplaceContract(_marketplaceContract common.Address) (*types.Transaction, error) {
	return _SeleneanCards.Contract.AddMarketplaceContract(&_SeleneanCards.TransactOpts, _marketplaceContract)
}

// AddMetadataContract is a paid mutator transaction binding the contract method 0xb05120b7.
//
// Solidity: function addMetadataContract(_metadataContract address) returns()
func (_SeleneanCards *SeleneanCardsTransactor) AddMetadataContract(opts *bind.TransactOpts, _metadataContract common.Address) (*types.Transaction, error) {
	return _SeleneanCards.contract.Transact(opts, "addMetadataContract", _metadataContract)
}

// AddMetadataContract is a paid mutator transaction binding the contract method 0xb05120b7.
//
// Solidity: function addMetadataContract(_metadataContract address) returns()
func (_SeleneanCards *SeleneanCardsSession) AddMetadataContract(_metadataContract common.Address) (*types.Transaction, error) {
	return _SeleneanCards.Contract.AddMetadataContract(&_SeleneanCards.TransactOpts, _metadataContract)
}

// AddMetadataContract is a paid mutator transaction binding the contract method 0xb05120b7.
//
// Solidity: function addMetadataContract(_metadataContract address) returns()
func (_SeleneanCards *SeleneanCardsTransactorSession) AddMetadataContract(_metadataContract common.Address) (*types.Transaction, error) {
	return _SeleneanCards.Contract.AddMetadataContract(&_SeleneanCards.TransactOpts, _metadataContract)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(_to address, _cardId uint256) returns()
func (_SeleneanCards *SeleneanCardsTransactor) Approve(opts *bind.TransactOpts, _to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _SeleneanCards.contract.Transact(opts, "approve", _to, _cardId)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(_to address, _cardId uint256) returns()
func (_SeleneanCards *SeleneanCardsSession) Approve(_to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _SeleneanCards.Contract.Approve(&_SeleneanCards.TransactOpts, _to, _cardId)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(_to address, _cardId uint256) returns()
func (_SeleneanCards *SeleneanCardsTransactorSession) Approve(_to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _SeleneanCards.Contract.Approve(&_SeleneanCards.TransactOpts, _to, _cardId)
}

// CreateCard is a paid mutator transaction binding the contract method 0x5de038b1.
//
// Solidity: function createCard(_owner address, _metadataId uint256) returns(uint256)
func (_SeleneanCards *SeleneanCardsTransactor) CreateCard(opts *bind.TransactOpts, _owner common.Address, _metadataId *big.Int) (*types.Transaction, error) {
	return _SeleneanCards.contract.Transact(opts, "createCard", _owner, _metadataId)
}

// CreateCard is a paid mutator transaction binding the contract method 0x5de038b1.
//
// Solidity: function createCard(_owner address, _metadataId uint256) returns(uint256)
func (_SeleneanCards *SeleneanCardsSession) CreateCard(_owner common.Address, _metadataId *big.Int) (*types.Transaction, error) {
	return _SeleneanCards.Contract.CreateCard(&_SeleneanCards.TransactOpts, _owner, _metadataId)
}

// CreateCard is a paid mutator transaction binding the contract method 0x5de038b1.
//
// Solidity: function createCard(_owner address, _metadataId uint256) returns(uint256)
func (_SeleneanCards *SeleneanCardsTransactorSession) CreateCard(_owner common.Address, _metadataId *big.Int) (*types.Transaction, error) {
	return _SeleneanCards.Contract.CreateCard(&_SeleneanCards.TransactOpts, _owner, _metadataId)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(_to address, _cardId uint256) returns()
func (_SeleneanCards *SeleneanCardsTransactor) Transfer(opts *bind.TransactOpts, _to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _SeleneanCards.contract.Transact(opts, "transfer", _to, _cardId)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(_to address, _cardId uint256) returns()
func (_SeleneanCards *SeleneanCardsSession) Transfer(_to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _SeleneanCards.Contract.Transfer(&_SeleneanCards.TransactOpts, _to, _cardId)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(_to address, _cardId uint256) returns()
func (_SeleneanCards *SeleneanCardsTransactorSession) Transfer(_to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _SeleneanCards.Contract.Transfer(&_SeleneanCards.TransactOpts, _to, _cardId)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(_from address, _to address, _cardId uint256) returns()
func (_SeleneanCards *SeleneanCardsTransactor) TransferFrom(opts *bind.TransactOpts, _from common.Address, _to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _SeleneanCards.contract.Transact(opts, "transferFrom", _from, _to, _cardId)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(_from address, _to address, _cardId uint256) returns()
func (_SeleneanCards *SeleneanCardsSession) TransferFrom(_from common.Address, _to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _SeleneanCards.Contract.TransferFrom(&_SeleneanCards.TransactOpts, _from, _to, _cardId)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(_from address, _to address, _cardId uint256) returns()
func (_SeleneanCards *SeleneanCardsTransactorSession) TransferFrom(_from common.Address, _to common.Address, _cardId *big.Int) (*types.Transaction, error) {
	return _SeleneanCards.Contract.TransferFrom(&_SeleneanCards.TransactOpts, _from, _to, _cardId)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_SeleneanCards *SeleneanCardsTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _SeleneanCards.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_SeleneanCards *SeleneanCardsSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _SeleneanCards.Contract.TransferOwnership(&_SeleneanCards.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(newOwner address) returns()
func (_SeleneanCards *SeleneanCardsTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _SeleneanCards.Contract.TransferOwnership(&_SeleneanCards.TransactOpts, newOwner)
}

// SeleneanCardsApprovalIterator is returned from FilterApproval and is used to iterate over the raw logs and unpacked data for Approval events raised by the SeleneanCards contract.
type SeleneanCardsApprovalIterator struct {
	Event *SeleneanCardsApproval // Event containing the contract specifics and raw log

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
func (it *SeleneanCardsApprovalIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SeleneanCardsApproval)
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
		it.Event = new(SeleneanCardsApproval)
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
func (it *SeleneanCardsApprovalIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SeleneanCardsApprovalIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SeleneanCardsApproval represents a Approval event raised by the SeleneanCards contract.
type SeleneanCardsApproval struct {
	Owner    common.Address
	Approved common.Address
	TokenId  *big.Int
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterApproval is a free log retrieval operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: e Approval(owner indexed address, approved indexed address, tokenId indexed uint256)
func (_SeleneanCards *SeleneanCardsFilterer) FilterApproval(opts *bind.FilterOpts, owner []common.Address, approved []common.Address, tokenId []*big.Int) (*SeleneanCardsApprovalIterator, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var approvedRule []interface{}
	for _, approvedItem := range approved {
		approvedRule = append(approvedRule, approvedItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _SeleneanCards.contract.FilterLogs(opts, "Approval", ownerRule, approvedRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return &SeleneanCardsApprovalIterator{contract: _SeleneanCards.contract, event: "Approval", logs: logs, sub: sub}, nil
}

// WatchApproval is a free log subscription operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: e Approval(owner indexed address, approved indexed address, tokenId indexed uint256)
func (_SeleneanCards *SeleneanCardsFilterer) WatchApproval(opts *bind.WatchOpts, sink chan<- *SeleneanCardsApproval, owner []common.Address, approved []common.Address, tokenId []*big.Int) (event.Subscription, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var approvedRule []interface{}
	for _, approvedItem := range approved {
		approvedRule = append(approvedRule, approvedItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _SeleneanCards.contract.WatchLogs(opts, "Approval", ownerRule, approvedRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SeleneanCardsApproval)
				if err := _SeleneanCards.contract.UnpackLog(event, "Approval", log); err != nil {
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

// SeleneanCardsMintIterator is returned from FilterMint and is used to iterate over the raw logs and unpacked data for Mint events raised by the SeleneanCards contract.
type SeleneanCardsMintIterator struct {
	Event *SeleneanCardsMint // Event containing the contract specifics and raw log

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
func (it *SeleneanCardsMintIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SeleneanCardsMint)
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
		it.Event = new(SeleneanCardsMint)
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
func (it *SeleneanCardsMintIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SeleneanCardsMintIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SeleneanCardsMint represents a Mint event raised by the SeleneanCards contract.
type SeleneanCardsMint struct {
	To      common.Address
	TokenId *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterMint is a free log retrieval operation binding the contract event 0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885.
//
// Solidity: e Mint(_to indexed address, _tokenId indexed uint256)
func (_SeleneanCards *SeleneanCardsFilterer) FilterMint(opts *bind.FilterOpts, _to []common.Address, _tokenId []*big.Int) (*SeleneanCardsMintIterator, error) {

	var _toRule []interface{}
	for _, _toItem := range _to {
		_toRule = append(_toRule, _toItem)
	}
	var _tokenIdRule []interface{}
	for _, _tokenIdItem := range _tokenId {
		_tokenIdRule = append(_tokenIdRule, _tokenIdItem)
	}

	logs, sub, err := _SeleneanCards.contract.FilterLogs(opts, "Mint", _toRule, _tokenIdRule)
	if err != nil {
		return nil, err
	}
	return &SeleneanCardsMintIterator{contract: _SeleneanCards.contract, event: "Mint", logs: logs, sub: sub}, nil
}

// WatchMint is a free log subscription operation binding the contract event 0x0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885.
//
// Solidity: e Mint(_to indexed address, _tokenId indexed uint256)
func (_SeleneanCards *SeleneanCardsFilterer) WatchMint(opts *bind.WatchOpts, sink chan<- *SeleneanCardsMint, _to []common.Address, _tokenId []*big.Int) (event.Subscription, error) {

	var _toRule []interface{}
	for _, _toItem := range _to {
		_toRule = append(_toRule, _toItem)
	}
	var _tokenIdRule []interface{}
	for _, _tokenIdItem := range _tokenId {
		_tokenIdRule = append(_tokenIdRule, _tokenIdItem)
	}

	logs, sub, err := _SeleneanCards.contract.WatchLogs(opts, "Mint", _toRule, _tokenIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SeleneanCardsMint)
				if err := _SeleneanCards.contract.UnpackLog(event, "Mint", log); err != nil {
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

// SeleneanCardsOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the SeleneanCards contract.
type SeleneanCardsOwnershipTransferredIterator struct {
	Event *SeleneanCardsOwnershipTransferred // Event containing the contract specifics and raw log

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
func (it *SeleneanCardsOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SeleneanCardsOwnershipTransferred)
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
		it.Event = new(SeleneanCardsOwnershipTransferred)
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
func (it *SeleneanCardsOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SeleneanCardsOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SeleneanCardsOwnershipTransferred represents a OwnershipTransferred event raised by the SeleneanCards contract.
type SeleneanCardsOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: e OwnershipTransferred(previousOwner indexed address, newOwner indexed address)
func (_SeleneanCards *SeleneanCardsFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*SeleneanCardsOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _SeleneanCards.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &SeleneanCardsOwnershipTransferredIterator{contract: _SeleneanCards.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: e OwnershipTransferred(previousOwner indexed address, newOwner indexed address)
func (_SeleneanCards *SeleneanCardsFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *SeleneanCardsOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _SeleneanCards.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SeleneanCardsOwnershipTransferred)
				if err := _SeleneanCards.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
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

// SeleneanCardsTransferIterator is returned from FilterTransfer and is used to iterate over the raw logs and unpacked data for Transfer events raised by the SeleneanCards contract.
type SeleneanCardsTransferIterator struct {
	Event *SeleneanCardsTransfer // Event containing the contract specifics and raw log

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
func (it *SeleneanCardsTransferIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SeleneanCardsTransfer)
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
		it.Event = new(SeleneanCardsTransfer)
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
func (it *SeleneanCardsTransferIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SeleneanCardsTransferIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SeleneanCardsTransfer represents a Transfer event raised by the SeleneanCards contract.
type SeleneanCardsTransfer struct {
	From    common.Address
	To      common.Address
	TokenId *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterTransfer is a free log retrieval operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: e Transfer(from indexed address, to indexed address, tokenId indexed uint256)
func (_SeleneanCards *SeleneanCardsFilterer) FilterTransfer(opts *bind.FilterOpts, from []common.Address, to []common.Address, tokenId []*big.Int) (*SeleneanCardsTransferIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _SeleneanCards.contract.FilterLogs(opts, "Transfer", fromRule, toRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return &SeleneanCardsTransferIterator{contract: _SeleneanCards.contract, event: "Transfer", logs: logs, sub: sub}, nil
}

// WatchTransfer is a free log subscription operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: e Transfer(from indexed address, to indexed address, tokenId indexed uint256)
func (_SeleneanCards *SeleneanCardsFilterer) WatchTransfer(opts *bind.WatchOpts, sink chan<- *SeleneanCardsTransfer, from []common.Address, to []common.Address, tokenId []*big.Int) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}
	var tokenIdRule []interface{}
	for _, tokenIdItem := range tokenId {
		tokenIdRule = append(tokenIdRule, tokenIdItem)
	}

	logs, sub, err := _SeleneanCards.contract.WatchLogs(opts, "Transfer", fromRule, toRule, tokenIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SeleneanCardsTransfer)
				if err := _SeleneanCards.contract.UnpackLog(event, "Transfer", log); err != nil {
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

// StandardTokenABI is the input ABI used to generate the binding from.
const StandardTokenABI = "[{\"constant\":false,\"inputs\":[{\"name\":\"_spender\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_from\",\"type\":\"address\"},{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_spender\",\"type\":\"address\"},{\"name\":\"_subtractedValue\",\"type\":\"uint256\"}],\"name\":\"decreaseApproval\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"balance\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_spender\",\"type\":\"address\"},{\"name\":\"_addedValue\",\"type\":\"uint256\"}],\"name\":\"increaseApproval\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"},{\"name\":\"_spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"}]"

// StandardTokenBin is the compiled bytecode used for deploying new contracts.
const StandardTokenBin = `0x608060405234801561001057600080fd5b506106ed806100206000396000f30060806040526004361061008d5763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663095ea7b3811461009257806318160ddd146100ca57806323b872dd146100f1578063661884631461011b57806370a082311461013f578063a9059cbb14610160578063d73dd62314610184578063dd62ed3e146101a8575b600080fd5b34801561009e57600080fd5b506100b6600160a060020a03600435166024356101cf565b604080519115158252519081900360200190f35b3480156100d657600080fd5b506100df610239565b60408051918252519081900360200190f35b3480156100fd57600080fd5b506100b6600160a060020a036004358116906024351660443561023f565b34801561012757600080fd5b506100b6600160a060020a03600435166024356103bf565b34801561014b57600080fd5b506100df600160a060020a03600435166104b8565b34801561016c57600080fd5b506100b6600160a060020a03600435166024356104d3565b34801561019057600080fd5b506100b6600160a060020a03600435166024356105cc565b3480156101b457600080fd5b506100df600160a060020a036004358116906024351661066e565b600160a060020a03338116600081815260026020908152604080832094871680845294825280832086905580518681529051929493927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a350600192915050565b60015490565b6000600160a060020a038316151561025657600080fd5b600160a060020a03841660009081526020819052604090205482111561027b57600080fd5b600160a060020a03808516600090815260026020908152604080832033909416835292905220548211156102ae57600080fd5b600160a060020a0384166000908152602081905260409020546102d7908363ffffffff61069916565b600160a060020a03808616600090815260208190526040808220939093559085168152205461030c908363ffffffff6106ab16565b600160a060020a0380851660009081526020818152604080832094909455878316825260028152838220339093168252919091522054610352908363ffffffff61069916565b600160a060020a038086166000818152600260209081526040808320338616845282529182902094909455805186815290519287169391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a35060019392505050565b600160a060020a0333811660009081526002602090815260408083209386168352929052908120548083111561041c57600160a060020a033381166000908152600260209081526040808320938816835292905290812055610453565b61042c818463ffffffff61069916565b600160a060020a033381166000908152600260209081526040808320938916835292905220555b600160a060020a0333811660008181526002602090815260408083209489168084529482529182902054825190815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a35060019392505050565b600160a060020a031660009081526020819052604090205490565b6000600160a060020a03831615156104ea57600080fd5b600160a060020a03331660009081526020819052604090205482111561050f57600080fd5b600160a060020a033316600090815260208190526040902054610538908363ffffffff61069916565b600160a060020a03338116600090815260208190526040808220939093559085168152205461056d908363ffffffff6106ab16565b600160a060020a03808516600081815260208181526040918290209490945580518681529051919333909316927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a350600192915050565b600160a060020a033381166000908152600260209081526040808320938616835292905290812054610604908363ffffffff6106ab16565b600160a060020a0333811660008181526002602090815260408083209489168084529482529182902085905581519485529051929391927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a350600192915050565b600160a060020a03918216600090815260026020908152604080832093909416825291909152205490565b6000828211156106a557fe5b50900390565b6000828201838110156106ba57fe5b93925050505600a165627a7a72305820246026ca1f2b8ec8b4da425f6eb29d8517d551020ea1f2e4f0aea4ff88d4991f0029`

// DeployStandardToken deploys a new Ethereum contract, binding an instance of StandardToken to it.
func DeployStandardToken(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *StandardToken, error) {
	parsed, err := abi.JSON(strings.NewReader(StandardTokenABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(StandardTokenBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &StandardToken{StandardTokenCaller: StandardTokenCaller{contract: contract}, StandardTokenTransactor: StandardTokenTransactor{contract: contract}, StandardTokenFilterer: StandardTokenFilterer{contract: contract}}, nil
}

// StandardToken is an auto generated Go binding around an Ethereum contract.
type StandardToken struct {
	StandardTokenCaller     // Read-only binding to the contract
	StandardTokenTransactor // Write-only binding to the contract
	StandardTokenFilterer   // Log filterer for contract events
}

// StandardTokenCaller is an auto generated read-only Go binding around an Ethereum contract.
type StandardTokenCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// StandardTokenTransactor is an auto generated write-only Go binding around an Ethereum contract.
type StandardTokenTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// StandardTokenFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type StandardTokenFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// StandardTokenSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type StandardTokenSession struct {
	Contract     *StandardToken    // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// StandardTokenCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type StandardTokenCallerSession struct {
	Contract *StandardTokenCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts        // Call options to use throughout this session
}

// StandardTokenTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type StandardTokenTransactorSession struct {
	Contract     *StandardTokenTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts        // Transaction auth options to use throughout this session
}

// StandardTokenRaw is an auto generated low-level Go binding around an Ethereum contract.
type StandardTokenRaw struct {
	Contract *StandardToken // Generic contract binding to access the raw methods on
}

// StandardTokenCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type StandardTokenCallerRaw struct {
	Contract *StandardTokenCaller // Generic read-only contract binding to access the raw methods on
}

// StandardTokenTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type StandardTokenTransactorRaw struct {
	Contract *StandardTokenTransactor // Generic write-only contract binding to access the raw methods on
}

// NewStandardToken creates a new instance of StandardToken, bound to a specific deployed contract.
func NewStandardToken(address common.Address, backend bind.ContractBackend) (*StandardToken, error) {
	contract, err := bindStandardToken(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &StandardToken{StandardTokenCaller: StandardTokenCaller{contract: contract}, StandardTokenTransactor: StandardTokenTransactor{contract: contract}, StandardTokenFilterer: StandardTokenFilterer{contract: contract}}, nil
}

// NewStandardTokenCaller creates a new read-only instance of StandardToken, bound to a specific deployed contract.
func NewStandardTokenCaller(address common.Address, caller bind.ContractCaller) (*StandardTokenCaller, error) {
	contract, err := bindStandardToken(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &StandardTokenCaller{contract: contract}, nil
}

// NewStandardTokenTransactor creates a new write-only instance of StandardToken, bound to a specific deployed contract.
func NewStandardTokenTransactor(address common.Address, transactor bind.ContractTransactor) (*StandardTokenTransactor, error) {
	contract, err := bindStandardToken(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &StandardTokenTransactor{contract: contract}, nil
}

// NewStandardTokenFilterer creates a new log filterer instance of StandardToken, bound to a specific deployed contract.
func NewStandardTokenFilterer(address common.Address, filterer bind.ContractFilterer) (*StandardTokenFilterer, error) {
	contract, err := bindStandardToken(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &StandardTokenFilterer{contract: contract}, nil
}

// bindStandardToken binds a generic wrapper to an already deployed contract.
func bindStandardToken(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(StandardTokenABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_StandardToken *StandardTokenRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _StandardToken.Contract.StandardTokenCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_StandardToken *StandardTokenRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _StandardToken.Contract.StandardTokenTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_StandardToken *StandardTokenRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _StandardToken.Contract.StandardTokenTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_StandardToken *StandardTokenCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _StandardToken.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_StandardToken *StandardTokenTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _StandardToken.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_StandardToken *StandardTokenTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _StandardToken.Contract.contract.Transact(opts, method, params...)
}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(_owner address, _spender address) constant returns(uint256)
func (_StandardToken *StandardTokenCaller) Allowance(opts *bind.CallOpts, _owner common.Address, _spender common.Address) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _StandardToken.contract.Call(opts, out, "allowance", _owner, _spender)
	return *ret0, err
}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(_owner address, _spender address) constant returns(uint256)
func (_StandardToken *StandardTokenSession) Allowance(_owner common.Address, _spender common.Address) (*big.Int, error) {
	return _StandardToken.Contract.Allowance(&_StandardToken.CallOpts, _owner, _spender)
}

// Allowance is a free data retrieval call binding the contract method 0xdd62ed3e.
//
// Solidity: function allowance(_owner address, _spender address) constant returns(uint256)
func (_StandardToken *StandardTokenCallerSession) Allowance(_owner common.Address, _spender common.Address) (*big.Int, error) {
	return _StandardToken.Contract.Allowance(&_StandardToken.CallOpts, _owner, _spender)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(_owner address) constant returns(balance uint256)
func (_StandardToken *StandardTokenCaller) BalanceOf(opts *bind.CallOpts, _owner common.Address) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _StandardToken.contract.Call(opts, out, "balanceOf", _owner)
	return *ret0, err
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(_owner address) constant returns(balance uint256)
func (_StandardToken *StandardTokenSession) BalanceOf(_owner common.Address) (*big.Int, error) {
	return _StandardToken.Contract.BalanceOf(&_StandardToken.CallOpts, _owner)
}

// BalanceOf is a free data retrieval call binding the contract method 0x70a08231.
//
// Solidity: function balanceOf(_owner address) constant returns(balance uint256)
func (_StandardToken *StandardTokenCallerSession) BalanceOf(_owner common.Address) (*big.Int, error) {
	return _StandardToken.Contract.BalanceOf(&_StandardToken.CallOpts, _owner)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_StandardToken *StandardTokenCaller) TotalSupply(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _StandardToken.contract.Call(opts, out, "totalSupply")
	return *ret0, err
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_StandardToken *StandardTokenSession) TotalSupply() (*big.Int, error) {
	return _StandardToken.Contract.TotalSupply(&_StandardToken.CallOpts)
}

// TotalSupply is a free data retrieval call binding the contract method 0x18160ddd.
//
// Solidity: function totalSupply() constant returns(uint256)
func (_StandardToken *StandardTokenCallerSession) TotalSupply() (*big.Int, error) {
	return _StandardToken.Contract.TotalSupply(&_StandardToken.CallOpts)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(_spender address, _value uint256) returns(bool)
func (_StandardToken *StandardTokenTransactor) Approve(opts *bind.TransactOpts, _spender common.Address, _value *big.Int) (*types.Transaction, error) {
	return _StandardToken.contract.Transact(opts, "approve", _spender, _value)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(_spender address, _value uint256) returns(bool)
func (_StandardToken *StandardTokenSession) Approve(_spender common.Address, _value *big.Int) (*types.Transaction, error) {
	return _StandardToken.Contract.Approve(&_StandardToken.TransactOpts, _spender, _value)
}

// Approve is a paid mutator transaction binding the contract method 0x095ea7b3.
//
// Solidity: function approve(_spender address, _value uint256) returns(bool)
func (_StandardToken *StandardTokenTransactorSession) Approve(_spender common.Address, _value *big.Int) (*types.Transaction, error) {
	return _StandardToken.Contract.Approve(&_StandardToken.TransactOpts, _spender, _value)
}

// DecreaseApproval is a paid mutator transaction binding the contract method 0x66188463.
//
// Solidity: function decreaseApproval(_spender address, _subtractedValue uint256) returns(bool)
func (_StandardToken *StandardTokenTransactor) DecreaseApproval(opts *bind.TransactOpts, _spender common.Address, _subtractedValue *big.Int) (*types.Transaction, error) {
	return _StandardToken.contract.Transact(opts, "decreaseApproval", _spender, _subtractedValue)
}

// DecreaseApproval is a paid mutator transaction binding the contract method 0x66188463.
//
// Solidity: function decreaseApproval(_spender address, _subtractedValue uint256) returns(bool)
func (_StandardToken *StandardTokenSession) DecreaseApproval(_spender common.Address, _subtractedValue *big.Int) (*types.Transaction, error) {
	return _StandardToken.Contract.DecreaseApproval(&_StandardToken.TransactOpts, _spender, _subtractedValue)
}

// DecreaseApproval is a paid mutator transaction binding the contract method 0x66188463.
//
// Solidity: function decreaseApproval(_spender address, _subtractedValue uint256) returns(bool)
func (_StandardToken *StandardTokenTransactorSession) DecreaseApproval(_spender common.Address, _subtractedValue *big.Int) (*types.Transaction, error) {
	return _StandardToken.Contract.DecreaseApproval(&_StandardToken.TransactOpts, _spender, _subtractedValue)
}

// IncreaseApproval is a paid mutator transaction binding the contract method 0xd73dd623.
//
// Solidity: function increaseApproval(_spender address, _addedValue uint256) returns(bool)
func (_StandardToken *StandardTokenTransactor) IncreaseApproval(opts *bind.TransactOpts, _spender common.Address, _addedValue *big.Int) (*types.Transaction, error) {
	return _StandardToken.contract.Transact(opts, "increaseApproval", _spender, _addedValue)
}

// IncreaseApproval is a paid mutator transaction binding the contract method 0xd73dd623.
//
// Solidity: function increaseApproval(_spender address, _addedValue uint256) returns(bool)
func (_StandardToken *StandardTokenSession) IncreaseApproval(_spender common.Address, _addedValue *big.Int) (*types.Transaction, error) {
	return _StandardToken.Contract.IncreaseApproval(&_StandardToken.TransactOpts, _spender, _addedValue)
}

// IncreaseApproval is a paid mutator transaction binding the contract method 0xd73dd623.
//
// Solidity: function increaseApproval(_spender address, _addedValue uint256) returns(bool)
func (_StandardToken *StandardTokenTransactorSession) IncreaseApproval(_spender common.Address, _addedValue *big.Int) (*types.Transaction, error) {
	return _StandardToken.Contract.IncreaseApproval(&_StandardToken.TransactOpts, _spender, _addedValue)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(_to address, _value uint256) returns(bool)
func (_StandardToken *StandardTokenTransactor) Transfer(opts *bind.TransactOpts, _to common.Address, _value *big.Int) (*types.Transaction, error) {
	return _StandardToken.contract.Transact(opts, "transfer", _to, _value)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(_to address, _value uint256) returns(bool)
func (_StandardToken *StandardTokenSession) Transfer(_to common.Address, _value *big.Int) (*types.Transaction, error) {
	return _StandardToken.Contract.Transfer(&_StandardToken.TransactOpts, _to, _value)
}

// Transfer is a paid mutator transaction binding the contract method 0xa9059cbb.
//
// Solidity: function transfer(_to address, _value uint256) returns(bool)
func (_StandardToken *StandardTokenTransactorSession) Transfer(_to common.Address, _value *big.Int) (*types.Transaction, error) {
	return _StandardToken.Contract.Transfer(&_StandardToken.TransactOpts, _to, _value)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(_from address, _to address, _value uint256) returns(bool)
func (_StandardToken *StandardTokenTransactor) TransferFrom(opts *bind.TransactOpts, _from common.Address, _to common.Address, _value *big.Int) (*types.Transaction, error) {
	return _StandardToken.contract.Transact(opts, "transferFrom", _from, _to, _value)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(_from address, _to address, _value uint256) returns(bool)
func (_StandardToken *StandardTokenSession) TransferFrom(_from common.Address, _to common.Address, _value *big.Int) (*types.Transaction, error) {
	return _StandardToken.Contract.TransferFrom(&_StandardToken.TransactOpts, _from, _to, _value)
}

// TransferFrom is a paid mutator transaction binding the contract method 0x23b872dd.
//
// Solidity: function transferFrom(_from address, _to address, _value uint256) returns(bool)
func (_StandardToken *StandardTokenTransactorSession) TransferFrom(_from common.Address, _to common.Address, _value *big.Int) (*types.Transaction, error) {
	return _StandardToken.Contract.TransferFrom(&_StandardToken.TransactOpts, _from, _to, _value)
}

// StandardTokenApprovalIterator is returned from FilterApproval and is used to iterate over the raw logs and unpacked data for Approval events raised by the StandardToken contract.
type StandardTokenApprovalIterator struct {
	Event *StandardTokenApproval // Event containing the contract specifics and raw log

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
func (it *StandardTokenApprovalIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(StandardTokenApproval)
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
		it.Event = new(StandardTokenApproval)
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
func (it *StandardTokenApprovalIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *StandardTokenApprovalIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// StandardTokenApproval represents a Approval event raised by the StandardToken contract.
type StandardTokenApproval struct {
	Owner   common.Address
	Spender common.Address
	Value   *big.Int
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterApproval is a free log retrieval operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: e Approval(owner indexed address, spender indexed address, value uint256)
func (_StandardToken *StandardTokenFilterer) FilterApproval(opts *bind.FilterOpts, owner []common.Address, spender []common.Address) (*StandardTokenApprovalIterator, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var spenderRule []interface{}
	for _, spenderItem := range spender {
		spenderRule = append(spenderRule, spenderItem)
	}

	logs, sub, err := _StandardToken.contract.FilterLogs(opts, "Approval", ownerRule, spenderRule)
	if err != nil {
		return nil, err
	}
	return &StandardTokenApprovalIterator{contract: _StandardToken.contract, event: "Approval", logs: logs, sub: sub}, nil
}

// WatchApproval is a free log subscription operation binding the contract event 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925.
//
// Solidity: e Approval(owner indexed address, spender indexed address, value uint256)
func (_StandardToken *StandardTokenFilterer) WatchApproval(opts *bind.WatchOpts, sink chan<- *StandardTokenApproval, owner []common.Address, spender []common.Address) (event.Subscription, error) {

	var ownerRule []interface{}
	for _, ownerItem := range owner {
		ownerRule = append(ownerRule, ownerItem)
	}
	var spenderRule []interface{}
	for _, spenderItem := range spender {
		spenderRule = append(spenderRule, spenderItem)
	}

	logs, sub, err := _StandardToken.contract.WatchLogs(opts, "Approval", ownerRule, spenderRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(StandardTokenApproval)
				if err := _StandardToken.contract.UnpackLog(event, "Approval", log); err != nil {
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

// StandardTokenTransferIterator is returned from FilterTransfer and is used to iterate over the raw logs and unpacked data for Transfer events raised by the StandardToken contract.
type StandardTokenTransferIterator struct {
	Event *StandardTokenTransfer // Event containing the contract specifics and raw log

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
func (it *StandardTokenTransferIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(StandardTokenTransfer)
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
		it.Event = new(StandardTokenTransfer)
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
func (it *StandardTokenTransferIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *StandardTokenTransferIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// StandardTokenTransfer represents a Transfer event raised by the StandardToken contract.
type StandardTokenTransfer struct {
	From  common.Address
	To    common.Address
	Value *big.Int
	Raw   types.Log // Blockchain specific contextual infos
}

// FilterTransfer is a free log retrieval operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: e Transfer(from indexed address, to indexed address, value uint256)
func (_StandardToken *StandardTokenFilterer) FilterTransfer(opts *bind.FilterOpts, from []common.Address, to []common.Address) (*StandardTokenTransferIterator, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _StandardToken.contract.FilterLogs(opts, "Transfer", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &StandardTokenTransferIterator{contract: _StandardToken.contract, event: "Transfer", logs: logs, sub: sub}, nil
}

// WatchTransfer is a free log subscription operation binding the contract event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef.
//
// Solidity: e Transfer(from indexed address, to indexed address, value uint256)
func (_StandardToken *StandardTokenFilterer) WatchTransfer(opts *bind.WatchOpts, sink chan<- *StandardTokenTransfer, from []common.Address, to []common.Address) (event.Subscription, error) {

	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _StandardToken.contract.WatchLogs(opts, "Transfer", fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(StandardTokenTransfer)
				if err := _StandardToken.contract.UnpackLog(event, "Transfer", log); err != nil {
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
