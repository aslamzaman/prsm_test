import React from "react";

interface IBtn {
  Title: string;
  Click: (e: React.MouseEvent<HTMLButtonElement>) => void;
  Class: string;
}

export const BtnEn = ({ Title, Click, Class }:IBtn) => {
  return (
    <button onClick={Click} className={`text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 ${Class} cursor-pointer`}>{Title}</button>

  )
}

export const BtnEnSm = ({ Title, Click, Class }:IBtn) => {
  return (
    <button onClick={Click} className={`text-center mt-3 mx-0.5 px-4 py-2 text-sm font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 text-white ${Class}`}>{Title}</button>
  )
}

interface ISubmit {
  Title: string;
  Class: string;
}

export const BtnSubmit = ({ Title, Class }:ISubmit) => {
  return (
    <button type="submit" className={`text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 ${Class}`}>{Title}</button>
  )
}


//---------------------------------------------------------------------

interface IText {
  Title: string;
  Id: string;
  Change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Value: string;
  Chr: number;
}
export const TextEn = ({ Title, Id, Change, Value, Chr }:IText) => {
  return (
    <div className="w-full flex flex-col items-start">
      <label className='text-xs font-semibold mb-1 opacity-50' htmlFor={Id}>{Title}</label>
      <input onChange={Change} value={Value} type="text" id={Id} name={Id} required className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" maxLength={Chr} />
    </div>
  )
}

export const TextBn = ({ Title, Id, Change, Value, Chr }:IText) => {
  return (
    <div className="w-full flex flex-col items-start">
      <label className='text-xs font-semibold mb-1 opacity-50' htmlFor={Id}>{Title}</label>
      <input onChange={Change} value={Value} type="text" id={Id} name={Id} required maxLength={Chr} className="w-full px-4 py-1.5 font-sutonny-n text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
    </div>
  )
}

//----------------------------------------------------------------------------


export const TextEnDisabled = ({ Title, Id, Change, Value, Chr }:IText) => {
  return (
    <div className="w-full flex flex-col items-start">
      <label className='text-xs font-semibold mb-1 opacity-50' htmlFor={Id}>{Title}</label>
      <input onChange={Change} value={Value} type="text" id={Id} name={Id} required maxLength={Chr} disabled className="w-full px-4 py-1.5 text-gray-600 bg-gray-300 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
    </div>
  )
}

export const TextBnDisabled = ({ Title, Id, Change, Value, Chr }:IText) => {
  return (
    <div className="w-full flex flex-col items-start">
      <label className='text-xs font-semibold mb-1 opacity-50' htmlFor={Id}>{Title}</label>
      <input onChange={Change} value={Value} type="text" id={Id} name={Id} required maxLength={Chr} disabled className="w-full px-4 py-1.5 font-SutonnyMJ_Regular text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
    </div>
  )
}

//-------------------------------------------------------------------------------


export const TextPw = ({ Title, Id, Change, Value, Chr }:IText) => {
  return (
    <div className="w-full flex flex-col items-start">
      <label className='text-xs font-semibold mb-1 opacity-50' htmlFor={Id}>{Title}</label>
      <input onChange={Change} value={Value} type="password" id={Id} name={Id} required className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" maxLength={Chr} />
    </div>
  )
}


interface ITextMisc {
  Title: string;
  Id: string;
  Change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Value: string;
}
export const TextDt = ({ Title, Id, Change, Value }:ITextMisc) => {
  return (
    <div className="w-full flex flex-col items-start">
      <label className='text-xs font-semibold mb-1 opacity-50' htmlFor={Id}>{Title}</label>
      <input onChange={Change} value={Value} type="date" id={Id} name={Id} required className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
    </div>
  )
}


export const TextTm = ({ Title, Id, Change, Value }:ITextMisc) => {
  return (
    <div className="w-full flex flex-col items-start">
      <label className='text-xs font-semibold mb-1 opacity-50' htmlFor={Id}>{Title}</label>
      <input onChange={Change} value={Value} type="time" id={Id} name={Id} required className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
    </div>
  )
}


interface ITextNum {
  Title: string;
  Id: string;
  Change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Value: number;
}

export const TextNum = ({ Title, Id, Change, Value }:ITextNum) => {
  return (
    <div className="w-full flex flex-col items-start">
      <label className='text-xs font-semibold mb-1 opacity-50' htmlFor={Id}>{Title}</label>
      <input onChange={Change} value={Value} type="number" id={Id} name={Id} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" min="0" step="0.01" max="999999999999" required />
    </div>
  )
}


interface IFile {
  Title: string;
  Id: string;
  Change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Accept: string;
  Class: string;
}
export const TextFile = ({ Title, Id, Change, Accept, Class }:IFile) => {
  return (
    <div className="w-full flex flex-col items-start">
      <label className={`text-xs font-semibold mb-1 ${Class} opacity-50`} htmlFor={Id}>{Title}</label>
      <input onChange={Change} type="file" id={Id} name={Id} required className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" accept={Accept} />
    </div>
  )
}


//-----------------------------------------------------------------------------
interface ISelect {
  children:React.ReactNode;
  Title: string;
  Id: string;
  Change: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  Value: string;  
}
export const DropdownEn = ({ children, Title, Id, Change, Value }:ISelect) => {
  return (
    <div className="w-full flex flex-col items-start">
      <label className='text-xs font-semibold mb-1 opacity-50' htmlFor={Id}>{Title}</label>
      <select onChange={Change} value={Value} id={Id} name={Id} required className="w-full px-4 py-1.5  text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300">
        <option value="">---</option>
        {children}
      </select>
    </div>
  )
}


export const DropdownBn = ({ children, Title, Id, Change, Value }:ISelect) => {
  return (
    <div className="w-full flex flex-col items-start">
      <label className='text-xs font-semibold mb-1 opacity-50' htmlFor={Id}>{Title}</label>
      <select onChange={Change} value={Value} id={Id} name={Id} required className="w-full px-4 py-1.5  font-sutonny-n text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300">
        {children}
      </select>
    </div>
  )
}

//----------------------------------------------------------------------------

interface ITextArea {
  Title: string;
  Id: string;
  Rows: number;
  Change: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  Value: string;  
}
export const TextareaEn = ({ Title, Id, Rows, Change, Value }:ITextArea) => {
  return (
    <div className="w-full flex flex-col items-start">
      <label className='text-xs font-semibold mb-1 opacity-50' htmlFor={Id}>{Title}</label>
      <textarea rows={Rows} id={Id} name={Id} onChange={Change} value={Value} maxLength={200} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
    </div>
  )
}


export const TextareaBn = ({ Title, Id, Rows, Change, Value }:ITextArea) => {
  return (
    <div className="w-full flex flex-col items-start">
      <label className='text-xs font-semibold mb-1 opacity-50' htmlFor={Id}>{Title}</label>
      <textarea rows={Rows} onChange={Change} value={Value} id={Id} name={Id} maxLength={400} className="w-full px-4 py-1.5 font-sutonny-n text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
    </div>
  )
}
