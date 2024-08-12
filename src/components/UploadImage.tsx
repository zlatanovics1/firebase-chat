import { useState } from "react";
import { uploadImage } from "../services/StorageService";
import Button from "./Button";
import { toast } from "react-toastify";
import { getDownloadURL } from "firebase/storage";

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  function upload() {
    if (!file) return;
    const uploadTask = uploadImage(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      console.error,
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("File available at", url);
        });
        toast.success("Image uploaded successfully");
        setFile(null);
        setProgress(0);
      }
    );
  }
  return (
    <div className="flex items-center justify-center flex-col gap-10">
      <h1 className="text-xl font-bold">Upload Image</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <Button onClick={upload}>Upload</Button>
      {/* <progress value={progress} max="100" className="" /> */}
      <ProgressBar progress={progress} />
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-blue-500 h-4 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
