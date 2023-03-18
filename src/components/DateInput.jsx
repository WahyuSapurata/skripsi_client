// import React from "react";
// import { MobileDatePicker } from "@mui/lab";
// import { TextField } from "@mui/material";
// import { useFormikContext } from "formik";

// const DateInput = ({ name, label, ...rest }) => {
//     const { setFieldValue } = useFormikContext();

//     const handleDateChange = (date) => {
//         setFieldValue(name, date);
//     };

//     return (
//         <MobileDatePicker
//             disableToolbar
//             variant="inline"
//             format="MM/dd/yyyy"
//             margin="normal"
//             label={label}
//             name={name}
//             onChange={handleDateChange}
//             KeyboardButtonProps={{
//                 "aria-label": "change date",
//             }}
//             {...rest}
//             renderInput={(params) => (
//                 <TextField {...params} variant="standard" />
//             )}
//         />
//     );
// };

// export default DateInput;
