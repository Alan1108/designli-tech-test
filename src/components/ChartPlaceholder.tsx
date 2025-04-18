import React from "react";

interface ChartPlaceholderProps {
  message?: string;
}

export const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({
  message = "Chart will be displayed here",
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px dashed #ced4da",
        borderRadius: "6px",
        color: "#6c757d",
        fontSize: "1.2rem",
      }}
    >
      {message}
    </div>
  );
};
