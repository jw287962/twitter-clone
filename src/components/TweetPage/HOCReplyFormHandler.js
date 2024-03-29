import React, { useState } from "react";

const TweetHandlerWrapper = (OriginalComponent) => {
  // A REPLY FORM FOR REPLY TWEET

  const NewComponent = (prop) => {
    // const {
    //   toggleFormHidden,
    //   setToggleFormHidden,
    //   tweet,
    //   setReplyMiniText,
    //   replyMiniText,
    //   arrayReplyNum,
    // } = prop;
    const [userTweetText, setUserTweetText] = useState("");
    const [media, setMedia] = useState("");

    const toggleFileInput = (e) => {
      e.preventDefault();
      const fileInput = e.target.nextSibling;
      console.log("input", fileInput);
      fileInput.click();
    };

    const textAreaInput = (e) => {
      setUserTweetText(e.target.value);
    };
    const handleFileInput = (e) => {
      console.log("wrong");
      // e.preventDefault();
      // console.log(this.readFile(e.target.value))
      const reader = new FileReader();
      // console.log(e.target.files);
      reader.addEventListener("load", () => {
        // const holder = reader.result;
        const imgURL = URL.createObjectURL(e.target.files[0]);
        setMedia({
          file: e.target.files[0],
          name: e.target.files[0].name,
          load: imgURL,
        });
        // setMedia(reader.result);
      });
      console.log(e.target.files);

      reader.readAsDataURL(e.target.files[0]);
    };

    return (
      <OriginalComponent
        {...prop}
        media={media}
        toggleFileInput={toggleFileInput}
        userTweetText={userTweetText}
        setUserTweetText={setUserTweetText}
        setMedia={setMedia}
        textAreaInput={textAreaInput}
        handleFileInput={handleFileInput}
      />
    );
  };
  return NewComponent;
};

export default TweetHandlerWrapper;
