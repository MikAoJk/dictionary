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
        <div className="text-center p-[20px] rounded-[10px] [box-shadow:0_0_25px_0px_rgba(0,_0,_0,_0.1)] max-w-[700px] bg-[white] mx-[auto] my-8 text-black">
            <h1 className="text-[35px] mb-[20px] text-[#007bff]">
                Dictionary App
            </h1>
            <div className="flex justify-center items-center mb-[20px]">
                <input
                    className="border-2 "
                    type="text"
                    placeholder="Search..."
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
                <button
                    onClick={() => {
                        getMeaning();
                    }}
                >
                    <FontAwesomeIcon icon={faSearch} size="lg" className="ml-2"/>
                </button>
            </div>
            {data && (
                <div className="text-left border-[3px] border-[solid] border-[#ccc] p-[20px] rounded-[10px] [box-shadow:0_0_10px_rgba(0,_0,_0,_0.2)] bg-[#fff] capitalize">
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