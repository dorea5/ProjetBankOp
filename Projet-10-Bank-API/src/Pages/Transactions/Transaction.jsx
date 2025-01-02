import Footer from '../../Components/Footer';
import '../../Pages/Transactions/Transaction.css';
import argentbanklogo from '../../assets/img/argentBankLogo.webp';

function Transactions() {
  return (
    <div className="transaction-page">
      <header className="transaction-header">
        <img
          className="main-nav-logo-image"
          src={argentbanklogo}
          alt="Argent Bank Logo"
        />
        <div className="user-info">
          <span className="user-name">Tony</span>
          <button className="sign-out-button">Sign out</button>
        </div>
      </header>
      <main className="transaction-main">
        <section className="account-info">
          <h2>Argent Bank Checking (x8349)</h2>
          <p className="balance">$2,082.79</p>
          <p className="balance-description">Available Balance</p>
        </section>
        <section className="transactions">
          <h2 className="sr-only">Transactions</h2>
          <table className="transaction-table">
            <thead>
              <tr>
                <th>DATE</th>
                <th>DESCRIPTION</th>
                <th>AMOUNT</th>
                <th>BALANCE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>June 20th, 2020</td>
                <td>Golden Sun Bakery</td>
                <td>$5.00</td>
                <td>$2,082.79</td>
              </tr>
              <tr>
                <td>June 20th, 2020</td>
                <td>Golden Sun Bakery</td>
                <td>$10.00</td>
                <td>$2,087.79</td>
              </tr>
              <tr>
                <td>June 20th, 2020</td>
                <td>Golden Sun Bakery</td>
                <td>$20.00</td>
                <td>$2,097.79</td>
              </tr>
              <tr>
                <td>June 20th, 2020</td>
                <td>Golden Sun Bakery</td>
                <td>$30.00</td>
                <td>$2,117.79</td>
              </tr>
              <tr>
                <td>June 20th, 2020</td>
                <td>Golden Sun Bakery</td>
                <td>$40.00</td>
                <td>$2,167.79</td>
              </tr>
              <tr>
                <td>June 20th, 2020</td>
                <td>Golden Sun Bakery</td>
                <td>$50.00</td>
                <td>$2,187.79</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Transactions;
