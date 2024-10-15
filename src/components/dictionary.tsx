'use client'
import {useState} from "react";

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
                    className="text-left border-[3px] border-[solid] border-[#ccc] p-[20px] rounded-[10px] [box-shadow:0_0_10px_rgba(0,_0,_0,_0.2)] text-white capitalize">
                    <h2>{data.word}</h2>
                    <button
                        onClick={() => {
                            playAudio();
                        }}
                    >
                        <svg className="w-[50px] h-[50px] fill-[#8e8e8e]" viewBox="0 0 640 512"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"></path>
                        </svg>
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
