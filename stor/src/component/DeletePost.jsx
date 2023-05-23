import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductDataService from "../services/products";

export default function DeletePost() {
  const [sn, setSn] = useState("");
  const nav = useNavigate();

  const deleteProduct = (Snumber) => {
    ProductDataService.deleteProd(Snumber)
      .then((response) => {
        if (response.status === 200) {
          console.log("prod deleted");
        } else {
          console.error("Error updating product place: ", response.data.error);
        }
      })
      .catch((error) => {
        console.error("Error updating product place: ", error);
      });
  };
  return (
    <div className="background-simple">
      <div className="back-page">
        <h1>Delete a Product</h1>{" "}
        <input
          onChange={(e) => {
            setSn(e.target.value);
          }}
          type="text"
          placeholder="קוד המוצר"
        />
        <br />
        <button
          className="buttonHome"
          onClick={() => {
            deleteProduct(sn);
            nav("/products");
          }}
        >
          מחק מוצר
        </button>
      </div>
    </div>
  );
}
