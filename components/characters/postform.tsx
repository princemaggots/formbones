import axios from 'axios'
import { useRef, useCallback, useState, useEffect } from 'react'
import * as React from 'react';
 import * as ReactDOM from 'react-dom';
 import {
   Formik,
   FormikHelpers,
   FormikProps,
   Form,
   Field,
   FieldProps,
 } from 'formik';
import Router from 'react-router';
import { Redirect } from 'react-router-dom';
import { useRouter } from 'next/router';
import * as Yup from 'yup'



 
 interface CharacterValues {
   id: number;
   characterName: string;
   fandom: string;
   description: string;
   biography: string;
   DOB: string;
   likes: string;
   dislikes: string;
   mbti: string;
   ennegram: string;
   moralAlignment: string;
   location: string;
 }

 const myInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
}; 
const FILE_SIZE = 3e+6;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png"
];
const CharacterSchema = Yup.object().shape({
  characterName: Yup.string()
    .max(255, 'Too Long!')
    .matches(/[A-Za-z\d-.]+/g , 'Cannot contain non-alphanumeric characters.')
    .required('Required'),
  fandom: Yup.string()
  .max(255, 'Too Long!')
  .matches(/[A-Za-z\d-.!]+/g , 'Is not in correct format')
  .required('Required'),
  description: Yup.string()
  .max(60000, 'Too long...')
  .matches(/[^<>]+/g , 'Cannot contain "<" or ">".')
  .required('Required'),
  DOB: Yup.string()
  .max(10, "Too long.")
  .matches(/[\d\\]+/g , 'Must only contain numbers and slashes.'),
  likes: Yup.string()
  .max(255, 'Too long.')
  .matches(/[^<>#@\[\]=\^]+/g , 'Cannot contain special characters except for puncuation.'),
  dislikes: Yup.string()
  .max(255, 'Too long.')
  .matches(/[^<>#@\[\]=\^]+/g , 'Cannot contain special characters except for puncuation.'),
  mbti: Yup.string()
  .min(4, 'MBTI must be 4 characters long.')
  .max(4, 'MBTI must be 4 characters long.')
  .matches(/(i|e)(n|s)(f|t)(p|j)/ , 'Must be in proper MBTI format.'),
  ennegram: Yup.string()
  .max(3, 'Must be in the ennegram format (ex: 7, 7w8)')
  .matches(/(\d[wW]\d)|\d/ , 'Must be in the ennegram format (ex: 7, 7w8)'),
  moralAlignment: Yup.string()
  .max(50, 'Too long.')
  .matches(/[A-Za-z!?,.]+/g , 'Cannot contain non-alphanumeric characters.'),
  biography: Yup.string()
  .max(60000, 'Too long...')
  .matches(/[^<>]+/g , 'Cannot contain "<" or ">".'),
});
 
const PostForm: React.FC<{
  initialValues: CharacterValues
}> = ({ initialValues }) => {
  const [toDir, setToDir] = useState(false)
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState()
  const [error, setError] = useState()


  const inputTitleRef = useRef()
  const inputFileRef = useRef()
  let title = ''
  if (typeof(initialValues) !== 'undefined') {
    title = initialValues.id ? <h1>Edit Character</h1> : <h1>New Character</h1>
  }
  const setInitialLocation = useEffect(() => {
    initialValues && setImageUrl(initialValues.location);
  }, [initialValues]);
  var extensionLists = {}; //Create an object for all extension lists
      extensionLists.image = ['jpg', 'gif', 'bmp', 'png'];
      const uploadFile = useCallback(() => {
        //setError();
        const fileInput = inputFileRef.current;
        const titleInput = inputTitleRef.current;
        const file = fileInput.files[0];
        const formData = new FormData();
        var blob = file; // See step 1 above
        var fileReader = new FileReader();
        fileReader.onloadend = function (e) {
          var arr = new Uint8Array(e.target.result).subarray(0, 4);
          var header = "";
          for (var i = 0; i < arr.length; i++) {
            header += arr[i].toString(16);
          }
          console.log(header);
          // Check the file signature against known types
          var type = "unknown";
          switch (header) {
            case "89504e47":
              type = "image/png";
              break;
            case "47494638":
              type = "image/gif";
              break;
            case "ffd8ffe0":
            case "ffd8ffe1":
            case "ffd8ffe2":
            case "ffd8ffe3":
            case "ffd8ffe8":
              type = "image/jpeg";
              break;
            default:
              type = "unknown"; // Or you can use the blob.type as fallback
              break;
          }
          if (type !== "unknown") {
            formData.append("file", file);
            formData.append("title", titleInput.value);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/api/directory/upload", true);
            xhr.addEventListener("loadend", ({ currentTarget }) => {
              const { status, response } = currentTarget;
              if (status === 200) {
                const { location } = JSON.parse(response);
                setImageUrl(location);
              } else {
                setError("Something went wrong");
              }
            });
            xhr.send(formData);
          } else {
            setError("Error, not image.");
          }
        };
       fileReader.readAsArrayBuffer(blob);
      }, [inputFileRef.current, inputTitleRef.current, setError]);

      const onFileChange = useCallback(
        ({ currentTarget }) => {
          setError("");
          if (currentTarget.files[0]) {
            inputTitleRef.current.value = currentTarget.files[0].name;
          }
        },
        [inputTitleRef.current, setError]
      );

   return (
    initialValues &&
     <div>
       {title}

       <Formik
          initialValues={ initialValues }
          validationSchema={CharacterSchema}    
          onSubmit={(
            values: CharacterValues,
            { setSubmitting }: FormikHelpers<CharacterValues>,
          ) => {
            axios.post("/api/directory/savecharacter", values).then(() => {
              router.push("/directory/allcharacters");
            });
          }}
        >

     {/* hi!!! remember to fix the css and edit the textarea to match. thanks 
     image, name, fandom, description, category (tags). additional has DOB, likes, dislikes, mbti, ennegram, moral alignment */}
          {({ errors, touched, values, setValues }) => {
            const setLocation = useEffect(() => {
              setValues({
                ...values,
                location: imageUrl,
              });
            }, [imageUrl]);
            return (
         <Form> 
         <Field type="hidden" id="id" name="id" />


          <label htmlFor="characterName">Name</label>
          <Field id="characterName" name="characterName" />
          {errors.characterName && touched.characterName ? (
             <div className="errors">{errors.characterName}</div>
           ) : null}

          <label htmlFor="Fandom">Fandom</label>
          <Field id="fandom" name="fandom" />
          {errors.fandom && touched.fandom? (
             <div className="errors">{errors.fandom}</div>
           ) : null}

          <label htmlFor="description">Description</label>
          <Field as="textarea" id="description" name="description" />
          {errors.description && touched.description? (
             <div className="errors desc-error">{errors.description}</div>
           ) : null}
          
          <h1>Image Upload</h1>
                <input ref={inputTitleRef} type="hidden" name="title"></input>
                <input
                  ref={inputFileRef}
                  type="file"
                  name="upload"
                  onChange={onFileChange}
                  accept="image/*"
                ></input>
                <button type="button" onClick={uploadFile}>
                  Upload
                </button>
                {error && <span className="errors">{error}</span>}
                {imageUrl && <img className="char-display" src={imageUrl} />}

            <h1> Optional</h1>

            <label htmlFor="biography">Biography</label>
          <Field as="textarea" id="biography" name="biography" />
          {errors.biography && touched.biography? (
             <div className="errors">{errors.biography}</div>
             ) : null}

          <label htmlFor="DOB">Birthday</label>
          <Field id="DOB" name="DOB" />
          {errors.DOB && touched.DOB? (
             <div className="errors">{errors.DOB}</div>
           ) : null}

          <label htmlFor="likes">Likes</label>
          <Field id="likes" name="likes" />
          {errors.likes && touched.likes? (
             <div className="errors">{errors.likes}</div>
           ) : null}

          <label htmlFor="dislikes">Dislikes</label>
          <Field id="dislikes" name="dislikes" /> 
          {errors.dislikes && touched.dislikes? (
             <div className="errors">{errors.dislikes}</div>
             ) : null}

          <label htmlFor="mbti">MBTI</label>
          <Field id="mbti" name="mbti" />
          {errors.mbti && touched.mbti? (
             <div className="errors">{errors.mbti}</div>
             ) : null}

          <label htmlFor="ennegram">Ennegram</label>
          <Field id="ennegram" name="ennegram" />
          {errors.ennegram && touched.ennegram? (
             <div className="errors">{errors.ennegram}</div>
             ) : null}

          <label htmlFor="moralAlignment">Moral Alignment</label>
          <Field id="moralAlignment" name="moralAlignment" />
          {errors.moralAlignment && touched.moralAlignment? (
             <div className="errors">{errors.moralAlignment}</div>
             ) : null}

            <div className="submitbox">
             <button className="submission" type="submit">
             Submit
           </button></div>
         </Form>
         )}}
     </Formik>


   </div> || null
 );
 }
 
 export default PostForm;

/* disable submit */