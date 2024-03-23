import { useState , useCallback, useEffect, useRef} from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [isNumber, setNumber] = useState(false);
  const [isChar, setChar] = useState(false);
  const [password, setPassword] = useState("")

  const passwordGenrator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(isNumber) str += "0123456789"
    if(isChar) str += "!@#$%^&*?<>/-+_|~"

    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
      
    }
    //console.log(pass)
    setPassword(pass)
  }, [length, isNumber, isChar, setPassword])

  useEffect(() => {passwordGenrator()}, [length, isNumber, isChar, setPassword])
  
  const CoppyPassword = useRef(null);

  const CoppyPasswordToClipBoard = (()=>{
    CoppyPassword.current.select()
    window.navigator.clipboard.writeText(password)})

  return (
    <>
      <h1 className='text-4xl text-center text-white'>Password Genrator</h1>
      <div className='w-full max-w-lg mx-auto shadow-md text-white rounded-lg px-4 py-3 my-8 bg-gray-800'> 
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3 h-12 text-blue-900'
            placeholder={password}
            ref={CoppyPassword}
            readOnly
          />
          <button className='outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0'
          onClick={CoppyPasswordToClipBoard}
          >Coppy</button>
        </div>
        <div className='flex text-sm gap-x-2 h-8'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={30}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label className=''>Length: {length}</label>
          </div>
          
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={isNumber}
              onChange={() => {
                setNumber ((prev) => !prev)
              }}
            />
            <label> Use Number</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={isChar}
              onChange={() => {
                setChar ((prev) => !prev)
              }}
            />
            <label> Use Special Char</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
