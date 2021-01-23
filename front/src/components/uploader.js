import React from "react";
import Amplify, { Storage } from "aws-amplify";
import awsmobile from "../aws-exports";

Amplify.configure(awsmobile);

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.fileInput = React.createRef();
  }

  onFileUpload = (event) => {
    event.preventDefault();
    const file = this.fileInput.current.files[0];
    console.log(this.fileInput.current.files[0].name);
    Storage.put(file.name, file, {
      level: "private",
      contentType: "application/gpx+xml",
    })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <form onSubmit={this.onFileUpload}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default Uploader;
