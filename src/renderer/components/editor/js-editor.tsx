import Editor, { useMonaco } from "@monaco-editor/react";
import gihubDarkTheme from "monaco-themes/themes/GitHub Dark.json";

import React, { useEffect } from "react";

export default function JsEditor() {
  const monaco = useMonaco();
  // 내가 사용할 모나코 인스턴스를 생성한다.

  useEffect(() => {
    if (!monaco) return;
    // 모나코 인스턴스가 null이면 early return을 해준다.

    monaco.editor.defineTheme("githubDark", gihubDarkTheme);
    // 내가 원하는 이름으로 테마를 define해준다.
    // 나는 'githubDark'라는 이름으로 monaco-themes에서 받아온 githubDark라는 테마를 define해 준 것이다.

    monaco.editor.setTheme("githubDark");
    // 내가 사용하는 모나코 에디터에 테마를 적용해준다.
  }, [monaco]);
  return <Editor height={"100%"} theme="githubDark" language={"javascript"} />;
}
