import {FaReact} from "react-icons/fa";
import React from "react";

export default function Button({text}) {

    return (
        <div className="border-2 border-black text-black text-sm p-2 flex justify-center items-center hover:cursor-pointer">
            {text} <FaReact className="text-black ml-2"/>
        </div>
    )
}