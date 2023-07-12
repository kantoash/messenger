// "use client";

// import { RootState } from "@/store";
// import { SET_VOICE_CALL } from "@/store/storeSlices";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { MdOutlineCallEnd } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";


// const VoiceCallModal = () => {
//   const [callAccepted, setCallAccepted] = useState(false);
//   const { VOICE_CALL } = useSelector(
//     (state: RootState) => state.counter
//   );
//   const dispatch = useDispatch();
//   const handleAcceptCall = () => {}
//   const handleEndCall = () => {
    
//   }

//   useEffect(() => {
//     if () {
      
//     }
//   }, [])
  

//   return (
//     VOICE_CALL && (
//       <div className="absolute h-full w-full overflow-hidden bg-white z-50 flex flex-col items-center gap-y-8 justify-center">
//         <div className="flex flex-col gap-5 items-center ">
//           <span className="text-5xl">{CALLED_USER?.name}</span>
//           <span className="text-lg">
//             {callAccepted ? "On going call" : "Calling"}
//           </span>
//         </div>
//         <Image
//           height={300}
//           width={300}
//           src={CALLED_USER?.image || "/images/placeholder.jpg"}
//           alt="Avatar"
//           className="rounded-full"
//         />
//         <div
//           onClick={handleEndCall}
//           className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full cursor-pointer text-white"
//         >
//           <MdOutlineCallEnd className="text-3xl" />
//         </div>
//       </div>
//     )
//   );
// };

// export default VoiceCallModal;
