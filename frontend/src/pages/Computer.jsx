import React from "react";
import folderImage from "../assets/folder.jpg";
import Folder from "../component/Folder";
import File from "../component/File"; 
import Alex_Kim from "../assets/Alex_Kim.png"; 
import Aryan_Singh from "../assets/Aryan_Singh.png";
import Chloe_Anderson from "../assets/Chloe_Anderson.png";
import Cynthia_Adderley from "../assets/Cynthia_Adderley.png";
import David_Kline from "../assets/David_Kline.png";
import Elena_Weiss from "../assets/Elena_Weiss.png";
import Ethan_Brown from "../assets/Ethan_Brown.png";
import John_Smith from "../assets/John_Smith.png";
import Michelle_Hale from "../assets/Michelle_Hale.png"; 
import Ming_Tao_Chen from "../assets/Ming_Tao_Chen.png";
import "./Computer.css";

const Computer = () => {
 const myFiles = [
  {
    name: "Michelle_Hale_Dossier.pdf",
    content: (
      <div style={{ fontFamily: "Calibri, sans-serif", fontSize: "14px" }}>
        <div style={{ borderBottom: "2px solid #2b579a", marginBottom: "15px", display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ color: "#2b579a", margin: 0 }}>INTERNAL PERSONNEL FILE</h2>
          <span style={{ fontWeight: "bold", color: "red" }}>LEVEL 4 CLEARANCE REQUIRED</span>
        </div>
        <p><strong>Employee:</strong> Hale, Michelle | <strong>ID:</strong> 002</p>
        <p><strong>Position:</strong> Head of Information Security</p>
        <p><strong>Status:</strong> Under Internal Review</p>
        <hr />
        <h3>Professional Profile</h3>
        <p>Ms. Hale manages all security protocols for the central banking core. Colleagues describe her as highly controlled and hyper-rational. Recent performance reviews indicate a defensive attitude regarding system vulnerabilities.</p>
        <h3>Security Incident Notes</h3>
        <p style={{ fontStyle: "italic", color: "#444" }}>"Subject observed accessing server rack 4B outside of scheduled maintenance hours. Manual HVAC overrides were detected shortly after. Digital logs for the session were manually purged from the primary node."</p>
      </div>
    ),
  },
  {
    name: "Elena_Weiss_Audit.pdf",
    content: (
      <div style={{ fontFamily: "Calibri, sans-serif", fontSize: "14px" }}>
        <div style={{ borderBottom: "2px solid #2b579a", marginBottom: "15px" }}>
          <h2 style={{ color: "#2b579a", margin: 0 }}>FINANCE DEPARTMENT LOG</h2>
        </div>
        <p><strong>Employee:</strong> Weiss, Elena | <strong>ID:</strong> 003</p>
        <p><strong>Position:</strong> Senior Finance Manager / PSA Power User</p>
        <hr />
        <h3>Observation Summary</h3>
        <p>Highly competent but vocal regarding her resentment of the current bonus structure. Possesses "Emergency Admin" tokens for the SAP GRC module.</p>
        <h3>Discrepancy Report</h3>
        <p>Multiple unauthorized batch payments were routed through "Project X-12" under Weiss’s credentials. While the transactions suggest high-level embezzlement and fraud, there is no evidence linking her to the physical security breach or the subsequent server room incident.</p>
      </div>
    ),
  },
  {
    name: "Thomas_Reed_Statement.pdf",
    content: (
      <div style={{ fontFamily: "Calibri, sans-serif", fontSize: "14px" }}>
        <div style={{ borderBottom: "2px solid #2b579a", marginBottom: "15px" }}>
          <h2 style={{ color: "#2b579a", margin: 0 }}>EXTERNAL AUDIT TESTIMONY</h2>
        </div>
        <p><strong>Subject:</strong> Reed, Thomas | <strong>ID:</strong> 004</p>
        <p><strong>Position:</strong> External Audit Partner</p>
        <hr />
        <h3>Case Interview</h3>
        <p>Subject appeared visibly distressed during the deposition. Reed admitted to bypassing standard verification protocols on the night of the 12th.</p>
        <h3>Analysis</h3>
        <p>Evidence confirms Reed fell victim to a sophisticated spear-phishing campaign. He provided his VPN credentials to an external portal disguised as a "Urgent IT Security Update." His involvement appears negligent rather than malicious; however, the guilt-ridden nature of his testimony suggests he is hiding further contacts with Hale.</p>
      </div>
    ),
  },
  {
    name: "Alex_Kim_Onboarding.pdf",
    content: (
      <div style={{ fontFamily: "Calibri, sans-serif", fontSize: "14px" }}>
        <div style={{ borderBottom: "2px solid #2b579a", marginBottom: "15px" }}>
          <h2 style={{ color: "#2b579a", margin: 0 }}>HR PROFILE: JUNIOR ANALYST</h2>
        </div>
        <p><strong>Employee:</strong> Kim, Alex | <strong>ID:</strong> 008</p>
        <p><strong>Department:</strong> Financial Operations</p>
        <hr />
        <h3>Performance Review</h3>
        <p>A recent hire from the summer internship program. Kim is characterized by high honesty scores but low technical skepticism. </p>
        <h3>Incident Flag</h3>
        <p>Credentials were used to authorize a wire transfer at 02:00 AM. Forensic analysis suggests Kim’s private key was cloned. Subject claims to have reported a "sluggish system" to Michelle Hale days prior, but no ticket was found in the system.</p>
      </div>
    ),
  },
];


  return (
    <div className="Computer-container" style={{ padding: "20px" }}>
      <Folder
        folderImage={folderImage}
        folderName="Employee Information"
        files={myFiles}
      />

      <File 
        fileName="Employee_Logs.txt" 
        content={(
            <>
            <div className="Log-container">

            <div className="log-row">
                <img src={Ming_Tao_Chen} className="log-avatar" />
                <div>
                <p className="log-meta">02:14 AM — 2025-10-12</p>
                <p>
                    <strong>[ID: 001] Ming Tao Chen (CFO)</strong><br />
                    Log: SAP fraud verified. CFO private key used for unauthorized wire transfer at 02:00 AM. Called Michelle Hale — no response.
                </p>
                </div>
            </div>
            <hr />

            <div className="log-row">
                <img src={Michelle_Hale} className="log-avatar" />
                <div>
                <p className="log-meta">02:37 AM — 2025-10-12</p>
                <p>
                    <strong>[ID: 002] Michelle Hale (Head of IT Security)</strong><br />
                    Log: Performed routine maintenance on server room HVAC systems. Manual override tested. Security logs for server rack 4B cleared to "save disk space."
                </p>
                </div>
            </div>
            <hr />

            <div className="log-row">
                <img src={Elena_Weiss} className="log-avatar" />
                <div>
                <p className="log-meta">02:58 AM — 2025-10-12</p>
                <p>
                    <strong>[ID: 003] Elena Weiss (Finance Manager)</strong><br />
                    Log: Authorized batch payment for "Project X-12." Overrode standard two-factor authentication using emergency SAP Power User token. Transaction hidden in quarterly rounding.
                </p>
                </div>
            </div>
            <hr />

            <div className="log-row">
                <img src={David_Kline} className="log-avatar" />
                <div>
                <p className="log-meta">03:21 AM — 2025-10-12</p>
                <p>
                    <strong>[ID: 004] Thomas Reed (External Auditor)</strong><br />
                    Log: Finalized audit draft. Significant variance found in offshore accounts. Variance dismissed after private dinner with Head of IT Security. Signed off on compliance.
                </p>
                </div>
            </div>
            <hr />

            <div className="log-row">
                <img src={Aryan_Singh} className="log-avatar" />
                <div>
                <p className="log-meta">03:46 AM — 2025-10-12</p>
                <p>
                    <strong>[ID: 005] Aryan Singh (Junior Analyst)</strong><br />
                    Log: Received "Urgent IT Update" email. Entered corporate credentials as requested. System seems sluggish today. Feeling anxious about the upcoming audit deadline.
                </p>
                </div>
            </div>
            <hr />

            <div className="log-row">
                <img src={Cynthia_Adderley} className="log-avatar" />
                <div>
                <p className="log-meta">04:03 AM — 2025-10-12</p>
                <p>
                    <strong>[ID: 006] Cynthia Adderley (Head of IT Security)</strong><br />
                    Log: Deployed silent firewall patch. Access granted to remote VPN tunnel for "Anonymous Admin." Monitoring David Kline’s internal chat logs.
                </p>
                </div>
            </div>
            <hr />

            <div className="log-row">
                <img src={Chloe_Anderson} className="log-avatar" />
                <div>
                <p className="log-meta">04:29 AM — 2025-10-12</p>
                <p>
                    <strong>[ID: 007] Chloe Anderson (Finance Manager)</strong><br />
                    Log: Deleted draft spreadsheet titled "Off-book_Accounts.xlsx." Filed HR complaint against CFO. Resentment escalating.
                </p>
                </div>
            </div>
            <hr />

            <div className="log-row">
                <img src={Alex_Kim} className="log-avatar" />
                <div>
                <p className="log-meta">04:51 AM — 2025-10-12</p>
                <p>
                    <strong>[ID: 008] Alex Kim (Analyst)</strong><br />
                    Log: System access flagged 3 failed login attempts from external IP. Investigated SAP GRC module. Paranoid about credential leak. Sent urgent meeting request to Audit Partner.
                </p>
                </div>
            </div>
            <hr />

            <div className="log-row">
                <img src={Ethan_Brown} className="log-avatar" />
                <div>
                <p className="log-meta">05:12 AM — 2025-10-12</p>
                <p>
                    <strong>[ID: 009] Ethan Brown (Junior Analyst)</strong><br />
                    Log: Account locked due to security violation. Told by IT Security to go home and rest.
                </p>
                </div>
            </div>
            <hr />

            <div className="log-row">
                <img src={John_Smith} className="log-avatar" />
                <div>
                <p className="log-meta">05:44 AM — 2025-10-12</p>
                <p>
                    <strong>[ID: 010] John Smith (External Auditor)</strong><br />
                    Log: Received encrypted file regarding "Project X-12." Deleted without opening. Refuses further involvement.
                </p>
                </div>
            </div>

            </div>

             </>
           
        )}
        
      />
        {/* Password Protected File (Locked) */}
      <div className="second-file">
        <File 
        fileName="financial_info.docx" 
        password="004ysrm" 
        content={
            <div style={{ fontFamily: "serif", padding: "20px" }}>
                <h2>FINAL REPORT</h2>
                <hr />

                <p style={{ color: "darkred", fontWeight: "bold" }}>
                ⚠️ FICTIONAL DOCUMENT — FOR INTERNAL SIMULATION USE ONLY
                </p>

                <h3>Desjardins Group</h3>
                <p><strong>Document Type:</strong> Simulated Transaction Record</p>
                <p><strong>Generated:</strong> 2026-01-24 02:17 AM</p>

                <hr />

                <p><strong>Employee ID:</strong> 002</p>
                <p><strong>Authorization Level:</strong> Internal Finance Clearance</p>

                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}>
                <thead>
                    <tr>
                    <th style={{ borderBottom: "1px solid #000", textAlign: "left" }}>Transaction Type</th>
                    <th style={{ borderBottom: "1px solid #000", textAlign: "left" }}>Amount</th>
                    <th style={{ borderBottom: "1px solid #000", textAlign: "left" }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Wire Withdrawal</td>
                    <td>$1,527,001.00 CAD</td>
                    <td>Completed</td>
                    </tr>
                </tbody>
                </table>

                <p style={{ marginTop: "15px" }}>
                <strong>Notes:</strong><br />
                Transaction executed during off-hours. Authorization logs indicate use of elevated credentials.
                Audit trail partially redacted.
                </p>

                <hr />

                <p style={{ fontSize: "12px", opacity: 0.7 }}>
                This document is part of a fictional narrative and does not represent real banking data.
                </p>
            </div>
        } />
        
      </div>

            

    </div>

    
  );
};

export default Computer;