import { Presentation, Slide, Text, Shape, Image, render } from "react-pptx";
import React from "react";

const PPTX = (file) => (
  <Presentation>
    <Slide>
      <Image
        src={{ kind: "data", data: file.data }}
        style={{
          x: "0%",
          y: "0%",
          w: "100%",
          h: "100%",
        }}
      ></Image>
    </Slide>
  </Presentation>
);

export default async (file: any) => {
  return render(PPTX(file)).then((buffer: any) => {
    return buffer;
  });
};
