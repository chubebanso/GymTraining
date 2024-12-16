import "./EditAccount.css";
import { useNavigate, useParams } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import ava_account from "../../../assets/ava_account.png";
import { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import axios from "axios";
import PropTypes from "prop-types";

const { Option } = Select;

const EditAccount = () => {
 // const { } = useContext(WorkoutContext);
  const id = parseInt(useParams().id);
  console.log(id);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [account, setAccount] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/users/getById/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        });
        //console.log("Account details:", response.data);
        setAccount(response.data.data);
        form.setFieldsValue({
          name: response.data.data.name,
          email: response.data.data.email,
          phone: response.data.data.phone,
          role: response.data.data.role.name,
        });
      } catch (error) {
        console.error("There was an error fetching the account details!", error);
      }
    };

    if (id) {
      fetchAccount();
    }
  }, [id, form]);

  const onFinish = async (values) => {
    setIsSubmitting(true);
    console.log("Form values:", values);
    const roleId = values.role === "Admin" ? 1 : 2;
    try {
      await axios.put(`http://localhost:8080/api/v1/users/update`, {
        id: id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: account.password, // Keep the existing password
        role: {
          id: roleId,
        },
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      message.success("Account updated successfully!");
      navigate("../");
    } catch (error) {
      console.error("There was an error updating the account!", error);
      message.error("Failed to update account!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("../");
  };

  return (
    <div className="content-account">
      <div className="add-account-header">
        <LeftCircleOutlined className="back-icon" onClick={handleBack} />
        <div>Edit Account</div>
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
              role: "User",
            }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter the name!" }]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter the email!" },
                { type: "email", message: "Invalid email!" },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true, message: "Please enter the phone number!" },
                { pattern: /^[0-9]+$/, message: "Invalid phone number!" },
              ]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Select placeholder="Select role">
                <Option value="User">User</Option>
                <Option value="Admin">Admin</Option>
              </Select>
            </Form.Item>

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

EditAccount.propTypes = {
  account: PropTypes.object,
};

export default EditAccount;
