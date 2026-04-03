import { FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  created_at: string;
}

interface Subscriber {
  id: number;
  email: string;
  subscribed_at: string;
}

const ADMIN_USERNAME = "veerashri";
const ADMIN_PASSWORD = "Vep@2023";
const CONTACT_STORAGE_KEY = "adminContacts";
const NEWSLETTER_STORAGE_KEY = "adminNewsletterSubscribers";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [activeTab, setActiveTab] = useState("contacts");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUsername = localStorage.getItem("adminUsername");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }

    const isLoggedIn = sessionStorage.getItem("adminLoggedIn") === "true";
    setLoggedIn(isLoggedIn);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("admin-logged-in", loggedIn);

    if (loggedIn) {
      loadContacts();
      loadNewsletter();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      if (location.pathname === "/admin" || location.pathname === "/admin/") {
        navigate("/admin/dashboard", { replace: true });
      }
    } else if (location.pathname.includes("/admin/dashboard")) {
      navigate("/admin", { replace: true });
    }
  }, [loggedIn, location.pathname, navigate]);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("adminLoggedIn", "true");
      if (rememberMe) {
        localStorage.setItem("adminUsername", username.trim());
      } else {
        localStorage.removeItem("adminUsername");
      }
      setError("");
      setLoggedIn(true);
      navigate("/admin/dashboard", { replace: true });
      return;
    }

    setError("Invalid username or password. Please try again.");
    setPassword("");
  };

  const logout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminUsername");
    setLoggedIn(false);
    setPassword("");
    setError("");
    navigate("/admin", { replace: true });
  };

  const loadContacts = useCallback(() => {
    try {
      const stored = localStorage.getItem(CONTACT_STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      setContacts(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.error("Error loading contacts:", err);
      setContacts([]);
    }
  }, []);

  const loadNewsletter = useCallback(() => {
    try {
      const stored = localStorage.getItem(NEWSLETTER_STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      setSubscribers(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.error("Error loading newsletter subscribers:", err);
      setSubscribers([]);
    }
  }, []);

  const handleDeleteContact = (id: number) => {
    const stored = localStorage.getItem(CONTACT_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    const updated = Array.isArray(parsed) ? parsed.filter((contact: Contact) => contact.id !== id) : [];
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(updated));
    setContacts(updated);
  };

  const handleDeleteSubscriber = (id: number) => {
    const stored = localStorage.getItem(NEWSLETTER_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    const updated = Array.isArray(parsed) ? parsed.filter((subscriber: Subscriber) => subscriber.id !== id) : [];
    localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(updated));
    setSubscribers(updated);
  };

  return (
    <main className="admin-page">
      <style>{`
        .admin-page {
          min-height: 100vh;
          padding: 20px;
          background: linear-gradient(135deg, #9c27b0, #673ab7);
          color: #111827;
        }

        .admin-page body.admin-logged-in {
          background: #f8f9fa;
        }

        .admin-page .page-container {
          max-width: 1140px;
          margin: 0 auto;
          width: 100%;
        }

        .admin-page .login-container,
        .admin-page .admin-content {
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          width: 100%;
          padding: 40px;
        }

        .admin-page .login-header {
          margin-bottom: 30px;
        }

        .admin-page .login-header-body {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          text-align: left;
        }

        .admin-page .login-header h1 {
          color: #9c27b0;
          font-weight: 700;
          margin-bottom: 10px;
          font-size: 2rem;
        }

        .admin-page .login-header p {
          color: #6b7280;
          font-size: 0.95rem;
        }

        .admin-page .login-icon-wrapper {
          width: 5rem;
          height: 5rem;
          flex-shrink: 0;
        }

        .admin-page .login-icon-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 1rem;
        }

        .admin-page .form-group {
          margin-bottom: 1.25rem;
        }

        .admin-page .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #374151;
        }

        .admin-page .form-control {
          width: 100%;
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 0.85rem 1rem;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s;
        }

        .admin-page .form-control:focus {
          border-color: #9c27b0;
          box-shadow: 0 0 0 0.2rem rgba(156, 39, 176, 0.25);
        }

        .admin-page .btn-login {
          width: 100%;
          border: none;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, #9c27b0, #673ab7);
          color: white;
          padding: 0.95rem 1rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.3s;
          cursor: pointer;
        }

        .admin-page .btn-login:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(156, 39, 176, 0.4);
        }

        .admin-page .login-error {
          display: ${error ? "block" : "none"};
          margin-bottom: 20px;
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }

        .admin-page .admin-header {
          background: linear-gradient(135deg, #9c27b0, #673ab7);
          color: white;
          padding: 30px;
          border-radius: 15px;
          margin-bottom: 30px;
        }

        .admin-page .admin-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin-bottom: 1.5rem;
        }

        .admin-page .stat-card,
        .admin-page .table-container,
        .admin-page .action-card {
          background: white;
          border-radius: 15px;
          padding: 1.5rem;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
        }

        .admin-page .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #9c27b0;
        }

        .admin-page .tab-list {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .admin-page .tab-button {
          padding: 0.75rem 1rem;
          border-radius: 9999px;
          border: 1px solid #d1d5db;
          background: #f8fafc;
          color: #475569;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .admin-page .tab-button.active {
          background: #9c27b0;
          color: white;
          border-color: #9c27b0;
        }

        .admin-page .table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .admin-page table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        .admin-page th,
        .admin-page td {
          text-align: left;
          padding: 0.95rem 0.9rem;
          border-bottom: 1px solid #e5e7eb;
          vertical-align: top;
        }

        .admin-page th {
          font-weight: 700;
          color: #374151;
          background: #f8fafc;
        }

        .admin-page .text-muted {
          color: #6b7280;
        }

        .admin-page .text-danger {
          color: #b91c1c;
        }

        .admin-page .top-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1rem;
        }

        .admin-page .btn-secondary {
          background: white;
          color: #374151;
          border: 1px solid #d1d5db;
          border-radius: 9999px;
          padding: 0.75rem 1rem;
          cursor: pointer;
        }

        .admin-page .btn-link {
          color: white;
          text-decoration: underline;
        }

        .admin-page .quick-actions {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        @media (max-width: 900px) {
          .admin-page .admin-grid,
          .admin-page .quick-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="page-container">
        {!loggedIn ? (
          <div className="login-container">
            <div className="login-header">
            <div className="login-header-body">
              <div className="login-icon-wrapper">
                <img
                  src="https://res.cloudinary.com/dmgrtwca6/image/upload/v1774794177/vep_logo_1_ndzjf1.jpg"
                  alt="Admin Login Icon"
                />
              </div>
              <div>
                <h1>Admin Login</h1>
                <p>Veerashri Event Planners</p>
              </div>
            </div>
          </div>

          <div className="login-error" role="alert">
              {error}
            </div>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  className="form-control"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>

              <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <label htmlFor="rememberMe" className="text-muted">
                  Remember me
                </label>
              </div>

              <button type="submit" className="btn-login">
                Login
              </button>
            </form>
          </div>
        ) : (
          <div className="admin-content">
            <div className="admin-header">
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem", alignItems: "center" }}>
                <div>
                  <h1 style={{ margin: 0, fontSize: "2rem" }}>Admin Panel</h1>
                  <p style={{ marginTop: "0.5rem", color: "#ffffff" }}>
                    Veerashri Event Planners - Database Management
                  </p>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <button type="button" className="btn-secondary" onClick={logout}>
                    Logout
                  </button>
                  <Link to="/" className="btn-secondary" style={{ color: "#111" }}>
                    Back to Website
                  </Link>
                </div>
              </div>
            </div>

            <div className="admin-grid">
              <div className="stat-card text-center">
                <div style={{ fontSize: "2rem", color: "#6d28d9", marginBottom: "0.75rem" }}>✉️</div>
                <div className="stat-number">{contacts.length}</div>
                <div className="text-muted">Contact Inquiries</div>
              </div>
              <div className="stat-card text-center">
                <div style={{ fontSize: "2rem", color: "#16a34a", marginBottom: "0.75rem" }}>👥</div>
                <div className="stat-number">{subscribers.length}</div>
                <div className="text-muted">Newsletter Subscribers</div>
              </div>
            </div>

            <div className="table-container">
              <div className="top-actions">
                <div>
                  <h4 style={{ margin: 0 }}>Dashboard</h4>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button type="button" className="btn-secondary" onClick={loadContacts}>
                    Refresh Contacts
                  </button>
                  <button type="button" className="btn-secondary" onClick={loadNewsletter}>
                    Refresh Subscribers
                  </button>
                </div>
              </div>

              <div className="tab-list">
                <button
                  type="button"
                  className={`tab-button ${activeTab === "contacts" ? "active" : ""}`}
                  onClick={() => setActiveTab("contacts")}
                >
                  Contacts
                </button>
                <button
                  type="button"
                  className={`tab-button ${activeTab === "newsletter" ? "active" : ""}`}
                  onClick={() => setActiveTab("newsletter")}
                >
                  Newsletter
                </button>
              </div>

              {activeTab === "contacts" && (
                <div>
                  <div className="top-actions">
                    <h4 style={{ margin: 0 }}>Contact Inquiries</h4>
                  </div>
                  <div className="table-wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Message</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.length === 0 ? (
                          <tr>
                            <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                              No contact inquiries yet.
                            </td>
                          </tr>
                        ) : (
                          contacts.map((contact, index) => (
                            <tr key={contact.id}>
                              <td>{index + 1}</td>
                              <td>{contact.name}</td>
                              <td>{contact.phone}</td>
                              <td>{contact.email}</td>
                              <td>{contact.message.slice(0, 60)}{contact.message.length > 60 ? "..." : ""}</td>
                              <td>{new Date(contact.created_at).toLocaleString()}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn-secondary"
                                  onClick={() => handleDeleteContact(contact.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "newsletter" && (
                <div>
                  <div className="top-actions">
                    <h4 style={{ margin: 0 }}>Newsletter Subscribers</h4>
                  </div>
                  <div className="table-wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Email</th>
                          <th>Subscribed Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscribers.length === 0 ? (
                          <tr>
                            <td colSpan={4} style={{ textAlign: "center", padding: "1rem" }}>
                              No subscribers yet.
                            </td>
                          </tr>
                        ) : (
                          subscribers.map((subscriber, index) => (
                            <tr key={subscriber.id}>
                              <td>{index + 1}</td>
                              <td>{subscriber.email}</td>
                              <td>{new Date(subscriber.subscribed_at).toLocaleString()}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn-secondary"
                                  onClick={() => handleDeleteSubscriber(subscriber.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 


export default Admin;
