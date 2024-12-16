import "./Profile.css";
import ava_account from "../../../assets/ava_account.png";
import { Form, Input, Button, Row, Col, Avatar } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Form Values:", values);
  };

  const handleChangePassword = () => {
    navigate("/userinfo/changepass");
  };

  return (
    <div className="profile">
      <div className="profile-title">Profile</div>
      <div className="profile-ava">
        <div className="profile-ava-name">
          <img src={ava_account} alt="avatar" />
          <div className="user-info">
            <span>User</span>
            <span>theliems@gmail.com</span>
          </div>
        </div>
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
      <div className="profile-info">
        <Form
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <Row gutter={16}>
            {/* Full Name */}
            <Col span={12}>
              <Form.Item label="Full Name" name="fullName">
                <Input placeholder="Your First Name" />
              </Form.Item>
            </Col>
            {/* Nick Name */}
            <Col span={12}>
              <Form.Item label="Nick Name" name="nickName">
                <Input placeholder="Your Nick Name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            {/* Gender */}
            <Col span={12}>
              <Form.Item label="Gender" name="gender">
                <Input placeholder="Your Gender" />
              </Form.Item>
            </Col>
            {/* Weight */}
            <Col span={12}>
              <Form.Item label="Weight" name="weight">
                <Input placeholder="Your Weight" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            {/* Height */}
            <Col span={12}>
              <Form.Item label="Height" name="height">
                <Input placeholder="Your Height" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div style={{ opacity: 0, paddingBottom: "8px" }}>Button</div>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#00d07e", borderColor: "#00d07e" }}
              >
                Change password
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="profile-email">
        <Avatar className="email-icon" icon={<CheckCircleFilled />} />
        <div className="profile-email-info">
          <span>theliems@gmail.com</span>
          <span>1 month ago</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
