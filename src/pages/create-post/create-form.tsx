import { useForm } from "react-hook-form"; //npm isntall react-hook-form yup @hookform/resolvers
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must input a title."),
    description: yup.string().required("You must input a description."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postRef, {
      title: data.title,
      description: data.description,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <h1 className="text-black mb-4">Create Post</h1>

      <div className="form-group">
        <input placeholder="Title..." {...register("title")} />
        <p style={{ color: "red" }}>{errors.title?.message}</p>
      </div>
      <hr className="mx-n3" />
      <div className="form-group">
        <textarea placeholder="Description..." {...register("description")} />
        <p style={{ color: "red" }}>{errors.description?.message}</p>
      </div>

      <input type="submit" className="submitForm" />
    </form>
  );
};
