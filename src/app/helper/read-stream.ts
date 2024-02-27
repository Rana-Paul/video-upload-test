"use client";
import { Readable } from "stream";
export const creteStream = async (videoUrl: string) => {
  try {
    const response = await fetch(videoUrl);

    const stream = Readable.fromWeb(response.body as any);
    console.log(stream);
    return stream;
  } catch (error) {
    console.log("create stream error", error);
    return "error";
  }
};

