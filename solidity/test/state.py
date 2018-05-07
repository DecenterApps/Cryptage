from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
m.verbosity(3)

#And now make the contract account to analyze
user_account = m.create_account(balance=1000)

source_code = file('../StateManager.sol').read()
source_code = source_code.replace('import "./StateCodec.sol";', file('../StateCodec.sol').read())
source_code = source_code.replace('import "./MoveDecoder.sol";', file('../MoveDecoder.sol').read())
source_code = source_code.replace('import "./StateVerifierV2.sol";', file('../StateVerifierV2.sol').read())
source_code = source_code.replace('import "./StateCodec.sol";', '')
source_code = source_code.replace('import "./MoveDecoder.sol";', '')
bytecode = m.compile(source_code, 'StateManager')

# source_code = file('../StateManager.sol').read()
# state_manager_bytecode = m.compile(source_code)

#Initialize contract
# contract_account = m.create_contract(owner=user_account,
#                                      balance=0,
#                                      init=bytecode)
#
# m.transaction(  caller=user_account,
#                 address=contract_account,
#                 value=None,
#                 data=m.SByte(164),
#                 )
#
# #Up to here we get only ~30% coverage.
# #We need 2 transactions to fully explore the contract
# m.transaction(  caller=user_account,
#                 address=contract_account,
#                 value=None,
#                 data=m.SByte(164),
#                 )
#
# print "[+] There are %d reverted states now"% len(m.final_state_ids)
# print "[+] There are %d alive states now"% len(m.running_state_ids)
# for state_id in m.running_state_ids:
#   print m.report(state_id)
#
# print "[+] Global coverage: %x"% contract_account
# print m.coverage(contract_account)
