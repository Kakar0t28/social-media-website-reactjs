import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Prev } from "react-bootstrap/esm/PageItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { string } from "yup";
import { auth, db } from "../../config/firebase";
import { Post as IPost } from "./main";

interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}
interface Heart {
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  //For Like Variable
  const [likes, setLikes] = useState<Like[] | null>(null);
  //For Heart Variable
  const [hearts, setHearts] = useState<Heart[] | null>(null);

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLike = async () => {
    const data = await getDocs(likesDoc);
    // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };
  //ADDING LIKES
  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  //REMOVING LIKES
  const removeLike = async () => {
    try {
      const unLikeQry = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const unLikeData = await getDocs(unLikeQry);
      const likeId = unLikeData.docs[0].id;
      const unLike = doc(db, "likes", likeId);
      await deleteDoc(unLike);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  //ADDING HEART REACT
  const addHeart = () => {};

  //REMOVING HEART REACT
  const removeHeart = () => {};

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
  const haseUserHeart = 0;

  useEffect(() => {
    getLike();
  }, []);

  return (
    <div>
      <div className="title">
        <h1> {post.title}</h1>
      </div>
      <div className="body">
        <p> {post.description}</p>
      </div>
      <div className="footer">
        <p>@{post.username}</p>
      </div>
      <button className="likebtn" onClick={hasUserLiked ? removeLike : addLike}>
        {hasUserLiked ? <>&#128078;</> : <>&#128077;</>} {likes?.length}
      </button>
      <button
        className="likebtn"
        onClick={haseUserHeart ? removeHeart : addHeart}
      >
        {<>&#128147;</>} {likes?.length}
      </button>

      {/* {likes && <p>Likes : {likes?.length}</p>} */}
    </div>
  );
};
