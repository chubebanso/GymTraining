import "./AddAccount.css";
import { useNavigate } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import ava_account from "../../../assets/ava_account.png";
import { useContext, useState } from "react";
import { Form, Input, Button, Select, message, Upload } from "antd";
import axios from "axios";
import { WorkoutContext } from "../../../context/WorkoutContext";
const { Option } = Select;

const AddAccount = () => {
  const { createUser } = useContext(WorkoutContext);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFileName, setImageFileName] = useState("");
  const navigate = useNavigate();

  const handleFileUpload = async (file) => {
    const accessToken = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("imageFile", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/upload?imageFile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const fileName = response.data; // Lấy tên file từ response
      setImageFileName(fileName);
      message.success("Upload ảnh thành công!");
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Upload ảnh thất bại!");
    }
  };

  // Hàm xử lý khi form được submit
  const onFinish = async (values) => {
    console.log("Form values:", values);
    // Giả lập gửi form (có thể gửi lên server ở đây)
    setIsSubmitting(true);
    await createUser(values);
    setIsSubmitting(false);
    navigate("../");
  };

  const handleBack = () => {
    navigate("../");
  };
  return (
    <div className="content-account">
      <div className="add-account-header">
        <LeftCircleOutlined className="back-icon" onClick={handleBack} />
        <div>Create Account</div>
      </div>
      <div className="add-account-form">
        <div className="add-account-ava">
          <span>Avatar</span>
          <img
            src={imageFileName ? `/avatars//${imageFileName}` : ava_account}
            alt="Uploaded"
          />
          <Upload
            beforeUpload={handleFileUpload}
            showUploadList={false}
            accept="image/*"
          >
            <Button className="upload-btn">Upload Photo</Button>
          </Upload>
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
              <Select placeholder="Chọn vai trò" enabled>
                <Option value="User">User</Option>
                <Option value="Admin">Admin</Option>
              </Select>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button type="default" onClick={handleBack}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                className="form-btn"
              >
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
