import React from 'react';
import FileBase64 from 'react-file-base64';
import './receive.css';

class Receive extends React.Component {

    constructor(props){
        super(props);
    
    
    this.state = { 
        confirm: "" ,
             files: "",
             Output: "",
            }
            this.Chandler = this.Chandler.bind(this);
        }
        

    async processSubmit(action){
        action.preventDefault();
    }

    async getFiles(files) {
        this.setState({
            files: files
    
                });
                const UID = Math.floor(Math.random() * (99999 - 9999 + 1)) + 9999;


                var data = {
                    fileExt: "png",
                    imageId: UID,
                    folder:UID,
                    img: this.state.files[0].base64
                }
            
                this.setState({confirm: "Receiving Image..."})
               await fetch('https://j8ksqpj0rl.execute-api.us-east-2.amazonaws.com/Production',
                    {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify(data)
                    });
                    
                    this.setState({confirm: "Extracting Text..."})
                    let targetImage  = UID + ".png";
                    const response = await fetch('https://4zd2019sk0.execute-api.us-east-1.amazonaws.com/Production/ocr',
                    {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify(targetImage)
                    });
                    this.setState({confirm: ""})
                    const text = await response.json();
                        this.setState({Output : text.body});
    }

     myFunction() {
  var copyText = document.getElementById("outy");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Copied to clipboard");
}

    Chandler(action){
        action.preventDefault();
        const target = action.target;
        const value = target.value;
        const name = target.name;

        this.setState({
              name:value,
        })
    }
    
    
    render() { 
        var processing = this.state.confirm; 
        return ( 
            <div className="row">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css"></link>
                <div className = "col-6 offset-3">
                    <form onSubmit= {this.processSubmit} >
                        
                            <h2 id = "progress" className="text-danger" >{ processing }</h2>
                            <center><h6 id = "upload-text">Upload Image</h6></center>
                            <h6 id = "text">PNG,JPG</h6>
                        <div id = "upload" className = "form-group files color">
                            <FileBase64 multiple={true} onDone={this.getFiles.bind(this)}></FileBase64>
                        </div>
                            <label>
                                <b><h6 id = "text2">OUTPUT</h6></b>
                            </label>
                            
                            <div className="field">
                    <div className="control">
                        <textarea id = "outy"
                        type= "name" name="output"
                        onChange = {this.Chandler}
                        required value = {this.state.Output} 
                        className="textarea is-large" placeholder="Large textarea"></textarea>
                      </div>
                    </div>
                    <button className= "copy" onClick={this.myFunction}>Copy</button>
                    </form>
                </div>
            </div>
         );
}
}
export default Receive;
