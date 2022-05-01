import { useEffect } from "react";

type Props = {
  handler: (event: KeyboardEvent) => void;
};

function useKeyDown({ handler }: Props) {
  useEffect(() => {
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [handler]);
}

export default useKeyDown;
