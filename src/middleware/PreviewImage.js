import { useTheme } from "@emotion/react";
import { useState } from "react";
import { tokens } from "../theme";

export default function PreviewImage({ file }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [preview, setPreview] = useState({});
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }

  return (
    <div>
      <img
        style={{
          width: "200px",
          marginTop: "10px",
          borderRadius: "8px",
          border: `2px solid ${colors.primary[1000]}`,
        }}
        loading="lazy"
        src={preview}
        alt=""
      />
    </div>
  );
}
