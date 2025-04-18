import React from "react";

interface ConnectionStatusProps {
  isConnected: boolean;
  label?: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  isConnected,
  label = "Socket Status",
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem",
        backgroundColor: isConnected ? "#e6f7e6" : "#fde8e8",
        borderRadius: "6px",
        border: `1px solid ${isConnected ? "#c3e6cb" : "#f5c6cb"}`,
      }}
    >
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: isConnected ? "#28a745" : "#dc3545",
        }}
      ></div>
      <p
        style={{
          margin: 0,
          color: isConnected ? "#155724" : "#721c24",
          fontWeight: "500",
        }}
      >
        {label}: {isConnected ? "Connected" : "Disconnected"}
      </p>
    </div>
  );
};
