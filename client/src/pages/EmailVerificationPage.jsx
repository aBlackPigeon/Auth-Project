import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export const EmailVerificationPage = () =>{

    const [code,setCode] = useState(["","","","","",""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const isLoading = false;

    const {verifyEmail,error} = useAuthStore();

    const handleChange = (index,value) => {
        const newCode = [...code];
        
        //handle pasted content
        if(value.length > 1){
            const pastedCode = value.slice(0,6).split("");
            for(let i = 0; i<6;i++){
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            // focus on last non empty element

            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();

        }else{
            newCode[index] = value;
            setCode(newCode);

            // move focus to next input field if value is entered
            if(value && index < 5){
                inputRefs.current[index + 1].focus();
            }
        }
    }

    const handleKeyDown = (index,e) => {
        if(e.key  === "Backspace" && !code[index] && index > 0){
            inputRefs.current[index-1].focus();
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        try{
            await verifyEmail(verificationCode);
            navigate("/");
            toast.success("Email verified Successfully");
        }catch(error){
            console.log(error);
        }
    }

    // auto submit when all fields are filled

    useEffect(() => {
        if(code.every(digit => digit !== '')){
            handleSubmit(new Event('submit'));
        }
    },[code]);

    return (
        <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blue-xl rounded-2xl shadow-xl
        overflow-hidden"> 

        <motion.div initial = {{opacity: 0, y: -50}}
        animate={{opacity:1, y: 0}}
        transition={{duration : 0.5}}
        className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounder-2xl shadow-2xl p-8 w-full'>

        <h2 className='text-3xl font-bold mb-6 bg-gradient-to-r from-red-400 to-pink-500
        text-transparent bg-clip-text text-center' >
            Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">Enter the 6-digit(123456) code sent to your email address</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-between">
                {code.map((digit,index) => (
                    <input 
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="6"
                    value={digit}
                    onChange={(e)=>handleChange(index,e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index,e)}
                    className="w-12 h-12 text-center text-2xl font-bold bg-gray-700
                    text-white border-2 border-gray-500 rounded-lg focus:border-red-500
                    focus:outline-none"/>
                ))}
            </div>
            {error && <p className="text-red-500 font-semibold mt-2"></p>}
            <motion.button className="w-full py-3 px-4 bg-gradient-to-r from-red-500
                to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-red-600 
                hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                focus:ring-offset-gray-900 transition duration-200"
                whilehover={{scale: 1.02}}
                whiltetap={{sacle:0.98}}
                type='submit'>
                    {isLoading ? <Loader className='w-6 h-6 animate-spin text-center mx-auto' /> : "Verify"}
                </motion.button>

        </form>
        </motion.div>

        
            
        </div>
    )
}