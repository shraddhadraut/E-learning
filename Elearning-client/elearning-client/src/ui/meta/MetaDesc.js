

import React from "react";
import { Helmet } from "react-helmet";
const MetaDesc = ({ title, metadata }) => {
  return (
    <Helmet>
      {title && <title data-react-helmet="true">{title}</title>}
      {metadata &&
        Array.isArray(metadata) &&
        metadata.length > 0 &&
        metadata.map((data, i) => {
          return (
            <meta
              data-react-helmet="true"
              name={data.name}
              content={data.content}
            />
          );
        })}
    </Helmet>
  );
};

export default MetaDesc;
