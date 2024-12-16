import { Form, Input, Button, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ChangePass = () => {
  const onFinish = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      {/* Title */}
      <Title level={3} style={{ marginBottom: "20px" }}>
        Change password
      </Title>

      {/* Form */}
      <Form layout="vertical" onFinish={onFinish}>
        {/* Current Password */}
        <Form.Item
          name="currentPassword"
          rules={[
            { required: true, message: "Please enter your current password!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Current password"
          />
        </Form.Item>

        {/* New Password */}
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: "Please enter your new password!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="New password"
          />
        </Form.Item>

        {/* Re-enter New Password */}
        <Form.Item
          name="reenterPassword"
          rules={[
            { required: true, message: "Please re-enter your new password!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Re-enter new password"
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              backgroundColor: "black",
              borderColor: "black",
              color: "white",
              height: "40px",
              fontWeight: "bold",
            }}
          >
            Update Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePass;
