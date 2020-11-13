import axios from 'axios'
import { useRef, useCallback, useState, useEffect } from 'react'
import * as React from 'react';
 import * as ReactDOM from '../characters/node_modules/react-dom';
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



 
 interface SettingsValues {
   name: string;
   about: string;
/*    location: string; */
 }

 const myInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};

const SettingsSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, 'Too Long!')
    .matches(/[A-Za-z\d-.]+/g , 'Cannot contain non-alphanumeric characters.'),
  about: Yup.string()
  .max(255, 'Too Long!')
  .matches(/[^<>]+/g , 'Cannot contain "<" or ">".')
});
 
const SettingsForm: React.FC<{
  initialValues: SettingsValues
}> = ({ initialValues }) => {
  const [toDir, setToDir] = useState(false)
  const router = useRouter()
/*   const [imageUrl, setImageUrl] = useState()
  const [error, setError] = useState() */

  const inputTitleRef = useRef()
  const inputFileRef = useRef()

 /*  const setInitialLocation = useEffect(() => {
    initialValues && setImageUrl(initialValues.location);
  }, [initialValues]);
  const uploadFile = useCallback(() => {
    setError()
    const fileInput = inputFileRef.current;
    const titleInput = inputTitleRef.current;
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', titleInput.value)
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/directory/upload', true);
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
  }, [inputFileRef.current, inputTitleRef.current]) */

/*   const onFileChange = useCallback(({ currentTarget }) => {
    inputTitleRef.current.value = currentTarget.files[0].name
  }, [inputTitleRef.current])
 */
   return (
    initialValues &&
     <div>
        <h1> Settings </h1>
       <Formik
          initialValues={ initialValues }
          validationSchema={SettingsSchema}    
          onSubmit={(
            values: SettingsValues,
            { setSubmitting }: FormikHelpers<SettingsValues>
          ) => {
            axios.post("/api/profile/saveprofile", values).then(() => {
              router.push("profile");
            });
          }}
        >

          {({ errors, touched, values, setValues }) => {
            /* const setLocation = useEffect(() => {
              setValues({
                ...values,
                location: imageUrl,
              });
            }, [imageUrl]); */
            return (
         <Form> 

          <label htmlFor="name">Display Name</label>
          <Field id="name" name="name" />
          {errors.name && touched.name ? (
             <div className="errors">{errors.name}</div>
           ) : null}


          <label htmlFor="about">About</label>
          <Field as="textarea" id="about" name="about" />
          {errors.about && touched.about? (
             <div>{errors.about}</div>
           ) : null}
          
         {/*  <h1>Change Profile Picture</h1>
                <input ref={inputTitleRef} type="hidden" name="title"></input>
                <input
                  ref={inputFileRef}
                  type="file"
                  name="upload"
                  onChange={onFileChange}
                ></input>
                <button type="button" onClick={uploadFile}>
                  Upload
                </button>
                {error && <span>{error}</span>}
                {imageUrl && <img className="char-display" src={imageUrl} />} */}

           <div className="submission">
             <button type="submit">
             Submit
           </button></div>
         </Form>
         )}}
     </Formik>


   </div> 
 );
 }
 
 export default SettingsForm;

/* disable submit */