import { Presentation, Slide, Image, render } from "react-pptx";
import React from "react";
import sizeOf from "image-size";

const PPTX = (files) => {
  if (!files) return null;
  return (
    <Presentation>
      {files.map((file, index) => {
        var img = Buffer.from(file.data.split(";base64,").pop(), "base64");
        var dimensions = sizeOf(img);
        return (
          <Slide key={index}>
            <Image
              src={{ kind: "data", data: file.data }}
              style={{
                x: "0%",
                y: "0%",
                w: 10,
                h: (10 * dimensions.height) / dimensions.width,
              }}
            ></Image>
          </Slide>
        );
      })}
    </Presentation>
  );
};

export default async (files: any[]) => {
  return render(PPTX(files)).then((buffer: any) => {
    return buffer;
  });
};
