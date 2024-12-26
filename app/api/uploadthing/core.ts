import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth as getAuth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = async () => {
  const auth = await getAuth();
  const { userId } = auth;

  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => await handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
  messageFile: f(["image", "pdf"])
    .middleware(async () => await handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
