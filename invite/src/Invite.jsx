import { useState, useEffect } from "react";
import './invite.css'

const isEmailOnTeam = (email) => {
  // email of team members already on the team
  return email === "katy@example.com";
};

const sendInvitation = (email, role) => {
  console.log(`Inviting ${email} as ${role}`);
};

const Invite = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    //generates random link, i just put it there.....
    const randomLink = Math.random().toString(36).substr(2, 8);
    setLink(`https://example.com/invite/${randomLink}`);
  }, []);

  useEffect(() => {
    let timeout;
    if (error || success) {
      timeout = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [error, success]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleInvite = (e) => {
    e.preventDefault();
    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      setError("Please enter a valid email address");
      return;
    }
    if (isEmailOnTeam(email)) {
      setError(`${email} is already on your team!`);
      return;
    }
    sendInvitation(email, role);
    setSuccess(`Invite sent to ${email}!`);
    setEmail("");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000); // Reset copied state after 3 seconds
  };

  return (
    <div className="invite">
      <div className="inv-form" style={{ display: success ? 'none' : 'block' }}>
        <h1>Invite people to your team</h1>
        <div className="invite-section">
          <h2>Invite with Email</h2>
          <form onSubmit={handleInvite}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter an email address"
            />
            <select value={role} onChange={handleRoleChange}>
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
              <option value="Owner">Owner</option>
            </select>
            <button type="submit">
              <i className="fas fa-envelope"></i> Invite
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
        <div className="invite-section">
          <h2>Invite with Link</h2>
          <form>
            <input type="text" value={link} readOnly />
            <button className={copied ? "copy copied" : "copy"} onClick={handleCopyLink}>
              {copied ? (
                <>
                  <i className="fas fa-check-circle"></i> Copied
                </>
              ) : (
                <>
                  <i className="fas fa-link"></i> Copy Link
                </>
              )}
            </button>
          </form>
          <p>Anyone with access to this link can join your team.</p>
        </div>
      </div>

      {success && (
        <div className="success-message">
          <i className="fas fa-check-circle success-icon"></i>
          <p>Invite sent!</p>
        </div>
      )}
    </div>
  );
};

export default Invite;
