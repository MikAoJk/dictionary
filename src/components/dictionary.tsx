'use client'
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

const Dictionary = () => {
    const [data, setData] = useState<Data>();
    const [searchWord, setSearchWord] = useState('');

    async function getMeaning() {
        try {
            const response = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
            );
            const data = await response.json();
            setData(data[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function playAudio() {
        if (data !== undefined && data.phonetics && data.phonetics[0] && data.phonetics[0].audio) {
            const audio = new Audio(data.phonetics[0].audio);
            audio.play();
        }
    }

    return (
        <div
            className="text-center p-[20px] rounded-[10px] [box-shadow:0_0_25px_0px_rgba(0,_0,_0,_0.1)] max-w-[500px]  mx-[auto] my-8 text-black">
            <h1 className="text-[35px] mb-[20px] text-[#007bff]">
                Dictionary App
            </h1>
            <label htmlFor="default-search"
                   className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 0 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search"
                       className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Search" required
                       onChange={(e) => {
                           setSearchWord(e.target.value);
                       }}
                       onKeyDown={
                           (event) => {
                               if (event.key == 'Enter')
                                   getMeaning();
                           }
                       }
                />
                <button type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => {
                            getMeaning();
                        }}
                >Search
                </button>
            </div>
            {data && (
                <div
                    className="text-left border-[3px] border-[solid] border-[#ccc] p-[20px] rounded-[10px] [box-shadow:0_0_10px_rgba(0,_0,_0,_0.2)] bg-[#fff] capitalize">
                    <h2>{data.word}</h2>
                    <button
                        onClick={() => {
                            playAudio();
                        }}
                    >
                        <FontAwesomeIcon icon={faVolumeUp} size="sm"/>
                    </button>
                    <div className="mt-[20px] w-full">
                        <table>
                            <tr>
                                <td>Parts of Speech:</td>
                                <td>{data.meanings[0].partOfSpeech}</td>
                            </tr>
                            <tr>
                                <td>Definition:</td>
                                <td>{data.meanings[0].definitions[0].definition}</td>
                            </tr>
                            <tr>
                                <td>Example:</td>
                                <td>{data.meanings[0].definitions[0].example}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );

};

type Data = {
    word: string
    phonetic: string
    phonetics: [Phonetic]
    meanings: [Meaning]
}
type Phonetic = {
    text: string
    audio: string
    sourceURL: string | null
}

type Meaning = {
    partOfSpeech: string
    definitions: [Definition]
}

type Definition = {
    definition: string
    synonyms: [string]
    example: string | null
}


export default Dictionary;