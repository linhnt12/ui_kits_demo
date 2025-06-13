"use client";
import { Form, Input, DatePicker, Upload, Button, Card, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { useState } from "react";

const { TextArea } = Input;

export default function Profile() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      console.log("Form values:", values);
      message.success("Profile updated successfully!");
    } catch (error) {
      message.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const uploadProps: UploadProps = {
    name: "avatar",
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
      }
      return isImage && isLt2M;
    },
    onChange: (info) => {
      if (info.file.status === "done") {
        // Get the uploaded file URL
        const url = URL.createObjectURL(info.file.originFileObj as Blob);
        setAvatarUrl(url);
        message.success(`${info.file.name} uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} upload failed.`);
      }
    },
  };

  return (
    <div>
      <h1 style={{fontSize: 24, fontWeight: 600}}>Profile Settings</h1>

      <Card className="p-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "+1234567890",
            bio: "Software Developer",
          }}
        >
          <div className="flex items-centermb-6">
            <Upload {...uploadProps}>
              <div
                style={{
                  width: 96,
                  height: 128,
                  backgroundImage: `url(${avatarUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 8,
                  border: "1px solid #e0e0e0",
                  cursor: "pointer",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <PlusOutlined className="text-3xl text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Upload Photo</span>
                  </>
                )}
              </div>
            </Upload>
          </div>

          <div className="grid grid-cols-2" style={{ gap: 16, marginTop: 16 }}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2" style={{ gap: 16}}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item
            name="birthday"
            label="Birthday"
            rules={[
              { required: true, message: "Please select your birthday!" },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item name="bio" label="Bio">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
