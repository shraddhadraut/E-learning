import React from "react";
import MetaDesc from "../../../ui/meta/MetaDesc";
const Contact = () => {
  return (
    <>
      <MetaDesc
        title="Contact"
        metadata={[
          { name: "description", content: "Contact Page Information" },
        ]}
      />
      <h1>Contact</h1>
    </>
  );
};

export default Contact;
