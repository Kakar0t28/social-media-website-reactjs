import { async } from "@firebase/util";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { string } from "yup";
import { db } from "../../config/firebase";
import { Post } from "./post";
import "bootstrap/dist/css/bootstrap.css";

export interface Post {
  id: string;
  userid: string;
  title: string;
  username: string;
  description: string;
}

export const Main = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {postsList?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};
