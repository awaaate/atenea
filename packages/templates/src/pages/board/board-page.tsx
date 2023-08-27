"use client";
import {
  DefaultFrame,
  Editor,
  EditorSidebar,
  EditorTopbar,
} from "@shared/editor";
import { Avatar } from "@shared/ui";
import { useGlobalStore } from "../../stores/globalStore";

export const BoardPage = () => {
  const { setSidebar, sidebarTab, background, coverImage, setBackground } =
    useGlobalStore();
  return (
    <Editor>
      <div className="flex">
        <div className="h-full flex-1">
          <EditorTopbar
            toggleSidebar={() =>
              setSidebar(sidebarTab === "page" ? null : "page")
            }
          />
          <div
            className="h-full w-full flex flex-col p-8"
            style={{
              background: background,
            }}
          >
            <div className="bg-background-default rounded-default ">
              {coverImage && (
                <div className="p-4">
                  <div
                    className="bg-cover bg-center bg-fixed rounded-lg"
                    style={{
                      height: "200px",
                      backgroundImage: `url(${coverImage})`,
                    }}
                  ></div>
                </div>
              )}
              <div className=" center p-8 ">
                <input
                  className="bg-transparent shadow-0 border-0 text-5xl text-text focus:outline-none "
                  placeholder="My board"
                />
              </div>

              <div className="w-full px-8 flex items-center ">
                <Avatar name="User" size="sm" />
                <span className="text-sm text-text-weak ml-2">
                  Edited 23 hours ago
                </span>
              </div>
              <DefaultFrame />
            </div>
          </div>
        </div>
        <EditorSidebar
          sidebarTab={sidebarTab}
          setSidebar={setSidebar}
          background={background}
          setBackground={setBackground}
        />
      </div>
    </Editor>
  );
};
