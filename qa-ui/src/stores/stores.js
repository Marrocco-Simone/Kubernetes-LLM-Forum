import { readable } from "svelte/store";

let user = localStorage.getItem("userUuid");

if (!user) {
  const randomUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  user = randomUUID();
  localStorage.setItem("userUuid", user);
}

export const userUuid = readable(user);
