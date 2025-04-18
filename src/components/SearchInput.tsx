import React, { useState, useEffect } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  suggestions?: (string | undefined)[];
  onSuggestionClick?: (suggestion: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  label,
  suggestions = [],
  onSuggestionClick,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Reset showSuggestions when value changes
  useEffect(() => {
    setShowSuggestions(!!value && suggestions.length > 0);
  }, [value, suggestions]);

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionClick?.(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div style={{ position: "relative" }}>
      {label && (
        <label
          htmlFor="search-input"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "500",
            color: "#495057",
          }}
        >
          {label}
        </label>
      )}
      <input
        id="search-input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          borderRadius: "6px",
          border: "1px solid #ced4da",
          fontSize: "1rem",
          transition:
            "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
          outline: "none",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#80bdff";
          e.target.style.boxShadow = "0 0 0 0.2rem rgba(0, 123, 255, 0.25)";
          setShowSuggestions(!!value && suggestions.length > 0);
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#ced4da";
          e.target.style.boxShadow = "none";
          // Use setTimeout to allow click events on suggestions to fire first
          setTimeout(() => setShowSuggestions(false), 200);
        }}
      />
      {showSuggestions && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            maxHeight: "250px",
            overflowY: "auto",
            backgroundColor: "white",
            border: "1px solid #ced4da",
            borderRadius: "0 0 6px 6px",
            zIndex: 1000,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginTop: "2px",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion}-${index}`}
              onClick={() => handleSuggestionClick(suggestion || "")}
              style={{
                padding: "0.75rem 1rem",
                cursor: "pointer",
                borderBottom: "1px solid #f1f1f1",
                transition: "background-color 0.15s ease-in-out",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#f8f9fa";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
