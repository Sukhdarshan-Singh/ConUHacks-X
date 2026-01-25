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
import Video_Logo from "../assets/Video_Logo.png"; 
import "./Computer.css";
import {Link} from 'react-router-dom'; 


const Computer = () => {
  const myFiles = [
    {
        name: "Michelle_Hale.dox",
        content: (
            <>
                <h2>Michelle Hale</h2>
                <p>Position: Head of IT Security</p>
                <p>Department: IT</p>
                <p>Personality: Controlled, defensive, rationalizing
Truth: Deleted logs, enabled access, triggered HVAC override</p>
            </>
        ),
    
    },
    {
        name: "Elena_Weiss.dox",
        content: (
            <>
                <h2>Elena Weiss</h2>
                <p>Position: Senior Finance Manager/PSA Power User</p>
                <p>Department: Finance</p>
                <p>Personality: Sharp, resentful, defensive
Truth: Committed fraud, didn’t kill anyone</p>
            </>
        ),
    },
    {
        name: "Thomas_Reed.dox",
        content: (
            <>
                <h2>Thomas Reed</h2>
                <p>Position: Audit Partner</p>
                <p>Department: ...</p>
                <p>Personality: Nervous, honest, guilt-ridden
Truth: Fell for phishing email</p>
            </>
        ),

    },
    {
        name: "Alex_Kim.dox",
        content: (
            <>
                <h2>Alex Kim</h2>
                <p>Position: Junior Financial Analyst</p>
                <p>Department: Tech</p>
                <p>Personality; Nervous, honest, guilt-ridden</p>
                <p>Fell for phishing email.</p>
            </>
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
                <img src={David_Kline}/>
                <p><strong>[ID: 001] David Kline (CFO)</strong><br />
                Log: System access flagged 3 failed login attempts from external IP. Investigated SAP GRC module. Paranoid about credential leak. Sent urgent meeting request to Audit Partner.</p>
                <hr/>
                <img src={Michelle_Hale}/>
                <p><strong>[ID: 002] Michelle Hale (Head of IT Security)</strong><br />
                Log: Performed routine maintenance on server room HVAC systems. Manual override tested. Security logs for server rack 4B cleared to "save disk space."</p>
                <hr/>
                <img src={Elena_Weiss}/>
                <p><strong>[ID: 003] Elena Weiss (Finance Manager)</strong><br />
                Log: Authorized batch payment for "Project X-12." Overrode standard two-factor authentication using emergency SAP Power User token. Transaction hidden in quarterly rounding.</p>
                <hr/>
                <img src={Ming_Tao_Chen}/>
                <p><strong>[ID: 004] Ming Tao Chen (External Auditor)</strong><br />
                Log: Finalized audit draft. Significant "variance" found in offshore accounts. Variance dismissed after private dinner with Head of IT Security. Signed off on compliance.</p>
                <hr/>
                <img src={Aryan_Singh}/>
                <p><strong>[ID: 005] Aryan Singh (Junior Analyst)</strong><br />
                Log: Received "Urgent IT Update" email. Entered corporate credentials as requested. System seems sluggish today. Feeling anxious about the upcoming audit deadline.</p>
                <hr/>
                <img src={Cynthia_Adderley}/>
                <p><strong>[ID: 006] Cynthia Adderley (Head of IT Security)</strong><br />
                Log: Deployed "silent" patch to the firewall. Access granted to remote VPN tunnel for 'Anonymous Admin.' Monitoring David Kline's internal chat logs for 'audit' keywords.</p>
                <hr/>
                <img src={Chloe_Anderson}/>
                <p><strong>[ID: 007] Chloe Anderson (Finance Manager)</strong><br />
                Log: Deleted draft spreadsheet titled "Off-book_Accounts.xlsx." Complained to HR about David Kline’s "intrusive" management style. Resentment building.</p>
                <hr/>
                <img src={Alex_Kim}/>
                <p><strong>[ID: 008] Alex Kim (CFO)</strong><br />
                Log: Verified SAP fraud. Credential compromise confirmed. CFO private key used for unauthorized wire transfer at 02:00 AM. Called Michelle Hale—no answer.</p>
                <hr/>
                <img src={Ethan_Brown}/>
                <p><strong>[ID: 009] Ethan Brown (Junior Analyst)</strong><br />
                Log: Attempted to log into SAP. Account locked due to "security violation." Reported to IT Security; Michelle Hale told me to go home and sleep it off.</p>
                <hr/>
                <img src={John_Smith}/>
                <p><strong>[ID: 010] John Smith (External Auditor)</strong><br />
                Log: Received encrypted file from an anonymous sender regarding "Project X-12." Deleted file without opening. I cannot be involved in this mess.</p>
            </div>
            
            </>
        )}
      />

      {
        <Link to="/chat">
            <button 
            type="button" 
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
                <img src={Video_Logo} alt="Video streaming application logo"/>
            </button>
        </Link>


      }

    </div>
  );
};

export default Computer;
