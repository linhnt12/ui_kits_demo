"use client";
import { useState } from "react";
import { 
  Card, 
  Switch, 
  Button, 
  Modal, 
  Form, 
  Select, 
  Space, 
  Typography, 
  Divider,
  message,
  theme,
  ColorPicker
} from "antd";
import { 
  BulbOutlined, 
  FontSizeOutlined, 
  HighlightOutlined
} from "@ant-design/icons";
import { useTheme } from "@/app/context/ThemeContext";

const { Text } = Typography;
const { Option } = Select;

interface ThemeSettings {
  isDarkMode: boolean;
  primaryColor: string;
  fontSize: string;
  fontFamily: string;
}

export default function SettingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const { isDarkMode, setIsDarkMode, primaryColor, setPrimaryColor } = useTheme();

  const [settings, setSettings] = useState<ThemeSettings>({
    isDarkMode,
    primaryColor,
    fontSize: "medium",
    fontFamily: "system-ui",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      setSettings((prev) => ({
        ...prev,
        ...values,
      }));
      setPrimaryColor(values.primaryColor);
      message.success("Theme settings updated successfully!");
      setIsModalOpen(false);
    });
  };

  const handleThemeToggle = (checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      isDarkMode: checked,
    }));
    setIsDarkMode(checked);
    message.success(`Switched to ${checked ? "dark" : "light"} mode`);
  };

  return (
    <div>
      <h1 style={{fontSize: 24, fontWeight: 600}}>System Settings</h1>
      <Text type="secondary">Configure and customize your system preferences</Text>

      <div style={{ marginTop: "24px" }}>
        <Card>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {/* Theme Mode Toggle */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Space>
                <BulbOutlined style={{ fontSize: "20px", marginRight: 8 }} />
                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                  <Text strong>Dark Mode</Text>
                  <Text type="secondary">Switch between light and dark theme</Text>
                </div>
              </Space>
              <Switch
                checked={settings.isDarkMode}
                onChange={handleThemeToggle}
                checkedChildren="Dark"
                unCheckedChildren="Light"
              />
            </div>

            <Divider />

            {/* Primary Color */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Space>
                <HighlightOutlined style={{ fontSize: "20px", marginRight: 8 }} />
                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                  <Text strong>Primary Color</Text>
                  <Text type="secondary">Customize the main brand color</Text>
                </div>
              </Space>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "4px",
                    backgroundColor: settings.primaryColor,
                    border: "1px solid #d9d9d9",
                  }}
                />
                <Button type="primary" onClick={showModal}>
                  Change
                </Button>
              </div>
            </div>

            <Divider />

            {/* Font Settings */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Space>
                <FontSizeOutlined style={{ fontSize: "20px", marginRight: 8 }} />
                <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                  <Text strong>Font Settings</Text>
                  <Text type="secondary">Adjust font size and family</Text>
                </div>
              </Space>
              <Button type="primary" onClick={showModal}>
                Configure
              </Button>
            </div>
          </Space>
        </Card>
      </div>

      {/* Theme Settings Modal */}
      <Modal
        title="Customize Theme Settings"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save Changes"
        cancelText="Cancel"
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={settings}
        >
          <Form.Item
            name="primaryColor"
            label="Primary Color"
            rules={[{ required: true, message: "Please select a color" }]}
          >
            <ColorPicker
              defaultValue={settings.primaryColor}
              onChange={(color) => {
                form.setFieldValue('primaryColor', color.toHexString());
              }}
              presets={[
                {
                  label: 'Recommended',
                  colors: [
                    '#1677ff',
                    '#52c41a',
                    '#722ed1',
                    '#eb2f96',
                    '#fa8c16',
                  ],
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="fontSize"
            label="Font Size"
            rules={[{ required: true, message: "Please select a font size" }]}
          >
            <Select>
              <Option value="small">Small</Option>
              <Option value="medium">Medium</Option>
              <Option value="large">Large</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="fontFamily"
            label="Font Family"
            rules={[{ required: true, message: "Please select a font family" }]}
          >
            <Select>
              <Option value="system-ui">System UI</Option>
              <Option value="Arial">Arial</Option>
              <Option value="Roboto">Roboto</Option>
              <Option value="Open Sans">Open Sans</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}