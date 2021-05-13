import React, { useRef } from "react";
import FloatingInputBox from "../../shared/FloatingInputBox";
import { nanoid } from "nanoid";

export default function CustomField({ custom, setCustom }) {
  const keyArray = useRef([]);

  if (custom.length === 0) return null;
  return (
    <div>
      {custom.map((item, index) => {
        function handleNameChange(evt) {
          const value = evt.target.value;
          setCustom((prev) => {
            const custom = JSON.parse(JSON.stringify(prev));
            custom[index].name = value;
            return custom;
          });
        }

        function handleValueChange(evt) {
          const value = evt.target.value;
          setCustom((prev) => {
            const custom = JSON.parse(JSON.stringify(prev));
            custom[index].value = value;
            return custom;
          });
        }

        function handleDelete(evt) {
          evt.preventDefault();
          setCustom((prev) => {
            const custom = JSON.parse(JSON.stringify(prev));
            custom.splice(index, 1);
            return custom;
          });
        }

        if (!keyArray.current[index]) {
          keyArray.current[index] = nanoid();
        }

        return (
          <div key={keyArray.current[index]}>
            <div className="d-flex">
              <div className="flex-grow-1">
                <FloatingInputBox
                  value={item.name}
                  onChange={handleNameChange}
                  id={"customName" + index}
                  label={"自定义-域" + index}
                  required={true}
                />
              </div>
              <div className="mb-3 ms-3 d-flex">
                <button
                  className="btn btn-danger align-self-center"
                  onClick={handleDelete}
                >
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>
            <FloatingInputBox
              value={item.value}
              onChange={handleValueChange}
              id={"customValue" + index}
              label={"自定义-值" + index}
              required={true}
            />
          </div>
        );
      })}
    </div>
  );
}
