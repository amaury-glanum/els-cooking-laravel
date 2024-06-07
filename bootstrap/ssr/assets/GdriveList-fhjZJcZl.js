import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import axios from "axios";
function GdriveList() {
  const [folders, setFolders] = useState([]);
  useEffect(() => {
    axios.get(route("gdrive.list")).then((response) => {
      console.log(response);
      setFolders(response.data);
    }).catch((error) => {
      console.error("There was an error fetching the data!", error);
    });
  }, []);
  console.log("folders", folders);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Google Drive Folders" }),
    /* @__PURE__ */ jsx("ul", { children: folders == null ? void 0 : folders.map((folder) => /* @__PURE__ */ jsx("li", { children: folder.name }, folder.id)) })
  ] });
}
export {
  GdriveList as default
};
