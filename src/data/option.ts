// import GreatBritainSVG from "@assets/images/GreatBritainSVG.svg";
// import VietNamSVG from "@/assets/images/VietNamSVG.svg";
// import React from "react";

export const dataRole: Option[] = [
  {
    value: "Department Admin",
    label: "Department Admin"
  },
  {
    value: "Department Head",
    label: "Department Head"
  },
  {
    value: "Line Manager",
    label: "Line Manager"
  },
  {
    value: "HRBP",
    label: "HRBP"
  }
];

export const statusOptions: Option[] = [
  {
    value: "1",
    label: "Active"
  },
  {
    value: "0",
    label: "Inactive"
  }
];

export const validityOptions: Option[] = [
  {
    value: "true",
    label: "Valid"
  },
  {
    value: "false",
    label: "Invalid"
  }
];

export const privacyOptions: Option[] = [
  {
    value: "PUBLIC",
    label: "Public"
  },
  {
    value: "PRIVATED",
    label: "Private"
  }
];

export const checkinModeOptions: Option[] = [
  {
    value: "faceid",
    label: "Face ID"
  },
  {
    value: "qrcode",
    label: "QR Code"
  },
  {
    value: "pincode",
    label: "PIN Code"
  }
];

export const sourceTypeOptions: Option[] = [
  {
    value: "following",
    label: "Following List"
  },
  {
    value: "api",
    label: "According to API"
  }
];

export const authorTypeOptions: Option[] = [
  {
    value: "everyone",
    label: "Everyone"
  },
  {
    value: "follow",
    label: "Following List"
  },
  {
    value: "except",
    label: "Except Following List"
  }
];

export const userTypeOptions: Option[] = [
  {
    value: "employee",
    label: "Employee"
  },
  {
    value: "guest",
    label: "Guest"
  }
];

export const resultOptions: Option[] = [
  {
    value: "1",
    label: "Success"
  },
  {
    value: "0",
    label: "Failed"
  }
];

// export const dataLanguage = [
//   {
//     value: 'en',
//     label: (
//       <span>
//       <img
//           src= { GreatBritainSVG }
//           style={{ width: '25px', marginRight: '5px' }}
// />{' '}
// EN
//   < /span>
//     )
//   },
// {
//   value: 'vi',
//     label: (
//       <span>
//       <img src= { VietNamSVG } style = {{ width: '25px', marginRight: '5px' }
// } />{' '}
// VI
//   < /span>
//     )
//   }
// ];
