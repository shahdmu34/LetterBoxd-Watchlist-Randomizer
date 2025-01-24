
import './App.css';
import { useState} from 'react';
import * as XLSX from 'xlsx';
import Sprite1 from "./assests/greensprite4.png"
import starIcon from "./assests/app icons-Photoroom.png"

function App() {
  //onchange
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  //submit
  const[excelData, setExcelData] = useState(null);
  const [randomMovie, setRandomMovie] = useState(null);
  const [fileName, setFileName] = useState("");
  

  const handleFile= (e) =>{
    let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
    let selectedFile = e.target.files[0];
    if(selectedFile){
      setFileName(selectedFile.name); // Set the file name
      if(selectedFile&&fileTypes.includes(selectedFile.type)){
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e) =>{
          setExcelFile(e.target.result);
        }  
      }else{
        setTypeError("Please uplad only Excel file type");
        setExcelFile(null);
      }
    }else{
      console.log('Please select your file');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Get raw rows as 2D array
  
      if (jsonData.length > 0) {
        const firstTwoColumns = jsonData.map(row => [row[1], row[2] , row[3]]); // Extract column 1 and column 2
        setExcelData(firstTwoColumns);
      }
    }
  };
  
  
  
  const handleRandomMovie = () => {
    if (excelData && excelData.length > 0) {
      const randomIndex = Math.floor(Math.random() * excelData.length);
      setRandomMovie(excelData[randomIndex]);
    }
  }
  return (
    <div className='flex flex-col justify-start items-center bg-custom-lightbg min-h-screen pt-6'>
      <div className='flex items-center jus'>
        <img src={starIcon} alt="leftIcon" className='w-16 h-16 mb-4 animate-spin-slow'></img>
        <header className='Title text-3xl mb-4 font-BreeSerif'> 
          LetterBoxd Movie Watchlist Randomizer
        </header>
        {/* get the font & pics to dec with screen size */}
        <img src={starIcon} alt="rightIcon" className='w-16 h-16 mb-4 animate-spin-slow'></img>


      </div>
      

  
      <div className='relative flex flex-col justify-start items-center bg-custom-lightingbg border border-black  rounded-lg max-w-[700px] h-[300px]   w-full '>
        <img src={Sprite1} className=' hidden sm:block absolute bottom-0 right-1 translate-x-1/2 translate-y-1/2 w-[200px] h-[200px]'/>
        <div className='flex flex-col items-center gap-4 w-full'>
          <p className='text-xl font-serif text-center mb-4 mt-4'>
            Upload watchlist file
          </p>
          <div className="flex items-center gap-4 mb-4  ">
            <form className="flex items-center " onSubmit={handleSubmit}>
            <div className="flex items-center gap-2">

            <input
                type="file"
                id="fileInput"
                className="hidden"
                required
                onChange={handleFile}
              />
              {/* Custom styled button */}
              <label
                htmlFor="fileInput"
                className="font-serif cursor-pointer bg-custom-brGreen/50 border border-black rounded-lg px-4 py-1 mr-5 text-black hover:bg-custom-brGreenHover transition"
              >
          Choose File
        </label>
              {fileName && <span className="text-sm font-serif">{fileName}</span>} 
          </div>
              <button type="submit" className="submitBtn font-serif  bg-custom-brGreen/50 hover:bg-custom-brGreen border transition-transform duration-300 transform hover:scale-105  border-black rounded-lg px-4 py-1 ml-4">
                Submit
              </button>
              {typeError && (
                <div className="alert" role="alert">
                  {typeError}
                </div>
              )}
            </form>
          </div>
          <button onClick={handleRandomMovie} className='font-serif text-sm mb-4 bg-custom-brGreen/50 hover:bg-custom-brGreen border border-black rounded-lg px-4 py-2 transition-transform duration-300 transform hover:scale-105 '>Get Random Movie</button>

        </div>
  
        <div className=''>
        {randomMovie && (
          <div className='  font-serif text-center mb-4 text-lg '>
             {randomMovie[0]} {randomMovie[1]} 
             <br></br>
            <button
              onClick={() => window.open(randomMovie[2], "_blank")}
              style={{ marginLeft: "10px" }} className='mt-4 font-serif text-sm mb-4  bg-custom-brGreen/50 hover:bg-custom-brGreen border border-black rounded-lg px-4 py-2 transition-transform duration-300 transform hover:scale-105  '
            >
              Visit URL
            </button>
          </div>
        )}
        </div>


      </div>
    </div>
  );
  
}

export default App;

