import { PhotoIcon } from "@heroicons/react/24/outline";
import React, { ChangeEvent, useState } from "react";

export default function FileUploader({
  file,
  setFile,
}: {
  file: File | null;
  setFile: (file: File | null) => void;
}) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="">
      <div className="flex px-1 py-2 text-sm text-gray-400 border rounded-lg input-border">
        <PhotoIcon className="w-5 mr-1" />
        <label
          htmlFor="file-upload"
          className="relative font-medium truncate rounded-md cursor-pointer text-primary"
        >
          <span>{file?.name ?? "Upload a file"}</span>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
}
