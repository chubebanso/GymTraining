import "./Setting.css";
import { useState } from "react";
import { Select, Switch } from "antd";

const { Option } = Select;

const Setting = () => {
  const [language, setLanguage] = useState("English");
  const [duration, setDuration] = useState("30m");
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(false);
  const [switch3, setSwitch3] = useState(false);
  return (
    <div className="setting">
      <div className="setting-title">Setting</div>
      <div className="setting-list">
        <div className="setting-item">
          <div className="item-name">Language</div>
          <Select
            value={language}
            onChange={(value) => setLanguage(value)}
            placeholder="Select Language"
          >
            <Option value="English">English</Option>
            <Option value="Spanish">Spanish</Option>
            <Option value="French">French</Option>
          </Select>
        </div>
        <div className="setting-item">
          <div className="item-name">Notification</div>
          <div className="switch">
            <Switch
              checked={switch1}
              onChange={(checked) => setSwitch1(checked)}
            />
          </div>
        </div>
        <div className="setting-item">
          <div className="item-name">Reminder Timing</div>
          <Select
            value={duration}
            onChange={(value) => setDuration(value)}
            placeholder="Select Duration"
          >
            <Option value="15m">15m</Option>
            <Option value="30m">30m</Option>
            <Option value="1h">1h</Option>
          </Select>
        </div>
        <div className="setting-item">
          <div className="item-name">Light</div>
          <div className="switch">
            <Switch
              checked={switch2}
              onChange={(checked) => setSwitch2(checked)}
            />
          </div>
        </div>
        <div className="setting-item">
          Back up
          <div className="switch">
            <Switch
              checked={switch3}
              onChange={(checked) => setSwitch3(checked)}
            />
          </div>
        </div>
      </div>
      <div>
        <button className="connect-calendar">
          Connect with Google Calendar
        </button>
      </div>
    </div>
  );
};

export default Setting;
