import "./AddAccount.css";
import { useNavigate } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import ava_account from "../../../assets/ava_account.png";
import { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
const { Option } = Select;

const AddAccount = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hàm xử lý khi form được submit
  const onFinish = (values) => {
    console.log("Form values:", values);
    // Giả lập gửi form (có thể gửi lên server ở đây)
    setIsSubmitting(true);

    // Giả lập gửi dữ liệu và thông báo thành công
    setTimeout(() => {
      message.success("Tạo tài khoản thành công!");
      form.resetFields(); // Reset form sau khi submit thành công
      setIsSubmitting(false);
    }, 1000);
  };
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("../");
  };
  return (
    <div className="content-account">
      <div className="add-account-header">
        <LeftCircleOutlined className="back-icon" onClick={handleBack} />
        <h2>Create Account</h2>
      </div>
      <div className="add-account-form">
        <div className="add-account-ava">
          <span>Avatar</span>
          <img src={ava_account} alt="avatar" />
        </div>
        <div className="add-account-input">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              role: "User", // Mặc định chọn "User" cho role
            }}
          >
            {/* Username */}
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Vui lòng nhập tên người dùng!" },
              ]}
            >
              <Input placeholder="Nhập tên người dùng" />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>

            {/* Email */}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>

            {/* Phone */}
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                { pattern: /^[0-9]+$/, message: "Số điện thoại không hợp lệ!" },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            {/* Role */}
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
              
            >
              <Select placeholder="Chọn vai trò" disabled>
                <Option value="User">User</Option>
                <Option value="Admin">Admin</Option>
              </Select>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button type="default" onClick={handleBack} >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={isSubmitting} className="form-btn">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;
