import { useState } from "react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { CiCalendar } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { CiStickyNote } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [img, setImg] = useState("");
  const [header, setHeader] = useState("Flower Arrangement");
  const [note, setNote] = useState("www.flowervendor.com");
  const [isprofile, setIsprofile] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [dropdown, setDropdown] = useState(false);

  const selectProfile = (item: { name: string; image: string }) => {
    setIsprofile(true);
    setName(item.name);
    setImg(item.image);
    setMessages([]);
  };

  const names = [
    {
      name: "Jane Doe",
      image: "src/assets/profile.png",
    },
    {
      name: "John Doe",
      image: "src/assets/profile.png",
    },
    {
      name: "Jamie Smith",
      image: "src/assets/profile.png",
    },
    {
      name: "Parishi B",
      image: "src/assets/profile.png",
    },
  ];

  const sendMessage = () => {
    if (msg.trim() !== "") {
      setMessages([...messages, msg]);
      setMsg("");
    }
  };

  const dropdownState = () => {
    setDropdown((prevState) => !prevState);
  };

  const deleteMessage = (index: number) => {
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      newMessages.splice(index, 1);
      return newMessages;
    });
  };

  const MarkDone = () => {
    toast.success("Event completed", {
      position: "top-right",
      autoClose: 2000, // Close the toast after 2 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className=" flex justify-center items-center text-center h-[535px] rounded-xl">
      <div className="w-[320px] h-[535px]">
        <div className="header flex text-red-600 mt-5">
          <div className="flex justify-between items-center w-full">
            <div className="">
              <IoCheckmarkDoneCircleOutline onClick={MarkDone} />
            </div>
            <div className="flex gap-4 ">
              <RiDeleteBin5Line />
              <RxCross2 />
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <input
            className="border border-gray-400 rounded-2xl text-[26px] text-red-600 font-bold p-1 text-center"
            onChange={(e) => setHeader(e.target.value)}
            value={header}
          />

          <div className="border border-gray-400 rounded-2xl text-[15px] font-semibold m-3 p-2 flex items-center">
            <CiCalendar className="text-gray-800 ml-2" />
            <span className="ml-2">Dec 5, 2024 at 8:00-10:00 AM</span>
          </div>

          <div className="flex gap-2 m-5">
            <CgProfile className="text-red-500 ml-5 mt-1" />
            <span className="text-gray-500 ml-2"> Assign to:</span>
            <div
              className="dropdown border rounded-2xl ml-2 "
              onClick={dropdownState}
            >
              {dropdown ? (
                <div className="absolute z-10 rounded-3xl">
                  {names.map((item, index) => (
                    <div
                      className="flex p-2 gap-5 bg-white"
                      key={index}
                      onClick={() => selectProfile(item)}
                    >
                      <img src={item.image} alt="" className="h-[20px] " />
                      <div className="text-sm">{item.name}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className=" border border-gray-400 rounded-2xl flex gap-4 p-1 ">
                  {name && img ? (
                    <div className="flex m-1">
                      <img
                        src={img}
                        alt="Profile"
                        className="h-[20px] w-[20px] rounded-full mr-2"
                      />
                      <div className="">{name}</div>
                    </div>
                  ) : (
                    <div className="flex text-xs">
                      Please select the assignee{" "}
                      <span>
                        <IoMdArrowDropdown />
                      </span>{" "}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <CiStickyNote className="text-red-500 ml-10" />
            <span className="text-gray-500 ml-2">Note:</span>
            <textarea
              className="border border-gray-500 rounded-2xl m-3 mt-1 text-center"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>

          <div className="border border-gray-400"></div>
        </div>
        <div className="">
          <h2 className="text-left text-gray-600 italic">Comments</h2>
          <div
            className="messages-container"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            {messages.map((message, index) => (
              <div key={index} className="items-center m-1 p-1">
                <div className="flex">
                  <img
                    src={img}
                    alt="Profile"
                    className="h-[20px] w-[20px] rounded-full mr-2"
                  />
                  <div className="text-green-600 mr-2 text-[10px]">{name}</div>
                </div>
                <div className="text-left text-gray-500 text-[13px] flex justify-between">
                  {message}
                  <RiDeleteBin5Line
                    className="text-red-500"
                    onClick={() => deleteMessage(index)}
                  />
                </div>
              </div>
            ))}
          </div>

          {isprofile ? (
            <>
              <div className="fixed bottom-5 p-3 bg-white">
                <div className="flex items-center gap-3">
                  <img
                    src={img}
                    alt="Profile"
                    className="h-[20px] w-[20px] rounded-full ml-2 gap-1"
                  />
                  <textarea
                    value={msg}
                    placeholder="Write comment"
                    onChange={(e) => setMsg(e.target.value)}
                    className="mr-2 border border-gray-400 rounded-2xl p-2 m-1"
                  />

                  <button onClick={sendMessage}>
                    <IoIosSend />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <> No comments </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
