const TokenSwap = artifacts.require("TokenSwap");

contract("TokenSwap", accounts => {
  it("应当能正确锁定代币", async () => {
    const instance = await TokenSwap.deployed();
    // 查询初始余额
    const initialBalance = await instance.getBalance(accounts[0]);
    // 锁定 100 代币
    await instance.lockTokens(100, { from: accounts[0] });
    const finalBalance = await instance.getBalance(accounts[0]);
    assert.equal(
      finalBalance.toNumber(),
      initialBalance.toNumber() - 100,
      "锁定代币失败"
    );
  });
});
