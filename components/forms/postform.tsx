import axios from 'axios'
import { useRef, useCallback, useState } from 'react'
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
   DOB: string;
   likes: string;
   dislikes: string;
   mbti: string;
   ennegram: string;
   moralAlignment: string;
 }

 const myInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};

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
  .matches(/[\d\\]+/g , 'Cannot contain "<" or ">".'),
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
  .matches(/[A-Za-z!?,.]+/g , 'Cannot contain non-alphanumeric characters.')
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
  const uploadFile = useCallback(() => {
    setError()
    const fileInput = inputFileRef.current;
    const titleInput = inputTitleRef.current;
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', titleInput.value)
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload', true);
    xhr.addEventListener('loadend', ({ currentTarget }) => {
      const { status, response } = currentTarget
      if (status === 200) {
        const { location } = JSON.parse(response)
        setImageUrl(location)
      } else {
        setError('Something went wrong')
      }
    });
    xhr.send(formData);
  }, [inputFileRef.current, inputTitleRef.current])

  const onFileChange = useCallback(({ currentTarget }) => {
    inputTitleRef.current.value = currentTarget.files[0].name
  }, [inputTitleRef.current])

   return (
    initialValues &&
     <div>
       {title}

       <Formik
          initialValues={ initialValues }
          validationSchema={CharacterSchema}
          onSubmit={(
            values: CharacterValues,
            { setSubmitting }: FormikHelpers<CharacterValues>
          ) => {
            /* setSubmitting(false);
            let data = new FormData();
            data.append("photo1", file, values.charData);
            return fetch("/api/directory/saveimage", {
              method: "post",
              body: data,
            })
              .then((response) => response.json())
              .catch((error) => console.log(error));
            delete values.charData; */
            axios.post("/api/directory/savecharacter", values).then(() => {
              router.push("/directory/allcharacters");
            });
          }}
        >

     {/* hi!!! remember to fix the css and edit the textarea to match. thanks 
     image, name, fandom, description, category (tags). additional has DOB, likes, dislikes, mbti, ennegram, moral alignment */}
         {({ errors, touched }) => (
         <Form> 
         <Field type="hidden" id="id" name="id" />


          <label htmlFor="characterName">Name</label>
          <Field id="characterName" name="characterName" />
          {errors.characterName && touched.characterName ? (
             <div class="errors">{errors.characterName}</div>
           ) : null}

          <label htmlFor="Fandom">Fandom</label>
          <Field id="fandom" name="fandom" />
          {errors.fandom && touched.fandom? (
             <div>{errors.fandom}</div>
           ) : null}

          <label htmlFor="description">Description</label>
          <Field as="textarea" id="description" name="description" />
          {errors.description && touched.description? (
             <div>{errors.description}</div>
           ) : null}


          <h1> Optional</h1>


          <label htmlFor="DOB">Birthday</label>
          <Field id="DOB" name="DOB" />
          {errors.DOB && touched.DOB? (
             <div>{errors.DOB}</div>
           ) : null}

          <label htmlFor="likes">Likes</label>
          <Field id="likes" name="likes" />
          {errors.likes && touched.likes? (
             <div>{errors.likes}</div>
           ) : null}

          <label htmlFor="dislikes">Dislikes</label>
          <Field id="dislikes" name="dislikes" /> 
          {errors.dislikes && touched.dislikes? (
             <div>{errors.dislikes}</div>
             ) : null}

          <label htmlFor="mbti">MBTI</label>
          <Field id="mbti" name="mbti" />
          {errors.mbti && touched.mbti? (
             <div>{errors.mbti}</div>
             ) : null}

          <label htmlFor="ennegram">Ennegram</label>
          <Field id="ennegram" name="ennegram" />
          {errors.ennegram && touched.ennegram? (
             <div>{errors.ennegram}</div>
             ) : null}

          <label htmlFor="moralAlignment">Moral Alignment</label>
          <Field id="moralAlignment" name="moralAlignment" />
          {errors.moralAlignment && touched.moralAlignment? (
             <div>{errors.moralAlignment}</div>
             ) : null}

           <div className="submission">
             <button type="submit">
             Submit
           </button></div>
         </Form>
         )}
     </Formik>
     <h1>Image Upload</h1>
            <input ref={inputTitleRef} type="hidden" name="title"></input>
             <input ref={inputFileRef} type="file" name="upload" onChange={onFileChange}></input>
             <button onClick={uploadFile}>Upload</button>
            {error && <span>{error}</span>}
{/*             {imageUrl && <img src={imageUrl}/>} */}

   </div> || null
 );
 }
 
 export default PostForm;

/* disable submit */