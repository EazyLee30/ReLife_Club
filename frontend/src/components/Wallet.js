import React, { useState } from 'react';
import './Wallet.css';

function Wallet() {
  const [balance, setBalance] = useState(1000); // 初始余额
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: '收入',
      amount: 200,
      description: '开设课程收入',
      timestamp: '2024-03-20 14:30',
      status: '已完成'
    },
    {
      id: 2,
      type: '支出',
      amount: 100,
      description: '购买课程：Docker入门',
      timestamp: '2024-03-19 10:15',
      status: '已完成'
    },
    {
      id: 3,
      type: '收入',
      amount: 50,
      description: '课程评价奖励',
      timestamp: '2024-03-18 16:45',
      status: '已完成'
    }
  ]);

  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferData, setTransferData] = useState({
    amount: '',
    recipient: '',
    description: ''
  });

  const handleTransfer = (e) => {
    e.preventDefault();
    if (transferData.amount > balance) {
      alert('余额不足');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type: '支出',
      amount: parseFloat(transferData.amount),
      description: `转账给 ${transferData.recipient}: ${transferData.description}`,
      timestamp: new Date().toLocaleString(),
      status: '已完成'
    };

    setTransactions([newTransaction, ...transactions]);
    setBalance(balance - parseFloat(transferData.amount));
    setShowTransferModal(false);
    setTransferData({ amount: '', recipient: '', description: '' });
  };

  const formatAmount = (amount) => {
    return amount.toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="wallet">
      <div className="wallet-header">
        <h2>我的钱包</h2>
        <div className="balance-card">
          <h3>瑞泰币余额</h3>
          <div className="balance-amount">{formatAmount(balance)}</div>
          <button 
            className="transfer-btn"
            onClick={() => setShowTransferModal(true)}
          >
            转账
          </button>
        </div>
      </div>

      {showTransferModal && (
        <div className="transfer-modal">
          <form onSubmit={handleTransfer}>
            <h3>转账</h3>
            <input
              type="number"
              placeholder="转账金额"
              value={transferData.amount}
              onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
              required
              min="0.01"
              step="0.01"
            />
            <input
              type="text"
              placeholder="收款人地址"
              value={transferData.recipient}
              onChange={(e) => setTransferData({ ...transferData, recipient: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="转账说明"
              value={transferData.description}
              onChange={(e) => setTransferData({ ...transferData, description: e.target.value })}
            />
            <div className="modal-buttons">
              <button type="submit">确认转账</button>
              <button type="button" onClick={() => setShowTransferModal(false)}>取消</button>
            </div>
          </form>
        </div>
      )}

      <div className="transactions">
        <h3>交易记录</h3>
        <div className="transactions-list">
          {transactions.map(transaction => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-info">
                <div className="transaction-header">
                  <span className={`transaction-type ${transaction.type}`}>
                    {transaction.type}
                  </span>
                  <span className="transaction-amount">
                    {transaction.type === '收入' ? '+' : '-'}
                    {formatAmount(transaction.amount)}
                  </span>
                </div>
                <p className="transaction-description">{transaction.description}</p>
                <div className="transaction-meta">
                  <span className="transaction-time">{transaction.timestamp}</span>
                  <span className={`transaction-status ${transaction.status}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wallet; 