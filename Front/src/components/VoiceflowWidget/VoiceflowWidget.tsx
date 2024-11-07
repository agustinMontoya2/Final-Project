"use client";

import { useEffect } from "react";

export default function VoiceflowWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    script.async = true;
    script.onload = () => {
      if (window.voiceflow && window.voiceflow.chat) {
          window.voiceflow.chat.load({
          verify: { projectID: '672114eb10df1f272c34aa90' },
          url: 'https://general-runtime.voiceflow.com/',
          versionID: 'production',
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
