
import "./Contacts.css";

export default function Settings() {
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm">
          <label> Profile Picture</label>
          <div className="settingsPP">
            <img src="./profile.jpg" alt="profile" />
          </div>
          <label htmlFor="fileInput">
            <i className="settingsPPIcon fa-solid fa-circle-user"></i>
          </label>
          <input type="file" id="fileInput" style={{display: 'none'}} />
          <label >Username</label>
          <input type="text" placeholder="Alex" />
          <label >Email</label>
          <input type="email" placeholder="AlexeyKosov13@ya.ru" />
          <label >Password</label>
          <input type="password" />
          <button className="settingsSubmitButton">Update</button>
        </form>
      </div>
      
    </div>
  );
}
