import { Presentation, Slide, Image, render } from "react-pptx";
import React from "react";

const PPTX = (files) => (
  <Presentation>
    {files.map((file, index) => (
      <Slide key={index}>
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
    ))}
  </Presentation>
);

export default async (files: any[]) => {
  return render(PPTX(files)).then((buffer: any) => {
    return buffer;
  });
};
