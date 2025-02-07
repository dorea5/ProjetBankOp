
import Footer from '../../Components/Footer';

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Transactions() {
  return (
    <div className="transaction-page">
      <header className="transaction-header">
        <div className="logo">
          <FontAwesomeIcon icon="university" size="2x" />
        </div>
        <div className="user-info">
          <span className="user-name">Ben_hg</span>
          <button className="sign-out-button">
            <FontAwesomeIcon icon="sign-out-alt" />
          </button>
        </div>
      </header>
      <main className="transaction-main">
        <section className="account-info">
          <h2>Argent Bank Checking (x3448)</h2>
          <p className="balance">$48,098.43</p>
          <p className="balance-description">Available balance</p>
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
                <td>27/02/20</td>
                <td>Golden Sun Bakery</td>
                <td>$8.00</td>
                <td>$298.00 <FontAwesomeIcon icon={faPencilAlt} /></td>
              </tr>
              <tr>
                <td>27/02/20</td>
                <td>Golden Sun Bakery</td>
                <td>$8.00</td>
                <td>$298.00 <FontAwesomeIcon icon={faPencilAlt} /></td>
              </tr>
              <tr>
                <td>27/02/20</td>
                <td>Golden Sun Bakery</td>
                <td>$8.00</td>
                <td>$298.00 <FontAwesomeIcon icon={faPencilAlt} /></td>
              </tr>
              <tr>
                <td>27/02/20</td>
                <td>Golden Sun Bakery</td>
                <td>$8.00</td>
                <td>$298.00 <FontAwesomeIcon icon={faPencilAlt} /></td>
              </tr>
              <tr>
                <td>27/02/20</td>
                <td>Golden Sun Bakery</td>
                <td>$8.00</td>
                <td>$298.00 <FontAwesomeIcon icon={faPencilAlt} /></td>
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