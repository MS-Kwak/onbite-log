import { type Database } from "@/database.types";

export type PostEntity = Database["public"]["Tables"]["logPost"]["Row"];
export type ProfileEntity = Database["public"]["Tables"]["logProfile"]["Row"];

export type Post = PostEntity & { author: ProfileEntity };

export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};
