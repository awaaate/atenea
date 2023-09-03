import { BackgroundPicker } from "./background-picker";
import { useState } from "react";

export default {
  title: "Components/Background Picker",
  component: BackgroundPicker,
};

export const DefaultStory = (args: any) => {
  const [background, setBackground] = useState("#B4D455");

  return (
    <div
      className="w-full preview flex h-[350px]  justify-center p-10 items-center rounded !bg-cover !bg-center transition-all"
      style={{ background, height: "350px" }}
    >
      <BackgroundPicker background={background} setBackground={setBackground} />
    </div>
  );
};
