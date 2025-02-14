import { useState, useCallback } from "react";

const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => console.error("Error enabling fullscreen", err));
    } else if (document.exitFullscreen) {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch((err) => console.error("Error exiting fullscreen", err));
    }
  }, []);

  return { isFullscreen, toggleFullscreen };
};

export default useFullscreen;
