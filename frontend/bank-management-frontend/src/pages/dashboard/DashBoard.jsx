
import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import MoneyBagIllustration from "../../components/illustrations/MoneyBagIllustration";
import {
    DepositIcon,
    WithdrawIcon,
    TransferIcon,
    HistoryIcon
} from "../../components/illustrations/ActionIcons";
import { getAccountsByCustomer } from "../../services/accountService";

function Dashboard() {

    const firstName = localStorage.getItem("firstName") || "Customer";
    const customerId = localStorage.getItem("customerId");

    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadAccounts = async () => {

            if (!customerId) {
                setLoading(false);
                return;
            }

            try {

                const response = await getAccountsByCustomer(customerId);

                console.log("Dashboard Accounts:", response.data);

                const accountData = response.data?.data || [];

                setAccounts(accountData);

            } catch (error) {

                console.error("Failed to load accounts:", error);

            } finally {

                setLoading(false);

            }
        };

        loadAccounts();

    }, [customerId]);


    // Calculate total balance from all accounts
    const totalBalance = accounts.reduce(
        (total, account) =>
            total + Number(
                account.balance ??
                account.availableBalance ??
                0
            ),
        0
    );


    return (
        <MainLayout>

            <section className="welcome-banner">

                <div>

                    <span className="eyebrow">
                        PERSONAL BANKING
                    </span>

                    <h2>
                        Your money, your way.
                    </h2>

                    <p>
                        Manage accounts, move money and keep track of
                        every transaction from one secure place.
                    </p>

                    <div
                        className="welcome-badge"
                        style={{
                            marginTop: 16,
                            display: "inline-flex"
                        }}
                    >
                        <span>●</span>
                        Account protected
                    </div>

                </div>

                <div className="welcome-illustration">
                    <MoneyBagIllustration />
                </div>

            </section>


            <div className="page-heading">

                <div>

                    <span className="eyebrow">
                        OVERVIEW
                    </span>

                    <h2>
                        Good to see you, {firstName}
                    </h2>

                </div>

            </div>


            <div className="stats-grid">

                {/* Available Balance */}

                <div className="stat-card primary">

                    <div className="stat-top">

                        <span>
                            Available Balance
                        </span>

                        <span className="stat-icon">
                            ₹
                        </span>

                    </div>

                    <div className="stat-value">

                        {loading
                            ? "Loading..."
                            : `₹${totalBalance.toFixed(2)}`
                        }

                    </div>

                    <div className="stat-caption">
                        Across all active accounts
                    </div>

                </div>


                {/* Total Accounts */}

                <div className="stat-card">

                    <div className="stat-top">

                        <span>
                            Total Accounts
                        </span>

                        <span className="stat-icon">
                            ▣
                        </span>

                    </div>

                    <div className="stat-value">

                        {loading
                            ? "..."
                            : accounts.length
                        }

                    </div>

                    <div className="stat-caption">
                        Active bank accounts
                    </div>

                </div>


                {/* Transactions */}

                <div className="stat-card">

                    <div className="stat-top">

                        <span>
                            Transactions
                        </span>

                        <span className="stat-icon">
                            ↺
                        </span>

                    </div>

                    <div className="stat-value">
                        —
                    </div>

                    <div className="stat-caption">
                        Recent transactions
                    </div>

                </div>


                {/* Transfers */}

                <div className="stat-card">

                    <div className="stat-top">

                        <span>
                            Transfers
                        </span>

                        <span className="stat-icon">
                            ⇄
                        </span>

                    </div>

                    <div className="stat-value">
                        —
                    </div>

                    <div className="stat-caption">
                        Completed transfers
                    </div>

                </div>

            </div>


            <div className="dashboard-grid">

                <section className="panel">

                    <div className="panel-heading">

                        <div>

                            <span className="eyebrow">
                                QUICK ACTIONS
                            </span>

                            <h3>
                                What would you like to do?
                            </h3>

                        </div>

                    </div>


                    <div className="quick-actions">

                        <a
                            href="/deposit"
                            className="quick-action"
                        >
                            <DepositIcon />
                            <strong>Deposit</strong>
                            <small>Add money</small>
                        </a>


                        <a
                            href="/withdraw"
                            className="quick-action"
                        >
                            <WithdrawIcon />
                            <strong>Withdraw</strong>
                            <small>Take out money</small>
                        </a>


                        <a
                            href="/transfer"
                            className="quick-action"
                        >
                            <TransferIcon />
                            <strong>Transfer</strong>
                            <small>Send money</small>
                        </a>


                        <a
                            href="/history"
                            className="quick-action"
                        >
                            <HistoryIcon />
                            <strong>History</strong>
                            <small>View activity</small>
                        </a>

                    </div>

                </section>


                <section className="panel security-panel">

                    <span className="eyebrow">
                        SECURITY
                    </span>

                    <h3>
                        You're in a secure session
                    </h3>

                    <p>
                        JWT authentication and protected service endpoints
                        keep your banking activity private.
                    </p>

                    <div className="security-status">
                        <span>✓</span>
                        Secure connection active
                    </div>

                </section>

            </div>

        </MainLayout>
    );
}

export default Dashboard;

