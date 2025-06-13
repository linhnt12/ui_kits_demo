"use client";
import { ConfigProvider, theme } from "antd";
import { ThemeProvider, useTheme } from "@/app/context/ThemeContext";

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { isDarkMode, primaryColor } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: primaryColor,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <RootLayoutContent>{children}</RootLayoutContent>
    </ThemeProvider>
  );
} 