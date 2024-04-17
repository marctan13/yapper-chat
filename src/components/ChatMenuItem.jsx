// // import { auth } from "../contexts/AuthContext"
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { db } from "../firebase";
// import { doc, getDoc, onSnapshot } from "firebase/firestore";

// function ChatMenuItem({ selectedChannel, selectedChannelName }) {
//   const navigate = useNavigate();
//   const [members, setMembers] = useState([]);
//   const [channelImage, setChannelImage] = useState(null);
  
//   useEffect(() => {
//     const fetchChannelData = async () => {
//       try {
//         if (!selectedChannel) return;
//         const channelDocRef = doc(db, "channels", selectedChannel);
//         const unsubscribe = onSnapshot(
//           channelDocRef,
//           async (channelDocSnap) => {
//             const memberIds = channelDocSnap.data().members;

//             const memberProfiles = await Promise.all(
//               memberIds.map(async (memberId) => {
//                 const userDocRef = doc(db, "users", memberId);
//                 const userDocSnap = await getDoc(userDocRef);
//                 if (userDocSnap.exists()) {
//                   return userDocSnap.data();
//                 } else {
//                   console.error(
//                     `User document for ID ${memberId} does not exist`
//                   );
//                   return null;
//                 }
//               })
//             );
//             setMembers(memberProfiles.filter((profile) => profile !== null));
//             const imageUrl = channelDocSnap.data().image;
//             setChannelImage(imageUrl);
//           }
//         );
//         return () => {
//           unsubscribe();
//         };
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchChannelData();
//   }, [selectedChannel]);

//   return (
//     <div className="rightSection">
//       <div className="header">
//         <h1>Channel Details</h1>
//       </div>
//       <div className="chatWrapper">
//         <p onClick={() => navigate("/")}>&lt; Back</p>
//         <div className="editImage">
//           {channelImage && (
//             <img className="chatLogo" src={channelImage} alt="Channel Image" />
//           )}
//           {!channelImage && selectedChannelName && (
//             <img className="chatLogo" src="/cup.jpg" alt="Placeholder Image" />
//           )}
//           <h3>Change Channel Image</h3>
//         </div>
        
//       </div>
//     </div>
//   );
// }

// export default ChatMenuItem;
