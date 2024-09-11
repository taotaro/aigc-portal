import React, { useEffect, useState } from "react";

export default function InputField({
  inputLabel,
  inputName,
  inputValue,
  onInputChange,
  isSubmitted,
  inputOptions,
  inputType,
  isRequired,
  errorMessage,
}) {
  return (
    <>
      <label
        className="input-label"
        style={{ fontSize: "18px", width: "100%" }}
      >
        {inputLabel}
        {isRequired ? (
          <span className="input-required" style={{ color: "red" }}>
            *
          </span>
        ) : null}
      </label>
      {inputType === "select" ? (
        <>
          <select
            name={inputName}
            value={inputValue}
            onChange={onInputChange}
            required={isRequired}
            placeholder=""
            style={{
              borderRadius: "10px",
              height: "50px",
              width: "100%",
              gap: "16px",
              padding: "7px 26px 7px 20px",
              marginRight: "10px",
              border: "2px solid #d9d9d9",
            }}
          >
            {inputOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          {" "}
          <input
            type={inputType}
            value={inputValue || ""}
            name={inputName}
            required={isRequired}
            onChange={onInputChange}
            placeholder="請輸入"
            className="input-field"
            style={{
              borderRadius: "10px",
              height: "50px",
              width: "100%",
              gap: "16px",
              padding: "7px 26px 7px 20px",
              marginRight: "10px",
              border: "2px solid #d9d9d9",
            }}
          />
        </>
      )}

      {isRequired && isSubmitted && !inputValue && (
        <div className="input-required" style={{ color: "red" }}>
          {errorMessage}
        </div>
      )}
    </>
  );
}
