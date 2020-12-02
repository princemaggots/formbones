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
      ); */

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
              router.push("/profile/profile");
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
          
         {/*   <h1>Change Profile Picture</h1>
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
                {imageUrl && <img className="char-display" src={imageUrl} />}*/}

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