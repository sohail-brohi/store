"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  folder?: string;
}

export function ImageUpload({ images, onChange, folder }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    const uploaded: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        if (folder) formData.append("folder", folder);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const data = await res.json();
        uploaded.push(data.url);
      }

      onChange([...images, ...uploaded]);
      toast.success(`${uploaded.length} image(s) uploaded`);
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {images.map((url, i) => (
          <div key={url} className="relative h-24 w-24 overflow-hidden rounded-lg">
            <Image src={url} alt="" fill className="object-cover" />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white hover:bg-red-600"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-white/30 transition-colors hover:border-gold light:border-black/30">
          {uploading ? (
            <Loader2 size={20} className="animate-spin text-gold" />
          ) : (
            <>
              <Upload size={20} className="text-white/50 light:text-black/50" />
              <span className="mt-1 text-[10px] text-white/50 light:text-black/50">
                Upload
              </span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>
      <p className="text-xs text-white/40 light:text-black/40">
        Images are stored on Cloudinary
      </p>
    </div>
  );
}
