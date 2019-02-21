import React from "react";

const Icon = ({ name, onClick }) => {
   return (
      <span onClick={onClick}>
         <ion-icon name={name} />
      </span>
   );
};

export default Icon;
