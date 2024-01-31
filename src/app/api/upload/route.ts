import { NextResponse, NextRequest } from "next/server";
import { google } from "googleapis";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "PLEASE LOGIN" });
  }
  const auth = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  });

  auth.setCredentials({
    access_token: session?.user?.accessToken,
  });
  const youtube = google.youtube({
    version: "v3",
    auth,
  });

  try {
    const res = await youtube.videos.insert({
      part: ["snippet", "status"],
      requestBody: {
        snippet: {
          title: "test",
          description: "test",
        },
        status: {
          privacyStatus: "private",
        },
      },
      media: {
        body: "./test.mp4",
        mimeType: "video/mp4",
      },
    });
    console.log("video uploaded", res.data);
  } catch (error) {
    console.log(error);
  }

  const body = await request.json();
  console.log(body);
  return NextResponse.json({ message: "Hello, Next.js!" });
}

//// upload code

// const handleUpload = async () => {
//     if (!session){
//       return
//     }
//     const auth = new google.auth.OAuth2({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     });

//     auth.setCredentials({
//       access_token: session?.data?.user?.accessToken,
//     });
//     const youtube = google.youtube({
//       version: "v3",
//       auth,
//     });

//     try {
//       const res = await youtube.videos.insert({
//         part: ["snippet","status"],
//         requestBody: {
//           snippet: {
//             title: "test",
//             description: "test",
//           },
//           status: {
//             privacyStatus: "private",
//           },
//         },
//         media: {
//           body: "./test.mp4",
//         }
//       })
//       console.log('video uploaded', res.data);

//     } catch (error) {
//       console.log(error);
//     }
//   }
